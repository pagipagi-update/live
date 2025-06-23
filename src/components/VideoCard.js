import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './VideoCard.css';

// Terima properti 'to' yang akan menjadi URL tujuan
function VideoCard({ title, streamer, thumbnail, to }) {
  return (
    // Bungkus seluruh div video-card dengan Link
    <Link to={to} className="video-card-link"> {/* Tambahkan class untuk styling jika perlu */}
      <div className="video-card">
        <div className="card-thumbnail" style={{ backgroundImage: `url(${thumbnail})` }}>
          {/* Placeholder for video duration or other overlays if needed */}
        </div>
        <div className="card-info">
          <h3 className="card-title">{title}</h3>
          <div className="card-streamer">
            <span>{streamer}</span>
            <span className="online-dot-small"></span> {/* Titik hijau kecil */}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;