import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../components/header/zmd_logo.webp';
import logoDark from '../assets/images/brand/zmd-logo-dark.png';
import { contact, metadata, navigation, productFamilies } from './data';

function Brand({ footer = false }) {
  return (
    <Link className={`brand ${footer ? 'brand--footer' : ''}`} to="/" aria-label="ZMD home">
      <span className="brand__crop" aria-hidden="true">
        <img className="brand__image brand__image--surface" src={footer ? logoDark : logo} alt="" />
      </span>
    </Link>
  );
}

function DesktopNavigation({ productsOpen, setProductsOpen }) {
  const menuRef = useRef(null);
  const location = useLocation();
  const productsActive = location.pathname.startsWith('/products');

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (productsOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener('pointerdown', closeOnOutsideClick);
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick);
  }, [productsOpen, setProductsOpen]);

  return (
    <nav className="desktop-nav" aria-label="Primary navigation" ref={menuRef}>
      <div className="desktop-nav__item">
        <button
          className={`desktop-nav__link desktop-nav__trigger ${productsActive ? 'is-active' : ''}`}
          type="button"
          aria-expanded={productsOpen}
          aria-controls="products-menu"
          onClick={() => setProductsOpen((current) => !current)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setProductsOpen(false);
          }}
        >
          Products <span className="desktop-nav__chevron" aria-hidden="true" />
        </button>
        {productsOpen && (
          <div className="products-menu" id="products-menu">
            <div className="products-menu__intro">
              <strong>Hardware for Physical AI</strong>
              <Link to="/products" onClick={() => setProductsOpen(false)}>
                View all products <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="products-menu__grid">
              {productFamilies.map((family) => (
                <Link
                  className="products-menu__card"
                  key={family.slug}
                  to={family.to}
                  onClick={() => setProductsOpen(false)}
                >
                  <span
                    className={`products-menu__visual products-menu__visual--${family.slug}`}
                    aria-hidden="true"
                  >
                    <img src={family.menuImage} alt="" loading="eager" decoding="async" />
                  </span>
                  <strong>{family.slug === 'edge-devices' ? 'Compact Edge Systems' : family.name}</strong>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      {navigation.slice(1).filter((item) => item.label !== 'Contact').map((item) => (
        <NavLink
          key={item.to}
          className={({ isActive }) => `desktop-nav__link ${isActive ? 'is-active' : ''}`}
          to={item.to}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

function MobileNavigation({ open, setOpen, buttonRef }) {
  const drawerRef = useRef(null);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname, location.hash, setOpen]);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const drawer = drawerRef.current;
    const focusable = drawer?.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    focusable?.[0]?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab' || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [buttonRef, open, setOpen]);

  if (!open) return null;

  return (
    <div className="mobile-menu-layer">
      <button className="mobile-menu-layer__backdrop" type="button" aria-label="Close menu" onClick={() => setOpen(false)} />
      <nav className="mobile-menu" id="mobile-navigation" aria-label="Mobile navigation" ref={drawerRef}>
        <div className="mobile-menu__top">
          <span aria-hidden="true" />
          <button className="icon-button" type="button" onClick={() => setOpen(false)} aria-label="Close menu">
            ×
          </button>
        </div>
        <Link className="mobile-menu__main-link" to="/products" onClick={() => setOpen(false)}>
          Products <span aria-hidden="true">→</span>
        </Link>
        <div className="mobile-menu__products">
          {productFamilies.map((family) => (
            <Link key={family.slug} to={family.to} onClick={() => setOpen(false)}>
              <strong>{family.slug === 'edge-devices' ? 'Compact Edge Systems' : family.name}</strong>
            </Link>
          ))}
        </div>
        {navigation.slice(1).filter((item) => item.label !== 'Contact').map((item) => (
          <Link className="mobile-menu__main-link" key={item.to} to={item.to} onClick={() => setOpen(false)}>
            {item.label} <span aria-hidden="true">→</span>
          </Link>
        ))}
        <div className="mobile-menu__contact">
          <Link className="button button--primary button--wide" to="/contact" onClick={() => setOpen(false)}>
            Partner with ZMD <span aria-hidden="true">→</span>
          </Link>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
        </div>
      </nav>
    </div>
  );
}

export function SiteHeader() {
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const location = useLocation();

  useEffect(() => setProductsOpen(false), [location.pathname]);

  return (
    <header className={`site-header${location.pathname === '/edge-ai' ? ' site-header--edge-ai' : ''}`}>
      <div className="launch-strip">
        <Link to="/products/edge-devices">
          <span>Zevric</span>
          <em className="launch-strip__copy launch-strip__copy--desktop">Zevric Compact Edge Systems powered by Intel® Core™ Ultra Series 2</em>
          <em className="launch-strip__copy launch-strip__copy--mobile">Zevric Compact Edge Systems</em>
          <strong>View Zevric <i aria-hidden="true">→</i></strong>
        </Link>
      </div>
      <div className="site-container site-header__inner">
        <Brand />
        <DesktopNavigation productsOpen={productsOpen} setProductsOpen={setProductsOpen} />
        <Link className="button button--primary header-cta" to="/contact">
          Partner with ZMD <span aria-hidden="true">→</span>
        </Link>
        <button
          className="menu-button"
          type="button"
          ref={menuButtonRef}
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileOpen(true)}
        >
          <span />
          <span />
        </button>
      </div>
      <MobileNavigation open={mobileOpen} setOpen={setMobileOpen} buttonRef={menuButtonRef} />
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="site-footer__grid site-footer__grid--without-contact">
          <div className="site-footer__brand">
            <Brand footer />
          </div>
          <div>
            <Link className="site-footer__label site-footer__label--link" to="/products">Products</Link>
            <Link to="/products/cameras">Cameras</Link>
            <Link to="/products/edge-devices">Compact Edge Systems</Link>
            <Link to="/products/servers">AI Datacenter Servers</Link>
            <Link to="/products/custom-iot">Custom IoT Products</Link>
          </div>
          <div>
            <Link className="site-footer__label site-footer__label--link" to="/solutions">Solutions</Link>
            <Link to="/solutions#surveillance">Surveillance and Security</Link>
            <Link to="/solutions#industrial-ai">Industrial AI</Link>
            <Link to="/solutions#healthcare">Healthcare Operations</Link>
            <Link to="/solutions#retail-intelligence">Retail Intelligence</Link>
            <Link to="/solutions#smart-cities-mobility">Smart Cities and Mobility</Link>
            <Link to="/solutions#airport-operations">Airport Operations</Link>
          </div>
          <div>
            <Link className="site-footer__label site-footer__label--link" to="/about">About</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
        </div>
        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} ZETTAMICRO DEVICES PRIVATE LIMITED</span>
        </div>
      </div>
    </footer>
  );
}

export function RouteEffects() {
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
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter />
    </div>
  );
}
