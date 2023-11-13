"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import "./latestNews.css";
import Link from "next/link";

const LatestNews = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://gnews.io/api/v4/top-headlines?category=general&lang=en&apikey=92f2bfa5875287ea90f28f8c6758e6b4"
      )
      .then((response) => {
        const articleData = response.data.articles.slice(0, 8); // Get the first 8 articles
        setArticles(articleData);
      });
  }, []);

  return (
    <div>
      <div className="top-title">
        <h2 className="font-bold text-4xl">Latest News</h2>
        <p className="font-bold text-red-800">See all</p>
      </div>
      <div className="late-container">
        {articles.map((article) => (
          <div key={article.url} className="article-card">
            <img src={article.image} alt={article.title} />
            <div className="article-details ">
              <div className="flex gap-3 pb-3 justify-center">
                <p className="font-bold text-red-800">{article.source.name}</p>
                <b>.</b>
                <p>{formatDistanceToNow(new Date(article.publishedAt))} ago</p>
              </div>
              <h3 className="font-bold">{article.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
