import { lazy, Suspense, useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { SceneBoundary } from './SceneBoundary';

const SpatialScene = lazy(()=>import('../scenes/SpatialScene'));
export default function SpatialBackground({paused}:{paused:boolean}) {
  const reduced=useReducedMotion();
  const mobile=useMediaQuery('(max-width: 767px)',true);
  const [ready,setReady]=useState(false);
  const [visible,setVisible]=useState(true);
  useEffect(()=>{
    const timer=window.setTimeout(()=>setReady(true),700);
    const change=()=>setVisible(!document.hidden);
    change(); document.addEventListener('visibilitychange',change);
    return ()=>{clearTimeout(timer);document.removeEventListener('visibilitychange',change);};
  },[]);
  return <div className="spatial-background" aria-hidden="true">
    <div className="spatial-static"/>
    {ready&&!mobile&&reduced===false&&<SceneBoundary><Suspense fallback={null}><SpatialScene moving={!paused&&visible}/></Suspense></SceneBoundary>}
  </div>;
}
