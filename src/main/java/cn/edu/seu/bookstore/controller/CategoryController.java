package cn.edu.seu.bookstore.controller;

import cn.edu.seu.bookstore.entity.Category;
import cn.edu.seu.bookstore.payload.RestResult;
import cn.edu.seu.bookstore.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public RestResult<List<Category>> findByName(String name) {
        return RestResult.success(categoryService.findByName(name));
    }

}
