// src/pages/PromoPage.js
import React from 'react';
import './PageStyles.css'; 
import './PromoPage.css'; // Styling spesifik untuk halaman promo
import { promoArticles } from '../data/promoData'; // UBAH INI: Impor data promosi

function PromoPage() {
  return (
    <div className="page-container">
      <h1 className="page-title">Promo Terbaru</h1>
      <p className="page-description">Jangan lewatkan berbagai penawaran menarik dan bonus spesial dari Bola88!</p>

      <div className="promo-grid-container"> {/* Class ini dari PromoPage.css */}
        {promoArticles.map((promo) => ( // Gunakan promoArticles yang diimpor
          <div key={promo.id} className="promo-card"> {/* Class ini dari PromoPage.css */}
            <img src={promo.imageUrl} alt={promo.title} className="promo-card-image" />
            <div className="promo-card-content">
              <h3 className="promo-card-title">{promo.title}</h3>
              <p className="promo-card-date">{promo.date}</p>
              <p className="promo-card-excerpt">{promo.excerpt}</p>
              <a href={promo.link} className="read-more-link">Klaim Sekarang! ></a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PromoPage;