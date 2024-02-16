# Library Management System

The project is intended to manage a library to handle the users and storage.

## Main Features (2024-02-17):
  - User account creation, login and updates
  - Add Authors data and updates
  - Add books and update storage amounts
  - Advanced search in books with `fuzzySearch` making use of `trigrams (pg_trgm)` in PostgreSQL
  - Export data about borrowed books
  - The application at this point allows authentication using `passport` and `jwtStrategy`
  - The application at this point allows rate limiting using `redis` as the cache to allow for scaling (as the app can be deployed on multiple instances)

## ERD:
![ERD](./erd.png)

## How to run:
### Requirements: 
- Requires Node.js (Preferred v20) 
- PostgreSQL (Preferred v14.5) 
- Redis (Preferred v6.0)

### Env:
- The application date is located in .env file based on you environment and database name, ..etc.
```
# Sample env

# Running Application Env Variables
PORT=3500

# Database URI
POSTGRES_URI=postgres://postgres:someStrongPassword@localhost:5432/library_management_system

# REDIS CONNECTION URI
REDIS_URI=redis://localhost:6379

# Database URI FOR DOCKER
POSTGRES_URI=postgres://postgres:someStrongPassword@postgres:5432/library_management_system

# REDIS CONNECTION URI FOR DOCKER
REDIS_URI=redis://redis:6379

# Hash pepper 
HASH_PEPPER=mv2@$$o3n6va&^aff!^s2nvk74&9g7byse*

# Passport Authentication Secret
JWT_SECRET=piwx@&!o3n6v158@13aswvk74&9g7bw*wbb
```

### Installation:
- For ease of usage the application is dockerized and can be run instantly using `npm run dev:docker`

### Docs:
- The endpoints are documented with swagger on `http://localhost:3500/docs/api/` => modify port based on your environment
- JSON collection for postman(via import) can also be found [here](./postman-collection-for-library-management-system.json).
