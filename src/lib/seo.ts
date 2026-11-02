import { portfolio } from '../data/portfolio';

export function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export function seoMarkup(base: string) {
  const { seo, identity } = portfolio;
  const site = seo.siteUrl ? new URL(seo.siteUrl) : null;
  if (site && !['https:', 'http:'].includes(site.protocol)) throw new Error('seo.siteUrl must be an HTTP(S) URL');
  const imagePath = `${base}${seo.ogImage.replace(/^\/+/, '')}`;
  const image = site ? new URL(imagePath, site).href : imagePath;
  const meta = (name: string, value: string, property = false) => `<meta ${property ? 'property' : 'name'}="${name}" content="${escapeHtml(value)}" />`;
  const tags = [
    `<title>${escapeHtml(seo.title)}</title>`,
    meta('description', seo.description),
    meta('author', identity.name),
    meta('og:type', 'website', true),
    meta('og:title', seo.title, true),
    meta('og:description', seo.description, true),
    meta('og:site_name', identity.name, true),
    meta('og:image', image, true),
    meta('og:image:width', '1200', true),
    meta('og:image:height', '630', true),
    meta('og:image:alt', seo.ogImageAlt, true),
    meta('twitter:card', 'summary_large_image'),
    meta('twitter:title', seo.title),
    meta('twitter:description', seo.description),
    meta('twitter:image', image),
    meta('twitter:image:alt', seo.ogImageAlt),
    `<link rel="icon" type="image/svg+xml" href="${escapeHtml(base)}favicon.svg" />`,
  ];
  if (site) tags.push(`<link rel="canonical" href="${escapeHtml(site.href)}" />`, meta('og:url', site.href, true));
  const person = { '@context': 'https://schema.org', '@type': 'Person', name: identity.name, alternateName: identity.shortName, jobTitle: portfolio.hero.headlineAccent, email: `mailto:${identity.email}`, sameAs: [identity.linkedin, identity.github], ...(site ? { url: site.href } : {}) };
  tags.push(`<script type="application/ld+json">${JSON.stringify(person).replace(/</g, '\\u003c')}</script>`);
  return tags.join('\n');
}

export function socialImageSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs><radialGradient id="glow"><stop stop-color="#163d21"/><stop offset="1" stop-color="#05080A"/></radialGradient><pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#163020"/></pattern></defs>
    <rect width="1200" height="630" fill="url(#glow)"/><rect width="1200" height="630" fill="url(#grid)"/>
    <path d="M830 450 950 260 1100 320 1040 110M950 260 780 170" stroke="#39FF14" stroke-opacity=".5" fill="none"/>
    <g fill="#39FF14"><circle cx="830" cy="450" r="6"/><circle cx="950" cy="260" r="8"/><circle cx="1100" cy="320" r="6"/><circle cx="1040" cy="110" r="6"/><circle cx="780" cy="170" r="6"/></g>
    <rect x="72" y="90" width="52" height="4" fill="#39FF14"/>
    <g font-family="Arial, sans-serif"><text x="72" y="220" fill="#D7E0DA" font-size="48" font-weight="700">${escapeHtml(portfolio.identity.shortName)}</text>
    <text x="72" y="315" fill="#39FF14" font-size="70" font-weight="700">${escapeHtml(portfolio.hero.headlineAccent)}</text>
    <text x="72" y="405" fill="#D7E0DA" font-size="22">${escapeHtml(portfolio.identity.title)}</text>
    <text x="72" y="530" fill="#A7B5AC" font-size="20">${escapeHtml(portfolio.identity.location)}</text></g>
  </svg>`;
}
