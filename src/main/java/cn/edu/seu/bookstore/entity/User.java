package cn.edu.seu.bookstore.entity;

import cn.edu.seu.bookstore.utils.SecurityUtils;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.validator.constraints.Length;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.*;

@Entity
@Table(name = "t_user")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class User implements Serializable, UserDetails {

    private static final long serialVersionUID = -7394706769320382794L;

    @Id
    @GeneratedValue(generator = "uuid2")
    private UUID id;

    @NotNull
    @Length(min = 3, max = 15)
    @Column(name = "username", unique = true, nullable = false)
    private String username;

    @NotNull
    @Length(min = 6, max = 18)
    @Column(name = "password", nullable = false)
    private String password;

    @NotNull
    @Column(name = "role", nullable = false)
    private Integer role;

    public User(UUID id, String username, String password) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = Role.ROLE_ORDINARY.value();
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
        this.role = Role.ROLE_ORDINARY.value();
    }

    public User(String username, String password, Integer role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public User(UUID id, String username, String password, Integer role) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id) && Objects.equals(username, user.username) && Objects.equals(password, user.password) && Objects.equals(role, user.role);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, password, role);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return SecurityUtils.getAuthoritiesByRole(role);
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public enum Role {
        ROLE_ORDINARY(0),
        ROLE_ADMIN(1);

        private final Integer value;

        public Integer value() {
            return value;
        }

        Role(Integer i) {
            this.value = i;
        }
    }
}
