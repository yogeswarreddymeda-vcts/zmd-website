// =============================================================================
// CAMERA PRODUCTS PAGE
// =============================================================================

import React from 'react';
import { Link } from 'react-router-dom';
import cameraDual from '../assets/images/cam/duallens_ourmodel.webp';
import cameraHeadMount from '../assets/images/cam/headmountcam.webp';
import cameraBullet from '../assets/images/cam/bulletcam-clean-v3.webp';
import cameraApplicationAccess from '../assets/images/cam/facrecog.webp';
import cameraApplicationTraffic from '../assets/images/cam/licp.webp';
import cameraApplicationFire from '../assets/images/cam/firede.webp';
import cameraApplicationIndustrial from '../assets/images/cam/ppever.webp';
import cameraHeroDualLens from '../assets/images/cam/camera-hero-dual-lens-panorama.webp';
import cameraHeroBullet from '../assets/images/cam/camera-hero-bullet-perimeter.webp';
import cameraHeroHeadMount from '../assets/images/cam/camera-hero-head-mount-factory.webp';
import '../assets/css/Cam.css';

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
        <div className="product-story-hero__copy">
          {eyebrow && <span className="product-story-hero__eyebrow">{eyebrow}</span>}<h1 tabIndex="-1">{title}</h1><p>{body}</p>
          <div className="product-story-hero__actions">{primaryAction && <Link className="button button--primary" to={primaryAction.to}>{primaryAction.label} <span aria-hidden="true">→</span></Link>}{secondaryAction && <Link className="button button--light" to={secondaryAction.to}>{secondaryAction.label} <span aria-hidden="true">→</span></Link>}</div>
        </div>
        <div className={`product-story-hero__visual ${activeSlide.fit === 'contain' ? 'product-story-hero__visual--contain' : ''} ${activeSlide.visualTone ? `product-story-hero__visual--${activeSlide.visualTone}` : ''}`} role="tabpanel" id="product-media-panel" aria-label={activeSlide.navigationLabel || activeSlide.eyebrow} onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={handleTouchEnd}>
          {activeSlide.render || <img key={activeSlide.image} src={activeSlide.image} alt={activeSlide.imageAlt} loading="eager" decoding="async" fetchPriority={activeIndex === 0 ? 'high' : 'auto'} />}
          {activeSlide.mediaBadge && <img className="product-story-hero__media-badge" src={activeSlide.mediaBadge.image} alt={activeSlide.mediaBadge.imageAlt} loading="eager" decoding="async" fetchPriority="high" />}
          {!autoAdvanceMs && <><span className="product-story-hero__index" aria-hidden="true">0{activeIndex + 1} / 0{slides.length}</span>{activeSlide.caption && <span className="product-story-hero__caption" aria-live="polite">{activeSlide.caption}</span>}</>}
        </div>
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

const assets = { cameraApplicationAccess, cameraApplicationFire, cameraApplicationIndustrial, cameraApplicationTraffic, cameraHeroBullet, cameraHeroDualLens, cameraHeroHeadMount };

export default function CamerasPage() {
  const motionRoot = React.useRef(null);

  React.useLayoutEffect(() => {
    const root = motionRoot.current;
    if (!root) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const selectors = [
      '.camera-story-hero .product-story-hero__copy h1',
      '.camera-story-hero .product-story-hero__copy > p',
      '.camera-story-hero .product-story-hero__actions .button',
      '.camera-story-hero .product-story-hero__visual',
      '.camera-story-hero .product-story-hero__controls',
      '.product-highlight-band__grid > div',
      '.camera-models .section-intro h2',
      '.camera-model-card',
      '.camera-specifications .section-intro h2',
      '.camera-specification-tabs button',
      '.camera-specification-table',
      '.camera-specification-table tbody tr',
      '.camera-specifications .content-qualifier',
      '.camera-applications .section-intro h2',
      '.camera-application-grid article',
      '.camera-applications .section-action',
      '.product-oem-engagement h2',
      '.product-oem-engagement p',
      '.product-oem-engagement .button',
    ];

    let revealObserver;
    const registered = new WeakSet();

    const syncElementVisibility = (element) => {
      const bounds = element.getBoundingClientRect();
      const wasVisible = element.classList.contains('is-camera-motion-visible');
      const isVisible = keepFinalSectionVisibleAtPageEnd(element, root) || (wasVisible
        ? bounds.top <= window.innerHeight * 1.05 && bounds.bottom >= window.innerHeight * -0.05
        : bounds.top <= window.innerHeight * 0.92 && bounds.bottom >= window.innerHeight * 0.01);
      element.classList.toggle('is-camera-motion-visible', reducedMotion.matches || isVisible);
    };

    const syncVisibility = () => {
      root.querySelectorAll('.camera-motion-item').forEach(syncElementVisibility);
    };

    const registerElements = () => {
      root.querySelectorAll(selectors.join(',')).forEach((element, index) => {
        if (registered.has(element)) return;
        registered.add(element);
        element.classList.add('camera-motion-item');
        element.style.setProperty('--camera-motion-order', index % 8);
        if (reducedMotion.matches) element.classList.add('is-camera-motion-visible');
        else revealObserver.observe(element);
      });
    };

    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        syncElementVisibility(entry.target);
      });
    }, { threshold: 0.01, rootMargin: '0px 0px -7% 0px' });

    root.classList.add('camera-motion-ready');
    registerElements();
    syncVisibility();

    const mutationObserver = new MutationObserver(() => {
      registerElements();
      syncVisibility();
    });
    mutationObserver.observe(root, { childList: true, subtree: true });

    let frame = 0;
    const handleScroll = () => {
      if (frame || reducedMotion.matches) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        syncVisibility();
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      mutationObserver.disconnect();
      revealObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="site-page camera-page" ref={motionRoot}>


      {/* ========================= CAMERA HERO SECTION ========================= */}


      <ProductStoryHero
        slides={cameraHeroSlides}
        title="Cameras for OEM portfolios"
        body="Three formats for panoramic, directional and hands-free imaging."
        className="camera-story-hero"
        autoAdvanceMs={AUTO_CAROUSEL_INTERVAL}
        primaryAction={{ label: 'View camera models', to: '/products/cameras#camera-models' }}
        secondaryAction={{ label: 'Discuss camera requirements', to: '/contact' }}
        tone="navy"
      />


      {/* ======================= CAMERA HIGHLIGHTS SECTION ======================= */}


      <ProductHighlights
        items={[
          ['Imaging', '2 MP per sensor'],
          ['Coverage', '180° panoramic or 110° wide'],
          ['On-device AI', '14 analytics engines'],
          ['Local storage', 'MicroSD up to 512 GB'],
        ]}
      />


      {/* ========================= CAMERA MODELS SECTION ========================= */}


      <section className="section section--paper camera-models surface-band surface-band--neutral" id="camera-models">
        <div className="site-container">
          <SectionIntro title="Camera models" />
          <div className="camera-model-grid">
            {cameraProducts.map((product) => <CameraModelCard key={product.slug} product={product} />)}
          </div>
        </div>
      </section>


      {/* ====================== CAMERA SPECIFICATIONS SECTION ====================== */}


      <section className="section camera-specifications" id="camera-specifications">
        <div className="site-container">
          <SectionIntro
            title="Specifications"
            light
          />
          <CameraSpecificationTable />
          <p className="content-qualifier">Specifications below cover Dual Lens and Single Lens models. Bullet Camera and Head-Mount Camera configuration details are available from ZMD.</p>
        </div>
      </section>


      {/* ====================== CAMERA APPLICATIONS SECTION ====================== */}


      <section className="section camera-applications surface-band surface-band--neutral" id="camera-applications">
        <div className="site-container">
          <SectionIntro title="Application areas" />
          <ProductApplicationCards items={cameraApplicationVisuals} />
          <div className="section-action"><ArrowButton to="/solutions" secondary>View solution areas</ArrowButton></div>
        </div>
      </section>


      {/* ======================== CAMERA ENQUIRY SECTION ======================== */}


      <OEMEngagement
        title="Add ZMD Cameras to your portfolio"
        body="Discuss standard, branded or white-label Camera configurations and supply requirements."
        action="Discuss camera requirements"
      />
    </div>
  );
}
export const cameraApplicationVisuals = [
  ['Access and people flow', assets.cameraApplicationAccess, 'Camera coverage across a building entrance and lobby'],
  ['Traffic and vehicle analytics', assets.cameraApplicationTraffic, 'Multi-lane road captured for vehicle analytics'],
  ['Fire and smoke monitoring', assets.cameraApplicationFire, 'Industrial production floor with a visible fire event'],
  ['Industrial safety visibility', assets.cameraApplicationIndustrial, 'Industrial team monitored for safety and protective equipment'],
];

export const cameraHeroSlides = [
  {
    eyebrow: 'Dual-Lens Camera',
    navigationLabel: 'Dual-Lens Camera',
    image: assets.cameraHeroDualLens,
    imageAlt: 'ZMD dual-lens camera overlooking a city from a building exterior',
    caption: 'Panoramic coverage format',
  },
  {
    eyebrow: 'Single-Lens Bullet Camera',
    navigationLabel: 'Single-Lens Bullet Camera',
    image: assets.cameraHeroBullet,
    imageAlt: 'ZMD single-lens bullet camera mounted at a modern industrial perimeter',
    caption: 'Directional perimeter format',
  },
  {
    eyebrow: 'Head-Mount Camera',
    navigationLabel: 'Head-Mount Camera',
    image: assets.cameraHeroHeadMount,
    imageAlt: 'Industrial inspection technician using a ZMD head-mount camera',
    caption: 'Hands-free mobile format',
  },
];

export const cameraSpecGroups = [
  {
    id: 'optics',
    label: 'Optics & imaging',
    rows: [
      ['Resolution', '2 MP', '2 MP'],
      ['Image Sensor', 'Dual 1/2.8" Progressive Scan CMOS Sensors', '1/2.8" Progressive Scan CMOS Sensor'],
      ['Lens Type', 'Fixed Focus 4mm High-Precision Lens', 'Fixed Focus 4mm Lens'],
      ['Field of View', 'Horizontal 180°, Vertical 50° Panoramic', 'Horizontal 110°, Vertical 50° Wide Coverage'],
      ['Night Vision', 'High-Power IR LED (Up to 40 Meters, 0 Lux)', 'Smart IR LED (Up to 40 Meters, 0 Lux)'],
      ['Dynamic Range', 'WDR (Wide Dynamic Range) for Backlight', 'WDR (Wide Dynamic Range) for Backlight'],
    ],
  },
  {
    id: 'video-network',
    label: 'Video & network',
    rows: [
      ['Video Compression', 'H.265 / H.264 Multi-Mode', 'H.265 / H.264 Multi-Mode'],
      ['Max Frame Rate', '30fps', '30fps'],
      ['Streaming', 'Triple Stream Support (Main, Sub, Third)', 'Triple Stream Support (Main, Sub, Third)'],
      ['Ethernet Port', 'RJ45 10/100 Mbps Self-Adaptive Interface', 'RJ45 10/100 Mbps Self-Adaptive Interface'],
      ['ONVIF Standard', 'ONVIF Profile S, Profile G, Profile T, Profile M', 'ONVIF Profile S, Profile G, Profile T, Profile M'],
      ['Protocols', 'RTSP, RTMP, HTTP, HTTPS, TCP/IP, UDP', 'RTSP, RTMP, HTTP, HTTPS, TCP/IP, UDP'],
    ],
  },
  {
    id: 'edge-ai',
    label: 'Edge AI & storage',
    rows: [
      ['Edge Processor', 'Integrated NPU for Real-Time Edge AI ', 'Integrated NPU for Real-Time Edge AI '],
      ['Analytics Engines', '14 On-Board Real-Time Detection Engines', '14 On-Board Real-Time Detection Engines'],
      ['Local Processing', 'Zero Cloud Latency On-Chip Rule Evaluation', 'Zero Cloud Latency On-Chip Rule Evaluation'],
      ['Event Triggers', 'Intrusion, Line Crossing, ANPR, Face, PPE', 'Intrusion, Line Crossing, ANPR, Face, PPE'],
      ['Alert Mechanism', 'Email Alert, HTTP Post Webhook, Alarm Out', 'Email Alert, HTTP Post Webhook, Alarm Out'],
      ['Edge Storage', 'MicroSD Card Slot (Up to 512GB Support)', 'MicroSD Card Slot (Up to 512GB Support)'],
    ],
  },
  {
    id: 'physical',
    label: 'Physical & power',
    rows: [
      ['Form Factor', 'Dome Camera Housing', 'Bullet Camera Housing'],
      ['Weatherproofing', 'IP67 Waterproof Standard (Dust & Water Immersion)', 'IP67 Waterproof Standard (Dust & Water Immersion)'],
      ['Vandal Resistance', 'IK10 Impact Resistance Metal Enclosure', '—'],
      ['Power Supply', '12V DC / PoE Standard (IEEE 802.3af)', '12V DC / PoE Standard (IEEE 802.3af)'],
      ['Power Consumption', '1.3W Typical / 4.2W Peak (12.5W Max IR/AI Active)', 'MAX 12W'],
      ['Operating Temp', '-20°C to +70°C', '-20°C to +70°C'],
      ['Compliance', 'BIS, STQC', 'BIS, STQC'],
      ['Dimensions', '⌀ 95mm × 120mm / 1200g', '83mm × 73mm × 228mm / 1980g'],
    ],
  },
];

export function CameraSpecificationTable() {
  const [activeGroupId, setActiveGroupId] = React.useState(cameraSpecGroups[0].id);
  const activeGroup = cameraSpecGroups.find((group) => group.id === activeGroupId) || cameraSpecGroups[0];

  return (
    <div className="camera-specification-layout product-specification-layout--full">
      <div className="camera-specification-main">
        <div className="camera-specification-tabs" aria-label="Camera specification categories">
          {cameraSpecGroups.map((group) => (
            <button
              key={group.id}
              type="button"
              className={group.id === activeGroup.id ? 'is-active' : ''}
              aria-pressed={group.id === activeGroup.id}
              onClick={() => setActiveGroupId(group.id)}
            >
              {group.label}
            </button>
          ))}
        </div>
        <p className="camera-specification-swipe-hint">Swipe to compare both camera models →</p>
        <div className="camera-specification-table" role="region" aria-label={`${activeGroup.label}: Dual Lens and Single Lens camera comparison`} tabIndex="0">
          <table>
            <thead>
              <tr>
                <th scope="col">Specification</th>
                <th scope="col">Dual-Lens Camera</th>
                <th scope="col">Single-Lens Camera</th>
              </tr>
            </thead>
            <tbody>
              {activeGroup.rows.map(([label, dualLens, singleLens]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  <td>{dualLens}</td>
                  <td>{singleLens}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export const cameraProducts = [
  {
    slug: 'dual-lens-camera',
    number: '01',
    name: 'Dual-Lens Camera',
    category: 'Panoramic coverage',
    form: 'Dual lens',
    status: 'Available',
    summary: 'Panoramic coverage for entrances, perimeters and open areas.',
    image: cameraDual,
    imageAlt: 'ZMD dual-lens dome camera',
  },
  {
    slug: 'bullet-camera',
    number: '02',
    name: 'Single-Lens Bullet Camera',
    category: 'Long-range vision',
    form: 'Bullet',
    status: 'Available',
    summary: 'Directional imaging for perimeters and extended sightlines.',
    image: cameraBullet,
    imageAlt: 'ZMD single-lens bullet camera',
  },
  {
    slug: 'head-mount-camera',
    number: '03',
    name: 'Head-Mount Camera',
    category: 'Wearable imaging',
    form: 'Head-mount cam',
    status: 'Available',
    summary: 'Hands-free imaging for mobile teams and frontline operations.',
    image: cameraHeadMount,
    imageAlt: 'ZMD head-mount camera',
  },
];
