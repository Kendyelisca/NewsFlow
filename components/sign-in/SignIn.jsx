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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [existingUser, setExistingUser] = useState(false);

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
    setLoading(false);

    // Check if the user already exists
    setExistingUser(userData.user && userData.user.existingUser);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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
      setLoading(false);
    }
  };

  return (
    <div className="master-container">
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="font-bold text-2xl md:text-2xl lg:text-4xl text-center pb-5">
            Welcome back!
          </h2>

          {successMessage && !existingUser && (
            <>
              <p className="success-message text-green-600">{successMessage}</p>
              <p className="existing-user-message">
                Welcome back! As an existing user, you continue to enjoy an
                enhanced experience on our platform. Feel free to share stories,
                join communities, and interact with other users' content. Click
                the 'Home' button to proceed.
                <br />
                <div className="flex justify-center ">
                  <Link href="/">
                    <button className="home-button bg-red-800 text-white p-2 rounded-md mt-2">
                      Home
                    </button>
                  </Link>
                </div>
              </p>
            </>
          )}

          {!successMessage && !existingUser && (
            <>
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
                <button type="submit" disabled={loading}>
                  {loading ? "Signing In..." : "SignIn"}
                </button>
              </div>
            </>
          )}

          {error && <p className="error-message text-red-700">{error}</p>}

          {!successMessage && !existingUser && (
            <div>
              <p className="text-center">
                Don't have an account?{" "}
                <Link href="/subscribe" className="text-blue-500">
                  SignUp
                </Link>
              </p>
            </div>
          )}

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
