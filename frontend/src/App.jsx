// =============================================================================
// APPLICATION ROUTES, PAGE METADATA, AND GLOBAL PAGE LAYOUT
// =============================================================================

import React from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import HomePage from './pages/Home';
import ProductsPage from './pages/Products';
import CamerasPage from './pages/Cam';
import EdgeDevicesPage from './pages/EdgeDevices';
import ServersPage from './pages/Servers';
import EdgeAIPage from './pages/EdgeAI';
import SolutionsPage from './pages/Solutions';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';
import parkingSensorContext from './assets/images/custom-iot/parking-sensor-context.webp';
import safetyBandContext from './assets/images/custom-iot/safety-band-context-v1.webp';
import parkingSensorContextV2 from './assets/images/custom-iot/parking-sensor-context-v2.webp';
import industrialAISolution from './assets/images/custom-iot/industrial-ai-solution.webp';
import homeIotIndustrial from './assets/images/custom-iot/home-iot-context-v2.webp';
import physicalAIHardwareScene from './assets/images/custom-iot/physical-ai-hardware-scene-v2.webp';


// =============================================================================
// ROUTE METADATA
// =============================================================================

const metadata = {
  '/': {
    title: 'ZMD | Hardware for Physical AI and OEM Portfolios',
    description: 'ZMD is the ODM partner behind Cameras, Compact Edge Systems, AI Datacenter Servers and Custom IoT Products for OEM portfolios.',
  },
  '/products': {
    title: 'Hardware Products for OEM Portfolios | ZMD',
    description: 'Explore Cameras, Compact Edge Systems, AI Datacenter Servers and Custom IoT Products from ZMD.',
  },
  '/products/cameras': {
    title: 'Cameras for OEM Portfolios | ZMD',
    description: 'Explore ZMD Cameras for panoramic, fixed, directional and hands-free imaging.',
  },
  '/products/edge-devices': {
    title: 'Zevric Compact Edge Systems | ZMD',
    description: 'Explore three Zevric Compact Edge System configurations for local AI inference and video processing.',
  },
  '/products/servers': {
    title: 'AI Datacenter Servers | ZMD',
    description: 'ZMD AI Datacenter Servers for centralized compute, storage and AI infrastructure.',
  },
  '/products/custom-iot': {
    title: 'Custom IoT Products | ZMD',
    description: 'Explore ZMD Safety Bands, Parking Sensors and custom IoT product engagements.',
  },
  '/edge-ai': {
    title: 'Edge AI with Zevric Compact Edge Systems | ZMD',
    description: 'Explore Zevric Compact Edge Systems for local AI processing, open software choices and possible application areas.',
  },
  '/solutions': {
    title: 'Physical AI Solutions | ZMD',
    description: 'Explore reference architectures and possible Physical AI applications built on ZMD hardware.',
  },
  '/about': {
    title: 'About ZMD | Physical AI Hardware ODM',
    description: 'Learn about ZMD, a hardware ODM for OEM and white-label portfolios across Physical AI infrastructure.',
  },
  '/contact': {
    title: 'Contact ZMD | OEM and Hardware Enquiries',
    description: 'Discuss ZMD hardware, distribution and deployment requirements.',
  },
  '*': {
    title: 'Page Not Found | ZMD',
    description: 'The requested page could not be found. Explore ZMD hardware products and Physical AI solutions.',
  },
};


// =============================================================================
// PAGE TITLE, META TAG, CANONICAL URL, AND SCROLL EFFECTS
// =============================================================================

function RouteEffects() {
  const location = useLocation();

  React.useEffect(() => {
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


// =============================================================================
// CUSTOM IOT PAGE DATA AND UI
// =============================================================================

const customIotAssets = { homeIotIndustrial, industrialAISolution, parkingSensorContext, parkingSensorContextV2, physicalAIHardwareScene, safetyBandContext };
const customIotProducts = [
  { slug: 'safety-band', name: 'Safety Band', category: 'Wearable sensing', summary: 'Wearable sensing for environmental conditions, vital-sign inputs, fall events and SOS alerts.', image: safetyBandContext, imageAlt: 'Industrial worker wearing an illustrative ZMD Safety Band' },
  { slug: 'parking-sensor', name: 'Parking Sensor', category: 'Occupancy sensing', summary: 'Magnetometer-based occupancy sensing for indoor and outdoor parking.', image: parkingSensorContextV2, imageAlt: 'ZMD Parking Sensor installed near a parked vehicle' },
];
const iotSpecificationGroups = [
  {
    id: 'safety-band', label: 'Safety Band', rows: [
      ['Category', 'Sensors'], ['Environmental sensing', 'Temperature, humidity and CO₂'], ['Health monitoring', 'Heart rate, body temperature and SpO₂'], ['Safety function', 'Fall detection and SOS push button'], ['Audio', '4 Ω speaker'], ['Communication module', 'GeoLinker GL868 with SIM868'], ['Battery', '3.7 V lithium battery'],
    ],
  },
  {
    id: 'parking-sensor', label: 'Parking Sensor', rows: [
      ['Category', 'Sensors'], ['Detection method', 'Magnetometer sensor'], ['Communication range', 'Up to 6 km outdoors; approximately 100 m indoors'], ['Battery', '2 × 3.6 V AA replaceable lithium batteries'], ['Battery life', 'Up to 3–5 years'], ['Operating environment', 'Indoor and outdoor use'], ['Enclosure rating', 'IP67'], ['Temperature range', '-40°C to +80°C'],
    ],
  },
];
const iotApplications = [
  ['Workforce monitoring', customIotAssets.industrialAISolution, 'Connected workforce operating in an industrial environment'],
  ['Parking occupancy', customIotAssets.parkingSensorContext, 'Parking facility monitored by occupancy sensors'],
  ['Campuses and industrial sites', customIotAssets.homeIotIndustrial, 'Connected sensing hardware in an industrial site'],
  ['Commercial and public infrastructure', customIotAssets.physicalAIHardwareScene, 'Connected hardware deployed across physical infrastructure'],
];

function keepCustomIotFinalSectionVisible(element, pageRoot) {
  const finalSection = [...pageRoot.children].reverse().find((child) => child.tagName === 'SECTION');
  if (!finalSection?.contains(element)) return false;
  const pageHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
  return Math.ceil(window.scrollY + window.innerHeight) >= pageHeight - 8;
}

function CustomIotArrowButton({ to, children, secondary = false, light = false }) {
  const variant = light ? 'button--light' : secondary ? 'button--secondary' : 'button--primary';
  return <Link className={`button ${variant}`} to={to}>{children} <span aria-hidden="true">→</span></Link>;
}

function CustomIotSectionIntro({ title, light = false }) {
  return <div className={`section-intro section-intro--plain section-intro--left ${light ? 'section-intro--light' : ''}`}><div className="section-intro__content"><h2>{title}</h2></div></div>;
}

function CustomIotCarouselControls({ count, activeIndex, onPrevious, onNext, durationMs }) {
  return (
    <div className="carousel-controls product-story-hero__controls" role="group" aria-label="Product media navigation" style={{ '--carousel-progress-duration': `${durationMs}ms` }}>
      <button className="carousel-controls__button" type="button" onClick={onPrevious} aria-label="Previous slide"><span aria-hidden="true">←</span></button>
      <span className="carousel-controls__marks" aria-hidden="true">{Array.from({ length: count }, (_, index) => <i className={`carousel-controls__mark ${index === activeIndex ? 'is-active' : ''}`} key={index} />)}</span>
      <button className="carousel-controls__button" type="button" onClick={onNext} aria-label="Next slide"><span aria-hidden="true">→</span></button>
    </div>
  );
}

function CustomIotProductHero() {
  const slides = [
    { image: customIotAssets.safetyBandContext, imageAlt: 'Industrial worker wearing an illustrative ZMD Safety Band', visualTone: 'iot-safety' },
    { image: customIotAssets.parkingSensorContextV2, imageAlt: 'ZMD Parking Sensor installed near a parked vehicle', visualTone: 'iot-parking' },
  ];
  const [activeIndex, setActiveIndex] = React.useState(0);
  const touchStart = React.useRef(null);
  const activeSlide = slides[activeIndex];
  const nextSlideImage = slides[(activeIndex + 1) % slides.length].image;
  const selectRelative = (direction) => setActiveIndex((index) => (index + direction + slides.length) % slides.length);

  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setTimeout(() => setActiveIndex((index) => (index + 1) % 2), 5200);
    return () => window.clearTimeout(timer);
  }, [activeIndex]);

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      const image = new Image();
      image.src = nextSlideImage;
    }, 200);
    return () => window.clearTimeout(timer);
  }, [nextSlideImage]);

  const handleTouchEnd = (event) => {
    if (touchStart.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStart.current;
    touchStart.current = null;
    if (Math.abs(distance) > 45) selectRelative(distance < 0 ? 1 : -1);
  };

  return (
    <section className="product-story-hero product-story-hero--navy product-story-hero--autoplay iot-product-hero camera-story-hero" aria-label="Custom IoT Products product media">
      <div className="site-container product-story-hero__inner">
        <div className="product-story-hero__copy">
          <h1 tabIndex="-1">Custom IoT Products</h1>
          <p>Available Safety Band and Parking Sensor products, plus custom sensing-hardware programs for OEM portfolios.</p>
          <div className="product-story-hero__actions">
            <Link className="button button--primary" to="/products/custom-iot#available-products">View products <span aria-hidden="true">→</span></Link>
            <Link className="button button--light" to="/contact">Discuss an IoT product <span aria-hidden="true">→</span></Link>
          </div>
        </div>
        <div className={`product-story-hero__visual product-story-hero__visual--${activeSlide.visualTone}`} role="tabpanel" aria-label={activeSlide.imageAlt} onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={handleTouchEnd}>
          <img key={activeSlide.image} src={activeSlide.image} alt={activeSlide.imageAlt} loading="eager" decoding="async" fetchPriority={activeIndex === 0 ? 'high' : 'auto'} />
        </div>
        <CustomIotCarouselControls count={slides.length} activeIndex={activeIndex} onPrevious={() => selectRelative(-1)} onNext={() => selectRelative(1)} durationMs={5200} />
      </div>
    </section>
  );
}

function CustomIotHighlights() {
  const items = [['Safety Band', 'Environmental and wearable sensing'], ['Safety', 'Fall detection and SOS'], ['Parking Sensor', 'Magnetometer occupancy detection'], ['Supply', 'Standard, branded or custom configurations']];
  return <section className="product-highlight-band" aria-label="Product highlights"><div className="site-container product-highlight-band__grid">{items.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div></section>;
}

function IoTSpecificationTable() {
  const [activeGroupId, setActiveGroupId] = React.useState(iotSpecificationGroups[0].id);
  const activeGroup = iotSpecificationGroups.find((group) => group.id === activeGroupId) || iotSpecificationGroups[0];
  return (
    <div className="camera-specification-layout product-specification-layout--full">
      <div className="camera-specification-main">
        <div className="camera-specification-tabs" aria-label="IoT product specification categories">
          {iotSpecificationGroups.map((group) => <button key={group.id} type="button" className={group.id === activeGroup.id ? 'is-active' : ''} aria-pressed={group.id === activeGroup.id} onClick={() => setActiveGroupId(group.id)}>{group.label}</button>)}
        </div>
        <div className="camera-specification-table" role="region" aria-label={`${activeGroup.label} specifications`} tabIndex="0">
          <table><thead><tr><th scope="col">Specification</th><th scope="col">Published detail</th></tr></thead><tbody>{activeGroup.rows.map(([label, value]) => <tr key={label}><th scope="row">{label}</th><td>{value}</td></tr>)}</tbody></table>
        </div>
      </div>
    </div>
  );
}

function CustomIoTPage() {
  const motionRoot = React.useRef(null);
  React.useLayoutEffect(() => {
    const root = motionRoot.current;
    if (!root) return undefined;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const selectors = ['.iot-product-hero .product-story-hero__copy h1', '.iot-product-hero .product-story-hero__copy > p', '.iot-product-hero .product-story-hero__actions .button', '.iot-product-hero .product-story-hero__visual', '.iot-product-hero .product-story-hero__controls', '.product-highlight-band__grid > div', '#available-products .section-intro h2', '.custom-iot-model-card', '.iot-specifications .section-intro h2', '.iot-specifications table', '.iot-specifications tbody tr', '.iot-specifications .content-qualifier', '#iot-applications .section-intro h2', '#iot-applications .camera-application-grid article', '#iot-applications .section-action', '.product-oem-engagement h2', '.product-oem-engagement p', '.product-oem-engagement .button'];
    const items = [...root.querySelectorAll(selectors.join(','))];
    const syncItem = (item) => {
      const bounds = item.getBoundingClientRect();
      const visible = keepCustomIotFinalSectionVisible(item, root) || (item.classList.contains('is-iot-motion-visible') ? bounds.top <= window.innerHeight * 1.05 && bounds.bottom >= window.innerHeight * -0.05 : bounds.top <= window.innerHeight * 0.92 && bounds.bottom >= window.innerHeight * 0.01);
      item.classList.toggle('is-iot-motion-visible', reducedMotion.matches || visible);
    };
    items.forEach((item, index) => { item.classList.add('iot-motion-item'); item.style.setProperty('--iot-motion-order', index % 8); });
    root.classList.add('iot-motion-ready');
    items.forEach(syncItem);
    const observer = new IntersectionObserver((entries) => entries.forEach(({ target }) => syncItem(target)), { threshold: 0.01, rootMargin: '0px 0px -7% 0px' });
    items.forEach((item) => observer.observe(item));
    let frame = 0;
    const syncAll = () => { if (frame || reducedMotion.matches) return; frame = window.requestAnimationFrame(() => { frame = 0; items.forEach(syncItem); }); };
    window.addEventListener('scroll', syncAll, { passive: true });
    window.addEventListener('resize', syncAll);
    return () => { observer.disconnect(); window.removeEventListener('scroll', syncAll); window.removeEventListener('resize', syncAll); if (frame) window.cancelAnimationFrame(frame); };
  }, []);

  return (
    <div className="site-page custom-iot-page" ref={motionRoot}>


      {/* ========================= CUSTOM IOT HERO SECTION ========================= */}


      <CustomIotProductHero />


      {/* ====================== CUSTOM IOT HIGHLIGHTS SECTION ====================== */}


      <CustomIotHighlights />


      {/* ====================== AVAILABLE IOT PRODUCTS SECTION ====================== */}


      <section className="section section--paper camera-models surface-band surface-band--neutral" id="available-products">
        <div className="site-container"><CustomIotSectionIntro title="Available products" /><div className="camera-model-grid custom-iot-model-grid">{customIotProducts.map((product) => <article className="camera-model-card custom-iot-model-card" id={product.slug} key={product.slug}><div className="camera-model-card__visual"><img src={product.image} alt={product.imageAlt} loading="lazy" decoding="async" /></div><div className="camera-model-card__body"><div className="camera-model-card__meta"><strong>{product.category}</strong></div><h3>{product.name}</h3><p>{product.summary}</p></div></article>)}</div></div>
      </section>


      {/* ====================== IOT SPECIFICATIONS SECTION ====================== */}


      <section className="section camera-specifications iot-specifications" id="technical-specifications">
        <div className="site-container"><CustomIotSectionIntro title="Technical specifications" light /><IoTSpecificationTable /><p className="content-qualifier">Final component selection, software integration, certification scope and availability are confirmed with ZMD.</p></div>
      </section>


      {/* ====================== IOT APPLICATIONS SECTION ====================== */}


      <section className="section camera-applications surface-band surface-band--neutral" id="iot-applications">
        <div className="site-container"><CustomIotSectionIntro title="Application areas" /><div className="camera-application-grid">{iotApplications.map(([title, image, imageAlt]) => <article key={title}><img src={image} alt={imageAlt} loading="lazy" decoding="async" /><div><h3>{title}</h3></div></article>)}</div><div className="section-action"><CustomIotArrowButton to="/solutions" secondary>View solution areas</CustomIotArrowButton></div></div>
      </section>


      {/* ======================== CUSTOM IOT ENQUIRY SECTION ======================== */}


      <section className="section product-oem-engagement surface-band surface-band--ink"><div className="site-container product-oem-engagement__inner"><div><h2>Add Custom IoT Products to your portfolio</h2><p>Discuss standard, branded or custom Safety Band and Parking Sensor configurations with ZMD.</p></div><CustomIotArrowButton to="/contact" light>Start an IoT enquiry</CustomIotArrowButton></div></section>
    </div>
  );
}


// =============================================================================
// NOT FOUND PAGE
// =============================================================================

function NotFoundPage() {
  return (
    <div className="site-page not-found-page">
      <div className="site-container">
        <span className="not-found-page__number">404</span>
        <h1 tabIndex="-1">This page is outside the current product map.</h1>
        <div>
          <Link className="button button--primary" to="/">Return home <span aria-hidden="true">→</span></Link>
          <Link className="button button--secondary" to="/products">Explore products <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </div>
  );
}


// =============================================================================
// GLOBAL PAGE LAYOUT AND ROUTE TABLE
// =============================================================================

export default function App() {
  return (
    <div className="site-root">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <RouteEffects />
      <Header />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/cameras" element={<CamerasPage />} />
          <Route path="/products/cameras/:slug" element={<Navigate to="/products/cameras" replace />} />
          <Route path="/products/edge-devices" element={<EdgeDevicesPage />} />
          <Route path="/products/edge-devices/:slug" element={<Navigate to="/products/edge-devices" replace />} />
          <Route path="/products/servers" element={<ServersPage />} />
          <Route path="/products/custom-iot" element={<CustomIoTPage />} />
          <Route path="/products/iot" element={<Navigate to="/products/custom-iot" replace />} />
          <Route path="/edge-ai" element={<EdgeAIPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/solutions/surveillance" element={<Navigate to="/solutions#surveillance" replace />} />
          <Route path="/solutions/industrial-ai" element={<Navigate to="/solutions#industrial-ai" replace />} />
          <Route path="/solutions/healthcare" element={<Navigate to="/solutions#healthcare" replace />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/company" element={<Navigate to="/about" replace />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/partner-with-zmd" element={<Navigate to="/contact" replace />} />
          <Route path="/products/cam" element={<Navigate to="/products/cameras" replace />} />
          <Route path="/products/edge" element={<Navigate to="/products/edge-devices" replace />} />
          <Route path="/products/edge-box" element={<Navigate to="/products/edge-devices" replace />} />
          <Route path="/products/server" element={<Navigate to="/products/servers" replace />} />
          <Route path="/products/sensors" element={<Navigate to="/products/custom-iot" replace />} />
          <Route path="/products/safety" element={<Navigate to="/products/custom-iot#safety-band" replace />} />
          <Route path="/products/parking-sensor" element={<Navigate to="/products/custom-iot#parking-sensor" replace />} />
          <Route path="/solutions/hospitals" element={<Navigate to="/solutions#healthcare" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
