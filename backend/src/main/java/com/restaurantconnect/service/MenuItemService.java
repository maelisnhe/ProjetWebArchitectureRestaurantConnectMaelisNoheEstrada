package com.restaurantconnect.service;

import com.restaurantconnect.model.MenuItem;
import com.restaurantconnect.repository.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuItemService {

    @Autowired
    private MenuItemRepository menuItemRepository;

    public MenuItem create(MenuItem menuItem) {
        return menuItemRepository.save(menuItem);
    }

    public List<MenuItem> getAll() {
        return menuItemRepository.findAll();
    }

    public List<MenuItem> getAvailable() {
        return menuItemRepository.findByAvailableTrue();
    }

    public List<MenuItem> getByCategory(String category) {
        return menuItemRepository.findByCategoryAndAvailableTrue(category);
    }

    public List<MenuItem> getVegetarian() {
        return menuItemRepository.findByVegetarianTrueAndAvailableTrue();
    }

    public MenuItem getById(Long id) {
        return menuItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu item not found"));
    }

    public MenuItem update(Long id, MenuItem menuItem) {
        MenuItem existing = getById(id);
        existing.setName(menuItem.getName());
        existing.setDescription(menuItem.getDescription());
        existing.setPrice(menuItem.getPrice());
        existing.setCategory(menuItem.getCategory());
        existing.setAvailable(menuItem.getAvailable());
        existing.setImageUrl(menuItem.getImageUrl());
        existing.setVegetarian(menuItem.getVegetarian());
        return menuItemRepository.save(existing);
    }

    public void delete(Long id) {
        menuItemRepository.deleteById(id);
    }
}
