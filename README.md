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

---

## Getting Started

### 1. Prerequisites

- Node.js (LTS recommended)  
- npm or yarn  
- PostgreSQL database  
- Prisma CLI (installed via devDependencies)

---

### 2. Install dependencies

```bash
npm install
# or
yarn install