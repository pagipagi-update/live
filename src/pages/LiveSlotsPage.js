// src/pages/LiveSlotsPage.js
import React, { useState, useEffect, useRef } from 'react';
import ChatBox from '../components/ChatBox';
import './PageStyles.css'; // Styling umum halaman
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa'; 
import { FiLink, FiMessageCircle } from 'react-icons/fi'; 
import { promoArticles } from '../data/promoData'; // Data promo untuk bagian bawah

const OWNCAST_BASE_URL = 'https://stream.ahs.my.id/'; 

function LiveSlotsPage() {
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
      console.log('WebSocket connection established for Slots.');
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
      console.log('WebSocket connection closed for Slots.');
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), user: 'System', text: 'Koneksi chat terputus. Mencoba menghubungkan kembali...' },
      ]);
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error for Slots:', error);
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

  const alternativeLinks = [
    { text: 'Link Alternatif', icon: <FiLink />, url: 'https://linkalternatif.com', isPrimary: true }, 
    { text: 'Telegram Bola88', icon: <FaTelegramPlane />, url: 'https://t.me/bola88resmi', isPrimary: false }, 
    { text: 'Whatsapp Bola88', icon: <FaWhatsapp />, url: 'https://wa.me/628123456789', isPrimary: false }, 
    { text: 'Livechat Bola88', icon: <FiMessageCircle />, url: 'https://livechat.bola88.com', isPrimary: false }, 
  ];

  const streamTags = ['Slots', 'Jackpot', 'Daily Spin', 'Big Win', 'English']; 
  const latestPromos = promoArticles.slice(0, 2);

  return (
    <div className="page-container">
      <div className="live-content-layout">
        <div className="video-player-and-info-frame">
          <div className="video-placeholder"> 
            <iframe
              src={`${OWNCAST_BASE_URL}/embed/video`}
              title="Owncast Live Slots Stream"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="owncast-iframe-player"
            ></iframe>
          </div>
          <div className="stream-info">
              <div className="stream-info-header">
                  <img 
                      src={`${OWNCAST_BASE_URL}/logo`} /* Avatar Slots */
                      alt="Profile Avatar"
                      className="streamer-avatar"
                  />
                  <div className="stream-title-group">
                      <h3 className="stream-title-display">
                          Livestreaming Slot Gacor Hari ini
                      </h3>
                      <p className="streamer-name">Slot Master Official</p>
                  </div>
              </div>
              <p className="stream-description-display">
                  Rasakan sensasi putaran slot langsung! Ikuti Host kami mencari jackpot besar setiap hari.
              </p>
              <div className="stream-tags-container">
                  {streamTags.map((tag, index) => (
                      <span key={index} className="stream-tag-item">
                          {tag}
                      </span>
                  ))}
              </div>
          </div>
        </div> 

        <ChatBox messages={messages} onSendMessage={handleSendMessage} />
      </div>
      
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

export default LiveSlotsPage;