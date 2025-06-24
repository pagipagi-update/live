import React from 'react';
import { Link } from 'react-router-dom'; // Untuk link "Lihat Semua Promo"
import { promoArticles } from '../data/promoData'; // Impor data promosi
import './LatestPromosHomepage.css'; // File CSS baru untuk komponen ini

function LatestPromosHomepage() {
  // Ambil hanya 2 promo terbaru (asumsi promoArticles sudah urut terbaru di atas)
  const latestPromos = promoArticles.slice(0, 2);

  return (
    <section className="latest-promos-homepage-section">
      <div className="section-header-homepage"> {/* Header khusus untuk section ini */}
        <h2 className="homepage-section-title">Promo Terbaru</h2>
        <Link to="/promo-terbaru" className="view-all-button">Lihat Semua Promo > </Link>
      </div>
      
      <div className="promos-grid-homepage">
        {latestPromos.map((promo) => (
          <div key={promo.id} className="promo-card-homepage">
            <img src={promo.imageUrl} alt={promo.title} className="promo-card-image-homepage" />
            <div className="promo-card-content-homepage">
              <h3 className="promo-card-title-homepage">{promo.title}</h3>
              <p className="promo-card-excerpt-homepage">{promo.excerpt}</p>
              <a href={promo.link} className="claim-button-homepage">Klaim Sekarang!</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default LatestPromosHomepage;