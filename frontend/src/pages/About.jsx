// =============================================================================
// ABOUT ZMD PAGE
// =============================================================================

import React from 'react';
import { Link } from 'react-router-dom';
import productLineup from '../assets/images/about/about-hero-portfolio-dark.webp';
import physicalAIConnectedStory from '../assets/images/about/about-connected-hardware-foundation.webp';
import '../assets/css/About.css';

const companyName = 'Zetta Micro Devices Co., Ltd.';

const offices = [
  { city: 'Bengaluru', address: 'Sy. No. 65/6, Nallurahalli Main Road, Mourya Building, near HP Petrol Pump, Whitefield, Bengaluru, Karnataka 560066' },
  { city: 'Hyderabad', address: '4th Floor, Plot No. 6, Sector 3, HUDA Techno Enclave, Madhapur, Hyderabad, Telangana, India 500081' },
  { city: 'Taiwan', address: '13F, No. 102, Sec. 2, Zhongcheng Road, Shilin District, Taipei City 111019, Taiwan (R.O.C.)' },
  {
    city: 'China',
    company: companyName,
    address: '21st Floor, No. 969 Zhongshannan Road,',
    addressLine2: 'Huangpu District, Shanghai, China',
  },
];

function OfficeGrid() {
  return (
    <div className="office-grid">
      {offices.map((office) => (
        <article className={!office.address ? 'office-grid__item--location-only' : undefined} key={office.city}>
          <h3>{office.city}{office.label && <small>{office.label}</small>}</h3>
          {office.address
            ? <p>{office.company && <><strong>{office.company}</strong><br /></>}{office.address}{office.addressLine2 && <><br />{office.addressLine2}</>}</p>
            : <Link className="office-grid__request" to="/contact">Address available on request <span aria-hidden="true">→</span></Link>}
        </article>
      ))}
    </div>
  );
}

function keepFinalSectionVisibleAtPageEnd(element, pageRoot) {
  const finalSection = [...pageRoot.children].reverse().find((child) => child.tagName === 'SECTION');
  if (!finalSection?.contains(element)) return false;
  const pageHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
  return Math.ceil(window.scrollY + window.innerHeight) >= pageHeight - 8;
}

function ArrowButton({ to, children, secondary = false, light = false }) {
  const variant = light ? 'button--light' : secondary ? 'button--secondary' : 'button--primary';
  return <Link className={`button ${variant}`} to={to}>{children} <span aria-hidden="true">→</span></Link>;
}

const assets = { physicalAIConnectedStory, productLineup };

export default function CompanyPage() {
  const motionRoot = React.useRef(null);

  React.useLayoutEffect(() => {
    const root = motionRoot.current;
    if (!root) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const selectors = [
      '.about-hero__copy h1',
      '.about-hero__copy > p',
      '.about-hero__actions .button',
      '.about-hero__product-lineup',
      '.about-story > .site-container > .section-heading',
      '.about-story__prose h3',
      '.about-story__prose p',
      '.about-story__illustration',
      '.about-story__actions .button',
      '.about-engagement__intro h2',
      '.about-engagement__grid article',
      '#locations > .site-container > .section-heading',
      '#locations .office-grid article',
    ];

    const items = [...root.querySelectorAll(selectors.join(','))];
    const syncItem = (item) => {
      const bounds = item.getBoundingClientRect();
      const visible = keepFinalSectionVisibleAtPageEnd(item, root) || (item.classList.contains('is-about-motion-visible')
        ? bounds.top <= window.innerHeight * 1.05 && bounds.bottom >= window.innerHeight * -0.05
        : bounds.top <= window.innerHeight * 0.92 && bounds.bottom >= window.innerHeight * 0.01);
      item.classList.toggle('is-about-motion-visible', reducedMotion.matches || visible);
    };

    items.forEach((item, index) => {
      item.classList.add('about-motion-item');
      item.style.setProperty('--about-motion-order', index % 8);
    });
    root.classList.add('about-motion-ready');
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
    <div className="site-page about-page" ref={motionRoot}>


      {/*
      =============================================================================
                                ABOUT HERO SECTION
      =============================================================================
      */}


      <section className="about-hero surface-band surface-band--ink">
        <div className="site-container about-hero__inner">
          <div className="about-hero__copy">
            <h1 tabIndex="-1">The ODM partner for Physical AI infrastructure.</h1>
            <p>
              ZMD builds complete hardware products for OEM portfolios and distributed deployments. Customers can
              take them to market under their own brand or use them as the foundation for a wider solution.
            </p>
            <div className="about-hero__actions">
              <ArrowButton to="/products" light>View products</ArrowButton>
            </div>
          </div>
          <div className="about-hero__product-lineup">
            <img
              src={assets.productLineup}
              alt="ZMD bullet and dome cameras, two Zevric Compact Edge Systems and an AI Datacenter Server"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>



      {/*
      =============================================================================
                                OUR STORY SECTION
      =============================================================================
      */}


      <section className="section about-story surface-band surface-band--neutral" id="our-story">
        <div className="site-container">
          <h2 className="section-heading">Our Story</h2>
          <div className="about-story__narrative">
            <div className="about-story__prose about-story__prose--lead">
              <h3>AI must meet the physical world.</h3>
              <p>
                Most AI systems begin with data that has already been collected. Physical AI begins where events happen.
                It has to observe a site, machine or process as conditions change. The input may come from video, sound,
                environmental sensors, access systems or business software. Each source has its own data rate, response
                time, privacy requirement and operating constraint. A useful system must do more than detect an event. It
                must combine that event with context, decide what matters and connect the result to a practical response.
                Workloads that depend on low latency, limited bandwidth or site autonomy can run close to the source.
                Shared models, history and cross-site coordination can run on central compute. The response can then move
                into an alert, voice call, agent task, business workflow or instruction sent to connected equipment,
                robots and drones.
              </p>
            </div>
            <figure className="about-story__illustration">
              <figcaption className="about-story__illustration-caption">
                <strong>A connected hardware foundation</strong>
                <span>Distributed sensing and compute linked to applications, enterprise systems and machines.</span>
              </figcaption>
              <img
                src={assets.physicalAIConnectedStory}
                alt="Connected Physical AI infrastructure with distributed edge systems, server compute, cameras, sensors, intelligent applications and operational systems"
                loading="lazy"
              />
            </figure>
            <div className="about-story__prose about-story__prose--closing">
              <h3>ZMD builds the hardware foundation.</h3>
              <p>
                ZMD builds the sensing and compute foundation for this architecture. Cameras and Custom IoT Products
                capture physical signals. Zevric Compact Edge Systems run local inference and applications close to the
                source. AI Datacenter Servers provide shared compute when a deployment needs to coordinate workloads
                across devices, sites or systems. These are complete products, not a closed solution stack. Customers can
                combine them with their preferred models, applications, enterprise data, security controls and integration
                architecture. This keeps the hardware reusable across industries and lets each deployment follow the
                customer&apos;s technical and commercial model.
              </p>
            </div>
          </div>
          <div className="about-story__actions">
            <ArrowButton to="/products">View ZMD hardware</ArrowButton>
            <ArrowButton to="/solutions" secondary>Explore solution areas</ArrowButton>
          </div>
        </div>
      </section>



      {/*
      =============================================================================
                          CUSTOMER ENGAGEMENT SECTION
      =============================================================================
      */}


      <section className="section about-engagement surface-band surface-band--paper" id="work-with-zmd">
        <div className="site-container">
          <div className="about-engagement__intro">
            <h2 className="section-heading">How customers work with ZMD</h2>
          </div>
          <div className="about-engagement__grid">
            <article>
              <h3>Build an OEM portfolio</h3>
              <p>Select complete products and configurations for sale under your brand.</p>
              <Link className="text-link" to="/contact">Discuss an OEM portfolio <span aria-hidden="true">→</span></Link>
            </article>
            <article>
              <h3>Deploy your own solution</h3>
              <p>Combine ZMD hardware with your software, models, enterprise data and integrations.</p>
              <Link className="text-link" to="/products">View hardware products <span aria-hidden="true">→</span></Link>
            </article>
            <article>
              <h3>Deliver end to end</h3>
              <p>Work with our preferred solution partners for intelligent applications, systems integration and last-mile services.</p>
              <Link className="text-link" to="/solutions">Explore solution areas <span aria-hidden="true">→</span></Link>
            </article>
          </div>
        </div>
      </section>



      {/*
      =============================================================================
                            OFFICE LOCATIONS SECTION
      =============================================================================
      */}


      <section className="section section--paper surface-band surface-band--neutral" id="locations">
        <div className="site-container">
          <h2 className="section-heading">Locations</h2>
          <OfficeGrid />
        </div>
      </section>
    </div>
  );
}
