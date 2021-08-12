package cn.edu.seu.bookstore.security;

import cn.edu.seu.bookstore.payload.RestResult;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// 权限不足
@Slf4j
public class JwtAccessDeniedHandler implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AccessDeniedException e) throws IOException {
        log.error(String.format("[%d] %s", HttpStatus.FORBIDDEN.value(), "鉴权异常：权限不足"));

        httpServletResponse.setStatus(HttpStatus.OK.value());
        new ObjectMapper().writeValue(
                httpServletResponse.getOutputStream(),
                RestResult.failure(HttpStatus.FORBIDDEN, "权限不足")
        );
    }
}
