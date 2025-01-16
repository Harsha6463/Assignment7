import React, { useState } from 'react';
import API from '../api';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ userName: '',  password: '' });

  const handleSubmit = async (data) => {
    
    try {
      await API.post('/signup', formData);
      toast.success('Registration successful!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error during registration');
    }
  };

  return (
    <div className='App'>
    <form onSubmit={handleSubmit}>
    <h4>HEALTHOFIN INNOVATION</h4>
    <p>Register</p>
    <div>
      <label>userName :</label>
      <input
        type="text"
        placeholder="Name"
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
      /></div>
      <div>
      <button type="submit">Register</button>
      <NavLink  to="/"><button type="submit">Login Now</button></NavLink>
      </div>
    </form>
    </div>
  );
};

export default Register;
