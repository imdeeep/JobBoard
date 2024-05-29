import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAuth } from '../context/authContext';

const Login = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email:string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
    console.log(Cookies.get('loginMethod'));
  };

  const handleManualLogin = async (e:any) => {
    e.preventDefault();
    setError('');

    // Client-side validation
    if (!validateEmail(email)) {
      setError('Invalid email address');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      if (response.data.token) {
        login(response.data.token);
        router.push('/');
      }
    } catch (err) {
      console.error('Error during manual login:', err);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="max-w-sm mx-auto my-8 bg-white p-6 rounded-xl shadow shadow-slate-300">
      <h1 className="text-3xl font-medium mb-1 flex justify-between items-center">Login 
      <Link href="/"><span className='text-blue-600 text-sm mr-5'>Home  <span>&#8592;</span></span></Link>
      </h1>
      <p className="text-slate-500">Hi, Welcome back 👋</p>

      <div className="my-4">
        <button 
          onClick={handleGoogleLogin} 
          className="w-full text-center py-2 my-2 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
        >
          <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-6 h-6" alt=""/> 
          <span>Login with Google</span>
        </button>
      </div>

      <form onSubmit={handleManualLogin} className="my-8">
        <div className="flex flex-col space-y-4">
          <label>
            <p className="font-medium text-slate-700 pb-2">Email address</p>
            <input 
              id="email" 
              name="email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" 
              placeholder="Enter email address" 
            />
          </label>

          <label>
            <p className="font-medium text-slate-700 pb-2">Password</p>
            <input 
              id="password" 
              name="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" 
              placeholder="Enter your password" 
            />
          </label>

          <div className="flex flex-row justify-between">
            <div></div>
            <div>
              <a href="#" className="font-medium text-[#037EE8]">Forgot Password?</a>
            </div>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}

          <button 
            type="submit"
            className="w-full py-2 font-medium text-white bg-[#037EE8] rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span>Login</span>
          </button>

          <p className="text-center">Not registered yet? <Link href="/signup" className="text-[#037EE8] font-medium inline-flex space-x-1 items-center"><span>Register now</span><span><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg></span></Link></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
