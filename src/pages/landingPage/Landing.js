import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => (
  <div className="landing-page">
    <div className="landing-page-content">
      <h1 className="landing-page-title">Every house has the ability to inspire!</h1>
      <Link to="login" className="landing-page-btn">Get started</Link>
    </div>
  </div>
);

export default LandingPage;
