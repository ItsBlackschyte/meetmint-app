package com.meetmint.meetmint_backend.Service;

import com.meetmint.meetmint_backend.Dto.ApiResponseDTO;
import com.meetmint.meetmint_backend.Dto.TicketRequestDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

public interface TicketService {
    ResponseEntity<ApiResponseDTO<?>> createTicket(TicketRequestDto ticketRequestDto);
    ResponseEntity<ApiResponseDTO<?>> getTicketById(@PathVariable Long id );
    ResponseEntity<ApiResponseDTO<?>> getAllTicket();
    ResponseEntity<ApiResponseDTO<?>> getTicketByEmail(String email);
    ResponseEntity<ApiResponseDTO<?>> checkTicketAvailibilityByEventId(@PathVariable long id);
    ResponseEntity<ApiResponseDTO<?>> getMyTickets();
    ResponseEntity<ApiResponseDTO<?>> getMyEventRegister();
}

