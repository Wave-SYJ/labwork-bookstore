package cn.edu.seu.bookstore.service.impl;

import cn.edu.seu.bookstore.config.PredefinedException;
import cn.edu.seu.bookstore.entity.User;
import cn.edu.seu.bookstore.service.SystemService;
import cn.edu.seu.bookstore.service.UserService;
import cn.edu.seu.bookstore.utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class SystemServiceImpl implements SystemService {

    @Autowired
    private UserService userService;

    @Autowired
    private SecurityUtils securityUtils;

    @Override
    public String login(User user, boolean rememberMe) {
        User existedUser = userService.findUserByUsername(user.getUsername());
        if (existedUser == null)
            throw new PredefinedException(HttpStatus.BAD_REQUEST, "用户不存在");
        if (!securityUtils.checkPassword(user.getPassword(), existedUser.getPassword()))
            throw new PredefinedException(HttpStatus.BAD_REQUEST, "密码错误");
        return securityUtils.generateToken(existedUser, rememberMe);
    }

    @Override
    public void register(User user) {
        if (null != userService.findUserByUsername(user.getUsername()))
            throw new PredefinedException(HttpStatus.BAD_REQUEST, String.format("用户名 %s 已被占用", user.getUsername()));
        user.setPassword(securityUtils.encodePassword(user.getPassword()));
        user.setRole(User.Role.ROLE_ORDINARY.value());
        userService.insertUser(user);
    }
}
