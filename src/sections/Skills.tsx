import { lazy, Suspense, useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { portfolio } from '../data/portfolio';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useSceneActivity } from '../hooks/useSceneActivity';
import { SceneBoundary } from '../components/SceneBoundary';

const SkillsCloud = lazy(() => import('../scenes/SkillsCloud'));
const tags = [...new Set(portfolio.skills.flatMap(group => group.skills))];

export default function Skills() {
  const reduced = useReducedMotion();
  const mobile = useMediaQuery('(max-width: 767px)', true);
  const { ref, active } = useSceneActivity();
  const [visited, setVisited] = useState(false);
  useEffect(() => { if (active) setVisited(true); }, [active]);
  const showCloud = !mobile && reduced === false;
  return <section id="skills" className="content-section page-width" aria-labelledby="skills-title">
    <div className="section-heading"><span className="section-index" aria-hidden="true">04</span><h2 id="skills-title">{portfolio.labels.skills}</h2></div>
    <div ref={ref} className="skills-cloud-region" hidden={!showCloud}>
      {showCloud && visited && <SceneBoundary fallback={<p className="cloud-fallback">{portfolio.labels.cloudFallback}</p>}><Suspense fallback={<p className="cloud-fallback">{portfolio.labels.cloudFallback}</p>}><SkillsCloud active={active} tags={tags} /></Suspense></SceneBoundary>}
    </div>
    <div className="skills-groups">{portfolio.skills.map((group, index) => <div className="skill-group" key={group.name}>
      <h3 id={`skill-group-${index}`}>{group.name}</h3>
      <ul aria-labelledby={`skill-group-${index}`}>{group.skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
    </div>)}</div>
  </section>;
}
