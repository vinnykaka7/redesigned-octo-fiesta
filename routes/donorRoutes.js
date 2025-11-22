import express from 'express';
import { registerDonor } from '../controllers/donorController.js';

const router = express.Router();

// POST /api/v1/register/donor
router.post('/donor', registerDonor);

export default router;
