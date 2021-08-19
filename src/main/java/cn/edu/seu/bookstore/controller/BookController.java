package cn.edu.seu.bookstore.controller;

import cn.edu.seu.bookstore.entity.Book;
import cn.edu.seu.bookstore.payload.RestResult;
import cn.edu.seu.bookstore.payload.SearchBookPayload;
import cn.edu.seu.bookstore.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/book")
public class BookController {

    @Autowired
    private BookService bookService;

    @PutMapping
    @Secured("ROLE_ADMIN")
    public RestResult<Void> insertBook(@RequestBody @Valid Book book) {
        bookService.insertBook(book);
        return RestResult.success();
    }

    @GetMapping
    public RestResult<SearchBookPayload> searchBook() {
        return RestResult.success(bookService.searchBook("", 1, 2));
    }

}
