package com.meetmint.meetmint_backend.Dto;

import com.meetmint.meetmint_backend.Model.Event;
import com.meetmint.meetmint_backend.Model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TicketRequestDto {
    private Long id;
    private String holderName;
    private String holderEmail;
    private Long eventId;
    private Long userId;
    private String eventTitle;
    private double ticketPrice;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}
