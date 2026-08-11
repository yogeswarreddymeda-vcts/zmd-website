/* eslint-disable react/only-export-components -- shared page data, helpers, and reusable JSX intentionally live together */
import React from 'react';
import { Link } from 'react-router-dom';
import edgeAIHeroImage from '../assets/images/edge-ai/heroimage_ai.png';
import {
  assets,
  cameraProducts,
  contact,
  customIotProducts,
  edgeProducts,
  solutions,
} from '../data/site_data';
import {
  ArchitectureStory,
  CarouselControls,
  CustomIoTVisual,
  PageHero,
  PhysicalAIStory,
  ProductStoryHero,
  SectionIntro,
  SolutionCard,
} from '../components/sections/site_sections';

export {
  assets, cameraProducts, contact, customIotProducts, edgeProducts, solutions,
  ArchitectureStory, CarouselControls, CustomIoTVisual, PageHero, PhysicalAIStory,
  ProductStoryHero, SectionIntro, SolutionCard,
};

export function keepFinalSectionVisibleAtPageEnd(element, pageRoot) {
  const finalSection = [...pageRoot.children].reverse().find((child) => child.tagName === 'SECTION');
  if (!finalSection?.contains(element)) return false;

  const pageHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
  return Math.ceil(window.scrollY + window.innerHeight) >= pageHeight - 8;
}

export function ArrowButton({ to, children, secondary = false, light = false }) {
  const variant = light ? 'button--light' : secondary ? 'button--secondary' : 'button--primary';
  return <Link className={`button ${variant}`} to={to}>{children} <span aria-hidden="true">→</span></Link>;
}

export function ZevricHero({ page }) {
  const isProductPage = page === 'product';
  const title = isProductPage
    ? 'Zevric Compact Edge Systems'
    : 'Local AI processing on Zevric';
  const body = isProductPage
    ? 'Select processor, cooling and accelerator options on a shared Mini-ITX hardware platform.'
    : 'Zevric processes video and sensor data on site while customers and integrators choose the runtime, models, applications and workflows.';
  const heroImage = isProductPage ? assets.edgeHero : edgeAIHeroImage;
  const heroAlt = isProductPage
    ? 'Zevric Compact Edge System'
    : 'ZMD Zevric Compact Edge System in a precision electronics facility';

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
          {isProductPage && (
            <div className="zevric-shared-hero__processor">
              <img src={assets.intelCoreUltraBadges} alt="Intel Core Ultra 5, 7 and 9 processor badges" />
            </div>
          )}
          <img src={heroImage} alt={heroAlt} fetchPriority="high" />
        </div>
      </div>
    </section>
  );
}

export function OfficeGrid({ contactPage = false }) {
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

export const edgeAIApplications = [
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

export const edgeAIArchitecture = [
  {
    id: 'edge-ai-zmd-hardware',
    label: 'ZMD hardware',
    tone: 'zmd',
    to: '/products',
    action: 'View Products',
    ariaLabel: 'ZMD hardware layers for Edge AI deployments',
    stages: [
      {
        number: '01',
        name: 'Sense',
        detail: 'Cameras and Custom IoT Products',
        image: assets.homePhysicalAISense,
        imageAlt: 'ZMD cameras and sensing devices',
      },
      {
        number: '02',
        name: 'Local compute',
        detail: 'Compact Edge Systems',
        image: assets.homePhysicalAILocalCompute,
        imageAlt: 'Zevric Compact Edge System',
      },
      {
        number: '03',
        name: 'Datacenter compute',
        detail: 'AI Datacenter Servers when required',
        image: assets.homePhysicalAIDatacenterCompute,
        imageAlt: 'ZMD AI Datacenter Server infrastructure',
      },
    ],
  },
  {
    id: 'edge-ai-solution-stack',
    label: 'Your solution stack',
    tone: 'open',
    emphasis: true,
    to: '/solutions',
    action: 'Explore Solutions',
    ariaLabel: 'Customer or integrator application and operational layers',
    stages: [
      {
        number: '04',
        name: 'Intelligent applications',
        detail: 'Customer or integrator platform',
        image: assets.homePhysicalAIApplications,
        imageAlt: 'Applications and integrations selected by a customer or integrator',
      },
      {
        number: '05',
        name: 'Connected operations',
        detail: 'Alerts, workflows and customer systems',
        image: assets.homePhysicalAIOperations,
        imageAlt: 'Customer operations and connected workflows',
      },
    ],
  },
];

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

export const zevricHeroSlides = [
  {
    navigationLabel: 'Front view',
    image: assets.edgeHeroFrontStudio,
    imageAlt: 'Front view of a Zevric Compact Edge System in a dark studio environment',
    caption: 'Zevric Compact Edge System / front view',
    visualTone: 'studio-dark',
  },
  {
    navigationLabel: 'Rear connectivity',
    image: assets.edgeHeroRearStudio,
    imageAlt: 'Rear connectivity view of a Zevric Compact Edge System in a dark studio environment',
    caption: 'Zevric Compact Edge System / rear connectivity',
    visualTone: 'studio-dark',
  },
];

export const AUTO_CAROUSEL_INTERVAL = 5200;
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
    title: 'Panoramic cameras for wide-area visibility',
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

export const iotSpecificationGroups = [
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

export const iotApplications = [
  ['Workforce monitoring', assets.industrialAISolution, 'Connected workforce operating in an industrial environment'],
  ['Parking occupancy', assets.parkingSensorContext, 'Parking facility monitored by occupancy sensors'],
  ['Campuses and industrial sites', assets.homeIotIndustrial, 'Connected sensing hardware in an industrial site'],
  ['Commercial and public infrastructure', assets.physicalAIHardwareScene, 'Connected hardware deployed across physical infrastructure'],
];

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



export function ProductHighlights({ items, qualifier }) {
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

export function OEMEngagement({ title, body, action = 'Partner with ZMD' }) {
  return (
    <section className="section product-oem-engagement surface-band surface-band--ink">
      <div className="site-container product-oem-engagement__inner">
        <div><h2>{title}</h2><p>{body}</p></div>
        <ArrowButton to="/contact" light>{action}</ArrowButton>
      </div>
    </section>
  );
}



export function CameraModelCard({ product }) {
  return (
    <article
      className={`camera-model-card ${product.availabilityLabel ? 'camera-model-card--availability' : ''}`}
      tabIndex={product.availabilityLabel ? 0 : undefined}
    >
      <div className="camera-model-card__visual">
        <img src={product.image} alt={product.imageAlt} loading="lazy" decoding="async" />
        {product.availabilityLabel && <span className="camera-model-card__availability">{product.availabilityLabel}</span>}
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

export function IoTSpecificationTable() {
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

export function ProductApplicationCards({ items }) {
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
