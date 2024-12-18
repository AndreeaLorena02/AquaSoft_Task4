import React, { useState } from 'react';
import api from './Api';
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log('SALUT');
      const response = await api.post('http://localhost:3000/users/login', {
        email,
        password,
      });
      localStorage.setItem('access_token', response.data.access_token);
      // console.log(localStorage.getItem('access_token'));
      // console.log(response.data.user);
      alert('Login successful!');
      navigate("/userMainPage");
    } catch (err) {
      console.error(err);
      alert('Error logging in.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}