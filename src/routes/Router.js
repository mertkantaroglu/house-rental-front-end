import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "../components/Homepage";
import HousePage from "../components/House";
import House from '../pages/House';

const AppRouter = () => (
  <Routes>
    <Route exact path="/" element={Homepage} />
    <Route exact path="/houses" element={HousePage} />
    <Route exact path="/reserve" element={<h1>Reserve House</h1>} />
    <Route exact path="/my-reservations" element={<h1>My Reservations</h1>} />
    <Route exact path="/add" element={House} />
    <Route exact path="/delete" element={<h1>Delete House</h1>} />
  </Routes>
);

export default AppRouter;
