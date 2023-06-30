import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from '../components/Homepage';
import HousePage from '../components/House';
import ReservationsList from '../pages/ReservationsList';

const AppRouter = () => (
  <Routes>
    <Route exact path="/" element={<Homepage />} />
    <Route path="/houses" element={HousePage} />
    <Route path="/reserve" element={<ReservationsList />} />
    <Route path="/my-reservations" element={<ReservationsList />} />
    <Route path="/add" element={HousePage} />
    <Route path="/delete" element={<h1>Delete House jdjdjdjj</h1>} />
  </Routes>
);

export default AppRouter;
