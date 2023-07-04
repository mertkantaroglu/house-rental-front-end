/* eslint-disable react/prop-types */
import React from 'react';
import {
  Routes, Route, Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Homepage from '../components/Homepage';
import HousePage from '../components/House';
// import House from '../pages/House';
import Reserve from '../pages/Reserve/Reserve';
import LandingPage from '../pages/landingPage/Landing';
import ReservationsList from '../pages/ReservationsList';
import AddHouse from '../pages/AddHouse/AddHouse';

const AppRouter = () => {
  const ProtectedRoute = ({ children }) => {
    const user = useSelector((state) => state.authentication.user);
    console.log(user);

    if (!user) {
      return <Navigate to="/" replace />;
    }

    return children;
  };
  return (
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route
        path="/houses"
        element={(
          <ProtectedRoute>
            <Homepage />
          </ProtectedRoute>
      )}
      />
      <Route
        path="/houses/:id"
        element={(
          <ProtectedRoute>
            <HousePage />
          </ProtectedRoute>
      )}
      />
      <Route
        path="/reserve"
        element={(
          <ProtectedRoute>
            <h1>Reserve House</h1>
          </ProtectedRoute>
      )}
      />
      <Route
        path="/my-reservations"
        element={(
          <ProtectedRoute>
            <ReservationsList />
          </ProtectedRoute>
      )}
      />
      <Route
        path="/add"
        element={(
          <ProtectedRoute>
            <h1>Add House</h1>
          </ProtectedRoute>
      )}
      />
      <Route
        path="/delete"
        element={(
          <ProtectedRoute>
            <h1>Delete House</h1>
          </ProtectedRoute>
      )}
      />
      <Route
        path="/login"
        element={(
          <ProtectedRoute>
            <p>login page</p>
          </ProtectedRoute>
      )}
      />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
};

export default AppRouter;
