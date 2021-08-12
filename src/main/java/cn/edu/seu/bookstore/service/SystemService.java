package cn.edu.seu.bookstore.service;

import cn.edu.seu.bookstore.entity.User;

public interface SystemService {

    String login(User user, boolean rememberMe);

    void register(User user);
}
