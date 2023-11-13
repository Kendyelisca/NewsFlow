"use client";

import { useState } from "react";
import "./suscribe.css";

const Subscribe = () => {
  const [email, setEmail] = useState(""); // State to store the email input value

  const handleEmailChange = (event) => {
    setEmail(event.target.value); // Update the email state when input changes
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the page from reloading on form submission

    // Here, add the logic to store the email value (e.g., send it to a server or save it to local storage)
    console.log("Email submitted:", email);

    // Clear the email input after submission
    setEmail("");
  };

  return (
    <div className="sus-container" id="suscribe">
      <b className="font-bold text-red-800">NewsFlow</b>
      <p className="font-bold">
        Let's subscribe so you don't miss the latest updates
      </p>
      <form className="sub-form pt-4" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Your email"
          className="p-2 pr-24"
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
