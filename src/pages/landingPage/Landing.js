import React, { useState } from 'react';
import SignupForm from '../../components/Authentication/SignupForm';
import LoginForm from '../../components/Authentication/LoginForm';
import './LandingPage.css';

const LandingPage = () => {
  const [isGettingStarted, setIsGettingStarted] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const handleGtStarted = () => {
    setIsGettingStarted(!isGettingStarted);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="landing-page">
      <div className="landing-page-content">
        {
        isGettingStarted && (
        <>
          {
            isLogin ? <LoginForm toggleForm={toggleForm} /> : <SignupForm toggleForm={toggleForm} />
          }
        </>
        )
}
        {
        !isGettingStarted && (
          <>
            <h1 className="landing-page-title">Every house has the ability to inspire!</h1>
            <button type="button" to="login" onClick={handleGtStarted} className="landing-page-btn">Get started</button>
          </>
        )
      }
      </div>
    </div>
  );
};

export default LandingPage;
