// src/routes/adminDonationRoutes.js
import express from 'express';
import { listAllDonations } from '../controllers/adminDonationController.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js'; 
const router = express.Router();

router.use(verifyAdmin);
router.get('/', listAllDonations);  
//router.patch('/:id/toggle-public', togglePublic); 

export default router;
