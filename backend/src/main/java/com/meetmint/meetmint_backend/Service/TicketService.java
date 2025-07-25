package com.meetmint.meetmint_backend.Service;

import com.meetmint.meetmint_backend.Dto.ApiResponseDTO;
import com.meetmint.meetmint_backend.Dto.TicketRequestDto;
import com.meetmint.meetmint_backend.Dto.TicketResponseDto;
import com.meetmint.meetmint_backend.Dto.UserRequestDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

public interface TicketService {
    ResponseEntity<ApiResponseDTO<?>> createTicket(TicketRequestDto ticketRequestDto);
    ResponseEntity<ApiResponseDTO<?>> getTicketById(UserRequestDto emailAndPassword);
    ResponseEntity<ApiResponseDTO<?>> updateTicketById(Long id, UserRequestDto userRequestDto,String authHeader);
    ResponseEntity<ApiResponseDTO<?>> deleteTicketById(Long id);

}

