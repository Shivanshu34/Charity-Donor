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

// ✅ CORS Configuration
// const allowedOrigins = [
//   process.env.FRONTEND_URL || "http://localhost:5173", // your Netlify frontend
// ];

app.use(cors({
  origin: ["https://full-stack-ngo-charity.netlify.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// ✅ Handle preflight OPTIONS requests for all routes
app.options('*', cors());

app.use(express.json());

// 🧩 Routes
app.use('/api/auth', authRoutes);
app.use('/api/auth/admin', authAdminRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/admin/donations', adminDonationRoutes);

// ✅ Default health check route
app.get('/', (req, res) => {
  res.send({
    activeStatus: true,
    error: false,
  });
});

// 🛠 Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

// ✅ Connect DB
main().catch(err => console.error('❌ DB connection failed', err));

// ✅ Start Server (only locally)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

export default app;
