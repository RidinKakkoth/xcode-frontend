import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { userSignUp } from '../../api/api'; 
import { toast } from 'react-toastify';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [error, setError] = useState('');  
  const navigate = useNavigate(); 

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {

      const response = await userSignUp(name,email, password);
   
if(response.success){
      navigate('/login'); 
    toast.success(response.message)}
    else{
      toast.error(response.message)
    }

    } catch (err) {
      setError('Failed to sign up. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500">
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
          minLength={6}
          onChange={(e) => setPassword(e.target.value)}
          className="block p-2 mb-4 w-full border border-gray-300 rounded-md"
          />
        <input
          type="password"
          placeholder="Confirm Password"
          required
          minLength={6}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="block p-2 mb-4 w-full border border-gray-300 rounded-md"
          />
          {error && <p className="text-red-500 mb-4">{error}</p>} 
        <button type="submit" className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white p-2 rounded-md">
          Sign Up
        </button>

        <button
          type="button"
          onClick={() => navigate('/login')} 
          className="mt-4 w-full bg-gray-300 text-gray-700 p-2 rounded-md"
        >
          Already have an account? Log In
        </button>
      </form>
    </div>
  );
};

export default SignUp;
