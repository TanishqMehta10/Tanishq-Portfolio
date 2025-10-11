import React from 'react';
import Hero from './components/Hero';
import Navigation from './components/Navigation';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Background3D from './components/Background3D';
import CursorAnimation from './components/CursorAnimation';

function App() {
  return (
    <div className="relative min-h-screen bg-gray-900 overflow-x-hidden">
      <Background3D />
      <CursorAnimation />
      <Navigation />
      <Hero />
      <About />
      <Education />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;