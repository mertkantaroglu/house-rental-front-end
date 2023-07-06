import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Hamburger from '../assets/hamburg';
import CloseBtn from '../assets/CloseBtn';
import logo from '../images/logo.png';
import './NavBar.css';
import { logoutUser } from '../store/AuthenticationSlice';

const NavBar = () => {
  const [isListShown, setIsListShown] = useState(false);
  const dispatch = useDispatch();

  const closeList = () => {
    document.querySelector('.nav-list').classList.remove('visible');
    setIsListShown(false);
  };

  const showList = () => {
    document.querySelector('.nav-list').classList.add('visible');
    setIsListShown(true);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <nav className="nav-container">
      <div className="nav-icons">
        <section className="logo-cont">
          <img className="logo" src={logo} alt="our logo" />
        </section>
        <section className="toggled-btns">
          {isListShown ? (
            <CloseBtn onClick={closeList} />
          ) : (
            <Hamburger onClick={showList} />
          )}
        </section>
      </div>
      <ul className="nav-list">
        <li>
          <Link className="nav-link" to="/houses">
            Houses
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/reserve">
            Reserve
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/my-reservations">
            My Reservations
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/add">
            Add House
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/delete">
            Delete House
          </Link>
        </li>
        <li>
          <button type="button" onClick={handleLogout} className="signout-btn">
            <FaUserCircle className="btn-logo" />
            Log Out
          </button>
        </li>
      </ul>

      <h3 className="navbar-footer">
        HOUSE RENT APP
        {new Date().getFullYear()}
      </h3>
    </nav>
  );
};

export default NavBar;
