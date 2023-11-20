"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import "./most.css"; // Make sure to adjust the stylesheet name
import Link from "next/link";
import SearchLoader from "../loader/SearchLoader";

const apiKey = "9GfqDlIEvyOj2x728OpIXjKFhmVq8bf3"; // Replace with your actual API key

const MostviewSearch = () => {
  const [mostViewedNews, setMostViewedNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMostViewedNews = async () => {
      try {
        const response = await axios.get(
          `https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=${apiKey}`
        ); // Fetching the top 7 most viewed articles

        if (response.data && response.data.results) {
          setMostViewedNews(response.data.results);
          setLoading(false); // Set loading to false once data is fetched
        }
      } catch (error) {
        console.error("Error fetching most viewed news: ", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchMostViewedNews();
  }, []);

  return (
    <div className="most-contain">
      <h2 className="font-bold text-2xl md:text-2xl lg:text-4xl text-center">
        Most Watched
      </h2>
      {loading && <SearchLoader />}
      <div>
        <div className="sub-contain">
          {mostViewedNews.map((news, index) => (
            <div
              key={news.id}
              className="flex justify-center gap-2 p-3 most-card"
            >
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

export default MostviewSearch;
