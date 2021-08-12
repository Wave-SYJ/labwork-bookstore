package cn.edu.seu.bookstore.utils;

import cn.edu.seu.bookstore.entity.User;
import cn.edu.seu.bookstore.security.SecurityConstants;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.crypto.SecretKey;
import javax.xml.bind.DatatypeConverter;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class SecurityUtils {

    private SecretKey SECRET_KEY;

    @Autowired
    private PasswordEncoder encoder;

    private SecurityConstants constants;

    @Autowired
    public void setConstants(SecurityConstants constants) {
        this.constants = constants;
        byte[] API_KEY_SECRET_BYTES = DatatypeConverter.parseBase64Binary(constants.JWT_SECRET_KEY);
        SECRET_KEY = Keys.hmacShaKeyFor(API_KEY_SECRET_BYTES);
    }

    public boolean checkPassword(String plainPassword, String encodedPassword) {
        return encoder.matches(plainPassword, encodedPassword);
    }

    public String encodePassword(String plainPassword) {
        return encoder.encode(plainPassword);
    }

    public String generateToken(User user, boolean remember) {
        Long expiration = remember ? constants.EXPIRATION_REMEMBER : constants.EXPIRATION;
        Date createdDate = new Date();
        Date expirationDate = new Date(createdDate.getTime() + expiration);

        List<String> authorities = user.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        String tokenContent = Jwts.builder()
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .claim(constants.AUTH_CLAIMS, String.join(",", authorities))
                .setId(user.getId().toString())
                .setIssuer("Wave-SYJ")
                .setIssuedAt(createdDate)
                .setSubject(user.getUsername())
                .setExpiration(expirationDate)
                .compact();
        return constants.TOKEN_PREFIX + tokenContent;
    }

    public UsernamePasswordAuthenticationToken parseToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(constants.JWT_SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();

        String auth = (String) claims.get(constants.AUTH_CLAIMS);
        List<SimpleGrantedAuthority> authorities =
                StringUtils.hasText(auth) ?
                        Arrays.stream(auth.split(","))
                                .map(SimpleGrantedAuthority::new)
                                .collect(Collectors.toList())
                        : new ArrayList<>();

        String username = claims.getSubject();
        UUID id = UUID.fromString(claims.getId());

        return new UsernamePasswordAuthenticationToken(new User(id, username, null), token, authorities);
    }

}
