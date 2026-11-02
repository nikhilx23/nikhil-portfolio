import { useRef, useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { portfolio } from '../data/portfolio';

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); button.current?.focus(); }
    };
    const onPointer = (event: PointerEvent) => {
      if (event.target instanceof Node && !nav.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onPointer); };
  }, [open]);
  return (
    <header className="site-header">
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      <nav ref={nav} className="nav-inner" aria-label={portfolio.labels.navigation} onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}>
        <a className="wordmark" href="#home" onClick={() => setOpen(false)}>{portfolio.identity.shortName}<span aria-hidden="true">.</span></a>
        <button ref={button} className="menu-toggle" aria-expanded={open} aria-controls="navigation-links" aria-label={open ? portfolio.labels.closeMenu : portfolio.labels.openMenu} onClick={() => setOpen(!open)}>
          <span aria-hidden="true">{open ? '×' : '☰'}</span>
        </button>
        <ul id="navigation-links" className={`nav-links ${open ? 'is-open' : ''}`}>
          {portfolio.navigation.map(item => <li key={item.id}><a href={`#${item.id}`} onClick={() => setOpen(false)}>{item.label}</a></li>)}
        </ul>
      </nav>
    </header>
  );
}
