import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from '../components/Homepage';
import HousePage from '../components/House';
// import House from '../pages/House';
import Reserve from '../pages/Reserve/Reserve';
import LandingPage from '../pages/landingPage/Landing';
import ReservationsList from '../pages/ReservationsList';


const AppRouter = () => (
  <Routes>
    <Route exact path="/" element={<LandingPage />} />
    <Route path="/houses" element={<Homepage />} />
    <Route path="/houses/:id" element={<HousePage />} />
    <Route path="/reserve" element={<Reserve />} />
    <Route path="/my-reservations" element={<ReservationsList />} />
    <Route path="/add" element={HousePage} />
    <Route path="/delete" element={<h1>Delete House jdjdjdjj</h1>} />
    <Route path="/login" element={<p>login page</p>} />
  </Routes>
);

export default AppRouter;
