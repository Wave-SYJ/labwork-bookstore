package cn.edu.seu.bookstore.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

@Entity
@Getter
@Setter
@ToString
@Table(name = "t_order")
@NoArgsConstructor
public class Order implements Serializable {

    private static final long serialVersionUID = 7864508686059107053L;

    public Order(Date time, Integer number, String targetPlace, String creditCard, UUID bookId, UUID userId) {
        this.time = time;
        this.number = number;
        this.targetPlace = targetPlace;
        this.creditCard = creditCard;
        this.bookId = bookId;
        this.userId = userId;
    }

    @Id
    @GeneratedValue(generator = "uuid2")
    private UUID id;

    @NotNull
    @Column(name = "time", nullable = false)
    private Date time;

    @NotNull
    @Column(name = "number", nullable = false)
    private Integer number;

    @NotNull
    @Column(name = "target_place", nullable = false)
    private String targetPlace;

    @NotNull
    @Column(name = "credit_card", nullable = false)
    private String creditCard;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.REMOVE}, optional = false)
    @JoinColumn(name = "book_id", insertable = false, updatable = false)
    private Book book;

    @NotNull
    @Column(name = "book_id", nullable = false)
    private UUID bookId;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.REMOVE}, optional = false)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;

    @NotNull
    @Column(name = "user_id", nullable = false)
    private UUID userId;

}
