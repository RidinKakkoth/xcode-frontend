import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom'; // Using useNavigate instead of useHistory
import { userLogin } from '../../api/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  // For displaying error messages
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook to handle navigation

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send login data to the backend API
      const response = await userLogin(email, password);
      console.log(response, "login response");
      
      dispatch(login({ user: response.user, token: response.token }));
      
      // Optionally store the token or user data in localStorage
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.token); // Store JWT token for authentication
      
      // Redirect to the homepage or dashboard after login
      navigate('/dashboard'); // Use navigate to redirect to dashboard

    } catch (err) {
      setError('Invalid email or password');  // Handle error if login fails
      console.error(err);
    }
  };

  const handleSignupRedirect = () => {
    // Redirect to signup page
    navigate('/signup');  // Change this to the correct route for your signup page
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error if any */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block p-2 mb-4 w-full border border-gray-300 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block p-2 mb-4 w-full border border-gray-300 rounded-md"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
          Login
        </button>

        {/* Sign Up Button */}
        <button
          type="button"
          onClick={handleSignupRedirect}
          className="mt-4 w-full bg-gray-300 text-gray-700 p-2 rounded-md"
        >
          Don't have an account? Sign Up
        </button>
      </form>
    </div>
  );
};

export default Login;
