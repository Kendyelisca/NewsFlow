"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import "./TopBusiness.css";

const TopBusiness = () => {
  const apiKey = process.env.API_KEY;
  const [topNews, setTopNews] = useState(null);

  const fetchTopNews = () => {
    axios
      .get(
        "https://gnews.io/api/v4/search?q=example&apikey=cb59f3cf10b28ead7df56a9a22eac883"
      )
      .then((response) => {
        if (response.data.articles && response.data.articles.length > 0) {
          setTopNews(response.data.articles[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching top business news: ", error);
      });
  };

  useEffect(() => {
    // Initial fetch when the component mounts
    fetchTopNews();

    // Set up a timer to fetch new data every 5 minutes
    const intervalId = setInterval(() => {
      fetchTopNews();
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    return () => {
      // Clean up the timer when the component unmounts
      clearInterval(intervalId);
    };
  }, []);

  const getRelativeTime = (publishedAt) => {
    return formatDistanceToNow(new Date(publishedAt), { addSuffix: true });
  };

  return (
    <div>
      {topNews && (
        <div className="top-container">
          <div className="image">
            <img src={topNews.image} alt={topNews.title} />
          </div>
          <div className="description">
            <p className="text-sm pb-5">
              Published: {getRelativeTime(topNews.publishedAt)}
            </p>
            <h3 className="font-bold pb-3 text-2xl">{topNews.title}</h3>
            <p className="pb-3 text-3xl">{topNews.description}</p>
            <a href={topNews.url} target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopBusiness;
