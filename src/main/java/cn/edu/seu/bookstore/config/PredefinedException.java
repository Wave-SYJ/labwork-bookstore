package cn.edu.seu.bookstore.config;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class PredefinedException extends RuntimeException {
    private static final long serialVersionUID = 7284497749198970490L;

    private final HttpStatus status;
    private final String reason;

    public PredefinedException(HttpStatus status, String reason) {
        super(String.format("[%d] %s", status.value(), reason));
        this.status = status;
        this.reason = reason;
    }
}
