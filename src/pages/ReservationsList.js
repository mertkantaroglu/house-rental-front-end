/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import './ReservationsList.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations } from '../store/ReservationsSlice';

const ReservationsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.reservations);

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  const deleteReservation = () => {
    // implement delete reservation
  };

  return (
    <div className="reservations-cont">
      <h3>Reservations</h3>
      <ul className="reservations-list">
        <li className="reservations-list-header">
          <span className="name">Name</span>
          {' '}
          <span className="address">Address</span>
          {' '}
          <span className="start-date">Start Date</span>
          {' '}
          <span className="end-date">End Date</span>
          {' '}
          <span className="delete">Delete</span>
        </li>

        {data.reservations.map((reservation) => (
          <li key={reservation.id} className="reservations-item">
            <span onClick={() => navigate(`/house/${reservation.id}`)} className="reservation-name">{reservation.name}</span>
            <span>{reservation.city}</span>
            <span className="reservation-start-date">{reservation.start_date}</span>
            <span className="reservation-end-date">{reservation.end_date}</span>
            <span type="button"><FaTrashAlt onClick={() => deleteReservation(reservation)} className="delete-btn" /></span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationsList;
