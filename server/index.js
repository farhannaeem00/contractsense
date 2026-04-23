require('dotenv').config();
require('express-async-errors');

const express    = require('express');
const cors       = require('cors');
const connectDB  = require('./config/db');
const authRoutes     = require('./routes/auth');
const contractRoutes = require('./routes/contracts');
const reportRoutes   = require('./routes/reports');
const { errorHandler }  = require('./middleware/errorHandler');
const { apiLimiter }    = require('./middleware/rateLimiter');

const app = express();

// ─── Middleware ──────────────────────────────────────
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.CLIENT_URL,
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

// ─── Rate Limiting ───────────────────────────────────
app.use('/api', apiLimiter);

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

module.exports = app;