package com.restaurantconnect.service;

import com.restaurantconnect.model.Rating;
import com.restaurantconnect.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    public Rating createRating(Rating rating) {
        return ratingRepository.save(rating);
    }

    public List<Rating> getAllRatings() {
        return ratingRepository.findAll();
    }

    public List<Rating> getRatingsByMenuItem(Long menuItemId) {
        return ratingRepository.findByMenuItemId(menuItemId);
    }

    public Double getAverageRating(Long menuItemId) {
        try {
            Double avg = ratingRepository.getAverageRatingByMenuItemId(menuItemId);
            return avg != null ? avg : 0.0;
        } catch (Exception e) {
            System.err.println("❌ ERROR in getAverageRating for menuItemId=" + menuItemId + ": " + e.getMessage());
            return 0.0;
        }
    }

    public Rating updateRating(Long id, Rating updatedRating) {
        Rating existing = ratingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rating not found"));
        existing.setRating(updatedRating.getRating());
        return ratingRepository.save(existing);
    }
}
