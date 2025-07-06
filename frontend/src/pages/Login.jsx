import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from "react-toastify"

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        { email, password },
        { withCredentials: true }
      );

      console.log("Login successful", response.data);
      toast("Login successful")
      navigate("/"); // redirect to home
    } catch (error) {
      console.log("Login error:", error.response?.data || error.message);
      toast("Login error")
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <h1 className="text-2xl md:text-3xl font-semibold text-blue-500 mb-6 text-center">
        Login to Job Finder
      </h1>

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-6 rounded-xl shadow-md flex flex-col gap-4"
      >
        <div>
          <label htmlFor="email" className="block font-medium mb-1">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label htmlFor="password" className="block font-medium mb-1">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-gray-600">
        Don't have an account?{' '}
        <button
          onClick={() => navigate('/register')}
          className="text-blue-500 hover:underline"
        >
          Register
        </button>
      </p>
    </div>
  );
}

export default Login;
