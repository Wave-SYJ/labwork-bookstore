package cn.edu.seu.bookstore.security;

import cn.edu.seu.bookstore.payload.RestResult;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// token 失效
@Slf4j
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e) throws IOException {
        log.error(String.format("[%d] %s", HttpStatus.UNAUTHORIZED.value(), "认证异常：token 失效"));

        httpServletResponse.setStatus(HttpStatus.OK.value());
        new ObjectMapper().writeValue(
                httpServletResponse.getOutputStream(),
                RestResult.failure(HttpStatus.UNAUTHORIZED, "登录失效，请重新登录")
        );
    }
}
