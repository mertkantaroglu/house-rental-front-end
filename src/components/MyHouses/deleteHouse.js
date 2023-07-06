/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchHouses } from '../../store/HousesSlice';
import { fetchReservations } from '../../store/ReservationsSlice';
import { loginUser } from '../../store/AuthenticationSlice';

const MyHouses = () => {
  const reservations = useSelector((state) => state.reservations.reservations);
  const data = useSelector((state) => state.houses);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteHouse = (async (houseId) => {
    const houseReservations = reservations.filter(
      (reservation) => reservation.house_id === houseId,
    );

    // Delete the associated reservations first
    await Promise.all(
      houseReservations.map((reservation) => axios.delete(
        `http://127.0.0.1:3000/api/v1/reservations/${reservation.id}`,
      )),
    );

    // Delete the house after reservations are deleted
    await axios.delete(`http://127.0.0.1:3000/api/v1/houses/${houseId}`);
    dispatch(fetchHouses());
  });

  useEffect(() => {
    dispatch(loginUser());
    dispatch(fetchHouses());
    dispatch(fetchReservations());
  }, [dispatch]);

  return (
    <div className="reservations-cont">
      <h3>My Houses</h3>
      <ul className="reservations-list">
        <li className="reservations-list-header">
          <span className="name">Name</span>
          {' '}
          <span className="delete">Delete</span>
        </li>

        {data.houses.map((house) => (
          <li key={house.id} className="reservations-item">
            <span
              onClick={() => navigate(`/houses/${house.house_id}`)}
              className="reservations-name"
            >
              {house.name}
            </span>
            <span type="button">
              <FaTrashAlt
                onClick={() => {
                  deleteHouse(house.id);
                }}
                className="delete-btn"
              />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyHouses;
