import React from 'react';
import { AUTO_CAROUSEL_INTERVAL, ArrowButton, CameraModelCard, OEMEngagement, ProductApplicationCards, ProductHighlights, ProductStoryHero, SectionIntro, ServerSpecificationTable, keepFinalSectionVisibleAtPageEnd, serverApplications, serverModels, serverPlatformViews, serverStorageProfiles } from '../page_shared';

export default function ServersPage() {
  const motionRoot = React.useRef(null);

  React.useLayoutEffect(() => {
    const root = motionRoot.current;
    if (!root) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const selectors = [
      '.server-product-hero .product-story-hero__copy h1',
      '.server-product-hero .product-story-hero__copy > p',
      '.server-product-hero .product-story-hero__actions .button',
      '.server-product-hero .product-story-hero__visual',
      '.server-product-hero .product-story-hero__controls',
      '.product-highlight-band__grid > div',
      '#server-models .section-intro h2',
      '#server-models .camera-model-card',
      '.server-storage-profiles h3',
      '.server-storage-profiles span',
      '.server-specifications .section-intro h2',
      '.server-specifications .section-intro p',
      '.server-specifications table',
      '.server-specifications tbody tr',
      '.server-specifications .content-qualifier',
      '#server-applications .section-intro h2',
      '#server-applications .camera-application-grid article',
      '#server-applications .section-action',
      '.product-oem-engagement h2',
      '.product-oem-engagement p',
      '.product-oem-engagement .button',
    ];

    const items = [...root.querySelectorAll(selectors.join(','))];
    const syncItem = (item) => {
      const bounds = item.getBoundingClientRect();
      const visible = keepFinalSectionVisibleAtPageEnd(item, root) || (item.classList.contains('is-server-motion-visible')
        ? bounds.top <= window.innerHeight * 1.05 && bounds.bottom >= window.innerHeight * -0.05
        : bounds.top <= window.innerHeight * 0.92 && bounds.bottom >= window.innerHeight * 0.01);
      item.classList.toggle('is-server-motion-visible', reducedMotion.matches || visible);
    };

    items.forEach((item, index) => {
      item.classList.add('server-motion-item');
      item.style.setProperty('--server-motion-order', index % 8);
    });
    root.classList.add('server-motion-ready');
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
    <div className="site-page server-page" ref={motionRoot}>
      <ProductStoryHero
        slides={serverPlatformViews.map(([navigationLabel, image, imageAlt, surface]) => ({ navigationLabel, image, imageAlt, surface, fit: 'contain' }))}
        title="AI Datacenter Servers"
        body="RS240 2U dual-socket platform with Intel® Xeon® 6700 or 6500 Series processors, up to 8 TB DDR5 and six front-bay profiles."
        className="server-product-hero"
        autoAdvanceMs={AUTO_CAROUSEL_INTERVAL}
        primaryAction={{ label: 'View RS240 specifications', to: '/products/servers#technical-specifications' }}
        secondaryAction={{ label: 'Define a server configuration', to: '/contact' }}
      />
      <ProductHighlights items={[
        ['Compute', 'Dual Intel® Xeon® 6700 or 6500 Series'],
        ['Memory', '32 DIMMs, up to 8 TB DDR5'],
        ['Storage', 'Up to 24 drive bays'],
        ['Power', '3000 W redundant 1+1 Titanium'],
      ]} />
      <section className="section section--paper camera-models surface-band surface-band--neutral" id="server-models">
        <div className="site-container">
          <SectionIntro title="Server formats" />
          <div className="camera-model-grid">
            {serverModels.map((product) => <CameraModelCard key={product.slug} product={product} />)}
          </div>
          <div className="server-storage-profiles" aria-label="Server drive-bay configurations">
            <h3>Drive-bay configurations</h3>
            <div>
              {serverStorageProfiles.map(([configuration, interfaceType]) => (
                <span key={`${configuration}-${interfaceType}`}>
                  <strong>{configuration}</strong>
                  <small>{interfaceType}</small>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section camera-specifications server-specifications" id="technical-specifications">
        <div className="site-container">
          <SectionIntro title="RS240 specifications" body="Published RS240 platform specifications." light />
          <ServerSpecificationTable />
          <p className="content-qualifier">Images are illustrative. Final configuration, availability, lead time and certification scope are confirmed with ZMD.</p>
        </div>
      </section>
      <section className="section camera-applications surface-band surface-band--neutral" id="server-applications">
        <div className="site-container">
          <SectionIntro title="Workload areas" />
          <ProductApplicationCards items={serverApplications} />
          <div className="section-action"><ArrowButton to="/solutions" secondary>View solution areas</ArrowButton></div>
        </div>
      </section>
      <OEMEngagement
        title="Configure AI Datacenter Servers for your portfolio"
        body="Share workload, facility, branding and supply requirements for an RS240 configuration."
        action="Start a server enquiry"
      />
    </div>
  );
}
