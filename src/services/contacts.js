// src/services/students.js
import { ContactsCollection } from '../db/models/contacts.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';
import { sortOrderList } from '../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = sortOrderList[0],
  filters = {},
}) => {
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find();
  if (filters.isFavourite) {
    contactsQuery.where('isFavourite').equals(filters.isFavourite);
  }

  const contacts = await contactsQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });
  const totalItems = await ContactsCollection.find()
    .merge(contactsQuery)
    .countDocuments();
  const paginationData = calcPaginationData({ page, perPage, totalItems });

  return {
    contacts,
    totalItems,
    ...paginationData,
  };
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
