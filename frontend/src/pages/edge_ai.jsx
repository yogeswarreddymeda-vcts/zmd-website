import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowButton, SectionIntro, ZevricHero, edgeAIApplications, keepFinalSectionVisibleAtPageEnd } from './page_shared';
import senseImage from '../assets/images/edge-ai/applications/unnamed.png';
import localComputeImage from '../assets/images/edge-ai/applications/Branded black ZEVRIC compute box.png';
import applicationsImage from '../assets/images/edge-ai/applications/White enterprise AI analytics display.png';
import operationalIntelligenceImage from '../assets/images/edge-ai/applications/Modern operational intelligence workstation.png';
import connectedOperationsImage from '../assets/images/edge-ai/applications/Autonomous mobile robot with collaborative arm.png';
import datacenterImage from '../assets/images/edge-ai/applications/Four black enterprise server racks.png';

const hardwareStages = [
  {
    number: '01',
    title: 'Sense',
    description: 'Cameras, sensors and operational systems',
    image: senseImage,
    imageAlt: 'ZMD camera representing the sensing layer',
  },
  {
    number: '02',
    title: 'Local compute',
    description: 'Zevric Compact Edge Systems',
    image: localComputeImage,
    imageAlt: 'ZMD Zevric Compact Edge System',
  },
];

const solutionStages = [
  {
    number: '03',
    title: 'Intelligent applications',
    description: 'Runtime, models and workflows',
    image: applicationsImage,
    imageAlt: 'Enterprise AI application displayed on a tablet',
  },
  {
    number: '04',
    title: 'Operational intelligence',
    description: 'Events, alerts and context',
    image: operationalIntelligenceImage,
    imageAlt: 'Operational intelligence workstation with monitoring displays',
  },
  {
    number: '05',
    title: 'Connected operations',
    description: 'Decisions, workflows and actuation',
    image: connectedOperationsImage,
    imageAlt: 'Autonomous mobile robot with a collaborative arm',
  },
];

const reasons = [
  {
    num: '01',
    title: 'Local response',
    desc: 'Configured inference can run on site without sending every input to a remote service.',
  },
  {
    num: '02',
    title: 'Selective data transfer',
    desc: 'Process video and sensor data on site, then send selected results upstream.',
  },
  {
    num: '03',
    title: 'Data control',
    desc: 'Keep sensitive data on site when policy requires it.',
  },
  {
    num: '04',
    title: 'Operational continuity',
    desc: 'Configured workloads can continue locally when upstream connectivity is unavailable.',
  },
];

function ArchitectureStage({ stage }) {
  return (
    <article className="edge-architecture-stage">
      <div className="edge-architecture-stage__copy">
        <span>{stage.number}</span>
        <h3>{stage.title}</h3>
        <p>{stage.description}</p>
      </div>
      <img src={stage.image} alt={stage.imageAlt} loading="lazy" decoding="async" />
    </article>
  );
}

function EdgeArchitectureMap() {
  return (
    <div className="edge-architecture-map">
      <div className="edge-architecture-map__row">
        <div className="edge-architecture-map__label"><span>ZMD hardware</span><i aria-hidden="true" /></div>
        <div className="edge-architecture-map__hardware">
          {hardwareStages.map((stage) => <ArchitectureStage stage={stage} key={stage.number} />)}
        </div>
      </div>

      <div className="edge-architecture-map__handoff">
        <span>Your solution stack</span>
        <i className="edge-architecture-map__trunk" aria-hidden="true" />
        <i className="edge-architecture-map__branches" aria-hidden="true"><b /><b /><b /></i>
      </div>

      <div className="edge-architecture-map__row">
        <div className="edge-architecture-map__solutions">
          {solutionStages.map((stage) => <ArchitectureStage stage={stage} key={stage.number} />)}
        </div>
      </div>

      <aside className="edge-architecture-map__optional">
        <img src={datacenterImage} alt="Four ZMD enterprise server racks" loading="lazy" decoding="async" />
        <div>
          <span>Optional datacenter compute</span>
          <p>AI Datacenter Servers for storage, multi-site or centralized processing.</p>
        </div>
      </aside>
    </div>
  );
}

function WhyGrid() {
  return (
    <section className="edge-ai-principles" aria-labelledby="why-edge-title">
      <div className="site-container">
        <h2 id="why-edge-title">Why process locally</h2>
        <div className="edge-ai-principles__grid">
          {reasons.map((reason) => (
            <article className="edge-ai-principles__item" key={reason.num}>
              <span>{reason.num}</span>
              <h3>{reason.title}</h3>
              <p>{reason.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function EdgeAIPage() {
  const motionRoot = React.useRef(null);

  React.useLayoutEffect(() => {
    const root = motionRoot.current;
    if (!root) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const selectors = [
      '.zevric-shared-hero__copy h1',
      '.zevric-shared-hero__copy > p',
      '.zevric-shared-hero__actions .button',
      '.zevric-shared-hero__visual',
      '.edge-ai-architecture .section-intro h2',
      '.edge-ai-architecture .section-intro p',
      '.edge-ai-architecture .edge-architecture-map__row',
      '.edge-ai-architecture .edge-architecture-map__handoff',
      '.edge-ai-architecture .edge-architecture-stage',
      '.edge-ai-architecture .edge-architecture-map__optional',
      '.edge-ai-applications .section-intro h2',
      '.edge-ai-application-card',
      '.edge-ai-platform-choice__inner > div:first-child',
      '.edge-ai-platform-choice__inner > div:last-child',
    ];

    const items = [...root.querySelectorAll(selectors.join(','))];
    const syncItem = (item) => {
      const bounds = item.getBoundingClientRect();
      const visible = keepFinalSectionVisibleAtPageEnd(item, root) || (item.classList.contains('is-edge-motion-visible')
        ? bounds.top <= window.innerHeight * 1.05 && bounds.bottom >= window.innerHeight * -0.05
        : bounds.top <= window.innerHeight * 0.92 && bounds.bottom >= window.innerHeight * 0.01);
      item.classList.toggle('is-edge-motion-visible', reducedMotion.matches || visible);
    };

    items.forEach((item, index) => {
      item.classList.add('edge-motion-item');
      item.style.setProperty('--edge-motion-order', index % 8);
    });
    root.classList.add('edge-motion-ready');
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
    <div className="site-page edge-ai-page-new" ref={motionRoot}>
      <ZevricHero page="edge-ai" />

      <WhyGrid />

      <section className="section edge-ai-architecture edge-surface-motif edge-surface-motif--blueprint" id="architecture">
        <div className="site-container">
          <SectionIntro
            title="An open Edge AI architecture"
            body="Zevric provides local compute while customers and integrators select the models, applications and workflows."
            light
          />
          <EdgeArchitectureMap />
        </div>
      </section>

      <section className="section edge-ai-applications edge-surface-motif edge-surface-motif--technical" id="applications">
        <div className="site-container">
          <SectionIntro title="Edge AI application areas" />
          <div className="edge-ai-application-grid">
            {edgeAIApplications.map((application) => (
              <Link className="edge-ai-application-card" to={application.to} key={application.title}>
                <img src={application.image} alt={application.imageAlt} loading="lazy" decoding="async" />
                <div>
                  <span>{application.number}</span>
                  <h3>{application.title}</h3>
                  <p>{application.description}</p>
                  <strong>View application area <i aria-hidden="true">→</i></strong>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section edge-ai-platform-choice edge-surface-motif edge-surface-motif--technical">
        <div className="site-container edge-ai-platform-choice__inner">
          <div>
            <span className="micro-label">Platform choice</span>
            <h2>Choose your software stack</h2>
          </div>
          <div>
            <p>ApexFabric is an optional software platform for ZMD hardware. Customers and integrators may also use their own software and integrations.</p>
            <ArrowButton to="/contact">Discuss Edge AI hardware</ArrowButton>
          </div>
        </div>
      </section>
    </div>
  );
}
