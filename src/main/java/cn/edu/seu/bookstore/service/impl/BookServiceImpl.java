package cn.edu.seu.bookstore.service.impl;

import cn.edu.seu.bookstore.entity.Book;
import cn.edu.seu.bookstore.payload.SearchBookPayload;
import cn.edu.seu.bookstore.repository.BookRepository;
import cn.edu.seu.bookstore.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

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

    @Override
    public SearchBookPayload searchBook(String keyword, Integer pageNum, Integer pageSize) {
        if (pageNum == null) pageNum = 1;
        if (pageSize == null) pageSize = 10;
        Page<Book> bookPage = bookRepository.findAll(PageRequest.of(pageNum, pageSize));

        SearchBookPayload payload = new SearchBookPayload();
        payload.setPageNum(pageNum);
        payload.setPageSize(pageSize);
        payload.setPageCount(bookPage.getTotalPages());
        payload.setTotal(bookPage.getTotalElements());
        payload.setList(bookPage.toList());
        payload.setStatistics(new ArrayList<>());
        return payload;
    }
}
