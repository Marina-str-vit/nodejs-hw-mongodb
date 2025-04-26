const parseIsFavourite = (isFavourite) => {
  const booleanType = typeof isFavourite === 'string';
  if (!booleanType) return;
  const listOfIsFavourite = ['true', 'false'];
  const favourite = (isFavourite) => listOfIsFavourite.includes(isFavourite);

  if (favourite(isFavourite)) return isFavourite;
};

export const parseContactFilterParams = ({ isFavourite }) => {
  const parsedIsFavourite = parseIsFavourite(isFavourite);
  return {
    isFavourite: parsedIsFavourite,
  };
};
