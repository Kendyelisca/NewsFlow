"use client";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import "./SaveNews.css"; // Replace with your actual CSS file
import { UserContext } from "@/contexts/user-context";
import { useSaveContext } from "@/contexts/saveContext"; // Import the useSaveContext hook
import SearchLoader from "../loader/SearchLoader";

const SaveNews = () => {
  const { user, token } = useContext(UserContext);
  const [savedNews, setSavedNews] = useState([]);
  const [loading, setLoading] = useState(false); // New loading state
  const { loadingStates, unsaveArticle, setNewArticles } = useSaveContext(); // Use the unsaveArticle function from SaveContext
  const baseUrl = process.env.NEXT_PUBLIC_BASEURL;

  useEffect(() => {
    const fetchSavedNews = async () => {
      try {
        if (!token) {
          console.error("User token not found in local storage");
          return;
        }

        setLoading(true); // Set loading to true before fetching

        const response = await axios.get(`${baseUrl}/saves`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("API Response:", response.data);

        if (response.data && Array.isArray(response.data)) {
          // Sort the saved news array based on the 'createdAt' property in descending order
          const sortedNews = response.data.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });

          setSavedNews(sortedNews);
          setNewArticles(false);
        } else {
          console.error("Invalid data format received from the API");
        }
      } catch (error) {
        console.error("Error fetching saved news: ", error);
      } finally {
        setLoading(false); // Set loading to false after fetching, whether successful or not
      }
    };

    if (user) {
      // Fetch saved news only if a user is logged in
      fetchSavedNews();
    }
  }, [user]);

  const handleUnsave = async (articleUrl) => {
    try {
      // Call unsaveArticle function with the article URL
      await unsaveArticle(articleUrl);
      // Remove the unsaved news from the local state
      setSavedNews((prevSavedNews) =>
        prevSavedNews.filter((news) => news.url !== articleUrl)
      );
    } catch (error) {
      console.error("Error unsaving news: ", error);
    }
  };

  return (
    <div className="save-news-container">
      {!user && <p className="login-message ">Login to see your saved news</p>}

      {user && loading && <SearchLoader />}

      {user && !loading && savedNews.length === 0 && (
        <p className="no-saved-news-message">
          Looks like your saved news is empty...
        </p>
      )}

      {user && savedNews.length > 0 && (
        <div className="saved-news-list">
          {savedNews.map((news) => (
            <div key={news.id} className="saved-news-item">
              <img src={news.image} alt={news.title} className="news-image" />
              <div className="flex text-sm gap-4 justify-center">
                <a href={news.source.url} className="text-red-700 font-bold">
                  {news.source.name}
                </a>
                <p className="font-bold">.</p>
                <p>
                  {news.publishedAt && (
                    <p>{formatDistanceToNow(new Date(news.publishedAt))} ago</p>
                  )}
                </p>
              </div>
              <div className="text-center text-sm">
                <p>
                  {news.createdAt && (
                    <p>
                      <span>Saved</span>{" "}
                      {formatDistanceToNow(new Date(news.createdAt))} ago
                    </p>
                  )}
                </p>
              </div>
              <div className="news-details">
                <div className="flex justify-center gap-4 mb-2">
                  <a href={news.url} target="_blank" rel="noopener noreferrer">
                    Read More
                  </a>

                  <a onClick={() => handleUnsave(news.url)}>
                    {loadingStates[news.url] ? "Unsaving" : "Unsave"}
                  </a>
                </div>
                <h3>{news.title}</h3>
                <p>{news.description}</p>
                <p>{news.content}</p> {/* Display the content here */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SaveNews;
