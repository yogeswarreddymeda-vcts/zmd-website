// =============================================================================
// CONTACT PAGE
// =============================================================================

import React from 'react';
import '../assets/css/Contact.css';

const contact = {
  email: 'sales@zmd.tech',
  phone: '+91 99403 52194',
  phoneHref: '+919940352194',
  offices: [
    { city: 'Bengaluru', address: 'Sy. No. 65/6, Nallurahalli Main Road, Mourya Building, near HP Petrol Pump, Whitefield, Bengaluru, Karnataka 560066' },
    { city: 'Hyderabad', address: '4th Floor, Plot No. 6, Sector 3, HUDA Techno Enclave, Madhapur, Hyderabad, Telangana, India 500081' },
    { city: 'Taiwan', address: '13F, No. 102, Sec. 2, Zhongcheng Road, Shilin District, Taipei City 111019, Taiwan (R.O.C.)' },
    { city: 'China' },
  ],
};

function OfficeGrid() {
  return (
    <div className="office-grid">
      {contact.offices.map((office) => (
        <article className={!office.address ? 'office-grid__item--location-only' : undefined} key={office.city}>
          <h3>{office.city}{office.label && <small>{office.label}</small>}</h3>
          {office.address
            ? <p>{office.address}</p>
            : <a className="office-grid__request" href={`mailto:${contact.email}?subject=${encodeURIComponent(`${office.city} office details`)}`}>Address available on request <span aria-hidden="true">↗</span></a>}
        </article>
      ))}
    </div>
  );
}

function keepFinalSectionVisibleAtPageEnd(element, pageRoot) {
  const finalSection = [...pageRoot.children].reverse().find((child) => child.tagName === 'SECTION');
  if (!finalSection?.contains(element)) return false;
  const pageHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
  return Math.ceil(window.scrollY + window.innerHeight) >= pageHeight - 8;
}

function SectionIntro({ eyebrow, title, body, light = false, align = 'left', variant = 'plain', headingLevel = 'h2' }) {
  const Heading = headingLevel;
  return (
    <div className={`section-intro section-intro--${variant} section-intro--${align} ${light ? 'section-intro--light' : ''}`}>
      {variant === 'split' && eyebrow && <div className="section-intro__label">{eyebrow}</div>}
      <div className="section-intro__content">
        <Heading>{title}</Heading>
        {body && <p>{body}</p>}
      </div>
    </div>
  );
}

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


      {/* ========================== CONTACT HERO SECTION ========================== */}


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


      {/* ======================== ENQUIRY TYPES SECTION ======================== */}


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


      {/* ======================== OFFICE LOCATIONS SECTION ======================== */}


      <section className="section">
        <div className="site-container">
          <h2 className="section-heading">Locations</h2>
          <OfficeGrid />
        </div>
      </section>
    </div>
  );
}
