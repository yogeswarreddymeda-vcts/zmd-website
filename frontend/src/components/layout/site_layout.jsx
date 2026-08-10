import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { metadata } from '../../data/site_data';
import Footer from '../footer/footer';
import Header from '../header/header';

function RouteEffects() {
  const location = useLocation();

  useEffect(() => {
    const basePath = location.pathname.replace(/\/$/, '') || '/';
    let pageMeta = metadata[basePath];
    if (!pageMeta && basePath.startsWith('/products/cameras/')) {
      pageMeta = { title: 'Camera Product | ZMD', description: 'Explore a ZMD camera platform.' };
    }
    if (!pageMeta && basePath.startsWith('/products/edge-devices/')) {
      pageMeta = { title: 'Zevric Compact Edge Systems | ZMD', description: 'Explore the Zevric Compact Edge Systems product line.' };
    }
    if (!pageMeta && basePath.startsWith('/solutions/')) {
      pageMeta = { title: 'Physical AI Solution | ZMD', description: 'Explore a physical AI reference solution built on ZMD hardware.' };
    }
    if (!pageMeta) pageMeta = metadata['*'];

    document.title = pageMeta.title;

    const setMetaContent = (attribute, key, content) => {
      let element = document.querySelector(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const canonicalUrl = `https://zmd.tech${basePath === '/' ? '' : basePath}`;
    setMetaContent('name', 'description', pageMeta.description);
    setMetaContent('property', 'og:title', pageMeta.title);
    setMetaContent('property', 'og:description', pageMeta.description);
    setMetaContent('property', 'og:url', canonicalUrl);
    setMetaContent('name', 'twitter:title', pageMeta.title);
    setMetaContent('name', 'twitter:description', pageMeta.description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    if (location.hash) {
      window.requestAnimationFrame(() => document.querySelector(location.hash)?.scrollIntoView());
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      window.requestAnimationFrame(() => document.querySelector('h1')?.focus({ preventScroll: true }));
    }
  }, [location.pathname, location.hash]);

  return null;
}

export function SiteLayout({ children }) {
  return (
    <div className="site-root">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <RouteEffects />
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  );
}
