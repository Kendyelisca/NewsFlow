"use client";

import Link from "next/link";
import { AiFillBell } from "react-icons/ai";
import { AiFillSave } from "react-icons/ai";
import { FaPenToSquare } from "react-icons/fa6";
import { FaTimes, FaBars } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import "./navbar.css";
import { useContext, useState } from "react";
import { useNewsContext } from "@/contexts/newsContext";
import NewsForm from "../form/NewsForm";
import { UserContext } from "@/contexts/user-context";

const MyNavbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { isForm, toggleForm } = useNewsContext();
  const { user, logout } = useContext(UserContext);
  // Check if user is not null and has a username before logging it
  console.log("UserContext - User:", user?.username || "No username available");
  console.log("UserContext - Logout function:", logout); // Log logout function
  // Check if user is not null and has a username before accessing it
  const firstLetter = user?.username ? user.username[0].toUpperCase() : "";

  const toggleFormHandler = () => {
    toggleForm(); // Check if this function is being called
    toggleMenu();
  };
  // Function to toggle the menu
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="navbar-container">
        <nav>
          <ul>
            <li>
              <Link href="/">
                <p className="logo">NewsFlow</p>
              </Link>
            </li>
            <li className="bar"></li>
            <li>
              <Link href="/stories">
                <b>Stories</b>
              </Link>
            </li>
            <li>
              <Link href="/creator">
                <b>Creator</b>
              </Link>
            </li>
            <li>
              <Link href="/community">
                <b>Community</b>
              </Link>
            </li>
            <li>
              <Link href="/subscribe">
                <b>Subscribe</b>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="menu" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
        <div className="other">
          <b
            className="flex items-center gap-2 cursor-pointer"
            onClick={toggleFormHandler}
          >
            <FaPenToSquare />
            <p>write</p>
          </b>
          <b>
            <Link href="/saved_news">
              <AiFillSave />
            </Link>
          </b>
          <b>
            <a href="#suscribe">
              <AiFillBell />
            </a>
          </b>
          {user ? (
            <div className="avatar">
              <Link href="/user_account">
                <span>{firstLetter}</span>
              </Link>
            </div>
          ) : (
            <div className="avatar">
              <Link href="/login">
                <FaUser />
              </Link>
            </div>
          )}
        </div>

        {isMenuOpen && (
          <div className="menu-options">
            {user && (
              <li>
                <Link href="/user_account" className="font-bold">
                  {user.username}
                </Link>
              </li>
            )}
            <li>
              <Link href="/stories">Stories</Link>
            </li>
            <li>
              <Link href="/creator">Creator</Link>
            </li>
            <li>
              <Link href="/community">Community</Link>
            </li>
            <li>
              <Link href="/subscribe">Subscribe</Link>
            </li>
            <li>
              <a
                className="flex  gap-2 items-center cursor-pointer"
                onClick={toggleFormHandler}
              >
                <FaPenToSquare />
                Write
              </a>
            </li>
            <li>
              <Link href="/saved_news">
                <AiFillSave />
              </Link>
            </li>
            <li>
              <a href="#suscribe">
                <AiFillBell />
              </a>
            </li>
          </div>
        )}

        {isForm && <NewsForm toggleForm={toggleForm} />}
      </div>
    </>
  );
};

export default MyNavbar;
