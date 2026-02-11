# 📘 RAPPORT TECHNIQUE - RestaurantConnect

> **Document d'explication exhaustif pour la compréhension et la présentation du projet**  
> Ce rapport détaille chaque composant, choix technique et solution apportée aux défis rencontrés.

---

## 📑 Table des Matières

1. [Vue d'ensemble](#1-vue-densemble)
2. [Architecture Globale](#2-architecture-globale)
3. [Modèles de Données (Backend)](#3-modèles-de-données-backend)
4. [Services et Logique Métier](#4-services-et-logique-métier)
5. [Pages Frontend](#5-pages-frontend)
6. [Défis Techniques Résolus](#6-défis-techniques-résolus)
7. [Choix Techniques Justifiés](#7-choix-techniques-justifiés)

---

## 1. Vue d'ensemble

### Objectif du Projet
RestaurantConnect est une **application full-stack de gestion gastronomique** conçue pour des restaurants haut de gamme. Elle permet :
- La **réservation intelligente** avec gestion de capacité
- La **notation des plats** par les clients
- La **visualisation des statistiques** via des graphiques

### Stack Technique Choisie

| Couche | Technologie | Justification |
|--------|-------------|---------------|
| **API Backend** | Spring Boot 3.2.12 | Framework Java mature, robuste, avec écosystème complet |
| **Base de Données** | PostgreSQL | SGBD relationnel open-source, performant pour les requêtes complexes |
| **ORM** | JPA/Hibernate | Abstraction élégante de la base de données, gestion automatique des relations |
| **Frontend** | React 18 | Bibliothèque moderne, réactive, avec vaste écosystème |
| **Build Frontend** | Vite | Build ultra-rapide avec Hot Module Replacement |
| **Styling** | CSS Custom | Contrôle total sur le design "Luxury Dark/Gold" |

---

## 2. Architecture Globale

### Pattern MVC Adapté (Backend)

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT (React)                       │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP REST
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                   CONTROLLER LAYER                          │
│  - MenuItemController                                       │
│  - ReservationController                                    │
│  - RatingController                                         │
│                                                             │
│  Rôle: Exposition des endpoints REST, validation initiale  │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                   SERVICE LAYER                             │
│  - ReservationService (logique capacité)                   │
│  - RatingService (calcul moyennes)                         │
│  - MenuItemService                                          │
│                                                             │
│  Rôle: Logique métier, validations complexes               │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  REPOSITORY LAYER                           │
│  - ReservationRepository (requêtes SQL)                    │
│  - RatingRepository                                         │
│                                                             │
│  Rôle: Accès aux données via Spring Data JPA               │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                   BASE DE DONNÉES                           │
│                    PostgreSQL                               │
└─────────────────────────────────────────────────────────────┘
```

### Composants Frontend

```
React App (Vite)
│
├── Pages (Routes)
│   ├── HomePage.tsx          → Landing page
│   ├── MenuPage.tsx          → Catalogue plats + filtres
│   ├── ReservationPage.tsx   → Formulaire réservation
│   └── ReviewsPage.tsx       → Dashboard graphiques
│
├── Components (Réutilisables)
│   ├── Navbar.tsx            → Navigation principale
│   └── StarRating.tsx        → Système d'étoiles
│
└── Services (API Calls)
    ├── api.ts                → Endpoints génériques
    └── ratingsAPI.ts         → Endpoints notations
```

---

## 3. Modèles de Données (Backend)

### 3.1 `MenuItem.java` - Le Plat

**Rôle** : Représente un article du menu (entrée, plat, dessert, boisson).

**Code clé** :
```java
@Entity
@Table(name = "menu_items")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MenuItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    private String description;

    @NotNull
    private BigDecimal price;

    private String category;      // ENTREES, PLATS, DESSERTS, BOISSONS
    private String imageUrl;
    private boolean vegetarian;   // Tag végétarien
    private boolean available;    // Disponibilité
}
```

**Pourquoi ces choix ?**

| Élément | Justification |
|---------|---------------|
| `@Entity` | Indique à JPA que cette classe est une table de la BDD |
| `@Table(name = "menu_items")` | Nom explicite en snake_case (convention SQL) |
| `BigDecimal` pour `price` | Évite les erreurs d'arrondi des `float`/`double` (crucial pour l'argent !) |
| `@NotBlank` / `@NotNull` | Validation des contraintes au niveau de l'objet Java |
| `@Data` (Lombok) | Génère automatiquement getters, setters, toString, equals, hashCode |
| `@Builder` (Lombok) | Pattern Builder pour une création fluide d'objets |

**Relations** :
- **Un plat peut avoir plusieurs notations** (`@OneToMany` implicite via `Rating`)

---

### 3.2 `Rating.java` - La Notation

**Rôle** : Représente l'évaluation d'un plat par un utilisateur (1 à 5 étoiles).

**Code clé** :
```java
@Entity
@Table(name = "ratings")
@Data
@NoArgsConstructor
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "menu_item_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private MenuItem menuItem;

    @Column(nullable = false)
    private Integer rating;  // 1-5

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User user;

    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private Instant createdAt;
}
```

**Pourquoi `@ManyToOne` ?**

Imaginez la situation réelle :
- **Un plat** (MenuItem) peut recevoir **plusieurs notations** (Rating) → **1:N**
- **Une notation** (Rating) est liée à **un seul plat** (MenuItem) → **N:1**

➡️ Côté `Rating`, on utilise `@ManyToOne` car **plusieurs ratings pointent vers un seul MenuItem**.

**Schéma visuel** :
```
MenuItem (id=1 "Wagyu")
    ↑
    ├── Rating (id=10, rating=5, user=Alice)
    ├── Rating (id=11, rating=4, user=Bob)
    └── Rating (id=12, rating=5, user=Charlie)
```

**Pourquoi `@JsonIgnoreProperties` ?**

**Problème identifié** : Erreur 500 avec récursion infinie lors de la sérialisation JSON.

**Cause** :
1. `Rating` contient un `MenuItem`
2. Si `MenuItem` avait une collection `List<Rating>` (relation bidirectionnelle)
3. JSON essaie de sérialiser : `Rating → MenuItem → List<Rating> → MenuItem → ...` ♻️ **BOUCLE INFINIE**

**Solution** :
```java
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
```
- Ignore les propriétés de proxy Hibernate lors de la sérialisation JSON
- Évite la récursion infinie
- Permet de retourner les `Rating` avec leurs `MenuItem` associés sans crash

**Pourquoi `FetchType.LAZY` ?**

Optimisation des performances :
- `LAZY` : Les données liées (`MenuItem`) ne sont chargées **que si on y accède**
- Évite de charger inutilement des objets volumineux
- Exemple : Si on affiche juste l'ID du rating, pourquoi charger tout le MenuItem ?

**`@CreationTimestamp`** :
- Horodatage automatique à la création
- Utile pour le tri chronologique dans le dashboard

---

### 3.3 `Reservation.java` - La Réservation

**Rôle** : Représente une réservation client avec date, heure, nombre de convives.

**Code clé** :
```java
@Entity
@Table(name = "reservations")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "table_id")
    private RestaurantTable table;  // OPTIONNEL

    @NotNull
    private LocalDate reservationDate;

    @NotNull
    private LocalTime reservationTime;

    @NotNull
    private Integer numberOfPeople;

    @CreationTimestamp
    private Instant createdAt;
}
```

**Types de données temporelles** :

| Type | Usage | Exemple |
|------|-------|---------|
| `LocalDate` | Date uniquement | `2026-02-11` |
| `LocalTime` | Heure uniquement | `20:30:00` |
| `Instant` | Timestamp complet (UTC) | `2026-02-11T19:23:45Z` |

**Pourquoi utiliser `LocalDate` et `LocalTime` séparément ?**
- **Flexibilité** : On peut interroger toutes les réservations du 11/02 ou toutes celles à 20h
- **Requêtes SQL simplifiées** : Pas besoin d'extraire la date/heure d'un timestamp
- **Clarté** : Le modèle reflète exactement les besoins métier

**Relation optionnelle (`table`)** :
```java
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "table_id")  // Pas de nullable = false
private RestaurantTable table;
```
- Une réservation peut être créée **sans table assignée**
- Le maître d'hôtel peut assigner la table plus tard
- Architecture flexible pour l'évolution future

---

## 4. Services et Logique Métier

### 4.1 `ReservationService.java` - Gestion des Réservations

**Rôle** : Orchestrer la création de réservations avec validation de la capacité.

#### Méthode clé : `create(ReservationRequestDto dto)`

```java
public Reservation create(ReservationRequestDto dto) {
    // 1. Validation des horaires d'ouverture
    if (!isWithinOpeningHours(dto.getReservationTime())) {
        throw new ResponseStatusException(
            HttpStatus.BAD_REQUEST,
            "OUT_OF_OPENING_HOURS"
        );
    }

    // 2. Calcul de la capacité actuelle
    int currentTotal = reservationRepository.sumPeopleByDateAndTime(
        dto.getReservationDate(),
        dto.getReservationTime()
    ).orElse(0);

    // 3. Vérification du dépassement
    if (currentTotal + dto.getNumberOfPeople() > 30) {
        throw new ResponseStatusException(
            HttpStatus.BAD_REQUEST,
            "CAPACITY_EXCEEDED"
        );
    }

    // 4. Création de la réservation
    User user = userRepository.findById(dto.getUserId())
        .orElseThrow(() -> new ResourceNotFoundException("User not found"));

    Reservation reservation = Reservation.builder()
        .user(user)
        .reservationDate(dto.getReservationDate())
        .reservationTime(dto.getReservationTime())
        .numberOfPeople(dto.getNumberOfPeople())
        .build();

    return reservationRepository.save(reservation);
}
```

**Explications détaillées** :

#### 🔍 **Étape 1 : Validation des horaires**

**Problème métier** : Le restaurant n'est ouvert que :
- Midi : 12:00-14:30
- Soir : 19:00-22:30

**Solution** : Méthode privée `isWithinOpeningHours()` :

```java
private boolean isWithinOpeningHours(LocalTime time) {
    LocalTime lunchStart = LocalTime.of(12, 0);
    LocalTime lunchEnd = LocalTime.of(14, 30);
    LocalTime dinnerStart = LocalTime.of(19, 0);
    LocalTime dinnerEnd = LocalTime.of(22, 30);

    boolean isLunchService = !time.isBefore(lunchStart) && !time.isAfter(lunchEnd);
    boolean isDinnerService = !time.isBefore(dinnerStart) && !time.isAfter(dinnerEnd);

    return isLunchService || isDinnerService;
}
```

**Pourquoi `!time.isBefore()` au lieu de `time.isAfter()` ?**
- `isBefore(12:00)` retourne `true` pour 11:59 → on veut `false` → donc `!isBefore()`
- `isAfter(14:30)` retourne `true` pour 14:31 → on veut `false` → donc `!isAfter()`
- Cette logique inclut les bornes (12:00 et 14:30 sont valides)

#### 🧮 **Étape 2 : Calcul de capacité avec requête SQL personnalisée**

**Requête dans `ReservationRepository.java`** :
```java
@Query("SELECT SUM(r.numberOfPeople) FROM Reservation r WHERE r.reservationDate = :date AND r.reservationTime = :time")
Optional<Integer> sumPeopleByDateAndTime(@Param("date") LocalDate date, @Param("time") LocalTime time);
```

**Pourquoi `SUM()` ?**
- On veut connaître le **total de convives** déjà réservés pour un créneau
- Exemple : 3 réservations de 2, 5 et 3 personnes → SUM = 10

**Pourquoi `Optional<Integer>` ?**
- Si aucune réservation n'existe pour ce créneau, `SUM()` retourne `NULL`
- `Optional` gère élégamment ce cas : `.orElse(0)` retourne 0 si vide

**Utilisation dans le service** :
```java
int currentTotal = reservationRepository.sumPeopleByDateAndTime(
    dto.getReservationDate(),
    dto.getReservationTime()
).orElse(0);  // ← Si NULL, on considère 0
```

#### 🚫 **Étape 3 : Logique de blocage**

```java
if (currentTotal + dto.getNumberOfPeople() > 30) {
    throw new ResponseStatusException(
        HttpStatus.BAD_REQUEST,
        "CAPACITY_EXCEEDED"
    );
}
```

**Scénario concret** :
- Créneau 20:00 le 14/02 : `currentTotal = 28`
- Nouvelle demande : `numberOfPeople = 3`
- Calcul : `28 + 3 = 31 > 30` ❌
- Résultat : Exception levée, réservation **refusée**

**Pourquoi `ResponseStatusException` ?**
- Exception Spring Boot qui se traduit automatiquement en réponse HTTP 400
- Le message (`"CAPACITY_EXCEEDED"`) est retourné au client
- Frontend peut détecter ce code spécifique pour afficher un message personnalisé

---

### 4.2 `RatingService.java` - Gestion des Notations

**Rôle** : Créer des notations et calculer les moyennes.

#### Méthode : `getAverageRating(Long menuItemId)`

**Challenge** : Calculer la moyenne des notes d'un plat, même s'il n'a aucune note.

**Solution avec COALESCE** :
```java
@Query("SELECT COALESCE(AVG(r.rating), 0.0) FROM Rating r WHERE r.menuItem.id = :menuItemId")
Double getAverageRating(@Param("menuItemId") Long menuItemId);
```

**Pourquoi `COALESCE(AVG(), 0.0)` ?**

| Cas | Sans COALESCE | Avec COALESCE |
|-----|---------------|---------------|
| Plat avec notes | `AVG(4, 5, 3) = 4.0` | `4.0` |
| Plat sans note | `NULL` 💥 | `0.0` ✅ |

**Problème du NULL** :
- Si un plat vient d'être ajouté (zéro note), `AVG()` retourne `NULL`
- Frontend qui affiche `{{ rating }} étoiles` → crash si NULL
- `COALESCE(valeur, fallback)` retourne `fallback` si `valeur` est NULL

**Alternative** : Gérer NULL côté Java, mais SQL est plus efficace.

---

## 5. Pages Frontend

### 5.1 `MenuPage.tsx` - Catalogue des Plats

**Rôle** : Afficher tous les plats avec filtres par catégorie et tag végétarien.

#### Architecture du Composant

```tsx
export default function MenuPage() {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [activeFilter, setActiveFilter] = useState('TOUS');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMenuItems();
    }, []);

    const loadMenuItems = async (filter?: { category?: string; vegetarian?: boolean }) => {
        try {
            setLoading(true);
            const response = await menuItemsAPI.getAll(filter);
            setMenuItems(response.data);
        } catch (error) {
            console.error('Error loading menu items:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterClick = (filter: string) => {
        setActiveFilter(filter);

        if (filter === 'TOUS') {
            loadMenuItems();
        } else if (filter === 'VEGETARIEN') {
            loadMenuItems({ vegetarian: true });
        } else {
            loadMenuItems({ category: filter });
        }
    };

    // ... JSX
}
```

**Flux de données** :

```
1. User clique sur "ENTREES"
   ↓
2. handleFilterClick('ENTREES') appelé
   ↓
3. loadMenuItems({ category: 'ENTREES' })
   ↓
4. API call → GET /api/menu-items?category=ENTREES
   ↓
5. Backend filtre les résultats
   ↓
6. setMenuItems(filtered) → Re-render avec nouvelles données
```

**Pourquoi `useEffect(() => {}, [])` ?**
- Hook React qui s'exécute **après le premier rendu**
- `[]` (tableau vide) = ne s'exécute **qu'une seule fois** (au montage)
- Utilisé pour charger les données initiales

**Pattern State + API** :
```tsx
const [data, setData] = useState([]);      // État local
const [loading, setLoading] = useState(true);  // Indicateur de chargement

// Fonction asynchrone pour récupérer les données
const fetchData = async () => {
    setLoading(true);
    try {
        const response = await api.getData();
        setData(response.data);
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);  // Toujours exécuté
    }
};
```

**Intégration des notations** :
```tsx
<StarRating 
    rating={item.averageRating || 0}  // Fallback si NULL
    readonly={true}                    // Non modifiable (juste affichage)
/>
```

---

### 5.2 `ReservationPage.tsx` - Formulaire de Réservation

**Rôle** : Interface de réservation avec validations côté client et gestion d'erreurs élégante.

#### Validation Horaires (Côté Client)

**Sélecteur de créneaux** :
```tsx
<select
    required
    value={formData.reservationTime}
    onChange={(e) => setFormData({ ...formData, reservationTime: e.target.value })}
>
    <option value="">Sélectionnez un créneau</option>
    <optgroup label="Service Déjeuner (12h-14h)">
        <option value="12:00">12:00</option>
        <option value="12:30">12:30</option>
        <option value="13:00">13:00</option>
        <option value="13:30">13:30</option>
        <option value="14:00">14:00</option>
    </optgroup>
    <optgroup label="Service Dîner (19h-22h)">
        <option value="19:00">19:00</option>
        <option value="19:30">19:30</option>
        <option value="20:00">20:00</option>
        <option value="20:30">20:30</option>
        <option value="21:00">21:00</option>
        <option value="21:30">21:30</option>
        <option value="22:00">22:00</option>
    </optgroup>
</select>
```

**Avantage** : L'utilisateur ne peut **physiquement pas** sélectionner une heure invalide.

#### Gestion des Erreurs Backend

**Code clé** :
```tsx
try {
    const response = await reservationsAPI.create(reservationData);
    toast.success('Réservation confirmée !');
} catch (err: any) {
    const backendMessage = err.response?.data?.detail || err.response?.data?.message;

    if (err.response?.status === 400) {
        if (backendMessage === 'CAPACITY_EXCEEDED' || backendMessage === 'COMPLET') {
            toast.error('Désolé, notre établissement est complet pour ce créneau...', {
                duration: 5000,
                style: {
                    minWidth: '450px',
                    textAlign: 'center',
                    background: '#1A1A1A',
                    color: '#d4af37',
                    border: '1px solid #d4af37'
                }
            });
        } else if (backendMessage === 'OUT_OF_OPENING_HOURS') {
            toast.error('Le restaurant est fermé à cette heure-là...');
        } else {
            toast.error(backendMessage || 'Une erreur est survenue');
        }
    }
}
```

**Pourquoi `err.response?.data?.detail || err.response?.data?.message` ?**
- Spring Boot peut renvoyer l'erreur dans `detail` ou `message` selon le type d'exception
- L'opérateur `||` (OR) tente `detail` en premier, sinon fallback sur `message`
- Garantit qu'on récupère toujours le message, peu importe le format

**UX améliorée** :
- Messages traduits en français
- Style cohérent avec le design Luxury (noir/doré)
- Durée adaptée (5000ms pour les erreurs métier)
- Largeur minimale (`450px`) pour éviter la coupure du texte

---

### 5.3 `ReviewsPage.tsx` - Dashboard Graphiques

**Rôle** : Visualiser les statistiques de notation avec Chart.js.

#### Graphique Top 5 Plats (Bar Chart)

```tsx
useEffect(() => {
    const fetchRatings = async () => {
        try {
            const response = await ratingsAPI.getAll();
            const allRatings = response.data;

            // Calculer la moyenne par plat
            const aggregatedRatings = allRatings.reduce((acc, rating) => {
                const menuItemId = rating.menuItem.id;
                const menuItemName = rating.menuItem.name;

                if (!acc[menuItemId]) {
                    acc[menuItemId] = {
                        name: menuItemName,
                        total: 0,
                        count: 0
                    };
                }

                acc[menuItemId].total += rating.rating;
                acc[menuItemId].count += 1;

                return acc;
            }, {});

            // Trier par moyenne décroissante et prendre le top 5
            const topRatedItems = Object.values(aggregatedRatings)
                .map(item => ({
                    name: item.name,
                    average: item.total / item.count
                }))
                .sort((a, b) => b.average - a.average)
                .slice(0, 5);

            // Configuration Chart.js
            setChartData({
                labels: topRatedItems.map(item => item.name),
                datasets: [{
                    label: 'Note Moyenne',
                    data: topRatedItems.map(item => item.average),
                    backgroundColor: 'rgba(212, 175, 55, 0.8)',
                    borderColor: '#d4af37',
                    borderWidth: 2
                }]
            });
        } catch (error) {
            console.error('Error fetching ratings:', error);
        }
    };

    fetchRatings();
}, []);
```

**Explications par étape** :

1. **Récupération des données** : `ratingsAPI.getAll()`
2. **Agrégation** : `reduce()` regroupe les notes par plat
   - Pourquoi `reduce` ? Permet de transformer un tableau en objet avec accumulation
3. **Calcul des moyennes** : `total / count` pour chaque plat
4. **Tri** : `.sort((a, b) => b.average - a.average)` (ordre décroissant)
   - `b - a` : Si `b > a`, résultat positif → `b` avant `a`
5. **Limitation** : `.slice(0, 5)` ne garde que les 5 premiers
6. **Formatage pour Chart.js** : `labels` et `data` séparés

**Pourquoi Chart.js ?**
- Bibliothèque de référence pour les graphiques en JavaScript
- Hautement customisable
- Performant même avec beaucoup de données
- Responsive par défaut

---

## 6. Défis Techniques Résolus

### 6.1 Récursion Infinie JSON (Erreur 500)

**Problème initial** :
```
GET /api/ratings → 500 Internal Server Error
```

**Cause** :
```
Rating {
    id: 1,
    menuItem: {
        id: 10,
        ratings: [
            Rating { ... }  // Boucle infinie !
        ]
    }
}
```

**Solution appliquée** :
```java
@ManyToOne(fetch = FetchType.LAZY)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
private MenuItem menuItem;
```

**Résultat** :
- Le JSON sérialise `Rating` avec `menuItem` (sans ses `ratings`)
- Pas de récursion
- API fonctionnelle ✅

---

### 6.2 Problème IPv6 sur Windows (ERR_CONNECTION_REFUSED)

**Symptôme** :
```
Frontend: GET http://localhost:8080/api/menu-items
Error: ERR_CONNECTION_REFUSED
```

**Diagnostic** :
- Backend écoute sur `0.0.0.0:8080` (IPv4)
- Windows résout `localhost` en `::1` (IPv6) en priorité
- Mismatch → Refus de connexion

**Solution** :
```typescript
// api.ts
const API_BASE_URL = 'http://127.0.0.1:8080/api';  // ← Forcer IPv4
```

**Pourquoi ça fonctionne ?**
- `127.0.0.1` est strictement IPv4
- Contourne la résolution DNS de `localhost`
- Windows se connecte directement en IPv4

---

### 6.3 Types JPA incorrects (Compilation Error)

**Erreur initiale** :
```
ReservationRepository.java:
sumPeopleByDateAndTime(@Param("date") String date, @Param("time") String time)
                                       ^^^^^^  Type mismatch!
```

**Problème** :
- Le service appelait avec `LocalDate` et `LocalTime`
- Le repository attendait des `String`

**Solution** :
```java
// Avant
Optional<Integer> sumPeopleByDateAndTime(@Param("date") String date, @Param("time") String time);

// Après
Optional<Integer> sumPeopleByDateAndTime(@Param("date") LocalDate date, @Param("time") LocalTime time);
```

**Leçon** : Toujours aligner les types entre les couches (DTO → Service → Repository).

---

## 7. Choix Techniques Justifiés

### 7.1 Pourquoi `COALESCE` dans les requêtes moyennes ?

**Requête SQL** :
```sql
SELECT COALESCE(AVG(r.rating), 0.0) FROM ratings r WHERE r.menu_item_id = :menuItemId
```

**Alternatives envisagées** :

| Option | Problème | Notre choix |
|--------|----------|-------------|
| Gérer NULL en Java | Requiert une logique supplémentaire dans le service | ❌ |
| `IFNULL(AVG(), 0)` | Spécifique à MySQL | ❌ |
| `COALESCE()` | Standard SQL, compatible PostgreSQL | ✅ |

**Avantage** : Le calcul se fait en base de données (plus performant que Java pour de gros volumes).

---

### 7.2 Pourquoi `LocalDate` + `LocalTime` au lieu de `LocalDateTime` ?

**Alternative** :
```java
private LocalDateTime reservationDateTime;  // Date + Heure combinées
```

**Notre choix** :
```java
private LocalDate reservationDate;   // Date seule
private LocalTime reservationTime;   // Heure seule
```

**Justification** :
1. **Requêtes simplifiées** : On peut filtrer par date OU par heure
   ```sql
   WHERE reservationDate = '2026-02-14'  -- Toutes les réservations de la St-Valentin
   WHERE reservationTime = '20:00'        -- Toutes les réservations à 20h (tous jours confondus)
   ```
2. **Clarté du modèle** : Reflète exactement les besoins métier
3. **Validation indépendante** : On peut valider la date et l'heure séparément

---

### 7.3 Pourquoi React au lieu de Vue/Angular ?

| Framework | Avantages | Inconvénients |
|-----------|-----------|---------------|
| **Angular** | Framework complet "batteries included" | Verbeux, courbe d'apprentissage |
| **Vue** | Simple, intuitive | Écosystème moins mature |
| **React** | Vaste écosystème, flexibilité, communauté énorme | Nécessite configuration (Vite) |

**Notre contexte** : Projet de formation → React est **le plus demandé en entreprise**.

---

### 7.4 Pourquoi Vite au lieu de Create React App ?

| Outil | Build | HMR | Taille |
|-------|-------|-----|--------|
| CRA | Webpack (lent) | ~5s | Lourd |
| Vite | esbuild (ultra-rapide) | ~50ms | Léger |

**Résultat** : Développement plus fluide, Hot Module Replacement quasi-instantané.

---

## 🎓 Conseils pour la Présentation

### Points à Expliquer Devant un Jury

1. **Architecture MVC** :
   - "J'ai séparé les responsabilités en Controller (HTTP), Service (logique), Repository (SQL)"

2. **Relations JPA** :
   - "J'utilise `@ManyToOne` sur Rating car plusieurs notes pointent vers un plat"

3. **Gestion des erreurs** :
   - "J'ai créé des codes d'erreur spécifiques (`CAPACITY_EXCEEDED`) pour différencier les cas métier"

4. **Sécurité du moteur de réservation** :
   - "Double validation : côté client pour l'UX, côté serveur pour la sécurité"

5. **Performance** :
   - "J'utilise `FetchType.LAZY` pour ne charger les relations que si nécessaire"

### Démonstration Live

**Scénario à scripter** :
1. Afficher le menu → Montrer les filtres
2. Noter un plat → Expliquer la relation `@ManyToOne`
3. Créer une réservation → Montrer la validation horaire
4. Tenter 31 personnes → Message "CAPACITY_EXCEEDED"
5. Dashboard → Expliquer Chart.js et l'agrégation des données

---

## 📚 Ressources pour Approfondir

- **Spring Boot** : https://spring.io/guides
- **JPA/Hibernate** : https://www.baeldung.com/learn-jpa-hibernate
- **React** : https://react.dev/learn
- **Chart.js** : https://www.chartjs.org/docs

---

**Document rédigé le** : Février 2026  
**Version** : 1.0.0 - Documentation Complète  
**Auteur** : Assistant IA + Maëlys

---

Ce rapport doit permettre à Maëlys de **comprendre chaque ligne de code** et d'être capable de **défendre ses choix techniques** devant un jury ou un recruteur. 🚀
