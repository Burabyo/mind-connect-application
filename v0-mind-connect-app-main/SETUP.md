# MindConnect - Setup & Deployment Guide

## Prerequisites
- Node.js 20+
- PostgreSQL 15+
- npm or yarn

## Backend Setup

### 1. Database Setup
\`\`\`bash
# Create PostgreSQL database
createdb mindconnect

# Load schema
psql mindconnect < server/scripts/init-db.sql
\`\`\`

### 2. Install Dependencies
\`\`\`bash
cd server
npm install
\`\`\`

### 3. Environment Variables
Create `server/.env`:
\`\`\`env
DATABASE_URL=postgresql://username:password@localhost:5432/mindconnect
JWT_SECRET=your-super-secret-key-change-in-production
PORT=5000
\`\`\`

### 4. Run Backend
\`\`\`bash
npm run dev
\`\`\`

Backend will run on `http://localhost:5000`

## Frontend Setup

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Environment Variables
Create `.env.local`:
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:5000
\`\`\`

### 3. Run Frontend
\`\`\`bash
npm run dev
\`\`\`

Frontend will run on `http://localhost:3000`

## API Documentation

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Sessions
- `GET /api/sessions/counselors` - List available counselors
- `POST /api/sessions/book` - Book a session
- `GET /api/sessions/my-sessions` - Get student sessions
- `GET /api/sessions/counselor-sessions` - Get counselor sessions
- `PATCH /api/sessions/:id` - Update session status

### Moods
- `POST /api/moods/checkin` - Record mood check-in
- `GET /api/moods/history` - Get mood history

### Resources
- `GET /api/resources` - List resources
- `POST /api/resources/save` - Save resource
- `GET /api/resources/saved` - Get saved resources

### Posts/Testimonies
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create post
- `POST /api/posts/:id/like` - Like post

### Victories
- `POST /api/victories` - Create victory
- `GET /api/victories` - Get user victories

### Chat
- `POST /api/chat/start` - Start anonymous chat
- `POST /api/chat/message` - Send message
- `GET /api/chat/:chatId` - Get chat messages

### Analytics
- `GET /api/analytics/dashboard` - Get dashboard analytics

## Deployment

### Docker Deployment (Recommended)
\`\`\`bash
docker-compose up
\`\`\`

### Manual Deployment
1. Deploy backend to cloud VM (AWS, DigitalOcean, etc.)
2. Deploy frontend to Vercel
3. Update `NEXT_PUBLIC_API_URL` to production backend URL

## Features Checklist
- [x] Student Registration & Login
- [x] Mood Tracking with Streak Counter
- [x] Session Booking System
- [x] Anonymous Chat
- [x] Mental Health Exercises
- [x] Resource Library
- [x] Victory Tracking
- [x] Testimonies & Community Posts
- [x] Counselor Dashboard
- [x] Admin Analytics Portal
- [x] Role-Based Access Control
- [x] Secure Authentication
