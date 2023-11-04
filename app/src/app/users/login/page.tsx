'use client';
import React, { useState } from 'react';
import '../styles/forms.css';
import Link from 'next/link';
import axios from 'axios'; 

interface LoginProps {
  email: string; 
  password: string;
}

const Login: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (props: LoginProps) => {
    const res: {success: boolean} = await axios.post(process.env.LOGIN || '', 
    {  
      email: props.email
      ,password: props.password
    }); 
    if (res.success){
      
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
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

        <button type="button" onClick={() => {handleLogin({email, password})}}>
          Login
        </button>
      </form>
      <h5><Link href={'http://localhost:3000/users/signin'}>Don't have an account(signin)</Link></h5>
    </div>
  );
};

export default Login;