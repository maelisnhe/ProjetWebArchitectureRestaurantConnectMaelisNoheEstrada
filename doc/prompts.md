🛰️ Journal de Bord : Développement de RestaurantConnect
Étudiante : Maëlis (Maë) – Master Data Engineering

Mentor : Senior Lead Developer (IA)

📍 Étape 1 : Initialisation et "Page Blanche"
Maë : "Je lance mon projet de Master. Je veux une structure Full Stack : Spring Boot (Java) pour le Backend et React (Vite) pour le Frontend. On va utiliser PostgreSQL. Aide-moi à configurer le pom.xml et l'arborescence de base."

Mentor : "C'est parti. On commence par un projet Maven propre. Je te prépare la structure des dossiers : model, repository, service, controller. Côté React, on initialise avec Vite pour avoir un environnement de développement ultra-rapide."

🏗️ Étape 2 : Modélisation des Données (Le cœur Data)
Maë : "Je crée mes entités. J'ai besoin de MenuItem pour les plats, Rating pour les avis, et Reservation. Comment lier les notes aux plats sans créer de bugs de performance ?"

Mentor : "On va utiliser des relations @ManyToOne. Pour MenuItem, utilise BigDecimal pour les prix afin d'éviter les erreurs d'arrondi sur la monnaie. Pour Rating, on active le FetchType.LAZY : on ne charge les détails du plat que si on en a vraiment besoin, c'est crucial pour la performance de ta base."

🧠 Étape 3 : Logique Métier et Sécurité des Réservations
Maë : "C'est l'étape critique. Le restaurant a une capacité de 30 personnes. Je ne veux pas qu'une réservation soit enregistrée si le créneau est complet ou si le restaurant est fermé (après 22h30 par exemple)."

Mentor : "On implémente ça dans ReservationService. On va écrire une requête SQL personnalisée SUM(numberOfPeople) pour calculer l'occupation en temps réel. Si la limite est franchie, on bloque la transaction avec une ResponseStatusException(HttpStatus.BAD_REQUEST). C'est l'étape où l'on garantit l'intégrité des règles métier."

🎨 Étape 4 : Frontend Luxury & UX
Maë : "Je m'attaque au design. Je veux un thème sombre et or. Le calendrier de réservation doit être centré et je veux que l'utilisateur choisisse son heure dans une liste précise, pas qu'il tape n'importe quoi."

Mentor : "On va coder une interface en React avec des composants select restreints aux services du midi (12h-14h30) et du soir (19h-22h30). On ajoute react-hot-toast pour que les messages d'erreur du backend (comme 'CAPACITY_EXCEEDED') s'affichent de manière élégante en doré sur fond noir."

📊 Étape 5 : Data Visualization (Reviews Dashboard)
Maë : "Je veux une page de statistiques pour le gérant. On doit voir le Top 5 des plats les mieux notés avec un graphique."

Mentor : "On va utiliser Chart.js. Côté React, on va récupérer toutes les notes et utiliser la fonction .reduce() pour calculer les moyennes par plat directement dans le navigateur. Ensuite, on trie par note décroissante et on affiche le résultat dans un Bar Chart."

🛠️ Étape 6 : Debugging (Le combat contre la récursion)
Maë : "Au secours ! Dès que j'appelle l'API des notes, mon serveur plante en boucle (Erreur 500 / StackOverflow). Qu'est-ce qui se passe ?"

Mentor : "C'est une récursion infinie JSON. Ton plat appelle ses notes, qui appellent leur plat, qui rappelle ses notes... On résout ça avec @JsonIgnoreProperties pour dire à Jackson (le convertisseur JSON) de s'arrêter au premier niveau."

📦 Étape 7 : Finalisation, Restructuration et Git
Maë : "Le projet est fini. Maintenant, je dois tout ranger dans les dossiers /backend, /frontend et /doc comme demandé par mon prof, et documenter le tout."

Mentor : "On fait le grand ménage. On déplace les fichiers, on met à jour les scripts de lancement (.ps1), on rédige l'Ubiquitous Language (le lexique technique) et on configure le Pull Rebase sur Git pour assurer une collaboration propre."