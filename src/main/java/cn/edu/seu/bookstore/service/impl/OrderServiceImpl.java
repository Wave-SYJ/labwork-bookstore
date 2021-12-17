package cn.edu.seu.bookstore.service.impl;

import cn.edu.seu.bookstore.config.PredefinedException;
import cn.edu.seu.bookstore.entity.Book;
import cn.edu.seu.bookstore.entity.Order;
import cn.edu.seu.bookstore.entity.User;
import cn.edu.seu.bookstore.payload.BatchOrders;
import cn.edu.seu.bookstore.repository.OrderRepository;
import cn.edu.seu.bookstore.service.BookService;
import cn.edu.seu.bookstore.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private BookService bookService;

    @Override
    public List<Order> getOrdersByUserId(UUID userId) {
        return orderRepository.findByUserId(userId);
    }

    @Override
    @Transactional
    public void insertBatchOrders(UUID id, BatchOrders batchOrders) {
        if (!StringUtils.hasText(batchOrders.getCreditCard()))
            throw new PredefinedException(HttpStatus.BAD_REQUEST, "银行卡号不能为空");
        if (!StringUtils.hasText(batchOrders.getTargetPlace()))
            throw new PredefinedException(HttpStatus.BAD_REQUEST, "送货地点不能为空");
        if (batchOrders.getItems() == null || batchOrders.getItems().isEmpty())
            throw new PredefinedException(HttpStatus.BAD_REQUEST, "图书名单不能为空");

        batchOrders.getItems().forEach(orderItem -> {
            if (orderItem.getId() == null || orderItem.getCount() == null)
                throw new PredefinedException(HttpStatus.BAD_REQUEST, "参数错误");
            bookService.reduceBook(orderItem.getId(), orderItem.getCount());
        });

        orderRepository.saveAll(
                batchOrders.getItems().stream().map(orderItem ->
                        new Order(LocalDateTime.now(), orderItem.getCount(), batchOrders.getTargetPlace(), batchOrders.getCreditCard(),
                                orderItem.getId(), id)
                ).collect(Collectors.toList())
        );
    }

}
