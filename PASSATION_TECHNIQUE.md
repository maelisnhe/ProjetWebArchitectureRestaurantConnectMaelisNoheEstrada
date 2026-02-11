# 📝 PASSATION TECHNIQUE - RestaurantConnect

Ce document est destiné à l'agent IA ou au développeur qui reprendra le projet. Il récapitule les commandes vitales, les blocages rencontrés et les solutions appliquées.

---

## 🚀 COMMANDES DE LANCEMENT (Quick Start)

### 1. Backend (Spring Boot)
Depuis la racine du projet (`restaurantconnect`) :
```powershell
.\start-backend.ps1
```
*Note : Si le port 8080 est déjà utilisé, tuer le processus Java avec `Stop-Process -Id (Get-NetTCPConnection -LocalPort 8080).OwningProcess -Force`.*

### 2. Frontend (Vite/React)
Depuis la racine du projet (`restaurantconnect`) :
```powershell
cd restaurantconnect-frontend; $env:Path += ";C:\\Program Files\\nodejs"; npm run dev
```

---

## ⚠️ PIÈGES RENCONTRÉS & SOLUTIONS (Gotchas)

### 1. Connectivité & IPv6 (ERR_CONNECTION_REFUSED)
- **Problème** : Sous Windows, `localhost` résout parfois en IPv6 (`[::1]`) alors que Spring Boot écoute en IPv4 (`127.0.0.1`), causant un refus de connexion dans le navigateur.
- **Solution** : Utiliser explicitement **`http://127.0.0.1:8080`** au lieu de `localhost` dans les fichiers de services frontend (`api.ts`, `ratingsAPI.ts`).

### 2. Types JPA & Paramètres Query
- **Problème** : Erreurs de compilation dans `ReservationRepository` car les types `String` étaient utilisés pour la date/heure au lieu de `LocalDate`/`LocalTime`.
- **Solution** : Toujours utiliser les types Java 8 Time (`LocalDate`, `LocalTime`) dans les entités ET dans les paramètres `@Param` des repository.

### 3. Circularity / Multiples Imports
- **Problème** : Le repository avait des imports mal placés (à l'intérieur de la classe) suite à une édition automatique.
- **Solution** : Vérifier manuellement que les imports sont au-dessus de la définition de la classe/interface.

---

## 🏗️ ÉTAT DU PROJET & DÉCISIONS

### Design Fixe (Desktop-First)
- **Choix Utilisateur** : Suite à un échec du mode responsive, le site a été rétabli en **Design Fixe**.
- **Impact** : Pas de menu hamburger, pas de grilles `flex-col`. La Navbar reste horizontale et le Hero reste à 50%/50%. Ne pas tenter de rendre le site responsive sans instruction explicite et un plan d'alignement rigoureux.

### Capacité de Réservation
- **Règle** : Max **30 personnes** par créneau (Date + Heure).
- **Backend** : `ReservationService` appelle `sumPeopleByDateAndTime` et lance une `ResponseStatusException(400, "COMPLET")` si la limite est dépassée.
- **Frontend** : `ReservationPage.tsx` intercepte le message "COMPLET" pour afficher un toast d'erreur personnalisé.

---

## 🛠️ COMPOSANTS CLÉS
- `ReservationService.java` : Logique de verrouillage des places.
- `ReservationRepository.java` : Requête `@Query` pour le calcul du SUM.
- `ratingsAPI.ts` & `api.ts` : Points de contact avec le backend (forcés sur 127.0.0.1).

---

**Statut final ce jour :** Tout est vert, les données s'affichent, la capacité est verrouillée. Prêt pour la suite ! 🚀
