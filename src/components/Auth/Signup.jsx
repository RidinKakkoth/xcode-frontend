import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom'; // Using useNavigate for navigation
import { userSignUp } from '../../api/api'; // Assuming this API function handles user registration

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // For password confirmation
  const [error, setError] = useState('');  // For displaying error messages
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook to handle navigation

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Send signup data to the backend API
      const response = await userSignUp(name,email, password);
      console.log(response, "signup response");

      // // Dispatch login action to store user data and token in Redux store
      // dispatch(login({ user: response.user, token: response.token }));
      
      // // Optionally store the token or user data in localStorage
      // localStorage.setItem('user', JSON.stringify(response.data.user));
      // localStorage.setItem('token', response.data.token); // Store JWT token for authentication

      // Redirect to the login page after successful signup
      navigate('/login'); // Use navigate to redirect to the login page

    } catch (err) {
      setError('Failed to sign up. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSignUp} className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Sign Up</h2>
        
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="block p-2 mb-4 w-full border border-gray-300 rounded-md"
          />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="block p-2 mb-4 w-full border border-gray-300 rounded-md"
          />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="block p-2 mb-4 w-full border border-gray-300 rounded-md"
          />
        <input
          type="password"
          placeholder="Confirm Password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="block p-2 mb-4 w-full border border-gray-300 rounded-md"
          />
          {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error if any */}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
          Sign Up
        </button>

        <button
          type="button"
          onClick={() => navigate('/login')} // Redirect to login page
          className="mt-4 w-full bg-gray-300 text-gray-700 p-2 rounded-md"
        >
          Already have an account? Log In
        </button>
      </form>
    </div>
  );
};

export default SignUp;
