import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import heroSectionGraphic from '../assets/images/edge/herosectionedgeai.webp';
import imgSmall from '../assets/images/edge/edge_box_small.webp';
import imgPro from '../assets/images/edge/edge_box_pro.webp';
import imgFlex from '../assets/images/edge/edge_box_flex.webp';
import imgUltra from '../assets/images/edge/edge_box_ultra.webp';
import '../assets/css/edge_ai.css';

export default function EdgeAIPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const systems = {
    small: {
      tag: 'SMALL',
      name: 'ZMD Edge Box',
      image: imgSmall,
      desc: 'Compact & ready for any task — Intel Core i5-1240P, up to 64GB DDR5, 2TB NVMe'
    },
    medium: {
      tag: 'MEDIUM',
      name: 'Edge Box Pro',
      image: imgPro,
      desc: 'Built for demanding workloads — Intel Core i7-13700H, up to 64GB DDR5, 4TB NVMe'
    },
    large: {
      tag: 'LARGE',
      name: 'Edge Box Flex',
      image: imgFlex,
      desc: 'Great value, big impact — Intel N100 / i3-N305, up to 16GB DDR5, 1TB NVMe'
    },
    extraLarge: {
      tag: 'EXTRA LARGE',
      name: 'Edge Box Ultra',
      image: imgUltra,
      desc: 'Engineered for extreme environments — Ultra Rugged, Intel Core i9-13900E, up to 4TB NVMe'
    }
  };

  const useCasesData = [
    {
      id: 'airports',
      number: '01',
      title: 'Airports',
      hook: 'An airport is the most instrumented building you own. Most of it is unwatched.',
      metrics: ['On-Time Performance', 'Queue Wait SLA', 'PAX Throughput', 'Retail Revenue/sq ft', 'Aircraft Turnaround'],
      capabilities: [
        'Predictive queue management — wait times measured at touchpoints, breaches predicted 15m ahead',
        'Retail & F&B leakage recovery — camera-verified transactions against POS',
        'Landside & parking enforcement — automated violation detection and dispatch',
        'Turnaround & flight operations fusion — stand cameras timing every ground event'
      ],
      description: "ApexFlo fuses the CCTV an airport already owns with flight, baggage, and passenger systems into one predictive operations centre. Security and check-in queues — the airport's most public failure point — are measured continuously, with breaches predicted before they happen.",
      hardwareTitle: 'Predictive Queue SLA',
      hardwareDesc: 'Reuses existing airport CCTV wherever it meets resolution requirements; edge nodes process 30–40 camera streams per box in the server room. Live in 4 weeks on CCTV + flight schedule alone.',
      hardwareModels: [systems.medium, systems.large, systems.extraLarge]
    },
    {
      id: 'cities',
      number: '02',
      title: 'Cities',
      hook: 'The city bought ten thousand cameras. It got ten thousand recordings.',
      metrics: ['Junction Delay', 'Challan Sustainment Rate', 'Incident Response Time', 'Grievance Closure Time', 'Monsoon Readiness'],
      capabilities: [
        'Corridor congestion prediction with signal retiming recommendations',
        'Court-ready enforcement evidence — ANPR, red-light, and lane-violation packs',
        'Incident detection & dispatch — accidents and obstructions flagged automatically',
        'Civic operations — waterlogging alerts, encroachment tracking, contractor SLA scoring'
      ],
      description: "ApexFlo turns the camera estate and traffic systems a city already owns into an intelligence layer that predicts junction breakdowns before they form, assembles evidence packs a magistrate will sustain, and pages the pump crew before an underpass floods.",
      hardwareTitle: 'Corridor Congestion + Enforcement',
      hardwareDesc: 'Reuses the VMS wherever it speaks ONVIF/RTSP; junction-cabinet edge nodes are ruggedized for outdoor deployment. Live in 4 weeks on one corridor of existing cameras, read-only.',
      hardwareModels: [systems.large, systems.extraLarge]
    },
    {
      id: 'hospitals',
      number: '03',
      title: 'Hospitals',
      hook: 'The EMR knows the timestamps. Nobody knows the floor.',
      metrics: ['Bed Turnover Interval', 'ED Wait + LWBS', 'OT Utilization', 'Average Length of Stay', 'Claim Cycle Time'],
      capabilities: [
        'ED flow prediction — surge forecasting and fast-track recommendations',
        'Real-time bed management — housekeeping dispatched the instant a bed is vacated',
        'Patient safety — fall detection, prolonged inactivity alerts, virtual observation',
        'Equipment tracking — RFID/BLE location for pumps, wheelchairs, monitors'
      ],
      description: "ApexFlo fuses hospital CCTV, RFID, and patient monitors with the HIS the hospital already runs, turning them into one operations centre that sees the physical truth behind the electronic record. Beds are dispatched for cleaning the moment they're vacated, ED surges predicted 30m ahead.",
      hardwareTitle: 'ED Flow + Bed Turnover',
      hardwareDesc: 'Runs on existing CCTV; staged rollout with cameras only in week one, ADT feed integration by week two. Pilot scoped to one department.',
      hardwareModels: [systems.small, systems.medium, systems.large]
    },
    {
      id: 'retail',
      number: '04',
      title: 'Retail',
      hook: 'The brand pays for the shelf. Nobody watches the shelf.',
      metrics: ['On-Shelf Availability %', 'Share of Shelf', 'Audit Cost per Store', 'Billing Leakage', 'Queue Abandonment'],
      capabilities: [
        'Shelf availability monitoring — stock-outs detected within the hour',
        'Planogram & share-of-shelf compliance with photo evidence',
        'Billing leakage detection — POS cross-referenced against camera',
        'Checkout queue management and footfall conversion analytics'
      ],
      description: "A single ZMD shelf camera per priority aisle turns the monthly audit van into a live dashboard: stock-outs become distributor orders within the hour, planogram compliance is scored continuously with photo evidence, and billing leakage becomes a recovery case with clip attached.",
      hardwareTitle: 'On-Shelf Availability',
      hardwareDesc: 'Purpose-built shelf camera: wide field of view, on-device inference, 4G connectivity, zero-touch enrollment. Pilot: 50 instrumented stores vs. matched controls.',
      hardwareModels: [systems.small, systems.medium]
    },
    {
      id: 'agritech',
      number: '05',
      title: 'Agritech',
      hook: 'The farmer walks the field once a day. The disease does not wait.',
      metrics: ['Yield per Acre', 'Input Cost per Acre', 'Water per Tonne', 'Loss Events Caught Early', 'Advisory Adoption'],
      capabilities: [
        'Daily vigor mapping via multispectral imagery (NDVI-based)',
        'Early pest & disease detection with photo-evidenced advisories',
        'Soil & nutrition monitoring — NPK, pH, moisture from in-field probes',
        'Irrigation automation — policy-gated valve/pump triggers logged per zone'
      ],
      description: "One elevated solar-powered camera and a handful of soil probes give a field eyes and a nervous system: daily vigor maps, first-detection pest and disease alerts, and moisture readings turned into irrigation triggers — every advisory backed by a photo and a reading.",
      hardwareTitle: 'ZMD Field Kit',
      hardwareDesc: 'One elevated multispectral camera per 10-acre plot, 5–10 soil probes, solar gateway with IP67 rugged housing. Runs 24/7 off-grid. Pilot live in 4 weeks, advisory-only.',
      hardwareModels: [systems.small, systems.extraLarge]
    },
    {
      id: 'cinemas',
      number: '06',
      title: 'Cinemas',
      hook: 'The interval is scheduled demand. The cinema still gets surprised by it.',
      metrics: ['Turnaround Minutes', 'F&B Spend per Head', 'Queue Abandonment', 'Shows per Screen per Day', 'Energy per Show'],
      capabilities: [
        'Interval readiness — concession staffing triggered before doors open',
        'Auditorium turnaround clock — housekeeping dispatched the moment credits roll',
        'F&B reconciliation against POS with evidence-backed leakage cases',
        'Lobby flow, entry, and parking exit-surge management'
      ],
      description: "ApexFlo fuses the cameras a multiplex already has with its ticketing and POS systems, turning scheduled showtimes into scheduled response: concession staffing fires before the popcorn queue breaks, housekeeping is dispatched the instant a hall empties.",
      hardwareTitle: 'Interval Readiness + Turnaround Clock',
      hardwareDesc: 'One edge box per property processing 30–40 streams; reuses existing property CCTV. Live in 4 weeks on existing cameras + showtime feed, one property.',
      hardwareModels: [systems.small, systems.medium]
    },
    {
      id: 'venues',
      number: '07',
      title: 'Venues & Campuses',
      hook: 'On the biggest day, the venue runs on walkie-talkies and luck.',
      metrics: ['Density SLA per Zone', 'Attraction Wait Visibility', 'Incident Response Time', 'Shuttle Wait', 'Per-Cap Spend'],
      capabilities: [
        'Continuous crowd density metering at gates, plazas, and attractions',
        'Live wait-time boards for every attraction and counter',
        'Shuttle & parking staging based on real-time demand forecasts',
        'Incident dispatch with location and clip, response fully timed'
      ],
      description: "ApexFlo turns a venue's existing camera estate into its nervous system: crowd density measured continuously at every gate and attraction, crush risk predicted before it forms, and shuttles staged to where the crowd will be — replacing 40 control room screens with one map.",
      hardwareTitle: 'Gate & Attraction Metering',
      hardwareDesc: 'Zone cabinets distributed across the estate, ruggedized for outdoor/monsoon conditions. Pilot on existing cameras at gates + top attractions, live in 4 weeks.',
      hardwareModels: [systems.medium, systems.large, systems.extraLarge]
    },
    {
      id: 'manufacturing',
      number: '08',
      title: 'Manufacturing',
      hook: 'The MES knows what the machines did. Nobody knows what the plant did.',
      metrics: ['Near-Miss Detection + Closure', 'Micro-Stop Minutes', 'First-Pass Yield', 'Dock Turnaround', 'Near-Miss Closure'],
      capabilities: [
        'Zone-level PPE & safety discipline scoring, anonymous by shift',
        'Line stoppage capture — micro-stops the MES never logs, with cause and clip',
        'Forklift-pedestrian near-miss heat-mapping',
        'Yard & gate sequencing — dock turnaround and demurrage prevention'
      ],
      description: "ApexFlo points a plant's existing cameras at the gap its systems can't see: the four-minute micro-stop, the PPE that came off at the hot station, the truck idling at the gate since lunch. Everything is zone-level, never worker-tracking.",
      hardwareTitle: 'Zone Safety + Stoppage Capture',
      hardwareDesc: 'Shop-floor cabinets rated for industrial dust/heat/vibration; camera-only start, no OT integration required for week one. Live in 4 weeks on one line + one gate.',
      hardwareModels: [systems.large, systems.extraLarge]
    },
    {
      id: 'education',
      number: '09',
      title: 'Education',
      hook: 'The lecture happens once. Then it disappears.',
      metrics: ['Faculty Prep Hours Saved', 'Doubt-Resolution Latency', 'Space Utilization %', 'Lab Safety Compliance', 'Admissions Cycle Time'],
      capabilities: [
        'Automated lecture capture, transcription, and regional-language summaries',
        '24/7 course-grounded TA agent — every answer cited from actual course material',
        'Campus space utilization — classroom, library, and lab occupancy tracking',
        'Lab safety & PPE compliance monitoring with formative feedback'
      ],
      description: "ApexFlo captures every lecture, publishes searchable notes within the hour, and backs it with a 24/7 teaching-assistant agent that answers only from the course's own material — every reply cited, never a substitute for the instructor.",
      hardwareTitle: 'Lecture Capture + Course TA',
      hardwareDesc: 'Silent, discreet, tamper-evident classroom capture kits; reuses existing AV where present. Pilot: capture + TA agent in one department\'s classrooms, live in 4 weeks.',
      hardwareModels: [systems.small, systems.medium, systems.large]
    }
  ];

  const scrollToCard = (id) => {
    const el = document.getElementById(`usecase-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="edgeai-page">
      <section className="edge-hero">
        <div className="edge-hero__card">
          <div className="edge-hero__left">
            <div className="edge-hero__eyebrow-pill">
              + HARDWARE + SOFTWARE • BUILT FOR THE EDGE
            </div>

            <h1 className="edge-hero__title">
              Intelligence at the{' '}
              <span className="edge-hero__title-red">point of action.</span>
            </h1>

            <p className="edge-hero__desc">
              ZMD pairs purpose-built edge hardware with a lightweight software stack so predictive and generative AI can run where your data is created — on the floor, at the counter, in the field — not in a data center three hops away.
            </p>

            <div className="edge-hero__actions">
              <Link to="/contact" className="edge-hero__btn-primary">
                Explore Edge Systems
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <a href="#use-cases" className="edge-hero__btn-secondary">
                View 9 Use Cases
              </a>
            </div>

            <div className="edge-hero__divider"></div>

            <div className="edge-hero__stats">
              <div className="edge-hero__stat-item">
                <div className="edge-hero__stat-header">
                  <div className="edge-hero__stat-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="edge-hero__stat-val">30-40</span>
                </div>
                <p className="edge-hero__stat-label">Streams per Box</p>
              </div>

              <div className="edge-hero__stat-item">
                <div className="edge-hero__stat-header">
                  <div className="edge-hero__stat-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <span className="edge-hero__stat-val">&lt;50ms</span>
                </div>
                <p className="edge-hero__stat-label">Inference Latency</p>
              </div>

              <div className="edge-hero__stat-item">
                <div className="edge-hero__stat-header">
                  <div className="edge-hero__stat-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </div>
                  <span className="edge-hero__stat-val">4 Wks</span>
                </div>
                <p className="edge-hero__stat-label">Pilot to Live</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="edge-system">
        <div className="edge-system__container">
          <div className="edge-system__left">
            <div className="edge-system__image-card">
              <img
                src={imgPro}
                alt="ZMD Edge Box Pro"
                className="edge-system__img"
              />
            </div>

            <div className="edge-system__badges">
              <div className="edge-system__badge-item">
                <div className="edge-system__badge-icon">4G</div>
                <span className="edge-system__badge-label">LTE / 5G</span>
              </div>
              <div className="edge-system__badge-item">
                <div className="edge-system__badge-icon">25</div>
                <span className="edge-system__badge-label">2.5GbE</span>
              </div>
              <div className="edge-system__badge-item">
                <div className="edge-system__badge-icon">NV</div>
                <span className="edge-system__badge-label">NVMe</span>
              </div>
              <div className="edge-system__badge-item">
                <div className="edge-system__badge-icon">TC</div>
                <span className="edge-system__badge-label">Thunderbolt™ C</span>
              </div>
            </div>
          </div>

          <div className="edge-system__right">
            <div className="edge-system__eyebrow-pill">MEET THE EDGE BOX</div>
            <h2 className="edge-system__title">
              Our first shipping edge AI system
            </h2>
            <p className="edge-system__desc">
              Compact, silent, and fanless. Sized to fit a server rack, a security closet, or a junction cabinet. Processes 30 to 40 CCTV streams in real time on 15–45W of power — no cloud connection required.
            </p>
            <div className="edge-system__table-wrap">
              <table className="edge-system__table">
                <thead>
                  <tr>
                    <th>Specification</th>
                    <th>ZMD Edge Box Base Model</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="edge-system__spec-name">Processor</td>
                    <td className="edge-system__spec-val">Intel® Core™ i5-1240P / i7-13700H</td>
                  </tr>
                  <tr>
                    <td className="edge-system__spec-name">AI Accelerator</td>
                    <td className="edge-system__spec-val">Integrated Iris Xe / Discrete NPU option</td>
                  </tr>
                  <tr>
                    <td className="edge-system__spec-name">Memory</td>
                    <td className="edge-system__spec-val">Up to 64GB DDR5 (SO-DIMM)</td>
                  </tr>
                  <tr>
                    <td className="edge-system__spec-name">Storage</td>
                    <td className="edge-system__spec-val">Up to 4TB M.2 NVMe SSD</td>
                  </tr>
                  <tr>
                    <td className="edge-system__spec-name">Networking</td>
                    <td className="edge-system__spec-val">2x 2.5GbE LAN, Wi-Fi 6E, optional 4G/5G module</td>
                  </tr>
                  <tr>
                    <td className="edge-system__spec-name">Form Factor</td>
                    <td className="edge-system__spec-val">Ultra-compact 0.8L fanless chassis</td>
                  </tr>
                </tbody>
              </table>
              <p className="edge-system__table-note">
                * Configurable options available for higher stream densities or extreme temperature ranges.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="ecosystem">
        <div className="head">
          <div className="eyebrow">THE EDGE AI STACK</div>
          <h1>Two halves, one runtime.</h1>
          <p>
            Hardware without models is an empty box. Models without hardware are a deck. ApexFlo is designed from the silicon up so every model runs at full throughput on the hardware in front of it.
          </p>
        </div>

        <div className="modules">
          <article className="module module--hw">
            <div className="module-art">
              <svg viewBox="0 0 280 154" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="30" width="240" height="94" rx="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5"/>
                <rect x="36" y="44" width="80" height="66" rx="4" fill="#F1F5F9" stroke="#CBD5E1"/>
                <rect x="46" y="54" width="60" height="46" rx="3" fill="#DC2626" opacity="0.12"/>
                <text x="76" y="80" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="11" fill="#DC2626">ZMD NPU</text>
                <rect x="130" y="44" width="114" height="12" rx="3" fill="#E2E8F0"/>
                <rect x="130" y="62" width="114" height="12" rx="3" fill="#E2E8F0"/>
                <rect x="130" y="80" width="80" height="12" rx="3" fill="#E2E8F0"/>
                <circle cx="230" cy="86" r="4" fill="#10B981"/>
                <circle cx="218" cy="86" r="4" fill="#DC2626"/>
              </svg>
            </div>
            <span className="module-tag">HARDWARE</span>
            <h2>Edge Hardware</h2>
            <p className="module-sub">A range of on-site compute devices — sized and rated for wherever they're deployed.</p>
            <p className="module-desc">It sits on-site next to the sensors and cameras, capturing data and running inference locally — so the system keeps working even when the network doesn't.</p>
          </article>

          <div className="connector">
            <div className="line"></div>
            <div className="pulse"></div>
            <div className="node">+</div>
          </div>

          <article className="module module--sw">
            <div className="module-art">
              <svg viewBox="0 0 280 154" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="20" width="240" height="114" rx="8" fill="#0F172A"/>
                <rect x="20" y="20" width="240" height="20" rx="8" fill="#1E293B"/>
                <circle cx="34" cy="30" r="3" fill="#EF4444" opacity="0.8"/>
                <circle cx="48" cy="30" r="3" fill="#F59E0B" opacity="0.8"/>
                <circle cx="62" cy="30" r="3" fill="#10B981" opacity="0.8"/>
                <text x="140" y="33.5" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="#94A3B8">inference.log</text>
                <rect x="40" y="50" width="70" height="4" rx="2" fill="#DC2626" opacity="0.9"/>
                <rect x="114" y="50" width="40" height="4" rx="2" fill="#334155"/>
                <rect x="40" y="60" width="46" height="4" rx="2" fill="#334155"/>
                <rect x="90" y="60" width="60" height="4" rx="2" fill="#F59E0B" opacity="0.85"/>
                <rect x="40" y="70" width="90" height="4" rx="2" fill="#334155"/>
                <polyline points="40,112 60,100 80,105 100,90 120,96 140,80 160,86 180,72 200,78 220,64 236,68"
                           fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <g fill="#DC2626">
                  <circle cx="140" cy="80" r="2.6"/>
                  <circle cx="220" cy="64" r="2.6"/>
                </g>
                <line x1="40" y1="118" x2="236" y2="118" stroke="#334155" strokeWidth="1"/>
                <text x="236" y="76" textAnchor="end" fontFamily="IBM Plex Mono, monospace" fontSize="8" fill="#DC2626" opacity="0.9">42ms</text>
              </svg>
            </div>
            <span className="module-tag">INTELLIGENCE</span>
            <h2>Intelligence Stack</h2>
            <p className="module-sub">A range of models — trained and compressed to run on that hardware.</p>
            <p className="module-desc">It takes what the hardware sees and turns it into a decision — a flaw flagged, a person detected, a fault predicted — computed on the device itself.</p>
          </article>
        </div>

        {/* BUS EQUALS CONNECTOR */}
        <div className="bus">
          <div className="bus-stem">
            <div className="pulse-v"></div>
          </div>
          <div className="bus-node">=</div>
          <div className="bus-stem-bottom"></div>
        </div>

        {/* SOLUTIONS RIBBON */}
        <div className="solutions-ribbon">
          <div className="solutions-ribbon__header">
            <span className="solutions-ribbon__tag">SOLUTIONS</span>
            <h3 className="solutions-ribbon__title">What they build together (9 Industry Use Cases)</h3>
          </div>

          <div className="solutions-ribbon__grid">
            {useCasesData.map((item) => (
              <div
                key={item.id}
                className="solutions-ribbon__item"
                onClick={() => scrollToCard(item.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') scrollToCard(item.id);
                }}
              >
                <div className="solutions-ribbon__num">{item.number}</div>
                <div className="solutions-ribbon__text">
                  <span className="solutions-ribbon__name">{item.title}</span>
                  <span className="solutions-ribbon__desc">{item.hardwareTitle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDGE AI USE CASES SHOWCASE (Supermicro Exact Reference Design) */}
      <section className="edge-usecases" id="use-cases">
        <div className="edge-usecases__container">
          <div className="edge-usecases__header">
            <span className="edge-usecases__eyebrow">
              + REAL-WORLD DEPLOYMENTS • 9 INDUSTRY STACKS
            </span>
            <h2 className="edge-usecases__title">
              Edge AI Use Cases Across Industries
            </h2>
            <p className="edge-usecases__subtitle">
              Leveraging predictive and generative AI to revolutionize enterprise operations at the edge — on-premises with zero cloud latency.
            </p>
          </div>

          {/* Stacked Showcase Cards with Real Hardware Carousel Images */}
          <div className="edge-usecases__stack">
            {useCasesData.map((item, idx) => (
              <UseCaseCardItem key={item.id} item={item} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* KEY FEATURES SECTION */}
      <section className="edge-features">
        <div className="edge-features__container">
          <span className="edge-features__eyebrow">KEY FEATURES</span>
          <h2 className="edge-features__title">What makes Edge Box run</h2>

          <div className="edge-features__grid">
            {/* Card 01 */}
            <div className="edge-features__card">
              <span className="edge-features__card-num">01</span>
              <h3 className="edge-features__card-title">Next-Gen Processing</h3>
              <p className="edge-features__card-desc">
                Core Ultra Series 2 285H SoC for heavy multi-tasking at the edge.
              </p>
            </div>

            {/* Card 02 */}
            <div className="edge-features__card">
              <span className="edge-features__card-num">02</span>
              <h3 className="edge-features__card-title">AI-Native Software</h3>
              <p className="edge-features__card-desc">
                Built-in NPU tuned for efficient, low-power AI inference.
              </p>
            </div>

            {/* Card 03 */}
            <div className="edge-features__card">
              <span className="edge-features__card-num">03</span>
              <h3 className="edge-features__card-title">Hyper Connectivity</h3>
              <p className="edge-features__card-desc">
                Dual LAN for redundant or separated internal/external networks.
              </p>
            </div>

            {/* Card 04 */}
            <div className="edge-features__card">
              <span className="edge-features__card-num">04</span>
              <h3 className="edge-features__card-title">Advanced Wireless</h3>
              <p className="edge-features__card-desc">
                Wi-Fi 7 and Bluetooth 5.4 built in for high-speed data transfer.
              </p>
            </div>

            {/* Card 05 */}
            <div className="edge-features__card">
              <span className="edge-features__card-num">05</span>
              <h3 className="edge-features__card-title">Visual Powerhouse</h3>
              <p className="edge-features__card-desc">
                Intel® Arc™ graphics drive displays up to 8K resolution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SOFTWARE / READY TO RUN SECTION */}
      <section className="edge-software">
        <div className="edge-software__container">
          {/* LEFT COLUMN */}
          <div className="edge-software__left">
            <span className="edge-software__eyebrow">Software</span>
            <h2 className="edge-software__title">Ready to run, out of the box</h2>
            <p className="edge-software__desc">
              Edge Box ships with the OS support and on-device intelligence needed to deploy models without extra middleware — and keeps working through outages, not just around them.
            </p>
          </div>

          {/* RIGHT COLUMN STACKED CARDS */}
          <div className="edge-software__right">
            {/* Card 1 */}
            <div className="edge-software__card">
              <h3 className="edge-software__card-title">AI-Native Inference (NPU)</h3>
              <p className="edge-software__card-desc">
                Built-in Intel® AI Boost NPU handles low-power, on-device inference for predictive and generative models alike.
              </p>
            </div>

            {/* Card 2 */}
            <div className="edge-software__card">
              <h3 className="edge-software__card-title">Multi-OS Support</h3>
              <p className="edge-software__card-desc">
                Runs Windows 11 or Linux distributions, so it slots into whatever stack your team already standardizes on.
              </p>
            </div>

            {/* Card 3 */}
            <div className="edge-software__card">
              <h3 className="edge-software__card-title">Reliable Offline Operation</h3>
              <p className="edge-software__card-desc">
                Operations don't stop when the internet does — Edge Box keeps running through network outages, syncing once connectivity returns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HARDWARE LINEUP SECTION */}
      <section className="edge-lineup">
        <div className="edge-lineup__container">
          <span className="edge-lineup__eyebrow">HARDWARE LINEUP</span>
          <h2 className="edge-lineup__title">Systems sized to the job</h2>
          <p className="edge-lineup__desc">
            Edge Box is the first system shipping in the ZMD edge AI line. Pro, Max, and Ultra are planned additions sized for heavier workloads.
          </p>

          {/* 4 CARDS GRID */}
          <div className="edge-lineup__grid">
            {/* Card 1: ZMD Edge Box */}
            <div className="edge-lineup__card">
              <span className="edge-lineup__badge">OUR BEST SELLER</span>
              <span className="edge-lineup__category">MINI PC</span>
              <h3 className="edge-lineup__card-title">ZMD Edge Box</h3>

              <div className="edge-lineup__img-wrap">
                <img src={imgSmall} alt="ZMD Edge Box" className="edge-lineup__img" />
              </div>

              <div className="edge-lineup__specs">
                <div className="edge-lineup__spec-row">
                  <span className="edge-lineup__spec-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" /></svg>
                  </span>
                  <span className="edge-lineup__spec-label">Processor</span>
                  <span className="edge-lineup__spec-value">Intel® Core™ i5-1240P</span>
                </div>
                <div className="edge-lineup__spec-row">
                  <span className="edge-lineup__spec-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><path d="M6 19v-3M10 19v-3M14 19v-3M18 19v-3M6 8V5M10 8V5M14 8V5M18 8V5" /><rect x="2" y="8" width="20" height="8" rx="1" /></svg>
                  </span>
                  <span className="edge-lineup__spec-label">Memory</span>
                  <span className="edge-lineup__spec-value">Up to 64GB DDR5</span>
                </div>
                <div className="edge-lineup__spec-row">
                  <span className="edge-lineup__spec-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="6" cy="12" r="1.5" /><path d="M12 12h6" /></svg>
                  </span>
                  <span className="edge-lineup__spec-label">Storage</span>
                  <span className="edge-lineup__spec-value">Up to 2TB NVMe</span>
                </div>
                <div className="edge-lineup__spec-row">
                  <span className="edge-lineup__spec-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><rect x="2" y="8" width="20" height="8" rx="2" /><path d="M6 12h.01M10 12h.01M14 12h.01M18 12h.01" /></svg>
                  </span>
                  <span className="edge-lineup__spec-label">Ports</span>
                  <span className="edge-lineup__spec-value">2x 2.5GbE, 4x USB 3.2</span>
                </div>
                <div className="edge-lineup__spec-row">
                  <span className="edge-lineup__spec-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>
                  </span>
                  <span className="edge-lineup__spec-label">Display</span>
                  <span className="edge-lineup__spec-value">4K / 8K Support</span>
                </div>
              </div>

              <div className="edge-lineup__action-link">
                <span>Compact and ready for any task</span>
                <span className="edge-lineup__arrow">→</span>
              </div>
            </div>

            {/* Card 2: Edge Box Pro */}
            <div className="edge-lineup__card">
              <span className="edge-lineup__badge">⚡ PERFORMANCE</span>
              <span className="edge-lineup__category">POWERED</span>
              <h3 className="edge-lineup__card-title">Edge Box Pro</h3>

              <div className="edge-lineup__img-wrap">
                <img src={imgPro} alt="Edge Box Pro" className="edge-lineup__img" />
              </div>

              <div className="edge-lineup__specs">
                <div className="edge-lineup__spec-row">
                  <span className="edge-lineup__spec-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" /></svg>
                  </span>
                  <span className="edge-lineup__spec-label">Processor</span>
                  <span className="edge-lineup__spec-value">Intel® i7-13700H</span>
                </div>
                <div className="edge-lineup__spec-row">
                  <span className="edge-lineup__spec-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><path d="M6 19v-3M10 19v-3M14 19v-3M18 19v-3M6 8V5M10 8V5M14 8V5M18 8V5" /><rect x="2" y="8" width="20" height="8" rx="1" /></svg>
                  </span>
                  <span className="edge-lineup__spec-label">Memory</span>
                  <span className="edge-lineup__spec-value">Up to 64GB DDR5</span>
                </div>
                <div className="edge-lineup__spec-row">
                  <span className="edge-lineup__spec-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="6" cy="12" r="1.5" /><path d="M12 12h6" /></svg>
                  </span>
                  <span className="edge-lineup__spec-label">Storage</span>
                  <span className="edge-lineup__spec-value">Up to 4TB NVMe</span>
                </div>
                <div className="edge-lineup__spec-row">
                  <span className="edge-lineup__spec-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><rect x="2" y="8" width="20" height="8" rx="2" /><path d="M6 12h.01M10 12h.01M14 12h.01M18 12h.01" /></svg>
                  </span>
                  <span className="edge-lineup__spec-label">Ports</span>
                  <span className="edge-lineup__spec-value">2x 2.5GbE, 6x USB 3.2</span>
                </div>
                <div className="edge-lineup__spec-row">
                  <span className="edge-lineup__spec-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>
                  </span>
                  <span className="edge-lineup__spec-label">Display</span>
                  <span className="edge-lineup__spec-value">8K Support</span>
                </div>
              </div>

              <div className="edge-lineup__action-link">
                <span>Built for demanding workloads</span>
                <span className="edge-lineup__arrow">→</span>
              </div>
            </div>

            {/* Card 3: Edge Box Flex */}
            <div className="edge-lineup__card">
              <span className="edge-lineup__badge">⚡ BALANCED</span>
              <span className="edge-lineup__category">VALUE</span>
              <h3 className="edge-lineup__card-title">Edge Box Flex</h3>

              <div className="edge-lineup__img-wrap">
                <img src={imgFlex} alt="Edge Box Flex" className="edge-lineup__img" />
              </div>

              <div className="edge-lineup__specs">
                <div className="edge-lineup__spec-row">
                  <span className="edge-lineup__spec-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" /></svg>
                  </span>
                  <span className="edge-lineup__spec-label">Processor</span>
                  <span className="edge-lineup__spec-value">Intel® N100 / i3-N305</span>
                </div>
                <div className="edge-lineup__spec-row">
                  <span className="edge-lineup__spec-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><path d="M6 19v-3M10 19v-3M14 19v-3M18 19v-3M6 8V5M10 8V5M14 8V5M18 8V5" /><rect x="2" y="8" width="20" height="8" rx="1" /></svg>
                  </span>
                  <span className="edge-lineup__spec-label">Memory</span>
                  <span className="edge-lineup__spec-value">Up to 16GB DDR5</span>
                </div>
                <div className="edge-lineup__spec-row">
                  <span className="edge-lineup__spec-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="6" cy="12" r="1.5" /><path d="M12 12h6" /></svg>
                  </span>
                  <span className="edge-lineup__spec-label">Storage</span>
                  <span className="edge-lineup__spec-value">Up to 1TB NVMe</span>
                </div>
                <div className="edge-lineup__spec-row">
                  <span className="edge-lineup__spec-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><rect x="2" y="8" width="20" height="8" rx="2" /><path d="M6 12h.01M10 12h.01M14 12h.01M18 12h.01" /></svg>
                  </span>
                  <span className="edge-lineup__spec-label">Ports</span>
                  <span className="edge-lineup__spec-value">1x 2.5GbE, 4x USB 3.2</span>
                </div>
                <div className="edge-lineup__spec-row">
                  <span className="edge-lineup__spec-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>
                  </span>
                  <span className="edge-lineup__spec-label">Display</span>
                  <span className="edge-lineup__spec-value">4K Support</span>
                </div>
              </div>

              <div className="edge-lineup__action-link">
                <span>Great value. Big impact.</span>
                <span className="edge-lineup__arrow">→</span>
              </div>
            </div>

            {/* Card 4: Edge Box Ultra */}
            <div className="edge-lineup__card">
              <span className="edge-lineup__badge">⚡ HIGH IMPACT</span>
              <span className="edge-lineup__category">ULTRA RUGGED</span>
              <h3 className="edge-lineup__card-title">Edge Box Ultra</h3>

              <div className="edge-lineup__img-wrap">
                <img src={imgUltra} alt="Edge Box Ultra" className="edge-lineup__img" />
              </div>

              <div className="edge-lineup__specs">
                <div className="edge-lineup__spec-row">
                  <span className="edge-lineup__spec-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" /></svg>
                  </span>
                  <span className="edge-lineup__spec-label">Processor</span>
                  <span className="edge-lineup__spec-value">Intel® Core™ i9-13900E</span>
                </div>
                <div className="edge-lineup__spec-row">
                  <span className="edge-lineup__spec-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><path d="M6 19v-3M10 19v-3M14 19v-3M18 19v-3M6 8V5M10 8V5M14 8V5M18 8V5" /><rect x="2" y="8" width="20" height="8" rx="1" /></svg>
                  </span>
                  <span className="edge-lineup__spec-label">Memory</span>
                  <span className="edge-lineup__spec-value">Up to 64GB DDR5</span>
                </div>
                <div className="edge-lineup__spec-row">
                  <span className="edge-lineup__spec-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="6" cy="12" r="1.5" /><path d="M12 12h6" /></svg>
                  </span>
                  <span className="edge-lineup__spec-label">Storage</span>
                  <span className="edge-lineup__spec-value">Up to 4TB NVMe</span>
                </div>
                <div className="edge-lineup__spec-row">
                  <span className="edge-lineup__spec-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><rect x="2" y="8" width="20" height="8" rx="2" /><path d="M6 12h.01M10 12h.01M14 12h.01M18 12h.01" /></svg>
                  </span>
                  <span className="edge-lineup__spec-label">Ports</span>
                  <span className="edge-lineup__spec-value">3x 2.5GbE, 6x USB 3.2</span>
                </div>
                <div className="edge-lineup__spec-row">
                  <span className="edge-lineup__spec-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>
                  </span>
                  <span className="edge-lineup__spec-label">Display</span>
                  <span className="edge-lineup__spec-value">4K / 8K Support</span>
                </div>
              </div>

              <div className="edge-lineup__action-link">
                <span>Engineered for extreme environments</span>
                <span className="edge-lineup__arrow">→</span>
              </div>
            </div>
          </div>

          {/* BOTTOM DISCLAIMER BANNER */}
          <div className="edge-lineup__banner">
            <p>
              Edge Box (Small) ships with the specifications validated above. Pro, Max, and Ultra variants are planned additions to the same line and are in active development — specifications shown are directional and subject to change until finalized.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function UseCaseCardItem({ item, idx }) {
  const [activeHwIdx, setActiveHwIdx] = useState(0);

  const currentHw = item.hardwareModels ? (item.hardwareModels[activeHwIdx] || item.hardwareModels[0]) : null;

  const handlePrev = () => {
    if (!item.hardwareModels) return;
    setActiveHwIdx((prev) => (prev === 0 ? item.hardwareModels.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (!item.hardwareModels) return;
    setActiveHwIdx((prev) => (prev === item.hardwareModels.length - 1 ? 0 : prev + 1));
  };

  return (
    <article
      id={`usecase-${item.id}`}
      className={`sm-usecase-card ${idx % 2 === 0 ? 'sm-usecase-card--left' : 'sm-usecase-card--right'}`}
    >
      {/* LEFT COLUMN: Title, Hook, Capabilities, Description, Action Button */}
      <div className="sm-usecase-card__left">
        <h3 className="sm-usecase-card__title">{item.title}</h3>
        <p className="sm-usecase-card__hook">"{item.hook}"</p>

        <ul className="sm-usecase-card__capabilities">
          {item.capabilities.map((cap, capIdx) => (
            <li key={capIdx} className="sm-usecase-card__capability-item">
              <span className="sm-usecase-card__bullet"></span>
              <span>{cap}</span>
            </li>
          ))}
        </ul>

        <p className="sm-usecase-card__desc">{item.description}</p>

        <button type="button" className="sm-usecase-card__btn-main">
          Learn More About {item.title} Solutions
        </button>
      </div>

      {/* MIDDLE VERTICAL DIVIDER */}
      <div className="sm-usecase-card__divider"></div>

      {/* RIGHT COLUMN: System Spotlight Carousel Box */}
      <div className="sm-usecase-card__right">
        <div className="sm-usecase-card__hardware-display">
          {item.hardwareModels && item.hardwareModels.length > 1 && (
            <button
              type="button"
              className="sm-usecase-card__arrow-btn"
              onClick={handlePrev}
              aria-label="Previous System"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}

          {/* Hardware Image Display Box */}
          {currentHw ? (
            <div className="sm-usecase-card__hw-img-wrap">
              <img
                src={currentHw.image}
                alt={currentHw.name}
                className="sm-usecase-card__hw-img"
              />
              <span className="sm-usecase-card__hw-tag">{currentHw.tag}</span>
            </div>
          ) : (
            <div className="sm-usecase-card__image-placeholder">
              <span className="sm-usecase-card__placeholder-text">{item.title} Image Space</span>
            </div>
          )}

          {item.hardwareModels && item.hardwareModels.length > 1 && (
            <button
              type="button"
              className="sm-usecase-card__arrow-btn"
              onClick={handleNext}
              aria-label="Next System"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}
        </div>

        <div className="sm-usecase-card__model-title">
          {currentHw ? currentHw.name : item.hardwareTitle}
        </div>

        <p className="sm-usecase-card__model-desc">
          {currentHw ? currentHw.desc : item.hardwareDesc}
        </p>

        <button type="button" className="sm-usecase-card__btn-sub">
          System Details
        </button>

        {item.hardwareModels && item.hardwareModels.length > 1 && (
          <div className="sm-usecase-card__dots">
            {item.hardwareModels.map((_, dotIdx) => (
              <span
                key={dotIdx}
                className={`sm-usecase-card__dot ${dotIdx === activeHwIdx ? 'sm-usecase-card__dot--active' : ''}`}
                onClick={() => setActiveHwIdx(dotIdx)}
              ></span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
