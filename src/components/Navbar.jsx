import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice';
import { FaUserCircle } from 'react-icons/fa'; 

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false); 
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const dropdownRef = useRef(null); 

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false); 
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="fixed top-0 left-0 w-full shadow-md z-10 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white p-4 flex justify-between items-center">
      <span className="font-bold text-xl">Xcode Instagram</span>
      <div>
        {isLoggedIn ? (
          <div className="relative flex items-center gap-2" ref={dropdownRef}>
            <div className='bg-green-500 rounded-full w-2 h-2'></div>
            <p>Hey {user.name}</p>
            <FaUserCircle
              className="text-3xl cursor-pointer"
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-lg">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 hover:rounded-t-lg"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <Link to="/login" className="mr-4 text-blue-400">
              Login
            </Link>
            <Link to="/signup" className="bg-blue-500 text-white p-2 rounded">
              Signup
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
