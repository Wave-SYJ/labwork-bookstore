package cn.edu.seu.bookstore.controller;

import cn.edu.seu.bookstore.entity.User;
import cn.edu.seu.bookstore.payload.RestResult;
import cn.edu.seu.bookstore.service.SystemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
public class SystemController {

    @Autowired
    private SystemService systemService;

    @PostMapping("/login")
    public RestResult<User> login(@RequestBody @Valid User user) {
        return RestResult.success(systemService.login(user));
    }

    @PostMapping("/register")
    public RestResult<Object> register(@RequestBody @Valid User user) {
        systemService.register(user);
        return RestResult.success();
    }

}
