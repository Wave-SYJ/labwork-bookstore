package cn.edu.seu.bookstore.service;

import cn.edu.seu.bookstore.entity.Language;

import java.util.List;

public interface LanguageService {

    List<Language> findByName(String name);

}
