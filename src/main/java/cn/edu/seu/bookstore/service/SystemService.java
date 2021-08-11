package cn.edu.seu.bookstore.service;

import cn.edu.seu.bookstore.entity.User;

public interface SystemService {

    User login(User user);

    void register(User user);
}
