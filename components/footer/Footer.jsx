import "./footer.css";
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

const Myfooter = () => {
  return (
    <>
      <div className="container-bottom">
        <div className="options">
          <b>Sport</b>
          <p>Football</p>
          <p>Basketball</p>
          <p>Tennis</p>
          <p>Golf</p>
          <p>Swim</p>
        </div>
        <div className="options">
          <b>Politics</b>
          <p>Government</p>
          <p>President</p>
          <p>DPR</p>
          <p>Patrai</p>
          <p>Democrat</p>
        </div>
        <div className="options">
          <b>Health</b>
          <p>Covid-19</p>
          <p>Cough</p>
          <p>Dizzy</p>
          <p>Sprain</p>
          <p>Typhus</p>
        </div>
        <div className="options">
          <b>Environment</b>
          <p>River</p>
          <p>Sea</p>
          <p>Mainland</p>
          <p>Mountains</p>
          <p>Ricefield</p>
        </div>
        <div className="options">
          <b>Business</b>
          <p>Start Up</p>
          <p>Agency</p>
          <p>Market</p>
          <p>Ecommerce</p>
          <p>Creative</p>
        </div>
        <div className="options">
          <b>Education</b>
          <p>UIUX</p>
          <p>Test</p>
          <p>SNBP</p>
          <p>University</p>
          <p>School</p>
        </div>
      </div>
      <footer className="footer-container">
        <div className="footer-content">
          <div className="footer-text">
            <p className="text-2xl font-extralight">
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
