# PERN Todo App 

A fullstack Todo application built with the PERN stack (PostgreSQL, Express.js, React, Node.js) and GraphQL.\
This project demonstrates a task management system where users can create, read, update, and delete todos using a GraphQL API and a React frontend.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technologies & Stack Explanation](#technologies--stack-explanation)
- [Architecture & Flow](#architecture--flow)
- [Installation & Run](#installation--run)
- [Project Structure](#project-structure)
- [GraphQL API](#graphql-api)
- [Author](#author)

## Description

This application allows users to:

- View all tasks
- Create new tasks
- Edit existing tasks
- Delete tasks

The backend is implemented using **Node.js** with **Express.js** connected to a **PostgreSQL** via the `pg` library and now exposing a GraphQL API.\
The frontend is built with React (Vite) and communicates with the backend via GraphQL queries and mutations.

> **Note:** Authentication is not implemented yet, so all users can modify the database.

## Features

- View all todos
- Add a new todo
- Update a todo (description & completion status)
- Delete a todo
- Fully functional GraphQL API
- React frontend with state management (Context API / Hooks)

## Technologies & Stack Explanation

- **PostgreSQL:** relational database to store tasks (`todo` table with `todo_id`, `description`, `completed`).
- **Node.js / Express.js:** backend server handles requests and executes database queries.
- **React (Vite):** frontend framework for building a responsive UI and communicating with backend.
- **GraphQL / graphql-http:** backend GraphQL API to query and mutate todo data.
- **pg:** Node.js library for connecting to PostgreSQL.
- **CORS:** allows frontend to communicate with backend on a different port.

This stack is known as **PERN**, with the addition of GraphQL for modern API design.

## Architecture & Flow

1. **Frontend React** sends GraphQL queries/mutations to the backend.
2. **Express.js server** receives requests and passes them to GraphQL handler.
3. **Resolvers** handle database queries via pg and return data.
4. **PostgreSQL** stores the todo data.
5. **Frontend** updates UI based on response.

> Example: Adding a todo:
>
> - React sends a `mutation to /graphql` with `{ description }`.
> - GraphQL resolver executes `INSERT` query in PostgreSQL.
> - New todo is returned and React updates the state.

## Installation & Run

### Backend

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
npm i express pg cors dotenv graphql graphql-http typescript ts-node nodemon @types/node @types/pg
```

3. Create a `.env` file with database connection:

```env
PORT=4999
CONNECTION_STRING=postgres://your_db_user:your_db_password@localhost:5432/your_db_name
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
npm i tailwindcss @tailwindcss/vite react-icons typescript @types/react @types/react-dom
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
│  ├─ config/
│  │  └─ db.js          # PostgreSQL connection pool
│  ├─ resolvers/
│  │  └─ todoResolvers.ts # GraphQL resolvers
│  ├─ schema/
│  │  └─ todoSchema.ts  # GraphQL schema
│  ├─ index.ts          # Express + GraphQL server
│  └─ package.json
├─ frontend/
│  ├─ src/
│  │  ├─ App.tsx        # Main App component
│  │  ├─ main.tsx       # Entry point
│  │  └─ components/    # UI components
│  └─ package.json
```

## GraphQL API

Get Todos:
```bash
query {
  getTodos {
    todo_id
    description
    completed
  }
}
```

Add Todo:
```bash
mutation {
  addTodo(description: "Learn GraphQL") {
    todo_id
    description
    completed
  }
}
```

Update a todo:
```bash
mutation {
  updateTodo(todo_id: 1, description: "Learn TS", completed: true) {
    todo_id
    description
    completed
  }
}
```

Delete a todo:
```bash
mutation {
  deleteTodo(todo_id: 1) {
    todo_id
    description
    completed
  }
}
```

## Author

**Taras Poiatsyka**\
[GitHub](https://github.com/tvsxar)