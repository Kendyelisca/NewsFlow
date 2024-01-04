// cacheUtility.js

export const cacheData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    localStorage.setItem(`${key}Timestamp`, Date.now());
    console.log(`Data for ${key} cached successfully`);
  } catch (error) {
    console.error(`Error caching data for ${key}: `, error);
  }
};

export const getCachedData = (key) => {
  return localStorage.getItem(key);
};

export const getCachedTimestamp = (key) => {
  return localStorage.getItem(`${key}Timestamp`);
};
