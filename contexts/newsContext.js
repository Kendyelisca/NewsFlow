"use client";

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const NewsContext = createContext(null);

export const useNewsContext = () => {
  const [isForm, setIsForm] = useState(false);

  //navbar toggle
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

  return (
    <NewsContext.Provider value={contextValue}>{children}</NewsContext.Provider>
  );
};
