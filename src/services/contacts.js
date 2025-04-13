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

// export const patchContact = async (contactId, payload, options = {}) => {
//   const { upsert } = options;
//   const result = await ContactsCollection.findOneAndUpdate(contactId, payload, {
//     new: true,
//     upsert,
//     // includeResultMetadata: true,
//   });

//   if (!result || !result.value) return null;

//   const isNew = Boolean(result.lastErrorObject.upserted);

//   return {
//     isNew,
//     data: result.value,
//   };
// };
export const patchContact = (contactId, payload, options = {}) => {
  const { upsert } = options;
  return ContactsCollection.findByIdAndUpdate(contactId, payload, {
    new: true,
    upsert,
  });
};

export const deleteContact = (filter) =>
  ContactsCollection.findOneAndDelete(filter);
