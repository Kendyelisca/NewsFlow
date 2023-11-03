import Link from "next/link";
import "./navbar.css";
const MyNavbar = () => {
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
        <div className="other">
          <b>mark</b>
          <b>bell</b>
          <b>other</b>
        </div>
      </div>
    </>
  );
};

export default MyNavbar;
