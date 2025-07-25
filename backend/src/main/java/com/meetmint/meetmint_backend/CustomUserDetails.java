package com.meetmint.meetmint_backend;

import com.meetmint.meetmint_backend.Model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class CustomUserDetails implements UserDetails {


        private final User user;

        public CustomUserDetails( User user) {
            this.user = user;
        }


        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            // Important: Use ROLE_ prefix to match Spring Security expectations
            return Collections.singleton(new SimpleGrantedAuthority("ROLE_" + user.isOrganiser()));
        }

        @Override
        public String getPassword() {
            return user.getPassword();
        }

        public long getId(){
            return user.getId();
        }

        public boolean getRole() {
            return user.isOrganiser();
        }

        @Override
        public String getUsername() {
            return user.getEmail();
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
    }

