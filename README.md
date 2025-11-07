# Task Manager REST API (MVC)

## Overview
Simple Task Manager backend with Node.js, Express, MongoDB. Supports user register/login (JWT) and task CRUD.

## Features
- Register / Login (JWT)
- Task CRUD: create, list (filter/search/paginate), get single, update, soft-delete
- Input validation (joi)
- Standard JSON response structure
- Soft-delete via `archived` flag
- Text search on title & description

## Setup
1. Clone repo
2. `npm install`
3. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`
4. Start: `npm run dev` (nodemon) or `npm start`

## API Endpoints
- POST `/api/auth/register` — body: `{ name, email, password }`
- POST `/api/auth/login` — body: `{ email, password }`
- All Task endpoints require `Authorization: Bearer <token>`
- POST `/api/tasks` — create task `{ title, description, status, dueDate }`
- GET `/api/tasks` — list tasks with optional `?status=&search=&page=&limit=`
- GET `/api/tasks/:id` — get single task
- PUT `/api/tasks/:id` — update
- DELETE `/api/tasks/:id` — soft-delete (archived)

## Notes
- Default status for tasks is `pending`.
- The `search` query uses MongoDB text search (indexes created in model).
