package cn.edu.seu.bookstore;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("cn.edu.seu.bookstore.mapper")
public class LabworkBookstoreServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(LabworkBookstoreServerApplication.class, args);
    }

}
