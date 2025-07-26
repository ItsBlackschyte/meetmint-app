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
    private Long eventId;
    private Long userId;
}
