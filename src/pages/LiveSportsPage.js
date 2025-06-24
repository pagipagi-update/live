import React, { useState, useEffect, useRef } from 'react'; // Tambahkan useRef
import ChatBox from '../components/ChatBox';
import './PageStyles.css';

const OWNCAST_BASE_URL = 'http://159.223.37.64:8080/'; // GANTI DENGAN URL OWNCAST ANDA!

function LiveSportsPage() {
  const [messages, setMessages] = useState([]); // Mulai dengan array kosong, pesan akan datang dari Owncast
  const [streamStatus, setStreamStatus] = useState(null);
  const ws = useRef(null); // Ref untuk menyimpan instance WebSocket

  // Fungsi untuk mengirim pesan ke Owncast
  const handleSendMessage = (messageText) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      // Format pesan sesuai Owncast API
      const message = {
        type: 'CHAT',
        body: messageText,
        // Anda mungkin perlu otentikasi jika Owncast memerlukan user/token
        // name: 'PenggunaFrontend', // Nama pengguna jika tidak ada otentikasi
      };
      ws.current.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket not connected. Message not sent.');
      // Fallback: tambahkan ke UI lokal agar user tahu pesannya telah ditulis
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), user: 'Anda (Offline)', text: messageText },
      ]);
    }
  };

  // Efek untuk mengelola koneksi WebSocket dan API status
  useEffect(() => {
    // 1. Ambil Status Stream
    const fetchStreamStatus = async () => {
      try {
        const response = await fetch(`${OWNCAST_BASE_URL}/api/status`);
        const data = await response.json();
        setStreamStatus(data);
        console.log("Owncast Status:", data);
      } catch (error) {
        console.error('Error fetching Owncast status:', error);
        setStreamStatus(null);
      }
    };

    fetchStreamStatus();
    const statusInterval = setInterval(fetchStreamStatus, 30000); // Perbarui status setiap 30 detik

    // 2. Inisialisasi WebSocket Chat
    ws.current = new WebSocket(`${OWNCAST_BASE_URL}/ws`);

    ws.current.onopen = () => {
      console.log('WebSocket connection established.');
      setMessages([{ id: Date.now(), user: 'System', text: 'Terhubung ke Live Chat Owncast.' }]);
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'CHAT') {
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: data.id, user: data.author, text: data.body },
        ]);
      } else if (data.type === 'PONG') {
        // Owncast mengirim PONG, ini bisa digunakan untuk menjaga koneksi tetap hidup
        // console.log('Received PONG');
      }
      // Anda bisa menangani jenis pesan lain dari Owncast (e.g., 'SYSTEM', 'FEDIVERSE_ENGAGEMENT')
    };

    ws.current.onclose = () => {
      console.log('WebSocket connection closed.');
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), user: 'System', text: 'Koneksi chat terputus. Mencoba menghubungkan kembali...' },
      ]);
      // Implementasi reconnect logic di sini jika diinginkan
      // setTimeout(() => { /* logic untuk reconnect */ }, 5000);
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), user: 'System', text: 'Terjadi kesalahan pada chat. Coba lagi nanti.' },
      ]);
    };

    // Cleanup function: Tutup koneksi WebSocket saat komponen di-unmount
    return () => {
      clearInterval(statusInterval);
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []); // Array dependensi kosong agar hanya berjalan sekali saat mount

  return (
    <div className="page-container">
      <h1 className="page-title">Live Sports</h1>
      <p className="page-description">Saksikan pertandingan olahraga langsung dari seluruh dunia.</p>

      <div className="live-content-layout">
        <div className="video-player-area">
          <div className="video-placeholder">
            <iframe
              src={`${OWNCAST_BASE_URL}/embed/video`}
              title="Owncast Live Stream"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="owncast-iframe-player"
            ></iframe>
          </div>
          <div className="stream-info">
              <h3>{streamStatus && streamStatus.online ? streamStatus.streamTitle : 'Stream Tidak Tersedia'}</h3>
              <p>{streamStatus && streamStatus.online ? streamStatus.streamDescription : 'Tunggu live stream dimulai...'}</p>
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

export default LiveSportsPage;