import { useEffect, useRef, useState } from 'react';

export function useSceneActivity() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  useEffect(() => {
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (observer && ref.current) observer.observe(ref.current);
    if (!observer) setVisible(true);
    const update = () => setPageVisible(document.visibilityState === 'visible');
    update();
    document.addEventListener('visibilitychange', update);
    return () => { observer?.disconnect(); document.removeEventListener('visibilitychange', update); };
  }, []);
  return { ref, active: visible && pageVisible };
}
