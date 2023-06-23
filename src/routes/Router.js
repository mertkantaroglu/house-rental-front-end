import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Homepage from '../components/Homepage'
import HousePage from '../components/House'

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/house" element={<HousePage />} />
    </Routes>
  </Router>
)

export default AppRouter
