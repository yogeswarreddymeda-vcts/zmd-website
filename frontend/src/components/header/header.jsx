import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import zmdLogo from './zmd_logo.png';
import './header.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('camera');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setProductsOpen(false);
    setMobileMenuOpen(false);
  }, [location]);

  const navigateAndScroll = (sectionId) => {
    setProductsOpen(false);
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
    } else {
      const elem = document.getElementById(sectionId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleCardClick = (path) => {
    setProductsOpen(false);
    navigate(path);
  };

  return (
    <header 
      className={`zmd-header ${isScrolled ? 'scrolled' : ''}`}
      onMouseLeave={() => setProductsOpen(false)}
    >
      <div className="header-top-bar">
        {/* Brand Logo - Redirects to Home Page */}
        <Link 
          to="/" 
          className="header-brand"
          onClick={(e) => {
            e.preventDefault();
            navigateAndScroll('home');
          }}
        >
          <img src={zmdLogo} alt="ZMD Logo" className="header-logo-img" />
        </Link>

        {/* Center Navigation */}
        <nav className={`header-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <ul className="nav-list">
            {/* Home Link */}
            <li className="nav-item">
              <Link 
                to="/" 
                className={`nav-link ${location.pathname === '/' && !location.hash ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigateAndScroll('home');
                }}
              >
                Home
              </Link>
            </li>

            {/* Ecosystem Link */}
            <li className="nav-item">
              <a 
                href="#ecosystem" 
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigateAndScroll('ecosystem');
                }}
              >
                Ecosystem
              </a>
            </li>

            {/* Products Dropdown Trigger */}
            <li 
              className={`nav-item ${productsOpen ? 'active' : ''}`}
              onMouseEnter={() => setProductsOpen(true)}
            >
              <button 
                className={`nav-link dropdown-toggle ${productsOpen ? 'active' : ''}`}
                onClick={() => setProductsOpen(!productsOpen)}
                aria-expanded={productsOpen}
              >
                Products
                <svg className="dropdown-chevron" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </li>

            {/* Solutions Link */}
            <li className="nav-item">
              <a 
                href="#solutions" 
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigateAndScroll('solutions');
                }}
              >
                Solutions
              </a>
            </li>
          </ul>
        </nav>

        {/* Right Contact Button */}
        <div className="header-actions">
          <a 
            href="#home" 
            className="btn-red-contact"
            onClick={(e) => {
              e.preventDefault();
              navigateAndScroll('home');
            }}
          >
            <span>CONTACT US</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>

          {/* Mobile Menu Toggle */}
          <button 
            className={`mobile-toggle ${mobileMenuOpen ? 'active' : ''}`} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* FULLSCREEN MEGA MENU OVERLAY */}
      {productsOpen && (
        <div 
          className="mega-menu-overlay"
          onMouseEnter={() => setProductsOpen(true)}
          onMouseLeave={() => setProductsOpen(false)}
        >
          <div className="mega-menu-container">
            
            <div className="mega-menu-top">
              <span className="categories-label">
                <span className="red-dot"></span> PRODUCT CATEGORIES
              </span>
              <span className="categories-subtext">
                Click or hover over any section to explore available products
              </span>
            </div>

            <div className="mega-menu-grid">

              {/* 1. Camera Column Card - Clickable */}
              <div 
                className={`mega-col ${activeCategory === 'camera' ? 'col-highlight' : ''}`}
                onMouseEnter={() => setActiveCategory('camera')}
                onClick={() => handleCardClick('/products/cam')}
              >
                <div className="col-header">
                  <svg className="col-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                    <circle cx="12" cy="13" r="4"/>
                  </svg>
                  <div className="col-title-group">
                    <h4 className="col-title">Camera</h4>
                    <span className="col-tag">VISION AI</span>
                  </div>
                </div>
                <div className="col-items">
                  <div className="product-card">
                    <div className="card-head">
                      <span className="card-name">Dual-Lens AI Camera</span>
                      <span className="badge-red">POPULAR</span>
                    </div>
                    <p className="card-desc">Stereoscopic real-time spatial sensing</p>
                  </div>
                  <div className="product-card">
                    <div className="card-head">
                      <span className="card-name">Smart Vision Module</span>
                      <span className="badge-red-outline">AI</span>
                    </div>
                    <p className="card-desc">Low-latency edge camera for industrial monitoring</p>
                  </div>
                  <div className="product-card">
                    <div className="card-head">
                      <span className="card-name">ThermoInspection Cam</span>
                    </div>
                    <p className="card-desc">High-resolution thermal anomaly detection</p>
                  </div>
                </div>
              </div>

              {/* 2. Delibot Column Card - Clickable */}
              <div 
                className={`mega-col ${activeCategory === 'delibot' ? 'col-highlight' : ''}`}
                onMouseEnter={() => setActiveCategory('delibot')}
                onClick={() => handleCardClick('/products/delibot')}
              >
                <div className="col-header">
                  <svg className="col-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="11" width="18" height="10" rx="2"/>
                    <circle cx="12" cy="5" r="2"/>
                    <path d="M12 7v4M8 16h.01M16 16h.01"/>
                  </svg>
                  <div className="col-title-group">
                    <h4 className="col-title">Delibot</h4>
                    <span className="col-tag">AUTONOMOUS</span>
                  </div>
                </div>
                <div className="col-items">
                  <div className="product-card">
                    <div className="card-head">
                      <span className="card-name">Delibot X1 Autonomous</span>
                      <span className="badge-red-outline">FEATURED</span>
                    </div>
                    <p className="card-desc">Indoor/outdoor last-mile delivery robot</p>
                  </div>
                  <div className="product-card">
                    <div className="card-head">
                      <span className="card-name">Fleet Navigator Pod</span>
                    </div>
                    <p className="card-desc">Multi-robot coordination system</p>
                  </div>
                </div>
              </div>

              {/* 3. Drone Column Card - Clickable */}
              <div 
                className={`mega-col ${activeCategory === 'drone' ? 'col-highlight' : ''}`}
                onMouseEnter={() => setActiveCategory('drone')}
                onClick={() => handleCardClick('/products/drone')}
              >
                <div className="col-header">
                  <svg className="col-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                  <div className="col-title-group">
                    <h4 className="col-title">Drone</h4>
                    <span className="col-tag">AERIAL AI</span>
                  </div>
                </div>
                <div className="col-items">
                  <div className="product-card">
                    <div className="card-head">
                      <span className="card-name">Surveillance Drone Pro</span>
                      <span className="badge-red">HOT</span>
                    </div>
                    <p className="card-desc">Autonomous aerial perimeter tracking</p>
                  </div>
                  <div className="product-card">
                    <div className="card-head">
                      <span className="card-name">Payload Sensor Controller</span>
                    </div>
                    <p className="card-desc">Real-time airborne AI processing unit</p>
                  </div>
                </div>
              </div>

              {/* 4. Safety Band Column Card - Clickable */}
              <div 
                className={`mega-col ${activeCategory === 'safety' ? 'col-highlight' : ''}`}
                onMouseEnter={() => setActiveCategory('safety')}
                onClick={() => handleCardClick('/products/safety')}
              >
                <div className="col-header">
                  <svg className="col-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  <div className="col-title-group">
                    <h4 className="col-title">Safety Band</h4>
                    <span className="col-tag">WEARABLES</span>
                  </div>
                </div>
                <div className="col-items">
                  <div className="product-card">
                    <div className="card-head">
                      <span className="card-name">Safety Band Pro</span>
                      <span className="badge-red-outline">CRITICAL</span>
                    </div>
                    <p className="card-desc">Hazardous zone worker health & telemetry</p>
                  </div>
                  <div className="product-card">
                    <div className="card-head">
                      <span className="card-name">Proximity Warning Tag</span>
                    </div>
                    <p className="card-desc">Industrial machinery collision avoidance</p>
                  </div>
                </div>
              </div>

              {/* 5. Sensors Column Card - Clickable */}
              <div 
                className={`mega-col ${activeCategory === 'sensors' ? 'col-highlight' : ''}`}
                onMouseEnter={() => setActiveCategory('sensors')}
                onClick={() => handleCardClick('/products/sensors')}
              >
                <div className="col-header">
                  <svg className="col-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                  <div className="col-title-group">
                    <h4 className="col-title">Sensors</h4>
                    <span className="col-tag">IOT SENSORS</span>
                  </div>
                </div>
                <div className="col-items">
                  <div className="product-card">
                    <div className="card-head">
                      <span className="card-name">Multi-Spectral Array</span>
                    </div>
                    <p className="card-desc">Environmental & gas sensing module</p>
                  </div>
                  <div className="product-card">
                    <div className="card-head">
                      <span className="card-name">Edge Vibration Sensor</span>
                    </div>
                    <p className="card-desc">Predictive maintenance acoustic transducer</p>
                  </div>
                </div>
              </div>

              {/* 6. Server Column Card - Clickable */}
              <div 
                className={`mega-col ${activeCategory === 'server' ? 'col-highlight' : ''}`}
                onMouseEnter={() => setActiveCategory('server')}
                onClick={() => handleCardClick('/products/server')}
              >
                <div className="col-header">
                  <svg className="col-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="2" y="2" width="20" height="8" rx="2"/>
                    <rect x="2" y="14" width="20" height="8" rx="2"/>
                    <line x1="6" y1="6" x2="6.01" y2="6"/>
                    <line x1="6" y1="18" x2="6.01" y2="18"/>
                  </svg>
                  <div className="col-title-group">
                    <h4 className="col-title">Server</h4>
                    <span className="col-tag">EDGE COMPUTE</span>
                  </div>
                </div>
                <div className="col-items">
                  <div className="product-card">
                    <div className="card-head">
                      <span className="card-name">GPU Edge Server 4000</span>
                      <span className="badge-red-outline">ENTERPRISE</span>
                    </div>
                    <p className="card-desc">High-density neural model inferencing</p>
                  </div>
                  <div className="product-card">
                    <div className="card-head">
                      <span className="card-name">Micro-Server Array</span>
                    </div>
                    <p className="card-desc">Compact low-power cluster module</p>
                  </div>
                </div>
              </div>

            </div>

            <div className="mega-menu-bottom">
              <Link to="/products/server" className="view-all-link" onClick={() => setProductsOpen(false)}>
                VIEW ALL ZMD PRODUCTS & HARDWARE →
              </Link>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
