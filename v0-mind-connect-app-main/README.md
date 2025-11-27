# MindConnect - Digital Support Platform for Psychological Rooms

A comprehensive mental health support platform designed for primary and secondary school students in Africa. MindConnect combines a student-facing mobile/web app with professional dashboards for counselors and administrators.

## Features

### Student Portal
- **Mood Tracking**: Daily check-ins with streak tracking and pattern analysis
- **Session Booking**: Schedule appointments with qualified counselors
- **Anonymous Chat**: Confidential support conversations with safety protocols
- **Mental Health Exercises**:
  - Box breathing and breathing techniques
  - Positive affirmations
  - Gratitude journaling
  - Stress-relief games
- **Resource Library**: Access to curated psychology articles, books, and videos
- **Victory Tracking**: Personal achievement logging and motivation tracking
- **Testimonies & Community**: Share inspiring stories and support peers
- **Inspirational Quotes**: Daily motivation from psychology experts

### Counselor Dashboard
- Session management with scheduling
- Student anonymized profiles
- Therapy notes and escalation tools
- Common topic analytics
- Risk assessment and flagging system

### Admin Portal
- School-level aggregated analytics
- Session trends and resource usage
- User management
- Data retention and privacy controls

## Tech Stack

### Backend
- **Runtime**: Node.js 20
- **Framework**: Express.js
- **Database**: PostgreSQL 15
- **Authentication**: JWT with bcrypt
- **API**: RESTful architecture

### Frontend
- **Framework**: Next.js 15 (App Router)
- **UI**: React with Tailwind CSS & shadcn/ui
- **Mobile**: React Native ready
- **State**: Client-side with SWR caching

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Database**: PostgreSQL with connection pooling
- **Deployment**: Cloud VM compatible

## Quick Start

### With Docker (Recommended)
\`\`\`bash
docker-compose up
\`\`\`

Visit:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Database: localhost:5432

### Manual Setup

#### Backend
\`\`\`bash
cd server
npm install
# Configure .env with DATABASE_URL and JWT_SECRET
npm run dev
\`\`\`

#### Frontend
\`\`\`bash
npm install
# Configure .env.local with NEXT_PUBLIC_API_URL
npm run dev
\`\`\`

## Project Structure

\`\`\`
mindconnect/
├── app/                           # Next.js pages and layouts
│   ├── auth/                      # Authentication pages
│   ├── dashboard/                 # Main dashboard
│   └── layout.tsx
├── components/
│   ├── ui/                        # shadcn/ui components
│   └── features/                  # Feature-specific components
├── lib/
│   ├── api.ts                     # API utilities
│   ├── services/                  # API service layer
│   └── hooks/                     # Custom hooks
├── server/
│   ├── src/
│   │   ├── routes/                # API endpoints
│   │   ├── middleware/            # Auth middleware
│   │   └── index.ts               # Server entry
│   └── scripts/
│       └── init-db.sql            # Database schema
├── docker-compose.yml
└── SETUP.md
\`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Current user

### Core Features
- `POST /api/moods/checkin` - Record mood
- `POST /api/sessions/book` - Book counselor session
- `POST /api/chat/start` - Start anonymous chat
- `GET /api/resources` - Get resources
- `POST /api/posts` - Create testimony
- `POST /api/victories` - Log victory

See [SETUP.md](./SETUP.md) for complete API documentation.

## Security Features
- JWT-based authentication
- bcrypt password hashing
- HTTPS/TLS encryption in transit
- AES-256 encryption at rest
- Role-based access control (RBAC)
- SQL injection prevention
- XSS protection via React
- CORS configuration

## Accessibility
- WCAG AA compliance target
- Screen reader friendly (aria labels)
- Text scaling support
- High contrast mode
- Keyboard navigation support
- Child-friendly UI design

## Deployment

### Production Deployment
1. Set environment variables for production
2. Build Docker images
3. Deploy to cloud platform:
   - Backend: AWS EC2, DigitalOcean, Railway, Render
   - Frontend: Vercel, Netlify, AWS Amplify
   - Database: AWS RDS, Supabase, Neon

### Environment Variables

**Backend (.env)**
\`\`\`
DATABASE_URL=postgresql://...
JWT_SECRET=your-strong-secret-key
PORT=5000
NODE_ENV=production
\`\`\`

**Frontend (.env.local)**
\`\`\`
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
\`\`\`

## Data Privacy & Compliance
- GDPR compliant user data handling
- Child protection protocols
- Mandatory reporting integration ready
- Anonymization for aggregated data
- Data retention policies configurable
- Audit logging of all actions

## Support
- In-app help documentation
- Counselor training materials
- Admin setup guides
- API documentation

## License
MIT License - See LICENSE file

## Mission
MindConnect provides safe, accessible mental health support for African students, reducing stigma and improving emotional well-being through digital innovation.
\`\`\`
