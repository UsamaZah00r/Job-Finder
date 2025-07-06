import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/user/me', {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = async () => {
    await axios.get('http://localhost:8000/api/v1/user/logout', {
      withCredentials: true,
    });
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
