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
import { checkUser } from '../middlewares/checkUser.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);
contactsRouter.get('/', checkUser(), ctrlWrapper(getContactsController));

contactsRouter.get(
  '/:contactId',
  checkUser(),
  isValidId,
  ctrlWrapper(getContactsByIdController),
);
contactsRouter.get(
  '/userId',
  checkUser(),
  isValidId,
  ctrlWrapper(getContactsByIdController),
);

contactsRouter.post(
  '/',
  checkUser(),
  validateBody(createContactsSchema),
  ctrlWrapper(addContactController),
);

contactsRouter.patch(
  '/:contactId',
  checkUser(),
  isValidId,
  validateBody(updateContactsSchema),
  ctrlWrapper(patchContactController),
);
// contactsRouter.patch(
//   '/userId',
//   checkUser(),
//   isValidId,
//   validateBody(updateContactsSchema),
//   ctrlWrapper(patchContactController),
// );

contactsRouter.delete(
  '/:contactId',
  checkUser(),
  isValidId,
  ctrlWrapper(deleteContactController),
);
export default contactsRouter;
