error id: file:///C:/Users/maeli/WebApplication/SpringBoot/RestaurantConnect/restaurantconnect/src/main/java/com/restaurantconnect/controller/MenuController.java:io/swagger/v3/oas/annotations/Operation#
file:///C:/Users/maeli/WebApplication/SpringBoot/RestaurantConnect/restaurantconnect/src/main/java/com/restaurantconnect/controller/MenuController.java
empty definition using pc, found symbol in pc: io/swagger/v3/oas/annotations/Operation#
semanticdb not found
empty definition using fallback
non-local guesses:

offset: 179
uri: file:///C:/Users/maeli/WebApplication/SpringBoot/RestaurantConnect/restaurantconnect/src/main/java/com/restaurantconnect/controller/MenuController.java
text:
```scala
package com.restaurantconnect.controller;

import com.restaurantconnect.model.MenuItem;
import com.restaurantconnect.service.MenuService;
import io.swagger.v3.oas.annotations.@@Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
@RequiredArgsConstructor
public class MenuController {

    private final MenuService menuService;

    @Operation(summary = "List all menu items")
    @GetMapping
    public ResponseEntity<List<MenuItem>> list() {
        return ResponseEntity.ok(menuService.listAll());
    }

    @Operation(summary = "Get menu item by id")
    @GetMapping("/{id}")
    public ResponseEntity<MenuItem> getById(@PathVariable Long id) {
        return ResponseEntity.ok(menuService.getById(id));
    }
}

```


#### Short summary: 

empty definition using pc, found symbol in pc: io/swagger/v3/oas/annotations/Operation#