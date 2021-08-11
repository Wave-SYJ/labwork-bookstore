package cn.edu.seu.bookstore.service.impl;

import cn.edu.seu.bookstore.entity.User;
import cn.edu.seu.bookstore.repository.UserRepository;
import cn.edu.seu.bookstore.config.LoginUser;
import cn.edu.seu.bookstore.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void insertUser(User user) {
        userRepository.save(user);
    }

    @Override
    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (!StringUtils.hasText(username))
            throw new UsernameNotFoundException("用户不存在");
        User user = findUserByUsername(username);
        if (user == null)
            throw new UsernameNotFoundException("用户不存在");

        return LoginUser.ofUser(user);
    }
}
