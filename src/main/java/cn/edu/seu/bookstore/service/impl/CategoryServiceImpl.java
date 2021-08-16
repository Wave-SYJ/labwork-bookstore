package cn.edu.seu.bookstore.service.impl;

import cn.edu.seu.bookstore.entity.Category;
import cn.edu.seu.bookstore.repository.CategoryRepository;
import cn.edu.seu.bookstore.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> findByName(String name) {
        name = name.strip();
        if (!StringUtils.hasText(name))
            return new ArrayList<>();
        return categoryRepository.findByNameLike("%" + name + "%");
    }
}
