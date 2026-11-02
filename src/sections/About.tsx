import { portfolio } from '../data/portfolio';
import StatCounter from '../components/StatCounter';

export default function About() {
  return <section id="about" className="content-section page-width about-section" aria-labelledby="about-title">
    <div className="section-heading"><span className="section-index" aria-hidden="true">01</span><h2 id="about-title">{portfolio.about.heading}</h2></div>
    <div className="about-copy"><p>{portfolio.about.shortSummary}</p></div>
    <dl className="stats-grid">{portfolio.about.stats.map(stat => <StatCounter key={stat.accessibleLabel} stat={stat} />)}</dl>
  </section>;
}
