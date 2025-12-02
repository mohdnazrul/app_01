# app_01

A robust Node.js backend API built with Express, TypeScript, PostgreSQL, and Prisma ORM.

## Features

- ✅ **TypeScript** - Type-safe development with strict mode enabled
- ✅ **Express.js** - Fast, minimalist web framework
- ✅ **PostgreSQL** - Powerful relational database
- ✅ **Prisma ORM** - Type-safe database client and migrations
- ✅ **JWT Authentication** - Secure user authentication with register/login endpoints
- ✅ **User CRUD Operations** - Full CRUD API for user management
- ✅ **ESLint + Prettier** - Code linting and formatting
- ✅ **Jest** - Unit and integration testing
- ✅ **Environment Variables** - Configuration management with dotenv

## Project Structure

```
src/
├── controllers/       # Request handlers
│   ├── authController.ts
│   └── userController.ts
├── services/         # Business logic layer
│   ├── authService.ts
│   └── userService.ts
├── routes/           # API route definitions
│   ├── authRoutes.ts
│   └── userRoutes.ts
├── middleware/       # Custom middleware
│   └── auth.ts
├── utils/            # Utility functions
│   ├── prisma.ts
│   └── jwt.ts
├── app.ts           # Express app setup
└── server.ts        # Server entry point
```

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd app_01
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your `.env` file:
```env
PORT=3000
NODE_ENV=development
DATABASE_URL="postgresql://username:password@localhost:5432/app_01_db?schema=public"
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRES_IN=7d
```

5. Generate Prisma client:
```bash
npm run prisma:generate
```

6. Run database migrations:
```bash
npm run prisma:migrate
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Lint code
- `npm run lint:fix` - Lint and fix code
- `npm run format` - Format code with Prettier
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

## API Endpoints

### Authentication

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe" (optional)
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

### Users (Protected - Requires JWT Token)

#### Get All Users
```http
GET /api/users
Authorization: Bearer <token>
```

#### Get User by ID
```http
GET /api/users/:id
Authorization: Bearer <token>
```

#### Update User
```http
PUT /api/users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "email": "newemail@example.com" (optional),
  "password": "newPassword123" (optional),
  "name": "New Name" (optional)
}
```

#### Delete User
```http
DELETE /api/users/:id
Authorization: Bearer <token>
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. After successful registration or login, you'll receive a token that must be included in the `Authorization` header as a Bearer token for protected endpoints.

Example:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Database Schema

### User Model
```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Development

1. Start the development server:
```bash
npm run dev
```

2. The API will be available at `http://localhost:3000`

## Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

## Building for Production

1. Build the project:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Code Quality

The project uses ESLint and Prettier for maintaining code quality:

- Run linter: `npm run lint`
- Fix linting issues: `npm run lint:fix`
- Format code: `npm run format`

## License

ISC

