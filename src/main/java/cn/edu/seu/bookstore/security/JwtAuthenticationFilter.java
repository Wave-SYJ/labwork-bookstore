package cn.edu.seu.bookstore.security;

import cn.edu.seu.bookstore.utils.SecurityUtils;
import io.jsonwebtoken.JwtException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Enumeration;

public class JwtAuthenticationFilter extends BasicAuthenticationFilter {

    private final SecurityConstants constants;
    private final SecurityUtils utils;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, SecurityConstants constants, SecurityUtils utils) {
        super(authenticationManager);
        this.constants = constants;
        this.utils = utils;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String token = request.getHeader(constants.TOKEN_HEADER);
        if (token == null || !token.startsWith(constants.TOKEN_PREFIX)) {
            SecurityContextHolder.clearContext();
            chain.doFilter(request, response);
            return;
        }
        String tokenContent = token.replace(constants.TOKEN_PREFIX, "");
        UsernamePasswordAuthenticationToken authentication = null;

        try {
            authentication = utils.parseToken(tokenContent);
        } catch (JwtException e) {
            logger.error("无效的 JWT : " + e.getMessage());
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(request, response);
    }
}
