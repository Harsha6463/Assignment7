import React, { useState } from 'react';
import API from '../api';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [userName, setUserName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/forgot-password', { userName });
      toast.success('Password reset link sent to your email!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error during request');
    }
  };

  return (
    <div className='App'>
    <form onSubmit={handleSubmit}>
    <h4>HEALTHOFIN INNOVATION</h4>
    <p>Forgot Password</p>
    <div>
 <label>UserName :</label>
    <input
      type="text"
      placeholder="Email"
      value={userName}
      onChange={(e) => setUserName(e.target.value)}
      required
    />
    </div>
    <div>
    <button type="submit">cancel</button>
    <button type="submit"> Reset </button>
    </div>
  </form>
  </div>
  );
};

export default ForgotPassword;
