import React from 'react';
import './Header.css';

function Header() {
  const handleVisitWebsite = () => {
    // Ganti URL ini dengan URL situs utama yang kamu inginkan
    window.open('https://www.google.com', '_blank');
  };

  return (
    <header className="header-container">
      {/* Kiri/Tengah: Teks Berjalan */}
      <div className="header-marquee-area">
        <marquee behavior="scroll" direction="left" scrollamount="5">
          Selamat datang di Bola88! Nikmati berbagai live stream olahraga, esports, slot, dan togel sekarang juga! Jangan lewatkan event spesial setiap hari!
          {/* UBAH INI: Teks marquee diubah */}
        </marquee>
      </div>

      {/* Kanan: Tombol Kunjungi Situs Utama */}
      <div className="header-right-button-area">
        <button className="visit-website-button-highlight" onClick={handleVisitWebsite}>
          Kunjungi Situs Utama
        </button>
      </div>
    </header>
  );
}

export default Header;