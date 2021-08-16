package cn.edu.seu.bookstore.service.impl;

import cn.edu.seu.bookstore.entity.Language;
import cn.edu.seu.bookstore.repository.LanguageRepository;
import cn.edu.seu.bookstore.service.LanguageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LanguageServiceImpl implements LanguageService {

    @Autowired
    private LanguageRepository languageRepository;


    @Override
    public List<Language> findByName(String name) {
        name = name.strip();
        return languageRepository.findByNameLike("%" + name + "%");
    }
}
