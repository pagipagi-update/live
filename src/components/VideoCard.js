// src/components/VideoCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './VideoCard.css';

// Terima props: title, streamer, thumbnail (URL gambar statis/live), to, isLive
function VideoCard({ title, streamer, thumbnail, to, isLive }) { 
  return (
    <Link to={to} className="video-card-link">
      <div className="video-card">
        {/* KEMBALIKAN: div dengan background-image untuk thumbnail */}
        <div 
          className="card-thumbnail" 
          style={{ backgroundImage: `url(${thumbnail})` }} /* Gunakan thumbnail sebagai background */
        >
          {isLive && <span className="live-tag-card">LIVE</span>} {/* Tag LIVE tetap ada */}
        </div>
        <div className="card-info">
          <h3 className="card-title">{title}</h3>
          <div className="card-streamer">
            <span>{streamer}</span>
            {isLive && <span className="online-dot-small"></span>}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;