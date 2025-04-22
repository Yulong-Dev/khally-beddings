// src/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import sha256 from 'js-sha256';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showReset, setShowReset] = useState(false);
  const [message, setMessage] = useState('');

  const handleVerifyUser = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.find(user => user.email === email);
    if (userExists) {
      setShowReset(true);
      setMessage('');
    } else {
      setMessage('User not found');
    }
  };

  const handleResetPassword = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(user =>
      user.email === email
        ? { ...user, password: sha256(newPassword) }
        : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setMessage('Password updated successfully!');
    setShowReset(false);
    setEmail('');
    setNewPassword('');
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>

      {!showReset ? (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button onClick={handleVerifyUser}>Verify Email</button>
        </>
      ) : (
        <>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
          <button onClick={handleResetPassword}>Reset Password</button>
        </>
      )}

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ForgotPassword;
