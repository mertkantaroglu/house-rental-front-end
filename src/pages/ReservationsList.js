/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import './ReservationsList.css';

const reservations = [
  {
    id: 1,
    name: 'House 1',
    address: 'Address 1',
    startDate: '2021-09-01',
    endDate: '2021-09-10',
  },
  {
    id: 2,
    name: 'House 2',
    address: 'Address 2',
    startDate: '2021-09-01',
    endDate: '2021-09-10',
  },
  {
    id: 3,
    name: 'House 3',
    address: 'Address 3',
    startDate: '2020-09-05',
    endDate: '2020-09-10',
  },
];

const ReservationsList = () => {
  const navigate = useNavigate();

  const deleteReservation = (id) => {
    console.log(id);
  };

  return (
    <div className="reservations-cont">
      <h1>Reservations</h1>
      <ul className="reservations-list">
        {reservations.map((reservation) => (
          <li key={reservation.id} className="reservations-item">
            <span onClick={() => navigate(`/house/${reservation.id}`)} className="reservation-name">{reservation.name}</span>
            {' '}
            <span>
              {reservation.address}
              {' '}
              {reservation.startDate}
              {' '}
            </span>
            <span className="reservation-end-date">{reservation.endDate}</span>
            {' '}
            <span type="button">
              <FaTrashAlt className="delete-btn" />
              {' '}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationsList;
