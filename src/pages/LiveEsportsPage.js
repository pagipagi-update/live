import React, { useState, useEffect, useRef } from 'react';
import ChatBox from '../components/ChatBox';
import './PageStyles.css';

// URL dasar Owncast Anda. Ganti ini dengan URL OWNCAST ANDA YANG SEBENARNYA!
const OWNCAST_BASE_URL = 'http://tipi.abong4star.space:8080/';

function LiveEsportsPage() {
  const [messages, setMessages] = useState([
    { id: 1, user: 'EsportsBotBola88', text: 'Selamat datang di turnamen Esports Bola88! Dukung tim favoritmu.' },
    { id: 2, user: 'GamerX', text: 'Permainan yang luar biasa dari Tim Biru!' },
    { id: 3, user: 'ProPlayer', text: 'Strategi yang sangat cerdas!' },
  ]);
  const [streamStatus, setStreamStatus] = useState(null);
  const ws = useRef(null);

  const handleSendMessage = (messageText) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const message = {
        type: 'CHAT',
        body: messageText,
      };
      ws.current.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket not connected. Message not sent.');
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), user: 'Anda (Offline)', text: messageText },
      ]);
    }
  };

  useEffect(() => {
    // 1. Ambil Status Stream
    const fetchStreamStatus = async () => {
      try {
        const response = await fetch(`${OWNCAST_BASE_URL}/api/status`);
        const data = await response.json();
        setStreamStatus(data);
        console.log("Owncast Status (Esports):", data);
      } catch (error) {
        console.error('Error fetching Owncast status (Esports):', error);
        setStreamStatus(null);
      }
    };

    fetchStreamStatus();
    const statusInterval = setInterval(fetchStreamStatus, 30000);

    // 2. Inisialisasi WebSocket Chat
    ws.current = new WebSocket(`${OWNCAST_BASE_URL}/ws`);

    ws.current.onopen = () => {
      console.log('WebSocket connection established for Esports.');
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
      console.log('WebSocket connection closed for Esports.');
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), user: 'System', text: 'Koneksi chat terputus. Mencoba menghubungkan kembali...' },
      ]);
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error for Esports:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), user: 'System', text: 'Terjadi kesalahan pada chat. Coba lagi nanti.' },
      ]);
    };

    return () => {
      clearInterval(statusInterval);
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  return (
    <div className="page-container">
      <h1 className="page-title">Live Esports</h1>
      <p className="page-description">Ikuti turnamen esports terbesar dan aksi tim favoritmu.</p>

      <div className="live-content-layout">
        <div className="video-player-area">
          <div className="video-placeholder">
            <iframe
              src={`${OWNCAST_BASE_URL}/embed/video`}
              title="Owncast Live Esports Stream"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="owncast-iframe-player"
            ></iframe>
          </div>
          <div className="stream-info">
              <h3>
                  {streamStatus && streamStatus.online ? streamStatus.streamTitle : 'Stream Tidak Tersedia'}
              </h3>
              <p>
                  {streamStatus && streamStatus.online ? streamStatus.streamDescription : 'Tunggu live stream dimulai...'}
              </p>
              {streamStatus && streamStatus.online && (
                  <p>Penonton: {streamStatus.viewerCount}</p>
              )}
          </div>
        </div>
        <ChatBox messages={messages} onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default LiveEsportsPage;