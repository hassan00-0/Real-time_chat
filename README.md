# Real-time Chat App

Full-stack, real-time chat application with a React frontend and a Node/Express + Socket.IO backend.

## Features

- Email/password auth with JWT cookies
- Real-time messaging with Socket.IO
- Online users list
- Profile image upload (Cloudinary)
- Protected routes and session checks
- REST API for auth and messages

## Tech Stack

Backend:
- Node.js + Express
- MongoDB + Mongoose
- Socket.IO
- JWT + cookie-based auth
- Cloudinary (profile images)

Frontend:
- React 19 + Vite
- Tailwind CSS + DaisyUI
- Zustand
- Socket.IO client
- Axios

## Prerequisites

- Node.js 18+ (recommended)
- MongoDB connection string
- Cloudinary account (for profile images)

## Environment Variables

Create `backend/.env` with these keys:

- `PORT=5000`
- `MONGO_URI=your_mongodb_connection_string`
- `JWT_SECRET=your_jwt_secret`
- `NODE_ENV=development`
- `CLOUDINARY_CLOUD_NAME=your_cloud_name`
- `CLOUDINARY_API_KEY=your_api_key`
- `CLOUDINARY_API_SECRET=your_api_secret`

## Run Locally

From the project root, use two terminals:

Terminal 1 (backend):

```bash
npm install --prefix backend
npm run dev --prefix backend
```

Terminal 2 (frontend):

```bash
npm install --prefix frontend
npm run dev --prefix frontend
```

Frontend runs on `http://localhost:5173` and backend on `http://localhost:5000`.

## Production Build

```bash
npm install --prefix backend
npm install --prefix frontend
npm run build --prefix frontend
npm run start --prefix backend
```

In production, the backend serves the built frontend from `frontend/dist`.
