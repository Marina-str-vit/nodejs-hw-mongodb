import createError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  addContact,
  patchContact,
  deleteContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
// import { sortContactsByList } from '../db/models/contacts.js';
import { parseContactFilterParams } from '../utils/filters/parseContactFilterParams.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseContactFilterParams(req.query);
  const userId = req.user._id;
  console.log(userId);

  const data = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    userId,
    filter,
  });
  console.log(data);

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { contactId } = req.params;

  const userId = req.user._id;

  const contact = await getContactById(contactId, userId);
  console.log(contact);

  if (!contact) {
    throw createError(404, `Contact not found`);
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact`,
    data: contact,
  });
};

export const addContactController = async (req, res) => {
  const userId = req.user._id;
  const contact = await addContact({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    message: 'Successfully add contact',
    data: contact,
  });
};

export const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const result = await patchContact(contactId, userId, req.body);

  if (!result) {
    throw createError(404, `Contact not found`);
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact',
    data: result.contacts,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user._id;

  const contact = await deleteContact(contactId, userId);

  if (!contact) {
    throw createError(404, `Contact not found`);
  }
  res.status(204).send();
};
