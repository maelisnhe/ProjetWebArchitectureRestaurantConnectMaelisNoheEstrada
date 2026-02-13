# 📖 Documentation Fonctionnelle & Ubiquitous Language

## 1. Description Fonctionnelle

### 1.1 Réservation de Luxe : Garantir l'Exclusivité

**RestaurantConnect** répond au besoin fondamental de **réservation de luxe** en garantissant une expérience exclusive et raffinée. L'application limite strictement l'affluence à **30 convives maximum par créneau horaire** afin de maintenir un service de haute qualité, caractéristique des établissements gastronomiques d'exception.

Cette contrainte de capacité permet :
- Un service personnalisé et attentif pour chaque client
- Une préparation culinaire sans précipitation
- Une ambiance intimiste et détendue
- Le respect des standards de la haute gastronomie française

Le système de réservation valide automatiquement la disponibilité en temps réel et refuse toute réservation qui dépasserait la capacité maximale, garantissant ainsi le maintien de cette exclusivité.

### 1.2 Preuve Sociale : Validation de la Qualité Gastronomique

Le système de **notation (Ratings)** permet aux clients de consulter et de laisser des évaluations détaillées sur chaque plat de la carte. Cette fonctionnalité répond au besoin de **preuve sociale** en offrant :

- **Transparence** : Chaque plat affiche sa note moyenne (de 1 à 5 étoiles)
- **Confiance** : Les futurs clients peuvent valider la qualité gastronomique avant de réserver
- **Feedback continu** : Le restaurant peut identifier les plats les plus appréciés
- **Visualisation analytique** : Des graphiques (Top 5, répartition des notes) permettent une vue d'ensemble

Cette fonctionnalité transforme chaque client en ambassadeur de la qualité du restaurant et renforce la réputation de l'établissement.

---

## 2. Ubiquitous Language (Lexique Technique)

Le **langage ubiquitaire** suivant est utilisé de manière cohérente dans tout le code, la documentation et les échanges de l'équipe. Chaque terme possède une définition précise et non ambiguë.

| Terme Anglais | Définition |
|---------------|------------|
| **MenuItem** | A specific culinary creation (appetizer, main, dessert, or drink) listed on the menu with its price and category. |
| **Reservation** | A formal booking of a time slot by a User for a specific number of guests. |
| **Capacity** | The global limit of guests (30) allowed in the restaurant per time slot to ensure service excellence. |
| **Rating** | A qualitative score from 1 to 5 stars given by a User to a specific MenuItem. |
| **Service** | The specific opening windows (Lunch: 12:00-14:30 or Dinner: 19:00-22:30). |
| **User** | A client registered in the system who can make reservations and submit ratings. |
| **TimeSlot** | A 30-minute interval within a Service period during which reservations can be made. |
| **Category** | The classification of a MenuItem: ENTREES (appetizers), PLATS (mains), DESSERTS, or BOISSONS (drinks). |

---

## 3. Règles Métier Principales

### 3.1 Contraintes de Réservation

- **Capacité maximale globale** : 30 personnes par créneau horaire
- **Horaires autorisés** :
  - Service du midi : 12h00 - 14h30
  - Service du soir : 19h00 - 22h30
- **Granularité** : Créneaux de 30 minutes
- **Validation** : Double vérification (client + serveur) de la disponibilité

### 3.2 Système de Notation

- **Échelle** : 1 à 5 étoiles (obligatoire)
- **Association** : Un Rating est toujours lié à un MenuItem et un User
- **Calcul** : La moyenne dynamique est calculée via `COALESCE` pour gérer les cas NULL
- **Traçabilité** : Horodatage automatique de chaque évaluation

---

## 4. Contexte d'Utilisation

Ce document s'inscrit dans le cadre d'un projet académique de **Développement d'Applications Web**. Il illustre l'application des principes du **Domain-Driven Design (DDD)** et la mise en place d'un **langage ubiquitaire** partagé entre développeurs, utilisateurs et documentation.

**Dernière mise à jour** : Février 2026  
**Version** : 1.0.0
