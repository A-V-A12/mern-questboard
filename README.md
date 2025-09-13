MERN QuestBoard 🎯
<img width="1340" height="417" alt="questboard" src="https://github.com/user-attachments/assets/6627face-a6ec-4d3d-a6ef-63275507b690" />


QuestBoard is a full-stack note & task management web application built as the final project for the Coding Factory 7 Bootcamp (Athens University of Economics & Business).
It allows users to create, edit, and delete notes (called quests), with secure authentication and authorization features.

🚀 Highlights

🧱 MERN Stack → MongoDB, Express.js, React, Node.js

🔑 Authentication & Authorization → JWT-based login/signup

✨ Create, Update & Delete Quests → Manage notes with title & description

⚙️ Rate Limiting with Redis → Prevents abuse, using Upstash Redis



🔧 Local Setup

Clone the repository

1. Backend Setup
cd backend
npm install

Create a .env file inside /backend with:

MONGO_URI=your_mongodb_connection_string
PORT=5001

UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token

NODE_ENV=development
TOKEN_KEY=your_secret_key



Start backend:

npm run dev

2. Frontend Setup
cd frontend
npm install


Run frontend:

npm run dev

3. Root Scripts

At the root of the project you can also run:

npm run build   (installs deps + builds frontend)

npm start       (starts backend server)
