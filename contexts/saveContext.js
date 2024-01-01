"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "./user-context";

const SaveContext = createContext();

export const useSaveContext = () => {
  return useContext(SaveContext);
};

export const SaveProvider = ({ children }) => {
  const [savedArticles, setSavedArticles] = useState([]);
  const baseUrl = process.env.NEXT_PUBLIC_BASEURL;
  const [isNewArticles, setNewArticles] = useState(false);
  const [isNewStories, setNewStories] = useState(false);
  const { token, user } = useContext(UserContext);
  const [loadingStates, setLoadingStates] = useState({});

  useEffect(() => {
    // Load saved articles when the user and token are available
    if (user && token) {
      loadSavedArticles();
    }
  }, [user, token]);

  const loadSavedArticles = async () => {
    try {
      const response = await axios.get(`${baseUrl}/saves`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSavedArticles(response.data);
    } catch (error) {
      console.error(
        "Error loading saved articles:",
        error.response?.data || error.message || error
      );
    }
  };

  const saveArticle = async (article) => {
    try {
      setLoadingStates((prevLoadingStates) => ({
        ...prevLoadingStates,
        [article.url]: true,
      }));

      await axios.post(`${baseUrl}/saves`, article, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSavedArticles((prevSavedArticles) => [...prevSavedArticles, article]);
      setNewArticles(true);
    } catch (error) {
      console.error(
        "Error saving article:",
        error.response?.data || error.message || error
      );
    } finally {
      setLoadingStates((prevLoadingStates) => ({
        ...prevLoadingStates,
        [article.url]: false,
      }));
    }
  };

  const unsaveArticle = async (articleUrl) => {
    try {
      setLoadingStates((prevLoadingStates) => ({
        ...prevLoadingStates,
        [articleUrl]: true,
      }));

      await axios.delete(`${baseUrl}/saves/${encodeURIComponent(articleUrl)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSavedArticles((prevSavedArticles) =>
        prevSavedArticles.filter((article) => article.url !== articleUrl)
      );
    } catch (error) {
      console.error("Error unsaving article:", error);
    } finally {
      setLoadingStates((prevLoadingStates) => ({
        ...prevLoadingStates,
        [articleUrl]: false,
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
