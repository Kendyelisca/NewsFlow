"use client";

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AiFillSave } from "react-icons/ai";
import { formatDistanceToNow } from "date-fns";
import "./latest.css";
import SearchLoader from "../loader/SearchLoader";
import { useSaveContext } from "@/contexts/saveContext";
import { UserContext } from "@/contexts/user-context";
const Search_latest = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const { savedArticles, saveArticle, unsaveArticle, isArticleSaved } =
    useSaveContext();
  const { user } = useContext(UserContext);

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
      <h2 className="search-tit font-bold text-2xl md:text-2xl lg:text-4xl text-center pb-5">
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
            <img src={article.image} alt={article.title} />
            <div className="article-details">
              <div className="flex gap-3 pb-3 justify-center">
                <p className="font-bold text-red-800 text-sm">
                  {article.source.name}
                </p>
                <b>.</b>
                <p className="text-sm">
                  {formatDistanceToNow(new Date(article.publishedAt))} ago
                </p>
              </div>
              <div className="flex justify-center gap-4 mb-2">
                {" "}
                <a
                  onClick={() => {
                    if (!user) {
                      // If there is no user
                      alert("Login to save the article");
                      return;
                    }
                    if (isArticleSaved(article.url)) {
                      unsaveArticle(article.url);
                    } else {
                      saveArticle(article);
                    }
                  }}
                >
                  {isArticleSaved(article.url) ? (
                    <span className="flex justify-center items-center gap-2">
                      <p>Unsave</p> <AiFillSave />
                    </span>
                  ) : (
                    <span className="flex justify-center items-center gap-2">
                      <p>Save</p> <AiFillSave />
                    </span>
                  )}
                </a>
                <a href={article.url} target="_blank">
                  Read more
                </a>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="font-bold">{article.title}</h3>
                <p>{article.description}</p>
                <p>{article.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search_latest;
