import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppData, AuthState } from '../types';
import { INITIAL_DATA } from '../constants';

interface DataContextType {
  data: AppData;
  auth: AuthState;
  login: (password: string) => boolean;
  logout: () => void;
  updateData: (newData: Partial<AppData>) => void;
  resetData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AppData>(INITIAL_DATA);
  const [auth, setAuth] = useState<AuthState>({ isAuthenticated: false });

  // Load data from local storage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('portfolio_data');
    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }
    
    const savedAuth = localStorage.getItem('portfolio_auth');
    if (savedAuth === 'true') {
        setAuth({ isAuthenticated: true });
    }
  }, []);

  const login = (password: string) => {
    // Simple mock authentication
    if (password === 'admin123') {
      setAuth({ isAuthenticated: true });
      localStorage.setItem('portfolio_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuth({ isAuthenticated: false });
    localStorage.removeItem('portfolio_auth');
  };

  const updateData = (newData: Partial<AppData>) => {
    const updated = { ...data, ...newData };
    setData(updated);
    localStorage.setItem('portfolio_data', JSON.stringify(updated));
  };

  const resetData = () => {
    setData(INITIAL_DATA);
    localStorage.setItem('portfolio_data', JSON.stringify(INITIAL_DATA));
  };

  return (
    <DataContext.Provider value={{ data, auth, login, logout, updateData, resetData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};