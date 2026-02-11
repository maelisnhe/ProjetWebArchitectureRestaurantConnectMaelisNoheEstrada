package com.restaurantconnect.controller;

import com.restaurantconnect.model.Rating;
import com.restaurantconnect.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ratings")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    @PostMapping
    public ResponseEntity<Rating> createRating(@RequestBody Rating rating) {
        try {
            Long menuItemId = rating.getMenuItem() != null ? rating.getMenuItem().getId() : null;
            Long userId = rating.getUser() != null ? rating.getUser().getId() : null;
            System.out.println("🔍 DEBUG: createRating() called with: menuItemId=" + menuItemId + ", rating="
                    + rating.getRating() + ", userId=" + userId);
            Rating created = ratingService.createRating(rating);
            System.out.println("✅ DEBUG: Rating created with ID=" + created.getId());
            return ResponseEntity.ok(created);
        } catch (Exception e) {
            System.err.println("❌ ERROR in createRating: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @GetMapping
    public ResponseEntity<List<Rating>> getAllRatings() {
        try {
            System.out.println("🔍 DEBUG: getAllRatings() called");
            List<Rating> ratings = ratingService.getAllRatings();
            System.out.println("✅ DEBUG: Found " + ratings.size() + " ratings");
            return ResponseEntity.ok(ratings);
        } catch (Exception e) {
            System.err.println("❌ ERROR in getAllRatings: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @GetMapping("/menu-item/{menuItemId}")
    public ResponseEntity<List<Rating>> getRatingsByMenuItem(@PathVariable Long menuItemId) {
        return ResponseEntity.ok(ratingService.getRatingsByMenuItem(menuItemId));
    }

    @GetMapping("/menu-item/{menuItemId}/average")
    public ResponseEntity<Map<String, Double>> getAverageRating(@PathVariable Long menuItemId) {
        try {
            System.out.println("🔍 DEBUG: getAverageRating() called for menuItemId=" + menuItemId);
            Double avg = ratingService.getAverageRating(menuItemId);
            System.out.println("✅ DEBUG: Average rating = " + avg);
            Map<String, Double> response = new HashMap<>();
            response.put("average", avg);
            response.put("menuItemId", menuItemId.doubleValue());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("❌ ERROR in getAverageRating for menuItemId=" + menuItemId + ": " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Rating> updateRating(@PathVariable Long id, @RequestBody Rating rating) {
        Rating updated = ratingService.updateRating(id, rating);
        return ResponseEntity.ok(updated);
    }
}
