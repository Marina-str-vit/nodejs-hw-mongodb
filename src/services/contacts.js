// src/services/students.js
import { ContactsCollection } from '../db/models/contacts.js';

export const getAllContacts = () => {
  const contacts = ContactsCollection.find();
  return contacts;
};

export const getContactById = (contactId) => {
  const contact = ContactsCollection.findById(contactId);
  return contact;
};

export const addContact = (payload) => ContactsCollection.create(payload);

export const patchContact = (contactId, payload, options = {}) => {
  const { upsert } = options;
  return ContactsCollection.findByIdAndUpdate(contactId, payload, {
    new: true,
    runValidators: true,
    upsert,
  });
};

export const deleteContact = (filter) =>
  ContactsCollection.findOneAndDelete(filter);
