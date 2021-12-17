package cn.edu.seu.bookstore.service;

import cn.edu.seu.bookstore.entity.Order;
import cn.edu.seu.bookstore.payload.BatchOrders;

import java.util.List;
import java.util.UUID;

public interface OrderService {
    List<Order> getOrdersByUserId(UUID userId);

    void insertBatchOrders(UUID id, BatchOrders batchOrders);
}
