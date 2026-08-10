import React from 'react';
import { Link } from 'react-router-dom';
import { assets, futureProducts, productFamilies } from '../../data/site_data';

export function SectionIntro({ eyebrow, title, body, light = false, align = 'left', variant = 'plain', headingLevel = 'h2' }) {
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

export function StatusBadge({ children, future = false, neutral = false }) {
  return (
    <span className={`status-badge ${future ? 'status-badge--future' : ''} ${neutral ? 'status-badge--neutral' : ''}`}>
      <span aria-hidden="true" />{children}
    </span>
  );
}

export function CustomIoTVisual({ type = 'pair', compact = false }) {
  const showBand = type === 'pair' || type === 'safety-band';
  const showParking = type === 'pair' || type === 'parking-sensor';

  return (
    <div className={`custom-iot-visual custom-iot-visual--${type} ${compact ? 'custom-iot-visual--compact' : ''}`} aria-hidden="true">
      {showBand && (
        <div className="custom-iot-visual__device custom-iot-visual__device--band">
          <span className="custom-iot-visual__strap custom-iot-visual__strap--top" />
          <span className="custom-iot-visual__band-module"><i /></span>
          <span className="custom-iot-visual__strap custom-iot-visual__strap--bottom" />
          <small>Safety Band</small>
        </div>
      )}
      {showParking && (
        <div className="custom-iot-visual__device custom-iot-visual__device--parking">
          <span className="custom-iot-visual__parking-disc"><i /></span>
          <span className="custom-iot-visual__signal custom-iot-visual__signal--one" />
          <span className="custom-iot-visual__signal custom-iot-visual__signal--two" />
          <small>Parking Sensor</small>
        </div>
      )}
    </div>
  );
}

export function ProductFamilyCard({ family }) {
  return (
    <Link className="family-card" to={family.to}>
      <div className="family-card__topline">
        <StatusBadge>{family.status}</StatusBadge>
      </div>
      <div className="family-card__image">
        {family.visual === 'custom-iot'
          ? <CustomIoTVisual compact />
          : <img src={family.image} alt={family.imageAlt} loading="lazy" decoding="async" />}
      </div>
      <div className="family-card__body">
        <span className="micro-label">{family.eyebrow}</span>
        <h3>{family.name}</h3>
        <p>{family.summary}</p>
        <span className="text-link">View {family.name} <span aria-hidden="true">→</span></span>
      </div>
    </Link>
  );
}

export function ProductCard({ product, family }) {
  const base = family === 'cameras' ? '/products/cameras' : '/products/edge-devices';
  return (
    <Link className="product-card-new" to={`${base}/${product.slug}`}>
      <div className="product-card-new__image">
        <StatusBadge neutral>{product.status}</StatusBadge>
        <img src={product.image} alt={product.imageAlt} loading="lazy" decoding="async" />
      </div>
      <div className="product-card-new__body">
        <span className="micro-label">{product.category}</span>
        <h3>{product.name}</h3>
        <p>{product.summary}</p>
        <span className="text-link">View product <span aria-hidden="true">→</span></span>
      </div>
    </Link>
  );
}

export function SolutionCard({ solution, motionIndex }) {
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

export function PageHero({ title, body, image, imageAlt = '', dark = false, children, compact = false, surfaceTone = '' }) {
  const surfaceClass = surfaceTone ? ` surface-band surface-band--${surfaceTone}` : '';
  return (
    <section className={`page-hero ${dark ? 'page-hero--dark' : ''} ${compact ? 'page-hero--compact' : ''} ${!image ? 'page-hero--no-image' : ''}${surfaceClass}`}>
      <div className="page-hero__grid" aria-hidden="true" />
      <div className="site-container page-hero__inner">
        <div className="page-hero__copy">
          <h1 tabIndex="-1">{title}</h1>
          {body && <p>{body}</p>}
          {children && <div className="page-hero__actions">{children}</div>}
        </div>
        {image && (
          <div className="page-hero__visual">
            <img src={image} alt={imageAlt} fetchPriority="high" />
          </div>
        )}
      </div>
    </section>
  );
}

export function CarouselControls({
  count,
  activeIndex,
  onPrevious,
  onNext,
  durationMs = 0,
  isPaused = false,
  className = '',
  label = 'Carousel navigation',
}) {
  return (
    <div
      className={`carousel-controls ${isPaused ? 'is-paused' : ''} ${className}`}
      role="group"
      aria-label={label}
      style={durationMs ? { '--carousel-progress-duration': `${durationMs}ms` } : undefined}
    >
      <button className="carousel-controls__button" type="button" onClick={onPrevious} aria-label="Previous slide">
        <span aria-hidden="true">←</span>
      </button>
      <span className="carousel-controls__marks" aria-hidden="true">
        {Array.from({ length: count }, (_, index) => (
          <i className={`carousel-controls__mark ${index === activeIndex ? 'is-active' : ''}`} key={index} />
        ))}
      </span>
      <button className="carousel-controls__button" type="button" onClick={onNext} aria-label="Next slide">
        <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}

export function ProductStoryHero({
  slides,
  eyebrow,
  title,
  body,
  primaryAction,
  secondaryAction,
  className = '',
  tone = 'dark',
  autoAdvanceMs = 0,
}) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const activeSlide = slides[activeIndex] || slides[0];
  const touchStart = React.useRef(null);

  React.useEffect(() => {
    if (!autoAdvanceMs || slides.length < 2) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setTimeout(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, autoAdvanceMs);
    return () => window.clearTimeout(timer);
  }, [activeIndex, autoAdvanceMs, slides.length]);

  function selectRelative(direction) {
    setActiveIndex((index) => (index + direction + slides.length) % slides.length);
  }

  function handleTabKey(event, index) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? slides.length - 1
        : (index + (event.key === 'ArrowRight' ? 1 : -1) + slides.length) % slides.length;
    setActiveIndex(nextIndex);
    event.currentTarget.parentElement?.querySelectorAll('[role="tab"]')[nextIndex]?.focus();
  }

  function handleTouchEnd(event) {
    if (touchStart.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStart.current;
    touchStart.current = null;
    if (Math.abs(distance) > 45) selectRelative(distance < 0 ? 1 : -1);
  }

  return (
    <section
      className={`product-story-hero product-story-hero--${tone} ${autoAdvanceMs ? 'product-story-hero--autoplay' : ''} ${className}`}
      aria-label={`${title} product media`}
      style={activeSlide.surface ? { '--product-story-surface': activeSlide.surface } : undefined}
    >
      <div className="site-container product-story-hero__inner">
        <div className="product-story-hero__copy">
          {eyebrow && <span className="product-story-hero__eyebrow">{eyebrow}</span>}
          <h1 tabIndex="-1">{title}</h1>
          <p>{body}</p>
          <div className="product-story-hero__actions">
            {primaryAction && <Link className="button button--primary" to={primaryAction.to}>{primaryAction.label} <span aria-hidden="true">→</span></Link>}
            {secondaryAction && <Link className="button button--light" to={secondaryAction.to}>{secondaryAction.label} <span aria-hidden="true">→</span></Link>}
          </div>
        </div>

        <div
          className={`product-story-hero__visual ${activeSlide.fit === 'contain' ? 'product-story-hero__visual--contain' : ''} ${activeSlide.visualTone ? `product-story-hero__visual--${activeSlide.visualTone}` : ''}`}
          role="tabpanel"
          id="product-media-panel"
          aria-label={activeSlide.navigationLabel || activeSlide.eyebrow}
          onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }}
          onTouchEnd={handleTouchEnd}
        >
          {activeSlide.render || <img key={activeSlide.image} src={activeSlide.image} alt={activeSlide.imageAlt} fetchPriority={activeIndex === 0 ? 'high' : 'auto'} />}
          {activeSlide.mediaBadge && (
            <img
              className="product-story-hero__media-badge"
              src={activeSlide.mediaBadge.image}
              alt={activeSlide.mediaBadge.imageAlt}
              fetchPriority="high"
            />
          )}
          {!autoAdvanceMs && (
            <>
              <span className="product-story-hero__index" aria-hidden="true">0{activeIndex + 1} / 0{slides.length}</span>
              {activeSlide.caption && <span className="product-story-hero__caption" aria-live="polite">{activeSlide.caption}</span>}
            </>
          )}
        </div>

        {autoAdvanceMs && (
          <CarouselControls
            className="product-story-hero__controls"
            count={slides.length}
            activeIndex={activeIndex}
            onPrevious={() => selectRelative(-1)}
            onNext={() => selectRelative(1)}
            durationMs={autoAdvanceMs}
            label="Product media navigation"
          />
        )}
      </div>

      {!autoAdvanceMs && (
        <div className="site-container product-story-hero__navigation" role="tablist" aria-label="Select a product view">
          {slides.map((slide, index) => (
              <button
                type="button"
                role="tab"
                className={index === activeIndex ? 'is-active' : ''}
                aria-selected={index === activeIndex}
                aria-controls="product-media-panel"
                tabIndex={index === activeIndex ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(event) => handleTabKey(event, index)}
                key={slide.navigationLabel || slide.eyebrow}
              >
                <span>0{index + 1}</span>
                <strong>{slide.navigationLabel || slide.eyebrow}</strong>
              </button>
          ))}
        </div>
      )}
    </section>
  );
}

export function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link to="/">Home</Link>
      {items.map((item, index) => (
        <React.Fragment key={`${item.label}-${index}`}>
          <span aria-hidden="true">/</span>
          {item.to ? <Link to={item.to}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
        </React.Fragment>
      ))}
    </nav>
  );
}

export function SpecGrid({ specs }) {
  return (
    <dl className="spec-grid">
      {specs.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

const zmdPhysicalAIStages = [
  {
    number: '01',
    name: 'Sense',
    detail: 'Cameras and Custom IoT Products',
    image: assets.homePhysicalAISense,
    imageAlt: 'Cameras and sensing devices representing the Sense layer',
  },
  {
    number: '02',
    name: 'Local compute',
    detail: 'Compact Edge Systems',
    image: assets.homePhysicalAILocalCompute,
    imageAlt: 'Zevric Compact Edge System representing local AI compute',
  },
  {
    number: '03',
    name: 'Datacenter compute',
    detail: 'AI Datacenter Servers when required',
    image: assets.homePhysicalAIDatacenterCompute,
    imageAlt: 'ZMD server infrastructure representing optional centralized AI compute',
  },
];

const applicationPhysicalAIStages = [
  {
    number: '04',
    name: 'Intelligent applications',
    detail: 'Enterprise data, platforms and integrations',
    image: assets.homePhysicalAIApplications,
    imageAlt: 'Enterprise applications and integration systems represented on a technical platform',
  },
];

const outcomePhysicalAIStages = [
  {
    number: '05',
    name: 'Connected operations',
    detail: 'Alerts, workflows and connected systems',
    image: assets.homePhysicalAIOperations,
    imageAlt: 'Customer alerts, dashboards, workflows and connected operations represented on a technical platform',
  },
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

export function ArchitectureStory({ groups, variant = 'home', optionalLayer }) {
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
                {group.action && (
                  <span className="physical-ai-story__group-action">
                    {group.action} <span aria-hidden="true">→</span>
                  </span>
                )}
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
          {optionalLayer.image && (
            <img src={optionalLayer.image} alt={optionalLayer.imageAlt || ''} loading="lazy" decoding="async" />
          )}
          <div>
            <span>{optionalLayer.label}</span>
            <strong>{optionalLayer.detail}</strong>
          </div>
        </div>
      )}
    </div>
  );
}

export function PhysicalAIStory() {
  return (
    <ArchitectureStory
      variant="home"
      groups={[
        {
          id: 'physical-ai-zmd-group',
          label: 'ZMD hardware',
          tone: 'zmd',
          to: '/products',
          action: 'View Products',
          ariaLabel: 'ZMD hardware layers',
          stages: zmdPhysicalAIStages,
        },
        {
          id: 'physical-ai-open-group',
          label: 'Your solution stack',
          tone: 'open',
          to: '/solutions',
          action: 'Explore Solutions',
          ariaLabel: 'Customer or partner solution layers',
          stages: [...applicationPhysicalAIStages, ...outcomePhysicalAIStages],
        },
      ]}
    />
  );
}

export function PartnerDisclosure() {
  return (
    <div className="partner-disclosure">
      <div>
        <h3>Use the software stack you choose.</h3>
      </div>
      <p>
        <strong>ApexFabric</strong> is one optimized platform route for ZMD hardware. Customers and integrators
        can also use their own software and integrations.
      </p>
    </div>
  );
}

export function FutureProducts() {
  return (
    <div className="future-grid">
      {futureProducts.map((product) => (
        <article className="future-card" key={product.name}>
          <div>
            <StatusBadge future>{product.label}</StatusBadge>
          </div>
          <h3>{product.name}</h3>
          <p>{product.summary}</p>
        </article>
      ))}
    </div>
  );
}

export function ProductRail() {
  return (
    <div className="product-rail">
      {productFamilies.map((family) => (
        <Link to={family.to} key={family.slug}>
          <span className="micro-label">{family.eyebrow}</span>
          <strong>{family.name}</strong>
          <span aria-hidden="true">→</span>
        </Link>
      ))}
    </div>
  );
}
