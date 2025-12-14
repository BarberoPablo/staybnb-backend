# Staybnb Backend

Backend service for the Staybnb project, built with **NestJS**, **Prisma**, **PostgreSQL**, and **Docker**, running entirely inside **WSL2 (Linux)**.

## Current Status

The backend infrastructure is fully set up and working:

- ✅ NestJS project initialized and running
- ✅ PostgreSQL running via Docker
- ✅ Prisma installed and connected to the database
- ✅ Prisma migrations working
- ✅ Project running inside WSL2 (Linux environment)
- ✅ Development environment configured using Cursor + WSL
- ✅ Node.js dependencies installed in Linux (not Windows)
- ✅ Docker, Prisma, and Node running in the same OS (Linux)

This setup ensures consistent binaries, avoids cross-OS issues, and matches a production-like environment.

## Tech Stack

- **Node.js**
- **NestJS**
- **Prisma ORM**
- **PostgreSQL**
- **Docker & Docker Compose**
- **WSL2 (Ubuntu)**
- **Cursor IDE (Remote WSL mode)**

## Development Environment

The project lives inside the Linux filesystem:

All commands (`npm`, `prisma`, `docker`) are executed inside WSL2.

Windows is used only as a host and file viewer — all runtime and tooling happens in Linux.

## Running the Project

```bash
# Start database
docker compose up -d

# Install dependencies (Linux)
npm install

# Run migrations
npx prisma migrate dev

# Start NestJS in watch mode
npm run start:dev