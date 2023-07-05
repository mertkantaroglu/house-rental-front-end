/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../store/AuthenticationSlice';
import './LoginForm.css';

const LoginForm = ({ toggleForm }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, error } = useSelector((state) => state.authentication);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ user: credentials })).then(() => {
      if (user) {
        navigate('/houses');
      }
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form className="login-form" onSubmit={handleLogin}>
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

      <button type="submit">Login</button>
      {error && <p>{error}</p>}
      <small className="prompt">
        Dont have an account?
        <span onClick={toggleForm}> Signup</span>
      </small>
    </form>
  );
};

export default LoginForm;
