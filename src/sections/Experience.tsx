import { portfolio } from '../data/portfolio';
import ExperienceLab from '../components/ExperienceLab';

export default function Experience() {
  return <section id="experience" className="content-section page-width experience-lab" aria-labelledby="experience-title">
    <p className="lab-eyebrow">{portfolio.lab.eyebrow}</p>
    <div className="section-heading"><h2 id="experience-title">{portfolio.lab.heading}</h2></div>
    <p className="lab-intro">{portfolio.lab.intro}</p>
    <ExperienceLab />
  </section>;
}
