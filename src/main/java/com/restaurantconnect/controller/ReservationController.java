package com.restaurantconnect.controller;

import com.restaurantconnect.dto.ReservationRequestDto;
import com.restaurantconnect.model.Reservation;
import com.restaurantconnect.service.ReservationService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    @Operation(summary = "Create a reservation")
    @PostMapping
    public ResponseEntity<Reservation> create(@Valid @RequestBody ReservationRequestDto dto) {
        Reservation created = reservationService.create(dto);
        return ResponseEntity.ok(created);
    }

    @Operation(summary = "List all reservations")
    @GetMapping
    public ResponseEntity<List<Reservation>> list() {
        return ResponseEntity.ok(reservationService.listAll());
    }

}
