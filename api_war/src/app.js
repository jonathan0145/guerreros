import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { config } from 'dotenv';

// Routes imports
import authRoutes from './routes/authRoutes.js';
import warriorRoutes from './routes/warriorRoutes.js';
import gameRoutes from './routes/gameRoutes.js';
import userRoutes from './routes/userRoutes.js';

config();

const app = express();

// Basic middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN
}));
app.use(helmet());
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiter
const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW * 60 * 1000,
  max: process.env.RATE_LIMIT_MAX
});
app.use(limiter);

// API routes
const apiPrefix = process.env.API_PREFIX;
app.use(`${apiPrefix}/auth`, authRoutes);
app.use(`${apiPrefix}/warriors`, warriorRoutes);
app.use(`${apiPrefix}/games`, gameRoutes);
app.use(`${apiPrefix}/users`, userRoutes);

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to War Game API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

export default app;