"use client";

import { createContext, useContext, useState } from "react";
import axios from "axios";

const SaveContext = createContext();

export const useSaveContext = () => {
  return useContext(SaveContext);
};

export const SaveProvider = ({ children }) => {
  const [savedArticles, setSavedArticles] = useState([]);
  const baseUrl = process.env.NEXT_PUBLIC_BASEURL;
  const [isNewArticles, setNewArticles] = useState(false);
  const [isNewStories, setNewStories] = useState(false);
  const getToken = () => {
    // Get the authentication token from local storage
    return localStorage.getItem("token");
  };

  const saveArticle = async (article) => {
    try {
      // Call your backend API to save the article
      await axios.post(`${baseUrl}/saves`, article, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      setSavedArticles((prevSavedArticles) => [...prevSavedArticles, article]);
      setNewArticles(true);
    } catch (error) {
      console.error("Error saving article:", error.response.data);
    }
  };

  const unsaveArticle = async (articleUrl) => {
    try {
      // Log the URL being sent in the DELETE request
      console.log("Unsaving article with URL:", articleUrl);

      // Call your backend API to unsave the article
      await axios.delete(`${baseUrl}/saves/${encodeURIComponent(articleUrl)}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      // Log a message when the unsave is successful
      console.log("Article successfully unsaved:", articleUrl);

      setSavedArticles((prevSavedArticles) =>
        prevSavedArticles.filter((article) => article.url !== articleUrl)
      );
    } catch (error) {
      console.error("Error unsaving article:", error);
    }
  };

  const isArticleSaved = (articleUrl) => {
    return savedArticles.some((article) => article.url === articleUrl);
  };

  const contextValue = {
    setNewStories,
    isNewStories,
    setNewArticles,
    isNewArticles,
    savedArticles,
    saveArticle,
    unsaveArticle,
    isArticleSaved,
  };

  return (
    <SaveContext.Provider value={contextValue}>{children}</SaveContext.Provider>
  );
};
