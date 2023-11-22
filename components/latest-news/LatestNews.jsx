"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import "./latestNews.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

const LatestNews = () => {
  const [articles, setArticles] = useState([]);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  useEffect(() => {
    // Fetch saved articles from your backend
    const fetchSavedArticles = async () => {
      try {
        const response = await axios.get("/api/saved-articles");
        setSavedArticles(response.data);
      } catch (error) {
        console.error("Error fetching saved articles: ", error);
      }
    };

    axios
      .get(
        `https://gnews.io/api/v4/top-headlines?category=general&lang=en&apikey=${apiKey}`
      )
      .then((response) => {
        const articleData = response.data.articles.slice(0, 8); // Get the first 8 articles
        setArticles(articleData);
      });

    fetchSavedArticles();
  }, []);

  //const handleSaveClick = async (article) => {
  // try {
  // Check if the article is already saved
  //if (
  //    savedArticles.find((savedArticle) => savedArticle.url === article.url)
  //  ) {
  // Article is already saved, handle accordingly (e.g., show a message)
  //console.log("Article is already saved");
  // return;
  //}

  // Send a POST request to save the article
  // await axios.post("/api/save-article", { article });

  // Update the saved articles state
  //setSavedArticles((prevSavedArticles) => [...prevSavedArticles, article]);
  //} catch (error) {
  //  console.error("Error saving article: ", error);
  // Handle error (e.g., show an error message to the user)
  //  }
  //};

  //const isArticleSaved = (article) => {
  //return savedArticles.some(
  //(savedArticle) => savedArticle.url === article.url
  //    );
  //};

  return (
    <div>
      <div className="top-title">
        <h2 className="font-bold text-2xl md:text-2xl lg:text-4xl">
          Latest News
        </h2>
        <p className="font-bold text-red-800">
          <Link href="/latest_news">See all</Link>
        </p>
      </div>
      <div className="late-container">
        {articles.map((article) => (
          <div key={article.url} className="article-card">
            <a href={article.url} target="_blank">
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
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
