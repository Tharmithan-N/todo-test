# Todo Application

This is a full-stack Todo application built using **Node.js**, **Express**, **Prisma**, and **MySQL** for the backend, and **React** for the frontend. The application allows users to create, list, and complete tasks.

## Technologies Used
- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MySQL (with Prisma ORM)
- **Docker**: For containerizing the application

## Features
- Add tasks with a title and descript
Accessing the application
Once everything is up and running, you can access the following:

Frontend (React): http://localhost:3000
Backend (Express API): http://localhost:5000ion.
- View pending tasks.
- Mark tasks as completed.
- Persistent data storage using MySQL.

## Prerequisites

Before running the application, ensure you have the following installed:
- Docker and Docker Compose
- Node.js (for local development)
- npm or yarn (for local development)

## Getting Started

Follow these steps to get the application up and running locally.

### 1. Clone the repository

```bash
git clone <repository_url>
cd todo-app

## Build and start the containers
docker-compose up --build

## Accessing the application
Once everything is up and running, you can access the following:
Frontend (React): http://localhost:3000
Backend (Express API): http://localhost:5000

## Running Prisma Migrations (First-time Setup)
If this is the first time you are setting up the project, you need to apply Prisma migrations to set up the database schema. Run the following command:

npx prisma migrate deploy

## Database Setup
The MySQL service is set up in the Docker container using the mysql:8.0 image, with the following credentials:

Root Username: root
Root Password: root
Database Name: todoapp

## API Endpoints
GET /tasks
POST /tasks
PUT /tasks/:id

## Docker trubleshooting
If you encounter issues with the database schema, try running npx prisma migrate deploy again to apply any missing migrations.

If you need to reset the database, stop the Docker containers and delete the volume:
docker-compose down -v
docker-compose up --build
