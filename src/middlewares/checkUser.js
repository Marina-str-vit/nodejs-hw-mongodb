import createError from 'http-errors';

export const checkUser = () => async (req, res, next) => {
  const { user } = req;
  if (!user) {
    next(createError(401));
    return;
  }
  next();
};
