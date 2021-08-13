package cn.edu.seu.bookstore.repository;

import cn.edu.seu.bookstore.entity.Press;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PressRepository  extends JpaRepository<Press, UUID> {
}
