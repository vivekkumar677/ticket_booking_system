# Ticket Booking System

This is a full-stack Ticket Booking System built using:

- **Backend:** Node.js, Express, PostgreSQL
- **Frontend:** React.js, TypeScript, Bootstrap
- **Database:** PostgreSQL
- **APIs:** RESTful APIs

---

## 🚀 Setup Instructions

### Backend

1. Go to the backend folder:

```bash
cd backend

npm install

DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ticket_booking_db
SECRET_KEY=your_secret_key_here
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=ticket_booking_db
POSTGRES_HOST=localhost
POSTGRES_PORT=5432

npm run dev

#=========Frontend=============

cd frontend

npm install

npm start

Frontend will run on http://localhost:3000.

📚 API Documentation

GET /shows → List all shows

GET /shows/:id → Get show details

POST /shows → Create a new show (Admin)

POST /shows/:id/book → Book seats for a show