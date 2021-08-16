package cn.edu.seu.bookstore.service.impl;

import cn.edu.seu.bookstore.entity.Book;
import cn.edu.seu.bookstore.repository.AuthorRepository;
import cn.edu.seu.bookstore.repository.BookRepository;
import cn.edu.seu.bookstore.repository.CategoryRepository;
import cn.edu.seu.bookstore.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private BookRepository bookRepository;

    @Override
    public void insertBook(Book book) {
        if (book.getAuthors() != null)
            authorRepository.saveAll(book.getAuthors().stream().filter(author -> author.getId() == null).collect(Collectors.toList()));
        if (book.getCategories() != null)
            categoryRepository.saveAll(book.getCategories().stream().filter(category -> category.getId() == null).collect(Collectors.toList()));
        bookRepository.save(book);
    }
}
