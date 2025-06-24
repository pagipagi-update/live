// src/components/ContinueWatchingSection.js
import React, { useState, useEffect } from 'react';
import VideoCard from './VideoCard';
import './ContinueWatchingSection.css';

// URL dasar Owncast Anda (untuk stream utama/default).
// Digunakan untuk status 'isLive' dan thumbnail live jika ingin.
const MAIN_OWNCAST_BASE_URL = 'http://159.223.37.64:8080/'; // GANTI INI DENGAN URL OWNCAST ANDA!

function ContinueWatchingSection() {
  const [channelsData, setChannelsData] = useState([]);
  const [mainStreamIsLive, setMainStreamIsLive] = useState(false);
  const [mainLiveThumbnailUrl, setMainLiveThumbnailUrl] = useState(''); // Untuk thumbnail dari Owncast

  // Data untuk channel live. staticThumbnail akan digunakan jika stream utama offline.
  const initialChannels = [
    {
      title: 'Live Sports',
      streamer: 'Football Match',
      staticThumbnail: 'https://premicloud.net/banner/image/promotion/bola88bonussquare.webp', // Ganti dengan URL gambar banner Sports Anda
      path: '/live-sports',
    },
    {
      title: 'Live Esports',
      streamer: 'Dota 2 Tournament',
      staticThumbnail: 'https://premicloud.net/banner/image/promotion/WLUBO_New_Quiz_Corner_Squarehome.webp', // Ganti dengan URL gambar banner Esports Anda
      path: '/live-esports',
    },
    {
      title: 'Live Slots',
      streamer: 'Big Win Mania',
      staticThumbnail: 'https://premicloud.net/banner/image/promotion/bola88_extrachipsturnovernew_squarebanner.webp', // Ganti dengan URL gambar banner Slots Anda
      path: '/live-slots',
    },
    {
      title: 'Live Togel',
      streamer: 'HK Pool Draw',
      staticThumbnail: 'https://premicloud.net/banner/image/promotion/Bola88_Referral_SquareBanner.webp', // Ganti dengan URL gambar banner Togel Anda
      path: '/live-togel',
    },
  ];

  // Efek untuk mengambil status stream utama Owncast dan thumbnailnya
  useEffect(() => {
    const fetchMainStreamStatusAndThumbnail = async () => {
      let currentLiveThumbnail = '';
      let isMainStreamOnline = false;
      let mainStreamTitle = ''; // Variabel untuk menyimpan judul stream dari Owncast

      try {
        const statusResponse = await fetch(`${MAIN_OWNCAST_BASE_URL}/api/status`);
        const statusData = await statusResponse.json();

        if (statusData.online) {
          isMainStreamOnline = true;
          currentLiveThumbnail = `${MAIN_OWNCAST_BASE_URL}/thumbnail.webp`; // URL thumbnail live Owncast
          mainStreamTitle = statusData.streamTitle || 'Stream Sedang Aktif'; // Ambil judul stream dari Owncast
        }
      } catch (error) {
        console.error('Error fetching main Owncast status or thumbnail:', error);
        // Jika ada error, asumsikan offline
      }

      setMainStreamIsLive(isMainStreamOnline);
      setMainLiveThumbnailUrl(currentLiveThumbnail);

      // Perbarui channelsData berdasarkan status stream utama
      const updatedChannels = initialChannels.map(channel => ({
        ...channel,
        // Gunakan live thumbnail Owncast jika stream utama online,
        // jika tidak, gunakan static thumbnail masing-masing kartu.
        currentThumbnail: isMainStreamOnline ? currentLiveThumbnail : channel.staticThumbnail,
        // isLive dari main stream Owncast menentukan apakah tag "LIVE" muncul di kartu.
        isLive: isMainStreamOnline,
        // Jika stream utama online, update streamer text (misal: "Judul Stream Utama (Kategori)").
        // Jika offline, gunakan streamer text default dari initialChannels.
        streamer: isMainStreamOnline ? (mainStreamTitle.includes(channel.title) ? mainStreamTitle : `${mainStreamTitle}`) : channel.streamer,
      }));
      setChannelsData(updatedChannels);
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
            streamer={channel.streamer}
            thumbnail={channel.currentThumbnail} // Gunakan thumbnail yang sudah ditentukan (static/live)
            to={channel.path}
            isLive={channel.isLive} // Teruskan status live untuk tag "LIVE"
          />
        ))}
      </div>
    </section>
  );
}

export default ContinueWatchingSection;