package com.restaurantconnect.service;

import com.restaurantconnect.exception.ResourceNotFoundException;
import com.restaurantconnect.model.RestaurantTable;
import com.restaurantconnect.repository.RestaurantTableRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RestaurantTableService {

    private final RestaurantTableRepository tableRepository;

    public List<RestaurantTable> listAll() {
        return tableRepository.findAll();
    }

    public RestaurantTable getById(Long id) {
        return tableRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Table not found: " + id));
    }

    public RestaurantTable create(RestaurantTable table) {
        return tableRepository.save(table);
    }

    public RestaurantTable update(Long id, RestaurantTable table) {
        RestaurantTable existing = getById(id);
        table.setId(existing.getId());
        return tableRepository.save(table);
    }

    public void delete(Long id) {
        RestaurantTable existing = getById(id);
        tableRepository.delete(existing);
    }

    public RestaurantTable updateAvailability(Long id, Boolean available) {
        RestaurantTable table = getById(id);
        table.setAvailable(available);
        return tableRepository.save(table);
    }
}
