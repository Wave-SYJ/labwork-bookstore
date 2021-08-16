package cn.edu.seu.bookstore.service;

import cn.edu.seu.bookstore.entity.Category;

import java.util.List;

public interface CategoryService {

    List<Category> findByName(String name);

}
