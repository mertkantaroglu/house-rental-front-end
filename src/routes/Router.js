import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "../components/Homepage";
import HousePage from "../components/House";
import House from '../pages/House';

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Homepage />} />
    <Route path="/house" element={<HousePage />} />
    <Route path="/reservations" element={<House />} />
    <Route path="/delete" element={<House />} />
  </Routes>
);

export default AppRouter;
