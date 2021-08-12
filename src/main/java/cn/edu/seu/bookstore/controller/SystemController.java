package cn.edu.seu.bookstore.controller;

import cn.edu.seu.bookstore.entity.User;
import cn.edu.seu.bookstore.payload.RestResult;
import cn.edu.seu.bookstore.service.SystemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
public class SystemController {

    @Autowired
    private SystemService systemService;

    @PostMapping("/login")
    public RestResult<String> login(@RequestBody @Valid User user, Boolean remember) {
        return RestResult.success(systemService.login(user, remember));
    }

    @PostMapping("/register")
    public RestResult<Object> register(@RequestBody @Valid User user) {
        systemService.register(user);
        return RestResult.success();
    }

}
