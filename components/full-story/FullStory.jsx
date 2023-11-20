"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import SearchLoader from "../loader/SearchLoader";
import "./fullStory.css";

const FullStory = () => {
  const [storyData, setStoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStoryData = async () => {
      try {
        const response = await axios.get(
          "https://newsflow-backend.onrender.com/stories"
        );
        if (response.data && Array.isArray(response.data)) {
          setStoryData(response.data);
        } else {
          console.error("Invalid data format received from the API");
        }
      } catch (error) {
        console.error("Error fetching full story data: ", error);
      } finally {
        // Set loading to false when the request is completed
        setLoading(false);
      }
    };

    fetchStoryData();
  }, []);

  return (
    <div>
      {loading && <SearchLoader />}
      {!loading && storyData.length === 0 && (
        <p className="text-center pb-48 pt-10">No stories available for now</p>
      )}
      <div className="full-story">
        {!loading &&
          storyData.map((story, index) => (
            <a
              key={index}
              href={story.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={story.image} alt={story.title} />
              <p>
                {formatDistanceToNow(new Date(story.createdAt), {
                  addSuffix: true,
                })}
              </p>
              <h1>{story.title}</h1>
              <p>{story.description}</p>
            </a>
          ))}
      </div>
    </div>
  );
};

export default FullStory;
