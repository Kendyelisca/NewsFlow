"use client";

import Link from "next/link";
import { AiFillBell } from "react-icons/ai";
import { AiFillSave } from "react-icons/ai";
import { FaPenToSquare } from "react-icons/fa6";
import { FaTimes, FaBars } from "react-icons/fa";
import "./navbar.css";
import { useState } from "react";
const MyNavbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

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
              <Link href="/home">
                <b>Stories</b>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <b>Creator</b>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <b>Community</b>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <b>Subscribe</b>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="menu" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
        <div className="other">
          <b>
            <FaPenToSquare />
          </b>
          <b>
            <AiFillSave />
          </b>
          <b>
            <AiFillBell />
          </b>
        </div>

        {isMenuOpen && (
          <div className="menu-options">
            {" "}
            <li>
              <Link href="/aboutus">Stories</Link>
            </li>
            <li>
              <Link href="/services">Creator</Link>
            </li>
            <li>
              <Link href="/contact">Community</Link>
            </li>
            <li>
              <Link href="/login">Subscribe</Link>
            </li>
            <li>
              <Link href="/login" className="flex  gap-2 items-center">
                <FaPenToSquare />
                Write
              </Link>
            </li>
            <li>
              <Link href="/login">
                <AiFillSave />
              </Link>
            </li>
            <li>
              <Link href="/login">
                <AiFillBell />
              </Link>
            </li>
          </div>
        )}
      </div>
    </>
  );
};

export default MyNavbar;
