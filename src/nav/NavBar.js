import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Our Houses</Link>
      </li>
      <li>
        <Link to="/house">House</Link>
      </li>
    </ul>
  </nav>
);

export default NavBar;
