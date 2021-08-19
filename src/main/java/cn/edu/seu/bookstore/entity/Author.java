package cn.edu.seu.bookstore.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString
@Table(name = "t_author")
public class Author {

    @Id
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "uuid2")
    private UUID id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "role", nullable = false)
    private String role;

    @Column(name = "country")
    private String country;

    @ManyToOne
    @JsonIgnore
    private Book book;

    public Author(UUID id, String name, String role, String country) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.country = country;
    }

    public Author(String name, String role, String country) {
        this.name = name;
        this.role = role;
        this.country = country;
    }
}
