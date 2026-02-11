package com.restaurantconnect.repository;

import com.restaurantconnect.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    List<Rating> findByMenuItemId(Long menuItemId);

    @Query("SELECT COALESCE(AVG(r.rating), 0.0) FROM Rating r WHERE r.menuItem.id = :menuItemId")
    Double getAverageRatingByMenuItemId(Long menuItemId);

    List<Rating> findByUserId(Long userId);
}
