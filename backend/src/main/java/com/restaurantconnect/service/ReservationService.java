package com.restaurantconnect.service;

import com.restaurantconnect.dto.ReservationRequestDto;
import com.restaurantconnect.exception.ResourceNotFoundException;
import com.restaurantconnect.model.Reservation;
import com.restaurantconnect.model.RestaurantTable;
import com.restaurantconnect.model.User;
import com.restaurantconnect.repository.ReservationRepository;
import com.restaurantconnect.repository.RestaurantTableRepository;
import com.restaurantconnect.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationService {

        private final ReservationRepository reservationRepository;
        private final UserRepository userRepository;
        private final RestaurantTableRepository tableRepository;

        public Reservation create(ReservationRequestDto dto) {
                // 1. Opening hours validation
                if (!isWithinOpeningHours(dto.getReservationTime())) {
                        throw new ResponseStatusException(
                                        HttpStatus.BAD_REQUEST,
                                        "OUT_OF_OPENING_HOURS");
                }

                // 2. Capacity check
                int currentTotal = reservationRepository.sumPeopleByDateAndTime(
                                dto.getReservationDate(),
                                dto.getReservationTime()).orElse(0);

                if (currentTotal + dto.getNumberOfPeople() > 30) {
                        throw new ResponseStatusException(
                                        HttpStatus.BAD_REQUEST,
                                        "CAPACITY_EXCEEDED");
                }

                // 3. Create reservation
                User user = userRepository.findById(dto.getUserId())
                                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + dto.getUserId()));

                // Table is OPTIONAL - only load if tableId is provided
                RestaurantTable table = null;
                if (dto.getTableId() != null) {
                        table = tableRepository.findById(dto.getTableId())
                                        .orElseThrow(() -> new ResourceNotFoundException(
                                                        "Table not found: " + dto.getTableId()));
                }

                Reservation reservation = Reservation.builder()
                                .user(user)
                                .table(table) // Can be null
                                .reservationDate(dto.getReservationDate())
                                .reservationTime(dto.getReservationTime())
                                .numberOfPeople(dto.getNumberOfPeople())
                                .build();

                return reservationRepository.save(reservation);
        }

        public List<Reservation> listAll() {
                return reservationRepository.findAll();
        }

        /**
         * Validates if the reservation time is within restaurant opening hours.
         * Service times: Lunch (12:00-14:30), Dinner (19:00-22:30)
         */
        private boolean isWithinOpeningHours(LocalTime time) {
                LocalTime lunchStart = LocalTime.of(12, 0);
                LocalTime lunchEnd = LocalTime.of(14, 30);
                LocalTime dinnerStart = LocalTime.of(19, 0);
                LocalTime dinnerEnd = LocalTime.of(22, 30);

                boolean isLunchService = !time.isBefore(lunchStart) && !time.isAfter(lunchEnd);
                boolean isDinnerService = !time.isBefore(dinnerStart) && !time.isAfter(dinnerEnd);

                return isLunchService || isDinnerService;
        }
}
