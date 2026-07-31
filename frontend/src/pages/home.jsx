import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/css/home.css';

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    // Handle hash scrolling if navigate with #ecosystem or #solutions
    if (location.hash) {
      const elem = document.getElementById(location.hash.substring(1));
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="home-single-page">

      {/* 1. HERO / HOME SECTION */}
      <section id="home" className="home-hero-section">
        <span className="home-hero-badge">
          ZETTAMICRO DEVICES
        </span>
        <h1 className="home-hero-title">
          Next-Generation Hardware & Edge AI Intelligence
        </h1>
        <p className="home-hero-desc">
          Engineered for low-latency edge computing, high-density Xeon server platforms, 4K vision sensors, and autonomous robotics.
        </p>
        <div className="home-hero-actions">
          <Link to="/products/server" className="home-btn-primary">
            Explore Server Solutions
          </Link>
          <a href="#ecosystem" className="home-btn-secondary">
            Explore Ecosystem
          </a>
        </div>
      </section>

      {/* 2. ECOSYSTEM SECTION (Single Page) */}
      <section id="ecosystem" className="home-section-ecosystem">
        <div className="home-section-container">
          <div className="home-section-header">
            <span className="home-section-tag">
              • ZMD HARDWARE & SOFTWARE PLATFORM
            </span>
            <h2 className="home-section-heading">
              The Integrated ZMD Ecosystem
            </h2>
            <p className="home-section-subtext">
              From silicon-level sensor capture to rackmount cloud server inferencing, our unified stack powers autonomous real-time intelligence.
            </p>
          </div>

          <div className="home-cards-grid">
            
            <div className="home-card-ecosystem">
              <div className="home-card-number">01</div>
              <h3 className="home-card-title">Vision Sensors & Cameras</h3>
              <p className="home-card-desc">
                Stereoscopic 4K HDR camera modules with embedded NPU chips for real-time spatial object tracking and anomaly detection.
              </p>
            </div>

            <div className="home-card-ecosystem">
              <div className="home-card-number">02</div>
              <h3 className="home-card-title">Autonomous Robotics & Drones</h3>
              <p className="home-card-desc">
                Indoor/outdoor deliverybots and airborne surveillance drones driven by LiDAR SLAM and real-time aerial AI controllers.
              </p>
            </div>

            <div className="home-card-ecosystem">
              <div className="home-card-number">03</div>
              <h3 className="home-card-title">Data Center & Edge Servers</h3>
              <p className="home-card-desc">
                2U dual Xeon high-density servers complying with DC-MHS standards to execute heavy enterprise AI inferencing workloads.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SOLUTIONS SECTION (Single Page) */}
      <section id="solutions" className="home-section-solutions">
        <div className="home-section-container">
          <div className="home-section-header">
            <span className="home-section-tag">
              • INDUSTRY SOLUTIONS
            </span>
            <h2 className="home-section-heading">
              Solutions Built for Enterprise Impact
            </h2>
            <p className="home-section-subtext">
              Deploy tailored AI acceleration across retail, security, parking, and industrial automation.
            </p>
          </div>

          <div className="home-cards-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            
            <div className="home-card-solution">
              <h3>Smart Retail</h3>
              <p>
                Automated checkout tracking, customer heatmapping, and real-time inventory shelf monitoring.
              </p>
            </div>

            <div className="home-card-solution">
              <h3>Surveillance</h3>
              <p>
                Perimeter threat detection, facial recognition, and autonomous drone patrol dispatching.
              </p>
            </div>

            <div className="home-card-solution">
              <h3>Smart Parking</h3>
              <p>
                Automatic license plate recognition (ALPR) and occupancy guidance sensors.
              </p>
            </div>

            <div className="home-card-solution">
              <h3>Industrial AI</h3>
              <p>
                Predictive vibration maintenance, thermal inspection, and high-speed defect analysis.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
