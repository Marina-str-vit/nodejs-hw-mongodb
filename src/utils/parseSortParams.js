// import { sortOrderList } from '../constants/index.js';

// export const parseSortParams = ({ sortBy, sortOrder }, sortByList) => {
//   const parsedSortOrder = sortOrderList.includes(sortOrder)
//     ? sortOrder
//     : sortOrderList[0];
//   const parsedSortBy = sortByList.includes(sortBy) ? sortBy : '_id';
//   return {
//     sortBy: parsedSortBy,
//     sortOrder: parsedSortOrder,
//   };
// };

import { sortOrderList } from '../constants/index.js';
const parseSortOrder = (sortOrder) => {
  const isKnownOrder = [sortOrderList[0], sortOrderList[1]].includes(sortOrder);
  if (isKnownOrder) return sortOrder;
  return sortOrderList[0];
};
const parseSortBy = (sortBy) => {
  const keysOfContact = ['_id', 'name'];
  if (keysOfContact.includes(sortBy)) {
    return sortBy;
  }
  return '_id';
};
export const parseSortParams = (query) => {
  const { sortOrder, sortBy } = query;
  const parsedSortOrder = parseSortOrder(sortOrder);
  const parsedSortBy = parseSortBy(sortBy);
  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};
