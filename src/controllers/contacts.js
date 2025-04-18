import createError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  addContact,
  patchContact,
  deleteContact,
} from '../services/contacts.js';

export const getContactsController = async (req, res) => {
  const contacts = await getAllContacts();
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
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
  const contact = await addContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully add contact',
    data: contact,
  });
};

export const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const result = await patchContact({ _id: contactId }, req.body);

  if (!result) {
    throw createError(404, `Contact not found`);
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact',
    data: result.data,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await deleteContact({ _id: contactId });

  if (!contact) {
    throw createError(404, `Contact not found`);
  }
  res.status(204).send();
};
