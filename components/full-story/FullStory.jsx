"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { formatDistanceToNow } from "date-fns";
import SearchLoader from "../loader/SearchLoader";
import { FaComment, FaThumbsUp } from "react-icons/fa";
import "./fullStory.css";
import { useSaveContext } from "@/contexts/saveContext";

const FullStory = () => {
  const [storyData, setStoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const { setNewStories } = useSaveContext();

  const baseUrl = process.env.NEXT_PUBLIC_BASEURL;

  const getToken = () => {
    // Get the authentication token from the cookies
    return Cookies.get("token");
  };

  useEffect(() => {
    const fetchStoryData = async () => {
      try {
        const cachedData = localStorage.getItem("storyData");
        const cacheTimestamp = localStorage.getItem("storyDataTimestamp");

        // Check if cached data exists and is not expired (e.g., 1 hour cache)
        if (
          cachedData &&
          cacheTimestamp &&
          Date.now() - cacheTimestamp < 3600000
        ) {
          setStoryData(JSON.parse(cachedData));
          setLoading(false);
        } else {
          const response = await axios.get(`${baseUrl}/stories`);

          if (response.data && response.data.length > 0) {
            const sortedNews = response.data.sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            });
            setStoryData(sortedNews);
            setNewStories(false);

            localStorage.setItem("storyData", JSON.stringify(sortedNews));
            localStorage.setItem("storyDataTimestamp", Date.now());

            console.log("Sorted Story Data: ", sortedNews);
          } else {
            console.error(
              "No data received from the API or the data array is empty"
            );
          }
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching full story data: ", error);
        setLoading(false);
      }
    };

    fetchStoryData();
  }, [baseUrl, setNewStories]);

  const handleLike = async (storyId) => {
    alert("We are working on this feature.");
  };

  const handleComment = async (storyId) => {
    alert("we are working on this feature.");
  };

  const handleFollow = async (storyId) => {
    alert("we are working on this feature.");
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
                  style={{ color: liked ? "green" : "black" }}
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
              {/* <a href={story.url} target="_blank" rel="noopener noreferrer">
              follow me on twitter
              </a> */}
              {/* <div>
                {" "}
                {comments.map((comment, commentIndex) => (
                  <div key={commentIndex}>
                    <p>{comment.text}</p>
                  </div>
                ))}
              </div> */}
              {/* <div>
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button onClick={() => handleComment(story.id)}>
                  Add Comment
                </button>
              </div> */}
              <h1>{story.title}</h1>
              <p>{story.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FullStory;
