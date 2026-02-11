package com.restaurantconnect.service;

import com.restaurantconnect.dto.OrderItemDto;
import com.restaurantconnect.dto.OrderRequestDto;
import com.restaurantconnect.exception.ResourceNotFoundException;
import com.restaurantconnect.model.MenuItem;
import com.restaurantconnect.model.Order;
import com.restaurantconnect.model.OrderItem;
import com.restaurantconnect.model.User;
import com.restaurantconnect.repository.MenuItemRepository;
import com.restaurantconnect.repository.OrderItemRepository;
import com.restaurantconnect.repository.OrderRepository;
import com.restaurantconnect.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final MenuItemRepository menuItemRepository;
    private final UserRepository userRepository;

    public Order create(OrderRequestDto dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + dto.getUserId()));

        Order order = Order.builder().user(user).build();
        List<OrderItem> items = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;

        for (OrderItemDto i : dto.getItems()) {
            MenuItem menuItem = menuItemRepository.findById(i.getMenuItemId())
                    .orElseThrow(() -> new ResourceNotFoundException("MenuItem not found: " + i.getMenuItemId()));
            BigDecimal price = menuItem.getPrice();
            BigDecimal itemTotal = price.multiply(BigDecimal.valueOf(i.getQuantity()));
            total = total.add(itemTotal);

            OrderItem oi = OrderItem.builder()
                    .menuItem(menuItem)
                    .quantity(i.getQuantity())
                    .price(price)
                    .orderEntity(order)
                    .build();
            items.add(oi);
        }

        order.setTotalPrice(total);
        order.setItems(items);

        Order saved = orderRepository.save(order);
        // Ensure items persisted (cascade should handle it)
        return saved;
    }

    public List<Order> listAll() {
        return orderRepository.findAll();
    }
}
