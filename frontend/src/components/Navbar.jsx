import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContext';


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, loading } = useContext(UserContext);

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path) =>
    location.pathname === path ? 'text-blue-500 font-semibold' : 'text-gray-700';

  if (loading) return null;

  return (
    <nav className="bg-white shadow-md px-4 py-3 md:px-8 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-blue-600">
        Job Finder
      </Link>

      <button className="md:hidden text-gray-700" onClick={toggleMenu}>
        ☰
      </button>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-6 items-center">
        {(user?.role === "seeker" || user?.role === "employer") && (
          <>
            <Link to="/" className={isActive('/')}>Home</Link>
            <Link to="/about" className={isActive('/about')}>About</Link>
            <Link to="/contact" className={isActive('/contact')}>Contact</Link>
            {user.role === "seeker" && (
              <Link to="/jobs" className={isActive('/jobs')}>Jobs</Link>
            )}
            {user.role === "employer" && (
              <Link to="/createjob" className={isActive('/createjob')}>Post Job</Link>
              
            )}
            {user.role === "employer" && (
  <Link to="/my-jobs" className={isActive('/my-jobs')}>My Jobs</Link>
)}
          </>
        )}

        {!user && (
          <>
            <Link to="/" className={isActive('/')}>Home</Link>
            <Link to="/about" className={isActive('/about')}>About</Link>
            <Link to="/contact" className={isActive('/contact')}>Contact</Link>
            <Link to="/login" className={isActive('/login')}>Login</Link>
            <Link to="/register" className={isActive('/register')}>Register</Link>
          </>
        )}

        {user && (
          <Link to={user.role === "seeker" ? "/profile/seeker" : "/profile/employer"}>
            <img
              src={user.profileImage || '/default-profile.png'}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover border border-gray-300 cursor-pointer"
            />
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center md:hidden z-50">
          {(user?.role === "seeker" || user?.role === "employer") && (
            <>
              <Link to="/" className="py-2 w-full text-center border-b" onClick={toggleMenu}>Home</Link>
              <Link to="/about" className="py-2 w-full text-center border-b" onClick={toggleMenu}>About</Link>
              <Link to="/contact" className="py-2 w-full text-center border-b" onClick={toggleMenu}>Contact</Link>
              {user.role === "seeker" && (
                <Link to="/jobs" className="py-2 w-full text-center border-b" onClick={toggleMenu}>Jobs</Link>
              )}
              {user.role === "employer" && (
                <Link to="/createjob" className="py-2 w-full text-center border-b" onClick={toggleMenu}>Post Job</Link>
              )}
              {user.role === "employer" && (
  <Link to="/my-jobs" className={isActive('/my-jobs')}>My Jobs</Link>
)}
            </>
          )}

          {!user && (
            <>
              <Link to="/" className="py-2 w-full text-center border-b" onClick={toggleMenu}>Home</Link>
              <Link to="/about" className="py-2 w-full text-center border-b" onClick={toggleMenu}>About</Link>
              <Link to="/contact" className="py-2 w-full text-center border-b" onClick={toggleMenu}>Contact</Link>
              <Link to="/login" className="py-2 w-full text-center border-b" onClick={toggleMenu}>Login</Link>
              <Link to="/register" className="py-2 w-full text-center border-b" onClick={toggleMenu}>Register</Link>
            </>
          )}

          {user && (
            <div className="py-3">
              <Link
                to={user.role === "seeker" ? "/profile/seeker" : "/profile/employer"}
                onClick={toggleMenu}
              >
                <img
                  src={user.profileImage || '/default-profile.png'}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover border border-gray-300 mx-auto cursor-pointer"
                />
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
