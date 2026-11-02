import { lazy, Suspense, useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useSceneActivity } from '../hooks/useSceneActivity';
import { SceneBoundary } from './SceneBoundary';

const PipelineScene = lazy(() => import('../scenes/PipelineScene'));

export default function PipelineBackground({ paused = false }: { paused?: boolean }) {
  const reduced = useReducedMotion();
  const mobile = useMediaQuery('(max-width: 767px)', true);
  const { ref, active } = useSceneActivity();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const timeout = window.setTimeout(() => setReady(true), 250);
    return () => window.clearTimeout(timeout);
  }, []);
  return <div ref={ref} className="pipeline-background" aria-hidden="true">
    <svg className="pipeline-static" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M40 640 240 490 410 570 620 330 850 410 1100 170M240 490 210 230 470 100 620 330 760 120 1100 170M410 570 800 700 850 410 1170 600" />
        {[ [40,640], [240,490], [410,570], [620,330], [850,410], [1100,170], [210,230], [470,100], [760,120], [800,700], [1170,600] ].map(([cx,cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" fill="currentColor" />)}
      </g>
    </svg>
    {ready && reduced === false && !paused && <SceneBoundary><Suspense fallback={null}><PipelineScene active={active} mobile={mobile} /></Suspense></SceneBoundary>}
  </div>;
}
