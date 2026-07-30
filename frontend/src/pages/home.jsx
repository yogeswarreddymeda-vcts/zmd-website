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
    <div className="home-single-page" style={{ width: '100%' }}>

      {/* 1. HERO / HOME SECTION */}
      <section id="home" className="home-hero-section" style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '5rem 2rem 4rem 2rem', backgroundColor: '#ffffff' }}>
        <span style={{ background: '#fee2e2', color: '#dc2626', padding: '0.4rem 1.1rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
          ZETTAMICRO DEVICES
        </span>
        <h1 style={{ fontSize: '3.75rem', fontWeight: '800', color: '#0f172a', margin: '0 0 1.25rem 0', lineHeight: 1.1, maxWidth: '900px', letterSpacing: '-0.03em' }}>
          Next-Generation Hardware & Edge AI Intelligence
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#64748b', maxWidth: '720px', margin: '0 auto 2.5rem auto', lineHeight: 1.6 }}>
          Engineered for low-latency edge computing, high-density Xeon server platforms, 4K vision sensors, and autonomous robotics.
        </p>
        <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/products/server" style={{ backgroundColor: '#dc2626', color: '#ffffff', padding: '0.85rem 2rem', borderRadius: '9999px', textDecoration: 'none', fontWeight: '700', fontSize: '1rem', boxShadow: '0 4px 14px rgba(220,38,38,0.3)', transition: 'all 0.2s ease' }}>
            Explore Server Solutions
          </Link>
          <a href="#ecosystem" style={{ border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#0f172a', padding: '0.85rem 2rem', borderRadius: '9999px', textDecoration: 'none', fontWeight: '700', fontSize: '1rem' }}>
            Explore Ecosystem
          </a>
        </div>
      </section>

      {/* 2. ECOSYSTEM SECTION (Single Page) */}
      <section id="ecosystem" style={{ padding: '6rem 3rem', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ color: '#dc2626', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              • ZMD HARDWARE & SOFTWARE PLATFORM
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0f172a', marginTop: '0.75rem' }}>
              The Integrated ZMD Ecosystem
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '650px', margin: '0.75rem auto 0 auto' }}>
              From silicon-level sensor capture to rackmount cloud server inferencing, our unified stack powers autonomous real-time intelligence.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '2.25rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <div style={{ width: '48px', height: '48px', background: '#fee2e2', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: '#dc2626', fontWeight: '800', fontSize: '1.2rem' }}>
                01
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.75rem' }}>Vision Sensors & Cameras</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Stereoscopic 4K HDR camera modules with embedded NPU chips for real-time spatial object tracking and anomaly detection.
              </p>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '2.25rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <div style={{ width: '48px', height: '48px', background: '#fee2e2', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: '#dc2626', fontWeight: '800', fontSize: '1.2rem' }}>
                02
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.75rem' }}>Autonomous Robotics & Drones</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Indoor/outdoor deliverybots and airborne surveillance drones driven by LiDAR SLAM and real-time aerial AI controllers.
              </p>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '2.25rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <div style={{ width: '48px', height: '48px', background: '#fee2e2', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: '#dc2626', fontWeight: '800', fontSize: '1.2rem' }}>
                03
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.75rem' }}>Data Center & Edge Servers</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>
                2U dual Xeon high-density servers complying with DC-MHS standards to execute heavy enterprise AI inferencing workloads.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SOLUTIONS SECTION (Single Page - No separate pages!) */}
      <section id="solutions" style={{ padding: '6rem 3rem', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ color: '#dc2626', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              • INDUSTRY SOLUTIONS
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0f172a', marginTop: '0.75rem' }}>
              Solutions Built for Enterprise Impact
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '650px', margin: '0.75rem auto 0 auto' }}>
              Deploy tailored AI acceleration across retail, security, parking, and industrial automation.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.5rem' }}>Smart Retail</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.5 }}>
                Automated checkout tracking, customer heatmapping, and real-time inventory shelf monitoring.
              </p>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.5rem' }}>Surveillance</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.5 }}>
                Perimeter threat detection, facial recognition, and autonomous drone patrol dispatching.
              </p>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.5rem' }}>Smart Parking</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.5 }}>
                Automatic license plate recognition (ALPR) and occupancy guidance sensors.
              </p>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.5rem' }}>Industrial AI</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.5 }}>
                Predictive vibration maintenance, thermal inspection, and high-speed defect analysis.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
