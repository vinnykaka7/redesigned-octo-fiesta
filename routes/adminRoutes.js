import express from 'express';
import { checkApiKey } from '../middleware/auth.js';
import { getAllDonors, getAllContacts, markContactResolved } from '../controllers/adminController.js';

const router = express.Router();

// Apply API key middleware to all admin routes
router.use(checkApiKey);

// GET /api/v1/admin/donors
router.get('/donors', getAllDonors);

// GET /api/v1/admin/contacts
router.get('/contacts', getAllContacts);

// PATCH /api/v1/admin/contact/:id
router.patch('/contact/:id', markContactResolved);

export default router;
