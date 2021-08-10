package cn.edu.seu.bookstore.service;

import cn.edu.seu.bookstore.entity.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    void insertUser(User user);
}
