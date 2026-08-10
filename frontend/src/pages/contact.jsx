import React from 'react';
import { OfficeGrid, SectionIntro, contact, keepFinalSectionVisibleAtPageEnd } from './page_shared';

export default function ContactPage() {
  const motionRoot = React.useRef(null);

  React.useLayoutEffect(() => {
    const root = motionRoot.current;
    if (!root) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const selectors = [
      '.contact-hero h1',
      '.contact-panel',
      '.split-heading .section-intro h2',
      '.application-list > div',
      '.contact-page .section:not(.surface-transition) > .site-container > .section-heading',
      '.contact-page .office-grid article',
    ];

    const items = [...root.querySelectorAll(selectors.join(','))];
    const syncItem = (item) => {
      const bounds = item.getBoundingClientRect();
      const visible = keepFinalSectionVisibleAtPageEnd(item, root) || (item.classList.contains('is-contact-motion-visible')
        ? bounds.top <= window.innerHeight * 1.05 && bounds.bottom >= window.innerHeight * -0.05
        : bounds.top <= window.innerHeight * 0.92 && bounds.bottom >= window.innerHeight * 0.01);
      item.classList.toggle('is-contact-motion-visible', reducedMotion.matches || visible);
    };

    items.forEach((item, index) => {
      item.classList.add('contact-motion-item');
      item.style.setProperty('--contact-motion-order', index % 8);
    });
    root.classList.add('contact-motion-ready');
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
    <div className="site-page contact-page" ref={motionRoot}>
      <section className="contact-hero surface-band surface-band--ink">
        <div className="contact-hero__grid" aria-hidden="true" />
        <div className="site-container contact-hero__inner">
          <div>
            <h1 tabIndex="-1">Discuss ZMD hardware for your portfolio or deployment</h1>
          </div>
          <div className="contact-panel">
            <span className="micro-label">Sales enquiries</span>
            <a className="contact-panel__primary" href={`mailto:${contact.email}`}>{contact.email} <span aria-hidden="true">↗</span></a>
            <a className="contact-panel__primary" href={`tel:${contact.phoneHref}`}>{contact.phone} <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>
      <section className="section section--paper surface-transition surface-transition--light surface-band surface-band--neutral">
        <div className="site-container split-heading">
          <SectionIntro title="Enquiry types" />
          <div className="application-list">
            {[
              'Source white-label hardware for an OEM portfolio',
              'Select Cameras, Compact Edge Systems, AI Datacenter Servers or Custom IoT Products',
              'Discuss distribution and systems-integration requirements',
              'Plan a solution-partner-led deployment',
            ].map((label) => <div key={label}><strong>{label}</strong></div>)}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="site-container">
          <h2 className="section-heading">Locations</h2>
          <OfficeGrid contactPage />
        </div>
      </section>
    </div>
  );
}
