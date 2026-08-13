// =============================================================================
// GLOBAL WEBSITE HEADER AND NAVIGATION
// =============================================================================

import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import cameraFamilyContext from '../../assets/images/cam/final_banner.webp';
import edgeSmall from '../../assets/images/edge-devices/edge_box_small.webp';
import edgeSharedPlatform from '../../assets/images/edge-devices/zevric-shared-platform-transparent.webp';
import serverBlueprintFront from '../../assets/images/servers/blueprint_front.webp';
import parkingSensorContext from '../../assets/images/custom-iot/parking-sensor-context.webp';
import cameraStudio from '../../assets/images/shared/product-family/camera-studio-v2.webp';
import parkingSensorStudio from '../../assets/images/shared/product-family/parking-sensor-studio-v1.webp';
import homeServerIndustrial from '../../assets/images/home/home-server-context-v2.webp';
import logo from '../../assets/images/shared/zmd-logo-light-optimized.png';

const contact = {
  email: 'sales@zmd.tech',
  phone: '+91 99403 52194',
  phoneHref: '+919940352194',
};


// =============================================================================
// DESKTOP NAVIGATION
// =============================================================================

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


// =============================================================================
// MOBILE NAVIGATION
// =============================================================================

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


// =============================================================================
// HEADER ASSEMBLY
// =============================================================================

export default function Header() {
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const location = useLocation();
  const normalizedPathname = location.pathname.replace(/\/+$/, '') || '/';

  useEffect(() => setProductsOpen(false), [location.pathname]);

  return (
    <header className={`site-header${normalizedPathname === '/edge-ai' ? ' site-header--edge-ai' : ''}`}>
      <div className="launch-strip">
        <Link to="/products/edge-devices">
          <span>Zevric</span>
          <em className="launch-strip__copy launch-strip__copy--desktop">Zevric Compact Edge Systems powered by Intel® Core™ Ultra Series 2</em>
          <em className="launch-strip__copy launch-strip__copy--mobile">Zevric Compact Edge Systems</em>
          <strong>View Zevric <i aria-hidden="true">→</i></strong>
        </Link>
      </div>
      <div className="site-container site-header__inner">
        <Link className="brand" to="/" aria-label="ZMD home">
          <span className="brand__crop" aria-hidden="true">
            <img className="brand__image brand__image--surface" src={logo} alt="" />
          </span>
        </Link>
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
          <span />
        </button>
      </div>
      <MobileNavigation open={mobileOpen} setOpen={setMobileOpen} buttonRef={menuButtonRef} />
    </header>
  );
}


// =============================================================================
// NAVIGATION DATA
// =============================================================================

export const navigation = [
  { label: 'Products', to: '/products', menu: true },
  { label: 'Edge AI', to: '/edge-ai' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export const productFamilies = [
  {
    slug: 'cameras',
    name: 'Cameras',
    eyebrow: 'Visual inputs',
    status: 'Available now',
    summary: 'Visual sensing hardware for surveillance, inspection and operational workflows.',
    to: '/products/cameras',
    image: cameraFamilyContext,
    imageAlt: 'Camera monitoring in a low-light industrial environment',
    menuImage: cameraStudio,
    menuImageAlt: 'ZMD dual-lens camera',
  },
  {
    slug: 'edge-devices',
    name: 'Zevric Compact Edge Systems',
    eyebrow: 'Local compute',
    status: 'Available now',
    summary: 'Four compact configurations for local AI inference and video processing.',
    to: '/products/edge-devices',
    image: edgeSmall,
    imageAlt: 'Representative Zevric Compact Edge System configuration',
    menuImage: edgeSharedPlatform,
    menuImageAlt: 'Zevric shared compact edge platform',
  },
  {
    slug: 'servers',
    name: 'AI Datacenter Servers',
    eyebrow: 'Datacenter compute',
    status: 'Available now',
    summary: 'Centralized processing, storage and multi-site AI infrastructure.',
    to: '/products/servers',
    image: serverBlueprintFront,
    imageAlt: 'Front platform view of a ZMD AI Datacenter Server',
    menuImage: homeServerIndustrial,
    menuImageAlt: 'ZMD AI Datacenter Server in a datacenter environment',
  },
  {
    slug: 'custom-iot',
    name: 'Custom IoT Products',
    eyebrow: 'Connected sensing',
    status: 'Available now',
    summary: 'Available connected devices and custom sensing hardware engagements.',
    to: '/products/custom-iot',
    image: parkingSensorContext,
    imageAlt: 'Parking facility monitored by connected occupancy sensors',
    menuImage: parkingSensorStudio,
    menuImageAlt: 'ZMD parking sensor',
  },
];
