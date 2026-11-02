import { useState, type PointerEvent } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { portfolio } from '../data/portfolio';
import { assetUrl } from '../lib/assetUrl';

export default function Portrait() {
  const [failed, setFailed] = useState(false);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 120, damping: 20 });
  const rotateY = useSpring(y, { stiffness: 120, damping: 20 });
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set(-((event.clientY - bounds.top) / bounds.height - 0.5) * 12);
    y.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 12);
  };
  return <div className="portrait-perspective">
    <motion.div className="portrait" style={reduced ? undefined : { rotateX, rotateY }} onPointerMove={move} onPointerLeave={() => { x.set(0); y.set(0); }}>
      <div className="portrait-orbit" aria-hidden="true" />
      <div className="portrait-ring" aria-hidden="true" />
      <div className="portrait-image">
        {failed ? <div className="portrait-fallback" role="img" aria-label={portfolio.labels.portraitFallback}>{portfolio.identity.name.split(' ').filter(Boolean).map((w, i, a) => i === 0 || i === a.length - 1 ? w[0] : '').join('')}<span aria-hidden="true">.</span></div>
          : <img src={assetUrl(portfolio.identity.photo)} alt={portfolio.identity.photoAlt} width="640" height="640" fetchPriority="high" onError={() => setFailed(true)} />}
      </div>
    </motion.div>
    <p className="portrait-caption"><span aria-hidden="true" />{portfolio.hero.portraitCaption}</p>
  </div>;
}
