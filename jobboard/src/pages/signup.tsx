import Link from 'next/link';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Signup = () => {
  const [userType, setUserType] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const validateEmail = (email:string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSignup = async (e:any) => {
    e.preventDefault();
    setError('');

    if (!userType) {
      setError('User type is required');
      return;
    }
    if (!name) {
      setError('Name is required');
      return;
    }
    if (!validateEmail(email)) {
      setError('Invalid email address');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        userType,
        name,
        email,
        password,
      });
      alert('User successfully registered!');
      router.push('/login');
    } catch (error:any) {
      if (error.response && error.response.data && error.response.data.msg) {
        setError(error.response.data.msg);
      } else {
        console.error('Error during signup:', error);
        setError('Error during signup. Please try again.');
      }
    }
  };

  const handleGoogleSignup = async () => {
    try {
      window.location.href = 'http://localhost:5000/auth/google';
    } catch (error) {
      console.error('Error during Google signup:', error);
      setError('Error during Google signup. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 bg-white p-4 rounded-xl shadow shadow-slate-300 sm:p-8">
      <h1 className="text-2xl font-medium mb-1 sm:text-3xl flex justify-between items-center">Signup
      <Link href="/"><span className='text-blue-600 text-sm mr-5'>Home  <span>&#8592;</span></span></Link>
      </h1>
      <p className="text-slate-500 mb-6">Hi, Welcome back 👋</p>

      <label>
        <p className="font-medium text-slate-700 pb-2">User Type</p>
        <select
          id="userType"
          name="userType"
          className="w-full py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="" disabled>
            Select user type
          </option>
          <option value="Employer">Employer</option>
          <option value="Candidate">Candidate</option>
        </select>
      </label>

      {userType === 'Candidate' && (
        <div className="my-5">
          <button
            className="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
            onClick={handleGoogleSignup}
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              className="w-6 h-6"
              alt=""
            />
            <span>Signup with Google</span>
          </button>
        </div>
      )}

      <form className="my-4" onSubmit={handleSignup}>
        <div className="flex flex-col space-y-4">
          <label>
            <p className="font-medium text-slate-700 pb-2">Name</p>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label>
            <p className="font-medium text-slate-700 pb-2">Email address</p>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            <p className="font-medium text-slate-700 pb-2">Password</p>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <label>
            <p className="font-medium text-slate-700 pb-2">Confirm Password</p>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="w-full py-2 border border-slate -200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Reenter the password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          {error && <p className="text-red-500 text-center">{error}</p>}

          <button className="w-full py-3 font-medium text-white bg-[#037EE8] rounded-lg hover:shadow inline-flex space-x-2 items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
            <span>Signup</span>
          </button>
        </div>
      </form>

      <p className="text-center">
        Already registered?{' '}
        <Link
          href="/login"
          className="text-[#037EE8] font-medium inline-flex space-x-1 items-center"
        >
          <span>Login</span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </span>
        </Link>
      </p>
    </div>
  );
};

export default Signup;
