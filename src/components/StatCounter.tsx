import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import type { Portfolio } from '../data/portfolio';

type Stat = Portfolio['about']['stats'][number];

export default function StatCounter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(stat.value);
  useEffect(() => {
    if (!inView || reduced !== false) { setDisplayValue(stat.value); return; }
    let frame = 0;
    let started: number | null = null;
    const tick = (time: number) => {
      if (started === null) started = time;
      const progress = Math.min((time - started) / 1100, 1);
      setDisplayValue(Math.round(stat.value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, stat.value]);
  return <div ref={ref} className="stat">
    {/* One stable accessible value; animation is purely decorative. */}
    <dt className="sr-only">{stat.accessibleLabel}</dt>
    <dd aria-hidden="true">
      <span className="stat-number">{stat.prefix}{reduced ? stat.value : displayValue}{stat.suffix}</span>
      <span className="stat-label">{stat.label}</span>
    </dd>
  </div>;
}
