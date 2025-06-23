import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaFutbol, FaGamepad, FaDice, FaCoins  } from 'react-icons/fa';
import { FiList, FiHome  } from 'react-icons/fi';
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', icon: <FiHome/>, path: '/' },
    { name: 'Live Sports', icon: <FaFutbol />, path: '/live-sports' },
    { name: 'Live Esports', icon: <FaGamepad />, path: '/live-esports' },
    { name: 'Live Slots', icon: <FaDice />, path: '/live-slots' },
    { name: 'Live Togel', icon: <FaCoins />, path: '/live-togel' },    
  ];

  return (
    <aside className="sidebar-container">
      <div className="sidebar-header">
        <span className="logo-small">Bola88</span> {/* UBAH INI: Nama brand di sidebar */}
      </div>

      <nav className="sidebar-nav">
        <ul>
          {navigationItems.map((item) => (
            <li
              key={item.name}
              className={location.pathname === item.path ? 'nav-item active' : 'nav-item'}
            >
              <Link to={item.path}>
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bagian untuk banner vertikal */}
      <div className="sidebar-banner-area">
        <img
          src="https://via.placeholder.com/280x400/1698CE/FFFFFF?text=PROMO+BANNER+BOLA88" /* UBAH INI: Warna dan teks banner placeholder */
          alt="Promotion Banner"
          className="promo-banner"
        />
      </div>
    </aside>
  );
}

export default Sidebar;