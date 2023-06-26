import React, { useState } from "react";
import { Link } from "react-router-dom";
import Hamburger from "../assets/hamburg";
import CloseBtn from "../assets/CloseBtn";
import "./NavBar.css";

const NavBar = () => {
  const [isListShown, setIsListShown] = useState(false);

  const closeList = () => {
    document.querySelector(".nav-list").classList.remove("visible");
    setIsListShown(false);
  }

  const showList = () => {
    document.querySelector(".nav-list").classList.add("visible");
    setIsListShown(true);
  }

  return (
    <nav className="nav-container">
      <div className="nav-icons">
        <h1>Royalty Houses</h1>
        <section className='toggled-btns'>
          {isListShown ? (
            <CloseBtn onClick={closeList} />
          ) : (
            <Hamburger onClick={showList} />
          )}
        </section>
      </div>
        <ul className='nav-list'>
          <li>
            <Link className="nav-link" to="/">Our Houses</Link>
          </li>
          <li>
            <Link className="nav-link" to="/house">House</Link>
          </li>
        </ul>
    </nav>
  );
};

export default NavBar;
