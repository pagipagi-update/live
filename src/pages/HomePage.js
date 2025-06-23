import React from 'react';
import HeroSection from '../components/HeroSection';
import ContinueWatchingSection from '../components/ContinueWatchingSection';

function HomePage() {
  return (
    <>
      <HeroSection /> {/* Ini juga akan menggunakan gambar placeholder baru jika ada */}
      <ContinueWatchingSection /> {/* Akan diperbarui dari dalamnya */}
    </>
  );
}

export default HomePage;