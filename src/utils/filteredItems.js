// export const pageToShow = (page, arr) => {
//   const endExtraction = page * 10;
//   const startExtraction = endExtraction - 10;
//   return arr.slice(startExtraction, (endExtraction - arr.length));
// };
// export default pageToShow;
export const filteredItems = (page, arr) => {
  const perPage = 10;
  const lastElement = page * perPage;
  const firstElement = lastElement - perPage;

  return arr.filter((item, index) => index >= firstElement && index < lastElement);
};
export default filteredItems;
