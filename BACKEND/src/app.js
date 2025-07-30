// src/app.js
import express from 'express';
import donationRoutes from './routes/donationRoutes.js';
import adminDonationRoutes from './routes/adminDonationRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import authAdminRoutes from './routes/adminAuth.js';
import { main } from './database/database.js';

dotenv.config();

const app = express();

// ✅ CORS Setup — safe for both dev & prod
const allowedOrigins = [
  "http://localhost:5173",
  "https://full-stack-ngo-charity.netlify.app",
  process.env.FRONTEND_URL,
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json());

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/auth/admin', authAdminRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/admin/donations', adminDonationRoutes);

// ✅ Health check
app.get('/', (req, res) => {
  res.send({
    activeStatus: true,
    error: false,
  });
});

// ✅ Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.message);
  res.status(err.status || 500).json({ message: err.message });
});

// ✅ DB connection
main().catch(err => console.error('❌ DB connection failed', err));

// ✅ Run server only in development (not on Vercel)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

// ✅ Export for Vercel
export default app;
