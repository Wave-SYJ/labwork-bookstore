package cn.edu.seu.bookstore.service;

import cn.edu.seu.bookstore.entity.Book;
import cn.edu.seu.bookstore.payload.SearchBookPayload;

public interface BookService {

    void insertBook(Book book);
    SearchBookPayload searchBook(String keyword, Integer pageNum, Integer pageSize);

}
