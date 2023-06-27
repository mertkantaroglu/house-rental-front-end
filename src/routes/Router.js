import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "../components/Homepage";
import HousePage from "../components/House";

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Homepage />} />
    <Route path="/house" element={<HousePage />} />
  </Routes>
);

export default AppRouter;
