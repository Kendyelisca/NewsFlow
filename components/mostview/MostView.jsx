"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./mostView.css";
const MostView = () => {
  const [mostViewedNews, setMostViewedNews] = useState([]);

  useEffect(() => {
    const fetchMostViewedNews = async () => {
      try {
        const apiKey = "9GfqDlIEvyOj2x728OpIXjKFhmVq8bf3";
        const response = await axios.get(
          `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${apiKey}`
        );

        if (response.data && response.data.results) {
          const topFive = response.data.results.slice(0, 5);
          setMostViewedNews(topFive);
        }
      } catch (error) {
        console.error("Error fetching most viewed news: ", error);
      }
    };

    fetchMostViewedNews();
  }, []);

  return (
    <div className="most-container">
      <div className="flex justify-between items-center pb-8">
        <h2 className="font-bold text-3xl md:text-3xl lg:text-4xl">
          Most Watched
        </h2>
        <p className="font-bold text-red-800">See all</p>
      </div>

      <div>
        <div className="sub-container">
          {mostViewedNews.map((news, index) => (
            <div key={news.id} className="flex justify-center gap-2 p-3">
              <strong className="text-6xl text-red-800">{index + 1}</strong>
              <a href={news.url} target="_blank" rel="noopener noreferrer">
                {news.title}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MostView;
