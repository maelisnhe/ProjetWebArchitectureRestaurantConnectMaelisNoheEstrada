package com.restaurantconnect.repository;

import com.restaurantconnect.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    @Query("SELECT SUM(r.numberOfPeople) FROM Reservation r WHERE r.reservationDate = :date AND r.reservationTime = :time")
    Optional<Integer> sumPeopleByDateAndTime(@Param("date") LocalDate date, @Param("time") LocalTime time);
}
