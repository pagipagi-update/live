// src/components/VideoCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './VideoCard.css';

function VideoCard({ title, streamer, thumbnail, to, isLive }) { 
  return (
    <Link to={to} className="video-card-link">
      <div className="video-card">
        <div 
          className="card-thumbnail" 
          style={{ backgroundImage: `url(${thumbnail})` }}
        >
          {isLive && <span className="live-tag-card">LIVE</span>}
        </div>
        <div className="card-info">
          <h3 className="card-title">{title}</h3>
          <div className="card-streamer">
            <span>{streamer}</span>
            {isLive && <span className="online-dot-small"></span>}
          </div>
          {/* HAPUS INI: Tombol "Tonton Sekarang" dari dalam kartu */}
          {/* <Link to={to} className="watch-now-button">
            Tonton Sekarang
          </Link> */}
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;