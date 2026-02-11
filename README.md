# 🍽️ RestaurantConnect

> **Une application de gestion gastronomique haut de gamme**  
> Système complet de réservation, notation et gestion de menu pour restaurants d'exception.

## 📋 Table des Matières
- [Stack Technique](#-stack-technique)
- [Fonctionnalités Clés](#-fonctionnalités-clés)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Guide de Démarrage](#-guide-de-démarrage)
- [Documentation Technique](#-documentation-technique)

---

## 🛠 Stack Technique

### Backend
- **Framework** : Spring Boot 3.2.12
- **Base de données** : PostgreSQL  
- **ORM** : JPA/Hibernate  
- **Build** : Maven  
- **Java** : 17

### Frontend
- **Framework** : React 18  
- **Build Tool** : Vite  
- **Styling** : CSS personnalisé (Luxury Dark/Gold theme)  
- **Animations** : Framer Motion  
- **Date Picker** : react-datepicker  
- **Notifications** : react-hot-toast  

### DevOps
- **CORS** : Configuration multi-origine (localhost:5173, localhost:3000)
- **Hot Reload** : Spring Boot DevTools + Vite HMR

---

## ✨ Fonctionnalités Clés

### 1. Moteur de Réservation Intelligent
- **Capacité dynamique** : Calcul en temps réel de la capacité restante (limite de 30 convives par créneau)
- **Validation horaires** : Restrictions strictes aux services midi (12h-14h30) et soir (19h-22h30)
- **Sélecteur de créneaux** : Interface guidée avec créneaux de 30 minutes
- **Double validation** : Côté client (UX) et côté serveur (sécurité)

### 2. Système de Notation Sécurisé
- **Anti-récursion JSON** : Gestion des relations bidirectionnelles avec `@JsonIgnoreProperties`
- **Moyenne dynamique** : Calcul avec `COALESCE` pour gérer les cas NULL
- **Traçabilité** : Horodatage automatique des évaluations

### 3. Gestion de Menu
- **Filtrage par catégorie** : Entrées, Plats, Desserts, Boissons
- **Filtrage végétarien** : Tag dédié avec icône
- **Notation visuelle** : Système d'étoiles interactif
- **Images** : Intégration Unsplash

### 4. Dashboard Évaluations
- **Graphique Top 5** : Chart.js - Bar chart des plats les mieux notés
- **Répartition** : Pie chart de la distribution des notes
- **Feed en temps réel** : Dernières évaluations avec tri chronologique

---

## 🏗 Architecture

```
restaurantconnect/
├── src/main/java/com/restaurantconnect/
│   ├── config/               # Configuration (CORS, DataInitializer)
│   ├── controller/           # REST Controllers
│   ├── dto/                  # Data Transfer Objects
│   ├── exception/            # Gestion erreurs personnalisées
│   ├── model/                # Entités JPA
│   │   ├── MenuItem.java     # Plat
│   │   ├── Rating.java       # Notation (@ManyToOne)
│   │   ├── Reservation.java  # Réservation
│   │   └── User.java         # Utilisateur
│   ├── repository/           # Spring Data JPA
│   └── service/              # Logique métier
│       ├── ReservationService.java  # Calcul capacité
│       └── RatingService.java       # Gestion notations
│
├── restaurantconnect-frontend/
│   ├── src/
│   │   ├── components/       # Composants réutilisables
│   │   │   └── StarRating.tsx
│   │   ├── pages/            # Pages principales
│   │   │   ├── MenuPage.tsx
│   │   │   ├── ReservationPage.tsx
│   │   │   └── ReviewsPage.tsx
│   │   ├── services/         # API Axios
│   │   │   ├── api.ts
│   │   │   └── ratingsAPI.ts
│   │   └── styles/           # CSS global
│   └── public/               # Assets statiques
│
├── .gitignore
├── README.md
├── RAPPORT_TECHNIQUE.md      # Documentation détaillée
└── PASSATION_TECHNIQUE.md    # Guide de reprise
```

---

## 💻 Installation

### Prérequis
- **Java 17** ou supérieur
- **Node.js 18+** et npm
- **PostgreSQL 14+**
- **Maven** (inclus via mvnw)

### Configuration de la Base de Données

1. Créer une base PostgreSQL :
```sql
CREATE DATABASE restaurantconnect;
CREATE USER restaurant_user WITH PASSWORD 'votre_password';
GRANT ALL PRIVILEGES ON DATABASE restaurantconnect TO restaurant_user;
```

2. Configurer `src/main/resources/application.properties` :
```properties
spring.application.name=RestaurantConnect

# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/restaurantconnect
spring.datasource.username=restaurant_user
spring.datasource.password=votre_password

# JPA
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true
```

---

## 🚀 Guide de Démarrage

### 1. Cloner le projet
```bash
git clone <repository-url>
cd restaurantconnect
```

### 2. Lancer le Backend (Spring Boot)
Depuis la racine du projet :

**Windows (PowerShell)** :
```powershell
.\start-backend.ps1
```

**Ou manuellement** :
```powershell
$env:JAVA_HOME='C:\Users\maeli\jdk-17.0.16'
$env:Path="$env:JAVA_HOME\bin;$env:Path"
.\mvnw.cmd spring-boot:run
```

**Linux/Mac** :
```bash
./mvnw spring-boot:run
```

Le backend démarre sur **http://localhost:8080**

### 3. Lancer le Frontend (Vite/React)
Depuis le dossier `restaurantconnect-frontend` :

**Windows** :
```powershell
cd restaurantconnect-frontend
$env:Path += ";C:\Program Files\nodejs"
npm install  # Première fois uniquement
npm run dev
```

**Linux/Mac** :
```bash
cd restaurantconnect-frontend
npm install  # Première fois uniquement
npm run dev
```

Le frontend démarre sur **http://localhost:5173**

### 4. Accès à l'application
- **Frontend** : http://localhost:5173
- **API Backend** : http://localhost:8080/api
- **Endpoints principaux** :
  - `/api/menu-items` - Liste des plats
  - `/api/reservations` - Réservations
  - `/api/ratings` - Notations

---

## 📚 Documentation Technique

Pour une compréhension approfondie de l'architecture, des modèles, des services et des choix techniques, consultez :

- **[RAPPORT_TECHNIQUE.md](./RAPPORT_TECHNIQUE.md)** - Explication détaillée de chaque composant
- **[PASSATION_TECHNIQUE.md](./PASSATION_TECHNIQUE.md)** - Guide de reprise et résolution de problèmes

### Problèmes Courants

#### Port 8080 déjà utilisé
```powershell
Stop-Process -Id (Get-NetTCPConnection -LocalPort 8080).OwningProcess -Force
```

#### Erreur de connexion (ERR_CONNECTION_REFUSED)
Utiliser **127.0.0.1** au lieu de **localhost** dans les fichiers `api.ts` et `ratingsAPI.ts` pour éviter les problèmes IPv6 sur Windows.

---

## 🎯 Chiffres Clés

- **Capacité max** : 30 convives par créneau
- **Services** : 2 (Déjeuner 12h-14h30, Dîner 19h-22h30)
- **Créneaux** : 12 par jour (5 midi + 7 soir)
- **Catégories** : 4 (Entrées, Plats, Desserts, Boissons)
- **Notes** : 1 à 5 étoiles

---

## 👥 Contributeurs

- **Maëlys** - Développement Full Stack
- **Assistant IA** - Accompagnement technique et architecture

---

## 📝 Licence

Projet éducatif - Tous droits réservés

---

**Dernière mise à jour** : Février 2026  
**Version** : 1.0.0
