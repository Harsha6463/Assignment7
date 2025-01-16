import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/reset-password', { token, newPassword ,oldPassword });
      toast.success('Password reset successful!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error occurs while  resetting password');
    }
  };

  return (
    <div className='App'>
    <form onSubmit={handleSubmit}>
    <h4>HEALTHOFIN INNOVATION</h4>
    <p>Enter New password</p>
      <div>
        <label>Old Password :</label>
    <input
      type="password"
      placeholder="Old Password"
      value={oldPassword}
      onChange={(e) => setOldPassword(e.target.value)}
      required
    />
    </div>
    <div>
    <label>New Password :</label>
    <input
      type="password"
      placeholder="New Password"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
      required
    />
    </div>
    <div>
    <button type="submit">cancel</button>
    <button type="submit">Reset Password</button>
    </div>
  </form>
  </div>
  );
};

export default ResetPassword;
