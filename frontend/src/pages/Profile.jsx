import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function Profile() {
  const { user, logout, loading } = useUser();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = async () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      await logout();
      navigate('/login');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-md rounded-xl p-6 text-gray-800">
      <div className="flex flex-col items-center">
        <img
          src={user.profileImage || '/default-profile.png'}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border border-gray-300 mb-4"
        />
        <h2 className="text-2xl font-bold capitalize">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
        <p className="mt-1 px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
          {user.role}
        </p>
        <button
          onClick={handleLogout}
          className="mt-6 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
