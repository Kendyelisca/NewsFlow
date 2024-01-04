"use client";

// TopBusiness.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import "./TopBusiness.css";
import Loader from "../loader/Loader";
import {
  cacheDataTopBusiness,
  getCachedDataTopBusiness,
  getCachedTimestampTopBusiness,
} from "../utils/cacheUtilityTopBusiness";

const TopBusiness = () => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const [topNews, setTopNews] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTopNews = () => {
    const cachedData = getCachedDataTopBusiness();
    const cacheTimestamp = getCachedTimestampTopBusiness();

    if (
      cachedData &&
      cacheTimestamp &&
      Date.now() - cacheTimestamp < 3600000 // 1 hour
    ) {
      setTopNews(JSON.parse(cachedData));
      setLoading(false);
    } else {
      axios
        .get(`https://gnews.io/api/v4/search?q=example&apikey=${apiKey}`)
        .then((response) => {
          if (response.data.articles && response.data.articles.length > 0) {
            const topNewsData = response.data.articles[0];
            setTopNews(topNewsData);
            cacheDataTopBusiness(topNewsData);
          }
        })
        .catch((error) => {
          console.error("Error fetching top business news: ", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchTopNews();
  }, []);

  const getRelativeTime = (publishedAt) => {
    return formatDistanceToNow(new Date(publishedAt), { addSuffix: true });
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        topNews && (
          <div className="top-container">
            <div className="image">
              <img src={topNews.image} alt={topNews.title} />
            </div>
            <div className="description">
              <p className="text-sm pb-5">
                Published . {getRelativeTime(topNews.publishedAt)}
              </p>
              <h3 className="top-news-t pb-3 text-3xl  md:text-4xl lg:text-5xl font-semibold">
                {topNews.title}
              </h3>
              <a href={topNews.url} target="_blank" rel="noopener noreferrer">
                Read More
              </a>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default TopBusiness;
