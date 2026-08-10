import React from 'react';
import { Link } from 'react-router-dom';
import { ArchitectureStory, ArrowButton, SectionIntro, ZevricHero, edgeAIApplications, edgeAIArchitecture, keepFinalSectionVisibleAtPageEnd } from './page_shared';

export default function EdgeAIPage() {
  const motionRoot = React.useRef(null);

  React.useLayoutEffect(() => {
    const root = motionRoot.current;
    if (!root) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const selectors = [
      '.zevric-shared-hero__copy h1',
      '.zevric-shared-hero__copy > p',
      '.zevric-shared-hero__actions .button',
      '.zevric-shared-hero__visual',
      '.edge-ai-principles h2',
      '.edge-ai-principles__grid > div',
      '.edge-ai-architecture .section-intro h2',
      '.edge-ai-architecture .section-intro p',
      '.edge-ai-architecture .physical-ai-story__group',
      '.edge-ai-architecture .physical-ai-story__stage',
      '.edge-ai-applications .section-intro h2',
      '.edge-ai-application-card',
      '.edge-ai-platform-choice__inner > div:first-child',
      '.edge-ai-platform-choice__inner > div:last-child',
    ];

    const items = [...root.querySelectorAll(selectors.join(','))];
    const syncItem = (item) => {
      const bounds = item.getBoundingClientRect();
      const visible = keepFinalSectionVisibleAtPageEnd(item, root) || (item.classList.contains('is-edge-motion-visible')
        ? bounds.top <= window.innerHeight * 1.05 && bounds.bottom >= window.innerHeight * -0.05
        : bounds.top <= window.innerHeight * 0.92 && bounds.bottom >= window.innerHeight * 0.01);
      item.classList.toggle('is-edge-motion-visible', reducedMotion.matches || visible);
    };

    items.forEach((item, index) => {
      item.classList.add('edge-motion-item');
      item.style.setProperty('--edge-motion-order', index % 8);
    });
    root.classList.add('edge-motion-ready');
    items.forEach(syncItem);

    const observer = new IntersectionObserver(
      (entries) => entries.forEach(({ target }) => syncItem(target)),
      { threshold: 0.01, rootMargin: '0px 0px -7% 0px' },
    );
    items.forEach((item) => observer.observe(item));

    let frame = 0;
    const syncAll = () => {
      if (frame || reducedMotion.matches) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        items.forEach(syncItem);
      });
    };
    window.addEventListener('scroll', syncAll, { passive: true });
    window.addEventListener('resize', syncAll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', syncAll);
      window.removeEventListener('resize', syncAll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="site-page edge-ai-page-new" ref={motionRoot}>
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
            variant="solutions"
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
