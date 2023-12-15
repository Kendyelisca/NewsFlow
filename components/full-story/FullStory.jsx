"use client";

import { useState, useEffect } from "react";
import axios from "axios";
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
    // Get the authentication token from local storage
    return localStorage.getItem("token");
  };

  useEffect(() => {
    const fetchStoryData = async () => {
      try {
        // Fetch story data including likes and comments
        const response = await axios.get(`${baseUrl}/stories`); // Replace 1 with the actual story ID

        if (response.data) {
          setStoryData(response.data);
          console.log("the test is ongoing", response.data[0].likes);
          setNewStories(false);
          setLikes(response.data.likes);
          setComments(response.data.comments);
        } else {
          console.error("Invalid data format received from the API");
        }
      } catch (error) {
        console.error("Error fetching full story data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStoryData();
  }, []);

  const handleLike = async (storyId) => {
    alert("We are working on this feature.");
  };

  const handleComment = async (storyId) => {
    alert("we are working on this feature.");
    // try {
    //   // Send a comment request to the backend
    //   await axios.post(
    //     `${baseUrl}/stories/${storyId}/comments`, // Adjust the API endpoint based on your backend structure
    //     { text: commentText }
    //   );

    //   // Update the comments state for the specific story
    //   setComments((prevComments) => [
    //     ...prevComments,
    //     { text: commentText, userId: /* add the user ID here */ },
    //   ]);

    //   // Clear the comment input field
    //   setCommentText("");
    // } catch (error) {
    //   console.error("Error adding a comment: ", error);
    // }
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
