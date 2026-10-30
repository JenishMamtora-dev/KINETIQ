/**
 * SEO & Meta Tags Manager
 * Dynamically updates document title, description, OpenGraph, canonical links, and robots meta
 */

export interface SeoConfig {
  title: string;
  description: string;
  canonicalPath?: string;
  noIndex?: boolean;
  ogType?: 'website' | 'article';
}

export function applySeo({
  title,
  description,
  canonicalPath = '',
  noIndex = false,
  ogType = 'website',
}: SeoConfig) {
  if (typeof document === 'undefined') return;

  // Title
  document.title = `${title} | KINETIQ`;

  // Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', description);

  // Robots (noindex for dashboards/checkout/auth)
  let metaRobots = document.querySelector('meta[name="robots"]');
  if (!metaRobots) {
    metaRobots = document.createElement('meta');
    metaRobots.setAttribute('name', 'robots');
    document.head.appendChild(metaRobots);
  }
  metaRobots.setAttribute('content', noIndex ? 'noindex, nofollow' : 'index, follow');

  // Open Graph Title & Description
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', `${title} | KINETIQ`);

  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', description);

  let ogMetaType = document.querySelector('meta[property="og:type"]');
  if (ogMetaType) ogMetaType.setAttribute('content', ogType);

  // Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', `https://kinetiq.design${canonicalPath}`);
}
