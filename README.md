# BookMate

BookMate is a full-stack bookstore app with a React frontend, a Spring Boot backend, and a MySQL database. This repo also contains Docker, Jenkins, Terraform, and Ansible assets for deployment.

## Features

- Browse and search books
- Book CRUD (admin flow)
- Cart management
- Ratings and reviews
- Containerized setup + CI/CD pipeline

## Tech Stack

- Frontend: React (Create React App), Bootstrap, Axios
- Backend: Spring Boot 3 (Java 21), Spring Data JPA, Actuator
- Database: MySQL 8
- DevOps: Docker Compose, Jenkins, Terraform, Ansible, Nginx

## Repository Layout

- `bookmate-frontend/` React app (development + production Dockerfiles)
- `bookmate-backend/` Spring Boot API
- `docker-compose.yml` Compose file used for deployment
- `init-db.sql` DB bootstrap script used by MySQL container
- `Jenkinsfile` Jenkins pipeline (build/push/deploy + optional Terraform)
- `terraform/` AWS EC2 provisioning
- `playbook.yml` Ansible deploy (basic)

## API Endpoints (Backend)

- Books: `GET /api/books`, `GET /api/books/{id}`, `GET /api/books/search?query=...`, `POST /api/books`, `PUT /api/books/{id}`, `DELETE /api/books/{id}`
- Cart: `GET /api/cart/{userId}`, `POST /api/cart`, `PUT /api/cart/{id}`, `DELETE /api/cart/{id}`, `DELETE /api/cart/user/{userId}`
- Users: `POST /api/users/register`, `POST /api/users/login`, `GET /api/users/{id}`
- Ratings: `POST /api/ratings`, `GET /api/ratings/book/{bookId}`, `GET /api/ratings/user/{userId}/book/{bookId}`
- Health: `GET /actuator/health`

## Quick Start (Local Development - Recommended)

This workflow runs the frontend on `http://localhost:3000` and the backend on `http://localhost:8080`.

### 1) Start MySQL

Option A (Docker):

```powershell
docker run --name bookmate-mysql `
  -e MYSQL_ROOT_PASSWORD=root123 `
  -e MYSQL_DATABASE=bookmate_db `
  -e MYSQL_USER=bookmate `
  -e MYSQL_PASSWORD=bookmate123 `
  -p 3306:3306 `
  -d mysql:8.0
```

Option B (MySQL installed locally): create a database named `bookmate_db` and a user matching your credentials.

### 2) Run the backend (Spring Boot)

```powershell
cd bookmate-backend

$env:SPRING_DATASOURCE_URL="jdbc:mysql://localhost:3306/bookmate_db"
$env:SPRING_DATASOURCE_USERNAME="bookmate"
$env:SPRING_DATASOURCE_PASSWORD="bookmate123"

./mvnw.cmd spring-boot:run
```

Backend listens on `http://localhost:8080`.

### 3) Run the frontend (React)

```bash
cd bookmate-frontend
npm install
npm start
```

Frontend opens at `http://localhost:3000`.

## Docker Compose (Deployment / Production-like)

`docker-compose.yml` is geared toward a Linux host (e.g., EC2) and uses host mount paths under `/mnt/...` for persistent data and logs.

```bash
docker compose up -d
```

Notes:

- On Windows/macOS you will likely need to edit `docker-compose.yml` and replace `/mnt/...` volumes with platform-appropriate paths (or remove the volume mounts).
- The current compose file runs the frontend via an image (`srivaxshana/bookmate-frontend:latest`) and exposes it on port `80`.
- The backend container exposes `8080` internally and is mapped to host port `8081` in `docker-compose.yml`.

## Configuration

Environment variables are currently checked into `.env` for convenience (not recommended for real secrets). Key values:

- `EC2_IP` used by deployment scripts / compose
- `MYSQL_*` database credentials
- `SPRING_DATASOURCE_*` overrides for the backend

## Tests

Backend:

```powershell
cd bookmate-backend
./mvnw.cmd test
```

Frontend:

```bash
cd bookmate-frontend
npm test
```

## Deployment Assets (Optional)

- Jenkins: `Jenkinsfile` builds/pushes Docker images and can provision infra via `terraform/` when enabled.
- Terraform: `terraform/` provisions an EC2 instance and security group (see `terraform/README.md`).
- Ansible: `playbook.yml` installs Docker and runs `docker-compose up -d` on a target host.
