package cn.edu.seu.bookstore.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.UUID;

@Entity
@Getter
@Setter
@ToString
@Table(name = "t_press")
@NoArgsConstructor
public class Press implements Serializable {

    private static final long serialVersionUID = 16735103840505536L;

    @Id
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "uuid2")
    private UUID id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

}
