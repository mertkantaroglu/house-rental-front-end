import { configureStore } from '@reduxjs/toolkit';
import houseReducer from './HouseSlice';
import housesReducer from './HousesSlice';

export default configureStore({
  reducer: {
    house: houseReducer,
    houses: housesReducer,
  },
});
