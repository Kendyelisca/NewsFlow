"use client";

import { useState } from "react";
import axios from "axios";
import "./suscribe.css";

const Subscribe = () => {
  const [email, setEmail] = useState(""); // State to store the email input value
  const [submitted, setSubmitted] = useState(false); // State to track if the form has been submitted
  const [errorMessage, setErrorMessage] = useState(""); // State to store error messages

  const handleEmailChange = (event) => {
    setEmail(event.target.value); // Update the email state when input changes
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the page from reloading on form submission

    try {
      // Here, add the logic to send the email value to an API endpoint
      const response = await axios.post("your-api-endpoint", { email });
      console.log("API response:", response.data);

      // Clear the email input after successful submission
      setEmail("");
      setSubmitted(true); // Set submitted to true
      setErrorMessage(""); // Clear any previous error message
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitted(false); // Set submitted to false in case of an error
      setErrorMessage("Please try again the 20th of November."); // Set an error message
    }
  };

  return (
    <div className="sus-container" id="subscribe">
      <b className="font-bold text-red-800">NewsFlow</b>
      <p className="font-bold text-center">
        Let's subscribe so you don't miss the latest updates
      </p>

      {submitted && !errorMessage && (
        <p className="text-green-600">Subscription successful!</p>
      )}
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}

      <form className="sub-form pt-4" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Your email"
          className="p-2 "
          value={email} // Bind the input value to the email state
          onChange={handleEmailChange} // Handle input changes
        />
        <button
          type="submit"
          className="bg-red-800 text-white p-2 pl-4 pr-4 hover:bg-red-700"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Subscribe;
