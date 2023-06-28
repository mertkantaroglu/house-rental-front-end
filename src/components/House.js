import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHouse } from '../store/HouseSlice';

const HousePage = () => {
  const dispatch = useDispatch();
  const house = useSelector((state) => state.house);
  console.log(house);

  useEffect(() => {
    dispatch(fetchHouse());
  }, [dispatch]);

  return (
    <div>
      <h1>House</h1>
      <p>Name</p>
      <p>Address</p>
      <p>Price</p>
    </div>
  );
};

export default HousePage;
