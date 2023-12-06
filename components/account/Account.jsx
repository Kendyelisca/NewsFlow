"use client";

import React, { useContext, useState } from "react";
import { UserContext } from "@/contexts/user-context";
import "./account.css";

const Account = () => {
  const { user, logout } = useContext(UserContext);
  const [feedback, setFeedback] = useState("");

  if (!user) {
    // Handle the case where user is not available
    return (
      <div className="account-error">
        User information not available. Please log in.
      </div>
    );
  }

  const handleLogout = () => {
    // Call the logout function from the UserContext
    logout();
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const submitFeedback = () => {
    // You can implement the logic to send feedback to your server or any other action
    console.log("User Feedback:", feedback);
    // Optionally, you can show a confirmation message to the user
    alert("Thank you for your feedback!");
    setFeedback(""); // Clear the feedback field after submission
  };

  return (
    <div className="master-account">
      <div className="account-container">
        <h2 className="account-title">Account Information</h2>
        <div className="account-info">
          <div>
            <strong>Username:</strong> {user.username}
          </div>
          <div>
            <strong>Name:</strong> {user.name || "Not provided"}
          </div>
          <div>
            <strong>Email:</strong> {user.email || "Not provided"}
          </div>
          {/* Add more user information if available */}
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
        <div className="app-info">
          <h3>We're Proud of Our App!</h3>
          <p>
            Thank you for being a part of our community. Your contribution makes
            NewsFlow a better platform for everyone. If you have any suggestions
            or feedback, please feel free to share them with us.
          </p>
          <textarea
            placeholder="Type your feedback here..."
            value={feedback}
            onChange={handleFeedbackChange}
            rows={4}
            className="feedback-textarea"
          />
          <button className="submit-feedback-button" onClick={submitFeedback}>
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
