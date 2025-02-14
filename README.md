# Vehicle Form Application

A web application for collecting and managing vehicle model preferences and user contact information.

## Prerequisites

- Docker Desktop
- Docker Compose

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/magicflute21/vehicle-form-fullstack.git
cd vehicle-form-fullstack
```

1. Go inside the app vehicle-form-fullstack:
```bash
cd vehicle-form-fullstack
```

3. Start the application:
```bash
docker compose up --build
```

4. Access the application:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8080

## Project Structure

```
.
├── frontend/                # React/Vite frontend application
├── backend/                # Spring Boot backend application
├── docker-compose.yml     # Docker compose configuration
└── README.md
```

## Features

- User contact information collection
- Vehicle model selection
- Driver's license verification
- Multi-select dropdown for car models
- Form validation

## Technologies Used

### Frontend
- React with TypeScript
- Vite
- Chakra UI
- React Hook Form

### Backend
- Spring Boot
- PostgreSQL
- JPA/Hibernate

### Infrastructure
- Docker
- Docker Compose
- Nginx (for serving frontend)

Development Setup

To run the services individually for development:

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
./mvnw spring-boot:run
```

### Database
```bash
docker compose up db
```

Production Deployment

The application is containerized and can be deployed using Docker Compose:

```bash
docker compose up --build
```


## Environment Variables

All necessary environment variables are pre-configured in the docker-compose.yml file. The application will work out of the box without any additional configuration.

Default database credentials:
- Database name: vehicle_form_db
- Username: postgres
- Password: postgres