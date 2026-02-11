package com.restaurantconnect.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class OrderItemDto {
    @NotNull
    private Long menuItemId;
    @Min(1)
    private Integer quantity = 1;
}
