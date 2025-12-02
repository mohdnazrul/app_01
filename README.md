# app_01

Backend API built with **Node.js**, **TypeScript**, **Express**, and **Prisma** using **PostgreSQL** as the database.  
It provides a basic user authentication flow (register/login) with JWT and a simple users API.

---

## Features

- Node.js + TypeScript backend  
- Express HTTP server  
- PostgreSQL database via Prisma ORM  
- User registration & login with **JWT authentication**  
- Password hashing with **bcryptjs**  
- Environment-based configuration using **dotenv**  
- CORS enabled for browser clients  
- Hot-reload development using `ts-node-dev`

---

## Tech Stack

- **Runtime:** Node.js  
- **Language:** TypeScript  
- **Framework:** Express  
- **ORM:** Prisma (`@prisma/client`)  
- **Database:** PostgreSQL  
- **Auth:** JSON Web Tokens (`jsonwebtoken`) + `bcryptjs`  
- **Dev tools:** `ts-node-dev`, TypeScript, Prisma CLI  

---

## Project Structure

```text
app_01/
├─ prisma/
│  ├─ schema.prisma         # Prisma schema (models & DB config)
│  └─ migrations/           # Prisma migrations
├─ src/
│  ├─ config/               # App / DB / env config
│  ├─ controllers/          # Request handlers (e.g. AuthController, UserController)
│  ├─ middleware/           # Auth middleware, etc.
│  ├─ models/               # Optional domain models
│  ├─ routes/
│  │  ├─ authRoutes.ts      # /api/auth routes (login, register)
│  │  ├─ userRoutes.ts      # /api/users routes
│  │  └─ index.ts           # Combines and exports all routes
│  ├─ services/
│  │  └─ UserService.ts     # Business logic for users
│  ├─ server.ts             # Express server bootstrap
│  └─ (other TS files)
├─ .env                     # Environment variables (not committed)
├─ prisma.config.ts         # Prisma config
├─ tsconfig.json            # TypeScript config
├─ package.json
└─ README.md
```
## Getting Started

### 1. Prerequisites

- Node.js (LTS recommended)
- npm or yarn
- PostgreSQL database
- Prisma CLI (installed via devDependencies)

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment variables

Create a `.env` file in the project root:

```env
# PostgreSQL connection string
DATABASE_URL="postgresql://user:password@localhost:5432/app_01?schema=public"

# JWT secret key
JWT_SECRET="your-super-secret-jwt-key"

# Application port
PORT=3000

````

### 4. Database & Prisma

Run Prisma migrations to create the database schema:

```bash
npx prisma migrate dev --name init
````
(Optional) Open Prisma Studio to inspect the database:
```bash
npx prisma studio
```

### 5. Running the Application

Development mode (with auto-reload):

```bash
npm run dev
```
This uses the script defined in package.json:
```bash
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts"
}
````
By default the server listens on http://localhost:3000 (or the port set in PORT).

## API Overview

> Exact routes may vary depending on your implementation; these are the typical endpoints for this project structure.

### Auth

- `POST /api/auth/register` – Register a new user  
- `POST /api/auth/login` – Login and receive a JWT token  

### Users (Protected – require `Authorization: Bearer <token>`)

- `GET /api/users/me` – Get the current logged-in user profile  
- `GET /api/users` – List users (admin or general listing, depending on your logic)  

---

## Scripts

- `npm run dev` – Start dev server with hot-reload  

(You can add more scripts later, e.g. `build`, `start`, `lint`, or `test`.)

## License

This project is licensed under the **ISC** license (see `package.json`).  
You can change this to MIT or another license if needed.
