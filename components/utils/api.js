// utils/api.js

import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const apiUrl = "https://gnews.io/api/v4/top-headlines";

export const fetchLatestNews = async () => {
  try {
    const response = await axios.get(`${apiUrl}?&lang=en&apikey=${apiKey}`);
    console.log("API response:", response.data); // Log the response
    const articleData = response.data.articles.slice(0, 8);
    return articleData;
  } catch (error) {
    console.error("Error fetching latest news:", error);
    return [];
  }
};
