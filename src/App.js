// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar'; 
import HomePage from './pages/HomePage';
import LiveSportsPage from './pages/LiveSportsPage';
import LiveEsportsPage from './pages/LiveEsportsPage';
import LiveSlotsPage from './pages/LiveSlotsPage';
import LiveTogelPage from './pages/LiveTogelPage';
import PromoPage from './pages/PromoPage'; 
import Footer from './components/Footer';
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 992);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Tentukan apakah kita dalam mode mobile (sidebar akan overlay)
  const isMobileMode = window.innerWidth <= 992; // Menggunakan breakpoint yang sama dengan CSS

  return (
    <Router>
      <div className="app-container">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        
        {/* Ini adalah bagian BACKDROP (overlay gelap) */}
        {/* Hanya muncul di mode mobile (isMobileMode) DAN saat sidebar terbuka (isSidebarOpen) */}
        {isMobileMode && isSidebarOpen && (
          <div className="sidebar-backdrop" onClick={toggleSidebar}></div>
        )}

        <div className={`main-content-wrapper ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <Header toggleSidebar={toggleSidebar} />
          <div className="main-content-area">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/live-sports" element={<LiveSportsPage />} />
              <Route path="/live-esports" element={<LiveEsportsPage />} />
              <Route path="/live-slots" element={<LiveSlotsPage />} />
              <Route path="/live-togel" element={<LiveTogelPage />} />
              <Route path="/promo-terbaru" element={<PromoPage />} /> 
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;