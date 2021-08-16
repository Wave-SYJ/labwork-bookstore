package cn.edu.seu.bookstore.service.impl;

import cn.edu.seu.bookstore.entity.Language;
import cn.edu.seu.bookstore.entity.Press;
import cn.edu.seu.bookstore.repository.LanguageRepository;
import cn.edu.seu.bookstore.repository.PressRepository;
import cn.edu.seu.bookstore.service.LanguageService;
import cn.edu.seu.bookstore.service.PressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PressServiceImpl implements PressService {

    @Autowired
    private PressRepository pressRepository;


    @Override
    public List<Press> findByName(String name) {
        name = name.strip();
        return pressRepository.findByNameLike("%" + name + "%");
    }
}
