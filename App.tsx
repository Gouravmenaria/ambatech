
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ThreeBackground from './components/ThreeBackground';
import LandingPage from './pages/LandingPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAdmin(true);
    }
  }, []);

  return (
    <Router>
      <div className="relative min-h-screen bg-gray-950 text-white overflow-x-hidden selection:bg-cyan-500 selection:text-white">
        {/* Animated Background */}
        <ThreeBackground />
        
        {/* Navigation */}
        <Navbar />
        <Sidebar />

        {/* Global Notifications */}
        <Toaster position="top-right" reverseOrder={false} />

        {/* Content */}
        <main className="relative z-10 pt-16">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route 
              path="/admin/login" 
              element={isAdmin ? <Navigate to="/admin/dashboard" /> : <AdminLogin setIsAdmin={setIsAdmin} />} 
            />
            <Route 
              path="/admin/dashboard" 
              element={isAdmin ? <AdminDashboard setIsAdmin={setIsAdmin} /> : <Navigate to="/admin/login" />} 
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
