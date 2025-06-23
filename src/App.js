import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import ini
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HeroSection from './components/HeroSection';
import ContinueWatchingSection from './components/ContinueWatchingSection';
import './App.css';

// Import komponen halaman baru yang akan kita buat
import LiveSportsPage from './pages/LiveSportsPage';
import LiveEsportsPage from './pages/LiveEsportsPage';
import LiveSlotsPage from './pages/LiveSlotsPage';
import LiveTogelPage from './pages/LiveTogelPage';
import HomePage from './pages/HomePage'; // Buat komponen untuk halaman utama

function App() {
  return (
    <Router> {/* Bungkus seluruh aplikasi dengan Router */}
      <div className="app-container">
        <Sidebar />
        <div className="main-content-wrapper">
          <Header />
          <div className="main-content-area">
            {/* Definisikan rute-rute aplikasi di sini */}
            <Routes>
              <Route path="/" element={<HomePage />} /> {/* Rute untuk halaman utama */}
              <Route path="/live-sports" element={<LiveSportsPage />} />
              <Route path="/live-esports" element={<LiveEsportsPage />} />
              <Route path="/live-slots" element={<LiveSlotsPage />} />
              <Route path="/live-togel" element={<LiveTogelPage />} />
              {/* Tambahkan rute untuk Playlist jika diperlukan, contoh: */}
              {/* <Route path="/playlist" element={<PlaylistPage />} /> */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;