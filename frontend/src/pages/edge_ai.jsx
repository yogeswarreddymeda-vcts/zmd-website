import React from 'react';
import { Link } from 'react-router-dom';
import heroSectionGraphic from '../assets/images/edge/herosectionedgeai.png';
import imgSmall from '../assets/images/edge/edge_box_small.png';
import imgPro from '../assets/images/edge/edge_box_pro.png';
import imgFlex from '../assets/images/edge/edge_box_flex.png';
import imgUltra from '../assets/images/edge/edge_box_ultra.png';
import '../assets/css/edge_ai.css';

export default function EdgeAIPage() {
  return (
    <div className="edgeai-page">
      {/* HERO SECTION */}
      <section className="edge-hero">
        <div className="edge-hero__card">
          
          {/* LEFT CONTENT */}
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
              <Link to="/products/server" className="edge-hero__btn-primary">
                <span>Explore Systems</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <a href="#use-cases" className="edge-hero__btn-secondary">
                <span>See Use Cases</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            <div className="edge-hero__divider" />

            {/* STATS / METRICS ROW */}
            <div className="edge-hero__stats">
              {/* Stat 1 */}
              <div className="edge-hero__stat-item">
                <div className="edge-hero__stat-header">
                  <div className="edge-hero__stat-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 12l3-3" />
                    </svg>
                  </div>
                  <span className="edge-hero__stat-val">&lt;5ms</span>
                </div>
                <p className="edge-hero__stat-label">on-device inference latency</p>
              </div>

              {/* Stat 2 */}
              <div className="edge-hero__stat-item">
                <div className="edge-hero__stat-header">
                  <div className="edge-hero__stat-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <span className="edge-hero__stat-val">100%</span>
                </div>
                <p className="edge-hero__stat-label">uptime offline / disconnected</p>
              </div>

              {/* Stat 3 */}
              <div className="edge-hero__stat-item">
                <div className="edge-hero__stat-header">
                  <div className="edge-hero__stat-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 22V12a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v10" />
                      <path d="M18 10V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v6" />
                      <path d="M4 22h16" />
                    </svg>
                  </div>
                  <span className="edge-hero__stat-val">6</span>
                </div>
                <p className="edge-hero__stat-label">industries in production today</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FOUNDATIONS SECTION */}
      <section className="edge-foundations">
        <div className="edge-foundations__container">
          <span className="edge-foundations__eyebrow">FOUNDATIONS</span>
          <h2 className="edge-foundations__title">The two halves of edge AI</h2>
          <p className="edge-foundations__subtitle">
            ZMD systems are built to run both disciplines side by side, on the same box, without shipping data anywhere else.
          </p>

          <div className="edge-foundations__grid">
            {/* Card 1: Predictive AI */}
            <div className="edge-foundations__card">
              <div className="edge-foundations__card-header">
                <span className="edge-foundations__dot edge-foundations__dot--red" />
                <h3 className="edge-foundations__card-title">Predictive AI</h3>
              </div>
              <p className="edge-foundations__card-desc">
                Learns from historical and streaming data to forecast what happens next — a defect on the line, a safety risk on the floor, a spike in demand at the counter. Runs continuously, in real time, at the source.
              </p>
            </div>

            {/* Card 2: Generative AI */}
            <div className="edge-foundations__card">
              <div className="edge-foundations__card-header">
                <span className="edge-foundations__dot edge-foundations__dot--crimson" />
                <h3 className="edge-foundations__card-title">Generative AI</h3>
              </div>
              <p className="edge-foundations__card-desc">
                Synthesizes new interactions on the spot — a kiosk that understands natural speech, a concierge that answers in context, a recommendation built from what's happening right now, not last week's batch job.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MEET THE EDGE BOX / SHIPPING SYSTEM SECTION */}
      <section className="edge-system">
        <div className="edge-system__container">
          
          {/* LEFT COLUMN: Hardware Graphic & Interface Badges */}
          <div className="edge-system__left">
            <div className="edge-system__image-card">
              <img
                src={imgSmall}
                alt="ZMD Shipping Edge AI System"
                className="edge-system__img"
              />
            </div>

            {/* Interface Badges Row */}
            <div className="edge-system__badges">
              <div className="edge-system__badge-item">
                <div className="edge-system__badge-icon">USB</div>
                <span className="edge-system__badge-label">USB</span>
              </div>
              <div className="edge-system__badge-item">
                <div className="edge-system__badge-icon">TC</div>
                <span className="edge-system__badge-label">Thunderbolt™ C</span>
              </div>
              <div className="edge-system__badge-item">
                <div className="edge-system__badge-icon">DP</div>
                <span className="edge-system__badge-label">DisplayPort</span>
              </div>
              <div className="edge-system__badge-item">
                <div className="edge-system__badge-icon">HD</div>
                <span className="edge-system__badge-label">HDMI</span>
              </div>
              <div className="edge-system__badge-item">
                <div className="edge-system__badge-icon">WIN</div>
                <span className="edge-system__badge-label">Win 11</span>
              </div>
              <div className="edge-system__badge-item">
                <div className="edge-system__badge-icon">LX</div>
                <span className="edge-system__badge-label">Linux</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Content & Specs Table */}
          <div className="edge-system__right">
            <div className="edge-system__eyebrow-pill">
              MEET THE EDGE BOX
            </div>

            <h2 className="edge-system__title">
              Our first shipping edge AI system
            </h2>

            <p className="edge-system__desc">
              A high-performance edge platform engineered in compact form, delivering powerful compute capability and scalable performance for modern edge workloads — the anchor product for the ZMD edge AI line below.
            </p>

            {/* Specifications Table */}
            <div className="edge-system__table-wrap">
              <table className="edge-system__table">
                <thead>
                  <tr>
                    <th>Specification</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="edge-system__spec-name">System on Chip</td>
                    <td className="edge-system__spec-val">
                      Intel® Core™ Ultra Series 2 285H, Intel® AI Boost NPU + Intel® Arc™ 140T iGPU ~99 peak TOPS
                    </td>
                  </tr>
                  <tr>
                    <td className="edge-system__spec-name">Memory</td>
                    <td className="edge-system__spec-val">
                      Dual-channel DDR5-5600/6400, up to 96GB (48GB/DIMM)
                    </td>
                  </tr>
                  <tr>
                    <td className="edge-system__spec-name">Storage</td>
                    <td className="edge-system__spec-val">
                      2 x M.2 (2242/2280/22110) PCIe 4.0 NVMe
                    </td>
                  </tr>
                  <tr>
                    <td className="edge-system__spec-name">Networking</td>
                    <td className="edge-system__spec-val">
                      1x1GbE + 1x2.5GbE LAN, Wi-Fi 7, Bluetooth 5.4
                    </td>
                  </tr>
                  <tr>
                    <td className="edge-system__spec-name">Display</td>
                    <td className="edge-system__spec-val">
                      4K / 8K support via HDMI, DP, Thunderbolt™ C
                    </td>
                  </tr>
                  <tr>
                    <td className="edge-system__spec-name">Power / Form Factor</td>
                    <td className="edge-system__spec-val">
                      19-28V DC · Small Form Factor · 24/7 rated
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="edge-system__table-note">
                *Final specifications subject to configuration and validation.
              </p>
            </div>
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
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/></svg>
                  </span>
                  <span className="edge-lineup__spec-label">Processor</span>
                  <span className="edge-lineup__spec-value">Intel® Core™ i5-1240P</span>
                </div>
                <div className="edge-lineup__spec-row">
                  <span className="edge-lineup__spec-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><path d="M6 19v-3M10 19v-3M14 19v-3M18 19v-3M6 8V5M10 8V5M14 8V5M18 8V5"/><rect x="2" y="8" width="20" height="8" rx="1"/></svg>
                  </span>
                  <span className="edge-lineup__spec-label">Memory</span>
                  <span className="edge-lineup__spec-value">Up to 64GB DDR5</span>
                </div>
                <div className="edge-lineup__spec-row">
                  <span className="edge-lineup__spec-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="6" cy="12" r="1.5"/><path d="M12 12h6"/></svg>
                  </span>
                  <span className="edge-lineup__spec-label">Storage</span>
                  <span className="edge-lineup__spec-value">Up to 2TB NVMe</span>
                </div>
                <div className="edge-lineup__spec-row">
                  <span className="edge-lineup__spec-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><rect x="2" y="8" width="20" height="8" rx="2"/><path d="M6 12h.01M10 12h.01M14 12h.01M18 12h.01"/></svg>
                  </span>
                  <span className="edge-lineup__spec-label">Ports</span>
                  <span className="edge-lineup__spec-value">2x 2.5GbE, 4x USB 3.2</span>
                </div>
                <div className="edge-lineup__spec-row">
                  <span className="edge-lineup__spec-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
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
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/></svg>
                  </span>
                  <span className="edge-lineup__spec-label">Processor</span>
                  <span className="edge-lineup__spec-value">Intel® i7-13700H</span>
                </div>
                <div className="edge-lineup__spec-row">
                  <span className="edge-lineup__spec-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><path d="M6 19v-3M10 19v-3M14 19v-3M18 19v-3M6 8V5M10 8V5M14 8V5M18 8V5"/><rect x="2" y="8" width="20" height="8" rx="1"/></svg>
                  </span>
                  <span className="edge-lineup__spec-label">Memory</span>
                  <span className="edge-lineup__spec-value">Up to 64GB DDR5</span>
                </div>
                <div className="edge-lineup__spec-row">
                  <span className="edge-lineup__spec-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="6" cy="12" r="1.5"/><path d="M12 12h6"/></svg>
                  </span>
                  <span className="edge-lineup__spec-label">Storage</span>
                  <span className="edge-lineup__spec-value">Up to 4TB NVMe</span>
                </div>
                <div className="edge-lineup__spec-row">
                  <span className="edge-lineup__spec-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><rect x="2" y="8" width="20" height="8" rx="2"/><path d="M6 12h.01M10 12h.01M14 12h.01M18 12h.01"/></svg>
                  </span>
                  <span className="edge-lineup__spec-label">Ports</span>
                  <span className="edge-lineup__spec-value">2x 2.5GbE, 6x USB 3.2</span>
                </div>
                <div className="edge-lineup__spec-row">
                  <span className="edge-lineup__spec-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
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
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/></svg>
                  </span>
                  <span className="edge-lineup__spec-label">Processor</span>
                  <span className="edge-lineup__spec-value">Intel® N100 / i3-N305</span>
                </div>
                <div className="edge-lineup__spec-row">
                  <span className="edge-lineup__spec-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><path d="M6 19v-3M10 19v-3M14 19v-3M18 19v-3M6 8V5M10 8V5M14 8V5M18 8V5"/><rect x="2" y="8" width="20" height="8" rx="1"/></svg>
                  </span>
                  <span className="edge-lineup__spec-label">Memory</span>
                  <span className="edge-lineup__spec-value">Up to 16GB DDR5</span>
                </div>
                <div className="edge-lineup__spec-row">
                  <span className="edge-lineup__spec-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="6" cy="12" r="1.5"/><path d="M12 12h6"/></svg>
                  </span>
                  <span className="edge-lineup__spec-label">Storage</span>
                  <span className="edge-lineup__spec-value">Up to 1TB NVMe</span>
                </div>
                <div className="edge-lineup__spec-row">
                  <span className="edge-lineup__spec-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><rect x="2" y="8" width="20" height="8" rx="2"/><path d="M6 12h.01M10 12h.01M14 12h.01M18 12h.01"/></svg>
                  </span>
                  <span className="edge-lineup__spec-label">Ports</span>
                  <span className="edge-lineup__spec-value">1x 2.5GbE, 4x USB 3.2</span>
                </div>
                <div className="edge-lineup__spec-row">
                  <span className="edge-lineup__spec-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
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
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/></svg>
                  </span>
                  <span className="edge-lineup__spec-label">Processor</span>
                  <span className="edge-lineup__spec-value">Intel® Core™ i9-13900E</span>
                </div>
                <div className="edge-lineup__spec-row">
                  <span className="edge-lineup__spec-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><path d="M6 19v-3M10 19v-3M14 19v-3M18 19v-3M6 8V5M10 8V5M14 8V5M18 8V5"/><rect x="2" y="8" width="20" height="8" rx="1"/></svg>
                  </span>
                  <span className="edge-lineup__spec-label">Memory</span>
                  <span className="edge-lineup__spec-value">Up to 64GB DDR5</span>
                </div>
                <div className="edge-lineup__spec-row">
                  <span className="edge-lineup__spec-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="6" cy="12" r="1.5"/><path d="M12 12h6"/></svg>
                  </span>
                  <span className="edge-lineup__spec-label">Storage</span>
                  <span className="edge-lineup__spec-value">Up to 4TB NVMe</span>
                </div>
                <div className="edge-lineup__spec-row">
                  <span className="edge-lineup__spec-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><rect x="2" y="8" width="20" height="8" rx="2"/><path d="M6 12h.01M10 12h.01M14 12h.01M18 12h.01"/></svg>
                  </span>
                  <span className="edge-lineup__spec-label">Ports</span>
                  <span className="edge-lineup__spec-value">3x 2.5GbE, 6x USB 3.2</span>
                </div>
                <div className="edge-lineup__spec-row">
                  <span className="edge-lineup__spec-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
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
