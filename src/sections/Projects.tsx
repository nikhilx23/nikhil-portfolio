import { lazy, Suspense, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { portfolio } from '../data/portfolio';
import { useSceneActivity } from '../hooks/useSceneActivity';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { SceneBoundary } from '../components/SceneBoundary';
import ProjectCard from '../components/ProjectCard';
import InvestigatorStory from '../components/InvestigatorStory';

const ProjectLabScene=lazy(()=>import('../scenes/ProjectLabScene'));
export default function Projects({paused=false}:{paused?:boolean}) {
  const [selected,setSelected]=useState(0);
  const {ref,active}=useSceneActivity();
  const reduced=useReducedMotion();
  const mobile=useMediaQuery('(max-width: 767px)',true);
  const copy=portfolio.projectLab;
  const project=portfolio.projects[selected];
  return <section id="projects" className="content-section page-width" aria-labelledby="projects-title">
    <div className="section-heading"><span className="section-index" aria-hidden="true">03</span><h2 id="projects-title">{portfolio.labels.projects}</h2></div>
    <div className="project-lab" ref={ref} data-paused={paused||reduced||!active}>
      <header className="project-lab-header"><p className="story-label">{copy.eyebrow}</p><h3>{copy.title}</h3><p>{copy.intro}</p></header>
      <div className="project-lab-room" aria-hidden="true">
        <div className="lab-room-fallback"><div className="lab-room-racks"/><svg viewBox="0 0 1000 300" preserveAspectRatio="none" className="lab-room-pipes">{[180,500,820].map((x,i)=><g key={x} style={{color:portfolio.visual.themes[i]}}><path d={`M${x} 280V140Q${x} 60 500 60V20`} fill="none" stroke="currentColor" strokeWidth="3"/><path className="pipe-packets" d={`M${x} 280V140Q${x} 60 500 60V20`} fill="none" stroke="currentColor" strokeWidth="7" strokeDasharray="4 70"/></g>)}</svg><div className="lab-room-terminals">{copy.stations.map((s,i)=><div key={s.id} className="lab-room-terminal" data-station={i}><div className="terminal-screen"><span>0{i+1}</span><i/><i/><i/></div><div className="terminal-stand"/><div className="terminal-desk"/></div>)}</div></div>
        {!mobile&&active&&<div className="project-lab-canvas"><SceneBoundary><Suspense fallback={null}><ProjectLabScene selected={selected} onSelect={setSelected} moving={active&&!paused&&!reduced}/></Suspense></SceneBoundary></div>}
      </div>
      <div className="lab-station-controls" role="group" aria-label={copy.selectLabel}>{copy.stations.map((s,i)=><button type="button" key={s.id} data-station={i} aria-pressed={selected===i} aria-controls="lab-project-detail" onClick={()=>setSelected(i)}><span className="station-index">0{i+1} <span aria-hidden="true">↗</span></span><strong>{s.name}</strong><small>{s.description}</small><span className="station-action">{selected===i?copy.selectedLabel:copy.openLabel}</span></button>)}</div>
      <div className="lab-room-caption"><p>{copy.caption}</p><a href="#lab-project-detail">{copy.readLabel} <span aria-hidden="true">↓</span></a></div>
    </div>
    <div className="lab-selection-status" role="status">{copy.viewingLabel} {copy.stations[selected].name}</div>
    <div id="lab-project-detail" className="lab-project-detail" key={project.id}>{project.id==='dataops-investigator'?<InvestigatorStory project={project}/>:<ProjectCard project={project}/>}</div>
  </section>;
}
