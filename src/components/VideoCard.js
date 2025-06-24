import React from 'react';
import { Link } from 'react-router-dom';
import './VideoCard.css';

// Menerima props 'thumbnail' (yang bisa statis atau live thumbnail dari Owncast utama) dan 'isLive'
function VideoCard({ title, streamer, thumbnail, to, isLive }) {
  return (
    <Link to={to} className="video-card-link">
      <div className="video-card">
        <div className="card-thumbnail" style={{ backgroundImage: `url(${thumbnail})` }}>
          {/* Tampilkan tag LIVE jika isLive true */}
          {isLive && <span className="live-tag-card">LIVE</span>}
        </div>
        <div className="card-info">
          <h3 className="card-title">{title}</h3>
          <div className="card-streamer">
            <span>{streamer}</span>
            {/* Tampilkan titik hijau hanya jika isLive true */}
            {isLive && <span className="online-dot-small"></span>}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;