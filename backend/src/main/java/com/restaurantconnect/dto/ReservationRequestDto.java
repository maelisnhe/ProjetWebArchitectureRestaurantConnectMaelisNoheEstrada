package com.restaurantconnect.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class ReservationRequestDto {
    @NotNull
    private Long userId;

    private Long tableId;

    @NotNull
    private LocalDate reservationDate;
    @NotNull
    private LocalTime reservationTime;
    @NotNull
    @Min(1)
    private Integer numberOfPeople;
}
