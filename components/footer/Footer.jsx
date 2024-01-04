// Myfooter.jsx
import React from "react";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaEnvelope,
} from "react-icons/fa";
import classNames from "classnames";
import "./footer.css";

const FooterOption = ({ title, options }) => (
  <div className="options">
    <b>{title}</b>
    {options.map((option, index) => (
      <p key={index}>{option}</p>
    ))}
  </div>
);

const Myfooter = () => {
  return (
    <>
      <div className="container-bottom">
        <FooterOption
          title="Sport"
          options={["Football", "Basketball", "Tennis", "Golf", "Swim"]}
        />
        <FooterOption
          title="Politics"
          options={["Government", "President", "DPR", "Patrai", "Democrat"]}
        />
        <FooterOption
          title="Health"
          options={["Covid-19", "Cough", "Dizzy", "Sprain", "Typhus"]}
        />
        <FooterOption
          title="Environment"
          options={["River", "Sea", "Mainland", "Mountains", "Ricefield"]}
        />
        <FooterOption
          title="Business"
          options={["Start Up", "Agency", "Market", "Ecommerce", "Creative"]}
        />
        <FooterOption
          title="Education"
          options={["UIUX", "Test", "SNBP", "University", "School"]}
        />
      </div>
      <footer className="footer-container">
        <div className="footer-content">
          <div className="footer-text">
            <p className="font-extralight">
              Welcome to NewsFlow, your premier destination for staying abreast
              of the latest news and updates across various domains. Our
              dedicated team curates insightful and reliable news articles to
              keep you well-informed.
            </p>
            <p className="font-extralight">
              Founded in 2023 by Kendy Elisca, NewsFlow is committed to
              delivering high-quality, unbiased content to our readers. As we
              strive for excellence, we appreciate your trust in our platform.
            </p>
            <p className="font-extralight">
              For inquiries, partnerships, or feedback, please feel free to
              reach out to us at{" "}
              <a href="mailto:newsflow02@gmail.com">newsflow02@gmail.com</a>.
            </p>
            <p className="font-bold">
              &copy; 2023 NewsFlow. All rights reserved. Created by Kendy
              Elisca.
            </p>
          </div>

          <div className="divider"></div>
          <div className="social-icons">
            <a
              href="https://wa.me/+50936222737"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className={classNames("icon", "whatsapp")} />
            </a>
            <a
              href="https://www.instagram.com/kendyelisca5"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className={classNames("icon", "instagram")} />
            </a>
            <a
              href="https://web.facebook.com/kendy.elisca.1/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className={classNames("icon", "facebook")} />
            </a>
            <a
              href="https://www.linkedin.com/in/kendy-elisca-829339205/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className={classNames("icon", "linkedin")} />
            </a>
            <a
              href="https://twitter.com/EliscaKendy"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className={classNames("icon", "twitter")} />
            </a>
            <a
              href="https://github.com/Kendyelisca"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className={classNames("icon", "github")} />
            </a>
            <a
              href="mailto:newsflow02@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaEnvelope className={classNames("icon", "email")} />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Myfooter;
