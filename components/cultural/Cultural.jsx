"use client";

// Cultural.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./cultural.css";

const Cultural = () => {
  const [culturalArticles, setCulturalArticles] = useState([]);

  useEffect(() => {
    const fetchCulturalArticles = async () => {
      try {
        const response = await axios.get(
          "https://gnews.io/api/v4/search?q=entertainment art&lang=en&apikey=4bc79dae18ef7c43af7319c6e58bfa22"
        );

        if (response.data && response.data.articles) {
          const topSix = response.data.articles.slice(0, 6);
          setCulturalArticles(topSix);
        }
      } catch (error) {
        console.error("Error fetching cultural articles: ", error);
      }
    };

    fetchCulturalArticles();
  }, []);

  return (
    <div className="cult-container">
      <div className="flex justify-between items-center pb-10">
        {" "}
        <h2 className="font-bold text-2xl md:text-2xl lg:text-4xl">
          Entertainment and Arts
        </h2>
        <p className="font-bold text-red-800">See all</p>
      </div>

      <ul className="cult-1">
        {culturalArticles.map((article, index) => (
          <li key={index} className={`item-${index + 1}`}>
            <a href={article.url} target="_blank">
              <img src={article.image} alt={article.title} />
              <p>{article.title}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cultural;
