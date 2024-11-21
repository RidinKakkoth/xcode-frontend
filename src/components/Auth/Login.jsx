import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom'; 
import { userLogin } from '../../api/api';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await userLogin(email, password);
      console.log(response)
      if(response.success){

        dispatch(login({ user: response.user, token: response.token }));
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        navigate('/'); 
      }
      else{
        toast.error(response.message)
      }

    } catch (err) {
      setError('Invalid email or password'); 
      console.error(err);
    }
  };

  const handleSignupRedirect = () => {
   
    navigate('/signup');  
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>} 
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
        <button type="submit" className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white p-2 rounded-md">
          Login
        </button>

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
