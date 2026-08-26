import express from 'express';
import { createContact, getContact, updateContact, deleteContact } from '../controllers/contact_controller.js';

export const contactRouter = express.Router();

contactRouter.post('/:userId/contacts', createContact);
contactRouter.get('/:userId/contacts', getContact);


contactRouter.patch('/:id', updateContact);
contactRouter.delete('/:id', deleteContact);

