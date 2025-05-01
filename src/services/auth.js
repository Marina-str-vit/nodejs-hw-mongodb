import createError from 'http-errors';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

import SessionCollection from '../db/models/session.js';

import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/users.js';
import { UsersCollection } from '../db/models/User.js';

export const registerUser = async (payload) => {
  const { email, password } = payload;
  const user = await UsersCollection.findOne({ email });
  if (user) {
    throw createError(409, 'User already exist');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await UsersCollection.create({
    ...payload,
    password: hashPassword,
  });

  return newUser;
};

export const loginUser = async ({ email, password }) => {
  const user = await UsersCollection.findOne({ email });
  if (!user) {
    throw createError(401, 'Email invalid');
  }

  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    throw createError(401, 'Unauthorized');
  }

  await SessionCollection.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return SessionCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};

export const logoutUser = async (sessionId) => {
  await SessionCollection.deleteOne({ _id: sessionId });
};

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  };
};

export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createError(401, 'Session not found');
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createError(401, 'Session token expired');
  }

  const newSession = createSession();

  await SessionCollection.deleteOne({ _id: sessionId, refreshToken });

  return await SessionCollection.create({
    userId: session.userId,
    ...newSession,
  });
};
