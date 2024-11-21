import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useSelector } from 'react-redux';
import FeedPage from './pages/FeedPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

const App = () => {
  const { isLoggedIn } = useSelector((state) => state.auth); 

  return (
  
      <Router>
        {isLoggedIn && <Navbar />}
        <div className={isLoggedIn ? "w-full sm:max-w-xl mx-auto mt-20" : "w-full "}>
          <Routes>
            <Route path="/" element={isLoggedIn ? <FeedPage Profile={false} /> : <Navigate to="/login" />} />
            <Route path="/login" element={isLoggedIn ? <FeedPage Profile={false} /> : <LoginPage/>} />
            <Route path="/profile" element={isLoggedIn ? <FeedPage Profile={true}  /> : <Navigate to="/login" />} />
            <Route path="/login" element={!isLoggedIn ? <LoginPage /> : <Navigate to="/" />} />
            <Route path="/signup" element={!isLoggedIn ? <SignupPage /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
 
  );
};

export default App;
