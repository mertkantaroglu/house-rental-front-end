import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchHouse } from '../store/HouseSlice'

const HousePage = () => {
  const dispatch = useDispatch()
  const house = useSelector((state) => state.house.house);
  console.log(house)

  useEffect(() => {
    dispatch(fetchHouse())
  }, [dispatch])

  return (
    <div>
      <h1>House Details</h1>
      <img src={house.image} alt={house.name}/>
      <p>Name: {house.name}</p>
      <p>Location: {house.location}</p>
      <p>Bedrooms: {house.bedrooms}</p>
      <p>Bathrooms: {house.bathrooms}</p>
      <p>Price: {house.price}</p>
    </div>
  )
}

export default HousePage;
