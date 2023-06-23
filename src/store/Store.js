import { configureStore } from '@reduxjs/toolkit';
import houseReducer from './HouseSlice';

export default configureStore({
  reducer: {
    house: houseReducer,
  },
});
