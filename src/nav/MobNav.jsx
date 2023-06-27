import React, { useState } from 'react';
import './MobNav.css';
import { Link } from 'react-router-dom';

const MobNav = () => {

  const links = [
    { title: 'HOUSE', path: '/' },
    { title: 'MY HOUSES', path: '/houses' },
    { title: 'MY RESERVATION', path: '/reservations' },
    { title: 'ADD A HOUSE', path: '/addHouse' },
  ];
  const [show, setShow] = useState(false);
  return (
    <header className="MobNav">
      {/* <img width="48" height="48" src={logo2} alt="logo2" /> */}
      <button type="button" onClick={() => setShow(!show)}>
        <img width="48" height="48" src="https://img.icons8.com/glyph-neue/64/01013b/xbox-menu.png" alt="xbox-menu" />
      </button>
      {show
        && (
          <>
            <nav className="wrapper">
              <div className="img-links">
                {/* <img width="100" height="100" src=logo alt="logo" /> */}
                <ul>
                  {links.map((l) => (
                    <li key={l.title}>
                      <Link onClick={() => setShow(!show)} to={l.path}>{l.title}</Link>
                    </li>
                  ))}
                  <li key="logout"><button className="logout" type="button">LOGOUT</button></li>
                </ul>
              </div>
              <button type="button" onClick={() => setShow(!show)}>
                <img className="cross" width="48" height="48" src="https://img.icons8.com/material-sharp/48/ffffff/multiply-2.png" alt="multiply-2" />
              </button>
              <h6>&#169; HOUSE APP. 2023</h6>
            </nav>
          </>
        )}
    </header>
  );
};

export default MobNav;