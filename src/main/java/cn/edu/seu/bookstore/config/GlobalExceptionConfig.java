package cn.edu.seu.bookstore.config;

import cn.edu.seu.bookstore.payload.RestResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionConfig {

    @ExceptionHandler(PredefinedException.class)
    public RestResult<String> handleBasicException(PredefinedException e) {
        return RestResult.failure(e.getStatus(), e.getReason());
    }

    @ExceptionHandler(Exception.class)
    public RestResult<String> handleException(Exception e) {
        e.printStackTrace();
        return RestResult.failure(HttpStatus.INTERNAL_SERVER_ERROR, "服务器内部错误");
    }

}
