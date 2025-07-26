package com.meetmint.meetmint_backend.Dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class EventResponseDto {
    private Long id;
    private String title;
    private String description;
    private String eventImageUrl;
    private int ticketCount;
    private int ticketBooked;
    private String tag;
    private double price;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

}
