package cn.edu.seu.bookstore.service.impl;

import cn.edu.seu.bookstore.entity.Author;
import cn.edu.seu.bookstore.entity.Author_;
import cn.edu.seu.bookstore.entity.Book;
import cn.edu.seu.bookstore.entity.Book_;
import cn.edu.seu.bookstore.payload.SearchBookPayload;
import cn.edu.seu.bookstore.repository.BookRepository;
import cn.edu.seu.bookstore.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.*;
import java.util.LinkedList;
import java.util.List;

import cn.edu.seu.bookstore.payload.SearchBookPayload.Statistics.StatisticsItem;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void insertBook(Book book) {
        if (book.getCategories() != null)
            book.getCategories().forEach(category -> category.setBook(book));
        if (book.getAuthors() != null)
            book.getAuthors().forEach(author -> author.setBook(book));
        bookRepository.save(book);
    }

    private Predicate buildPredicate(Root<Book> root, CriteriaQuery<?> query, CriteriaBuilder builder, String pattern) {
        Subquery<String> subquery = query.subquery(String.class);
        Root<Author> authorRoot = subquery.from(Author.class);

        return builder.or(
                builder.like(root.get(Book_.ISBN), pattern),
                builder.like(root.get(Book_.TITLE), pattern),
                builder.like(root.get(Book_.PRESS), pattern),
                builder.in(root.get(Book_.ID)).value(
                        subquery.select(authorRoot.get(Author_.BOOK)).where(builder.like(authorRoot.get(Author_.NAME), pattern)))
        );
    }

    private Page<Book> searchOnlyBook(String keyword, Integer pageNum, Integer pageSize) {
        final String pattern = keyword == null ? "%%" : "%" + keyword + "%";
        return bookRepository.findAll(
                (Specification<Book>) (root, query, builder) -> buildPredicate(root, query, builder, pattern),
                PageRequest.of(pageNum - 1, pageSize));
    }

    private SearchBookPayload.Statistics countBookLanguage(String keyword) {
        final String pattern = keyword == null ? "%%" : "%" + keyword + "%";
        return new SearchBookPayload.Statistics("language", "语言");
    }

    private SearchBookPayload.Statistics countBookPress(String keyword) {
        final String pattern = keyword == null ? "%%" : "%" + keyword + "%";

        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<StatisticsItem> criteria = criteriaBuilder.createQuery(StatisticsItem.class);
        Root<Book> bookRoot = criteria.from(Book.class);
        criteria.multiselect(bookRoot.get(Book_.PRESS), criteriaBuilder.count(bookRoot))
                .groupBy(bookRoot.get(Book_.PRESS));
        criteria.where(buildPredicate(bookRoot, criteria, criteriaBuilder, pattern));

        return new SearchBookPayload.Statistics("press", "出版社",
                entityManager.createQuery(criteria).getResultList());
    }

    private SearchBookPayload.Statistics countBookCategory(String keyword) {
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
        statistics.add(countBookLanguage(keyword));
        statistics.add(countBookPress(keyword));
        statistics.add(countBookCategory(keyword));

        payload.setStatistics(statistics);
        return payload;
    }
}
