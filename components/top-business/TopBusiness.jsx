"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import "./TopBusiness.css";
const TopBusiness = () => {
  const [topNews, setTopNews] = useState(null);
  const apiKey = process.env.NEWS_API_KEY;

  useEffect(() => {
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`
      )
      .then((response) => {
        if (response.data.articles && response.data.articles.length > 0) {
          setTopNews(response.data.articles[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching top business news: ", error);
      });
  }, []);

  const getRelativeTime = (publishedAt) => {
    return formatDistanceToNow(new Date(publishedAt), { addSuffix: true });
  };

  return (
    <div>
      {topNews && (
        <div className="top-container">
          <div className="image">
            <img src={topNews.urlToImage} alt={topNews.title} />
          </div>
          <div className="description">
            {" "}
            <p className="text-sm">
              Published: .{" "}
              <strong>{getRelativeTime(topNews.publishedAt)}</strong>
            </p>
            <h3>{topNews.title}</h3>
            <p>{topNews.description}</p>
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
