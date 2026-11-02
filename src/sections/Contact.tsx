import { portfolio } from '../data/portfolio';

export default function Contact() {
  return <section id="contact" className="content-section page-width contact-section" aria-labelledby="contact-title">
    <div className="section-heading"><span className="section-index" aria-hidden="true">06</span><h2 id="contact-title">{portfolio.contact.heading}</h2></div>
    <p className="contact-closing">{portfolio.contact.closing}</p>
    <a className="contact-email" href={`mailto:${portfolio.identity.email}`}>{portfolio.identity.email}</a>
    <div className="contact-actions">
      <a className="button button-primary" href={`mailto:${portfolio.identity.email}`}>{portfolio.contact.emailLabel}<span aria-hidden="true">↗</span></a>
      <a className="button button-secondary" href={portfolio.identity.linkedin} target="_blank" rel="noopener noreferrer">{portfolio.contact.linkedinLabel}<span aria-hidden="true">↗</span></a>
      <a className="button button-secondary" href={portfolio.identity.github} target="_blank" rel="noopener noreferrer">{portfolio.contact.githubLabel}<span aria-hidden="true">↗</span></a>
    </div>
    <p className="contact-location">{portfolio.identity.location}</p>
  </section>;
}
