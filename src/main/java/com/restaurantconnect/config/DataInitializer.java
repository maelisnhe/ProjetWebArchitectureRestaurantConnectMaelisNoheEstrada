package com.restaurantconnect.config;

import com.restaurantconnect.model.MenuItem;
import com.restaurantconnect.model.Rating;
import com.restaurantconnect.model.User;
import com.restaurantconnect.model.enums.Role;
import com.restaurantconnect.repository.MenuItemRepository;
import com.restaurantconnect.repository.RatingRepository;
import com.restaurantconnect.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.math.BigDecimal;
import java.time.Instant;

@Configuration
public class DataInitializer {

        @Bean
        CommandLineRunner initDatabase(UserRepository userRepository, MenuItemRepository menuItemRepository,
                        RatingRepository ratingRepository) {
                return args -> {
                        // ===== USERS =====
                        userRepository.deleteAll();

                        User defaultUser = userRepository.save(User.builder()
                                        .firstname("Maëlys")
                                        .lastname("Restaurant")
                                        .email("maelys@restaurantconnect.com")
                                        .phone("+33 6 12 34 56 78")
                                        .role(Role.CLIENT)
                                        .createdAt(Instant.now())
                                        .build());

                        System.out.println("✅ Utilisateur créé : " + defaultUser.getFirstname() + " (ID: "
                                        + defaultUser.getId() + ")");

                        // ===== MENU ITEMS =====
                        menuItemRepository.deleteAll();

                        // ENTRÉES
                        MenuItem saintJacques = menuItemRepository.save(MenuItem.builder()
                                        .name("Saint-Jacques de la Baie de Seine")
                                        .description("Noix de Saint-Jacques poêlées, émulsion d'agrumes et caviar Osciètre")
                                        .price(BigDecimal.valueOf(45.0))
                                        .category("ENTREES")
                                        .imageUrl("https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&q=80")
                                        .vegetarian(false)
                                        .available(true)
                                        .build());

                        MenuItem foieGras = menuItemRepository.save(MenuItem.builder()
                                        .name("Foie Gras de Canard des Landes")
                                        .description("Poêlé minute, chutney de figues et pain d'épices maison")
                                        .price(BigDecimal.valueOf(38.0))
                                        .category("ENTREES")
                                        .imageUrl("https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80")
                                        .vegetarian(false)
                                        .available(true)
                                        .build());

                        MenuItem homard = menuItemRepository.save(MenuItem.builder()
                                        .name("Homard Bleu de Bretagne")
                                        .description("En gelée translucide, condiments acidulés et herbes fraîches")
                                        .price(BigDecimal.valueOf(52.0))
                                        .category("ENTREES")
                                        .imageUrl("https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600&q=80")
                                        .vegetarian(false)
                                        .available(true)
                                        .build());

                        menuItemRepository.save(MenuItem.builder()
                                        .name("Tartare de Thon Albacore")
                                        .description("Taillé au couteau, avocat crémeux et wasabi doux")
                                        .price(BigDecimal.valueOf(32.0))
                                        .category("ENTREES")
                                        .imageUrl("https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&q=80")
                                        .vegetarian(false)
                                        .available(true)
                                        .build());

                        menuItemRepository.save(MenuItem.builder()
                                        .name("Asperges Blanches du Périgord")
                                        .description("Cuites à la perfection, hollandaise légère et œuf mollet")
                                        .price(BigDecimal.valueOf(34.0))
                                        .category("ENTREES")
                                        .imageUrl("https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=600&q=80")
                                        .vegetarian(true)
                                        .available(true)
                                        .build());

                        // PLATS
                        MenuItem wagyu = menuItemRepository.save(MenuItem.builder()
                                        .name("Filet de Bœuf Wagyu")
                                        .description("Cuisson maîtrisée, réduction de vin rouge et moelle rôtie")
                                        .price(BigDecimal.valueOf(85.0))
                                        .category("PLATS")
                                        .imageUrl("https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80")
                                        .vegetarian(false)
                                        .available(true)
                                        .build());

                        menuItemRepository.save(MenuItem.builder()
                                        .name("Bar de Ligne à la Plancha")
                                        .description("Peau croustillante, vierge d'agrumes et légumes croquants")
                                        .price(BigDecimal.valueOf(68.0))
                                        .category("PLATS")
                                        .imageUrl("https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=600&q=80")
                                        .vegetarian(false)
                                        .available(true)
                                        .build());

                        menuItemRepository.save(MenuItem.builder()
                                        .name("Turbot Sauvage au Champagne")
                                        .description("Nage crémeuse, beurre blanc iodé et caviar Kristal")
                                        .price(BigDecimal.valueOf(78.0))
                                        .category("PLATS")
                                        .imageUrl("https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&q=80")
                                        .vegetarian(false)
                                        .available(true)
                                        .build());

                        menuItemRepository.save(MenuItem.builder()
                                        .name("Agneau de Sisteron en Deux Façons")
                                        .description("Carré rôti et épaule confite, jus au thym citronné")
                                        .price(BigDecimal.valueOf(74.0))
                                        .category("PLATS")
                                        .imageUrl("https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&q=80")
                                        .vegetarian(false)
                                        .available(true)
                                        .build());

                        MenuItem risotto = menuItemRepository.save(MenuItem.builder()
                                        .name("Risotto aux Cèpes et Parmesan")
                                        .description("Crémeux à souhait, copeaux de truffe noire du Périgord")
                                        .price(BigDecimal.valueOf(58.0))
                                        .category("PLATS")
                                        .imageUrl("https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80")
                                        .vegetarian(true)
                                        .available(true)
                                        .build());

                        // DESSERTS
                        MenuItem souffle = menuItemRepository.save(MenuItem.builder()
                                        .name("Soufflé au Grand Marnier")
                                        .description("Aérien et généreux, glace vanille de Madagascar")
                                        .price(BigDecimal.valueOf(24.0))
                                        .category("DESSERTS")
                                        .imageUrl("https://images.unsplash.com/photo-1612182162866-c6e6174a0c42?w=600&q=80")
                                        .vegetarian(true)
                                        .available(true)
                                        .build());

                        menuItemRepository.save(MenuItem.builder()
                                        .name("Tarte Tatin Caramélisée")
                                        .description("Pommes fondantes, glace caramel beurre salé")
                                        .price(BigDecimal.valueOf(22.0))
                                        .category("DESSERTS")
                                        .imageUrl("https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80")
                                        .vegetarian(true)
                                        .available(true)
                                        .build());

                        menuItemRepository.save(MenuItem.builder()
                                        .name("Profiteroles au Chocolat Valrhona")
                                        .description("Choux croustillants, glace vanille et sauce chocolat onctueuse")
                                        .price(BigDecimal.valueOf(20.0))
                                        .category("DESSERTS")
                                        .imageUrl("https://images.unsplash.com/photo-1511911063855-2bf39afa5b2e?w=600&q=80")
                                        .vegetarian(true)
                                        .available(true)
                                        .build());

                        menuItemRepository.save(MenuItem.builder()
                                        .name("Crème Brûlée à la Vanille Bourbon")
                                        .description("Caramel craquant, subtilité vanillée")
                                        .price(BigDecimal.valueOf(18.0))
                                        .category("DESSERTS")
                                        .imageUrl("https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600&q=80")
                                        .vegetarian(true)
                                        .available(true)
                                        .build());

                        menuItemRepository.save(MenuItem.builder()
                                        .name("Fondant au Chocolat Guanaja")
                                        .description("Cœur coulant, éclats de fève de cacao et glace vanille")
                                        .price(BigDecimal.valueOf(23.0))
                                        .category("DESSERTS")
                                        .imageUrl("https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80")
                                        .vegetarian(true)
                                        .available(true)
                                        .build());

                        // BOISSONS
                        menuItemRepository.save(MenuItem.builder()
                                        .name("Château Margaux 2015")
                                        .description("Grand cru classé, notes de cassis et de cèdre")
                                        .price(BigDecimal.valueOf(450.0))
                                        .category("BOISSONS")
                                        .imageUrl("https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&q=80")
                                        .vegetarian(true)
                                        .available(true)
                                        .build());

                        menuItemRepository.save(MenuItem.builder()
                                        .name("Champagne Dom Pérignon 2012")
                                        .description("Bulle fine, arômes de brioche et d'agrumes")
                                        .price(BigDecimal.valueOf(320.0))
                                        .category("BOISSONS")
                                        .imageUrl("https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=600&q=80")
                                        .vegetarian(true)
                                        .available(true)
                                        .build());

                        menuItemRepository.save(MenuItem.builder()
                                        .name("Puligny-Montrachet 2018")
                                        .description("Blanc de Bourgogne, minéralité et élégance")
                                        .price(BigDecimal.valueOf(180.0))
                                        .category("BOISSONS")
                                        .imageUrl("https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=600&q=80")
                                        .vegetarian(true)
                                        .available(true)
                                        .build());

                        menuItemRepository.save(MenuItem.builder()
                                        .name("Eau Minérale Évian")
                                        .description("Plate ou pétillante, 75cl")
                                        .price(BigDecimal.valueOf(8.0))
                                        .category("BOISSONS")
                                        .imageUrl("https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&q=80")
                                        .vegetarian(true)
                                        .available(true)
                                        .build());

                        menuItemRepository.save(MenuItem.builder()
                                        .name("Cocktail Signature 'L'Élégance'")
                                        .description("Gin artisanal, fleur de sureau et citron vert")
                                        .price(BigDecimal.valueOf(22.0))
                                        .category("BOISSONS")
                                        .imageUrl("https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80")
                                        .vegetarian(true)
                                        .available(true)
                                        .build());

                        System.out.println("✅ 20 plats insérés dans la base de données");

                        // ===== RATINGS (SAMPLE DATA) =====
                        ratingRepository.deleteAll();

                        // Add sample ratings for testing
                        ratingRepository.save(new Rating(saintJacques, 5, defaultUser));
                        ratingRepository.save(new Rating(foieGras, 4, defaultUser));
                        ratingRepository.save(new Rating(wagyu, 5, defaultUser));
                        ratingRepository.save(new Rating(risotto, 4, defaultUser));
                        ratingRepository.save(new Rating(souffle, 5, defaultUser));
                        ratingRepository.save(new Rating(homard, 5, defaultUser));
                        ratingRepository.save(new Rating(homard, 4, defaultUser)); // Multiples notes pour le homard

                        System.out.println("✅ 7 notes d'exemple insérées dans la base de données");
                };
        }
}
