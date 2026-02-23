import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Demo persistence
    const savedUser = localStorage.getItem('art_gallery_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (role, email, password) => {
    if (role === 'admin') {
      const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
      const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

      if (email !== adminEmail || password !== adminPassword) {
        throw new Error('Invalid admin credentials');
      }
    }

    const newUser = { id: Date.now(), role, name: role.charAt(0).toUpperCase() + role.slice(1) };
    setUser(newUser);
    localStorage.setItem('art_gallery_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('art_gallery_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
