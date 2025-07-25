package com.meetmint.meetmint_backend.Controller;

import com.meetmint.meetmint_backend.Dto.ApiResponseDTO;
import com.meetmint.meetmint_backend.Dto.TicketRequestDto;
import com.meetmint.meetmint_backend.Dto.TicketResponseDto;
import com.meetmint.meetmint_backend.Service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ticket")
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;
    @PostMapping("/create")
    public ResponseEntity<ApiResponseDTO<?>> createTicket(@RequestBody TicketRequestDto ticketRequestDto){
       return ticketService.createTicket(ticketRequestDto);
    }
}
