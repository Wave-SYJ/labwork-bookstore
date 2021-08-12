package cn.edu.seu.bookstore.controller;

import cn.edu.seu.bookstore.entity.User;
import cn.edu.seu.bookstore.payload.RestResult;
import cn.edu.seu.bookstore.security.CurrentUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @GetMapping
    public RestResult<User> getUserInfo(@CurrentUser User user) {
        return RestResult.success(user);
    }
}
