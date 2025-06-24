// src/components/Footer.js
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'; // Impor ikon sosial media
import './Footer.css'; // File CSS baru untuk Footer

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="logo-text-footer">Bola88</span>
          <p className="footer-tagline">Nikmati sensasi live streaming terbaik!</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/about-us">About Us</a></li> {/* Placeholder link */}
            <li><a href="/contact">Contact</a></li> {/* Placeholder link */}
            <li><a href="/privacy-policy">Privacy Policy</a></li> {/* Placeholder link */}
            <li><a href="/terms">Terms & Conditions</a></li> {/* Placeholder link */}
          </ul>
        </div>

        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons-footer">
            {/* Menggunakan ikon dari react-icons */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook className="footer-social-icon"/></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter className="footer-social-icon"/></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram className="footer-social-icon"/></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube className="footer-social-icon"/></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Bola88. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;