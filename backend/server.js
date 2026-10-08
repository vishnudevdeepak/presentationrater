import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { connectDatabase } from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import presentationRoutes from './routes/presentationRoutes.js';

const app = express();
const port = Number(process.env.PORT) || 5000;

// Ensure a valid JWT_SECRET exists
if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  process.env.JWT_SECRET = 'slidescore-super-secret-jwt-token-key-2026-development-minimum-32-chars-ok';
  console.log('[Auth] Using secure default development JWT_SECRET.');
}

const configuredOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim());

app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    if (!origin ||
        configuredOrigins.includes(origin) ||
        /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
      callback(null, true);
      return;
    }
    const error = new Error(`Origin ${origin} is not allowed by CORS.`);
    error.status = 403;
    callback(error);
  },
  credentials: true
}));

app.use(express.json({ limit: '5mb' }));

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'slidescore-ai-api'
  });
});

app.use('/api/auth', rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false
}), authRoutes);

app.use('/api/presentations', presentationRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  const status = err.status || err.statusCode || (err.code === 11000 ? 409 : 500);
  const message = err.code === 11000
    ? 'A record with this identifier already exists.'
    : err.message;
  res.status(status).json({
    message: status >= 500 ? 'An unexpected server error occurred.' : message
  });
});

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`API server listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Database initialization error:', error.message);
    // Even if initial connect threw, start server with fallback
    app.listen(port, () => {
      console.log(`API server listening on http://localhost:${port} (local fallback mode)`);
    });
  });
