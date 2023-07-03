import { configureStore } from '@reduxjs/toolkit';
import houseReducer from './HouseSlice';
import housesReducer from './HousesSlice';
import reservationsReducer from './ReservationsSlice';

export default configureStore({
  reducer: {
    house: houseReducer,
    houses: housesReducer,
    reservations: reservationsReducer,
  },
});
