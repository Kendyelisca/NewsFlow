"use client";

import { useState } from "react";
import axios from "axios";
import "./suscribe.css";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false); // New state to track the submission process
  const [errorMessage, setErrorMessage] = useState("");
  const baseUrl = process.env.NEXT_PUBLIC_BASEURL;

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);

      const response = await axios.post(`${baseUrl}/mail`, { email });

      console.log("API response:", response.data);

      setEmail("");
      setSubmitted(true);
      setErrorMessage("");
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitted(false);

      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("Subscription failed! Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="sus-container" id="suscribe">
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
          value={email}
          onChange={handleEmailChange}
          required
        />
        <button
          type="submit"
          className="bg-red-800 text-white p-2 pl-2 pr-2 hover:bg-red-700"
          disabled={submitting} // Disable the button while submitting
        >
          {submitting ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
    </div>
  );
};

export default Subscribe;
