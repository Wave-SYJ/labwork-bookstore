package cn.edu.seu.bookstore.service;

import cn.edu.seu.bookstore.entity.User;
import org.springframework.stereotype.Service;

public interface SystemService {

    User login(User user);

    void register(User user);
}
