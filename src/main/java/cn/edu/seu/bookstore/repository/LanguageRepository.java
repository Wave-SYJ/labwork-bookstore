package cn.edu.seu.bookstore.repository;

import cn.edu.seu.bookstore.entity.Language;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface LanguageRepository extends JpaRepository<Language, UUID> {
    List<Language> findByNameLike(String name);
}
