import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const Navbar = () => {

  const links = [
    { title: 'HOUSE', path: '/' },
    { title: 'MY HOUSES', path: '/houses' },
    { title: 'MY RESERVATION', path: '/reservations' },
    { title: 'ADD A HOUSE', path: '/addHouse' },
  ];

  return (
    <header className="Navbar">
      <nav>
        {/* <img width="130" height="130" src=logo alt="logo" /> */}
        <hr style={{ width: '100%' }} />
        <ul>
          {links.map((l) => <li key={l.title}><Link to={l.path}>{l.title}</Link></li>)}
          <li key="logout"><button className="logout" type="button">LOGOUT</button></li>
        </ul>
      </nav>
      <h6>&#169; HOUSE APP. 2023</h6>
    </header>
  );
};

export default Navbar;