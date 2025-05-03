// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import AISafetyDashboard from './components/AISafetyDashboard';
import Analytics from './components/Analytics';
import Notifications from './components/Notifications';
import Profile from './components/Profile';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-x-hidden">
        {/* Animated background circles */}
        <div className="bg-blur-circle bg-blur-blue" />
        <div className="bg-blur-circle bg-blur-purple" />
        <ToastContainer position="top-right" theme="dark" />
        <Navbar />
        <AnimatePresence mode="wait">
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="main-content-scroll"
          >
            <Routes>
              <Route path="/" element={<AISafetyDashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </motion.main>
        </AnimatePresence>
      </div>
    </Router>
  );
};

export default App;