package cn.edu.seu.bookstore.service.impl;

import cn.edu.seu.bookstore.entity.User;
import cn.edu.seu.bookstore.repository.UserRepository;
import cn.edu.seu.bookstore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void insertUser(User user) {
        userRepository.save(user);
    }
}
