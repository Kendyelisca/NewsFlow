"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import "./TopBusiness.css";
import NewsForm from "../form/NewsForm";
import { useNewsContext } from "@/contexts/newsContext";
import Loader from "../loader/Loader";

const TopBusiness = () => {
  const apiKey = process.env.API_KEY;
  const [topNews, setTopNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isForm } = useNewsContext();
  console.log("isForm value in TopBusiness:", isForm);
  const fetchTopNews = () => {
    axios
      .get(
        "https://gnews.io/api/v4/search?q=example&apikey=4bc79dae18ef7c43af7319c6e58bfa22"
      )
      .then((response) => {
        if (response.data.articles && response.data.articles.length > 0) {
          setTopNews(response.data.articles[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching top business news: ", error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false regardless of success or failure
      });
  };

  useEffect(() => {
    // Initial fetch when the component mounts
    fetchTopNews();
  }, []);

  const getRelativeTime = (publishedAt) => {
    return formatDistanceToNow(new Date(publishedAt), { addSuffix: true });
  };

  return (
    <div>
      {isForm ? (
        <>
          <NewsForm />
        </>
      ) : (
        <>
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
                  <h3 className="font-bold pb-3 text-2xl">{topNews.title}</h3>
                  <p className="pb-3 text-3xl">{topNews.description}</p>
                  <a
                    href={topNews.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read More
                  </a>
                </div>
              </div>
            )
          )}
        </>
      )}
    </div>
  );
};

export default TopBusiness;
