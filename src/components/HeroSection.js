import React from 'react';
import './HeroSection.css';

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <span className="live-tag">Live</span>
        <h1 className="hero-title">NETFLIX The Pale Blue Eye</h1> {/* Judul kembali ke contoh awal */}
        <div className="hero-meta">
          <span className="rating">7.8</span>
          <span className="language">English</span>
        </div>
        <button className="watch-button">Watch</button>
      </div>
    </section>
  );
}

export default HeroSection;