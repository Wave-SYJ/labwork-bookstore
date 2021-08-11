package cn.edu.seu.bookstore.service.impl;

import cn.edu.seu.bookstore.config.SimpleException;
import cn.edu.seu.bookstore.entity.User;
import cn.edu.seu.bookstore.service.SystemService;
import cn.edu.seu.bookstore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class SystemServiceImpl implements SystemService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Override
    public User login(User user) {
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());
        Authentication authentication = authenticationManager.authenticate(token);
        return (User) authentication.getPrincipal();
    }

    @Override
    public void register(User user) {
        if (null != userService.findUserByUsername(user.getUsername()))
            throw new SimpleException(HttpStatus.BAD_REQUEST, String.format("用户名 %s 已被占用", user.getUsername()));
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.insertUser(user);
    }
}
