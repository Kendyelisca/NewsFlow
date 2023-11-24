"use client";

import React, { useState } from "react";
import axios from "axios";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { useRouter } from "next/router";
import "./signIn.css";
import Link from "next/link";

const SignIn = () => {
  //const router = useRouter(); // Use the useRouter hook

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://newsflow-backend.onrender.com/users/login",
        formData
      );

      console.log("Login successful:", response.data);

      // Clear form and errors on successful login
      setFormData({
        email: "",
        password: "",
      });
      setError(null);
      setSuccessMessage("Login successful!");

      // Redirect to home or perform any other navigation
      //router.push("/"); // Use the push method from useRouter
    } catch (error) {
      console.error("Error during login:", error);

      // Display error message to the user
      setError("Invalid credentials. Please try again.");
      setSuccessMessage(null);
    }
  };
  return (
    <div className="master-container">
      {" "}
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="font-bold text-2xl md:text-2xl lg:text-4xl text-center pb-5">
            SignIn to NewsFlow
          </h2>
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
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password:"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit">SignIn</button>
          </div>

          {error && <p className="error-message text-red-700">{error}</p>}
          {successMessage && (
            <p className="success-message text-green-600">{successMessage}</p>
          )}
          <div>
            <p className="text-center">
              Don't have an account?{" "}
              <Link href="/subscribe" className=" text-blue-500">
                SignUp
              </Link>
            </p>
          </div>
          <div className="social-login">
            <span>SignIn with:</span>
            <a href="#" className="google-icon" title="Login with Google">
              <FaGoogle />
            </a>
            <a href="#" className="github-icon" title="Login with GitHub">
              <FaGithub />
            </a>
          </div>
          <div className="forgot-password">
            <a href="#" title="Forgot Password">
              Forgot your password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
