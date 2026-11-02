import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { portfolio } from '../data/portfolio';
import { assetUrl } from '../lib/assetUrl';
import Portrait from '../components/Portrait';
import PipelineBackground from '../components/PipelineBackground';

let welcomePlayed = false;
function Welcome() {
  const reduced = useReducedMotion();
  const text = portfolio.hero.welcome;
  const characters = Array.from(text);
  const [length, setLength] = useState(welcomePlayed ? characters.length : 0);
  useEffect(() => {
    if (reduced === null) return;
    if (reduced || welcomePlayed) { setLength(Array.from(text).length); return; }
    let index = 0;
    const interval = window.setInterval(() => {
      index++;
      setLength(index);
      if (index >= Array.from(text).length) { welcomePlayed = true; window.clearInterval(interval); }
    }, 28);
    return () => window.clearInterval(interval);
  }, [reduced, text]);
  return <div className="welcome"><span className="sr-only">{text}</span><span className="welcome-sizer" aria-hidden="true">{text}</span><span className="welcome-typed" aria-hidden="true">{characters.slice(0,length).join('')}<span className={length < characters.length ? 'typing-cursor' : 'typing-cursor finished'} /></span></div>;
}

function ResumeLink() {
  const [available, setAvailable] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    // Check PDF signature: Vite may return index.html with 200 for missing assets.
    fetch(assetUrl(portfolio.identity.resume), { signal: controller.signal, headers: { Range: 'bytes=0-4' } })
      .then(async response => {
        if (!response.ok || !response.body) return;
        const reader = response.body.getReader();
        let prefix = '';
        while (prefix.length < 5) {
          const result = await reader.read();
          if (result.done) break;
          prefix += new TextDecoder().decode(result.value.slice(0, 5 - prefix.length));
        }
        await reader.cancel();
        if (!controller.signal.aborted) setAvailable(prefix === '%PDF-');
      }).catch(() => {});
    return () => controller.abort();
  }, []);
  return available ? <a className="button button-secondary" href={assetUrl(portfolio.identity.resume)} download>{portfolio.hero.resumeLabel}<span aria-hidden="true">↓</span></a>
    : <span className="resume-unavailable"><button className="button button-secondary" disabled aria-describedby="resume-status">{portfolio.hero.resumeLabel}<span aria-hidden="true">↓</span></button><span id="resume-status">{portfolio.labels.unavailableResume}</span></span>;
}

export default function Hero({ paused }: { paused: boolean; onToggle?: () => void }) {
  const reduced = useReducedMotion();
  return <section id="home" className="hero" data-paused={paused || reduced ? 'true' : 'false'} aria-labelledby="hero-title">
    <PipelineBackground paused={paused} />
    <div className="hero-shade" aria-hidden="true" />
    <div className="hero-grid page-width">
      <motion.div className="hero-copy" initial={false} animate={{ opacity: 1, y: 0 }}>
        <p className="eyebrow"><span aria-hidden="true" />{portfolio.identity.location}</p>
        <Welcome />
        <h1 id="hero-title">{portfolio.hero.headlineFirst}<br /><span>{portfolio.hero.headlineAccent}</span></h1>
        <p className="hero-description">{portfolio.hero.description}</p>
        <p className="hero-stack">{portfolio.identity.title}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#projects">{portfolio.hero.projectsLabel}<span aria-hidden="true">↗</span></a>
          <ResumeLink />
          <a className="connect-link" href="#contact">{portfolio.hero.contactLabel}<span aria-hidden="true">↗</span></a>
        </div>
      </motion.div>
      <motion.div className="hero-portrait" initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.7 }}><Portrait /></motion.div>
    </div>
    <div className="hero-bottom page-width"><span>{portfolio.identity.name}</span><a href="#about">{portfolio.hero.scrollLabel}<span aria-hidden="true">↓</span></a></div>
  </section>;
}
