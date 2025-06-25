// src/pages/LiveSportsPage.js
import React, { useState, useEffect, useRef } from 'react';
import ChatBox from '../components/ChatBox';
import './PageStyles.css'; // Styling umum halaman
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa'; 
import { FiLink, FiMessageCircle } from 'react-icons/fi'; 
import { promoArticles } from '../data/promoData'; // Data promo untuk bagian bawah

const OWNCAST_BASE_URL = 'https://stream.ahs.my.id/'; // Pastikan URL ini sudah benar

function LiveSportsPage() {
  const [messages, setMessages] = useState([]);
  const ws = useRef(null);

  const handleSendMessage = (username, messageText) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const message = {
        type: 'CHAT',
        author: username,
        body: messageText,
      };
      ws.current.send(JSON.stringify(message));
    } else {
      console.warn("WebSocket chat tidak terhubung. Pesan Anda hanya akan terlihat secara lokal.");
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), user: `${username} (Anda - Offline)`, text: messageText }, 
      ]);
    }
  };

  useEffect(() => {
    ws.current = new WebSocket(`${OWNCAST_BASE_URL}/ws`);

    ws.current.onopen = () => {
      console.log('WebSocket connection established for Sports.');
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), user: 'System', text: 'Terhubung ke Live Chat Owncast.' },
      ]);
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'CHAT') {
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: data.id, user: data.author, text: data.body },
        ]);
      } else if (data.type === 'PONG') {
        // console.log('Received PONG');
      }
    };

    ws.current.onclose = () => {
      console.log('WebSocket connection closed for Sports.');
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), user: 'System', text: 'Koneksi chat terputus. Mencoba menghubungkan kembali...' },
      ]);
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error for Sports:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), user: 'System', text: 'Terjadi kesalahan pada chat. Coba lagi nanti.' },
      ]);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  // Data untuk tombol link alternatif
  const alternativeLinks = [
    { text: 'Link Alternatif', icon: <FiLink />, url: 'https://linkalternatif.com', isPrimary: true }, 
    { text: 'Telegram Bola88', icon: <FaTelegramPlane />, url: 'https://t.me/bola88resmi', isPrimary: false }, 
    { text: 'Whatsapp Bola88', icon: <FaWhatsapp />, url: 'https://wa.me/628123456789', isPrimary: false }, 
    { text: 'Livechat Bola88', icon: <FiMessageCircle />, url: 'https://livechat.bola88.com', isPrimary: false }, 
  ];

  const streamTags = ['Football', 'Sports', 'Liga Indonesia', 'Live Match', 'English']; 
  const latestPromos = promoArticles.slice(0, 2);

  return (
    <div className="page-container">
      <div className="live-content-layout">
        {/* Frame video dan info kini menjadi anak langsung dari live-content-layout */}
        <div className="video-player-and-info-frame">
          <div className="video-placeholder"> 
            <iframe
              src={`${OWNCAST_BASE_URL}/embed/video`}
              title="Owncast Live Sports Stream"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="owncast-iframe-player"
            ></iframe>
            {/* Stream offline overlay tetap di dalam video-placeholder (jika diperlukan) */}
            {/* Note: Tidak ada streamStatus di LiveSportsPage ini, jadi overlay ini tidak akan muncul kecuali ada logika lain */}
            {/* <div className="stream-offline-overlay">...</div> */}
          </div>
          <div className="stream-info">
              <div className="stream-info-header">
                  <img 
                      src="https://via.placeholder.com/50/1698CE/FFFFFF?text=P" 
                      alt="Profile Avatar"
                      className="streamer-avatar"
                  />
                  <div className="stream-title-group">
                      <h3 className="stream-title-display">
                          Livestreaming Pertandingan Sepak Bola Hari ini
                      </h3>
                      <p className="streamer-name">Bola88 Official</p>
                  </div>
              </div>
              <p className="stream-description-display">
                  Saksikan pertandingan sepak bola eksklusif hari ini! Jangan lewatkan setiap momen seru dari liga favorit Anda.
              </p>
              <div className="stream-tags-container">
                  {streamTags.map((tag, index) => (
                      <span key={index} className="stream-tag-item">
                          {tag}
                      </span>
                  ))}
              </div>
          </div>
        </div> {/* Tutup video-player-and-info-frame */}

        {/* ChatBox kini menjadi anak langsung dari live-content-layout */}
        <ChatBox messages={messages} onSendMessage={handleSendMessage} />
      </div> {/* Tutup live-content-layout */}
      
      {/* Bagian Link Alternatif dan Tombol, dipindahkan ke luar live-content-layout */}
      <div className="alternative-links-section">
        {alternativeLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`alt-link-button ${link.isPrimary ? 'primary' : ''}`}
          >
            {link.icon}
            <span>{link.text}</span>
          </a>
        ))}
      </div>

      {/* Bagian Promosi di bawah Link, dipindahkan ke luar live-content-layout */}
      <div className="promos-below-links-section">
        <h4 className="section-title-promos">Promo Terbaru</h4>
        <div className="promos-grid-below-links">
          {latestPromos.map((promo) => (
            <div key={promo.id} className="promo-card-below-links">
              <img src={promo.imageUrl} alt={promo.title} className="promo-image-below-links" />
              <div className="promo-content-below-links">
                <h5 className="promo-title-below-links">{promo.title}</h5>
                <p className="promo-excerpt-below-links">{promo.excerpt}</p>
                <a href="/promo-terbaru" className="promo-button-below-links">Klaim!</a>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}

export default LiveSportsPage;