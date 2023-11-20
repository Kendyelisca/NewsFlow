"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import "./latest.css";
import SearchLoader from "../loader/SearchLoader";

const Search_latest = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  useEffect(() => {
    setLoading(true);

    if (searchTerm.trim() === "") {
      // If the search term is empty, show the latest news
      axios
        .get(
          `https://gnews.io/api/v4/top-headlines?category=general&lang=en&apikey=${apiKey}`
        )
        .then((response) => {
          const articleData = response.data.articles.slice(0, 10); // Get the first 30 articles
          setSearchResults(articleData);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      // If there's a search term, perform a search
      axios
        .get(
          `https://gnews.io/api/v4/search?q=${searchTerm}&lang=en&apikey=${apiKey}`
        )
        .then((response) => {
          setSearchResults(response.data.articles);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [searchTerm]);

  return (
    <div>
      <h2 className="font-bold text-2xl md:text-2xl lg:text-4xl text-center pb-5">
        Latest News
      </h2>
      <div className="search-form">
        <input
          type="text"
          placeholder="Search news..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {loading && <SearchLoader />}
      <div className="search-results">
        {searchResults.length === 0 && !loading && (
          <p className="no-results-message pb-48">
            No results found for "{searchTerm}"
          </p>
        )}
        {searchResults.map((article) => (
          <div key={article.url} className="article-search">
            <a href={article.url} target="_blank">
              <img src={article.image} alt={article.title} />
              <div className="article-details">
                <div className="flex gap-3 pb-3 justify-center">
                  <p className="font-bold text-red-800">
                    {article.source.name}
                  </p>
                  <b>.</b>
                  <p>
                    {formatDistanceToNow(new Date(article.publishedAt))} ago
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="font-bold">{article.title}</h3>
                  <p>{article.description}</p>
                  <p>{article.content}</p>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search_latest;