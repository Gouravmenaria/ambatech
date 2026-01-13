
import React from 'react';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Services from '../sections/Services';
import TechStack from '../sections/TechStack';
import Portfolio from '../sections/Portfolio';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';

const LandingPage: React.FC = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <TechStack />
      <Portfolio />
      <Contact />
      <Footer />
    </>
  );
};

export default LandingPage;
