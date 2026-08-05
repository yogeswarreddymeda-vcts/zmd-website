import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/home.css';

import hmService1 from '../assets-1/hm_service1.webp';
import hmService2 from '../assets-1/hm_service2.webp';
import hmService3 from '../assets-1/hm_service3.webp';
import hmService4 from '../assets-1/hm_service4.webp';
import aboutEdgeAiImg from '../assets-1/about-edge-ai-v2.webp';
import ecosystemSensorsImg from '../assets-1/ecosystem-sensors-transparent-v2.webp';
import ecosystemEdgeDeviceImg from '../assets-1/ecosystem-edge-device-transparent-v2.webp';
import ecosystemInfrastructureImg from '../assets-1/ecosystem-infrastructure-transparent-v2.webp';
import ecosystemModelsImg from '../assets-1/ecosystem-models-transparent-v2.webp';
import ecosystemApplicationsImg from '../assets-1/ecosystem-applications-transparent-v2.webp';
import heroFrame from '../assets/frame_sequence/frame_0145.webp';

function AboutIndustryIcon({ name }) {
  const iconProps = {
    width: 30,
    height: 30,
    viewBox: '0 0 32 32',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true
  };

  if (name === 'Smart Cities') {
    return (
      <svg {...iconProps}>
        <path d="M4 27V13h7v14M11 27V6h9v21M20 27V11h8v16M2 27h28" />
        <path d="M7 17h1M7 21h1M14 10h3M14 14h3M14 18h3M23 15h2M23 19h2" />
      </svg>
    );
  }

  if (name === 'Retail') {
    return (
      <svg {...iconProps}>
        <path d="M3 5h4l3 15h14l3-10H9" />
        <circle cx="12" cy="25" r="1.8" />
        <circle cx="23" cy="25" r="1.8" />
      </svg>
    );
  }

  if (name === 'Manufacturing') {
    return (
      <svg {...iconProps}>
        <path d="M5 27h22M9 27v-5h8v5M13 22v-6l5-4 3 3-4 5" />
        <circle cx="20" cy="10" r="3" />
        <path d="M22 8l3-3 3 3-4 4M25 12v5h4" />
      </svg>
    );
  }

  if (name === 'Transportation') {
    return (
      <svg {...iconProps}>
        <rect x="7" y="4" width="18" height="22" rx="4" />
        <path d="M10 8h12v8H10zM10 20h.01M22 20h.01M11 26l-2 3M21 26l2 3" />
      </svg>
    );
  }

  if (name === 'Security') {
    return (
      <svg {...iconProps}>
        <path d="M16 3l10 4v7c0 7-4.4 12-10 15C10.4 26 6 21 6 14V7l10-4z" />
        <path d="M11 15l3 3 7-7" />
      </svg>
    );
  }

  return (
    <svg {...iconProps}>
      <circle cx="16" cy="16" r="5" />
      <path d="M16 3v4M16 25v4M3 16h4M25 16h4M6.8 6.8l2.8 2.8M22.4 22.4l2.8 2.8M25.2 6.8l-2.8 2.8M9.6 22.4l-2.8 2.8" />
      <circle cx="16" cy="16" r="10" />
    </svg>
  );
}

function EcosystemStepIcon({ index }) {
  const iconProps = {
    width: 25,
    height: 25,
    viewBox: '0 0 32 32',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true
  };

  if (index === 0) {
    return (
      <svg {...iconProps}>
        <path d="M5 10h5l3-3h8l3 3h3v13H5z" />
        <circle cx="16" cy="16.5" r="5" />
        <circle cx="16" cy="16.5" r="1.5" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg {...iconProps}>
        <rect x="8" y="8" width="16" height="16" rx="2" />
        <rect x="12" y="12" width="8" height="8" rx="1" />
        <path d="M3 12h5M3 20h5M24 12h5M24 20h5M12 3v5M20 3v5M12 24v5M20 24v5" />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg {...iconProps}>
        <rect x="6" y="4" width="20" height="7" rx="2" />
        <rect x="6" y="13" width="20" height="7" rx="2" />
        <rect x="6" y="22" width="20" height="7" rx="2" />
        <path d="M10 7.5h.01M10 16.5h.01M10 25.5h.01M15 7.5h7M15 16.5h7M15 25.5h7" />
      </svg>
    );
  }

  if (index === 3) {
    return (
      <svg {...iconProps}>
        <path d="M13 5a5 5 0 0 0-7 6 5 5 0 0 0 0 10 5 5 0 0 0 7 6M19 5a5 5 0 0 1 7 6 5 5 0 0 1 0 10 5 5 0 0 1-7 6M13 5v22M19 5v22" />
        <path d="M9 11h4M19 11h4M9 21h4M19 21h4" />
      </svg>
    );
  }

  return (
    <svg {...iconProps}>
      <rect x="4" y="4" width="9" height="9" rx="2" />
      <rect x="19" y="4" width="9" height="9" rx="2" />
      <rect x="4" y="19" width="9" height="9" rx="2" />
      <rect x="19" y="19" width="9" height="9" rx="2" />
    </svg>
  );
}

export default function HomePage() {
  const heroRef = useRef(null);
  const [isHeroVisible, setIsHeroVisible] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsHeroVisible(entry.isIntersecting && entry.intersectionRatio > 0.12),
      { threshold: [0, 0.12, 0.3] },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // IntersectionObserver for scroll entrance animations across sections
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('hmpg-is-visible');
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-40px 0px -40px 0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const elements = document.querySelectorAll('.hmpg-reveal-on-scroll, .hmpg-scale-on-scroll, .hmpg-fade-left-scroll, .hmpg-fade-right-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      num: "01",
      code: "01 / SENSE",
      navLabel: "SENSORS & CAMERAS",
      title: "Sensors & Cameras",
      description: "Capture real-world data through intelligent vision and sensing systems.",
      image: ecosystemSensorsImg
    },
    {
      num: "02",
      code: "02 / PROCESS",
      navLabel: "EDGE DEVICES",
      title: "Edge Devices",
      description: "Process data at the source with low latency and high reliability.",
      image: ecosystemEdgeDeviceImg
    },
    {
      num: "03",
      code: "03 / SCALE",
      navLabel: "AI INFRASTRUCTURE",
      title: "AI Infrastructure",
      description: "Scalable GPU and server platforms for training and deployment.",
      image: ecosystemInfrastructureImg
    },
    {
      num: "04",
      code: "04 / LEARN",
      navLabel: "AI MODELS & ANALYTICS",
      title: "AI Models & Analytics",
      description: "Transform raw streams into actionable, contextual insight.",
      image: ecosystemModelsImg
    },
    {
      num: "05",
      code: "05 / DEPLOY",
      navLabel: "INDUSTRY APPLICATIONS",
      title: "Industry Applications",
      description: "Deploy intelligence across operations and infrastructure.",
      image: ecosystemApplicationsImg
    }
  ];

  const products = [
    {
      tag: "VISION",
      title: "Smart Cameras",
      description: "Advanced vision systems for surveillance, analytics, and intelligent monitoring.",
      big: true,
      link: "/products/cam",
      icon: (
        <svg className="hmpg-icon-camera" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle className="hmpg-cam-circle-1" cx="12" cy="12" r="9" />
          <circle className="hmpg-cam-circle-2" cx="12" cy="12" r="4" />
          <circle className="hmpg-cam-dot" cx="12" cy="12" r="1.5" fill="#e61919" stroke="none" />
        </svg>
      )
    },
    {
      tag: "AERIAL",
      title: "Drones",
      description: "Autonomous aerial vision and real-time edge inspection platforms.",
      big: false,
      comingSoon: true,
      icon: (
        <svg className="hmpg-icon-drone" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 9v6M9 12h6" />
          <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />
          <circle cx="5" cy="5" r="2.5" />
          <circle cx="19" cy="5" r="2.5" />
          <circle cx="5" cy="19" r="2.5" />
          <circle cx="19" cy="19" r="2.5" />
          <circle cx="12" cy="12" r="2" fill="#e61919" stroke="none" />
        </svg>
      )
    },
    {
      tag: "COMPUTE",
      title: "Edge Computing Systems",
      description: "Industrial-grade edge AI processing platforms.",
      big: false,
      link: "/edge-ai",
      icon: (
        <svg className="hmpg-icon-compute" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect className="hmpg-chip-outer" x="4" y="4" width="16" height="16" rx="2" />
          <rect className="hmpg-chip-inner" x="8" y="8" width="8" height="8" rx="1" />
          <line className="hmpg-pin" x1="1" y1="9" x2="4" y2="9" />
          <line className="hmpg-pin" x1="1" y1="15" x2="4" y2="15" />
          <line className="hmpg-pin" x1="20" y1="9" x2="23" y2="9" />
          <line className="hmpg-pin" x1="20" y1="15" x2="23" y2="15" />
          <line className="hmpg-pin" x1="9" y1="1" x2="9" y2="4" />
          <line className="hmpg-pin" x1="15" y1="1" x2="15" y2="4" />
          <line className="hmpg-pin" x1="9" y1="20" x2="9" y2="23" />
          <line className="hmpg-pin" x1="15" y1="20" x2="15" y2="23" />
          <circle cx="12" cy="12" r="1.5" fill="#e61919" stroke="none" />
        </svg>
      )
    },
    {
      tag: "INFRA",
      title: "AI Servers & Clusters",
      description: "High-performance server infrastructure built for enterprise AI acceleration.",
      big: true,
      link: "/products/server",
      icon: (
        <svg className="hmpg-icon-server" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect className="hmpg-srv-unit-1" x="2" y="2" width="20" height="6" rx="2" />
          <rect className="hmpg-srv-unit-2" x="2" y="9" width="20" height="6" rx="2" />
          <rect className="hmpg-srv-unit-3" x="2" y="16" width="20" height="6" rx="2" />
          <circle className="hmpg-srv-led-1" cx="6" cy="5" r="1" fill="#e61919" stroke="none" />
          <circle className="hmpg-srv-led-2" cx="6" cy="12" r="1" fill="#e61919" stroke="none" />
          <circle className="hmpg-srv-led-3" cx="6" cy="19" r="1" fill="#e61919" stroke="none" />
          <line x1="10" y1="5" x2="18" y2="5" strokeDasharray="2 2" />
          <line x1="10" y1="12" x2="18" y2="12" strokeDasharray="2 2" />
          <line x1="10" y1="19" x2="18" y2="19" strokeDasharray="2 2" />
        </svg>
      )
    },
    {
      tag: "SENSE",
      title: "Smart Sensors",
      description: "Real-time sensing solutions for intelligent environments.",
      big: false,
      wide: true,
      comingSoon: true,
      icon: (
        <svg className="hmpg-icon-sensor" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path className="hmpg-sensor-arc-3" d="M6 6a12 12 0 0 1 12 12" />
          <path className="hmpg-sensor-arc-2" d="M6 10a8 8 0 0 1 8 8" />
          <path className="hmpg-sensor-arc-1" d="M6 14a4 4 0 0 1 4 4" />
          <circle cx="6" cy="18" r="2" fill="#e61919" stroke="none" />
        </svg>
      )
    }
  ];

  const solutions = [
    {
      badge: "• RETAIL",
      title: "Smart Retail Intelligence",
      description: "Transform retail operations with AI-powered analytics and customer insights.",
      image: hmService1
    },
    {
      badge: "• SECURITY",
      title: "Intelligent Surveillance",
      description: "Real-time monitoring and proactive threat detection at scale.",
      image: hmService2
    },
    {
      badge: "• MOBILITY",
      title: "Smart Parking",
      description: "Optimize parking operations through intelligent sensing and analytics.",
      image: hmService3
    },
    {
      badge: "• INDUSTRIAL",
      title: "Industrial Intelligence",
      description: "Enhance productivity with edge AI-powered monitoring and automation.",
      image: hmService4
    }
  ];

  const pillars = [
    {
      num: "01",
      title: "Edge-First Architecture",
      description: "Designed for low latency and real-time decision making."
    },
    {
      num: "02",
      title: "Complete Ecosystem",
      description: "From sensing to intelligence under one technology framework."
    },
    {
      num: "03",
      title: "Scalable Deployment",
      description: "From single-site installations to enterprise-scale rollouts."
    },
    {
      num: "04",
      title: "Engineering Excellence",
      description: "Expertise across Semiconductor, Embedded Systems, and AI."
    }
  ];

  const techBadges = [
    "• INDUSTRIAL IOT",
    "• SEMICONDUCTOR TECHNOLOGIES",
    "• EMBEDDED SYSTEMS",
    "• EDGE COMPUTING",
    "• COMPUTER VISION",
    "• ARTIFICIAL INTELLIGENCE",
    "• HIGH PERFORMANCE COMPUTING"
  ];

  const industries = [
    "Retail",
    "Smart Cities",
    "Manufacturing",
    "Transportation",
    "Logistics",
    "Healthcare",
    "Security",
    "Infrastructure"
  ];

  const aboutIndustries = [
    "Smart Cities",
    "Retail",
    "Manufacturing",
    "Transportation",
    "Security",
    "Industrial Automation"
  ];

  return (
    <div className="hmpg-zmd-app">
      {/* Static Homepage Hero */}
      <section
        id="home"
        ref={heroRef}
        className={`hmpg-scroll-hero-wrapper${isHeroVisible ? ' hmpg-hero-active' : ''}`}
      >
        <div className="hmpg-scroll-hero-sticky">
          <img
            src={heroFrame}
            alt="ZMD Neural Engine X1 edge AI processor"
            className="hmpg-hero-image"
            fetchPriority="high"
          />

          {/* Hero Branding Overlay Content */}
          <div className="hmpg-hero-overlay-content">
            <div className="hmpg-zmd-container">
              <div className={`hmpg-hero-text-block${isHeroVisible ? ' hmpg-is-visible' : ''}`}>
                <div className="hmpg-section-tag">END-TO-END EDGE AI ECOSYSTEM</div>
                <h1 className="hmpg-hero-title hmpg-font-heading">
                  Building the<br />
                  future of <span className="hmpg-text-red">physical<br />intelligence.</span>
                </h1>

                <p className="hmpg-hero-description">
                  From sensors and cameras to edge devices, AI servers, and intelligent applications, ZMD delivers complete Edge AI ecosystems engineered for real-world deployment.
                </p>

                <div className="hmpg-hero-actions">
                  <a href="#products" className="hmpg-btn-black">
                    EXPLORE PRODUCTS
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>

                  <Link to="/edge-ai" className="hmpg-btn-outline">
                    EXPLORE EDGE AI
                  </Link>
                </div>
              </div>
            </div>

            {/* Scroll Down Hint */}
            <div className="hmpg-scroll-prompt font-mono">
              <span>SCROLL TO EXPLORE ARCHITECTURE</span>
              <span className="hmpg-scroll-arrow">↓</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section S/02: About ZMD */}
      <section id="about" className="zmd-section-about hmpg-reveal-on-scroll">
        <div className="zmd-about-rail" aria-hidden="true" />
        <div className="zmd-container">
          <div className="zmd-about-grid">
            <div className="zmd-about-content hmpg-fade-left-scroll">
              <div className="zmd-eyebrow-row">
                <span className="zmd-mono-tag">ABOUT ZMD / S/02</span>
              </div>

              <h2 className="zmd-about-heading">
                Engineering<br />
                <span className="zmd-about-heading-line">
                  intelligence at the edge<span className="zmd-text-brand">.</span>
                </span>
              </h2>

              <p className="zmd-about-copy">
                ZMD is a technology company delivering complete Edge AI ecosystems that transform real-world data into actionable intelligence.
              </p>

              <p className="zmd-about-copy">
                We combine advanced sensing, edge compute, AI infrastructure, and intelligent software to help organizations operate faster, smarter, and more efficiently — at any scale.
              </p>

              <div className="zmd-about-industries" aria-label="Industries served">
                {aboutIndustries.map((industry, idx) => (
                  <div className={`zmd-about-industry stagger-${idx + 1}`} key={industry}>
                    <AboutIndustryIcon name={industry} />
                    <span>{industry}</span>
                    <i aria-hidden="true" />
                  </div>
                ))}
              </div>

              <a href="#products" className="zmd-about-cta">
                <span>LEARN MORE ABOUT ZMD</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>

            <div className="zmd-about-visual hmpg-fade-right-scroll">
              <img
                src={aboutEdgeAiImg}
                alt="Edge AI ecosystem with a neural brain, cameras, sensors, edge computer, and AI server"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section S/03: Ecosystem */}
      <section id="ecosystem" className="zmd-section-ecosystem">
        <div className="zmd-ecosystem-grid-bg" aria-hidden="true" />
        <div className="zmd-ecosystem-rail" aria-hidden="true">
          {["S/01", "S/02", "S/03", "S/04"].map((label) => (
            <span className={label === "S/03" ? "zmd-is-current" : ""} key={label}>
              {label}
            </span>
          ))}
        </div>

        <div className="zmd-container">
          <div className="zmd-ecosystem-header">
            <div className="zmd-eyebrow-row">
              <span className="zmd-mono-tag zmd-ecosystem-kicker">THE DIFFERENTIATORS</span>
              <span className="zmd-mono-tag">/ S/03</span>
            </div>

            <h2 className="zmd-ecosystem-heading">
              One integrated ecosystem<span className="zmd-text-brand">.</span>
            </h2>

            <p className="zmd-ecosystem-subtitle">
              A single signal chain — from raw real-world data to deployed intelligence — engineered and supported end-to-end by ZMD.
            </p>
          </div>

          <div className="zmd-ecosystem-mobile-flow" aria-label="ZMD ecosystem stages">
            {steps.map((step, idx) => (
              <article className="zmd-ecosystem-mobile-step" key={`mobile-${step.num}`}>
                <div className="zmd-ecosystem-mobile-meta">
                  <span className="zmd-ecosystem-mobile-number">{step.num}</span>
                  <span className="zmd-ecosystem-mobile-label">{step.navLabel}</span>
                </div>

                <div className="zmd-ecosystem-mobile-media">
                  <img src={step.image} alt={`${step.title} ecosystem stage`} />
                  <span className="zmd-ecosystem-mobile-node" aria-hidden="true" />
                </div>

                <div className="zmd-ecosystem-mobile-content">
                  <div className="zmd-ecosystem-mobile-code-row">
                    <span className="zmd-ecosystem-card-icon">
                      <EcosystemStepIcon index={idx} />
                    </span>
                    <span className="zmd-ecosystem-card-code">{step.code}</span>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="zmd-ecosystem-showcase-scroll">
            <div className="zmd-ecosystem-showcase">
              <svg
                className="zmd-ecosystem-data-bus"
                viewBox="0 0 1000 300"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="zmd-data-gradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#e10600" stopOpacity="0" />
                    <stop offset="45%" stopColor="#ff4a44" stopOpacity="0.95" />
                    <stop offset="55%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="100%" stopColor="#e10600" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <g className="zmd-bus-glass">
                  <path d="M156 101 C178 101 184 97 203 97 S225 101 244 101" />
                  <path d="M356 101 C378 101 384 97 403 97 S425 101 444 101" />
                  <path d="M556 101 C578 101 584 97 603 97 S625 101 644 101" />
                  <path d="M756 101 C778 101 784 97 803 97 S825 101 844 101" />
                  <path d="M100 168 V224 H78 V262 H100 V278" />
                  <path d="M300 168 V238 H282 V262 H300 V278" />
                  <path d="M500 168 V278" />
                  <path d="M700 168 V238 H718 V262 H700 V278" />
                  <path d="M900 168 V224 H922 V262 H900 V278" />
                </g>

                <g className="zmd-bus-bundle">
                  <path d="M156 95 C178 95 184 91 203 91 S225 95 244 95" />
                  <path d="M156 101 C178 101 184 97 203 97 S225 101 244 101" />
                  <path className="zmd-is-red" d="M156 107 C178 107 184 103 203 103 S225 107 244 107" />
                  <path d="M356 95 C378 95 384 91 403 91 S425 95 444 95" />
                  <path d="M356 101 C378 101 384 97 403 97 S425 101 444 101" />
                  <path className="zmd-is-red" d="M356 107 C378 107 384 103 403 103 S425 107 444 107" />
                  <path d="M556 95 C578 95 584 91 603 91 S625 95 644 95" />
                  <path d="M556 101 C578 101 584 97 603 97 S625 101 644 101" />
                  <path className="zmd-is-red" d="M556 107 C578 107 584 103 603 103 S625 107 644 107" />
                  <path d="M756 95 C778 95 784 91 803 91 S825 95 844 95" />
                  <path d="M756 101 C778 101 784 97 803 97 S825 101 844 101" />
                  <path className="zmd-is-red" d="M756 107 C778 107 784 103 803 103 S825 107 844 107" />
                </g>

                <g className="zmd-bus-traces">
                  <path d="M100 168 V224 H78 V262 H100 V278" />
                  <path d="M300 168 V238 H282 V262 H300 V278" />
                  <path d="M500 168 V278" />
                  <path d="M700 168 V238 H718 V262 H700 V278" />
                  <path d="M900 168 V224 H922 V262 H900 V278" />
                </g>

                <g className="zmd-bus-nodes">
                  <circle cx="100" cy="168" r="2.5" />
                  <circle cx="300" cy="168" r="2.5" />
                  <circle cx="500" cy="168" r="2.5" />
                  <circle cx="700" cy="168" r="2.5" />
                  <circle cx="900" cy="168" r="2.5" />
                  <circle cx="100" cy="278" r="3" />
                  <circle cx="300" cy="278" r="3" />
                  <circle cx="500" cy="278" r="3" />
                  <circle cx="700" cy="278" r="3" />
                  <circle cx="900" cy="278" r="3" />
                </g>

                <g className="zmd-bus-data-flow">
                  <path d="M156 101 C178 101 184 97 203 97 S225 101 244 101" />
                  <path d="M356 101 C378 101 384 97 403 97 S425 101 444 101" />
                  <path d="M556 101 C578 101 584 97 603 97 S625 101 644 101" />
                  <path d="M756 101 C778 101 784 97 803 97 S825 101 844 101" />
                  <path d="M100 168 V224 H78 V262 H100 V278" />
                  <path d="M300 168 V238 H282 V262 H300 V278" />
                  <path d="M500 168 V278" />
                  <path d="M700 168 V238 H718 V262 H700 V278" />
                  <path d="M900 168 V224 H922 V262 H900 V278" />
                </g>

                <g className="zmd-bus-packets">
                  <circle r="2.6">
                    <animateMotion
                      dur="1.7s"
                      repeatCount="indefinite"
                      path="M156 101 C178 101 184 97 203 97 S225 101 244 101"
                    />
                  </circle>
                  <circle r="2.6">
                    <animateMotion
                      begin="0.35s"
                      dur="1.7s"
                      repeatCount="indefinite"
                      path="M356 101 C378 101 384 97 403 97 S425 101 444 101"
                    />
                  </circle>
                  <circle r="2.6">
                    <animateMotion
                      begin="0.7s"
                      dur="1.7s"
                      repeatCount="indefinite"
                      path="M556 101 C578 101 584 97 603 97 S625 101 644 101"
                    />
                  </circle>
                  <circle r="2.6">
                    <animateMotion
                      begin="1.05s"
                      dur="1.7s"
                      repeatCount="indefinite"
                      path="M756 101 C778 101 784 97 803 97 S825 101 844 101"
                    />
                  </circle>
                </g>
              </svg>

              <div className="zmd-ecosystem-units">
                {steps.map((step) => (
                  <div
                    className="zmd-ecosystem-unit"
                    key={step.num}
                  >
                    <div className="zmd-ecosystem-unit-heading">
                      <span className="zmd-ecosystem-unit-num">{step.num}</span>
                      <strong>{step.navLabel}</strong>
                    </div>

                    <span className="zmd-ecosystem-unit-dot" aria-hidden="true" />

                    <div className="zmd-ecosystem-media">
                      <img src={step.image} alt={`${step.title} ecosystem stage`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="zmd-ecosystem-cards">
            {steps.map((step, idx) => (
              <div
                className="zmd-ecosystem-card"
                key={step.num}
              >
                <div className="zmd-ecosystem-card-top">
                  <span className="zmd-ecosystem-card-icon">
                    <EcosystemStepIcon index={idx} />
                  </span>
                  <span className="zmd-ecosystem-card-code">{step.code}</span>
                </div>

                <h3>{step.title}</h3>
                <p>{step.description}</p>

                <div className="zmd-ecosystem-card-footer" aria-hidden="true">
                  <i />
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section S/04: Product Categories */}
      <section id="products" className="zmd-section-products hmpg-reveal-on-scroll">
        <div className="zmd-container">
          <div className="zmd-section-header hmpg-reveal-on-scroll">
            <div className="zmd-eyebrow-row">
              <span className="zmd-red-line" />
              <span className="zmd-mono-tag">PRODUCT CATEGORIES</span>
              <span className="zmd-mono-tag zmd-index">S/04</span>
            </div>
            <h2 className="zmd-section-heading">
              Engineered for every layer <span className="zmd-text-brand">of the stack.</span>
            </h2>
            <p className="zmd-section-sub">
              Five product families, one ecosystem — designed to work together or stand alone.
            </p>
          </div>

          <div className="zmd-products-grid">
            {products.map((p, i) => {
              const ProductCard = p.comingSoon ? 'article' : Link;
              const navigationProps = p.comingSoon
                ? { 'aria-disabled': true }
                : { to: p.link };

              return (
                <ProductCard
                  key={p.title}
                  {...navigationProps}
                  className={`zmd-product-card hmpg-reveal-on-scroll stagger-${(i % 3) + 1} ${p.big ? 'zmd-product-big' : ''} ${p.wide ? 'zmd-product-wide' : ''} ${p.comingSoon ? 'zmd-product-card-upcoming' : ''}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="zmd-product-card-top">
                    <div className="hmpg-product-icon-box">{p.icon}</div>
                    <span className="zmd-mono-tag zmd-product-tag">{p.tag}</span>
                  </div>
                  <div className="zmd-product-card-bottom">
                    <h3 className="zmd-product-title">{p.title}</h3>
                    <p className="zmd-product-desc">{p.description}</p>
                    {p.comingSoon && (
                      <span className="zmd-product-status">UPDATE SOON</span>
                    )}
                  </div>
                </ProductCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section S/05: Featured Solutions */}
      <section id="solutions" className="hmpg-zmd-section hmpg-solutions-section hmpg-reveal-on-scroll">
        <div className="hmpg-zmd-container">
          <div className="hmpg-solutions-header hmpg-reveal-on-scroll">
            <div className="hmpg-section-tag-row">
              <span className="hmpg-section-tag">FEATURED SOLUTIONS</span>
              <span className="hmpg-section-num hmpg-font-mono">S/05</span>
            </div>

            <h2 className="hmpg-solutions-title hmpg-font-heading">
              Built for measurable <span className="hmpg-text-red">business outcomes.</span>
            </h2>
            <p className="hmpg-solutions-subtitle">
              Where the ecosystem meets the industry — deployed and proven.
            </p>
          </div>

          <div className="hmpg-solutions-grid">
            {solutions.map((item, idx) => (
              <div className={`hmpg-solution-card hmpg-reveal-on-scroll stagger-${(idx % 2) + 1}`} key={idx}>
                <div className="hmpg-solution-visual">
                  <img src={item.image} alt={item.title} className="hmpg-solution-card-img" />
                  <div className="hmpg-solution-badge hmpg-font-mono">{item.badge}</div>
                </div>

                <div className="hmpg-solution-content">
                  <h3 className="hmpg-solution-card-title hmpg-font-heading">{item.title}</h3>
                  <p className="hmpg-solution-card-desc">{item.description}</p>

                  <Link to="/edge-ai" className="hmpg-arrow-link">
                    VIEW SOLUTION →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section S/06: Why Choose ZMD */}
      <section className="zmd-section-why hmpg-reveal-on-scroll">
        <div className="zmd-container">
          <div className="zmd-section-header hmpg-reveal-on-scroll">
            <div className="zmd-eyebrow-row">
              <span className="zmd-red-line" />
              <span className="zmd-mono-tag">WHY CHOOSE ZMD</span>
              <span className="zmd-mono-tag zmd-index">S/06</span>
            </div>
            <h2 className="zmd-section-heading">
              Four reasons enterprises <span className="zmd-text-brand">build with us.</span>
            </h2>
          </div>

          <div className="zmd-why-grid">
            {pillars.map((it, idx) => (
              <div key={it.num} className={`zmd-why-card hmpg-reveal-on-scroll stagger-${idx + 1}`}>
                <div className="zmd-why-num">{it.num}</div>
                <h3 className="zmd-why-title">{it.title}</h3>
                <p className="zmd-why-desc">{it.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section S/07: Technology Foundation */}
      <section className="zmd-section-technology hmpg-reveal-on-scroll">
        <div className="zmd-container">
          <div className="zmd-section-header hmpg-reveal-on-scroll">
            <div className="zmd-eyebrow-row">
              <span className="zmd-red-line" />
              <span className="zmd-mono-tag">TECHNOLOGY FOUNDATION</span>
              <span className="zmd-mono-tag zmd-index">S/07</span>
            </div>
            <h2 className="zmd-section-heading">
              Powered by <span className="zmd-text-brand">deep technology.</span>
            </h2>
            <p className="zmd-section-sub">
              Built on engineering disciplines, not assembled from off-the-shelf parts.
            </p>
          </div>

          <div className="zmd-marquee-wrapper hmpg-scale-on-scroll stagger-1">
            <div className="zmd-marquee-track">
              {[...techBadges, ...techBadges].map((t, i) => (
                <div key={i} className="zmd-marquee-pill">
                  <span className="zmd-pill-dot" />
                  <span className="zmd-mono-tag">{t}</span>
                </div>
              ))}
            </div>
            <div className="zmd-marquee-track zmd-reverse">
              {[...techBadges, ...techBadges].map((t, i) => (
                <div key={i} className="zmd-marquee-pill">
                  <span className="zmd-pill-dot" />
                  <span className="zmd-mono-tag">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section S/08: Industries */}
      <section id="industries" className="zmd-section-industries hmpg-reveal-on-scroll">
        <div className="zmd-container">
          <div className="zmd-section-header hmpg-reveal-on-scroll">
            <div className="zmd-eyebrow-row">
              <span className="zmd-red-line" />
              <span className="zmd-mono-tag">INDUSTRIES</span>
              <span className="zmd-mono-tag zmd-index">S/08</span>
            </div>
            <h2 className="zmd-section-heading">
              Deployed across critical <span className="zmd-text-brand">infrastructure.</span>
            </h2>
          </div>

          <div className="zmd-industries-grid">
            {industries.map((it, idx) => (
              <Link key={it} to="/edge-ai" className={`zmd-industry-tile hmpg-reveal-on-scroll stagger-${(idx % 4) + 1}`}>
                <span className="zmd-industry-name">{it}</span>
                <span className="zmd-industry-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section S/10: Dark CTA */}
      <section id="contact" className="zmd-section-cta hmpg-reveal-on-scroll">
        <div className="zmd-cta-grid-bg" />
        <div className="zmd-container hmpg-scale-on-scroll">
          <div className="zmd-eyebrow-row">
            <span className="zmd-red-line" />
            <span className="zmd-mono-tag zmd-text-white">GET STARTED</span>
            <span className="zmd-mono-tag zmd-index zmd-text-muted">S/10</span>
          </div>

          <h2 className="zmd-cta-heading">
            Ready to build the future of <span className="zmd-text-brand">physical intelligence?</span>
          </h2>

          <p className="zmd-cta-sub">
            Partner with ZMD to deploy scalable Edge AI ecosystems tailored to your business needs.
          </p>

          <div className="zmd-cta-btns">
            <Link to="/contact" className="zmd-btn-brand">
              CONTACT US <span>→</span>
            </Link>
            <a href="mailto:demo@zmd.com" className="zmd-btn-outline-white">
              REQUEST DEMO
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
