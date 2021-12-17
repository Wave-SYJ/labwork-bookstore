package cn.edu.seu.bookstore.controller;

import cn.edu.seu.bookstore.entity.Order;
import cn.edu.seu.bookstore.entity.User;
import cn.edu.seu.bookstore.payload.BatchOrders;
import cn.edu.seu.bookstore.payload.RestResult;
import cn.edu.seu.bookstore.security.CurrentUser;
import cn.edu.seu.bookstore.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public RestResult<List<Order>> findMyOrders(@CurrentUser User user) {
        return RestResult.success(orderService.getOrdersByUserId(user.getId()));
    }

    @PostMapping
    public RestResult<Void> postOrder(@CurrentUser User user, @RequestBody BatchOrders batchOrders) {
        orderService.insertBatchOrders(user.getId(), batchOrders);
        return RestResult.success();
    }

}
