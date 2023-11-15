"use client";

import { createContext, useContext, useState } from "react";

const NewsContext = createContext(null);

export const useNewsContext = () => {
  const [isForm, setIsForm] = useState(false);

  const toggleForm = () => {
    setIsForm(!isForm);
  };

  const value = {
    isForm,
    toggleForm,
  };

  return value;
};

export const NewsContextProvider = ({ children }) => {
  const contextValue = useNewsContext();
  console.log("Context Value:", contextValue);
  return (
    <NewsContext.Provider value={contextValue}>{children}</NewsContext.Provider>
  );
};
