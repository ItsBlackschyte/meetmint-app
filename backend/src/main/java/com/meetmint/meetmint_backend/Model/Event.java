package com.meetmint.meetmint_backend.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;

    @NotBlank
    private String title;

    @NotBlank
    private String description ;
    private String eventImageUrl ;

    @NotBlank
    private String tag;

    @Positive
    private Integer ticketCount ;

    @PositiveOrZero
    private Integer ticketBooked ;

    @DecimalMin("0.0")
    private Double price ;

    @FutureOrPresent
    private LocalDateTime startTime ;

    @Future
    private LocalDateTime endTime ;

}
