package cn.edu.seu.bookstore.service;

import cn.edu.seu.bookstore.entity.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

public interface UserService extends UserDetailsService {
    void insertUser(User user);
}
