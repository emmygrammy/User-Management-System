import express from 'express';
import { createContact, getContact, updateContact, deleteContact } from '../controllers/contact.controller.js';

export const contactRouter = express.Router();

contactRouter.post('/users/:userId/contacts', createContact);
contactRouter.get('/users/:userId/contacts', getContact);

contactRouter.patch('/contacts/:id', updateContact);
contactRouter.delete('/contacts/:id', deleteContact);
