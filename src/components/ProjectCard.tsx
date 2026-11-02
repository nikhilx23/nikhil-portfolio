import { useState, type PointerEvent } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { portfolio, type Project } from '../data/portfolio';
import { assetUrl } from '../lib/assetUrl';
import HighlightedText from './HighlightedText';

function Screenshot({ screenshot }: { screenshot: Project['screenshots'][number] }) {
  const [failed, setFailed] = useState(false);
  return <figure className="project-screenshot">
    {failed ? <div className="screenshot-placeholder"><span aria-hidden="true">▧</span><p>{portfolio.labels.unavailableScreenshot}</p></div>
      : <a href={assetUrl(screenshot.src)} target="_blank" rel="noopener noreferrer"><img src={assetUrl(screenshot.src)} alt={screenshot.alt} width="1280" height="720" loading="lazy" decoding="async" onError={() => setFailed(true)} /></a>}
    <figcaption>{screenshot.alt}</figcaption>
  </figure>;
}

export default function ProjectCard({ project }: { project: Project }) {
  const [chapter, setChapter] = useState(0);
  const story = project.story;
  const scene = story?.chapters[chapter];
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 140, damping: 22 });
  const rotateY = useSpring(y, { stiffness: 140, damping: 22 });
  const reset = () => { x.set(0); y.set(0); };
  const tilt = (event: PointerEvent<HTMLElement>) => {
    if (reduced || event.pointerType !== 'mouse' || window.matchMedia('(max-width: 767px)').matches) return;
    if (event.currentTarget.contains(document.activeElement)) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const limit = project.featured ? 2 : 3;
    x.set(-(event.clientY - rect.top - rect.height / 2) / rect.height * limit);
    y.set((event.clientX - rect.left - rect.width / 2) / rect.width * limit);
  };
  return <div className={`project-perspective ${project.featured ? 'project-featured' : ''}`}>
    <motion.article className="project-card" aria-labelledby={`${project.id}-title`} style={reduced ? undefined : { rotateX, rotateY }} onPointerMove={tilt} onPointerLeave={reset} onPointerCancel={reset} onFocusCapture={reset}>
      {project.featured && <p className="featured-badge"><span aria-hidden="true">✦</span>{portfolio.labels.featured}</p>}
      <h3 id={`${project.id}-title`}>{project.name}</h3>
      <ul className="project-tags" aria-label={portfolio.labels.technologies}>{project.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul>
      {story && scene ? <div className="project-narrative">
        <h4>{story.hook}</h4><p>{story.intro}</p><p className="project-scope">{story.scope}</p>
        <div className="project-chapters" role="group" aria-label={portfolio.labels.projectJourney}>{story.chapters.map((item,index)=><button type="button" key={item.label} aria-pressed={chapter===index} onClick={()=>setChapter(index)}><span aria-hidden="true">0{index+1} / </span>{item.label}</button>)}</div>
        <div className="project-chapter" aria-live="polite" aria-atomic="true"><h5>{scene.title}</h5><p>{scene.text}</p><ol className="project-flow">{scene.nodes.map(node=><li key={node}>{node}</li>)}</ol></div>
        <div className="project-evidence"><strong>{portfolio.labels.projectEvidence}</strong><p>{story.evidence}</p></div>
        <details className="original-details"><summary>{portfolio.labels.projectDetails}</summary><p>{story.why}</p><ul className="project-bullets">{project.bullets.map(bullet=><li key={bullet}><HighlightedText text={bullet}/></li>)}</ul><a href={story.source} target="_blank" rel="noopener noreferrer">{portfolio.labels.projectSource}</a></details>
      </div> : <ul className="project-bullets">{project.bullets.map(bullet => <li key={bullet}><HighlightedText text={bullet} /></li>)}</ul>}
      {project.screenshots.length > 0 && <div className="project-screenshots">{project.screenshots.map(screenshot => <Screenshot key={screenshot.src} screenshot={screenshot} />)}</div>}
      <div className="project-links">
        {project.github ? <a className="button button-secondary" href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${portfolio.labels.github}: ${project.name}`}>{portfolio.labels.github}<span aria-hidden="true">↗</span></a>
          : <span className="project-link-missing">{portfolio.labels.github}: {portfolio.labels.unavailableLink}</span>}
        {project.dashboard && <a className="button button-secondary" href={project.dashboard} target="_blank" rel="noopener noreferrer">{portfolio.labels.dashboardSource}<span aria-hidden="true">↗</span></a>}
      </div>
    </motion.article>
  </div>;
}
