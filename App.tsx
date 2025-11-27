import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/Admin';

const App: React.FC = () => {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* Admin Routes - In a larger app, we'd use nested routes here properly */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </DataProvider>
  );
};

export default App;