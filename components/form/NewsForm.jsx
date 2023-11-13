"use client";

import React, { useState } from "react";
import axios from "axios";
import { useNewsContext } from "@/contexts/newsContext";
import "./newsForm.css";
const NewsForm = () => {
  const { toggleForm } = useNewsContext(); // Assuming toggleForm is part of your NewsContext
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    url: "",
    description: "",
    timestamp: new Date().toISOString(),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Assuming you have a backend endpoint to handle the form data submission
    axios
      .post("your-backend-api-endpoint", formData)
      .then((response) => {
        // Handle success, maybe reset the form or do any necessary actions
        console.log("Form submitted successfully");
        toggleForm(); // Close the form after successful submission
      })
      .catch((error) => {
        // Handle error
        console.error("Error submitting form: ", error);
      });
  };

  return (
    <div className="story-container">
      <h2 className="font-bold text-3xl md:text-3xl lg:text-4xl pb-8">
        Share your story
      </h2>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          name="title"
          placeholder="Title:"
          value={formData.title}
          onChange={handleInputChange}
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL:"
          value={formData.image}
          onChange={handleInputChange}
        />

        <input
          type="text"
          name="link"
          placeholder="Link(optional):"
          value={formData.url}
          onChange={handleInputChange}
        />

        <textarea
          name="description"
          placeholder="Description:"
          value={formData.description}
          onChange={handleInputChange}
        />

        <button
          type="submit"
          className="bg-red-800 p-2 rounded-xl text-white hover:bg-red-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewsForm;
