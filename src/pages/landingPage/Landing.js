import React from 'react';
import { Link } from 'react-router-dom';
import SignupForm from '../../components/Authentication/SignupForm';
import LoginForm from '../../components/Authentication/LoginForm';
import './LandingPage.css';

const LandingPage = () => (
  <div className="landing-page">
    <div className="landing-page-content">
      <LoginForm />
      <SignupForm />
      <h1 className="landing-page-title">Every house has the ability to inspire!</h1>
      <Link to="login" className="landing-page-btn">Get started</Link>
    </div>
  </div>
);

export default LandingPage;
