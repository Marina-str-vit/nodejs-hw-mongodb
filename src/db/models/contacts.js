import { model, Schema } from 'mongoose';
import { typeList } from '../../constants/contacts.js';
import { handleSaveError, setUpdateSettings } from './hooks.js';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: typeList,
      required: true,
      default: typeList[0],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
contactsSchema.post('save', handleSaveError);
contactsSchema.pre('findByIdAndUpdate', setUpdateSettings);
contactsSchema.post('findByIdAndUpdate', handleSaveError);
export const sortContactsByList = [
  '_id',
  'name',
  'phoneNumber',
  'email',
  'isFavourite',
  'contactType',
];

export const ContactsCollection = model('contacts', contactsSchema);
