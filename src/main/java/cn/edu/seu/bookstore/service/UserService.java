package cn.edu.seu.bookstore.service;

import cn.edu.seu.bookstore.entity.User;

public interface UserService {
    void insertUser(User user);
    User findUserByUsername(String username);
}
