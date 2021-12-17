package cn.edu.seu.bookstore.controller;

import cn.edu.seu.bookstore.entity.Book;
import cn.edu.seu.bookstore.payload.RestResult;
import cn.edu.seu.bookstore.payload.SearchBookPayload;
import cn.edu.seu.bookstore.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/book")
public class BookController {

    @Autowired
    private BookService bookService;

    @PostMapping
    @Secured("ROLE_ADMIN")
    public RestResult<Void> insertBook(@RequestBody @Valid Book book) {
        bookService.insertBook(book);
        return RestResult.success();
    }

    @PostMapping("/number")
    @Secured("ROLE_ADMIN")
    public RestResult<Void> updateBookCount(@RequestBody Map<String, Object> body) {
        UUID bookId = UUID.fromString((String) body.get("bookId"));
        Integer count = (Integer) body.get("count");
        bookService.updateBookCount(bookId, count);
        return RestResult.success();
    }

    @GetMapping
    public RestResult<SearchBookPayload> searchBook(String keyword, Integer pageNum, Integer pageSize) {
        return RestResult.success(bookService.searchBook(keyword, pageNum, pageSize));
    }

    @GetMapping("/{bookId}")
    public RestResult<Book> findBook(@PathVariable UUID bookId) {
        return RestResult.success(bookService.findBook(bookId));
    }

    @DeleteMapping
    @Secured("ROLE_ADMIN")
    public RestResult<Void> deleteBook(@RequestParam("id") UUID bookId) {
        bookService.deleteBook(bookId);
        return RestResult.success();
    }

}
