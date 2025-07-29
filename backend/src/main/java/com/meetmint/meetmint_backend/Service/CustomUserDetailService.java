package com.meetmint.meetmint_backend.Service;

import com.meetmint.meetmint_backend.CustomUserDetails;
import com.meetmint.meetmint_backend.Model.User;
import com.meetmint.meetmint_backend.Repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Objects;
@Component
public class CustomUserDetailService implements UserDetailsService {
    private final UserRepository userRepository;

    public CustomUserDetailService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        User user =userRepository.findByEmail(username).get();
        if(Objects.isNull(user)) {
            System.out.println("Invalid user credentials");
            throw new UsernameNotFoundException("Invalid user credentials ");
        }
        return new CustomUserDetails(user);
    }
}
