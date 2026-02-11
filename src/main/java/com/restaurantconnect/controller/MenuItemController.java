package com.restaurantconnect.controller;

import com.restaurantconnect.model.MenuItem;
import com.restaurantconnect.service.MenuItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu-items")
public class MenuItemController {

    @Autowired
    private MenuItemService menuItemService;

    @PostMapping
    public ResponseEntity<MenuItem> create(@RequestBody MenuItem menuItem) {
        return ResponseEntity.ok(menuItemService.create(menuItem));
    }

    @GetMapping
    public ResponseEntity<List<MenuItem>> getAll(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Boolean vegetarian) {
        if (vegetarian != null && vegetarian) {
            return ResponseEntity.ok(menuItemService.getVegetarian());
        }
        if (category != null && !category.isEmpty()) {
            return ResponseEntity.ok(menuItemService.getByCategory(category));
        }
        return ResponseEntity.ok(menuItemService.getAvailable());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MenuItem> getById(@PathVariable Long id) {
        return ResponseEntity.ok(menuItemService.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MenuItem> update(@PathVariable Long id, @RequestBody MenuItem menuItem) {
        return ResponseEntity.ok(menuItemService.update(id, menuItem));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        menuItemService.delete(id);
        return ResponseEntity.ok().build();
    }
}
