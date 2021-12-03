package cn.edu.seu.bookstore.security;

import cn.edu.seu.bookstore.config.LoggerAspect;
import cn.edu.seu.bookstore.config.PredefinedException;
import cn.edu.seu.bookstore.payload.RestResult;
import cn.edu.seu.bookstore.utils.SecurityUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableGlobalMethodSecurity(securedEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private SecurityConstants securityConstants;

    @Autowired
    private SecurityUtils securityUtils;

    @Autowired
    private LoggerAspect loggerAspect;

    private static final ObjectMapper objectMapper = new ObjectMapper();

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                // CSRF
                .csrf().disable()
                // 路由
                .authorizeRequests()
                .antMatchers("/auth/login", "/auth/register").permitAll()
                .antMatchers(HttpMethod.GET, "/book").permitAll()
                .anyRequest().authenticated()
                .and()
                // 过滤器
                .addFilter(new JwtAuthenticationFilter(authenticationManager(), securityConstants, securityUtils))
                // 关闭 session
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                // 异常处理
                .exceptionHandling().authenticationEntryPoint((request, response, authException) -> {
                    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                    objectMapper.writeValue(response.getOutputStream(), RestResult.failure(HttpStatus.UNAUTHORIZED, "请登录"));
                    loggerAspect.logNotSuccess(SecurityConfig.class, new PredefinedException(HttpStatus.UNAUTHORIZED, "未登录"));
                })
                .accessDeniedHandler((request, response, accessDeniedException) -> {
                    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                    objectMapper.writeValue(response.getOutputStream(), RestResult.failure(HttpStatus.FORBIDDEN, "无权限访问"));
                    loggerAspect.logNotSuccess(SecurityConfig.class, new PredefinedException(HttpStatus.FORBIDDEN, "无权限访问"));
                });

    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return passwordEncoder;
    }

    @Override
    @Bean
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }
}
