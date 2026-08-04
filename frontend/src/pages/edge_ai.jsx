import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import imgSmall from '../assets/images/edge/edge_box_small.webp';
import imgPro from '../assets/images/edge/edge_box_pro.webp';
import imgFlex from '../assets/images/edge/edge_box_flex.webp';
import imgUltra from '../assets/images/edge/edge_box_ultra.webp';
import '../assets/css/edge_ai.css';

export default function EdgeAIPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 150);
      }
    }
  }, [location.hash]);

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
      hook: 'Transforming unmonitored airport feeds into real-time operational intelligence.',
      metrics: ['On-Time Performance', 'Queue Wait SLA', 'PAX Throughput', 'Retail Revenue/sq ft', 'Aircraft Turnaround'],
      capabilities: [
        'Predictive queue management (15m breach alerts)',
        'Retail & F&B leakage recovery via POS cross-matching',
        'Automated landside & parking violation dispatch'
      ],
      description: "ZMD leverages ApexFlo data intelligence on Edge Box to process existing airport CCTV and flight streams locally with zero cloud latency.",
      hardwareTitle: 'Predictive Queue SLA',
      hardwareDesc: 'Reuses existing airport CCTV wherever it meets resolution requirements; edge nodes process 30–40 camera streams per box in the server room. Live in 4 weeks on CCTV + flight schedule alone.',
      hardwareModels: [systems.medium, systems.large, systems.extraLarge]
    },
    {
      id: 'cities',
      number: '02',
      title: 'Cities',
      hook: 'Converting city-wide video streams into proactive traffic & civic solutions.',
      metrics: ['Junction Delay', 'Challan Sustainment Rate', 'Incident Response Time', 'Grievance Closure Time', 'Monsoon Readiness'],
      capabilities: [
        'Junction congestion prediction & signal retiming',
        'Court-ready enforcement evidence (ANPR, Red-Light)',
        'Automated incident & waterlogging alerts'
      ],
      description: "ZMD utilizes ApexFlo analytics powered by Edge Box to turn city infrastructure data into real-time incident response.",
      hardwareTitle: 'Corridor Congestion + Enforcement',
      hardwareDesc: 'Reuses the VMS wherever it speaks ONVIF/RTSP; junction-cabinet edge nodes are ruggedized for outdoor deployment. Live in 4 weeks on one corridor of existing cameras, read-only.',
      hardwareModels: [systems.large, systems.extraLarge]
    },
    {
      id: 'hospitals',
      number: '03',
      title: 'Hospitals',
      hook: 'Closing the gap between digital records and physical hospital floor reality.',
      metrics: ['Bed Turnover Interval', 'ED Wait + LWBS', 'OT Utilization', 'Average Length of Stay', 'Claim Cycle Time'],
      capabilities: [
        'ED flow prediction & surge forecasting',
        'Instant bed turnover & housekeeping dispatch',
        'Patient safety & fall detection alerts'
      ],
      description: "ZMD deploys ApexFlo floor intelligence on Edge Box, combining HIS data and CCTV feeds for instant bed and patient management.",
      hardwareTitle: 'ED Flow + Bed Turnover',
      hardwareDesc: 'Runs on existing CCTV; staged rollout with cameras only in week one, ADT feed integration by week two. Pilot scoped to one department.',
      hardwareModels: [systems.small, systems.medium, systems.large]
    },
    {
      id: 'retail',
      number: '04',
      title: 'Retail',
      hook: 'Turning shelf cameras and store feeds into automated inventory action.',
      metrics: ['On-Shelf Availability %', 'Share of Shelf', 'Audit Cost per Store', 'Billing Leakage', 'Queue Abandonment'],
      capabilities: [
        'Hourly stock-out & shelf availability tracking',
        'Planogram compliance & share-of-shelf scoring',
        'POS billing leakage recovery'
      ],
      description: "ZMD combines ApexFlo vision AI with Edge Box hardware to monitor retail shelves and minimize revenue leakage on site.",
      hardwareTitle: 'On-Shelf Availability',
      hardwareDesc: 'Purpose-built shelf camera: wide field of view, on-device inference, 4G connectivity, zero-touch enrollment. Pilot: 50 instrumented stores vs. matched controls.',
      hardwareModels: [systems.small, systems.medium]
    },
    {
      id: 'agritech',
      number: '05',
      title: 'Agritech',
      hook: 'Providing 24/7 crop monitoring and early disease intervention.',
      metrics: ['Yield per Acre', 'Input Cost per Acre', 'Water per Tonne', 'Loss Events Caught Early', 'Advisory Adoption'],
      capabilities: [
        'Multispectral vigor & crop health mapping',
        'Early pest & disease photo advisories',
        'Automated soil & moisture irrigation triggers'
      ],
      description: "ZMD powers field kits with ApexFlo agricultural intelligence on Edge Box for off-grid crop and soil analytics.",
      hardwareTitle: 'ZMD Field Kit',
      hardwareDesc: 'One elevated multispectral camera per 10-acre plot, 5–10 soil probes, solar gateway with IP67 rugged housing. Runs 24/7 off-grid. Pilot live in 4 weeks, advisory-only.',
      hardwareModels: [systems.small, systems.extraLarge]
    },
    {
      id: 'cinemas',
      number: '06',
      title: 'Cinemas',
      hook: 'Predicting interval surges and accelerating auditorium turnarounds.',
      metrics: ['Turnaround Minutes', 'F&B Spend per Head', 'Queue Abandonment', 'Shows per Screen per Day', 'Energy per Show'],
      capabilities: [
        'Interval concession demand & staffing triggers',
        'Automated auditorium turnaround clock',
        'POS reconciliation & F&B leakage prevention'
      ],
      description: "ZMD integrates ApexFlo concession analytics into Edge Box to streamline cinema turnarounds and boost F&B revenues.",
      hardwareTitle: 'Interval Readiness + Turnaround Clock',
      hardwareDesc: 'One edge box per property processing 30–40 streams; reuses existing property CCTV. Live in 4 weeks on existing cameras + showtime feed, one property.',
      hardwareModels: [systems.small, systems.medium]
    },
    {
      id: 'venues',
      number: '07',
      title: 'Venues & Campuses',
      hook: 'Eliminating crowd bottlenecks with continuous estate metering.',
      metrics: ['Density SLA per Zone', 'Attraction Wait Visibility', 'Incident Response Time', 'Shuttle Wait', 'Per-Cap Spend'],
      capabilities: [
        'Real-time crowd density & gate metering',
        'Live attraction wait-time board automation',
        'Dynamic shuttle & parking demand staging'
      ],
      description: "ZMD applies ApexFlo spatial algorithms via Edge Box to manage crowd flow across large venues and university campuses.",
      hardwareTitle: 'Gate & Attraction Metering',
      hardwareDesc: 'Zone cabinets distributed across the estate, ruggedized for outdoor/monsoon conditions. Pilot on existing cameras at gates + top attractions, live in 4 weeks.',
      hardwareModels: [systems.medium, systems.large, systems.extraLarge]
    },
    {
      id: 'manufacturing',
      number: '08',
      title: 'Manufacturing',
      hook: 'Capturing line micro-stops and floor safety risks automatically.',
      metrics: ['Near-Miss Detection + Closure', 'Micro-Stop Minutes', 'First-Pass Yield', 'Dock Turnaround', 'Near-Miss Closure'],
      capabilities: [
        'Zone-level PPE & safety discipline scoring',
        'Micro-stoppage video capture & cause logging',
        'Forklift & pedestrian hazard detection'
      ],
      description: "ZMD harnesses ApexFlo plant intelligence on Edge Box to give operations teams instant visibility into factory floor disruptions.",
      hardwareTitle: 'Zone Safety + Stoppage Capture',
      hardwareDesc: 'Shop-floor cabinets rated for industrial dust/heat/vibration; camera-only start, no OT integration required for week one. Live in 4 weeks on one line + one gate.',
      hardwareModels: [systems.large, systems.extraLarge]
    },
    {
      id: 'education',
      number: '09',
      title: 'Education',
      hook: 'Automating classroom capture and intelligent student support.',
      metrics: ['Faculty Prep Hours Saved', 'Doubt-Resolution Latency', 'Space Utilization %', 'Lab Safety Compliance', 'Admissions Cycle Time'],
      capabilities: [
        'Automated lecture capture & transcription',
        '24/7 course-grounded AI teaching assistant',
        'Campus space & lab safety compliance'
      ],
      description: "ZMD uses ApexFlo academic software running on Edge Box to deliver instant course summaries and round-the-clock student assistance.",
      hardwareTitle: 'Lecture Capture + Course TA',
      hardwareDesc: 'Silent, discreet, tamper-evident classroom capture kits; reuses existing AV where present. Pilot: capture + TA agent in one department\'s classrooms, live in 4 weeks.',
      hardwareModels: [systems.small, systems.medium, systems.large]
    }
  ];

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
