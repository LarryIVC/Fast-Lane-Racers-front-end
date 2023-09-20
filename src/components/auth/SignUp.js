import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { currentUser } from '../../redux/auth/currentUserSlice';
import './Auth.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isUser } = useSelector((state) => state.currentUser);

  useEffect(() => {
    if (isUser) {
      navigate('/');
    }
  }, [isUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    };
    try {
      const response = await axios.post('http://127.0.0.1:3000/signup', {
        user: formData,
      });
      toast.success(response.data.message);
      localStorage.setItem('token', response.headers.authorization);
      dispatch(currentUser());
    } catch (error) {
      setError(error.response.data.errors);
    }
  };

  return (
    <div className="login-main">
      <div className="login-background">
        <div className="inf-wrap">
          <h4 style={{ color: '#fff' }}>Journey Beyond</h4>
          <p style={{ color: '#fff' }}>Explore the new Ferrari lineup.</p>
          <Link to="/cars">Explore</Link>
        </div>
      </div>
      <div className="form-container">
        <p className="form-logo" style={{ color: '#fff' }}>Ferrari</p>
        <div className="form-wrapper">
          <h1 className="login-title" style={{ color: '#fff' }}>PLEASE SignUP</h1>
          <form onSubmit={handleSubmit} className="login-form">
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required="true" />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required="true" />
            <input type="password" minLength="6" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required="true" />
            <input type="password" placeholder="Password Confirmation" value={passwordConfirmation} minLength="6" onChange={(e) => setPasswordConfirmation(e.target.value)} required="true" />
            <p className="invalid-credentials" style={{ color: 'red' }}>{error}</p>
            <button type="submit">SignUp</button>
          </form>
          <div className="login-bottom">
            <p className="bottom-info" style={{ color: '#fff' }}>Already have an account?</p>
            <Link to="/login" className="link-to-signup" style={{ color: 'red' }}>LogIn</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
