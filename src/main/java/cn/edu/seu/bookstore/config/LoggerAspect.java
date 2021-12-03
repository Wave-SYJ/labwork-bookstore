package cn.edu.seu.bookstore.config;

import cn.edu.seu.bookstore.entity.User;
import cn.edu.seu.bookstore.payload.RestResult;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.time.Duration;
import java.time.Instant;

@Aspect
@Component
public class LoggerAspect {

    private enum Color {
        RESET("\033[0m"),

        RED("\033[0;31m"),
        GREEN("\033[0;32m"),
        YELLOW("\033[0;33m"),
        BLUE("\033[0;34m"),
        CYAN("\033[0;36m");

        private final String code;

        Color(String code) {
            this.code = code;
        }

        @Override
        public String toString() {
            return code;
        }
    }

    private String withColor(Object content, Color color) {
        return color.code + content + Color.RESET.code;
    }

    @Pointcut("@within(org.springframework.web.bind.annotation.RestController)")
    private void pointcut() {
    }

    @AfterReturning(value = "pointcut()", returning = "result")
    public void doAfterReturning(JoinPoint joinPoint, RestResult<?> result) {
        logSuccess(joinPoint.getTarget().getClass(), result);
    }

    public void logSuccess(Class<?> clazz, RestResult<?> result) {
        Logger logger = LoggerFactory.getLogger(clazz);
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();

        Instant begin = (Instant) request.getAttribute("beginTime");
        Instant end = Instant.now();



        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = authentication == null || authentication instanceof AnonymousAuthenticationToken ?
                null : (User) authentication.getPrincipal();

        logger.info(String.format("%s %s %s %dms %s",
                withColor(result.getCode(), Color.GREEN),
                request.getMethod(),
                withColor(request.getRequestURI(), Color.BLUE),
                Duration.between(begin, end).toMillis(),
                withColor(user == null ? "匿名用户" : user.getUsername(), Color.CYAN)));
    }

    public void logNotSuccess(Class<?> clazz, Exception e) {
        Logger logger = LoggerFactory.getLogger(clazz);
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();

        Instant begin = (Instant) request.getAttribute("beginTime");
        Instant end = Instant.now();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = authentication == null || authentication instanceof AnonymousAuthenticationToken ?
                null : (User) authentication.getPrincipal();

        if (e instanceof PredefinedException) {
            PredefinedException predefinedException = (PredefinedException) e;
            logger.warn(String.format("%s %s %s %dms %s : %s",
                    withColor(predefinedException.getStatus().value(), Color.RED),
                    request.getMethod(),
                    withColor(request.getRequestURI(), Color.BLUE), Duration.between(begin, end).toMillis(),
                    withColor(user == null ? "匿名用户" : user.getUsername(), Color.CYAN),
                    withColor(predefinedException.getReason(), Color.YELLOW)));
        } else {
            e.printStackTrace();
            logger.error(String.format("%s %s %s %dms %s : %s",
                    withColor(HttpStatus.INTERNAL_SERVER_ERROR.value(), Color.RED),
                    request.getMethod(),
                    withColor(request.getRequestURI(), Color.BLUE),
                    Duration.between(begin, end).toMillis(),
                    withColor(user == null ? "匿名用户" : user.getUsername(), Color.CYAN),
                    withColor(e.getMessage(), Color.YELLOW)));
        }
    }

    @AfterThrowing(value = "pointcut()", throwing = "e")
    public void doAfterThrowing(JoinPoint joinPoint, Exception e) {
        logNotSuccess(joinPoint.getTarget().getClass(), e);
    }

}
