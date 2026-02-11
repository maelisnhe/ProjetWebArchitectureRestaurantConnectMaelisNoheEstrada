package com.restaurantconnect.repository;

import com.restaurantconnect.model.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
    List<MenuItem> findByCategory(String category);

    List<MenuItem> findByAvailableTrue();

    List<MenuItem> findByVegetarianTrue();

    List<MenuItem> findByCategoryAndAvailableTrue(String category);

    List<MenuItem> findByVegetarianTrueAndAvailableTrue();
}
