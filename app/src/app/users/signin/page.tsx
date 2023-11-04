'use client';
import React, { useState } from 'react';
import '../styles/forms.css';
import Link from 'next/link';

interface SigninProps {
  onSignin: (email: string, password: string) => void;
}

const Signin: React.FC<SigninProps> = ({ onSignin }) => {
  const [name, setName] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passconf, setPassconf] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handlePassconfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassconf(e.target.value);
  };

  const handleSignin = () => {
    onSignin(email, password);
  };

  return (
    <div className="login-container">
    <h2>Signin</h2>
    <form>
      <label htmlFor="name">Name:</label>
      <input
        type="name"
        id="name"
        value={name}
        onChange={handleNameChange}
        required
      />
      <label htmlFor="phonenumber">Phone number:</label>
      <input
        type="phonenumber"
        id="phonenumber"
        value={phonenumber}
        onChange={handlePhoneNumberChange}
        required
      />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={handleEmailChange}
        required
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={handlePasswordChange}
        required
      />
      <label htmlFor="passconf">Password Confirmation:</label>
      <input
        type="passconf"
        id="passconf"
        value={passconf}
        onChange={handlePassconfChange}
        required
      />

      <button type="button" onClick={handleSignin}>
        Signin
      </button>
    </form>
    <br />
    <h5><Link href={'http://localhost:3000/users/login'}>Already have an account(login)</Link></h5>
  </div>
  );
};

export default Signin;
