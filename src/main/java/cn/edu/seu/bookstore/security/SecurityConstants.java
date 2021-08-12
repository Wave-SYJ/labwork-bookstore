package cn.edu.seu.bookstore.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class SecurityConstants {

    @Value("${project.security.expiration}")
    public Long EXPIRATION;

    @Value("${project.security.expiration_remember}")
    public Long EXPIRATION_REMEMBER;

    @Value("${project.security.jwt_secret_key}")
    public String JWT_SECRET_KEY;

    public String TOKEN_HEADER = "Security-Token";

    @Value("${project.security.token_prefix}")
    public String TOKEN_PREFIX;

    public final String AUTH_CLAIMS = "auth";

}
