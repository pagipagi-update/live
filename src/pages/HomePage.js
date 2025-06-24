import React from 'react';
import HeroSection from '../components/HeroSection';
import ContinueWatchingSection from '../components/ContinueWatchingSection';
import QuickAccessMenu from '../components/QuickAccessMenu';
import LatestPromosHomepage from '../components/LatestPromosHomepage'; // IMPOR KOMPONEN BARU INI

function HomePage() {
  return (
    <>
      <HeroSection />
      <ContinueWatchingSection />
      <QuickAccessMenu />
      <LatestPromosHomepage /> {/* TAMBAHKAN KOMPONEN INI DI SINI */}
    </>
  );
}

export default HomePage;