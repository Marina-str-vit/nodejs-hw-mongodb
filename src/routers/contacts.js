import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {
  getContactsController,
  getContactsByIdController,
} from '../controllers/contacts.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getContactsController));

contactsRouter.get('/:contactId', ctrlWrapper(getContactsByIdController));

export default contactsRouter;
