# SlideScore AI API

Express API for account authentication and per-user presentation report storage.
MongoDB is used for persistent data; passwords are stored as bcrypt hashes and
the frontend authenticates requests with short-lived JWTs.

## Setup

From this directory:

```powershell
Copy-Item .env.example .env
npm install
npm run dev
```

Set `MONGODB_URI` to a reachable MongoDB instance and replace `JWT_SECRET` with a
long, random secret. `CLIENT_ORIGIN` may contain a comma-separated list of
allowed frontend origins. The API listens on port `5000` by default.

## Routes

- `POST /api/auth/register` — create an account and return a session
- `POST /api/auth/login` — authenticate and return a session
- `GET /api/auth/me` — return the signed-in user
- `PATCH /api/auth/profile` — update the signed-in user's name or email
- `POST /api/auth/logout` — acknowledge logout; the client discards its JWT
- `GET /api/presentations` — list the signed-in user's reports
- `POST /api/presentations` — save a report
- `GET /api/presentations/:id` — fetch one of the signed-in user's reports
- `DELETE /api/presentations/:id` — delete one of the signed-in user's reports
- `GET /api/health` — liveness check

Except for registration, login, and health, send `Authorization: Bearer <token>`.
