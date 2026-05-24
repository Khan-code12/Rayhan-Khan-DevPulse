# 🚀 DevPulse - Issue & Maintenance Tracking System

DevPulse is a high-performance, asynchronous REST API platform designed for efficient issue tracking and infrastructure status monitoring. Built with a robust relational database layer, it automates schema migrations and lifecycle triggers seamlessly upon server startup.

🔗 **Live URL:** [https://devpulse-api.neon.tech](https://your-live-deployment-url.com) *(Replace with your actual deployment link)*

---

## ✨ Features

- **Automated Infrastructure Layer:** Auto-schema migrations, system triggers, and seeding configuration run out-of-the-box on server startup.
- **Robust Authentication:** Secure authentication pipeline using JWT (JSON Web Tokens) with a secure refresh token rotation mechanism.
- **Role-Based Access Control (RBAC):** Strict operational isolation ensuring that critical actions (like deleting records) are restricted to authorized `maintainer` accounts.
- **Asynchronous Data Pipeline:** Built with an optimized PostgreSQL connection pool management layer to eliminate concurrent execution overhead.
- **Strict Data Validation:** Runtime validation schema engine ensuring high integrity of request bodies before hit database execution.

---

## 🛠️ Tech Stack

- **Backend Framework:** Node.js, Express.js
- **Programming Language:** TypeScript (Strict Type-Safety)
- **Database Architecture:** Neon DB (Serverless PostgreSQL)
- **Runtime Execution Compiler:** `tsx` (TypeScript Execution Engine)
- **Token Authorization Management:** `jsonwebtoken`, `cookie-parser`
- **Security Engineering:** `bcryptjs` (Password Cryptographic Salt-Hashing)

---

## 📦 Database Schema Summary

The platform operates on a tightly relational PostgreSQL architectural layout with pre-built schema triggers.

### 👥 1. `users` Table
Handles user credentials, operational profiling, and security indexing fields.
- `id` (SERIAL, Primary Key)
- `name` (VARCHAR, Not Null)
- `email` (VARCHAR, Unique, Not Null)
- `password` (VARCHAR, Not Null)
- `role` (VARCHAR, Default: 'developer')
- `created_at` / `updated_at` (TIMESTAMP)

### 🐛 2. `issues` Table
Maintains historical records of runtime tracking modules and core tasks.
- `id` (SERIAL, Primary Key)
- `title` (VARCHAR, Not Null)
- `description` (TEXT)
- `status` (VARCHAR, Default: 'open')
- `priority` (VARCHAR, Default: 'medium')
- `created_by` (INTEGER, Foreign Key referencing `users(id)`)
- `created_at` / `updated_at` (TIMESTAMP)

---

## 🚀 Local Setup Steps

Follow these sequence updates carefully to get your local environment running up:

### 1. Clone & Navigate to Repository
```bash
git clone <your-repository-url>
cd DevPulse

2. Install Project Dependencies
npm install
npm install --save-dev @types/cors @types/cookie-parser @types/pg @types/bcryptjs @types/jsonwebtoken

3. Setup Environment Variables (.env)
Create a .env file in the root directory and append your connection tokens:
  port: Number(process.env.PORT) || 5000, 
  jwt_secret: process.env.JWT_SECRET || 'fiwfiwfbwfw;',
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET || 'DHFWUHFIUHFIoi;',
  connection_string: process.env.CONNECTIONSTRING || '',


Method,Endpoint,Access Level,Description
POST,/api/auth/register,Public,Registers a new tracking profile (Default: Developer).
POST,/api/auth/login,Public,"Validates credentials, issues JWT via HTTP-only Cookies."

Issues Tracking Module

Method  Endpoint  Access  LevelDescription
GET  /api/issues  Public  Fetches all system tracking modules inside DB layer.

GET /api/issues/:id  Public Pulls information for a specific targeted incident record.
POST  /api/issues Authenticated   Inserts a fresh tracking incident record with validated payloads
.PATCH   /api/issues/:id   Authenticated   Modifies an existing issue entry details parameters.
DELETE  /api/issues/:id Maintainer   OnlyPurges data entirely from tracking matrix tables.