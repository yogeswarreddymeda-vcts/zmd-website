// =============================================================================
// HOME PAGE
// =============================================================================

import React from 'react';
import { Link } from 'react-router-dom';
import cameraHeroDualLens from '../assets/images/home/camera-hero-dual-lens-panorama.webp';
import cameraHeroBullet from '../assets/images/home/camera-hero-bullet-perimeter.webp';
import intelCoreUltraBadges from '../assets/images/home/intel-core-ultra-series-2-badges.webp';
import homeEdgeIndustrial from '../assets/images/home/home-edge-industrial-v1.webp';
import homeZevricIndustrialEdge from '../assets/images/home/home-zevric-industrial-edge.webp';
import homeCameraIndustrial from '../assets/images/home/home-camera-mounted-v1.webp';
import homeServerIndustrial from '../assets/images/home/home-server-context-v2.webp';
import homeIotIndustrial from '../assets/images/home/home-iot-context-v2.webp';
import securitySolution from '../assets/images/home/security-perimeter-v1.webp';
import citiesSolution from '../assets/images/home/smart-cities-mobility-v1.webp';
import airportSolution from '../assets/images/home/airport-operations-v1.webp';
import industrialDetail from '../assets/images/home/industrial-operations.webp';
import healthcareDetail from '../assets/images/home/healthcare-operations-v2.webp';
import retailDetail from '../assets/images/home/retail-operations.webp';
import homePhysicalAISense from '../assets/images/home/home-sense.webp';
import homePhysicalAILocalCompute from '../assets/images/home/home-local-compute.webp';
import homePhysicalAIDatacenterCompute from '../assets/images/home/home-datacenter-compute.webp';
import homePhysicalAIApplications from '../assets/images/home/home-intelligent-applications.webp';
import homePhysicalAIOperations from '../assets/images/home/home-connected-operations.webp';
import '../assets/css/Home.css';

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

function CarouselControls({ count, activeIndex, onPrevious, onNext, durationMs = 0, isPaused = false, className = '', label = 'Carousel navigation' }) {
  return (
    <div
      className={`carousel-controls ${isPaused ? 'is-paused' : ''} ${className}`}
      role="group"
      aria-label={label}
      style={durationMs ? { '--carousel-progress-duration': `${durationMs}ms` } : undefined}
    >
      <button className="carousel-controls__button" type="button" onClick={onPrevious} aria-label="Previous slide"><span aria-hidden="true">←</span></button>
      <span className="carousel-controls__marks" aria-hidden="true">
        {Array.from({ length: count }, (_, index) => <i className={`carousel-controls__mark ${index === activeIndex ? 'is-active' : ''}`} key={index} />)}
      </span>
      <button className="carousel-controls__button" type="button" onClick={onNext} aria-label="Next slide"><span aria-hidden="true">→</span></button>
    </div>
  );
}

function SolutionCard({ solution, motionIndex }) {
  return (
    <Link
      className="solution-preview-card"
      to={`/solutions#${solution.slug}`}
      style={motionIndex === undefined ? undefined : { '--home-card-index': motionIndex }}
    >
      <div className="solution-preview-card__visual">
        <img src={solution.homeImage} alt={solution.homeImageAlt} loading="lazy" decoding="async" />
      </div>
      <div className="solution-preview-card__body">
        <h3>{solution.homeTitle || solution.name}</h3>
        {solution.homeSummary && <p>{solution.homeSummary}</p>}
        <span className="solution-preview-card__link">Explore applications <span aria-hidden="true">→</span></span>
      </div>
    </Link>
  );
}

const zmdPhysicalAIStages = [
  { number: '01', name: 'Sense', detail: 'Cameras and Custom IoT Products', image: homePhysicalAISense, imageAlt: 'Cameras and sensing devices representing the Sense layer' },
  { number: '02', name: 'Local compute', detail: 'Compact Edge Systems', image: homePhysicalAILocalCompute, imageAlt: 'Zevric Compact Edge System representing local AI compute' },
  { number: '03', name: 'Datacenter compute', detail: 'AI Datacenter Servers when required', image: homePhysicalAIDatacenterCompute, imageAlt: 'ZMD server infrastructure representing optional centralized AI compute' },
];

const applicationPhysicalAIStages = [
  { number: '04', name: 'Intelligent applications', detail: 'Enterprise data, platforms and integrations', image: homePhysicalAIApplications, imageAlt: 'Enterprise applications and integration systems represented on a technical platform' },
];

const outcomePhysicalAIStages = [
  { number: '05', name: 'Connected operations', detail: 'Alerts, workflows and connected systems', image: homePhysicalAIOperations, imageAlt: 'Customer alerts, dashboards, workflows and connected operations represented on a technical platform' },
];

function PhysicalAIStage({ stage, showNumber = false }) {
  return (
    <li className={`physical-ai-story__stage ${stage.emphasis ? 'physical-ai-story__stage--emphasis' : ''}`}>
      <div className="physical-ai-story__visual">
        <img src={stage.image} alt={stage.imageAlt} loading="lazy" decoding="async" />
      </div>
      <div className="physical-ai-story__copy">
        {showNumber && <span className="physical-ai-story__number">{stage.number}</span>}
        <h4>{stage.name}</h4>
        <p>{stage.detail}</p>
      </div>
    </li>
  );
}

function ArchitectureStory({ groups, variant = 'home', optionalLayer }) {
  return (
    <div className={`physical-ai-story physical-ai-story--${variant}`}>
      <div className="physical-ai-story__groups">
        {groups.map((group, groupIndex) => {
          const GroupElement = group.to ? Link : 'section';
          return (
            <GroupElement
              className={`physical-ai-story__group physical-ai-story__group--${group.tone} ${group.emphasis ? 'physical-ai-story__group--emphasis' : ''}`}
              {...(group.to ? { to: group.to } : {})}
              aria-labelledby={group.id}
              key={group.id}
            >
              <header className="physical-ai-story__group-header">
                <h3 id={group.id}>{group.label}</h3>
                {group.action && <span className="physical-ai-story__group-action">{group.action} <span aria-hidden="true">→</span></span>}
              </header>
              <ol
                className={`physical-ai-story__stages physical-ai-story__stages--${['', 'one', 'two', 'three'][group.stages.length] || 'many'}`}
                aria-label={group.ariaLabel}
              >
                {group.stages.map((stage) => <PhysicalAIStage stage={stage} showNumber={variant === 'home' || variant === 'solutions'} key={stage.number || stage.name} />)}
              </ol>
              {groupIndex === 0 && (variant === 'home' || variant === 'solutions') && (
                <div className="physical-ai-story__connectors" aria-hidden="true"><span /><span /></div>
              )}
            </GroupElement>
          );
        })}
      </div>
      {optionalLayer && (
        <div className="physical-ai-story__optional">
          {optionalLayer.image && <img src={optionalLayer.image} alt={optionalLayer.imageAlt || ''} loading="lazy" decoding="async" />}
          <div><span>{optionalLayer.label}</span><strong>{optionalLayer.detail}</strong></div>
        </div>
      )}
    </div>
  );
}

function PhysicalAIStory() {
  return (
    <ArchitectureStory
      variant="home"
      groups={[
        { id: 'physical-ai-zmd-group', label: 'ZMD hardware', tone: 'zmd', to: '/products', action: 'View Products', ariaLabel: 'ZMD hardware layers', stages: zmdPhysicalAIStages },
        { id: 'physical-ai-open-group', label: 'Your solution stack', tone: 'open', to: '/solutions', action: 'Explore Solutions', ariaLabel: 'Customer or partner solution layers', stages: [...applicationPhysicalAIStages, ...outcomePhysicalAIStages] },
      ]}
    />
  );
}

const assets = {
  cameraHeroBullet,
  cameraHeroDualLens,
  homeCameraIndustrial,
  homeEdgeIndustrial,
  homeIotIndustrial,
  homeServerIndustrial,
  homeZevricIndustrialEdge,
  intelCoreUltraBadges,
};

const solutions = [
  { slug: 'surveillance', name: 'Surveillance and Security', homeTitle: 'Surveillance and Security', homeSummary: 'Hardware for local and multi-site monitoring, event review and response workflows.', homeImage: securitySolution, homeImageAlt: 'Commercial campus perimeter and controlled access zone' },
  { slug: 'industrial-ai', name: 'Industrial AI', homeTitle: 'Industrial AI', homeSummary: 'Plant-floor sensing and compute for safety, inspection and production visibility.', homeImage: industrialDetail, homeImageAlt: 'Production line with workers, inspection cameras and robotic equipment' },
  { slug: 'healthcare', name: 'Healthcare Operations', homeTitle: 'Healthcare Operations', homeSummary: 'Non-clinical sensing and compute for facility flow, assets and operational workflows.', homeImage: healthcareDetail, homeImageAlt: 'Hospital facility corridor with staff and local camera infrastructure' },
  { slug: 'retail-intelligence', name: 'Retail Intelligence', homeTitle: 'Retail Intelligence', homeSummary: 'Store, shelf and distributed-site visibility built on local sensing and compute.', homeImage: retailDetail, homeImageAlt: 'Retail store using local video and operational intelligence' },
  { slug: 'smart-cities-mobility', name: 'Smart Cities and Mobility', homeTitle: 'Smart Cities and Mobility', homeSummary: 'Junction, parking and civic sensing for partner-led municipal solutions.', homeImage: citiesSolution, homeImageAlt: 'Urban junction with traffic cameras, signals and roadside infrastructure' },
  { slug: 'airport-operations', name: 'Airport Operations', homeTitle: 'Airport Operations', homeSummary: 'Terminal, kerbside and operational visibility on airport-controlled infrastructure.', homeImage: airportSolution, homeImageAlt: 'Airport terminal queue and operations environment' },
];

export default function HomePage() {
  const motionRoot = React.useRef(null);

  React.useLayoutEffect(() => {
    const root = motionRoot.current;
    if (!root) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const selectors = [
      '.home-hero__copy > h1',
      '.home-hero__copy > p',
      '.home-hero__actions .button',
      '.hero-catalog__panel',
      '.physical-ai-section__intro .section-intro h2',
      '.physical-ai-section__intro .section-intro p',
      '.physical-ai-story__group',
      '.physical-ai-story__stage',
      '.home-product-feature__copy > *',
      '.home-product-feature__visual',
      '.home-product-feature__controls',
      '.solutions-preview .section-intro h2',
      '.solution-preview-card',
      '.home-solutions-carousel__footer > *',
    ];

    let revealObserver;
    const registered = new WeakSet();

    const registerMotionElements = () => {
      const elements = root.querySelectorAll(selectors.join(','));
      elements.forEach((element, index) => {
        if (registered.has(element)) return;
        registered.add(element);
        element.classList.add('home-motion-item');
        element.style.setProperty('--home-motion-order', index % 8);
        if (reducedMotion.matches) {
          element.classList.add('is-motion-visible');
        } else {
          revealObserver.observe(element);
        }
      });
    };

    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const bounds = entry.target.getBoundingClientRect();
        const isVisible = keepFinalSectionVisibleAtPageEnd(entry.target, root)
          || (bounds.top <= window.innerHeight * 0.93 && bounds.bottom >= window.innerHeight * 0.01);
        entry.target.classList.toggle('is-motion-visible', isVisible);
      });
    }, { threshold: 0.01, rootMargin: '0px 0px -7% 0px' });

    const revealVisibleElements = () => {
      root.querySelectorAll('.home-motion-item').forEach((element) => {
        const bounds = element.getBoundingClientRect();
        const isVisible = keepFinalSectionVisibleAtPageEnd(element, root)
          || (bounds.top <= window.innerHeight * 0.93 && bounds.bottom >= window.innerHeight * 0.01);
        element.classList.toggle('is-motion-visible', isVisible);
      });
    };

    root.classList.add('home-motion-ready');
    registerMotionElements();
    revealVisibleElements();

    const mutationObserver = new MutationObserver(() => {
      registerMotionElements();
      revealVisibleElements();
    });
    mutationObserver.observe(root, { childList: true, subtree: true });

    let frame = 0;
    const updateMotionPosition = () => {
      frame = 0;
      const bounds = root.getBoundingClientRect();
      root.style.setProperty('--home-scroll-progress', Math.max(-1, Math.min(1, -bounds.top / Math.max(window.innerHeight, 1))).toFixed(4));
      revealVisibleElements();
    };
    const handleScroll = () => {
      if (frame || reducedMotion.matches) return;
      frame = window.requestAnimationFrame(updateMotionPosition);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    updateMotionPosition();

    return () => {
      mutationObserver.disconnect();
      revealObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="site-page home-page" ref={motionRoot}>


      {/*
      =============================================================================
                                  HOME HERO SECTION
      =============================================================================
      */}


      <section className="home-hero">
        <div className="site-container home-hero__inner">
          <div className="home-hero__copy">
            <h1 tabIndex="-1">Complete hardware products for <span>OEM portfolios.</span></h1>
            <p>ZMD is the ODM partner behind complete product families for OEM portfolios: Cameras, Compact Edge Systems, AI Datacenter Servers and Custom IoT Products.</p>
            <div className="home-hero__actions">
              <ArrowButton to="/contact">Partner with ZMD</ArrowButton>
              <ArrowButton to="/products" secondary>View products</ArrowButton>
            </div>
          </div>

          <div className="hero-catalog" aria-label="ZMD product portfolio">
            <Link className="hero-catalog__panel hero-catalog__panel--edge" to="/products/edge-devices">
              <strong>Zevric Compact Edge Systems</strong>
              <img src={assets.homeEdgeIndustrial} alt="Zevric Compact Edge System in a precision electronics lab" fetchPriority="high" />
            </Link>
            <div className="hero-catalog__secondary">
              <Link className="hero-catalog__panel hero-catalog__panel--camera" to="/products/cameras">
                <strong>Cameras</strong>
                <img src={assets.homeCameraIndustrial} alt="ZMD dual-lens camera mounted above an enterprise entrance" />
              </Link>
              <Link className="hero-catalog__panel hero-catalog__panel--server" to="/products/servers">
                <strong>AI Datacenter Servers</strong>
                <img src={assets.homeServerIndustrial} alt="ZMD AI Datacenter Server in a precision electronics lab" />
              </Link>
              <Link className="hero-catalog__panel hero-catalog__panel--iot" to="/products/custom-iot">
                <strong>Custom IoT Products</strong>
                <img src={assets.homeIotIndustrial} alt="ZMD parking sensor in a precision electronics lab" />
              </Link>
            </div>
          </div>
        </div>
      </section>



      {/*
      =============================================================================
                             PHYSICAL AI STORY SECTION
      =============================================================================
      */}


      <section className="physical-ai-section">
        <div className="physical-ai-section__intro">
          <div className="site-container">
            <SectionIntro
              title="Building Physical AI, from sensing to action"
              body="ZMD builds the sensing and compute hardware. Customers and integrators add their chosen applications, data and integrations."
              light
            />
          </div>
        </div>
        <div className="physical-ai-section__body">
          <div className="site-container">
            <PhysicalAIStory />
          </div>
        </div>
      </section>



      {/*
      =============================================================================
                           FEATURED PRODUCTS CAROUSEL
      =============================================================================
      */}


      <HomeProductFeature
        slides={homeProductSlides}
      />



      {/*
      =============================================================================
                            SOLUTION APPLICATIONS SECTION
      =============================================================================
      */}


      <section className="section solutions-preview">
        <div className="site-container">
          <SectionIntro
            title="Applications built on ZMD hardware"
          />
          <HomeSolutionsCarousel items={solutions} />
        </div>
      </section>

    </div>
  );
}
export const HOME_PRODUCT_CAROUSEL_INTERVAL = 7600;

export const homeProductSlides = [
  {
    id: 'zevric-local-ai',
    variant: 'edge',
    title: 'Zevric Compact Edge Systems for local AI',
    body: 'Three Intel® Core™ Ultra Series 2 configurations, including a discrete-GPU option.',
    image: assets.homeEdgeIndustrial,
    imageAlt: 'Zevric Compact Edge System in a precision electronics lab',
    fit: 'cover',
    primaryAction: { label: 'Compare configurations', to: '/products/edge-devices' },
    secondaryAction: { label: 'Explore Edge AI', to: '/edge-ai' },
    mediaBadge: {
      image: assets.intelCoreUltraBadges,
      imageAlt: 'Intel Core Ultra 5, 7 and 9 processor badges',
    },
  },
  {
    id: 'camera-panoramic',
    variant: 'camera',
    title: 'Panoramic cameras for wide‑area visibility',
    body: 'Dual-lens camera platforms for entrances, perimeters and open areas across security and operational portfolios.',
    image: assets.cameraHeroDualLens,
    imageAlt: 'ZMD dual-lens panoramic camera overlooking a city',
    fit: 'cover',
    primaryAction: { label: 'View camera models', to: '/products/cameras' },
    secondaryAction: { label: 'Discuss requirements', to: '/contact' },
  },
  {
    id: 'zevric-industrial-ai',
    variant: 'edge',
    title: 'Zevric systems for industrial edge deployments',
    body: 'Fanless and actively cooled configurations for local inference, video processing and industrial connectivity.',
    image: assets.homeZevricIndustrialEdge,
    imageAlt: 'Zevric Compact Edge System on a bright industrial production floor',
    fit: 'cover',
    primaryAction: { label: 'View Zevric', to: '/products/edge-devices' },
    secondaryAction: { label: 'Explore Edge AI', to: '/edge-ai' },
    mediaBadge: {
      image: assets.intelCoreUltraBadges,
      imageAlt: 'Intel Core Ultra 5, 7 and 9 processor badges',
    },
  },
  {
    id: 'camera-directional',
    variant: 'camera',
    title: 'Bullet Cameras for perimeter monitoring',
    body: 'Focused coverage for long sightlines, defined zones and distributed sites.',
    image: assets.cameraHeroBullet,
    imageAlt: 'ZMD bullet camera mounted at a modern industrial perimeter',
    fit: 'cover',
    primaryAction: { label: 'View camera models', to: '/products/cameras' },
    secondaryAction: { label: 'Discuss requirements', to: '/contact' },
  },
];

export function HomeProductFeature({
  slides,
}) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const activeSlide = slides[activeIndex] || slides[0];
  const showPreviousSlide = () => setActiveIndex((index) => (index - 1 + slides.length) % slides.length);
  const showNextSlide = () => setActiveIndex((index) => (index + 1) % slides.length);

  React.useEffect(() => {
    if (slides.length < 2) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const timer = window.setTimeout(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, HOME_PRODUCT_CAROUSEL_INTERVAL);

    return () => window.clearTimeout(timer);
  }, [activeIndex, slides.length]);

  React.useEffect(() => {
    if (slides.length < 2) return undefined;

    const nextSlide = slides[(activeIndex + 1) % slides.length];
    const preloadNextSlide = () => {
      const image = new Image();
      image.src = nextSlide.image;

      if (nextSlide.mediaBadge?.image) {
        const badge = new Image();
        badge.src = nextSlide.mediaBadge.image;
      }
    };

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(preloadNextSlide, { timeout: 1800 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timer = window.setTimeout(preloadNextSlide, 250);
    return () => window.clearTimeout(timer);
  }, [activeIndex, slides]);

  return (
    <section
      className={`home-product-feature home-product-feature--${activeSlide.variant} home-product-feature--${activeSlide.id}`}
      aria-label="Featured ZMD products"
    >
      <div className="site-container home-product-feature__inner">
        <div className="home-product-feature__copy" key={`copy-${activeSlide.id}`}>
          <h2>{activeSlide.title}</h2>
          <p>{activeSlide.body}</p>
          <div className="home-product-feature__actions">
            <ArrowButton to={activeSlide.primaryAction.to} light>{activeSlide.primaryAction.label}</ArrowButton>
            <ArrowButton to={activeSlide.secondaryAction.to} secondary>{activeSlide.secondaryAction.label}</ArrowButton>
          </div>
        </div>

        <div className={`home-product-feature__visual home-product-feature__visual--${activeSlide.fit} home-product-feature__visual--${activeSlide.id}`}>
          <img
            key={activeSlide.image}
            className="home-product-feature__media"
            src={activeSlide.image}
            alt={activeSlide.imageAlt}
            loading="eager"
            decoding="async"
            fetchPriority={activeIndex === 0 ? 'auto' : 'high'}
          />
          {activeSlide.mediaBadge && (
            <img
              className="home-product-feature__badge"
              src={activeSlide.mediaBadge.image}
              alt={activeSlide.mediaBadge.imageAlt}
              loading="eager"
              decoding="async"
            />
          )}
        </div>

        <CarouselControls
          className="home-product-feature__controls"
          count={slides.length}
          activeIndex={activeIndex}
          onPrevious={showPreviousSlide}
          onNext={showNextSlide}
          durationMs={HOME_PRODUCT_CAROUSEL_INTERVAL}
          label="Featured product navigation"
        />
      </div>
    </section>
  );
}

export function HomeSolutionsCarousel({ items }) {
  const [itemsPerPage, setItemsPerPage] = React.useState(3);
  const [activePage, setActivePage] = React.useState(0);
  const [direction, setDirection] = React.useState('next');
  const touchStart = React.useRef(null);
  const pageCount = Math.max(1, Math.ceil(items.length / itemsPerPage));
  const visibleItems = items.slice(activePage * itemsPerPage, (activePage + 1) * itemsPerPage);

  React.useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 981px)');
    const tabletQuery = window.matchMedia('(min-width: 681px)');
    const syncItemsPerPage = () => {
      const nextItemsPerPage = desktopQuery.matches ? 3 : tabletQuery.matches ? 2 : 1;
      setItemsPerPage(nextItemsPerPage);
      setActivePage(0);
    };

    syncItemsPerPage();
    desktopQuery.addEventListener('change', syncItemsPerPage);
    tabletQuery.addEventListener('change', syncItemsPerPage);
    return () => {
      desktopQuery.removeEventListener('change', syncItemsPerPage);
      tabletQuery.removeEventListener('change', syncItemsPerPage);
    };
  }, []);

  React.useEffect(() => {
    items.forEach((item) => {
      const image = new Image();
      image.decoding = 'async';
      image.src = item.homeImage;
    });
  }, [items]);

  React.useEffect(() => {
    if (pageCount < 2) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const timer = window.setTimeout(() => {
      setDirection('next');
      setActivePage((page) => (page + 1) % pageCount);
    }, AUTO_CAROUSEL_INTERVAL);

    return () => window.clearTimeout(timer);
  }, [activePage, pageCount]);

  function selectRelative(step) {
    setDirection(step > 0 ? 'next' : 'previous');
    setActivePage((page) => (page + step + pageCount) % pageCount);
  }

  function handleTouchEnd(event) {
    if (touchStart.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStart.current;
    touchStart.current = null;
    if (Math.abs(distance) > 45) selectRelative(distance < 0 ? 1 : -1);
  }

  return (
    <div
      className="home-solutions-carousel"
    >
      <div
        className="home-solutions-carousel__viewport"
        onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={`solution-showcase home-solutions-carousel__grid home-solutions-carousel__grid--${direction}`}
          style={{ '--home-solutions-columns': itemsPerPage }}
          key={`${itemsPerPage}-${activePage}`}
        >
          {visibleItems.map((solution, index) => (
            <SolutionCard solution={solution} motionIndex={index} key={solution.slug} />
          ))}
        </div>
      </div>
      <div className="home-solutions-carousel__footer">
        <ArrowButton to="/solutions" secondary>View all solution areas</ArrowButton>
        <CarouselControls
          className="home-solutions-carousel__controls"
          count={pageCount}
          activeIndex={activePage}
          onPrevious={() => selectRelative(-1)}
          onNext={() => selectRelative(1)}
          durationMs={AUTO_CAROUSEL_INTERVAL}
          label="Homepage solution areas"
        />
      </div>
    </div>
  );
}
