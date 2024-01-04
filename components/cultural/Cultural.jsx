"use client";

// Cultural.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import "./cultural.css";
import Loader from "../loader/Loader";
import {
  cacheData,
  getCachedData,
  getCachedTimestamp,
} from "../utils/cacheUtility";

const Cultural = () => {
  const [culturalArticles, setCulturalArticles] = useState([]);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const cacheKey = "culturalArticles";

  useEffect(() => {
    const fetchAndCacheCulturalArticles = async () => {
      const cachedData = getCachedData(cacheKey);
      const cacheTimestamp = getCachedTimestamp(cacheKey);

      if (
        cachedData &&
        cacheTimestamp &&
        Date.now() - cacheTimestamp < 3600000 // 1 hour
      ) {
        setCulturalArticles(JSON.parse(cachedData));
      } else {
        try {
          const response = await axios.get(
            `https://gnews.io/api/v4/search?q=entertainment art&lang=en&apikey=${apiKey}`
          );

          if (response.data && response.data.articles) {
            const topSix = response.data.articles.slice(0, 6);
            setCulturalArticles(topSix);

            // Cache the fetched data
            cacheData(cacheKey, topSix);
          }
        } catch (error) {
          console.error("Error fetching cultural articles: ", error);
        }
      }
    };

    fetchAndCacheCulturalArticles();
  }, []);

  const renderCulturalArticle = (article, index) => (
    <li key={index} className={`item-${index + 1}`}>
      <Link href="/entertainment_&_arts">
        <img src={article.image} alt={article.title} />
        <p>{article.title}</p>
      </Link>
    </li>
  );

  const renderCulturalArticlesList = () => (
    <ul className="cult-1">
      {culturalArticles.map((article, index) =>
        renderCulturalArticle(article, index)
      )}
    </ul>
  );

  return (
    <div className="cult-container">
      <div className="flex justify-between items-center pb-10">
        <h2 className="font-bold text-2xl md:text-2xl lg:text-4xl">
          Entertainment and Arts
        </h2>
        <p className="font-bold text-red-800">
          <Link href="/entertainment_&_arts">See all</Link>
        </p>
      </div>

      {culturalArticles.length > 0 ? renderCulturalArticlesList() : <Loader />}
    </div>
  );
};

export default Cultural;
