"use client";

import { useContext, useState } from "react";
import axios from "axios";
import "./newsForm.css";
import { headers } from "@/next.config";
import { useSaveContext } from "@/contexts/saveContext";
import { UserContext } from "@/contexts/user-context";
const NewsForm = ({ toggleForm }) => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    url: "",
    description: "",
  });
  const { setNewStories } = useSaveContext();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Add state for submission status
  const { user } = useContext(UserContext);
  const baseUrl = process.env.NEXT_PUBLIC_BASEURL;

  const getToken = () => {
    // Get the authentication token from local storage
    return localStorage.getItem("token");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //check if user exist

    if (!user) {
      alert("Please log in to share your story.");
    }

    // Validate title and description
    if (!formData.title || !formData.description) {
      setErrorMessage("Title and description are mandatory");
      return;
    }

    // Set isSubmitting to true to indicate the submission is in progress
    setIsSubmitting(true);

    try {
      // Assuming you have a backend endpoint to handle the form data submission
      const response = await axios.post(`${baseUrl}/stories`, formData, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      // Handle success, maybe reset the form or do any necessary actions
      console.log("Form submitted successfully");
      setSuccessMessage("Story shared successfully");
      alert("Story successfully shared");
      setNewStories(true);
      toggleForm(); // Close the form after successful submission
    } catch (error) {
      // Handle error
      console.error("Error submitting form: ", error);
      setErrorMessage("Failed to submit. Please try again.");
    } finally {
      // Set isSubmitting back to false whether the submission was successful or not
      setIsSubmitting(false);
    }
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
            name="url"
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
            disabled={isSubmitting} // Disable the button when submitting
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsForm;
