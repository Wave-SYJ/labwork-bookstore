package cn.edu.seu.bookstore.mapper;

import cn.edu.seu.bookstore.entity.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {

    List<User> findAllUser();

}
