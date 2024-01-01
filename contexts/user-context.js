"use client";

import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check if localStorage is available
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const storedToken = JSON.parse(localStorage.getItem("token"));
      setUser(storedUser);
      setToken(storedToken);
      console.log(storedToken);
    }
  }, []);

  const SaveUser = (user) => {
    setUser(user);
    // Check if localStorage is available
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

  const logout = () => {
    // Clear the user data and token
    setUser(null);

    // Check if localStorage is available
    if (typeof window !== "undefined") {
      // Remove the user data
      localStorage.removeItem("user");
      // Remove the token
      localStorage.removeItem("token");
    }
  };

  const SaveToken = (token) => {
    setToken(token);
    console.log("user token context:", token);
    if (typeof window !== "undefined") {
      // Check if localStorage is available
      localStorage.setItem(
        "token",
        typeof token === "string" ? token : JSON.stringify(token)
      );
    }
  };

  return (
    <UserContext.Provider value={{ user, SaveUser, SaveToken, token, logout }}>
      {children}
    </UserContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
