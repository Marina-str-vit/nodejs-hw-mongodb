import createHttpError from 'http-errors';

const parseIsFavourite = (isFavourite) => {
  const isBoolean = typeof isFavourite === 'string';
  if (!isBoolean) return;
  const contact = (isFavourite) => ['true', 'false'].includes(isFavourite);

  if (contact(isFavourite)) return isFavourite;
  if (isBoolean !== 'string') {
    throw createHttpError(404, `Bad request`);
  }
};

export const parseContactFilterParams = (query) => {
  const { isFavourite } = query;
  const parsedIsFavourite = parseIsFavourite(isFavourite);
  return {
    isFavourite: parsedIsFavourite,
  };
};
