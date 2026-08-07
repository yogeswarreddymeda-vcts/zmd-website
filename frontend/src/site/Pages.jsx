import React from 'react';
import { Link } from 'react-router-dom';
import {
  assets,
  cameraProducts,
  contact,
  customIotProducts,
  edgeProducts,
  solutions,
} from './data';
import {
  ArchitectureStory,
  CarouselControls,
  CustomIoTVisual,
  PageHero,
  PhysicalAIStory,
  ProductStoryHero,
  SectionIntro,
  SolutionCard,
} from './Components';

function ArrowButton({ to, children, secondary = false, light = false }) {
  const variant = light ? 'button--light' : secondary ? 'button--secondary' : 'button--primary';
  return <Link className={`button ${variant}`} to={to}>{children} <span aria-hidden="true">→</span></Link>;
}

function ZevricHero({ page }) {
  const isProductPage = page === 'product';
  const title = isProductPage
    ? 'Zevric Compact Edge Systems'
    : 'Local AI processing on Zevric';
  const body = isProductPage
    ? 'Select processor, cooling and accelerator options on a shared Mini-ITX hardware platform.'
    : 'Zevric processes video and sensor data on site while customers and integrators choose the runtime, models, applications and workflows.';
  const heroImage = isProductPage ? assets.edgeHero : assets.homeEdgeIndustrial;
  const heroAlt = isProductPage
    ? 'Zevric Compact Edge System'
    : 'Zevric Compact Edge System in a precision electronics lab';

  return (
    <section className={`zevric-shared-hero zevric-shared-hero--${page}`}>
      <div className="site-container zevric-shared-hero__inner">
        <div className={`zevric-shared-hero__copy edge-surface-motif ${isProductPage ? 'edge-surface-motif--blueprint' : 'edge-surface-motif--contour'}`}>
          <h1 tabIndex="-1">{title}</h1>
          <p>{body}</p>
          <div className="zevric-shared-hero__actions">
            {isProductPage ? (
              <>
                <ArrowButton to="/contact">Discuss a Zevric configuration</ArrowButton>
                <ArrowButton to="/edge-ai#applications" secondary>Explore Edge AI applications</ArrowButton>
              </>
            ) : (
              <>
                <ArrowButton to="/edge-ai#applications">Explore applications</ArrowButton>
                <ArrowButton to="/products/edge-devices#configurations" secondary>View configurations</ArrowButton>
              </>
            )}
          </div>
        </div>

        <div className="zevric-shared-hero__visual">
          <div className="zevric-shared-hero__processor">
            <img src={assets.intelCoreUltraBadges} alt="Intel Core Ultra 5, 7 and 9 processor badges" />
          </div>
          <img src={heroImage} alt={heroAlt} fetchPriority="high" />
        </div>
      </div>
    </section>
  );
}

function OfficeGrid({ contactPage = false }) {
  return (
    <div className="office-grid">
      {contact.offices.map((office) => (
        <article className={!office.address ? 'office-grid__item--location-only' : undefined} key={office.city}>
          <h3>{office.city}{office.label && <small>{office.label}</small>}</h3>
          {office.address
            ? <p>{office.address}</p>
            : contactPage
              ? <a className="office-grid__request" href={`mailto:${contact.email}?subject=${encodeURIComponent(`${office.city} office details`)}`}>Address available on request <span aria-hidden="true">↗</span></a>
              : <Link className="office-grid__request" to="/contact">Address available on request <span aria-hidden="true">→</span></Link>}
        </article>
      ))}
    </div>
  );
}

function ZevricProductGrid() {
  return (
    <div className="zevric-grid">
      {edgeProducts.map((product) => (
        <article className="zevric-card" key={product.slug}>
          <div className="zevric-card__visual">
            <img src={product.image} alt={product.imageAlt} loading="lazy" decoding="async" />
          </div>
          <div className="zevric-card__body">
            <header>
              <h3>{product.name}</h3>
              <span className="zevric-card__sku">{product.sku}</span>
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
              <div><dt>Cooling</dt><dd><SpecValue value={product.comparison.cooling} /></dd></div>
            </dl>
          </div>
        </article>
      ))}
    </div>
  );
}

function SpecValue({ value }) {
  const parts = String(value).split('†');
  return parts.map((part, index) => (
    <React.Fragment key={`${part}-${index}`}>
      {part}
      {index < parts.length - 1 && <sup className="pending-mark" aria-label="Pending engineering validation">†</sup>}
    </React.Fragment>
  ));
}

const zevricComparisonRows = [
  ['Processor', 'processor'],
  ['Cores and clocks', 'cores'],
  ['Integrated graphics', 'graphics'],
  ['NPU peak', 'npu'],
  ['SoC peak', 'soc'],
  ['Discrete GPU', 'gpu'],
  ['Discrete GPU peak', 'gpuPeak'],
  ['Cooling', 'cooling'],
  ['Operating temperature', 'temperature'],
  ['Power input', 'power'],
  ['Availability', 'availability'],
];

const zevricPlatformSpecs = [
  ['Processor options', 'Intel® Core™ Ultra 5 225H / Ultra 7 255H / Ultra 9 285H'],
  ['Memory', '2 × SO-DIMM · up to 96 GB dual-channel DDR5'],
  ['Storage', '2 × M.2 Key M PCIe Gen4 ×4 · 2 × SATA3'],
  ['Expansion', 'PCIe ×8 Gen5 · M.2 Key E · M.2 Key B + SIM'],
  ['Networking', '1 GbE Intel® I219-LM with vPro® · 2.5 GbE'],
  ['Rear I/O', '4 × HDMI 2.1 · USB · audio'],
  ['Power input', 'DC input on XE, XE-Pro and XE-Ultra · XE-Max AC PSU pending definition†'],
  ['Form factor', 'Mini-ITX · 200 × 200 × 65 mm'],
];

const zevricPlatformFeatures = [
  ['Shared Intel platform', 'Core Ultra 5, 7 and 9 options on one Mini-ITX board.'],
  ['On-device AI', '13 TOPS NPU standard. XE-Ultra and XE-Max reach 99 TOPS peak SoC AI.'],
  ['Dual-network design', '1 GbE Intel vPro® and 2.5 GbE ports support separate network paths.'],
  ['Display and vision I/O', 'Four HDMI 2.1 outputs plus internal camera and display interfaces.'],
  ['PCIe Gen5 expansion', 'PCIe ×8 Gen5 for selected accelerators. XE-Max adds a discrete GPU.'],
  ['Edge deployment controls', 'Hardware watchdog for unattended sites. Power input varies by model.'],
];

const edgeAIApplications = [
  {
    number: '01',
    title: 'Security, cities and transport',
    description: 'Process video locally for perimeter events, airport passenger flow, traffic visibility and site monitoring.',
    image: assets.edgeAIApplicationVideo,
    imageAlt: 'Airport operations environment for local video intelligence',
    to: '/solutions#surveillance',
  },
  {
    number: '02',
    title: 'Manufacturing and industrial AI',
    description: 'Run visual inspection, safety monitoring and operational analytics close to machines and production lines.',
    image: assets.edgeAIApplicationIndustrial,
    imageAlt: 'Industrial robot and machine-vision station',
    to: '/solutions#industrial-ai',
  },
  {
    number: '03',
    title: 'Healthcare operations',
    description: 'Support permitted, non-clinical facility flow, housekeeping and operational workflows inside the site.',
    image: assets.edgeAIApplicationHealthcare,
    imageAlt: 'Non-clinical hospital operations area',
    to: '/solutions#healthcare',
  },
  {
    number: '04',
    title: 'Retail and site intelligence',
    description: 'Combine video, sensors and enterprise inputs for queue analysis, shelf availability and distributed operations.',
    image: assets.edgeAIApplicationSite,
    imageAlt: 'Retail site with cameras and operational systems',
    to: '/solutions#retail-intelligence',
  },
];

const edgeAIArchitecture = [
  {
    id: 'edge-ai-zmd-hardware',
    label: 'ZMD hardware',
    tone: 'zmd',
    ariaLabel: 'ZMD sensing and local compute layers',
    stages: [
      {
        number: '01',
        name: 'Sense',
        detail: 'Cameras, sensors and operational systems',
        image: assets.ecosystemSensors,
        imageAlt: 'Cameras and sensing devices supplying data to an Edge AI system',
      },
      {
        number: '02',
        name: 'Local compute',
        detail: 'Zevric Compact Edge Systems',
        image: assets.ecosystemEdge,
        imageAlt: 'Zevric Compact Edge System for local AI inference',
        emphasis: true,
      },
    ],
  },
  {
    id: 'edge-ai-solution-stack',
    label: 'Your solution stack',
    tone: 'open',
    ariaLabel: 'Customer or integrator application and operational layers',
    stages: [
      {
        number: '03',
        name: 'Intelligent applications',
        detail: 'Runtime, models and workflows',
        image: assets.ecosystemSoftwareIntegration,
        imageAlt: 'Applications, runtime and integration systems',
      },
      {
        number: '04',
        name: 'Operational intelligence',
        detail: 'Events, alerts and context',
        image: assets.ecosystemOperationsAction,
        imageAlt: 'Operational dashboards showing events and alerts',
      },
      {
        number: '05',
        name: 'Connected operations',
        detail: 'Decisions, workflows and actuation',
        image: assets.ecosystemActuation,
        imageAlt: 'Robots and connected systems representing physical action',
      },
    ],
  },
];

const cameraApplicationVisuals = [
  ['Access and people flow', assets.cameraApplicationAccess, 'Camera coverage across a building entrance and lobby'],
  ['Traffic and vehicle analytics', assets.cameraApplicationTraffic, 'Multi-lane road captured for vehicle analytics'],
  ['Fire and smoke monitoring', assets.cameraApplicationFire, 'Industrial production floor with a visible fire event'],
  ['Industrial safety visibility', assets.cameraApplicationIndustrial, 'Industrial team monitored for safety and protective equipment'],
];

const cameraHeroSlides = [
  {
    eyebrow: 'Dual-Lens Camera',
    navigationLabel: 'Dual-Lens Camera',
    image: assets.cameraContext,
    imageAlt: 'ZMD dual-lens camera mounted above an enterprise entrance',
    caption: 'Panoramic coverage format',
  },
  {
    eyebrow: 'Single-Lens Camera',
    navigationLabel: 'Single-Lens Camera',
    image: assets.cameraSingleContext,
    imageAlt: 'ZMD single-lens camera installed in an enterprise environment',
    caption: 'Focused coverage format',
  },
  {
    eyebrow: 'Bullet Camera',
    navigationLabel: 'Bullet Camera',
    image: assets.cameraBulletContext,
    imageAlt: 'ZMD bullet camera mounted at a modern industrial perimeter',
    caption: 'Directional perimeter format',
  },
  {
    eyebrow: 'Head-Mount Camera',
    navigationLabel: 'Head-Mount Camera',
    image: assets.cameraHeadMountContext,
    imageAlt: 'Industrial inspection technician using a ZMD head-mount camera',
    caption: 'Hands-free mobile format',
  },
];

const zevricHeroSlides = edgeProducts.map((product) => ({
  navigationLabel: product.name,
  image: product.image,
  imageAlt: product.imageAlt,
  caption: `${product.name} / ${product.sku}`,
  fit: 'contain',
  mediaBadge: {
    image: assets.intelCoreUltraBadges,
    imageAlt: 'Intel Core Ultra 5, 7 and 9 processor badges',
  },
}));

const AUTO_CAROUSEL_INTERVAL = 5200;

const homeProductSlides = [
  {
    id: 'zevric-local-ai',
    variant: 'edge',
    title: 'Zevric Compact Edge Systems for local AI',
    body: 'Four Intel® Core™ Ultra Series 2 configurations, including a discrete-GPU option.',
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
    title: 'Panoramic cameras for wide-area visibility',
    body: 'Dual-lens camera platforms for entrances, perimeters and open areas across security and operational portfolios.',
    image: assets.cameraContext,
    imageAlt: 'ZMD dual-lens camera mounted above an enterprise entrance',
    fit: 'cover',
    primaryAction: { label: 'View camera models', to: '/products/cameras' },
    secondaryAction: { label: 'Discuss requirements', to: '/contact' },
  },
  {
    id: 'zevric-industrial-ai',
    variant: 'edge',
    title: 'Zevric systems for industrial edge deployments',
    body: 'Fanless and actively cooled configurations for local inference, video processing and industrial connectivity.',
    image: assets.edgeIndustrialAngle,
    imageAlt: 'Zevric Compact Edge System in an industrial automation environment',
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
    image: assets.cameraBulletContext,
    imageAlt: 'ZMD bullet camera mounted at a modern industrial perimeter',
    fit: 'cover',
    primaryAction: { label: 'View camera models', to: '/products/cameras' },
    secondaryAction: { label: 'Discuss requirements', to: '/contact' },
  },
];

const cameraSpecGroups = [
  {
    id: 'optics',
    label: 'Optics & imaging',
    rows: [
      ['Resolution', '2 × 2 MP; up to 1920 × 1080 per sensor', '2 MP; up to 1920 × 1080'],
      ['Image sensor', 'Dual 1/2.8-inch progressive scan CMOS', '1/2.8-inch progressive scan CMOS'],
      ['Lens', 'Fixed-focus 3.6 mm', 'Fixed-focus 3.6 mm'],
      ['Field of view', '180° horizontal, 50° vertical', '110° horizontal, 50° vertical'],
      ['Night vision', 'High-power IR, up to 30 m at 0 lux', 'Smart IR, up to 30 m at 0 lux'],
      ['Dynamic range', 'WDR for backlit scenes', 'WDR for backlit scenes'],
    ],
  },
  {
    id: 'video-network',
    label: 'Video & network',
    rows: [
      ['Video compression', 'H.265 / H.264 multi-mode with Instastream', 'H.265 / H.264 multi-mode with Instastream'],
      ['Maximum frame rate', '30 fps at maximum resolution', '30 fps at 1920 × 1080'],
      ['Streaming', 'Triple stream: main, sub and third', 'Dual stream: main and sub'],
      ['Ethernet', 'RJ45 10/100 Mbps self-adaptive', 'RJ45 10/100 Mbps self-adaptive'],
      ['ONVIF', 'Profiles S, G and T', 'Profiles S, G and T'],
      ['Protocols', 'RTSP, RTMP, HTTP, HTTPS, TCP/IP and UDP', 'RTSP, RTMP, HTTP, HTTPS, TCP/IP and UDP'],
    ],
  },
  {
    id: 'edge-ai',
    label: 'Edge AI & storage',
    rows: [
      ['Edge processor', 'Integrated NPU accelerator, 2.4 TOPS', 'ZMD Edge AI NPU accelerator'],
      ['Analytics engines', '14 on-board real-time engines', '14 on-board real-time engines'],
      ['Local processing', 'On-device rule evaluation', 'On-device rule evaluation'],
      ['Event triggers', 'Intrusion, line crossing, ANPR, face and PPE', 'Intrusion, line crossing, ANPR, face and PPE'],
      ['Alert outputs', 'Email, HTTP POST webhook and alarm out', 'Email, HTTP POST webhook and alarm out'],
      ['Edge storage', 'MicroSD up to 512 GB', 'MicroSD up to 512 GB'],
    ],
  },
  {
    id: 'physical',
    label: 'Physical & power',
    rows: [
      ['Form factor', 'Metal dome enclosure', 'Metal dome enclosure'],
      ['Weather protection', 'IP67', 'IP67'],
      ['Impact resistance', 'IK10', 'IK10'],
      ['Power input', '12 V DC / PoE, IEEE 802.3af', '12 V DC / PoE, IEEE 802.3af'],
      ['Power consumption', '1.3 W typical; 4.2 W peak; 12.5 W maximum with IR/AI active', '1.1 W typical; 3.6 W peak'],
      ['Operating temperature', '-30°C to +60°C', '-30°C to +60°C'],
      ['Compliance', 'BIS, STQC and NDAA', 'BIS, STQC and NDAA'],
      ['Dimensions / weight', '150 × 150 × 110 mm / 850 g', '120 × 120 × 95 mm / 620 g'],
    ],
  },
];

const serverPlatformViews = [
  ['Front platform view', assets.serverBlueprintFront, 'Front view of an AI Datacenter Server platform'],
  ['Internal platform view', assets.serverBlueprintInternal, 'Internal components of an AI Datacenter Server platform'],
  ['Rear platform view', assets.serverBlueprintRear, 'Rear I/O and power view of an AI Datacenter Server platform'],
];

const serverSpecificationGroups = [
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

const serverStorageProfiles = [
  ['8 × 2.5-inch + 8 × E1.S', 'Gen5'],
  ['24 × E1.S', 'Gen5'],
  ['24 × 2.5-inch', 'NVMe · Gen4'],
  ['24 × 2.5-inch', 'SAS / SATA'],
  ['12 × 3.5-inch', 'Tri-mode'],
  ['12 × 3.5-inch', 'SAS / SATA'],
];

const serverModels = [
  {
    slug: 'rs240',
    name: 'RS240',
    summary: '2U/2S dual-socket platform with deep memory, configurable front storage and redundant power.',
    image: assets.serverHero,
    imageAlt: 'ZMD RS240 2U dual-socket rackmount server',
  },
  {
    slug: '1u-1s-xeon',
    name: '1U/1S Xeon Series',
    summary: 'Single-socket 1U format. Configuration details available from ZMD.',
    image: assets.serverModel1U,
    imageAlt: 'ZMD 1U single-socket Xeon server format',
  },
  {
    slug: '2u-1s-xeon',
    name: '2U/1S Xeon Series',
    summary: 'Single-socket 2U format. Configuration details available from ZMD.',
    image: assets.serverModel2U,
    imageAlt: 'ZMD 2U single-socket Xeon server format',
  },
  {
    slug: '4u-2s-xeon',
    name: '4U/2S Xeon Series',
    summary: 'Dual-socket 4U format. Configuration details available from ZMD.',
    image: assets.serverModel4U,
    imageAlt: 'ZMD 4U dual-socket Xeon server format',
  },
];

const serverApplications = [
  ['Cloud infrastructure', assets.homeServerIndustrial, 'ZMD AI Datacenter Server installed in datacenter infrastructure'],
  ['Virtualization', assets.serverBlueprintInternal, 'Internal platform view of the RS240 server'],
  ['Database servers', assets.serverBlueprintFront, 'Front platform view of the RS240 server'],
  ['AI and machine learning', assets.serverBlueprintRear, 'Rear platform view of the RS240 server'],
  ['High-performance computing', assets.serverHero, 'ZMD RS240 2U dual-socket server'],
];

const iotSpecificationGroups = [
  {
    id: 'safety-band',
    label: 'Safety Band',
    description: 'Published sensing, health-monitoring, communication and power specifications.',
    rows: [
      ['Category', 'Sensors'],
      ['Environmental sensing', 'Temperature, humidity and CO₂'],
      ['Health monitoring', 'Heart rate, body temperature and SpO₂'],
      ['Safety function', 'Fall detection and SOS push button'],
      ['Audio', '4 Ω speaker'],
      ['Communication module', 'GeoLinker GL868 with SIM868'],
      ['Battery', '3.7 V lithium battery'],
    ],
  },
  {
    id: 'parking-sensor',
    label: 'Parking Sensor',
    description: 'Published detection, communication, battery and environmental specifications.',
    rows: [
      ['Category', 'Sensors'],
      ['Detection method', 'Magnetometer sensor'],
      ['Communication range', 'Up to 6 km outdoors; approximately 100 m indoors'],
      ['Battery', '2 × 3.6 V AA replaceable lithium batteries'],
      ['Battery life', 'Up to 3–5 years'],
      ['Operating environment', 'Indoor and outdoor use'],
      ['Enclosure rating', 'IP67'],
      ['Temperature range', '-40°C to +80°C'],
    ],
  },
];

const iotApplications = [
  ['Workforce monitoring', assets.industrialAISolution, 'Connected workforce operating in an industrial environment'],
  ['Parking occupancy', assets.parkingSensorContext, 'Parking facility monitored by occupancy sensors'],
  ['Campuses and industrial sites', assets.homeIotIndustrial, 'Connected sensing hardware in an industrial site'],
  ['Commercial and public infrastructure', assets.physicalAIHardwareScene, 'Connected hardware deployed across physical infrastructure'],
];

const sharedSolutionArchitecture = [
  {
    id: 'solutions-zmd-hardware',
    label: 'ZMD hardware',
    tone: 'zmd',
    ariaLabel: 'ZMD hardware layers for solution deployments',
    stages: [
      { number: '01', name: 'Sense', detail: 'Cameras and Custom IoT Products', image: assets.ecosystemSensors, imageAlt: 'ZMD cameras and sensing devices' },
      { number: '02', name: 'Local compute', detail: 'Compact Edge Systems', image: assets.ecosystemEdge, imageAlt: 'Zevric Compact Edge System' },
      { number: '03', name: 'Datacenter compute', detail: 'AI Datacenter Servers when required', image: assets.ecosystemInfrastructure, imageAlt: 'ZMD AI Datacenter Server infrastructure' },
    ],
  },
  {
    id: 'solutions-customer-stack',
    label: 'Your solution stack',
    tone: 'open',
    emphasis: true,
    ariaLabel: 'Application, integration and operational layers',
    stages: [
      { number: '04', name: 'Intelligent applications', detail: 'Customer or integrator platform', image: assets.ecosystemSoftwareIntegration, imageAlt: 'Applications and integrations selected by a customer or integrator' },
      { number: '05', name: 'Connected operations', detail: 'Alerts, workflows and customer systems', image: assets.ecosystemOperationsAction, imageAlt: 'Customer operations and connected workflows' },
    ],
  },
];

function SharedSolutionArchitecture() {
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

function SolutionHardwareRail({ hardwareFit }) {
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

function SolutionSection({ solution, index }) {
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

function HomeProductFeature({
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
    }, AUTO_CAROUSEL_INTERVAL);

    return () => window.clearTimeout(timer);
  }, [activeIndex, slides.length]);

  return (
    <section
      className={`home-product-feature home-product-feature--${activeSlide.variant}`}
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
            loading="lazy"
            decoding="async"
          />
          {activeSlide.mediaBadge && (
            <img
              className="home-product-feature__badge"
              src={activeSlide.mediaBadge.image}
              alt={activeSlide.mediaBadge.imageAlt}
              loading="lazy"
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
          durationMs={AUTO_CAROUSEL_INTERVAL}
          label="Featured product navigation"
        />
      </div>
    </section>
  );
}

function HomeSolutionsCarousel({ items }) {
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
          {visibleItems.map((solution) => <SolutionCard solution={solution} key={solution.slug} />)}
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

export function HomePage() {
  return (
    <div className="site-page home-page">
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

      <HomeProductFeature
        slides={homeProductSlides}
      />

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

function ProductHighlights({ items, qualifier }) {
  return (
    <section className="product-highlight-band" aria-label="Product highlights">
      <div className="site-container product-highlight-band__grid">
        {items.map(([label, value]) => (
          <div key={label}><span>{label}</span><strong>{value}</strong></div>
        ))}
      </div>
      {qualifier && <p className="site-container product-highlight-band__qualifier">{qualifier}</p>}
    </section>
  );
}

function OEMEngagement({ title, body, action = 'Partner with ZMD' }) {
  return (
    <section className="section product-oem-engagement surface-band surface-band--ink">
      <div className="site-container product-oem-engagement__inner">
        <div><h2>{title}</h2><p>{body}</p></div>
        <ArrowButton to="/contact" light>{action}</ArrowButton>
      </div>
    </section>
  );
}

export function ProductsPage() {
  const productHubFamilies = [
    {
      slug: 'cameras',
      name: 'Cameras',
      role: 'Visual sensing',
      description: 'Four camera formats for panoramic, fixed, directional and hands-free imaging.',
      action: 'Explore camera models',
      to: '/products/cameras',
      image: assets.homeCameraIndustrial,
      imageAlt: 'ZMD camera installed above a commercial entrance',
      surface: 'white',
    },
    {
      slug: 'zevric',
      name: 'Zevric Compact Edge Systems',
      role: 'Local AI compute',
      description: 'Four configurations for local AI inference, video processing and industrial edge deployments.',
      action: 'Compare Zevric models',
      to: '/products/edge-devices',
      image: assets.homeEdgeIndustrial,
      imageAlt: 'Zevric Compact Edge System in a precision electronics environment',
      surface: 'neutral',
      reverse: true,
    },
    {
      slug: 'servers',
      name: 'AI Datacenter Servers',
      role: 'Datacenter compute',
      description: 'Centralized compute platforms for AI processing, storage and multi-site infrastructure.',
      action: 'Explore server platforms',
      to: '/products/servers',
      image: assets.homeServerIndustrial,
      imageAlt: 'ZMD AI Datacenter Server in a datacenter environment',
      surface: 'white',
    },
    {
      slug: 'custom-iot',
      name: 'Custom IoT Products',
      role: 'Connected sensing',
      description: 'Available Safety Band and Parking Sensor products, plus custom IoT hardware engagements.',
      action: 'Explore Custom IoT',
      to: '/products/custom-iot',
      surface: 'neutral',
      reverse: true,
      customVisual: true,
      compact: true,
    },
  ];

  return (
    <div className="site-page product-catalog-page product-hub">
      <PageHero
        title="Hardware products for sensing and compute"
        body="ZMD builds complete products for OEM and white-label portfolios."
        image={assets.physicalAIHardwareScene}
        imageAlt="ZMD cameras, Zevric Compact Edge Systems and an AI Datacenter Server"
        dark
        surfaceTone="ink"
      >
        <ArrowButton to="/products#product-families">Explore product families</ArrowButton>
        <ArrowButton to="/contact" secondary>Partner with ZMD</ArrowButton>
      </PageHero>

      <nav className="product-hub-index" id="product-families" aria-label="Product families">
        <div className="site-container product-hub-index__track">
          {productHubFamilies.map((family) => (
            <Link className="product-hub-index__item" to={`/products#${family.slug}`} key={family.slug}>
              <span>{family.name}</span>
              <small>{family.role}</small>
              <i aria-hidden="true">↓</i>
            </Link>
          ))}
        </div>
      </nav>

      <div className="product-hub-families">
        {productHubFamilies.map((family) => (
          <section
            className={`product-hub-family product-hub-family--${family.surface} ${family.reverse ? 'product-hub-family--reverse' : ''} ${family.compact ? 'product-hub-family--compact' : ''}`}
            id={family.slug}
            key={family.slug}
          >
            <div className="site-container product-hub-family__inner">
              <Link className="product-hub-family__visual" to={family.to} aria-label={`${family.action}: ${family.name}`}>
                {family.customVisual ? (
                  <div className="product-hub-iot-visual">
                    <div className="product-hub-iot-visual__band">
                      <img
                        src={assets.safetyBandContext}
                        alt="Industrial worker wearing a ZMD Safety Band"
                        loading="lazy"
                        decoding="async"
                      />
                      <span>Safety Band</span>
                    </div>
                    <div className="product-hub-iot-visual__sensor">
                      <img
                        src={assets.parkingSensorContextV2}
                        alt="ZMD Parking Sensor installed in a parking bay"
                        loading="lazy"
                        decoding="async"
                      />
                      <span>Parking Sensor</span>
                    </div>
                  </div>
                ) : (
                  <img src={family.image} alt={family.imageAlt} loading="lazy" decoding="async" />
                )}
              </Link>
              <div className="product-hub-family__content">
                <h2>{family.name}</h2>
                <p>{family.description}</p>
                <ArrowButton to={family.to} secondary>{family.action}</ArrowButton>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="product-hub-engagement">
        <div className="site-container product-hub-engagement__inner">
          <div>
            <h2>Discuss your product requirements</h2>
            <p>Select a product family, define the required configuration and discuss branding and supply with ZMD.</p>
          </div>
          <ArrowButton to="/contact">Contact sales</ArrowButton>
        </div>
      </section>
    </div>
  );
}

function CameraModelCard({ product }) {
  return (
    <article className="camera-model-card">
      <div className="camera-model-card__visual">
        <img src={product.image} alt={product.imageAlt} loading="lazy" decoding="async" />
      </div>
      <div className="camera-model-card__body">
        {product.category ? (
          <div className="camera-model-card__meta">
            <strong>{product.category}</strong>
          </div>
        ) : null}
        <h3>{product.name}</h3>
        <p>{product.summary}</p>
      </div>
    </article>
  );
}

function CameraSpecificationTable() {
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

function ServerSpecificationTable() {
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

function IoTSpecificationTable() {
  const [activeGroupId, setActiveGroupId] = React.useState(iotSpecificationGroups[0].id);
  const activeGroup = iotSpecificationGroups.find((group) => group.id === activeGroupId) || iotSpecificationGroups[0];

  return (
    <div className="camera-specification-layout product-specification-layout--full">
      <div className="camera-specification-main">
        <div className="camera-specification-tabs" aria-label="IoT product specification categories">
          {iotSpecificationGroups.map((group) => (
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
        <div className="camera-specification-table" role="region" aria-label={`${activeGroup.label} specifications`} tabIndex="0">
          <table>
            <thead><tr><th scope="col">Specification</th><th scope="col">Published detail</th></tr></thead>
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

function ProductApplicationCards({ items }) {
  return (
    <div className="camera-application-grid">
      {items.map(([title, image, imageAlt]) => (
        <article key={title}>
          <img src={image} alt={imageAlt} loading="lazy" decoding="async" />
          <div><h3>{title}</h3></div>
        </article>
      ))}
    </div>
  );
}

export function CamerasPage() {
  return (
    <div className="site-page camera-page">
      <ProductStoryHero
        slides={cameraHeroSlides}
        title="Cameras for OEM portfolios"
        body="Four formats for panoramic, fixed, directional and hands-free imaging."
        className="camera-story-hero"
        autoAdvanceMs={AUTO_CAROUSEL_INTERVAL}
        primaryAction={{ label: 'View camera models', to: '/products/cameras#camera-models' }}
        secondaryAction={{ label: 'Discuss camera requirements', to: '/contact' }}
        tone="navy"
      />
      <ProductHighlights
        items={[
          ['Imaging', '2 MP per sensor'],
          ['Coverage', '180° panoramic or 110° wide'],
          ['On-device AI', '14 analytics engines'],
          ['Local storage', 'MicroSD up to 512 GB'],
        ]}
      />
      <section className="section section--paper camera-models surface-band surface-band--neutral" id="camera-models">
        <div className="site-container">
          <SectionIntro title="Camera models" />
          <div className="camera-model-grid">
            {cameraProducts.map((product) => <CameraModelCard key={product.slug} product={product} />)}
          </div>
        </div>
      </section>
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
      <section className="section camera-applications surface-band surface-band--neutral" id="camera-applications">
        <div className="site-container">
          <SectionIntro title="Application areas" />
          <ProductApplicationCards items={cameraApplicationVisuals} />
          <div className="section-action"><ArrowButton to="/solutions" secondary>View solution areas</ArrowButton></div>
        </div>
      </section>
      <OEMEngagement
        title="Add ZMD Cameras to your portfolio"
        body="Discuss standard, branded or white-label Camera configurations and supply requirements."
        action="Discuss camera requirements"
      />
    </div>
  );
}

export function EdgeDevicesPage() {
  return (
    <div className="site-page zevric-product-page">
      <ProductStoryHero
        slides={zevricHeroSlides}
        title="Zevric Compact Edge Systems"
        body="Select processor, cooling and accelerator options on a shared Mini-ITX hardware platform."
        className="zevric-product-hero zevric-product-hero--blueprint"
        autoAdvanceMs={AUTO_CAROUSEL_INTERVAL}
        primaryAction={{ label: 'Compare configurations', to: '/products/edge-devices#configurations' }}
        secondaryAction={{ label: 'Discuss a Zevric configuration', to: '/contact' }}
      />
      <section className="zevric-overview" aria-label="Shared Zevric platform">
        <div className="site-container zevric-overview__grid">
          <div><span>Shared foundation</span><strong>One Mini-ITX board and I/O topology</strong></div>
          <div><span>Workload choice</span><strong>Core Ultra 5, 7 or 9 configurations</strong></div>
          <div><span>Expansion path</span><strong>Integrated acceleration or discrete GPU</strong></div>
          <div><span>Industrial connectivity</span><strong>Dual LAN, display and expansion interfaces</strong></div>
        </div>
      </section>
      <section className="section section--paper surface-transition surface-transition--light zevric-lineup edge-surface-motif edge-surface-motif--technical" id="configurations">
        <div className="site-container">
          <SectionIntro title="Four Zevric configurations" />
          <div className="zevric-lineup__guide">
            <p>Three processor levels and one discrete-GPU configuration on a shared board and I/O platform.</p>
          </div>
          <ZevricProductGrid />
          <p className="content-qualifier">TOPS values are peak silicon specifications for the stated accelerator, not measured application performance. Product imagery is representative.</p>
          <div className="zevric-comparison" id="comparison">
            <h2 id="zevric-comparison-title">Configuration comparison</h2>
            <div className="zevric-comparison__table-scroll" role="region" aria-labelledby="zevric-comparison-title" tabIndex="0">
              <table>
                <caption>Comparison of Zevric Compact Edge System configurations</caption>
                <thead>
                  <tr><th scope="col">Specification</th>{edgeProducts.map((product) => <th scope="col" key={product.slug}>{product.name}<small>{product.sku}</small></th>)}</tr>
                </thead>
                <tbody>
                  {zevricComparisonRows.map(([label, key]) => (
                    <tr key={key}>
                      <th scope="row">{label}</th>
                      {edgeProducts.map((product) => (
                        <td data-label={product.name} key={product.slug}>
                          <SpecValue value={key === 'processor' ? product.processor : product.comparison[key]} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="content-qualifier"><sup className="pending-mark" aria-hidden="true">†</sup> Proposed value pending engineering validation.</p>
        </div>
      </section>

      <section className="section zevric-platform edge-surface-motif edge-surface-motif--technical" id="platform">
        <div className="site-container">
          <SectionIntro title="Shared platform" />
          <div className="zevric-platform__layout">
            <div className="zevric-platform__visual">
              <img src={assets.edgeFlex} alt="Zevric Compact Edge System with industrial connectivity" loading="lazy" decoding="async" />
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

      <section className="section zevric-product-bridge">
        <div className="site-container zevric-product-bridge__inner">
          <div className="zevric-product-bridge__copy edge-surface-motif edge-surface-motif--contour">
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

export function ServersPage() {
  return (
    <div className="site-page server-page">
      <ProductStoryHero
        slides={serverPlatformViews.map(([navigationLabel, image, imageAlt]) => ({ navigationLabel, image, imageAlt, fit: 'contain' }))}
        title="AI Datacenter Servers"
        body="RS240 2U dual-socket platform with Intel® Xeon® 6700 or 6500 Series processors, up to 8 TB DDR5 and six front-bay profiles."
        className="server-product-hero"
        autoAdvanceMs={AUTO_CAROUSEL_INTERVAL}
        primaryAction={{ label: 'View RS240 specifications', to: '/products/servers#technical-specifications' }}
        secondaryAction={{ label: 'Define a server configuration', to: '/contact' }}
      />
      <ProductHighlights items={[
        ['Compute', 'Dual Intel® Xeon® 6700 or 6500 Series'],
        ['Memory', '32 DIMMs, up to 8 TB DDR5'],
        ['Storage', 'Up to 24 drive bays'],
        ['Power', '3000 W redundant 1+1 Titanium'],
      ]} />
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
      <section className="section camera-specifications server-specifications" id="technical-specifications">
        <div className="site-container">
          <SectionIntro title="RS240 specifications" body="Published RS240 platform specifications." light />
          <ServerSpecificationTable />
          <p className="content-qualifier">Images are illustrative. Final configuration, availability, lead time and certification scope are confirmed with ZMD.</p>
        </div>
      </section>
      <section className="section camera-applications surface-band surface-band--neutral" id="server-applications">
        <div className="site-container">
          <SectionIntro title="Workload areas" />
          <ProductApplicationCards items={serverApplications} />
          <div className="section-action"><ArrowButton to="/solutions" secondary>View solution areas</ArrowButton></div>
        </div>
      </section>
      <OEMEngagement
        title="Configure AI Datacenter Servers for your portfolio"
        body="Share workload, facility, branding and supply requirements for an RS240 configuration."
        action="Start a server enquiry"
      />
    </div>
  );
}

export function CustomIoTPage() {
  return (
    <div className="site-page custom-iot-page">
      <ProductStoryHero
        slides={[
          { navigationLabel: 'Safety Band', image: assets.safetyBandContext, imageAlt: 'Industrial worker wearing an illustrative ZMD Safety Band', caption: 'Safety Band configuration' },
          { navigationLabel: 'Parking Sensor', image: assets.parkingSensorContextV2, imageAlt: 'ZMD Parking Sensor installed near a parked vehicle', caption: 'Parking Sensor configuration' },
        ]}
        title="Custom IoT Products"
        body="Available Safety Band and Parking Sensor products, plus custom sensing-hardware programs for OEM portfolios."
        className="iot-product-hero"
        autoAdvanceMs={AUTO_CAROUSEL_INTERVAL}
        primaryAction={{ label: 'View products', to: '/products/custom-iot#available-products' }}
        secondaryAction={{ label: 'Discuss an IoT product', to: '/contact' }}
      />
      <ProductHighlights items={[
        ['Safety Band', 'Environmental and wearable sensing'],
        ['Safety', 'Fall detection and SOS'],
        ['Parking Sensor', 'Magnetometer occupancy detection'],
        ['Supply', 'Standard, branded or custom configurations'],
      ]} />

      <section className="section section--paper camera-models surface-band surface-band--neutral" id="available-products">
        <div className="site-container">
          <SectionIntro title="Available products" />
          <div className="camera-model-grid custom-iot-model-grid">
            {customIotProducts.map((product) => (
              <article className="camera-model-card custom-iot-model-card" id={product.slug} key={product.slug}>
                <div className="camera-model-card__visual">
                  {product.image
                    ? <img src={product.image} alt={product.imageAlt} loading="lazy" decoding="async" />
                    : <CustomIoTVisual type={product.visual} />}
                </div>
                <div className="camera-model-card__body">
                  <div className="camera-model-card__meta"><strong>{product.category}</strong></div>
                  <h3>{product.name}</h3>
                  <p>{product.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section camera-specifications iot-specifications" id="technical-specifications">
        <div className="site-container">
          <SectionIntro title="Technical specifications" light />
          <IoTSpecificationTable />
          <p className="content-qualifier">Final component selection, software integration, certification scope and availability are confirmed with ZMD.</p>
        </div>
      </section>

      <section className="section camera-applications surface-band surface-band--neutral" id="iot-applications">
        <div className="site-container">
          <SectionIntro title="Application areas" />
          <ProductApplicationCards items={iotApplications} />
          <div className="section-action"><ArrowButton to="/solutions" secondary>View solution areas</ArrowButton></div>
        </div>
      </section>
      <OEMEngagement
        title="Add Custom IoT Products to your portfolio"
        body="Discuss standard, branded or custom Safety Band and Parking Sensor configurations with ZMD."
        action="Start an IoT enquiry"
      />
    </div>
  );
}

export function EdgeAIPage() {
  return (
    <div className="site-page edge-ai-page-new">
      <ZevricHero page="edge-ai" />

      <section className="edge-ai-principles edge-surface-motif edge-surface-motif--technical" aria-labelledby="why-edge-title">
        <div className="site-container">
          <h2 id="why-edge-title">Why process locally</h2>
          <div className="edge-ai-principles__grid">
            <div><span>01</span><strong>Local response</strong><small>Configured inference can run on site without sending every input to a remote service.</small></div>
            <div><span>02</span><strong>Selective data transfer</strong><small>Process video and sensor data on site, then send selected results upstream.</small></div>
            <div><span>03</span><strong>Data control</strong><small>Keep sensitive data on site when policy requires it.</small></div>
            <div><span>04</span><strong>Operational continuity</strong><small>Configured workloads can continue locally when upstream connectivity is unavailable.</small></div>
          </div>
        </div>
      </section>

      <section className="section edge-ai-architecture edge-surface-motif edge-surface-motif--blueprint" id="architecture">
        <div className="site-container">
          <SectionIntro
            title="An open Edge AI architecture"
            body="Zevric provides local compute while customers and integrators select the models, applications and workflows."
            light
          />
          <ArchitectureStory
            groups={edgeAIArchitecture}
            variant="edge"
            optionalLayer={{
              label: 'Optional datacenter compute',
              detail: 'AI Datacenter Servers for storage, multi-site or centralized processing.',
              image: assets.ecosystemInfrastructure,
              imageAlt: 'ZMD AI Datacenter Servers for optional centralized processing',
            }}
          />
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

export function SolutionsPage() {
  return (
    <div className="site-page solutions-page">
      <PageHero
        title="Physical AI applications using ZMD hardware"
        body="ZMD builds the sensing and compute hardware. Customers and integrators add the software, integrations and operational systems required for each deployment."
        image={assets.solutionsHero}
        imageAlt="ZMD hardware connected to manufacturing, security, logistics and enterprise environments"
        dark
      >
        <ArrowButton to="/solutions#solution-areas">Explore applications</ArrowButton>
      </PageHero>
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
      <SharedSolutionArchitecture />
      {solutions.map((solution, index) => <SolutionSection solution={solution} index={index} key={solution.slug} />)}
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

export function CompanyPage() {
  return (
    <div className="site-page about-page">
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
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

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

      <section className="section section--paper surface-band surface-band--neutral" id="locations">
        <div className="site-container">
          <h2 className="section-heading">Locations</h2>
          <OfficeGrid />
        </div>
      </section>
    </div>
  );
}

export function ContactPage() {
  return (
    <div className="site-page contact-page">
      <section className="contact-hero surface-band surface-band--ink">
        <div className="contact-hero__grid" aria-hidden="true" />
        <div className="site-container contact-hero__inner">
          <div>
            <h1 tabIndex="-1">Discuss ZMD hardware for your portfolio or deployment</h1>
          </div>
          <div className="contact-panel">
            <span className="micro-label">Sales enquiries</span>
            <a className="contact-panel__primary" href={`mailto:${contact.email}`}>{contact.email} <span aria-hidden="true">↗</span></a>
            <a className="contact-panel__primary" href={`tel:${contact.phoneHref}`}>{contact.phone} <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>
      <section className="section section--paper surface-transition surface-transition--light surface-band surface-band--neutral">
        <div className="site-container split-heading">
          <SectionIntro title="Enquiry types" />
          <div className="application-list">
            {[
              'Source white-label hardware for an OEM portfolio',
              'Select Cameras, Compact Edge Systems, AI Datacenter Servers or Custom IoT Products',
              'Discuss distribution and systems-integration requirements',
              'Plan a solution-partner-led deployment',
            ].map((label) => <div key={label}><strong>{label}</strong></div>)}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="site-container">
          <h2 className="section-heading">Locations</h2>
          <OfficeGrid contactPage />
        </div>
      </section>
    </div>
  );
}

export function NotFoundPage() {
  return (
    <div className="site-page not-found-page">
      <div className="site-container">
        <span className="not-found-page__number">404</span>
        <h1 tabIndex="-1">This page is outside the current product map.</h1>
        <div><ArrowButton to="/">Return home</ArrowButton><ArrowButton to="/products" secondary>Explore products</ArrowButton></div>
      </div>
    </div>
  );
}
