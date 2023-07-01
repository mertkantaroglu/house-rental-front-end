/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GrCaretNext, GrCaretPrevious } from 'react-icons/gr';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { fetchHouses } from '../store/HousesSlice';
import './Home.css';

const Homepage = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.houses);
  const containerRef = useRef(null);

  const handleScroll = (scrollOffset) => {
    containerRef.current.scrollLeft += scrollOffset;
  };

  useEffect(() => {
    dispatch(fetchHouses());
  }, [dispatch]);

  return (
    <div className="houses-container">
      <div className="heading">
        <h3>Our Houses</h3>
        <small>Select a house to see more details</small>
      </div>
      <div className="scroll-buttons">
        <button
          type="button"
          className="left-btn"
          onClick={() => handleScroll(-200)}
        >
          {' '}
          <GrCaretPrevious color="white" size={20} />
          {' '}
        </button>
        <button
          type="button"
          className="right-btn"
          onClick={() => handleScroll(200)}
        >
          {' '}
          <GrCaretNext color="white" size={20} />
          {' '}
        </button>
      </div>
      <section className="houses-list">
        <div className="horizontal-screen-view">
          <div className="house-container" ref={containerRef}>
            {data.houses.map((house) => (
              <HouseCard house={house} key={house.id} />
            ))}
          </div>
        </div>
        {' '}
      </section>
    </div>
  );
};

export default Homepage;

const HouseCard = ({ house }) => {
  const navigate = useNavigate();

  const handleHouseClick = () => {
    navigate(`/houses/${house.id}`);
  };

  return (
    <div key={house.id} className="house">
      <section onClick={handleHouseClick} className="house-image-container">
        <img src={house.image} alt={house.name} className="house-image" />
      </section>
      <h4 onClick={handleHouseClick} className="house-name">
        {house.name}
      </h4>
      <div className="divider" />
      <p>{house.address}</p>
      <section className="socials">
        <div className="social-icon">
          <FaTwitter />
        </div>
        <div className="social-icon">
          <FaFacebookF />
        </div>
        <div className="social-icon">
          <FaInstagram />
        </div>
      </section>
    </div>
  );
};
