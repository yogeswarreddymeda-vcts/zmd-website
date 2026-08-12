// =============================================================================
// ZEVRIC EDGE DEVICES PAGE
// =============================================================================

import React from 'react';
import { Link } from 'react-router-dom';
import cameraApplicationIndustrial from '../assets/images/edge-devices/ppever.webp';
import edgeSharedPlatform from '../assets/images/edge-devices/zevric-shared-platform-transparent.webp';
import edgeHeroFrontStudio from '../assets/images/edge-devices/zevric-hero-front-studio.webp';
import edgeHeroRearStudio from '../assets/images/edge-devices/zevric-hero-rear-studio.webp';
import intelCoreUltraBadges from '../assets/images/edge-devices/intel-core-ultra-series-2-badges.webp';
import '../assets/css/EdgeDevices.css';

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
      <span className="carousel-controls__marks" aria-hidden="true">
        {Array.from({ length: count }, (_, index) => <i className={`carousel-controls__mark ${index === activeIndex ? 'is-active' : ''}`} key={index} />)}
      </span>
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
          {eyebrow && <span className="product-story-hero__eyebrow">{eyebrow}</span>}
          <h1 tabIndex="-1">{title}</h1><p>{body}</p>
          <div className="product-story-hero__actions">
            {primaryAction && <Link className="button button--primary" to={primaryAction.to}>{primaryAction.label} <span aria-hidden="true">→</span></Link>}
            {secondaryAction && <Link className="button button--light" to={secondaryAction.to}>{secondaryAction.label} <span aria-hidden="true">→</span></Link>}
          </div>
        </div>
        <div className={`product-story-hero__visual ${activeSlide.fit === 'contain' ? 'product-story-hero__visual--contain' : ''} ${activeSlide.visualTone ? `product-story-hero__visual--${activeSlide.visualTone}` : ''}`} role="tabpanel" id="product-media-panel" aria-label={activeSlide.navigationLabel || activeSlide.eyebrow} onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={handleTouchEnd}>
          {activeSlide.render || <img key={activeSlide.image} src={activeSlide.image} alt={activeSlide.imageAlt} loading="eager" decoding="async" fetchPriority={activeIndex === 0 ? 'high' : 'auto'} />}
          {activeSlide.mediaBadge && <img className="product-story-hero__media-badge" src={activeSlide.mediaBadge.image} alt={activeSlide.mediaBadge.imageAlt} loading="eager" decoding="async" fetchPriority="high" />}
          {!autoAdvanceMs && <><span className="product-story-hero__index" aria-hidden="true">0{activeIndex + 1} / 0{slides.length}</span>{activeSlide.caption && <span className="product-story-hero__caption" aria-live="polite">{activeSlide.caption}</span>}</>}
        </div>
        {autoAdvanceMs && <CarouselControls className="product-story-hero__controls" count={slides.length} activeIndex={activeIndex} onPrevious={() => selectRelative(-1)} onNext={() => selectRelative(1)} durationMs={autoAdvanceMs} label="Product media navigation" />}
      </div>
      {!autoAdvanceMs && (
        <div className="site-container product-story-hero__navigation" role="tablist" aria-label="Select a product view">
          {slides.map((slide, index) => (
            <button type="button" role="tab" className={index === activeIndex ? 'is-active' : ''} aria-selected={index === activeIndex} aria-controls="product-media-panel" tabIndex={index === activeIndex ? 0 : -1} onClick={() => setActiveIndex(index)} onKeyDown={(event) => handleTabKey(event, index)} key={slide.navigationLabel || slide.eyebrow}>
              <span>0{index + 1}</span><strong>{slide.navigationLabel || slide.eyebrow}</strong>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

const assets = { cameraApplicationIndustrial, edgeHeroFrontStudio, edgeHeroRearStudio, edgeSharedPlatform, intelCoreUltraBadges };

export default function EdgeDevicesPage() {
  const motionRoot = React.useRef(null);

  React.useLayoutEffect(() => {
    const root = motionRoot.current;
    if (!root) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const selectors = [
      '.zevric-product-hero .product-story-hero__copy h1',
      '.zevric-product-hero .product-story-hero__copy > p',
      '.zevric-product-hero .product-story-hero__actions .button',
      '.zevric-product-hero .product-story-hero__visual',
      '.zevric-product-hero .product-story-hero__controls',
      '.zevric-overview__grid > div',
      '.zevric-lineup .section-intro h2',
      '.zevric-lineup__guide',
      '.zevric-card',
      '.zevric-lineup > .site-container > .content-qualifier',
      '.zevric-comparison h2',
      '.zevric-comparison__table-scroll',
      '.zevric-platform .section-intro h2',
      '.zevric-platform__visual',
      '.zevric-platform__specs > div',
      '.zevric-feature-grid article',
      '.zevric-product-bridge__copy > *',
      '.zevric-product-bridge__visual',
      '.zevric-oem-cta h2',
      '.zevric-oem-cta p',
      '.zevric-oem-cta .button',
    ];

    const items = [...root.querySelectorAll(selectors.join(','))];
    const syncItem = (item) => {
      const bounds = item.getBoundingClientRect();
      const visible = keepFinalSectionVisibleAtPageEnd(item, root) || (item.classList.contains('is-zevric-motion-visible')
        ? bounds.top <= window.innerHeight * 1.05 && bounds.bottom >= window.innerHeight * -0.05
        : bounds.top <= window.innerHeight * 0.92 && bounds.bottom >= window.innerHeight * 0.01);
      item.classList.toggle('is-zevric-motion-visible', reducedMotion.matches || visible);
    };

    items.forEach((item, index) => {
      item.classList.add('zevric-motion-item');
      item.style.setProperty('--zevric-motion-order', index % 8);
    });
    root.classList.add('zevric-motion-ready');
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
    <div className="site-page zevric-product-page" ref={motionRoot}>


      {/* ========================== ZEVRIC HERO SECTION ========================== */}


      <ProductStoryHero
        slides={zevricHeroSlides}
        title="Zevric Compact Edge Systems"
        body="Select processor, cooling and accelerator options on a shared Mini-ITX hardware platform."
        className="zevric-product-hero zevric-product-hero--blueprint"
        autoAdvanceMs={AUTO_CAROUSEL_INTERVAL}
        primaryAction={{ label: 'Compare configurations', to: '/products/edge-devices#configurations' }}
        secondaryAction={{ label: 'Discuss a Zevric configuration', to: '/contact' }}
      />


      {/* ==================== SHARED ZEVRIC PLATFORM OVERVIEW ==================== */}


      <section className="zevric-overview" aria-label="Shared Zevric platform">
        <div className="site-container zevric-overview__grid">
          <div><span>Shared foundation</span><strong>One Mini-ITX board and I/O topology</strong></div>
          <div><span>Workload choice</span><strong>Core Ultra 5, 7 or 9 configurations</strong></div>
          <div><span>Expansion path</span><strong>Integrated acceleration or discrete GPU</strong></div>
          <div><span>Industrial connectivity</span><strong>Dual LAN, display and expansion interfaces</strong></div>
        </div>
      </section>


      {/* ==================== ZEVRIC CONFIGURATIONS SECTION ==================== */}


      <section className="section section--paper surface-transition surface-transition--light zevric-lineup edge-surface-motif edge-surface-motif--technical" id="configurations">
        <div className="site-container">
          <SectionIntro title="Three Zevric configurations" />
          <div className="zevric-lineup__guide">
            <p>Three processor levels, including one discrete-GPU configuration, on a shared board and I/O platform.</p>
          </div>
          <ZevricProductGrid />
          <p className="content-qualifier zevric-lineup__disclaimer">
            <small>Disclaimer</small>
            TOPS values are peak silicon specifications for the stated accelerator, not measured application performance. Product imagery is representative.
          </p>
          <div className="zevric-comparison" id="comparison">
            <h2 id="zevric-comparison-title">Configuration comparison</h2>
            <div className="zevric-comparison__table-scroll" role="region" aria-labelledby="zevric-comparison-title" tabIndex="0">
              <table>
                <caption>Comparison of Zevric Compact Edge System configurations</caption>
                <thead>
                  <tr>
                    <th scope="col">Specification</th>
                    {edgeProducts.map((product) => (
                      <th scope="col" key={product.slug}>
                        {product.name}<small>{product.sku}</small>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {zevricComparisonRows.map(([label, key]) => (
                    <tr key={key}>
                      <th scope="row">{label}</th>
                      {edgeProducts.map((product, productIndex) => (
                        <td
                          data-label={product.name}
                          key={product.slug}
                        >
                          <span className={productIndex === 0 || productIndex === 2 ? 'zevric-comparison__blurred-content' : undefined}>
                            <SpecValue value={key === 'processor' ? product.processor : product.comparison[key]} />
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="zevric-comparison__column-status zevric-comparison__column-status--nano">
                <span>Coming soon</span>
              </div>
              <div className="zevric-comparison__column-status zevric-comparison__column-status--ultra">
                <span>Coming soon</span>
              </div>
            </div>
          </div>
          <p className="content-qualifier"><sup className="pending-mark" aria-hidden="true">†</sup> Proposed value pending engineering validation.</p>
        </div>
      </section>



      {/* ====================== SHARED HARDWARE PLATFORM ====================== */}


      <section className="section zevric-platform edge-surface-motif edge-surface-motif--technical" id="platform">
        <div className="site-container">
          <SectionIntro title="Shared platform" />
          <div className="zevric-platform__layout">
            <div className="zevric-platform__visual">
              <img src={assets.edgeSharedPlatform} alt="Zevric Compact Edge System illustrative configuration" loading="lazy" decoding="async" />
              <span>Illustrative configuration</span>
            </div>
            <dl className="zevric-platform__specs">
              {zevricPlatformSpecs.map(([label, value]) => (
                <div key={label}><dt>{label}</dt><dd><SpecValue value={value} /></dd></div>
              ))}
            </dl>
          </div>
          <div className="zevric-feature-grid">
            {zevricPlatformFeatures.map(([title, description], index) => (
              <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div></article>
            ))}
          </div>
        </div>
      </section>



      {/* ======================== EDGE AI DEPLOYMENT BRIDGE ======================== */}


      <section className="section zevric-product-bridge">
        <div className="site-container zevric-product-bridge__inner">
          <div className="zevric-product-bridge__copy">
            <span className="micro-label">Edge AI</span>
            <h2>Zevric in Edge AI deployments</h2>
            <p>Possible applications include local video processing, industrial inspection, site intelligence and distributed operations. Customers and integrators choose the runtime, models, applications and integrations.</p>
            <Link className="text-link" to="/edge-ai#applications">Explore Edge AI applications <span aria-hidden="true">→</span></Link>
          </div>
          <div className="zevric-product-bridge__visual">
            <img src={assets.cameraApplicationIndustrial} alt="Industrial site using cameras and local vision processing" loading="lazy" decoding="async" />
          </div>
        </div>
      </section>



      {/* ========================= ZEVRIC OEM ENQUIRY ========================= */}


      <section className="section zevric-oem-cta">
        <div className="site-container zevric-oem-cta__inner">
          <div className="edge-surface-motif edge-surface-motif--blueprint">
            <h2>Zevric for OEM portfolios</h2>
            <p>ZMD offers Zevric in standard, branded and white-label configurations.</p>
          </div>
          <ArrowButton to="/contact" light>Discuss a Zevric configuration</ArrowButton>
        </div>
      </section>
    </div>
  );
}
export function ZevricProductGrid() {
  return (
    <div className="zevric-grid">
      {edgeProducts.map((product, index) => (
        <article className="zevric-card" key={product.slug}>
          <div className="zevric-card__visual">
            <img src={product.image} alt={product.imageAlt} loading="lazy" decoding="async" />
            {(index === 0 || index === 2) && <span className="zevric-card__coming-soon">Coming soon</span>}
          </div>
          <div className="zevric-card__body">
            <header>
              <h3>{product.name}</h3>
            </header>
            <strong className="zevric-card__processor">{product.processor}</strong>
            <p>{product.summary}</p>
            <dl className="zevric-card__metrics">
              <div><dt>NPU</dt><dd><SpecValue value={product.comparison.npu} /></dd></div>
              <div><dt>SoC AI</dt><dd className={product.comparison.soc === 'Not stated' ? 'is-muted' : undefined}><SpecValue value={product.comparison.soc} /></dd></div>
              <div>
                <dt>Discrete GPU</dt>
                <dd className={product.comparison.gpu === 'None' ? 'is-muted' : undefined}>
                  <SpecValue value={product.comparison.gpu} />
                  {product.discreteGpu && <small>Peak: <SpecValue value={product.comparison.gpuPeak} /></small>}
                </dd>
              </div>
              <div><dt>Accelerator</dt><dd><SpecValue value={product.comparison.accelerator} /></dd></div>
              <div><dt>Cooling</dt><dd><SpecValue value={product.comparison.cooling} /></dd></div>
            </dl>
          </div>
        </article>
      ))}
    </div>
  );
}

export function SpecValue({ value }) {
  const parts = String(value).split('†');
  return parts.map((part, index) => (
    <React.Fragment key={`${part}-${index}`}>
      {part}
      {index < parts.length - 1 && <sup className="pending-mark" aria-label="Pending engineering validation">†</sup>}
    </React.Fragment>
  ));
}

export const zevricComparisonRows = [
  ['Processor', 'processor'],
  ['Cores and clocks', 'cores'],
  ['Integrated graphics', 'graphics'],
  ['NPU peak', 'npu'],
  ['SoC peak', 'soc'],
  ['Discrete GPU', 'gpu'],
  ['Discrete GPU peak', 'gpuPeak'],
  ['Accelerator', 'accelerator'],
  ['Cooling', 'cooling'],
  ['Operating temperature', 'temperature'],
  ['Power input', 'power'],
  ['Availability', 'availability'],
];

export const zevricPlatformSpecs = [
  ['Processor options', 'Intel® Core™ Ultra 5 225H / Ultra 7 255H / Ultra 9 285H'],
  ['Memory', '2 × SO-DIMM · up to 96 GB dual-channel DDR5'],
  ['Storage', '2 × M.2 Key M PCIe Gen4 ×4 · 2 × SATA3'],
  ['Expansion', 'PCIe ×8 Gen5 · M.2 Key E · M.2 Key B + SIM'],
  ['Networking', '1 GbE Intel® I219-LM with vPro® · 2.5 GbE'],
  ['Rear I/O', '4 × HDMI 2.1 · USB · audio'],
  ['Power input', 'DC input on XE and XE-Pro · XE-Ultra AC PSU pending definition†'],
  ['Form factor', 'Mini-ITX · 200 × 200 × 65 mm'],
];

export const zevricPlatformFeatures = [
  ['Shared Intel platform', 'Core Ultra 5, 7 and 9 options on one Mini-ITX board.'],
  ['On-device AI', '13 TOPS NPU standard. XE-Pro reaches 99 TOPS peak SoC AI.'],
  ['Dual-network design', '1 GbE Intel vPro® and 2.5 GbE ports support separate network paths.'],
  ['Display and vision I/O', 'Four HDMI 2.1 outputs plus internal camera and display interfaces.'],
  ['PCIe Gen5 expansion', 'PCIe ×8 Gen5 for selected accelerators. XE-Ultra adds a discrete GPU.'],
  ['Edge deployment controls', 'Hardware watchdog for unattended sites. Power input varies by model.'],
];

export const zevricHeroSlides = [
  {
    navigationLabel: 'Front view',
    image: assets.edgeHeroFrontStudio,
    imageAlt: 'Front view of a Zevric Compact Edge System in a dark studio environment',
    caption: 'Zevric Compact Edge System / front view',
    visualTone: 'studio-dark',
    mediaBadge: {
      image: assets.intelCoreUltraBadges,
      imageAlt: 'Intel Core Ultra 5, 7 and 9 processor badges',
    },
  },
  {
    navigationLabel: 'Rear connectivity',
    image: assets.edgeHeroRearStudio,
    imageAlt: 'Rear connectivity view of a Zevric Compact Edge System in a dark studio environment',
    caption: 'Zevric Compact Edge System / rear connectivity',
    visualTone: 'studio-dark',
    mediaBadge: {
      image: assets.intelCoreUltraBadges,
      imageAlt: 'Intel Core Ultra 5, 7 and 9 processor badges',
    },
  },
];
export const edgeProducts = [
  {
    slug: 'zevric-xe',
    number: '01',
    profile: 'Entry configuration',
    name: 'Zevric Nano',
    processor: 'Intel® Core™ Ultra Series',
    summary: 'Core Ultra 5 configuration on the shared Zevric board and I/O platform.',
    image: edgeSharedPlatform,
    imageAlt: 'Representative Zevric shared-platform configuration',
    metrics: [
      ['NPU peak', '13 TOPS'],
      ['CPU cores', '14'],
      ['Cooling', 'Fanless or active'],
    ],
    comparison: {
      cores: '14C: 4P + 8E + 2LPE, up to 4.9 GHz',
      graphics: 'Intel® Arc™ 130T',
      npu: '13 TOPS',
      soc: 'Coming soon',
      gpu: 'None',
      gpuPeak: 'Not applicable',
      accelerator: 'Axelera Embedded 110m',
      cooling: 'Fanless or active',
      temperature: '−20 to +70 °C',
      power: '12–28 V DC',
      availability: 'Available',
    },
  },
  {
    slug: 'zevric-xe-pro',
    number: '02',
    profile: 'Maximum integrated AI',
    name: 'Zevric-Pro',
    processor: 'Intel® Core™ Ultra 9 285H',
    summary: 'Core Ultra 7 configuration with a 99 TOPS peak SoC specification and no discrete GPU.',
    image: edgeSharedPlatform,
    imageAlt: 'Representative Zevric XE-Pro shared-platform configuration',
    metrics: [
      ['NPU peak', '13 TOPS'],
      ['SoC peak', '99 TOPS'],
      ['Cooling', 'Fanless or active'],
    ],
    comparison: {
      cores: '16C: 6P + 8E + 2LPE, up to 5.1 GHz',
      graphics: 'Intel® Arc™ 140T, 8 Xe cores',
      npu: '13 TOPS',
      soc: '99 TOPS',
      gpu: 'None',
      gpuPeak: 'Not applicable',
      accelerator: 'Axelera Embedded 110m',
      cooling: 'Fanless or active',
      temperature: '−20 to +70 °C',
      power: '12–28 V DC',
      availability: 'Available',
    },
  },
  {
    slug: 'zevric-xe-ultra',
    number: '03',
    profile: 'XE-Ultra platform with discrete GPU',
    name: 'Zevric-Ultra',
    processor: 'Intel® Core™ Ultra Series',
    summary: 'Core Ultra 9 configuration with an Intel® Arc™ Pro B60 24 GB discrete GPU.',
    discreteGpu: true,
    image: edgeSharedPlatform,
    imageAlt: 'Representative Zevric XE-Ultra shared-platform configuration',
    metrics: [
      ['NPU peak', '13 TOPS'],
      ['GPU peak', '197 TOPS INT8'],
      ['GPU memory', '24 GB'],
    ],
    comparison: {
      cores: '16C: 6P + 8E + 2LPE, up to 5.4 GHz',
      graphics: 'Intel® Arc™ 140T, 8 Xe cores',
      npu: '13 TOPS',
      soc: 'Coming soon',
      gpu: 'Intel® Arc™ Pro B60, 24 GB',
      gpuPeak: '197 TOPS INT8',
      accelerator: 'Axelera Embedded 110m',
      cooling: 'Active only',
      temperature: '0 to +40 °C†',
      power: 'AC PSU, pending definition†',
      availability: 'Available',
    },
  },
];
