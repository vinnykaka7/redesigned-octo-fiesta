import express from 'express';
import { submitContactForm } from '../controllers/contactController.js';

const router = express.Router();

// POST /api/v1/contact
router.post('/', submitContactForm);

export default router;
