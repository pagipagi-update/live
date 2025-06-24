// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import LiveSportsPage from './pages/LiveSportsPage';
import LiveEsportsPage from './pages/LiveEsportsPage';
import LiveSlotsPage from './pages/LiveSlotsPage';
import LiveTogelPage from './pages/LiveTogelPage';
import PromoPage from './pages/PromoPage'; 
import Footer from './components/Footer'; // IMPOR KOMPONEN FOOTER BARU
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="app-container">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        
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
          <Footer /> {/* TAMBAHKAN KOMPONEN FOOTER DI SINI, DI LUAR <Routes> */}
        </div>
      </div>
    </Router>
  );
}

export default App;