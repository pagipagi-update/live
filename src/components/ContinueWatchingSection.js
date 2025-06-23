import React from 'react';
import VideoCard from './VideoCard';
import './ContinueWatchingSection.css';

function ContinueWatchingSection() {
  const liveChannels = [
    {
      title: 'Live Sports',
      streamer: 'Football Match',
      thumbnail: 'https://via.placeholder.com/300x170/1698CE/FFFFFF?text=LIVE+SPORTS', // UBAH INI
      path: '/live-sports',
    },
    {
      title: 'Live Esports',
      streamer: 'Dota 2 Tournament',
      thumbnail: 'https://via.placeholder.com/300x170/1a1a1a/FFFFFF?text=LIVE+ESPORTS', // Sesuaikan dengan warna yang cocok di palette baru
      path: '/live-esports',
    },
    {
      title: 'Live Slots',
      streamer: 'Big Win Mania',
      thumbnail: 'https://via.placeholder.com/300x170/2a2a2a/FFFFFF?text=LIVE+SLOTS', // Sesuaikan
      path: '/live-slots',
    },
    {
      title: 'Live Togel',
      streamer: 'HK Pool Draw',
      thumbnail: 'https://via.placeholder.com/300x170/3a3a3a/FFFFFF?text=LIVE+TOGEL', // Sesuaikan
      path: '/live-togel',
    },
  ];

  return (
    <section className="live-now-section">
      <div className="section-header">
        <h2 className="section-title">Live Now</h2>
      </div>
      <div className="video-cards-grid">
        {liveChannels.map((channel, index) => (
          <VideoCard
            key={index}
            title={channel.title}
            streamer={channel.streamer}
            thumbnail={channel.thumbnail}
            to={channel.path}
          />
        ))}
      </div>
    </section>
  );
}

export default ContinueWatchingSection;