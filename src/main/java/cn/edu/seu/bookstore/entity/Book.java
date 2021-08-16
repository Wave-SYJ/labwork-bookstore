package cn.edu.seu.bookstore.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "t_book")
@NoArgsConstructor
public class Book implements Serializable {

    private static final long serialVersionUID = 809494834345025947L;

    @Id
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "uuid2")
    private UUID id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @OneToMany(mappedBy = "book")
    private List<Author> authors;

    @Column(name = "language", nullable = false)
    private String language;

    @NotNull
    @Column(name = "isbn", nullable = false)
    private String isbn;

    @NotNull
    @Column(name = "price", nullable = false, precision = 2)
    private BigDecimal price;

    @Column(name = "image")
    private String image;

    @Column(name = "press")
    private String press;

    @OneToMany(mappedBy = "book")
    private List<Category> categories;
}