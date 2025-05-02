import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import {
  createContactsSchema,
  updateContactsSchema,
} from '../validation/contacts.js';

import {
  getContactsController,
  getContactsByIdController,
  addContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);
contactsRouter.get('/', ctrlWrapper(getContactsController));

// contactsRouter.get('/', ctrlWrapper(getContactsController));

contactsRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(getContactsByIdController),
);

contactsRouter.post(
  '/',
  validateBody(createContactsSchema),
  ctrlWrapper(addContactController),
);

contactsRouter.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactsSchema),
  ctrlWrapper(patchContactController),
);

contactsRouter.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);
export default contactsRouter;
