import express from 'express';
import {
  createContact,
  getAllContacts
} from '../controllers/contactController.js';

const router = express.Router();

router.route('/')
  .get(getAllContacts)
  .post(createContact);

export default router;
