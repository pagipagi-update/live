import React from 'react';
// Impor ikon yang sesuai dari react-icons/fa
import { FaGlobe, FaChartLine, FaFootballBall, FaTicketAlt } from 'react-icons/fa';
import './QuickAccessMenu.css';

function QuickAccessMenu() {
  const menuItems = [
    { 
      name: 'Website Bola88', 
      link: 'https://www.bola88.com', 
      isExternal: true, 
      icon: <FaGlobe className="menu-icon" /> // Ikon Globe untuk website
    }, 
    { 
      name: 'Live RTP', 
      link: '/live-rtp', // Ganti dengan URL/path Live RTP
      isExternal: false, 
      icon: <FaChartLine className="menu-icon" /> // Ikon Chart Line untuk RTP
    }, 
    { 
      name: 'Live Score', 
      link: 'https://www.livescore.com', // Ganti dengan URL Live Score
      isExternal: true, 
      icon: <FaFootballBall className="menu-icon" /> // Ikon Bola Sepak untuk Live Score
    }, 
    { 
      name: 'Result Togel', 
      link: '/result-togel', // Ganti dengan URL/path Result Togel
      isExternal: false, 
      icon: <FaTicketAlt className="menu-icon" /> // Ikon Tiket untuk Result Togel
    }, 
  ];

  return (
    <section className="quick-access-section">
      <h2 className="quick-access-title">Browse</h2> {/* UBAH INI: Judul diubah menjadi "Browse" */}
      <div className="quick-access-menu-container">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target={item.isExternal ? '_blank' : '_self'}
            rel={item.isExternal ? 'noopener noreferrer' : ''}
            className="quick-access-button"
          >
            <span>{item.name}</span> {/* Teks item menu */}
            {item.icon} {/* Ikon, ditampilkan setelah teks */}
          </a>
        ))}
      </div>
    </section>
  );
}

export default QuickAccessMenu;