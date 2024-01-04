"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import "./latestNews.css";
import Link from "next/link";
import {
  cacheData,
  getCachedData,
  getCachedTimestamp,
} from "../../components/utils/cacheUtility";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

const LatestNews = () => {
  const [articles, setArticles] = useState([]);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const cacheKey = "latestNews";

  useEffect(() => {
    const fetchData = async () => {
      const cachedData = getCachedData(cacheKey);
      const cacheTimestamp = getCachedTimestamp(cacheKey);

      if (
        cachedData &&
        cacheTimestamp &&
        Date.now() - cacheTimestamp < 3600000 // 1 hour
      ) {
        setArticles(JSON.parse(cachedData));
      } else {
        try {
          const response = await axios.get(
            `https://gnews.io/api/v4/top-headlines?&lang=en&apikey=${apiKey}`
          );

          const articleData = response.data.articles.slice(0, 8);
          setArticles(articleData);

          // Cache the fetched data
          cacheData(cacheKey, articleData);
        } catch (error) {
          console.error("Error fetching latest news: ", error);
        }
      }
    };

    fetchData();
  }, [apiKey]);

  return (
    <div>
      <div className="top-title">
        <h2 className="font-bold text-2xl md:text-2xl lg:text-4xl">
          Latest News
        </h2>
        <p className="font-bold text-red-800 ">
          <Link href="/latest_news">See all</Link>
        </p>
      </div>

      <div className="late-container">
        {articles.map((article) => (
          <div key={article.url} className="article-card">
            <Link href="/latest_news">
              <img src={article.image} alt={article.title} />
              <div className="article-details ">
                <div className="flex gap-3 pb-3 justify-center">
                  <p className="font-bold text-sm text-red-800">
                    {article.source.name}
                  </p>
                  <b>.</b>
                  <p className="text-sm">
                    {formatDistanceToNow(new Date(article.publishedAt))} ago
                  </p>
                </div>
                <h3 className="font-bold">{article.title}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
