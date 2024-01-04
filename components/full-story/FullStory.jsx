"use client";

// FullStory.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import SearchLoader from "../loader/SearchLoader";
import { FaComment, FaThumbsUp } from "react-icons/fa";
import "./fullStory.css";
import { useSaveContext } from "@/contexts/saveContext";
import { UserContext } from "@/contexts/user-context";

const FullStory = () => {
  const [storyData, setStoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setNewStories } = useSaveContext();
  const baseUrl = process.env.NEXT_PUBLIC_BASEURL;

  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/stories`);

      if (response.data && response.data.length > 0) {
        const sortedNews = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setStoryData(sortedNews);
        setNewStories(false);

        console.log("Sorted Story Data: ", sortedNews);
      } else {
        console.error(
          "No data received from the API or the data array is empty"
        );
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching full story data: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [baseUrl, setNewStories]);

  const handleLike = async (storyId) => {
    alert("We are working on this feature.");
  };

  const handleComment = async (storyId) => {
    alert("We are working on this feature.");
  };

  const handleFollow = async (storyId) => {
    alert("We are working on this feature.");
  };

  return (
    <div>
      {loading && <SearchLoader />}
      {!loading && storyData.length === 0 && (
        <p className="text-center pb-48 pt-56">No stories available for now</p>
      )}
      <div className="full-story">
        {!loading &&
          storyData.map((story, index) => (
            <div key={index}>
              <img src={story.image} alt={story.title} />
              <div className="flex gap-4">
                <p className=" font-bold text-red-700">
                  {" "}
                  {`  ${story.user.name}`}
                </p>
                <b>.</b>
                <p>
                  {formatDistanceToNow(new Date(story.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
              <div className="flex gap-8  mt-2">
                <div
                  className="flex justify-center items-center gap-2 cursor-pointer"
                  onClick={handleComment}
                >
                  comment
                  <FaComment size={20} color="blue" />0
                </div>
                <div
                  className="flex justify-center items-center gap-2 cursor-pointer"
                  onClick={() => handleLike(story.id)}
                  style={{ color: "green" }}
                >
                  like <FaThumbsUp size={20} color="green" />0
                </div>
                <div
                  onClick={() => handleFollow(story.id)}
                  className="border rounded-lg pl-2 pr-2  border-white-700 bg-red-700 text-white font-bold cursor-pointer hover:bg-white hover:border-red-700 hover:text-red-700 "
                >
                  Follow
                </div>
              </div>
              <h1>{story.title}</h1>
              <p>{story.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FullStory;
