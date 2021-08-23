package cn.edu.seu.bookstore.service.impl;

import cn.edu.seu.bookstore.entity.Author;
import cn.edu.seu.bookstore.entity.Book;
import cn.edu.seu.bookstore.payload.SearchBookPayload;
import cn.edu.seu.bookstore.repository.BookRepository;
import cn.edu.seu.bookstore.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.LinkedList;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public void insertBook(Book book) {
        if (book.getCategories() != null)
            book.getCategories().forEach(category -> category.setBook(book));
        if (book.getAuthors() != null)
            book.getAuthors().forEach(author -> author.setBook(book));
        bookRepository.save(book);
    }

    private Page<Book> searchOnlyBook(String keyword, Integer pageNum, Integer pageSize) {
        final String pattern = keyword == null ? "%%" : "%" + keyword + "%";
        return bookRepository.findAll((Specification<Book>) (root, query, builder) -> {
            Subquery<String> subquery = query.subquery(String.class);
            Root<Author> authorRoot = subquery.from(Author.class);

            return builder.or(
                    builder.like(root.get("isbn"), pattern),
                    builder.like(root.get("title"), pattern),
                    builder.like(root.get("press"), pattern),
                    builder.in(root.get("id")).value(
                            subquery.select(authorRoot.get("id")).where(builder.like(authorRoot.get("name"), pattern)))
            );
        }, PageRequest.of(pageNum - 1, pageSize));
    }

    private SearchBookPayload.Statistics countBookLanguage(String keyword, Integer pageNum, Integer pageSize) {
        final String pattern = keyword == null ? "%%" : "%" + keyword + "%";
        return new SearchBookPayload.Statistics("language", "语言");
    }

    private SearchBookPayload.Statistics countBookPress(String keyword, Integer pageNum, Integer pageSize) {
        return new SearchBookPayload.Statistics("press", "出版社");
    }

    private SearchBookPayload.Statistics countBookCategory(String keyword, Integer pageNum, Integer pageSize) {
        return new SearchBookPayload.Statistics("category", "分类");
    }

    @Override
    public SearchBookPayload searchBook(String keyword, Integer pageNum, Integer pageSize) {
        if (pageNum == null) pageNum = 1;
        if (pageSize == null) pageSize = 10;

        Page<Book> bookPage = searchOnlyBook(keyword, pageNum, pageSize);

        SearchBookPayload payload = new SearchBookPayload();
        payload.setPageNum(pageNum);
        payload.setPageSize(pageSize);
        payload.setPageCount(bookPage.getTotalPages());
        payload.setTotal(bookPage.getTotalElements());
        payload.setList(bookPage.toList());

        LinkedList<SearchBookPayload.Statistics> statistics = new LinkedList<>();
        statistics.add(countBookLanguage(keyword, pageNum, pageSize));
        statistics.add(countBookPress(keyword, pageNum, pageSize));
        statistics.add(countBookCategory(keyword, pageNum, pageSize));

        payload.setStatistics(statistics);
        return payload;
    }
}
