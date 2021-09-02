package cn.edu.seu.bookstore.service;

import cn.edu.seu.bookstore.entity.Book;
import cn.edu.seu.bookstore.payload.SearchBookPayload;

import java.util.UUID;

public interface BookService {

    void insertBook(Book book);
    void deleteBook(UUID bookId);
    SearchBookPayload searchBook(String keyword, Integer pageNum, Integer pageSize);

}
