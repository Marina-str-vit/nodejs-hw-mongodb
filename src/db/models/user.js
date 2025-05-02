import { model, Schema } from 'mongoose';
import { handleSaveError, setUpdateSettings } from './hooks.js';
import { emailRegexp } from '../../constants/index.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.post('save', handleSaveError);
userSchema.pre('findByIdAndUpdate', setUpdateSettings);
userSchema.post('findByIdAndUpdate', handleSaveError);

export const UsersCollection = model('users', userSchema);
