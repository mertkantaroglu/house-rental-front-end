import { configureStore } from '@reduxjs/toolkit';
import houseReducer from './HouseSlice';
import housesReducer from './HousesSlice';
import reservationsReducer from './ReservationsSlice';
import authReducer from './AuthenticationSlice';

export default configureStore({
  reducer: {
    house: houseReducer,
    houses: housesReducer,
    reservations: reservationsReducer,
    authentication: authReducer,
  },
});
