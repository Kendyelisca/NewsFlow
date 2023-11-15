import React, { useState, useEffect } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

const FullStory = () => {
  const [storyData, setStoryData] = useState([]);

  useEffect(() => {
    const fetchStoryData = async () => {
      try {
        const response = await axios.get("YOUR_BACKEND_API_LINK");
        if (response.data && response.data.articles) {
          const topFiveStories = response.data.articles.slice(0, 5);
          setStoryData(topFiveStories);
        }
      } catch (error) {
        console.error("Error fetching full story data: ", error);
      }
    };

    fetchStoryData();
  }, []);

  return (
    <div className="full-story">
      {storyData.map((story, index) => (
        <a
          key={index}
          href={story.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={story.image} alt={story.title} />
          <p>
            {formatDistanceToNow(new Date(story.timestamp), {
              addSuffix: true,
            })}
          </p>
          <h1>{story.title}</h1>
          <p>{story.description}</p>
        </a>
      ))}
    </div>
  );
};

export default FullStory;
