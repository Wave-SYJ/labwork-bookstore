package cn.edu.seu.bookstore.service;

import cn.edu.seu.bookstore.entity.Press;

import java.util.List;

public interface PressService {

    List<Press> findByName(String name);

}
