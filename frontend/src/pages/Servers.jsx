// =============================================================================
// AI DATACENTER SERVERS PAGE
// =============================================================================

import React from 'react';
import { Link } from 'react-router-dom';
import serverHero from '../assets/images/servers/server_chassis.webp';
import serverHeroFront from '../assets/images/servers/server-hero-front.webp';
import serverHeroInternal from '../assets/images/servers/server-hero-internal.webp';
import serverHeroRear from '../assets/images/servers/server-hero-rear.webp';
import serverBlueprintFront from '../assets/images/servers/blueprint_front.webp';
import serverBlueprintInternal from '../assets/images/servers/blueprint_internal.webp';
import serverBlueprintRear from '../assets/images/servers/blueprint_rear.webp';
import serverModelRS240 from '../assets/images/servers/server-format-rs240.webp';
import serverModel1U from '../assets/images/servers/server-format-1u.webp';
import serverModel2U from '../assets/images/servers/server-format-2u.webp';
import serverModel4U from '../assets/images/servers/server-format-4u.webp';
import homeServerIndustrial from '../assets/images/servers/home-server-context-v2.webp';
import '../assets/css/Servers.css';

function keepFinalSectionVisibleAtPageEnd(element, pageRoot) {
  const finalSection = [...pageRoot.children].reverse().find((child) => child.tagName === 'SECTION');
  if (!finalSection?.contains(element)) return false;
  const pageHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
  return Math.ceil(window.scrollY + window.innerHeight) >= pageHeight - 8;
}

const AUTO_CAROUSEL_INTERVAL = 5200;

function ArrowButton({ to, children, secondary = false, light = false }) {
  const variant = light ? 'button--light' : secondary ? 'button--secondary' : 'button--primary';
  return <Link className={`button ${variant}`} to={to}>{children} <span aria-hidden="true">→</span></Link>;
}

function SectionIntro({ eyebrow, title, body, light = false, align = 'left', variant = 'plain', headingLevel = 'h2' }) {
  const Heading = headingLevel;
  return (
    <div className={`section-intro section-intro--${variant} section-intro--${align} ${light ? 'section-intro--light' : ''}`}>
      {variant === 'split' && eyebrow && <div className="section-intro__label">{eyebrow}</div>}
      <div className="section-intro__content">
        <Heading>{title}</Heading>
        {body && <p>{body}</p>}
      </div>
    </div>
  );
}

function CarouselControls({ count, activeIndex, onPrevious, onNext, durationMs = 0, className = '', label = 'Carousel navigation' }) {
  return (
    <div className={`carousel-controls ${className}`} role="group" aria-label={label} style={durationMs ? { '--carousel-progress-duration': `${durationMs}ms` } : undefined}>
      <button className="carousel-controls__button" type="button" onClick={onPrevious} aria-label="Previous slide"><span aria-hidden="true">←</span></button>
      <span className="carousel-controls__marks" aria-hidden="true">{Array.from({ length: count }, (_, index) => <i className={`carousel-controls__mark ${index === activeIndex ? 'is-active' : ''}`} key={index} />)}</span>
      <button className="carousel-controls__button" type="button" onClick={onNext} aria-label="Next slide"><span aria-hidden="true">→</span></button>
    </div>
  );
}

function ProductStoryHero({ slides, eyebrow, title, body, primaryAction, secondaryAction, className = '', tone = 'dark', autoAdvanceMs = 0 }) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const activeSlide = slides[activeIndex] || slides[0];
  const touchStart = React.useRef(null);
  React.useEffect(() => {
    if (!autoAdvanceMs || slides.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setTimeout(() => setActiveIndex((index) => (index + 1) % slides.length), autoAdvanceMs);
    return () => window.clearTimeout(timer);
  }, [activeIndex, autoAdvanceMs, slides.length]);
  React.useEffect(() => {
    if (slides.length < 2) return undefined;
    const nextSlide = slides[(activeIndex + 1) % slides.length];
    const timer = window.setTimeout(() => {
      if (nextSlide.image) new Image().src = nextSlide.image;
      if (nextSlide.mediaBadge?.image) new Image().src = nextSlide.mediaBadge.image;
    }, 200);
    return () => window.clearTimeout(timer);
  }, [activeIndex, slides]);
  const selectRelative = (direction) => setActiveIndex((index) => (index + direction + slides.length) % slides.length);
  const handleTabKey = (event, index) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? slides.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + slides.length) % slides.length;
    setActiveIndex(nextIndex);
    event.currentTarget.parentElement?.querySelectorAll('[role="tab"]')[nextIndex]?.focus();
  };
  const handleTouchEnd = (event) => {
    if (touchStart.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStart.current;
    touchStart.current = null;
    if (Math.abs(distance) > 45) selectRelative(distance < 0 ? 1 : -1);
  };
  return (
    <section className={`product-story-hero product-story-hero--${tone} ${autoAdvanceMs ? 'product-story-hero--autoplay' : ''} ${className}`} aria-label={`${title} product media`} style={activeSlide.surface ? { '--product-story-surface': activeSlide.surface } : undefined}>
      <div className="site-container product-story-hero__inner">
        <div className="product-story-hero__copy">{eyebrow && <span className="product-story-hero__eyebrow">{eyebrow}</span>}<h1 tabIndex="-1">{title}</h1><p>{body}</p><div className="product-story-hero__actions">{primaryAction && <Link className="button button--primary" to={primaryAction.to}>{primaryAction.label} <span aria-hidden="true">→</span></Link>}{secondaryAction && <Link className="button button--light" to={secondaryAction.to}>{secondaryAction.label} <span aria-hidden="true">→</span></Link>}</div></div>
        <div className={`product-story-hero__visual ${activeSlide.fit === 'contain' ? 'product-story-hero__visual--contain' : ''} ${activeSlide.visualTone ? `product-story-hero__visual--${activeSlide.visualTone}` : ''}`} role="tabpanel" id="product-media-panel" aria-label={activeSlide.navigationLabel || activeSlide.eyebrow} onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={handleTouchEnd}>{activeSlide.render || <img key={activeSlide.image} src={activeSlide.image} alt={activeSlide.imageAlt} loading="eager" decoding="async" fetchPriority={activeIndex === 0 ? 'high' : 'auto'} />}{activeSlide.mediaBadge && <img className="product-story-hero__media-badge" src={activeSlide.mediaBadge.image} alt={activeSlide.mediaBadge.imageAlt} loading="eager" decoding="async" fetchPriority="high" />}{!autoAdvanceMs && <><span className="product-story-hero__index" aria-hidden="true">0{activeIndex + 1} / 0{slides.length}</span>{activeSlide.caption && <span className="product-story-hero__caption" aria-live="polite">{activeSlide.caption}</span>}</>}</div>
        {autoAdvanceMs && <CarouselControls className="product-story-hero__controls" count={slides.length} activeIndex={activeIndex} onPrevious={() => selectRelative(-1)} onNext={() => selectRelative(1)} durationMs={autoAdvanceMs} label="Product media navigation" />}
      </div>
      {!autoAdvanceMs && <div className="site-container product-story-hero__navigation" role="tablist" aria-label="Select a product view">{slides.map((slide, index) => <button type="button" role="tab" className={index === activeIndex ? 'is-active' : ''} aria-selected={index === activeIndex} aria-controls="product-media-panel" tabIndex={index === activeIndex ? 0 : -1} onClick={() => setActiveIndex(index)} onKeyDown={(event) => handleTabKey(event, index)} key={slide.navigationLabel || slide.eyebrow}><span>0{index + 1}</span><strong>{slide.navigationLabel || slide.eyebrow}</strong></button>)}</div>}
    </section>
  );
}

function ProductHighlights({ items, qualifier }) {
  return <section className="product-highlight-band" aria-label="Product highlights"><div className="site-container product-highlight-band__grid">{items.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>{qualifier && <p className="site-container product-highlight-band__qualifier">{qualifier}</p>}</section>;
}

function OEMEngagement({ title, body, action = 'Partner with ZMD' }) {
  return <section className="section product-oem-engagement surface-band surface-band--ink"><div className="site-container product-oem-engagement__inner"><div><h2>{title}</h2><p>{body}</p></div><ArrowButton to="/contact" light>{action}</ArrowButton></div></section>;
}

function CameraModelCard({ product }) {
  return <article className={`camera-model-card ${product.availabilityLabel ? 'camera-model-card--availability' : ''}`} tabIndex={product.availabilityLabel ? 0 : undefined}><div className="camera-model-card__visual"><img src={product.image} alt={product.imageAlt} loading="lazy" decoding="async" />{product.availabilityLabel && <span className="camera-model-card__availability">{product.availabilityLabel}</span>}</div><div className="camera-model-card__body">{product.category ? <div className="camera-model-card__meta"><strong>{product.category}</strong></div> : null}<h3>{product.name}</h3><p>{product.summary}</p></div></article>;
}

function ProductApplicationCards({ items }) {
  return <div className="camera-application-grid">{items.map(([title, image, imageAlt]) => <article key={title}><img src={image} alt={imageAlt} loading="lazy" decoding="async" /><div><h3>{title}</h3></div></article>)}</div>;
}

const assets = { homeServerIndustrial, serverBlueprintFront, serverBlueprintInternal, serverBlueprintRear, serverHero, serverHeroFront, serverHeroInternal, serverHeroRear, serverModel1U, serverModel2U, serverModel4U, serverModelRS240 };

export default function ServersPage() {
  const motionRoot = React.useRef(null);

  React.useLayoutEffect(() => {
    const root = motionRoot.current;
    if (!root) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const selectors = [
      '.server-product-hero .product-story-hero__copy h1',
      '.server-product-hero .product-story-hero__copy > p',
      '.server-product-hero .product-story-hero__actions .button',
      '.server-product-hero .product-story-hero__visual',
      '.server-product-hero .product-story-hero__controls',
      '.product-highlight-band__grid > div',
      '#server-models .section-intro h2',
      '#server-models .camera-model-card',
      '.server-storage-profiles h3',
      '.server-storage-profiles span',
      '.server-specifications .section-intro h2',
      '.server-specifications .section-intro p',
      '.server-specifications table',
      '.server-specifications tbody tr',
      '.server-specifications .content-qualifier',
      '#server-applications .section-intro h2',
      '#server-applications .camera-application-grid article',
      '#server-applications .section-action',
      '.product-oem-engagement h2',
      '.product-oem-engagement p',
      '.product-oem-engagement .button',
    ];

    const items = [...root.querySelectorAll(selectors.join(','))];
    const syncItem = (item) => {
      const bounds = item.getBoundingClientRect();
      const visible = keepFinalSectionVisibleAtPageEnd(item, root) || (item.classList.contains('is-server-motion-visible')
        ? bounds.top <= window.innerHeight * 1.05 && bounds.bottom >= window.innerHeight * -0.05
        : bounds.top <= window.innerHeight * 0.92 && bounds.bottom >= window.innerHeight * 0.01);
      item.classList.toggle('is-server-motion-visible', reducedMotion.matches || visible);
    };

    items.forEach((item, index) => {
      item.classList.add('server-motion-item');
      item.style.setProperty('--server-motion-order', index % 8);
    });
    root.classList.add('server-motion-ready');
    items.forEach(syncItem);

    const observer = new IntersectionObserver(
      (entries) => entries.forEach(({ target }) => syncItem(target)),
      { threshold: 0.01, rootMargin: '0px 0px -7% 0px' },
    );
    items.forEach((item) => observer.observe(item));

    let frame = 0;
    const syncAll = () => {
      if (frame || reducedMotion.matches) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        items.forEach(syncItem);
      });
    };
    window.addEventListener('scroll', syncAll, { passive: true });
    window.addEventListener('resize', syncAll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', syncAll);
      window.removeEventListener('resize', syncAll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="site-page server-page" ref={motionRoot}>


      {/* ========================== SERVER HERO SECTION ========================== */}


      <ProductStoryHero
        slides={serverPlatformViews.map(([navigationLabel, image, imageAlt, surface]) => ({ navigationLabel, image, imageAlt, surface, fit: 'contain' }))}
        title="AI Datacenter Servers"
        body="RS240 2U dual-socket platform with Intel® Xeon® 6700 or 6500 Series processors, up to 8 TB DDR5 and six front-bay profiles."
        className="server-product-hero"
        autoAdvanceMs={AUTO_CAROUSEL_INTERVAL}
        primaryAction={{ label: 'View RS240 specifications', to: '/products/servers#technical-specifications' }}
        secondaryAction={{ label: 'Define a server configuration', to: '/contact' }}
      />


      {/* ======================== SERVER HIGHLIGHTS SECTION ======================== */}


      <ProductHighlights items={[
        ['Compute', 'Dual Intel® Xeon® 6700 or 6500 Series'],
        ['Memory', '32 DIMMs, up to 8 TB DDR5'],
        ['Storage', 'Up to 24 drive bays'],
        ['Power', '3000 W redundant 1+1 Titanium'],
      ]} />


      {/* ========================= SERVER FORMATS SECTION ========================= */}


      <section className="section section--paper camera-models surface-band surface-band--neutral" id="server-models">
        <div className="site-container">
          <SectionIntro title="Server formats" />
          <div className="camera-model-grid">
            {serverModels.map((product) => <CameraModelCard key={product.slug} product={product} />)}
          </div>
          <div className="server-storage-profiles" aria-label="Server drive-bay configurations">
            <h3>Drive-bay configurations</h3>
            <div>
              {serverStorageProfiles.map(([configuration, interfaceType]) => (
                <span key={`${configuration}-${interfaceType}`}>
                  <strong>{configuration}</strong>
                  <small>{interfaceType}</small>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ====================== SERVER SPECIFICATIONS SECTION ====================== */}


      <section className="section camera-specifications server-specifications" id="technical-specifications">
        <div className="site-container">
          <SectionIntro title="RS240 specifications" body="Published RS240 platform specifications." light />
          <ServerSpecificationTable />
          <p className="content-qualifier">Images are illustrative. Final configuration, availability, lead time and certification scope are confirmed with ZMD.</p>
        </div>
      </section>


      {/* ======================== SERVER WORKLOADS SECTION ======================== */}


      <section className="section camera-applications surface-band surface-band--neutral" id="server-applications">
        <div className="site-container">
          <SectionIntro title="Workload areas" />
          <ProductApplicationCards items={serverApplications} />
          <div className="section-action"><ArrowButton to="/solutions" secondary>View solution areas</ArrowButton></div>
        </div>
      </section>


      {/* ========================= SERVER ENQUIRY SECTION ========================= */}


      <OEMEngagement
        title="Configure AI Datacenter Servers for your portfolio"
        body="Share workload, facility, branding and supply requirements for an RS240 configuration."
        action="Start a server enquiry"
      />
    </div>
  );
}
export const serverPlatformViews = [
  ['Front platform view', assets.serverHeroFront, 'Front view of an AI Datacenter Server platform', '#f6f6f5'],
  ['Internal platform view', assets.serverHeroInternal, 'Internal components of an AI Datacenter Server platform', '#f3f3f2'],
  ['Rear platform view', assets.serverHeroRear, 'Rear I/O and power view of an AI Datacenter Server platform', '#f1f1f0'],
];

export const serverSpecificationGroups = [
  {
    title: 'System & processor',
    rows: [
      ['Platform', 'RS240, 2U dual-socket rackmount'],
      ['Motherboard', 'Dual Socket LGA-4710, M-FLW, 18.4 × 16.7 inches'],
      ['Dimensions', '438 × 87 × 770 mm'],
      ['Processor family', 'Intel Xeon 6700 / 6500 Series P-core, or Xeon 6700 Series E-core'],
      ['P-core configuration', 'Up to 86 cores / 172 threads and 336 MB cache per CPU'],
      ['E-core configuration', 'Up to 144 cores / 144 threads and 108 MB cache per CPU'],
      ['BIOS', 'AMI 64 MB SPI Flash ROM'],
      ['Operating systems', 'Windows / Linux'],
    ],
  },
  {
    title: 'Memory & storage',
    rows: [
      ['Memory slots', '32 DIMM slots'],
      ['DDR5 RDIMM, 1DPC', 'Up to 4 TB at 6400 MT/s with ECC'],
      ['DDR5 MRDIMM, 1DPC', 'Up to 1 TB at 8000 MT/s with ECC'],
      ['DDR5 RDIMM, 2DPC', 'Up to 8 TB at 5200 MT/s with ECC'],
      ['Drive-bay layouts', 'Six supported front-bay profiles'],
      ['Storage backplane', '2 × 8-port E1.S NVMe Gen5'],
    ],
  },
  {
    title: 'Expansion & management',
    rows: [
      ['PCIe support', '3 × 2-FH module; 1 × 1-LP plus 1 × 1-FH module'],
      ['Management', 'DC-SCM remote-management module'],
      ['E1.S expansion', '2 × E1.S'],
      ['Network expansion', '1 × OCP NIC slot'],
      ['NVMe RAID', 'RAID 0/1/5/10; VROC hardware key required'],
      ['Security header', '1 × TPM header'],
    ],
  },
  {
    title: 'Power & cooling',
    rows: [
      ['Power supply', '3000 W CRPS, redundant 1+1, Titanium level, 96% efficiency'],
      ['Cooling fans', '6 × 6056 fans, 25,700 / 24,600 RPM'],
      ['Air shroud', '1 × air shroud'],
      ['Front indicators', 'Power, UID, HDD activity and system status'],
      ['Front controls', 'Power, reset, UID and 2 × USB 3.0'],
    ],
  },
  {
    title: 'Operating environment',
    rows: [
      ['Compliance', 'RoHS compliant'],
      ['Operating temperature', '10°C to 35°C'],
      ['Non-operating temperature', '-30°C to 60°C'],
      ['Operating humidity', '8% to 80%, non-condensing'],
      ['Non-operating humidity', '8% to 90%, non-condensing'],
    ],
  },
];

export const serverStorageProfiles = [
  ['8 × 2.5-inch + 8 × E1.S', 'Gen5'],
  ['24 × E1.S', 'Gen5'],
  ['24 × 2.5-inch', 'NVMe · Gen4'],
  ['24 × 2.5-inch', 'SAS / SATA'],
  ['12 × 3.5-inch', 'Tri-mode'],
  ['12 × 3.5-inch', 'SAS / SATA'],
];

export const serverModels = [
  {
    slug: 'rs240',
    name: 'RS240',
    summary: '2U/2S dual-socket platform with deep memory, configurable front storage and redundant power.',
    image: assets.serverModelRS240,
    imageAlt: 'ZMD RS240 2U dual-socket rackmount server',
    availabilityLabel: 'Coming soon',
  },
  {
    slug: '1u-1s-xeon',
    name: '1U/1S Xeon Series',
    summary: 'Single-socket 1U format. Configuration details available from ZMD.',
    image: assets.serverModel1U,
    imageAlt: 'ZMD 1U single-socket Xeon server format',
    availabilityLabel: 'Coming soon',
  },
  {
    slug: '2u-1s-xeon',
    name: '2U/1S Xeon Series',
    summary: 'Single-socket 2U format. Configuration details available from ZMD.',
    image: assets.serverModel4U,
    imageAlt: 'ZMD 2U single-socket Xeon server format',
    availabilityLabel: 'Coming soon',
  },
  {
    slug: '4u-2s-xeon',
    name: '4U/2S Xeon Series',
    summary: 'Dual-socket 4U format. Configuration details available from ZMD.',
    image: assets.serverModel2U,
    imageAlt: 'ZMD 4U dual-socket Xeon server format',
    availabilityLabel: 'Coming soon',
  },
];

export const serverApplications = [
  ['Cloud infrastructure', assets.homeServerIndustrial, 'ZMD AI Datacenter Server installed in datacenter infrastructure'],
  ['Virtualization', assets.serverBlueprintInternal, 'Internal platform view of the RS240 server'],
  ['Database servers', assets.serverBlueprintFront, 'Front platform view of the RS240 server'],
  ['AI and machine learning', assets.serverBlueprintRear, 'Rear platform view of the RS240 server'],
  ['High-performance computing', assets.serverHero, 'ZMD RS240 2U dual-socket server'],
];

export function ServerSpecificationTable() {
  const [activeGroupTitle, setActiveGroupTitle] = React.useState(serverSpecificationGroups[0].title);
  const activeGroup = serverSpecificationGroups.find((group) => group.title === activeGroupTitle) || serverSpecificationGroups[0];

  return (
    <div className="camera-specification-layout product-specification-layout--full">
      <div className="camera-specification-main">
        <div className="camera-specification-tabs" aria-label="Server specification categories">
          {serverSpecificationGroups.map((group) => (
            <button
              key={group.title}
              type="button"
              className={group.title === activeGroup.title ? 'is-active' : ''}
              aria-pressed={group.title === activeGroup.title}
              onClick={() => setActiveGroupTitle(group.title)}
            >
              {group.title}
            </button>
          ))}
        </div>
        <div className="camera-specification-table" role="region" aria-label={`${activeGroup.title}: RS240 specifications`} tabIndex="0">
          <table>
            <thead><tr><th scope="col">Specification</th><th scope="col">RS240</th></tr></thead>
            <tbody>
              {activeGroup.rows.map(([label, value]) => (
                <tr key={label}><th scope="row">{label}</th><td>{value}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
