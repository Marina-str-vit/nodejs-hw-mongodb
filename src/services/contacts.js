// src/services/students.js
import { ContactsCollection } from '../db/models/contacts.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';
import { sortOrderList } from '../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = sortOrderList[0],
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find();
  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }
  const contactsCount = await ContactsCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const data = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calcPaginationData(contactsCount, perPage, page);

  return {
    data,
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
