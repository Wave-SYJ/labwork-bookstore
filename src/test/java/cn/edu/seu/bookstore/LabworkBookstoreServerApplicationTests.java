package cn.edu.seu.bookstore;

import cn.edu.seu.bookstore.entity.User;
import cn.edu.seu.bookstore.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class LabworkBookstoreServerApplicationTests {

    @Autowired
    private UserService userService;

    @Test
    void contextLoads() {
        userService.insertUser(new User(null, "adad", "bbb"));
    }

}
