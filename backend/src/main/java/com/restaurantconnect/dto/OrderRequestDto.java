package com.restaurantconnect.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class OrderRequestDto {
    @NotNull
    private Long userId;
    @NotNull
    private List<OrderItemDto> items;
}
