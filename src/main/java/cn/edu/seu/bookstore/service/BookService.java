package cn.edu.seu.bookstore.service;

import cn.edu.seu.bookstore.entity.Book;
import cn.edu.seu.bookstore.payload.SearchBookPayload;

import java.util.UUID;

public interface BookService {

    void insertBook(Book book);
    void deleteBook(UUID bookId);
    Book findBook(UUID bookId);
    SearchBookPayload searchBook(String keyword, Integer pageNum, Integer pageSize);
    void reduceBook(UUID bookId, Integer number);

    void updateBookCount(UUID bookId, Integer count);
}
