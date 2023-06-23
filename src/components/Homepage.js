import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHouses } from '../store/HousesSlice'

const Homepage = () => {
  const dispatch = useDispatch()
  const houses = useSelector((state) => state.houses)
  console.log(houses)

  useEffect(() => {
    dispatch(fetchHouses())
  },[dispatch])

  return (
    <div>
      <h1>Homepage</h1>
    </div>
  )
}

export default Homepage
