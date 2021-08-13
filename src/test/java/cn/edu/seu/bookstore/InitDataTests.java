package cn.edu.seu.bookstore;

import cn.edu.seu.bookstore.entity.*;
import cn.edu.seu.bookstore.repository.BookRepository;
import cn.edu.seu.bookstore.repository.CategoryRepository;
import cn.edu.seu.bookstore.repository.LanguageRepository;
import cn.edu.seu.bookstore.repository.UserRepository;
import cn.edu.seu.bookstore.service.SystemService;
import cn.edu.seu.bookstore.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

@DataJpaTest
@Rollback(false)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class InitDataTests {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private LanguageRepository languageRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private SystemService systemService;

    @Test
    public void initAdmin() {
        User user = new User();
        user.setUsername("admin");
        user.setPassword("password");
        user.setRole(1);
        systemService.register(user);
    }

    @Test
    public void initCategory() {
        List<Category> categories = new LinkedList<>();
        categories.add(new Category("教育"));
        categories.add(new Category("小说"));
        categories.add(new Category("文艺"));
        categories.add(new Category("青春文学"));
        categories.add(new Category("动漫 · 幽默"));
        categories.add(new Category("童书"));
        categories.add(new Category("人文社科"));
        categories.add(new Category("经管"));
        categories.add(new Category("成功/励志"));
        categories.add(new Category("生活"));
        categories.add(new Category("科技"));
        categoryRepository.saveAll(categories);
    }

    @Test
    public void initLanguage() {
        List<Language> languages = new LinkedList<>();
        languages.add(new Language("中文"));
        languages.add(new Language("英文"));
        languages.add(new Language("法文"));
        languages.add(new Language("阿拉伯文"));
        languages.add(new Language("葡萄牙文"));
        languages.add(new Language("西班牙文"));
        languages.add(new Language("日文"));
        languages.add(new Language("韩文"));
        languages.add(new Language("俄文"));
        languageRepository.saveAll(languages);
    }

    @Test
    public void initBook() {
        Book book = new Book();
        book.setTitle("昆虫记");
        book.setPrice(new BigDecimal("25.6"));
        book.setIsbn("9787517823810");
        book.setImage("http://img3m9.ddimg.cn/9/34/25190559-1_b_16.jpg");
        book.setLanguage(new Language("中文"));
        book.setAuthors(Arrays.asList(new Author("法布尔", "法", "著"), new Author("陈筱卿", null, "译")));
        book.setCategories(Arrays.asList(new Category("教育"), new Category("科技")));
        bookRepository.save(book);
    }
}
