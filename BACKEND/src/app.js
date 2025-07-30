// src/app.js
import express from 'express';
import donationRoutes from './routes/donationRoutes.js';
import adminDonationRoutes from './routes/adminDonationRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js'; 
import authAdminRoutes from './routes/adminAuth.js';
import {main} from './database/database.js';

dotenv.config(); 

const app = express();

app.use(cors({
  origin: [process.env.FRONTEND_URL || "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));


app.use(express.json());

try {
  app.use('/api/auth', authRoutes); // likely this one has the typo
} catch (e) {
  console.error('Error in user Routes:', e.message);
}

try {
  app.use('/api/auth/admin', authAdminRoutes); // likely this one has the typo 
} catch (e) {  
  console.error('Error in admin Routes:', e.message);  
}

app.use('/api/donations', donationRoutes);
app.use('/api/admin/donations', adminDonationRoutes);  

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message }); 
});

app.get('/',(req,res)=>{
  res.send({
    activeStatus:true,
    error:false,
  })
})

main().catch(err => console.error('❌ DB connection failed', err));

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}
// app.listen(process.env.PORT, () => {
//     console.log(`🚀 Server running on http://localhost:${process.env.PORT}`)
// });

export default app;
