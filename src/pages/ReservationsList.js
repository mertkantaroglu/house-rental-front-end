/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations } from '../store/ReservationsSlice';
import { fetchHouses } from '../store/HousesSlice';
import './ReservationsList.css';

const ReservationsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.reservations);
  const houses = useSelector((state) => state.houses);

  const deleteReservation = (async (reservationId) => {
    await axios.delete(
      `http://127.0.0.1:3000/api/v1/reservations/${reservationId}`,
    );
    dispatch(fetchReservations());
  });

  const getHouse = (houseId) => houses.houses.find((house) => house.id === houseId);

  useEffect(() => {
    dispatch(fetchHouses());
    dispatch(fetchReservations());
  }, [dispatch]);

  return (
    <div className="reservations-cont">
      <h1>My Reservations</h1>
      <div className="reservations-list">
        {data.reservations.map((reservation) => {
          const house = getHouse(reservation.house_id);
          return (
            <div key={reservation.id} className="reservations-item">
              <span
                onClick={() => navigate(`/houses/${reservation.house_id}`)}
                className="reservation-name"
              >
                {house ? house.name : ''}
              </span>
              {house && <img className="reservation-image" src={house.image} alt={house.name} />}
              <span className="reservation-location">{reservation.city}</span>
              <span className="reservation-start-date">{reservation.start_date}</span>
              <span className="reservation-end-date">{reservation.end_date}</span>
              <button type="button" className="delete-btn" onClick={() => deleteReservation(reservation.id)}>
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReservationsList;
