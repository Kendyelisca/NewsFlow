"use client";

import { useState } from "react";
import axios from "axios";
import { useNewsContext } from "@/contexts/newsContext";
import "./newsForm.css";

const NewsForm = ({ toggleForm }) => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    link: "", // Changed from formData.url to formData.link
    description: "",
    timestamp: new Date().toISOString(),
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate title and description
    if (!formData.title || !formData.description) {
      setErrorMessage("Title and description are mandatory");
      return;
    }

    // Assuming you have a backend endpoint to handle the form data submission
    axios
      .post("your-backend-api-endpoint", formData)
      .then((response) => {
        // Handle success, maybe reset the form or do any necessary actions
        console.log("Form submitted successfully");
        setSuccessMessage("Story shared successfully");
        toggleForm(); // Close the form after successful submission
      })
      .catch((error) => {
        // Handle error
        console.error("Error submitting form: ", error);
        setErrorMessage("Error sharing the story. Please try again.");
      });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content story-container">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-3xl md:text-3xl lg:text-4xl pb-8">
            Share your story
          </h2>
          <button
            className="font-bold text-3xl md:text-3xl lg:text-4xl pb-8 text-red-800"
            onClick={toggleForm}
          >
            x
          </button>
        </div>

        {successMessage && <p className="text-green-600">{successMessage}</p>}
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}

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
            placeholder="Image URL(optional):"
            value={formData.image}
            onChange={handleInputChange}
          />

          <input
            type="text"
            name="link"
            placeholder="Link(optional):"
            value={formData.link}
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
    </div>
  );
};

export default NewsForm;
