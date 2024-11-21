// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Feed from './components/Post/Feed';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Navbar from './components/Navbar';
import { useSelector } from 'react-redux';
// import AddPost from './components/Post/AddPost';

const App = () => {
  const { isLoggedIn } = useSelector((state) => state.auth); // Get the login status from Redux state

  return (
  
      <Router>
        {/* Show Navbar only if user is logged in */}
        {isLoggedIn && <Navbar />}
        <div className="max-w-2xl mx-auto mt-20">
          <Routes>
            {/* Show Feed only if logged in, else redirect to login */}
            <Route path="/" element={isLoggedIn ? <Feed /> : <Navigate to="/login" />} />
            <Route path="/profile" element={isLoggedIn ? <Feed  profile={true}/> : <Navigate to="/login" />} />
            {/* Always show Login and Signup pages */}
            <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!isLoggedIn ? <Signup /> : <Navigate to="/" />} />
            {/* <Route path="/add-post" element={<AddPost />} /> */}
          </Routes>
        </div>
      </Router>
 
  );
};

export default App;
