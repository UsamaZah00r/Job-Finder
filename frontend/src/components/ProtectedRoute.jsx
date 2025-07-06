import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ allowedRoles = [] }) {
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/v1/user/auth', { withCredentials: true })
      .then((res) => {
        setUserRole(res.data.user.role);
      })
      .catch(() => {
        setUserRole(null);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="h-[100vh] flex justify-center items-center">
        <h1 className="text-4xl font-bold">Loading...</h1>
      </div>
    );
  }

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // Renders nested route component like <Profile />
}

export default ProtectedRoute;
