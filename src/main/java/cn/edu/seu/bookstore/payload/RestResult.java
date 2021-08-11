package cn.edu.seu.bookstore.payload;

import lombok.Data;
import org.springframework.http.HttpStatus;

import java.io.Serializable;

@Data
public class RestResult<T> implements Serializable {
    private static final long serialVersionUID = 2879419098588332575L;
    private Integer code;
    private Boolean success;
    private String message;

    private T data;

    private RestResult(Boolean success, HttpStatus status, T data) {
        this.code = status.value();
        this.success = success;
        this.message = status.getReasonPhrase();
        this.data = data;
    }

    public static <T> RestResult<T> success(HttpStatus status, T data) {
        if (status == null)
            status = HttpStatus.OK;
        return new RestResult<>(true, status, data);
    }

    public static <T> RestResult<T> success(HttpStatus status) {
        return success(status, null);
    }

    public static <T> RestResult<T> success(T data) {
        return success(HttpStatus.OK, data);
    }

    public static <T> RestResult<T> success() {
        return success(HttpStatus.OK, null);
    }

    public static RestResult<String> failure(HttpStatus status, String reason) {
        if (status == null)
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        return new RestResult<>(false, status, reason);
    }

    public static RestResult<String> failure(HttpStatus status) {
        return failure(status, null);
    }

    public static RestResult<String> failure(String reason) {
        return failure(HttpStatus.INTERNAL_SERVER_ERROR, reason);
    }

    public static RestResult<String> failure() {
        return failure(HttpStatus.INTERNAL_SERVER_ERROR, null);
    }
}
