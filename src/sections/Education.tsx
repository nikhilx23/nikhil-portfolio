import { portfolio } from '../data/portfolio';

export default function Education() {
  return <section id="education" className="content-section page-width" aria-labelledby="education-title">
    <div className="section-heading"><span className="section-index" aria-hidden="true">05</span><h2 id="education-title">{portfolio.labels.education}</h2></div>
    {portfolio.education.map(education => <article className="education-entry" key={`${education.school}-${education.degree}`}>
      <div className="education-mark" aria-hidden="true"><svg viewBox="0 0 40 40" fill="none"><path d="m4 15 16-8 16 8-16 8-16-8Z M11 19v10c6 5 12 5 18 0V19 M36 15v14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg></div>
      <div className="education-copy"><h3>{education.degree}</h3><p>{education.school}</p><p className="education-location">{education.location}</p></div>
      <p className="education-dates">{education.dates}</p>
    </article>)}
  </section>;
}
