package com.restaurantconnect.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "menu_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false, precision = 10, scale = 2)
    private java.math.BigDecimal price;

    @Column(nullable = false)
    private String category; // ENTREES, PLATS, DESSERTS, BOISSONS

    @Column(nullable = false)
    @Builder.Default
    private Boolean available = true;

    private String imageUrl;

    @Column(nullable = false)
    @Builder.Default
    private Boolean vegetarian = false;
}
