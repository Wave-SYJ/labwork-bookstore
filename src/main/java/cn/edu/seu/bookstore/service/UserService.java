package cn.edu.seu.bookstore.service;

import cn.edu.seu.bookstore.entity.User;

import java.util.UUID;

public interface UserService {
    void insertUser(User user);
    User findUserByUsername(String username);
    User findUserById(UUID userId);
}
