package com.meetmint.meetmint_backend.Service.Impl;

import com.meetmint.meetmint_backend.Dto.*;
import com.meetmint.meetmint_backend.Model.Event;
import com.meetmint.meetmint_backend.Model.Ticket;
import com.meetmint.meetmint_backend.Model.User;
import com.meetmint.meetmint_backend.Repository.EventRepository;
import com.meetmint.meetmint_backend.Repository.TicketRepository;
import com.meetmint.meetmint_backend.Repository.UserRepository;
import com.meetmint.meetmint_backend.Service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service

public class TicketServiceImpl implements TicketService {

   private final TicketRepository ticketRepository;
   private final EventRepository eventRepository;
   private final UserRepository userRepository;


    public TicketServiceImpl(TicketRepository ticketRepository, EventRepository eventRepository, UserRepository userRepository) {
        this.ticketRepository = ticketRepository;
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    @Override
    public ResponseEntity<ApiResponseDTO<?>> createTicket(TicketRequestDto ticketRequestDto) {
        Event event = eventRepository.findById(ticketRequestDto.getEventId())
                .orElseThrow(() -> new RuntimeException("Event not found"));

        User user = userRepository.findById(ticketRequestDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Ticket ticket=Ticket.builder()
                .holderName(ticketRequestDto.getHolderName())
                .holderEmail(ticketRequestDto.getHolderEmail())
                .event(event)
                .user(user)
                .ticketPrice(ticketRequestDto.getTicketPrice())
                .startTime(ticketRequestDto.getStartTime())
                .endTime(ticketRequestDto.getEndTime())
                .build();

        ticketRepository.save(ticket);
        ApiResponseDTO<Ticket>apiResponseDTO= ApiResponseDTO.<Ticket>builder()
                .success(true)
                .message("Ticket Created Successfully")
                .data(ticket)
                .build();
        return ResponseEntity.ok(apiResponseDTO);
    }

    @Override
    public ResponseEntity<ApiResponseDTO<?>> getTicketById(UserRequestDto emailAndPassword) {
        return null;
    }

    @Override
    public ResponseEntity<ApiResponseDTO<?>> updateTicketById(Long id, UserRequestDto userRequestDto, String authHeader) {
        return null;
    }

    @Override
    public ResponseEntity<ApiResponseDTO<?>> deleteTicketById(Long id) {
        return null;
    }


}
