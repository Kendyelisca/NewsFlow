// cacheUtilityTopBusiness.js
export const cacheDataTopBusiness = (data) => {
  try {
    localStorage.setItem("topBusinessData", JSON.stringify(data));
    localStorage.setItem("topBusinessDataTimestamp", Date.now());
    console.log("Top business data cached successfully");
  } catch (error) {
    console.error("Error caching top business data: ", error);
  }
};

export const getCachedDataTopBusiness = () => {
  return localStorage.getItem("topBusinessData");
};

export const getCachedTimestampTopBusiness = () => {
  return localStorage.getItem("topBusinessDataTimestamp");
};
