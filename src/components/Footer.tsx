import { portfolio } from '../data/portfolio';

export default function Footer() {
  return <footer className="site-footer page-width">
    <p>© {new Date().getFullYear()} {portfolio.labels.copyright}</p>
    <a href="#home">{portfolio.labels.backToTop}<span aria-hidden="true">↑</span></a>
  </footer>;
}
