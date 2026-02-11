package com.restaurantconnect.controller;

import com.restaurantconnect.dto.OrderRequestDto;
import com.restaurantconnect.model.Order;
import com.restaurantconnect.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @Operation(summary = "Create an order")
    @PostMapping
    public ResponseEntity<Order> create(@Valid @RequestBody OrderRequestDto dto) {
        Order created = orderService.create(dto);
        return ResponseEntity.ok(created);
    }

    @Operation(summary = "List all orders")
    @GetMapping
    public ResponseEntity<List<Order>> listAll() {
        return ResponseEntity.ok(orderService.listAll());
    }
}
