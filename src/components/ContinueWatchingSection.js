import React, { useState, useEffect } from 'react'; // Tetap import useEffect untuk fetching status Owncast utama
import VideoCard from './VideoCard';
import './ContinueWatchingSection.css';

// URL dasar Owncast Anda (untuk mengambil status dan thumbnail utama)
const MAIN_OWNCAST_BASE_URL = 'http://localhost:8080'; // GANTI INI DENGAN URL OWNCAST ANDA!

function ContinueWatchingSection() {
  const [channelsData, setChannelsData] = useState([]);
  const [mainStreamIsLive, setMainStreamIsLive] = useState(false);
  const [mainLiveThumbnail, setMainLiveThumbnail] = useState('');
  const [mainStreamTitle, setMainStreamTitle] = useState('');
  const [mainStreamViewerCount, setMainStreamViewerCount] = useState(0);

  // Data untuk channel live. Thumbnail akan diputuskan berdasarkan status stream utama.
  const initialChannels = [
    {
      title: 'Live Sports',
      streamer: 'Football Match',
      staticThumbnail: 'https://via.placeholder.com/300x170/1698CE/FFFFFF?text=LIVE+SPORTS',
      path: '/live-sports',
    },
    {
      title: 'Live Esports',
      streamer: 'Dota 2 Tournament',
      staticThumbnail: 'https://via.placeholder.com/300x170/1a1a1a/FFFFFF?text=LIVE+ESPORTS',
      path: '/live-esports',
    },
    {
      title: 'Live Slots',
      streamer: 'Big Win Mania',
      staticThumbnail: 'https://via.placeholder.com/300x170/2a2a2a/FFFFFF?text=LIVE+SLOTS',
      path: '/live-slots',
    },
    {
      title: 'Live Togel',
      streamer: 'HK Pool Draw',
      staticThumbnail: 'https://via.placeholder.com/300x170/3a3a3a/FFFFFF?text=LIVE+TOGEL',
      path: '/live-togel',
    },
  ];

  // Efek untuk mengambil status stream utama Owncast dan thumbnailnya
  useEffect(() => {
    const fetchMainStreamStatusAndThumbnail = async () => {
      try {
        const statusResponse = await fetch(`${MAIN_OWNCAST_BASE_URL}/api/status`);
        const statusData = await statusResponse.json();

        setMainStreamIsLive(statusData.online);
        if (statusData.online) {
          setMainLiveThumbnail(`${MAIN_OWNCAST_BASE_URL}/thumbnail.webp`);
          setMainStreamTitle(statusData.streamTitle || 'Live Stream Aktif');
          setMainStreamViewerCount(statusData.viewerCount || 0);
        } else {
          setMainLiveThumbnail(''); // Kosongkan jika offline, akan pakai static thumbnail di card
          setMainStreamTitle('Stream Tidak Tersedia');
          setMainStreamViewerCount(0);
        }
        console.log("Main Owncast Status:", statusData);

        // Setelah mendapatkan status utama, perbarui data channel untuk ditampilkan
        const updatedChannels = initialChannels.map(channel => ({
          ...channel,
          // Jika stream utama live, semua card akan menampilkan thumbnail live dari stream utama
          // Jika tidak, akan menampilkan static thumbnail masing-masing
          currentThumbnail: statusData.online ? `${MAIN_OWNCAST_BASE_URL}/thumbnail.webp` : channel.staticThumbnail,
          isLive: statusData.online // Semua card di sini mencerminkan status live dari stream utama
        }));
        setChannelsData(updatedChannels);

      } catch (error) {
        console.error('Error fetching main Owncast status or thumbnail:', error);
        setMainStreamIsLive(false);
        setMainLiveThumbnail('');
        setMainStreamTitle('Error Memuat Stream');
        setMainStreamViewerCount(0);
        setChannelsData(initialChannels.map(channel => ({ // Fallback ke static thumbnail jika error
          ...channel,
          currentThumbnail: channel.staticThumbnail,
          isLive: false
        })));
      }
    };

    fetchMainStreamStatusAndThumbnail(); // Panggil saat komponen mount
    const interval = setInterval(fetchMainStreamStatusAndThumbnail, 15000); // Perbarui setiap 15 detik

    return () => clearInterval(interval); // Bersihkan interval saat komponen unmount
  }, []); // Dependensi kosong agar hanya berjalan sekali saat mount

  return (
    <section className="live-now-section">
      <div className="section-header">
        <h2 className="section-title">Live Now</h2>
      </div>
      <div className="video-cards-grid">
        {channelsData.map((channel, index) => (
          <VideoCard
            key={index}
            title={channel.title}
            streamer={channel.streamer} // Akan diperbarui jika stream utama live
            thumbnail={channel.currentThumbnail} // Gunakan thumbnail dinamis/statis
            to={channel.path}
            isLive={channel.isLive} // Teruskan status live dari stream utama
          />
        ))}
      </div>
    </section>
  );
}

export default ContinueWatchingSection;