package cn.edu.seu.bookstore.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
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

    public Book(UUID id) {
        this.id = id;
    }

    @Id
    @GeneratedValue(generator = "uuid2")
    private UUID id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @OneToMany(mappedBy = "book", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Author> authors;

    @Column(name = "language", nullable = false)
    private String language;

    @NotNull
    @Column(name = "isbn", nullable = false)
    private String isbn;

    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @Column(name = "price", nullable = false, scale = 2)
    private BigDecimal price;

    @Column(name = "image")
    private String image;

    @Column(name = "press")
    private String press;

    @Column(name = "count")
    private Integer count;

    @OneToMany(mappedBy = "book", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Category> categories;
}