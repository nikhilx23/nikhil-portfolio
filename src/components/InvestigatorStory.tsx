import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { portfolio, type Project } from '../data/portfolio';
import ProjectCard from './ProjectCard';

export default function InvestigatorStory({ project }: { project: Project }) {
  const [chapter, setChapter] = useState(0);
  const reduced = useReducedMotion();
  const copy = portfolio.investigator;
  const scene = copy.chapters[chapter];
  return <article className="investigator-story" aria-labelledby="investigator-title">
    <header className="investigator-header">
      <p className="lab-eyebrow">{copy.eyebrow}</p>
      <p className="investigator-name">{copy.name}</p>
      <h3 id="investigator-title">{copy.title}</h3>
      <p className="investigator-subtitle">{copy.subtitle}</p>
      <p className="investigator-intro">{copy.intro}</p>
      <p className="project-scope">{copy.scope}</p>
    </header>
    <div className="case-navigation" role="group" aria-label={copy.prompt}>
      {copy.chapters.map((item,index)=><button key={item.label} type="button" aria-pressed={index===chapter} onClick={()=>setChapter(index)}><span>0{index+1}</span>{item.label}</button>)}
    </div>
    <div className="case-workspace">
      <div className="case-copy" aria-live="polite" aria-atomic="true">
        <h4>{scene.title}</h4><p>{scene.text}</p>
        <blockquote>{scene.quip}</blockquote>
        <button className="button button-primary" type="button" onClick={()=>setChapter((chapter+1)%copy.chapters.length)}>{chapter===copy.chapters.length-1?copy.reset:copy.next}<span aria-hidden="true">→</span></button>
      </div>
      <div className="case-evidence">
        <div className="case-status"><span aria-hidden="true"/> {scene.status}</div>
        <motion.div className="evidence-map" key={chapter} initial={reduced?false:{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:.25}}>
          {scene.nodes.map((node,index)=><div className="evidence-node" key={node}><span className="evidence-symbol" aria-hidden="true">{chapter===0?['!','↳','◷'][index]:['◎','⌘','✓'][index]}</span><strong>{node}</strong>{index<2&&<span className="evidence-connector" aria-hidden="true">↓</span>}</div>)}
        </motion.div>
        <h5>{copy.evidenceLabel}</h5><p>{scene.evidence}</p><small>{copy.demoLabel}</small>
      </div>
    </div>
    <div className="investigator-stack"><p className="story-label">{copy.stackLabel}</p><ol>{copy.stack.map(item=><li key={item}>{item}</li>)}</ol></div>
    <div className="investigator-results"><h4>{copy.resultsLabel}</h4><div className="case-metrics">{copy.metrics.map(item=><div key={item.label}><strong>{item.value}</strong><p>{item.label}</p></div>)}</div><p className="tradeoff-note">{copy.resultNote}</p></div>
    <div className="investigator-lesson"><p className="story-label">{copy.lessonLabel}</p><p>{copy.lesson}</p></div>
    {project.github&&<a className="button button-secondary" href={project.github} target="_blank" rel="noopener noreferrer">{copy.githubLabel}<span aria-hidden="true">↗</span></a>}
    <details className="original-details"><summary>{copy.detailLabel}</summary><ProjectCard project={project}/></details>
  </article>;
}
