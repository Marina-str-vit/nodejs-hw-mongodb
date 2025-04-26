const parseIsFavourite = (isFavourite) => {
  const booleanType = typeof isFavourite === 'string';
  if (!booleanType) return;
  const contact = (isFavourite) => ['true', 'false'].includes(isFavourite);

  if (contact(isFavourite)) return isFavourite;
};

export const parseContactFilterParams = ({ isFavourite }) => {
  const parsedIsFavourite = parseIsFavourite(isFavourite);
  return {
    isFavourite: parsedIsFavourite,
  };
};
