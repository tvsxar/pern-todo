# PERN Todo App

A Fullstack Todo application built with the **PERN stack** (PostgreSQL, Express.js, React, Node.js).\
This project demonstrates a simple task management system with REST API endpoints and a React frontend.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technologies & Stack Explanation](#technologies--stack-explanation)
- [Architecture & Flow](#architecture--flow)
- [Installation & Run](#installation--run)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Author](#author)

## Description

This application allows users to:

- View all tasks
- Create new tasks
- Edit existing tasks
- Delete tasks

The backend is implemented using **Node.js** with **Express.js** and connected to a **PostgreSQL** database via the `pg` library.\
The frontend is built using **React** (with Vite) and communicates with the backend via HTTP requests (REST API).

> **Note:** Authentication is not implemented yet, so all users can modify the database.

## Features

- List all tasks
- Create a task
- Update a task
- Delete a task
- Fully functional REST API
- React frontend with state management

## Technologies & Stack Explanation

- **PostgreSQL:** relational database to store tasks (`todo` table with `description`, `completed` fields).
- **Node.js / Express.js:** backend server handles requests, routing, and database queries.
- **React (Vite):** frontend framework for building a responsive UI and communicating with backend.
- **pg:** Node.js library for connecting to PostgreSQL.
- **CORS:** allows frontend to communicate with backend on a different port.

This stack is called **PERN**: PostgreSQL + Express + React + Node.js.

## Architecture & Flow

1. **Frontend React** sends HTTP requests to the backend using `fetch`.
2. **Express.js server** receives requests and executes logic.
3. **PostgreSQL** stores task data. Queries are executed via the `pg` pool.
4. The backend sends the response back to the frontend.
5. React updates the UI based on the response.

> Example: when a user adds a new todo:
>
> - React sends `POST /todos` with `{ description, completed }`
> - Express receives the request and executes an SQL `INSERT` query
> - PostgreSQL saves the task
> - Backend returns the new task, React updates the state

## Installation & Run

### Backend

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
npm i express pg cors dotenv
```

3. Create a `.env` file with database connection:

```env
PORT=4999
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_db_name
```

4. Start the server:

```bash
npm run dev
```

### Frontend

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
npm i react-icons
npm i tailwindcss @tailwindcss/vite
```

3. Start the frontend:

```bash
npm run dev
```

Frontend will be available at `http://localhost:5173` by default.

## Project Structure

```
todo/
├─ backend/
│  ├─ db.js           # PostgreSQL connection pool
│  ├─ index.js        # Express server setup
│  ├─ routes/
│  │  └─ todos.js     # REST API routes for todos
│  └─ package.json
├─ frontend/
│  ├─ src/
│  │  ├─ App.jsx       # Main App component
│  │  └─ main.jsx      # Entry point
│  └─ package.json
```

## API Endpoints

| Method | Endpoint     | Description       | Body / Params                |
| ------ | ------------ | ----------------- | ---------------------------- |
| GET    | `/todos`     | Get all todos     | None                         |
| POST   | `/todos`     | Create a new todo | `{ description, completed }` |
| PUT    | `/todos/:id` | Update a todo     | `{ description, completed }` |
| DELETE | `/todos/:id` | Delete a todo     | `id` as URL param            |

> All endpoints currently do not require authentication.

## Author

**Taras Poiatsyka**\
[GitHub](https://github.com/tvsxar)