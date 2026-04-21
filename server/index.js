import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'express-async-errors';

import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import contractRoutes from './routes/contracts.js';
import reportRoutes from './routes/reports.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();

// ─── Middleware ──────────────────────────────────────
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.CLIENT_URL, // production Vercel URL
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());

// ─── Health Check ────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: '✅ ContractSense API is running' });
});

// ─── Routes ──────────────────────────────────────────
app.use('/api/auth',      authRoutes);
app.use('/api/contracts', contractRoutes);
app.use('/api/reports',   reportRoutes);

// ─── Error Handler (must be last) ───────────────────
app.use(errorHandler);

// ─── Start Server ────────────────────────────────────
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});