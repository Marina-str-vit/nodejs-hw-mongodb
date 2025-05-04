import Joi from 'joi';
import { typeList } from '../constants/contacts.js';
import { isValidObjectId } from 'mongoose';

export const createContactsSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'string.base': 'PhoneNumber should be a string',
    'string.min': 'PhoneNumber should have at least {#limit} characters',
    'string.max': 'PhoneNumber should have at most {#limit} characters',
    'any.required': 'PhoneNumber is required',
  }),
  email: Joi.string().min(3).max(20).messages({
    'string.base': 'Email should be a string',
    'string.min': 'Email should have at least {#limit} characters',
    'string.max': 'Email should have at most {#limit} characters',
    'any.required': 'Email is required',
  }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid(...typeList)
    .required()
    .messages({
      'string.base': 'ContactType should be a string',
      'string.min': 'ContactType should have at least {#limit} characters',
      'string.max': 'ContactType should have at most {#limit} characters',
      'any.required': 'ContactType is required',
    }),
  userId: Joi.string().custom((value, helper) => {
    if (value && !isValidObjectId(value)) {
      return helper.message('User id should be a valid mongo id');
    }
    return true;
  }),
});

// для  Patch запитів
export const updateContactsSchema = Joi.object({
  name: Joi.string(),
  phoneNumber: Joi.string(),
  email: Joi.string(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...typeList),
  userId: Joi.string(),
});
