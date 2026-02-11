package com.restaurantconnect.controller;

import com.restaurantconnect.model.RestaurantTable;
import com.restaurantconnect.service.RestaurantTableService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tables")
@RequiredArgsConstructor
@Tag(name = "Restaurant Tables", description = "Table management APIs")
public class RestaurantTableController {

    private final RestaurantTableService tableService;

    @Operation(summary = "List all tables")
    @GetMapping
    public ResponseEntity<List<RestaurantTable>> listAll() {
        return ResponseEntity.ok(tableService.listAll());
    }

    @Operation(summary = "Get table by id")
    @GetMapping("/{id}")
    public ResponseEntity<RestaurantTable> getById(@PathVariable Long id) {
        return ResponseEntity.ok(tableService.getById(id));
    }

    @Operation(summary = "Create a new table")
    @PostMapping
    public ResponseEntity<RestaurantTable> create(@Valid @RequestBody RestaurantTable table) {
        return ResponseEntity.status(HttpStatus.CREATED).body(tableService.create(table));
    }

    @Operation(summary = "Update an existing table")
    @PutMapping("/{id}")
    public ResponseEntity<RestaurantTable> update(@PathVariable Long id, @Valid @RequestBody RestaurantTable table) {
        return ResponseEntity.ok(tableService.update(id, table));
    }

    @Operation(summary = "Delete a table")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        tableService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Update table availability")
    @PatchMapping("/{id}/availability")
    public ResponseEntity<RestaurantTable> updateAvailability(
            @PathVariable Long id,
            @RequestBody Map<String, Boolean> payload) {
        Boolean available = payload.get("available");
        return ResponseEntity.ok(tableService.updateAvailability(id, available));
    }
}
