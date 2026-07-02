# Aura SPA Backend

This backend saves appointment requests from the website into a MySQL database.

## Setup

1. Install Node.js 18 or newer.
2. Create the MySQL database and table:

```sql
SOURCE database/schema.sql;
```

3. Copy `.env.example` to `.env` and fill in your MySQL credentials.
4. Install dependencies:

```bash
npm install
```

5. Start the backend:

```bash
npm run dev
```

## API

`POST /api/appointments`

```json
{
  "name": "Client name",
  "phone": "+380991112233",
  "service": "m_classic",
  "master": "astakhova",
  "date": "2026-07-10",
  "time": "14:30",
  "message": "Optional comment"
}
```
