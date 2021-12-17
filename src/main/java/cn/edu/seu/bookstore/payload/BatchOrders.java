package cn.edu.seu.bookstore.payload;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class BatchOrders {

    private String targetPlace;

    private String creditCard;

    private List<OrderItem> items;

    @Data
    public static class OrderItem {
        private UUID id;
        private Integer count;
    }

}
