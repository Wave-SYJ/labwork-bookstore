package cn.edu.seu.bookstore.controller;

import cn.edu.seu.bookstore.entity.Press;
import cn.edu.seu.bookstore.payload.RestResult;
import cn.edu.seu.bookstore.service.PressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/press")
public class PressController {

    @Autowired
    private PressService pressService;

    @GetMapping
    public RestResult<List<Press>> findByName(String name) {
        if (!StringUtils.hasText(name))
            return RestResult.success(new ArrayList<>());
        return RestResult.success(pressService.findByName(name));
    }

}
