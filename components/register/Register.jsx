"use client";

import { useState } from "react";
import axios from "axios";
import { FaGoogle, FaGithub, FaEye, FaEyeSlash } from "react-icons/fa";
import "./register.css";
import Link from "next/link";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // New state for loading indicator
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const baseUrl = process.env.NEXT_PUBLIC_BASEURL;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state on form submission

    try {
      const response = await axios.post(`${baseUrl}/users`, formData);
      console.log("Registration successful:", response.data);

      // Clear form and errors on successful registration
      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
      });
      setError(null);
      setSuccessMessage("Registration successful!");
      setLoading(false); // Reset loading state on success
    } catch (error) {
      console.error("Error during registration:", error);
      // Display error message to the user
      setError("Registration failed. Please try again.");
      setSuccessMessage(null);
      setLoading(false); // Reset loading state on error
    }
  };

  // Render welcome message and login button if registration is successful
  if (successMessage) {
    return (
      <div className="registration-success-container">
        <div className="suscess-content">
          {" "}
          <p className="registration-success-message">
            Welcome to the vibrant NewsFlow community! 🎉 We're thrilled to have
            you on board as a valued member. Your presence enriches our
            platform, and we look forward to sharing news, stories, and
            experiences together.
            <br />
            <br />
            Click the button below to log in and start exploring the diverse
            world of information, stories, and discussions awaiting you.
          </p>
          <div className="flex justify-center">
            {" "}
            <Link href="/login">
              <button className="login-button bg-red-800 text-white p-2 rounded-md mt-4">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="font-bold text-2xl md:text-2xl lg:text-4xl text-center pb-5">
          Register to NewsFlow
        </h2>
        <div className="form-group">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name:"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email:"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <div className="password-input-container flex items-center justify-center bg-white ">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password:"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {showPassword ? (
              <FaEyeSlash className="eye-icon" onClick={handleTogglePassword} />
            ) : (
              <FaEye className="eye-icon" onClick={handleTogglePassword} />
            )}
          </div>
        </div>
        <div className="form-group">
          {/* Disable the button while loading */}
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
        {error && <p className="error-message text-red-700">{error}</p>}
        {successMessage && (
          <p className="success-message text-green-600">{successMessage}</p>
        )}
        <div>
          <p className="text-center">
            Already have an account?{" "}
            <Link href="/login" className=" text-blue-500">
              SignIn
            </Link>
          </p>
        </div>
        <p className="advantages">
          By registering, you get the following advantages:
        </p>
        <ul className="advantages-list">
          <li>Save and bookmark your favorite news articles.</li>
          <li>
            Share your own stories and experiences with people around the world.
          </li>
          <li>
            Engage with the community by commenting, liking, and sharing
            articles.
          </li>
          <li>
            Option to register with Google or GitHub for a quick and seamless
            process.
          </li>
          <li>
            Forgot your password? No worries! You can request to update it.
          </li>
        </ul>
        <div className="social-login">
          <span>Register with:</span>
          <a href="#" className="google-icon" title="Login with Google">
            <FaGoogle />
          </a>
          <a href="#" className="github-icon" title="Login with GitHub">
            <FaGithub />
          </a>
        </div>
      </form>
    </div>
  );
};

export default Register;
