import { FaBars, FaTimes } from 'react-icons/fa';
import React, { useRef } from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';
import logo from '../images/logo.png';

const Navbar = () => {
  const navRef = useRef();

  const showNavBar = () => {
    navRef.current.classList.toggle('responsive_nav');
  };

  return (
    <div className="header__navbar" ref={navRef}>
      <FaBars
        onClick={showNavBar}
        className="nav-btn nav-open-btn"
      />
      <nav className="navbar">
        <FaTimes
          className="nav-btn nav-close-btn"
          onClick={showNavBar}
        />

        <section className="logo-cont">
          <img className="navbar__title" src={logo} alt="our logo" />
        </section>
        <ul className="navbar__links">
          <li>
            <NavLink to="houses" activeClassName="active">
              Houses
            </NavLink>
          </li>
          <li>
            <NavLink to="reserve" activeClassName="active">
              Reserve
            </NavLink>
          </li>
          <li>
            <NavLink to="my-reservations" activeClassName="active">
              My Reservations
            </NavLink>
          </li>
          <li>
            <NavLink to="add" activeClassName="active">
              Add A House
            </NavLink>
          </li>
          <li>
            <NavLink to="delete" activeClassName="active">
              Delete A House
            </NavLink>
          </li>
        </ul>
        <h3 className="navbar__footer">
          HOUSE RENT APP
          {new Date().getFullYear()}
        </h3>
      </nav>
    </div>
  );
};

export default Navbar;
