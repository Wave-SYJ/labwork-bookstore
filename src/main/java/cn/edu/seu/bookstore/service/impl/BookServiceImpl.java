package cn.edu.seu.bookstore.service.impl;

import cn.edu.seu.bookstore.entity.Book;
import cn.edu.seu.bookstore.payload.SearchBookPayload;
import cn.edu.seu.bookstore.repository.BookRepository;
import cn.edu.seu.bookstore.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
    public SearchBookPayload searchBook(String keyword) {
        SearchBookPayload payload = new SearchBookPayload();
        payload.setList(bookRepository.findAll());
        payload.setStatistics(new ArrayList<>());
        return payload;
    }
}
