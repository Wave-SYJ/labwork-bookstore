package cn.edu.seu.bookstore.config;

import cn.edu.seu.bookstore.payload.RestResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionConfig {

    @ExceptionHandler(SimpleException.class)
    public RestResult<String> simpleExceptionHandler(SimpleException e) {
        log.error(e.getMessage());
        return RestResult.failure(e.getStatus(), e.getReason());
    }

}
