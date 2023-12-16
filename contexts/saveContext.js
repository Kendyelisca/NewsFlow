"use client";
import { createContext, useContext, useState } from "react";
import axios from "axios";

const SaveContext = createContext(); // Import createContext

export const useSaveContext = () => {
  return useContext(SaveContext);
};
export const SaveProvider = ({ children }) => {
  const [savedArticles, setSavedArticles] = useState([]);
  const baseUrl = process.env.NEXT_PUBLIC_BASEURL;
  const [isNewArticles, setNewArticles] = useState(false);
  const [isNewStories, setNewStories] = useState(false);
  const [loadingStates, setLoadingStates] = useState({}); // New state for loading states

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const saveArticle = async (article) => {
    try {
      setLoadingStates((prevLoadingStates) => ({
        ...prevLoadingStates,
        [article.url]: true, // Set loading state for this specific article
      }));

      await axios.post(`${baseUrl}/saves`, article, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      setSavedArticles((prevSavedArticles) => [...prevSavedArticles, article]);
      setNewArticles(true);
    } catch (error) {
      console.error("Error saving article:", error.response.data);
    } finally {
      setLoadingStates((prevLoadingStates) => ({
        ...prevLoadingStates,
        [article.url]: false, // Reset loading state for this specific article
      }));
    }
  };

  const unsaveArticle = async (articleUrl) => {
    try {
      setLoadingStates((prevLoadingStates) => ({
        ...prevLoadingStates,
        [articleUrl]: true, // Set loading state for this specific article
      }));

      console.log("Unsaving article with URL:", articleUrl);

      await axios.delete(`${baseUrl}/saves/${encodeURIComponent(articleUrl)}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      console.log("Article successfully unsaved:", articleUrl);

      setSavedArticles((prevSavedArticles) =>
        prevSavedArticles.filter((article) => article.url !== articleUrl)
      );
    } catch (error) {
      console.error("Error unsaving article:", error);
    } finally {
      setLoadingStates((prevLoadingStates) => ({
        ...prevLoadingStates,
        [articleUrl]: false, // Reset loading state for this specific article
      }));
    }
  };

  const isArticleSaved = (articleUrl) => {
    return savedArticles.some((article) => article.url === articleUrl);
  };

  const contextValue = {
    loadingStates,
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
