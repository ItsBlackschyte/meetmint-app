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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

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

        if(Objects.equals(event.getTicketCount(), event.getTicketBooked())) {
            ApiResponseDTO<Ticket> apiResponseDTO = ApiResponseDTO.<Ticket>builder()
                    .success(false)
                    .message("No Available Tickets")
                    .build();
            return ResponseEntity.ok(apiResponseDTO);
        }
        User user = userRepository.findById(ticketRequestDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        

        Ticket ticket=Ticket.builder()
                .holderName(user.getFirstName()+" "+user.getLastName())
                .holderEmail(user.getEmail())
                .event(event)
                .user(user)
                .ticketPrice(event.getPrice())
                .startTime(event.getStartTime())
                .endTime(event.getEndTime())
                .eventTitle(event.getTitle())
                .build();


        ticketRepository.save(ticket);
        event.setTicketBooked(event.getTicketBooked()+1);
        eventRepository.save(event);

        ApiResponseDTO<Ticket>apiResponseDTO= ApiResponseDTO.<Ticket>builder()
                .success(true)
                .message("Ticket Created Successfully")
                .data(ticket)
                .build();
        return ResponseEntity.ok(apiResponseDTO);
    }


    @Override
    public ResponseEntity<ApiResponseDTO<?>> getTicketById(@PathVariable Long id) {

        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
        ApiResponseDTO<Ticket> apiResponseDTO = ApiResponseDTO.<Ticket>builder()
                .success(true)
                .message("Ticket fetched successfully")
                .data(ticket)
                .build();

        return ResponseEntity.ok(apiResponseDTO);
    }

    @Override
    public ResponseEntity<ApiResponseDTO<?>> getAllTicket() {
        try
        {
            Ticket ticket = (Ticket) ticketRepository.findAll();

            ApiResponseDTO<Ticket>apiResponseDTO=ApiResponseDTO.<Ticket>builder()
                    .message("ticket fetch successfully")
                    .success(true)
                    .data(ticket)
                    .build();
            return ResponseEntity.ok().body(apiResponseDTO);
        }catch (Exception exception){
            ApiResponseDTO<String> apiResponseDTO=ApiResponseDTO.<String>builder()
                    .message("something wents wrong")
                    .success(false)
                    .build();
            return ResponseEntity.status(503).body(apiResponseDTO);
        }

    }

    @Override
    public ResponseEntity<ApiResponseDTO<?>> getTicketByEmail(String email) {
        List<Ticket> myTickets=ticketRepository.findByHolderEmail(email);
        ApiResponseDTO<List<Ticket>>apiResponseDTO=ApiResponseDTO.<List<Ticket>>builder()
                .message("All tickets are fetched ")
                .success(true)
                .data(myTickets)
                .build();
        return ResponseEntity.ok(apiResponseDTO);
    }


}
