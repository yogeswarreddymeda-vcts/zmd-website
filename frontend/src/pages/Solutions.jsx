// =============================================================================
// PHYSICAL AI SOLUTIONS PAGE
// =============================================================================

import React from 'react';
import { Link } from 'react-router-dom';
import solutionsHero from '../assets/images/solutions/solhero.webp';
import securitySolution from '../assets/images/solutions/security-perimeter-v1.webp';
import citiesSolution from '../assets/images/solutions/smart-cities-mobility-v1.webp';
import airportSolution from '../assets/images/solutions/airport-operations-v1.webp';
import industrialDetail from '../assets/images/solutions/detail/industrial-operations.webp';
import healthcareDetail from '../assets/images/solutions/detail/healthcare-operations-v2.webp';
import retailDetail from '../assets/images/solutions/detail/retail-operations.webp';
import homePhysicalAISense from '../assets/images/solutions/home-sense.webp';
import homePhysicalAILocalCompute from '../assets/images/solutions/home-local-compute.webp';
import homePhysicalAIDatacenterCompute from '../assets/images/solutions/home-datacenter-compute.webp';
import homePhysicalAIApplications from '../assets/images/solutions/home-intelligent-applications.webp';
import homePhysicalAIOperations from '../assets/images/solutions/home-connected-operations.webp';
import '../assets/css/Solutions.css';

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

function PageHero({ title, body, image, imageAlt = '', dark = false, children, compact = false, surfaceTone = '' }) {
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
        {image && <div className="page-hero__visual"><img src={image} alt={imageAlt} loading="eager" decoding="async" fetchPriority="high" /></div>}
      </div>
    </section>
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

const assets = {
  homePhysicalAIApplications,
  homePhysicalAIDatacenterCompute,
  homePhysicalAILocalCompute,
  homePhysicalAIOperations,
  homePhysicalAISense,
  solutionsHero,
};

const solutionHardwareFit = ({ sense, local, datacenter }) => [
  { stage: 'Sense', product: 'Cameras and Custom IoT Products', role: sense },
  { stage: 'Local compute', product: 'Compact Edge Systems', role: local },
  { stage: 'Datacenter compute', product: 'AI Datacenter Servers', role: datacenter, whenRequired: true },
];

export default function SolutionsPage() {
  const motionRoot = React.useRef(null);

  React.useLayoutEffect(() => {
    const root = motionRoot.current;
    if (!root) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const selectors = [
      '.page-hero__copy h1',
      '.page-hero__copy > p',
      '.page-hero__actions .button',
      '.page-hero__visual',
      '.solution-index-section .section-intro h2',
      '.solution-preview-card',
      '.solution-architecture-section .section-intro h2',
      '.solution-architecture-section .section-intro p',
      '.physical-ai-story--solutions .physical-ai-story__group',
      '.physical-ai-story--solutions .physical-ai-story__stage',
      '.solution-architecture-caption',
      '.solution-vertical .solution-module__header',
      '.solution-vertical .solution-module__visual',
      '.solution-vertical .solution-module__applications',
      '.solution-vertical .solution-module__applications li',
      '.solution-vertical .solution-module__hardware-intro',
      '.solution-vertical .solution-module__hardware-path > div',
      '.solutions-contact-section__copy',
      '.solutions-contact-section .button',
    ];

    const items = [...root.querySelectorAll(selectors.join(','))];
    const syncItem = (item) => {
      const bounds = item.getBoundingClientRect();
      const visible = keepFinalSectionVisibleAtPageEnd(item, root) || (item.classList.contains('is-solutions-motion-visible')
        ? bounds.top <= window.innerHeight * 1.05 && bounds.bottom >= window.innerHeight * -0.05
        : bounds.top <= window.innerHeight * 0.92 && bounds.bottom >= window.innerHeight * 0.01);
      item.classList.toggle('is-solutions-motion-visible', reducedMotion.matches || visible);
    };

    items.forEach((item, index) => {
      item.classList.add('solutions-motion-item');
      item.style.setProperty('--solutions-motion-order', index % 8);
    });
    root.classList.add('solutions-motion-ready');
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
    <div className="site-page solutions-page" ref={motionRoot}>


      {/* ========================= SOLUTIONS HERO SECTION ========================= */}


      <PageHero
        title="Physical AI applications using ZMD hardware"
        body="ZMD builds the sensing and compute hardware. Customers and integrators add the software, integrations and operational systems required for each deployment."
        image={assets.solutionsHero}
        imageAlt="ZMD hardware connected to manufacturing, security, logistics and enterprise environments"
        dark
      >
        <ArrowButton to="/solutions#solution-areas">Explore applications</ArrowButton>
      </PageHero>


      {/* ====================== APPLICATION AREAS INDEX ====================== */}


      <section className="section solution-index-section" id="solution-areas">
        <div className="site-container">
          <SectionIntro
            title="Application areas"
          />
          <div className="solution-showcase solution-showcase--six">
            {solutions.map((solution) => <SolutionCard solution={solution} key={solution.slug} />)}
          </div>
        </div>
      </section>


      {/* ==================== SHARED REFERENCE ARCHITECTURE ==================== */}


      <SharedSolutionArchitecture />


      {/* =================== DETAILED APPLICATION SECTIONS =================== */}


      {solutions.map((solution, index) => <SolutionSection solution={solution} index={index} key={solution.slug} />)}


      {/* ====================== SOLUTIONS ENQUIRY SECTION ====================== */}


      <section className="section solutions-contact-section">
        <div className="site-container">
          <div className="solutions-contact-section__inner">
            <div className="solutions-contact-section__copy">
              <h2>Configure ZMD hardware for your deployment</h2>
            </div>
            <ArrowButton to="/contact">Discuss hardware configuration</ArrowButton>
          </div>
        </div>
      </section>
    </div>
  );
}
export const sharedSolutionArchitecture = [
  {
    id: 'solutions-zmd-hardware',
    label: 'ZMD hardware',
    tone: 'zmd',
    to: '/products',
    action: 'View Products',
    ariaLabel: 'ZMD hardware layers for solution deployments',
    stages: [
      { number: '01', name: 'Sense', detail: 'Cameras and Custom IoT Products', image: assets.homePhysicalAISense, imageAlt: 'ZMD cameras and sensing devices' },
      { number: '02', name: 'Local compute', detail: 'Compact Edge Systems', image: assets.homePhysicalAILocalCompute, imageAlt: 'Zevric Compact Edge System' },
      { number: '03', name: 'Datacenter compute', detail: 'AI Datacenter Servers when required', image: assets.homePhysicalAIDatacenterCompute, imageAlt: 'ZMD AI Datacenter Server infrastructure' },
    ],
  },
  {
    id: 'solutions-customer-stack',
    label: 'Your solution stack',
    tone: 'open',
    emphasis: true,
    to: '/solutions#solution-areas',
    action: 'Explore Solutions',
    ariaLabel: 'Application, integration and operational layers',
    stages: [
      { number: '04', name: 'Intelligent applications', detail: 'Customer or integrator platform', image: assets.homePhysicalAIApplications, imageAlt: 'Applications and integrations selected by a customer or integrator' },
      { number: '05', name: 'Connected operations', detail: 'Alerts, workflows and customer systems', image: assets.homePhysicalAIOperations, imageAlt: 'Customer operations and connected workflows' },
    ],
  },
];

export function SharedSolutionArchitecture() {
  return (
    <section className="section solution-architecture-section" id="reference-architecture">
      <div className="site-container">
        <SectionIntro
          title="Build on ZMD hardware"
          body="Combine ZMD sensing and compute hardware with customer-selected applications, integrations and operational systems."
        />
        <ArchitectureStory groups={sharedSolutionArchitecture} variant="solutions" />
        <p className="solution-architecture-caption">
          Application examples require customer- or partner-selected software, systems integration and deployment-specific policy controls.
        </p>
      </div>
    </section>
  );
}

export function SolutionHardwareRail({ hardwareFit }) {
  return (
    <section className="solution-module__hardware" aria-label="ZMD hardware for this solution">
      <div className="solution-module__hardware-intro">
        <h3>Product fit</h3>
        <Link className="solution-module__hardware-link" to="/contact">
          Discuss hardware <span aria-hidden="true">→</span>
        </Link>
      </div>
      <dl className="solution-module__hardware-path">
        {hardwareFit.map((item) => (
          <div key={item.stage}>
            <dt>
              <span>{item.stage}</span>
              {item.whenRequired && <em>When required</em>}
            </dt>
            <dd>
              <strong>{item.product}</strong>
              <span>{item.role}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function SolutionSection({ solution, index }) {
  return (
    <section className={`section solution-vertical ${index % 2 === 1 ? 'solution-vertical--reverse' : ''}`} id={solution.slug}>
      <div className="site-container">
        <article className="solution-module">
          <header className="solution-module__header">
            <div>
              <span aria-hidden="true" />
              <h2>{solution.name}</h2>
            </div>
          </header>
          <div className="solution-module__body">
            <figure className="solution-module__visual">
            <img src={solution.detailImage} alt={solution.detailImageAlt} loading="lazy" decoding="async" />
            </figure>
            <div className="solution-module__content">
              <div className="solution-module__applications">
                <h3>Applications</h3>
                <ul>
                  {solution.applications.map((application) => {
                    const title = typeof application === 'string' ? application : application.title;
                    const detail = typeof application === 'string' ? null : application.detail;

                    return (
                      <li key={title}>
                        <span aria-hidden="true" />
                        <div>
                          <strong>{title}</strong>
                          {detail && <p>{detail}</p>}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <SolutionHardwareRail hardwareFit={solution.hardwareFit} />
        </article>
      </div>
    </section>
  );
}
export const solutions = [
  {
    slug: 'surveillance',
    number: '01',
    name: 'Surveillance and Security',
    homeFeatured: true,
    homeTitle: 'Surveillance and Security',
    homeSummary: 'Hardware for local and multi-site monitoring, event review and response workflows.',
    homeImage: securitySolution,
    homeImageAlt: 'Commercial campus perimeter and controlled access zone',
    detailImage: securitySolution,
    detailImageAlt: 'Commercial campus perimeter with cameras, fencing and a controlled vehicle gate',
    applications: [
      {
        title: 'Perimeter and restricted-zone monitoring',
        detail: 'Flag activity across configured boundaries for review within existing security workflows.',
      },
      {
        title: 'After-hours site monitoring',
        detail: 'Apply scheduled zone rules and attach selected event clips for operator assessment.',
      },
      {
        title: 'Event review and response workflows',
        detail: 'Index selected events locally and route them through customer-defined escalation paths.',
      },
      {
        title: 'Crowd and occupancy visibility',
        detail: 'Use anonymous counts and density indicators at entrances and shared spaces.',
      },
      {
        title: 'Camera health and coverage checks',
        detail: 'Surface frozen, obscured or disconnected feeds that may affect coverage.',
      },
    ],
    hardwareFit: solutionHardwareFit({
      sense: 'Perimeter and access-zone capture',
      local: 'Local event processing and review',
      datacenter: 'Multi-site consolidation',
    }),
  },
  {
    slug: 'industrial-ai',
    number: '02',
    name: 'Industrial AI',
    homeFeatured: true,
    homeTitle: 'Industrial AI',
    homeSummary: 'Plant-floor sensing and compute for safety, inspection and production visibility.',
    homeImage: industrialDetail,
    homeImageAlt: 'Production line with workers, inspection cameras and robotic equipment',
    detailImage: industrialDetail,
    detailImageAlt: 'Industrial production environment with cameras, robotics and local AI systems',
    applications: [
      {
        title: 'PPE and exclusion-zone visibility',
        detail: 'Support anonymous, zone-level review of visible PPE and entry into configured restricted areas.',
      },
      {
        title: 'Line-state and micro-stop visibility',
        detail: 'Classify selected running and stopped states through read-only observation outside certified safety systems.',
      },
      {
        title: 'Forklift and pedestrian near-miss analysis',
        detail: 'Review recurring conflict points at crossings, aisles and loading areas.',
      },
      {
        title: 'Controlled visual inspection',
        detail: 'Surface possible product, packaging or label anomalies at defined inspection stations.',
      },
      {
        title: 'Yard, gate and dock operations',
        detail: 'Observe vehicle arrivals, queues, bay occupancy and loading-area activity.',
      },
    ],
    hardwareFit: solutionHardwareFit({
      sense: 'Inspection, plant-zone and yard inputs',
      local: 'Shop-floor processing',
      datacenter: 'Site or multi-plant consolidation',
    }),
  },
  {
    slug: 'healthcare',
    number: '03',
    name: 'Healthcare Operations',
    homeFeatured: true,
    homeTitle: 'Healthcare Operations',
    homeSummary: 'Non-clinical sensing and compute for facility flow, assets and operational workflows.',
    homeImage: healthcareDetail,
    homeImageAlt: 'Hospital facility corridor with staff and local camera infrastructure',
    detailImage: healthcareDetail,
    detailImageAlt: 'Non-clinical hospital operations area with staff and facility monitoring',
    applications: [
      {
        title: 'ED and OPD flow and queue visibility',
        detail: 'Use aggregate counts and dwell patterns in permitted operational areas.',
      },
      {
        title: 'Bed turnover and housekeeping workflows',
        detail: 'Coordinate cleaning and room-readiness tasks through customer-defined workflows.',
      },
      {
        title: 'Equipment movement with RFID or BLE',
        detail: 'Use available customer location systems to support search and return workflows.',
      },
      {
        title: 'Facility, pharmacy and cold-chain monitoring',
        detail: 'Combine permitted cameras and environmental sensors for stock-area oversight.',
      },
      {
        title: 'Service corridor and loading-area logistics',
        detail: 'Support supplies, waste-handling and internal movement workflows.',
      },
    ],
    hardwareFit: solutionHardwareFit({
      sense: 'Permitted operational areas and facility sensors',
      local: 'On-premises operational processing',
      datacenter: 'Hospital or campus consolidation',
    }),
  },
  {
    slug: 'retail-intelligence',
    number: '04',
    name: 'Retail Intelligence',
    homeFeatured: true,
    homeTitle: 'Retail Intelligence',
    homeSummary: 'Store, shelf and distributed-site visibility built on local sensing and compute.',
    homeImage: retailDetail,
    homeImageAlt: 'Retail store using local video and operational intelligence',
    detailImage: retailDetail,
    detailImageAlt: 'Retail floor with local operational and video intelligence',
    applications: [
      {
        title: 'Shelf availability',
        detail: 'Surface shelf gaps and depletion patterns to support staff replenishment decisions.',
      },
      {
        title: 'Planogram and promotion visibility',
        detail: 'Compare selected displays with configured layouts for store or brand review.',
      },
      {
        title: 'Checkout queues and aggregate footfall',
        detail: 'Use anonymous counts to support staffing, service and layout decisions.',
      },
      {
        title: 'POS and camera reconciliation',
        detail: 'Enable partner software to align selected till events with local video cues.',
      },
      {
        title: 'Stockroom, dock and cold-chain operations',
        detail: 'Support receiving visibility, stock movement and temperature-excursion workflows.',
      },
    ],
    hardwareFit: solutionHardwareFit({
      sense: 'Shelf, store, stockroom and cold-chain inputs',
      local: 'Per-store processing',
      datacenter: 'Distributed-estate consolidation',
    }),
  },
  {
    slug: 'smart-cities-mobility',
    number: '05',
    name: 'Smart Cities and Mobility',
    homeFeatured: false,
    homeTitle: 'Smart Cities and Mobility',
    homeSummary: 'Junction, parking and civic sensing for partner-led municipal solutions.',
    homeImage: citiesSolution,
    homeImageAlt: 'Urban junction with traffic cameras, signals and roadside infrastructure',
    detailImage: citiesSolution,
    detailImageAlt: 'Contemporary city junction with mixed traffic, cameras and civic infrastructure',
    applications: [
      {
        title: 'Traffic and junction visibility',
        detail: 'Observe queues, stalled vehicles and congestion patterns at selected corridors.',
      },
      {
        title: 'Incident and obstruction review',
        detail: 'Route permitted camera events for operator-led dispatch and closure workflows.',
      },
      {
        title: 'Parking and legally permitted ANPR workflows',
        detail: 'Connect occupancy or plate events under the authority\'s policy and review process.',
      },
      {
        title: 'Flood-point and environmental sensing',
        detail: 'Combine camera views with water-level and environmental sensors.',
      },
      {
        title: 'Street assets and waste collection',
        detail: 'Surface missed collections, streetlight outages, damaged signage or road defects for authority-managed work orders.',
      },
    ],
    hardwareFit: solutionHardwareFit({
      sense: 'Junction, parking and environmental sensing',
      local: 'Roadside or junction processing',
      datacenter: 'Municipal consolidation',
    }),
  },
  {
    slug: 'airport-operations',
    number: '06',
    name: 'Airport Operations',
    homeFeatured: false,
    homeTitle: 'Airport Operations',
    homeSummary: 'Terminal, kerbside and operational visibility on airport-controlled infrastructure.',
    homeImage: airportSolution,
    homeImageAlt: 'Airport terminal queue and operations environment',
    detailImage: airportSolution,
    detailImageAlt: 'Airport terminal with passenger queues, staff workflows and apron activity',
    applications: [
      {
        title: 'Terminal queue, occupancy and passenger flow',
        detail: 'Use anonymous counts and dwell patterns for staffing and service planning.',
      },
      {
        title: 'Baggage and asset flow',
        detail: 'Connect local sensing with airport baggage or asset systems where available.',
      },
      {
        title: 'Kerbside, taxi and parking operations',
        detail: 'Report lane congestion, taxi-queue conditions and parking occupancy to airport-controlled workflows.',
      },
      {
        title: 'Turnaround milestone visibility',
        detail: 'Timestamp selected stand activities using approved operational inputs for staff review.',
      },
      {
        title: 'Facilities, perimeter and incident awareness',
        detail: 'Surface selected facility or boundary events for airport staff validation and response.',
      },
    ],
    hardwareFit: solutionHardwareFit({
      sense: 'Terminal, kerbside and perimeter inputs',
      local: 'Zone-level processing',
      datacenter: 'Airport-wide consolidation',
    }),
  },
];
