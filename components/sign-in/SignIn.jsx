"use client";

import React, { useState, useContext } from "react";
import axios from "axios";
import { FaGoogle, FaGithub } from "react-icons/fa";
import Link from "next/link";
import { UserContext } from "@/contexts/user-context";
import "./signIn.css";
const SignIn = () => {
  const { setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false); // New state for loading indicator
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginSuccess = (userData) => {
    localStorage.setItem("token", userData.token);
    setUser(userData.user);
    setFormData({
      email: "",
      password: "",
    });
    setError(null);
    setSuccessMessage("Login successful!");
    setLoading(false); // Reset loading state on success
    // router.push("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state on form submission

    try {
      const response = await axios.post(
        "https://newsflow-backend.onrender.com/users/login",
        formData
      );

      console.log("Login successful:", response.data);
      handleLoginSuccess(response.data);
    } catch (error) {
      console.error("Error during login:", error);
      setError("Invalid credentials. Please try again.");
      setSuccessMessage(null);
      setLoading(false); // Reset loading state on error
    }
  };

  return (
    <div className="master-container">
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="font-bold text-2xl md:text-2xl lg:text-4xl text-center pb-5">
            Welcome back!
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
            {/* Disable the button while loading */}
            <button type="submit" disabled={loading}>
              {loading ? "Signing In..." : "SignIn"}
            </button>
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
