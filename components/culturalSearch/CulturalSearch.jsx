"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";
import "./CulturalSearch.css";
import SearchLoader from "../loader/SearchLoader";

const CulturalSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    const fetchCulturalArticles = async () => {
      setLoading(true);
      setNoResults(false);

      try {
        let url = `https://gnews.io/api/v4/top-headlines?category=entertainment&lang=en&apikey=${apiKey}`;

        if (searchTerm.trim() !== "") {
          // If there's a search term, perform a search
          url = `https://gnews.io/api/v4/search?q=${searchTerm}&lang=en&apikey=${apiKey}`;
        }

        const response = await axios.get(url);

        if (response.data && response.data.articles) {
          setSearchResults(response.data.articles);
          setNoResults(response.data.articles.length === 0);
        }
      } catch (error) {
        console.error("Error fetching cultural articles: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCulturalArticles();
  }, [searchTerm]);

  return (
    <div>
      <h2 className="cult-tit font-bold text-2xl md:text-2xl lg:text-4xl text-center pb-5">
        Entertainment and Arts
      </h2>

      <div className="search-form-cult">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading && <SearchLoader />}

      {noResults && !loading && <div>No results found</div>}

      <div className="cult">
        {searchResults.map((article, index) => (
          <div key={index} className="cul-content">
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
                </div>{" "}
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

export default CulturalSearch;
