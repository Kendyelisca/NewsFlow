"use client";

import React, { useState, useEffect } from "react";
import "./story.css";
import Link from "next/link";

const Story = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://news-backend-api-poid.onrender.com/stories"
        );
        const data = await response.json();
        setStories(data.slice(0, 5)); // Take only the first 5 stories
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {stories.length > 0 && ( // Check if stories array is not empty
        <div className="master-story">
          <div className="story-title flex justify-between pb-10">
            <h2 className="font-bold text-2xl md:text-2xl lg:text-4xl ">
              User Story
            </h2>
            <p className="font-bold text-red-800 ">
              <Link href="/stories">See all</Link>
            </p>
          </div>
          <div className="container-story">
            {stories.map((story, index) => (
              <div
                key={index}
                className={`story-item ${
                  index === 0
                    ? "a"
                    : index === 1
                    ? "b"
                    : index === 2
                    ? "c"
                    : index === 3
                    ? "d"
                    : index === 4
                    ? "f"
                    : ""
                }`}
              >
                <img src={story.image} alt={story.title} />
                <p>{story.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Story;
