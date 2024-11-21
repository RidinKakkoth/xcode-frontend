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
        {isLoggedIn && <Navbar />}
        <div className={isLoggedIn ? "max-w-2xl mx-auto mt-20" : "w-full "}>
          <Routes>
            <Route path="/" element={isLoggedIn ? <Feed /> : <Navigate to="/login" />} />
            <Route path="/login" element={isLoggedIn ? <Feed /> : <Login/>} />
            <Route path="/profile" element={isLoggedIn ? <Feed  profile={true}/> : <Navigate to="/login" />} />
            <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!isLoggedIn ? <Signup /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
 
  );
};

export default App;
