package com.meetmint.meetmint_backend.Repository;

import com.meetmint.meetmint_backend.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  User findByEmail(String emailId);

}
