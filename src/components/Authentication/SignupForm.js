/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signupUser } from '../../store/AuthenticationSlice';
import './SignupForm.css';

const SignupForm = ({ toggleForm }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, error } = useSelector((state) => state.authentication);
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(signupUser({ user: credentials })).then(() => {
      if (user) {
        navigate('/home');
      }
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form className="signup-form" onSubmit={handleSignup}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={credentials.name}
        onChange={handleInputChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={credentials.email}
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleInputChange}
      />
      <button type="submit">Signup</button>
      {error && <p>{error.message}</p>}
      <small className="prompt">
        Already have an account?
        <span onClick={toggleForm}> Signin</span>
      </small>
    </form>
  );
};

export default SignupForm;
