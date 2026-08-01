import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/home.css';

import hmService1 from '../assets-1/hm_service1.jpeg';
import hmService2 from '../assets-1/hm_service2.jpeg';
import hmService3 from '../assets-1/hm_service3.jpeg';
import hmService4 from '../assets-1/hm_service4.jpeg';
import aboutEdgeAiImg from '../assets-1/about-edge-ai-v2.png';

// Eagerly import all 145 frame sequence webp images
const frameModules = import.meta.glob('../assets/frame_sequence/frame_*.webp', { eager: true, import: 'default' });
const frameUrls = Object.keys(frameModules)
  .sort()
  .map((key) => frameModules[key]);

const TOTAL_FRAMES = frameUrls.length;

function CountDownNumber({ from = 100, to = 50, suffix = '+', duration = 1600 }) {
  const [count, setCount] = useState(from);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime = null;

          const animateStep = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.round(from - (from - to) * easeOut);
            setCount(currentVal);

            if (progress < 1) {
              requestAnimationFrame(animateStep);
            }
          };

          requestAnimationFrame(animateStep);
        }
      },
      { threshold: 0.15 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [from, to, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
}

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

export default function HomePage() {
  const heroScrollWrapperRef = useRef(null);
  const heroCanvasRef = useRef(null);
  const imagesRef = useRef(new Array(TOTAL_FRAMES));
  const frameRequestsRef = useRef(new Map());
  const requestFrameRef = useRef(null);

  const [isHeroTextVisible, setIsHeroTextVisible] = useState(false);
  const currentFrameIdxRef = useRef(0);

  const renderCanvasFrame = (img, canvas) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    ctx.fillStyle = '#0b0c10';
    ctx.fillRect(0, 0, width, height);

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const hRatio = width / img.naturalWidth;
    const vRatio = height / img.naturalHeight;
    const ratio = Math.max(hRatio, vRatio);

    const centerShift_x = (width - img.naturalWidth * ratio) / 2;
    const centerShift_y = (height - img.naturalHeight * ratio) / 2;

    ctx.drawImage(
      img,
      0,
      0,
      img.naturalWidth,
      img.naturalHeight,
      centerShift_x,
      centerShift_y,
      img.naturalWidth * ratio,
      img.naturalHeight * ratio
    );
  };

  // Paint the first frame immediately. Desktop frames are then fetched in small
  // batches so the animation never blocks the page or monopolizes the network.
  // Mobile and data-saver users keep the same visual as a lightweight static hero.
  useEffect(() => {
    let cancelled = false;
    const imgArray = imagesRef.current;
    const frameRequests = frameRequestsRef.current;

    if (TOTAL_FRAMES === 0) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = navigator.connection?.saveData === true;

    if (isMobile || reduceMotion || saveData) {
      setIsHeroTextVisible(true);
    }

    const loadFrame = (index) => {
      if (imgArray[index]) return Promise.resolve(imgArray[index]);
      if (frameRequests.has(index)) {
        return frameRequests.get(index);
      }

      const request = new Promise((resolve) => {
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => {
          if (!cancelled) {
            imgArray[index] = img;
            if (index === currentFrameIdxRef.current && heroCanvasRef.current) {
              renderCanvasFrame(img, heroCanvasRef.current);
            }
          }
          resolve(img);
        };
        img.onerror = () => resolve(null);
        img.src = frameUrls[index];
      });

      frameRequests.set(index, request);
      return request;
    };

    requestFrameRef.current = loadFrame;

    const waitForIdle = () => new Promise((resolve) => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(resolve, { timeout: 800 });
      } else {
        window.setTimeout(resolve, 50);
      }
    });

    const loadDesktopSequence = async () => {
      await loadFrame(0);
      if (isMobile || reduceMotion || saveData || cancelled) return;

      const batchSize = 4;
      for (let start = 1; start < TOTAL_FRAMES && !cancelled; start += batchSize) {
        const batch = Array.from(
          { length: Math.min(batchSize, TOTAL_FRAMES - start) },
          (_, offset) => loadFrame(start + offset)
        );
        await Promise.all(batch);
        await waitForIdle();
      }
    };

    loadDesktopSequence();

    return () => {
      cancelled = true;
      frameRequests.clear();
      if (requestFrameRef.current === loadFrame) {
        requestFrameRef.current = null;
      }
    };
  }, []);

  // Scroll trigger animation handler
  useEffect(() => {
    let animFrameId = null;

    const updateFrameOnScroll = () => {
      if (!heroScrollWrapperRef.current || !heroCanvasRef.current) return;

      const wrapper = heroScrollWrapperRef.current;
      const rect = wrapper.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalScrollable = rect.height - windowH;

      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

      const useStaticHero = window.matchMedia('(max-width: 768px), (prefers-reduced-motion: reduce)').matches
        || navigator.connection?.saveData === true;

      // Reveal the hero copy immediately on lightweight/static presentations.
      setIsHeroTextVisible(useStaticHero || rawProgress >= 0.28);

      if (useStaticHero) return;

      const targetFrameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(rawProgress * TOTAL_FRAMES)
      );

      currentFrameIdxRef.current = targetFrameIndex;

      if (animFrameId) cancelAnimationFrame(animFrameId);
      animFrameId = requestAnimationFrame(() => {
        let img = imagesRef.current[targetFrameIndex];
        if (!img || !img.complete) {
          requestFrameRef.current?.(targetFrameIndex);

          for (let offset = 1; offset < TOTAL_FRAMES && !img; offset++) {
            const before = imagesRef.current[targetFrameIndex - offset];
            const after = imagesRef.current[targetFrameIndex + offset];
            img = (before?.complete && before) || (after?.complete && after) || null;
          }
        }
        if (img && heroCanvasRef.current) {
          renderCanvasFrame(img, heroCanvasRef.current);
        }
      });
    };

    const handleResize = () => {
      const img = imagesRef.current[currentFrameIdxRef.current] || imagesRef.current[0];
      if (img && heroCanvasRef.current) {
        renderCanvasFrame(img, heroCanvasRef.current);
      }
    };

    window.addEventListener('scroll', updateFrameOnScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    updateFrameOnScroll();

    return () => {
      window.removeEventListener('scroll', updateFrameOnScroll);
      window.removeEventListener('resize', handleResize);
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
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
      link: "/products/drone",
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
      link: "/products/sensors",
      icon: (
        <svg className="hmpg-icon-sensor" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path className="hmpg-sensor-arc-3" d="M6 6a12 12 0 0 1 12 12" />
          <path className="hmpg-sensor-arc-2" d="M6 10a8 8 0 0 1 8 8" />
          <path className="hmpg-sensor-arc-1" d="M6 14a4 4 0 0 1 4 4" />
          <circle cx="6" cy="18" r="2" fill="#e61919" stroke="none" />
        </svg>
      )
    },
    {
      tag: "SOFTWARE",
      title: "AI Solutions",
      description: "Customized AI applications and analytics platforms.",
      big: false,
      link: "/edge-ai",
      icon: (
        <svg className="hmpg-icon-software" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <rect className="hmpg-panel-top" x="3" y="3" width="18" height="6" fill="none" />
          <rect className="hmpg-panel-left" x="3" y="9" width="6" height="12" fill="none" />
          <rect className="hmpg-panel-main" x="9" y="9" width="12" height="12" fill="none" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
          <circle cx="6" cy="6" r="1" fill="#e61919" stroke="none" />
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
      {/* Scroll-Triggered Hero Section */}
      <section className="hmpg-scroll-hero-wrapper" ref={heroScrollWrapperRef}>
        <div className="hmpg-scroll-hero-sticky">
          {/* HTML5 Canvas Frame Renderer */}
          <canvas ref={heroCanvasRef} className="hmpg-hero-canvas" />

          {/* Hero Branding Overlay Content */}
          <div className="hmpg-hero-overlay-content">
            <div className="hmpg-zmd-container">
              <div className={`hmpg-hero-text-block ${isHeroTextVisible ? 'hmpg-is-visible' : ''}`}>
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
                loading="lazy"
                decoding="async"
              />
            </div>
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
              Six product families, one ecosystem — designed to work together or stand alone.
            </p>
          </div>

          <div className="zmd-products-grid">
            {products.map((p, i) => (
              <Link
                key={p.title}
                to={p.link}
                className={`zmd-product-card hmpg-reveal-on-scroll stagger-${(i % 3) + 1} ${p.big ? 'zmd-product-big' : ''}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="zmd-product-card-top">
                  <div className="hmpg-product-icon-box">{p.icon}</div>
                  <span className="zmd-mono-tag zmd-product-tag">{p.tag}</span>
                </div>
                <div className="zmd-product-card-bottom">
                  <h3 className="zmd-product-title">{p.title}</h3>
                  <p className="zmd-product-desc">{p.description}</p>
                  <div className="zmd-explore-link">
                    EXPLORE <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
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
                  <img src={item.image} alt={item.title} className="hmpg-solution-card-img" loading="lazy" decoding="async" />
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
            <a href="mailto:contact@zmd.com" className="zmd-btn-brand">
              CONTACT US <span>→</span>
            </a>
            <a href="mailto:demo@zmd.com" className="zmd-btn-outline-white">
              REQUEST DEMO
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
