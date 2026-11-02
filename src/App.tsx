import { useState } from 'react';
import { MotionConfig, useReducedMotion } from 'framer-motion';
import SpatialBackground from './components/SpatialBackground';
import { portfolio } from './data/portfolio';
import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Education from './sections/Education';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import Footer from './components/Footer';

export default function App() {
  const [paused,setPaused]=useState(false);
  const reduced=useReducedMotion();
  return <MotionConfig reducedMotion="user"><div className="portfolio-space" data-motion-paused={paused||reduced?'true':'false'}>
    <SpatialBackground paused={paused}/>
    <a className="skip-link" href="#main-content">{portfolio.labels.skipToContent}</a>
    <Navigation />
    <main id="main-content" tabIndex={-1}>
      <Hero paused={paused} onToggle={()=>setPaused(!paused)}/>
      <About />
      <Experience />
      <Projects paused={paused}/>
      <Skills />
      <Education />
      <Contact />
    </main>
    <Footer />
    {!reduced&&<button className="space-motion-toggle" type="button" aria-pressed={paused} onClick={()=>setPaused(!paused)}>{paused?portfolio.visual.resume:portfolio.visual.pause}</button>}
  </div></MotionConfig>;
}
