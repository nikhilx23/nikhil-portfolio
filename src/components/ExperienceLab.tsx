import { lazy, Suspense, useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { portfolio } from '../data/portfolio';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useSceneActivity } from '../hooks/useSceneActivity';
import { SceneBoundary } from './SceneBoundary';
import HighlightedText from './HighlightedText';

const InventorLab = lazy(()=>import('../scenes/InventorLab'));
const copy = portfolio.lab;

function StaticLab() {
  return <svg viewBox="0 0 640 330" className="static-lab" aria-hidden="true">
    <path d="M55 120 190 60 430 60 575 120" fill="none" stroke="#236c4d" strokeWidth="2" />
    {[55,190,430,575].map((x,i)=><g key={x} transform={`translate(${x},${i===0||i===3?120:60})`}><rect x="-22" y="-24" width="44" height="48" rx="7" fill="#15442f" stroke="#39ff14"/><path d="M-12-10H12M-12 0H12M-12 10H6" stroke="#7dffc3" /></g>)}
    <ellipse cx="320" cy="300" rx="190" ry="20" fill="#103026" />
    <path d="M180 235H465M200 235V300M445 235V300" stroke="#29775b" strokeWidth="10"/>
    <rect x="280" y="115" width="150" height="100" rx="10" fill="#0a302a" stroke="#00ff9c" strokeWidth="2"/>
    <path d="M302 140H400M302 160H380M302 180H390" stroke="#39ff14" strokeWidth="4"/>
    <rect x="230" y="232" width="65" height="60" rx="10" fill="#174236"/>
    <path d="M245 218V263M278 218V263" stroke="#19374c" strokeWidth="18"/>
    <rect x="233" y="165" width="58" height="68" rx="20" fill="#20a17c"/>
    <circle cx="261" cy="139" r="31" fill="#cf9872"/>
    <path d="M230 137Q225 94 265 105Q300 107 291 139L276 117Z" fill="#13221c"/>
    <circle cx="273" cy="138" r="3" fill="#10201a"/>
    <path d="M278 189 311 222" stroke="#20a17c" strokeWidth="17" strokeLinecap="round"/>
    <circle cx="316" cy="223" r="9" fill="#cf9872"/>
  </svg>;
}

export default function ExperienceLab() {
  const [selected,setSelected]=useState(0);
  const [step,setStep]=useState(0);
  const [running,setRunning]=useState(false);
  const [visited,setVisited]=useState(false);
  const reduced=useReducedMotion();
  const mobile=useMediaQuery('(max-width: 767px)',true);
  const {ref,active}=useSceneActivity();
  const mission=copy.missions[selected];
  const role=portfolio.experience.find(item=>item.id===mission.id)!;
  const stage=mission.stages[step];
  useEffect(()=>{if(active)setVisited(true);},[active]);
  useEffect(()=>{
    if(!running || !active || reduced) return;
    const timer=window.setTimeout(()=>{
      if(step===mission.stages.length-1) setRunning(false);
      else setStep(step+1);
    },6000);
    return ()=>window.clearTimeout(timer);
  },[running,active,reduced,step,mission.stages.length]);
  useEffect(()=>{if(reduced)setRunning(false);},[reduced]);
  return <>
    <div className="mission-selector" role="group" aria-label={copy.heading}>
      {copy.missions.map((item,index)=>{
        const position=portfolio.experience.find(r=>r.id===item.id)!;
        return <button type="button" key={item.id} data-theme={index} aria-pressed={index===selected} onClick={()=>{setSelected(index);setStep(0);setRunning(false);}}>
          <span className="mission-number">0{index+1}</span><span><strong>{position.company}</strong><small>{position.title}</small></span><span aria-hidden="true">↗</span>
        </button>;
      })}
    </div>
    <article className="mission" data-theme={selected} aria-labelledby="mission-title">
      <header className="mission-heading"><div><p className="mission-role">{role.company} / {role.title}</p><h3 id="mission-title">{mission.title}</h3><p className="mission-quip">{mission.quip}</p></div><p className="mission-dates">{role.dates}<br/>{role.location}</p></header>
      <div className="mission-workspace">
        <div className="mission-narrative">
          <div className="story-block"><p className="story-label">{copy.problemLabel}</p><p>{mission.problem}</p></div>
          <div className="story-block"><p className="story-label">{copy.buildLabel}</p><p>{mission.built}</p></div>
        </div>
        <div className="mission-visual" ref={ref}>
          <div className="lab-stage" role="img" aria-label={copy.sceneLabel}>
            <div className="lab-static"><StaticLab /></div>
            {!mobile && reduced===false && visited && <div className="lab-canvas" aria-hidden="true"><SceneBoundary><Suspense fallback={null}><InventorLab accent={portfolio.visual.themes[selected]} step={step} moving={running} active={active} /></Suspense></SceneBoundary></div>}
          </div>
          <p className="lab-caption">{copy.illustrationLabel}</p>
          <div className="lab-status"><span aria-hidden="true">⌘</span><p>{stage.joke}</p></div>
          <div className="lab-controls">
            {!reduced && <button type="button" className="button button-primary" onClick={()=>{if(step===3&&!running)setStep(0);setRunning(!running);}} aria-pressed={running}>{running?copy.pause:copy.play}<span aria-hidden="true">{running?'Ⅱ':'▶'}</span></button>}
            <button type="button" className="lab-reset" onClick={()=>{setStep(0);setRunning(false);}}>{copy.reset}</button>
          </div>
        </div>
      </div>
      <div className="process-steps" role="group" aria-label={copy.stepLabel}>{mission.stages.map((item,index)=><button type="button" key={item.label} aria-pressed={step===index} onClick={()=>{setStep(index);setRunning(false);}}><span>0{index+1}</span><strong>{item.label}</strong><small>{item.tool}</small></button>)}</div>
      <div className="process-explanation"><span className="process-beacon" aria-hidden="true"/><div><h4>{stage.tool}</h4><p>{stage.text}</p></div></div>
      <div className="mission-impact"><p className="story-label">{copy.impactLabel}</p><div>{mission.impact.map(metric=><div key={metric.label}><strong>{metric.value}</strong><p>{metric.label}</p></div>)}</div></div>
      <div className="toolbox"><h4>{copy.tradeoffLabel}</h4><p className="tradeoff-note">{copy.tradeoffNote}</p><div className="toolbox-grid">{mission.tools.map(tool=><details key={tool.name}><summary><span>{tool.name}</span><span aria-hidden="true">+</span></summary><div className="tool-choice"><h5>{copy.usedLabel}</h5><p>{tool.why}</p><h5>{tool.alternative}</h5><p className="alternative-label">{copy.alternativeLabel}</p><p>{tool.when}</p>{'source' in tool && <a href={tool.source} target="_blank" rel="noopener noreferrer">{portfolio.lab.sourceLabel} ↗</a>}</div></details>)}</div></div>
      <details className="original-details"><summary>{copy.detailsLabel}</summary><p>{role.project}</p><ul>{role.bullets.map(bullet=><li key={bullet}><HighlightedText text={bullet}/></li>)}</ul></details>
    </article>
  </>;
}
