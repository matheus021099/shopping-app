import React from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import ContactSection from './ContactSection';
import BackgroundSection from './BackgroundSection';

const Home = () => (
  <div>
    <Header />
    <BackgroundSection>
      <HeroSection />
      <FeaturesSection />
    </BackgroundSection>
    <ContactSection />
  </div>
);

export default Home;

