import React, { useState } from 'react';
import API from '../api';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';


const Login = () => {
  const [formData, setFormData] = useState({ userName: '', password: '' });


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/login', formData);
      localStorage.setItem('token', data.token);
      toast.success('Login successful!');
  
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to Login");
    }
  };

  return (
<div className='App'>
     <form onSubmit={handleSubmit}>
      <h4>HEALTHOFIN INNOVATION</h4>
  <p>Login in to the dashboard</p>
  <div>
    <label>userName :</label>
      <input
        type="email"
        placeholder="Email"
        value={formData.userName}
        onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
        required
      />
      </div>
      <div>
        <label>Password :</label>
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      </div>
      <div>
      <NavLink  to="/signup"><button type="submit">New? Signup</button></NavLink>
      <button type="submit">Login Now</button>
      </div>
    </form>
    </div>
  );
};

export default Login;
