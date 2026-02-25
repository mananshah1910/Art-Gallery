import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Hardcoded staff credentials (admin/curator/artist staff access)
const STAFF_CREDENTIALS = {
  'manan@gmail.com': {
    password: '123456',
    role: 'admin',
    name: 'Manan Shah'
  }
};

const STORAGE_KEY_USER = 'art_gallery_user';
const STORAGE_KEY_USERS_DB = 'art_gallery_users_db';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEY_USER);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Get the users database from localStorage
  const getUsersDb = () => {
    const db = localStorage.getItem(STORAGE_KEY_USERS_DB);
    return db ? JSON.parse(db) : {};
  };

  // Save the users database to localStorage
  const saveUsersDb = (db) => {
    localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(db));
  };

  // Sign Up - register a new user
  const signUp = (email, password, name) => {
    // Check if email is already a staff email
    if (STAFF_CREDENTIALS[email.toLowerCase()]) {
      throw new Error('This email is reserved for staff. Please use a different email.');
    }

    const db = getUsersDb();
    if (db[email.toLowerCase()]) {
      throw new Error('An account with this email already exists. Please sign in.');
    }

    const newUser = {
      id: Date.now(),
      email: email.toLowerCase(),
      password,
      name: name || email.split('@')[0],
      role: 'visitor',
      createdAt: new Date().toISOString()
    };

    db[email.toLowerCase()] = newUser;
    saveUsersDb(db);

    const sessionUser = { id: newUser.id, role: newUser.role, name: newUser.name, email: newUser.email };
    setUser(sessionUser);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(sessionUser));

    return sessionUser;
  };

  // Sign In - login for both regular users and staff
  const signIn = (email, password) => {
    const lowerEmail = email.toLowerCase();

    // Check staff credentials first
    const staffEntry = STAFF_CREDENTIALS[lowerEmail];
    if (staffEntry) {
      if (staffEntry.password !== password) {
        throw new Error('Invalid staff credentials.');
      }
      const sessionUser = {
        id: 'staff-' + lowerEmail,
        role: staffEntry.role,
        name: staffEntry.name,
        email: lowerEmail
      };
      setUser(sessionUser);
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(sessionUser));
      return sessionUser;
    }

    // Regular user login
    const db = getUsersDb();
    const storedUser = db[lowerEmail];

    if (!storedUser) {
      throw new Error('No account found with this email. Please sign up first.');
    }
    if (storedUser.password !== password) {
      throw new Error('Incorrect password. Please try again.');
    }

    const sessionUser = { id: storedUser.id, role: storedUser.role, name: storedUser.name, email: storedUser.email };
    setUser(sessionUser);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(sessionUser));
    return sessionUser;
  };

  // Legacy login support (for role-based staff login via old components)
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
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY_USER);
  };

  return (
    <AuthContext.Provider value={{ user, login, signIn, signUp, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
