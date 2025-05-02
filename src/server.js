import express from 'express';
import cors from 'cors';
import { logger } from './middlewares/logger.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

import contactsRouter from './routers/contacts.js';
import authRouter from './routers/auth.js';
// import router from './routers/index.js';

import { getEnvVar } from './utils/getEnvVar.js';
import cookieParser from 'cookie-parser';

const PORT = Number(getEnvVar('PORT', '3000'));
const app = express();

export const setupServer = () => {
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
  app.use(logger);

  // app.use(router);
  app.use('/contacts', contactsRouter);
  app.use('/auth', authRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};
