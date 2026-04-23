const rateLimit = require('express-rate-limit');

// ─── General API Limiter ─────────────────────────────
const apiLimiter = rateLimit({
  windowMs:         15 * 60 * 1000, // 15 minutes
  max:              100,             // 100 requests per 15 min
  standardHeaders:  true,
  legacyHeaders:    false,
  message: {
    success: false,
    message: 'Too many requests. Please try again after 15 minutes.',
  },
});

// ─── Auth Limiter (stricter) ─────────────────────────
const authLimiter = rateLimit({
  windowMs:         15 * 60 * 1000, // 15 minutes
  max:              10,              // only 10 login attempts
  standardHeaders:  true,
  legacyHeaders:    false,
  message: {
    success: false,
    message: 'Too many login attempts. Please try again after 15 minutes.',
  },
});

// ─── Upload Limiter ──────────────────────────────────
const uploadLimiter = rateLimit({
  windowMs:         60 * 60 * 1000, // 1 hour
  max:              20,              // 20 uploads per hour
  standardHeaders:  true,
  legacyHeaders:    false,
  message: {
    success: false,
    message: 'Upload limit reached. Please try again after 1 hour.',
  },
});

module.exports = { apiLimiter, authLimiter, uploadLimiter };