package com.meetmint.meetmint_backend.Repository;

import com.meetmint.meetmint_backend.Model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByTag(String tag);
    List<Event> findByCreatedByEmail(String email);
}
