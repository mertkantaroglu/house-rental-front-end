/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchHouses } from '../../store/HousesSlice';
import { fetchReservations } from '../../store/ReservationsSlice';
import { loginUser } from '../../store/AuthenticationSlice';
import './deleteHouse.css';

const MyHouses = () => {
  const reservations = useSelector((state) => state.reservations.reservations);
  const data = useSelector((state) => state.houses);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteHouse = async (houseId) => {
    const houseReservations = reservations.filter(
      (reservation) => reservation.house_id === houseId,
    );

    // Delete the associated reservations first
    await Promise.all(
      houseReservations.map((reservation) => axios.delete(
        `https://house-rental-app.onrender.com/api/v1/reservations/${reservation.id}`,
      )),
    );

    // Delete the house after reservations are deleted
    await axios.delete(`https://house-rental-app.onrender.com/api/v1/houses/${houseId}`);
    dispatch(fetchHouses());
  };

  useEffect(() => {
    dispatch(loginUser());
    dispatch(fetchHouses());
    dispatch(fetchReservations());
  }, [dispatch]);

  return (
    <div className="reservations-cont">
      <h1>My Houses</h1>
      <div className="reservations-list">
        {data.houses.map((house) => (
          <div key={house.id} className="reservations-item">
            <span
              onClick={() => navigate(`/houses/${house.id}`)} // Updated line
              className="houses-name"
            >
              {house ? house.name : ''}
            </span>
            {house && <img className="reservation-image" src={house.image} alt={house.name} />}
            <button
              type="button"
              className="delete-btn"
              onClick={() => deleteHouse(house.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHouses;
