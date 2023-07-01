import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from '../components/Homepage';
import HousePage from '../components/House';
// import House from '../pages/House';

const AppRouter = () => (
  <Routes>
    <Route exact path="/" element={<Homepage />} />
    <Route path="/houses/:id" element={<HousePage />} />
    <Route path="/reserve" element={<h1>Reserve House</h1>} />
    <Route path="/my-reservations" element={<h1>My Reservations</h1>} />
    <Route path="/add" element={HousePage} />
    <Route path="/delete" element={<h1>Delete House jdjdjdjj</h1>} />
  </Routes>
);

export default AppRouter;
