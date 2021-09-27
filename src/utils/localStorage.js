export const setLocalStorage = (key, data) => {
  const storage = window.localStorage;
  storage.setItem(key, JSON.stringify(data));
};
export const getLocalStorage = (key) => {
  const storage = window.localStorage;
  return JSON.parse(storage.getItem(key));
};
