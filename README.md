# massage-center

## Backend

The `backend` folder contains an Express API that saves booking form requests into MySQL.

Quick start:

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

Create the MySQL schema from `backend/database/schema.sql`, then update `backend/.env` with your database credentials.
