// src/routes/donationRoutes.js
import express from 'express';
import { createDonation, getPublicDonations, getDonationsByEmail } from '../controllers/donationController.js';
const router = express.Router();

router.post('/', createDonation); 
router.get("/all/:email", getDonationsByEmail);  
router.get('/public', getPublicDonations);  
 
export default router;