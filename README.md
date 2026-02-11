# RestaurantConnect — Backend

This project is a Spring Boot backend for the RestaurantConnect application (step 1).

Requirements
- Java 17+
- Maven
- PostgreSQL

Quick start

1. Create the PostgreSQL database:

```bash
psql -U postgres -c "CREATE DATABASE restaurantconnect;"
```

2. Configure DB credentials in `src/main/resources/application.yml` or `application-dev.yml`.

3. Build and run:

```bash
mvn -DskipTests package
mvn spring-boot:run
```

4. Open Swagger UI:

http://localhost:8080/swagger-ui.html

Notes
- Seed data is provided in `src/main/resources/data.sql` (categories, menu items, tables, a test user).
- Endpoints:
  # RestaurantConnect — Backend

  This project is a Spring Boot backend for the RestaurantConnect application (step 1).

  Requirements
  - Java 17+ (JDK, not just JRE)
  - Maven (optional — project includes Maven Wrapper `mvnw` / `mvnw.cmd`)
  - PostgreSQL (running locally)

  Quick start

  1. Create the PostgreSQL database (example):

  ```bash
  psql -U postgres -c "CREATE DATABASE restaurantconnect;"
  ```

  2. Configure DB credentials if different from defaults by editing `src/main/resources/application.yml`.
     - Default JDBC URL: `jdbc:postgresql://localhost:5432/restaurantconnect`
     - Default username/password: `postgres`/`postgres`

  3. Build and run the application:

  Ensure you have a JDK 17+ installed and `JAVA_HOME` set to the JDK installation. If you see an error like "No compiler is provided in this environment", you likely have a JRE instead of a JDK.

  Build (use Maven Wrapper on Windows with `mvnw.cmd`):

  ```powershell
  ./mvnw.cmd -DskipTests package
  ./mvnw.cmd spring-boot:run
  ```

  Or with a system-installed Maven:

  ```bash
  mvn -DskipTests package
  mvn spring-boot:run
  ```

  4. Open Swagger UI:

  http://localhost:8080/swagger-ui.html

  Notes
  - Seed data is provided in `src/main/resources/data.sql` (2 categories, 5 menu items, 5 tables, 1 test user). The SQL file is executed automatically (`spring.sql.init.mode=always`).
  - Endpoints (JSON):
    - GET `/api/menu`
    - GET `/api/menu/{id}`
    - POST `/api/reservations` (example payload in `dto.ReservationRequestDto`)
    - GET `/api/reservations`
    - POST `/api/orders` (example payload in `dto.OrderRequestDto`)
    - GET `/api/orders`

  Example curl

  ```bash
  # list menu
  curl http://localhost:8080/api/menu

  # create reservation (adjust dates/user/table)
  curl -X POST -H "Content-Type: application/json" -d '{"userId":1,"tableId":1,"dateTime":"2026-01-20T19:00:00Z","guests":2}' http://localhost:8080/api/reservations
  ```

  If you want the application to use a different profile or credentials, edit `application.yml` or set environment variables `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD`.

  Security and production hardening are out of scope for this step.
