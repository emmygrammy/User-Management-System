import express from 'express';
import { authenticateToken } from '../middleware/auth.middleware.js';
import { createContact, getContact, updateContact, deleteContact } from '../controllers/contact.controller.js';

export const contactRouter = express.Router();

contactRouter.post('/users/:userId/contacts', authenticateToken, createContact);
contactRouter.get('/users/:userId/contacts', authenticateToken, getContact);

contactRouter.patch('/contacts/:id', authenticateToken, updateContact);
contactRouter.delete('/contacts/:id', authenticateToken, deleteContact);
