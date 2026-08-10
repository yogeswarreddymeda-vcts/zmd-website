import React from 'react';
import { AUTO_CAROUSEL_INTERVAL, ArrowButton, CustomIoTVisual, IoTSpecificationTable, OEMEngagement, ProductApplicationCards, ProductHighlights, ProductStoryHero, SectionIntro, assets, customIotProducts, iotApplications, keepFinalSectionVisibleAtPageEnd } from '../page_shared';

export default function CustomIoTPage() {
  const motionRoot = React.useRef(null);

  React.useLayoutEffect(() => {
    const root = motionRoot.current;
    if (!root) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const selectors = [
      '.iot-product-hero .product-story-hero__copy h1',
      '.iot-product-hero .product-story-hero__copy > p',
      '.iot-product-hero .product-story-hero__actions .button',
      '.iot-product-hero .product-story-hero__visual',
      '.iot-product-hero .product-story-hero__controls',
      '.product-highlight-band__grid > div',
      '#available-products .section-intro h2',
      '.custom-iot-model-card',
      '.iot-specifications .section-intro h2',
      '.iot-specifications table',
      '.iot-specifications tbody tr',
      '.iot-specifications .content-qualifier',
      '#iot-applications .section-intro h2',
      '#iot-applications .camera-application-grid article',
      '#iot-applications .section-action',
      '.product-oem-engagement h2',
      '.product-oem-engagement p',
      '.product-oem-engagement .button',
    ];

    const items = [...root.querySelectorAll(selectors.join(','))];
    const syncItem = (item) => {
      const bounds = item.getBoundingClientRect();
      const visible = keepFinalSectionVisibleAtPageEnd(item, root) || (item.classList.contains('is-iot-motion-visible')
        ? bounds.top <= window.innerHeight * 1.05 && bounds.bottom >= window.innerHeight * -0.05
        : bounds.top <= window.innerHeight * 0.92 && bounds.bottom >= window.innerHeight * 0.01);
      item.classList.toggle('is-iot-motion-visible', reducedMotion.matches || visible);
    };

    items.forEach((item, index) => {
      item.classList.add('iot-motion-item');
      item.style.setProperty('--iot-motion-order', index % 8);
    });
    root.classList.add('iot-motion-ready');
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
    <div className="site-page custom-iot-page" ref={motionRoot}>
      <ProductStoryHero
        slides={[
          { navigationLabel: 'Safety Band', image: assets.safetyBandContext, imageAlt: 'Industrial worker wearing an illustrative ZMD Safety Band', caption: 'Safety Band configuration' },
          { navigationLabel: 'Parking Sensor', image: assets.parkingSensorContextV2, imageAlt: 'ZMD Parking Sensor installed near a parked vehicle', caption: 'Parking Sensor configuration' },
        ]}
        title="Custom IoT Products"
        body="Available Safety Band and Parking Sensor products, plus custom sensing-hardware programs for OEM portfolios."
        className="iot-product-hero"
        autoAdvanceMs={AUTO_CAROUSEL_INTERVAL}
        primaryAction={{ label: 'View products', to: '/products/custom-iot#available-products' }}
        secondaryAction={{ label: 'Discuss an IoT product', to: '/contact' }}
      />
      <ProductHighlights items={[
        ['Safety Band', 'Environmental and wearable sensing'],
        ['Safety', 'Fall detection and SOS'],
        ['Parking Sensor', 'Magnetometer occupancy detection'],
        ['Supply', 'Standard, branded or custom configurations'],
      ]} />

      <section className="section section--paper camera-models surface-band surface-band--neutral" id="available-products">
        <div className="site-container">
          <SectionIntro title="Available products" />
          <div className="camera-model-grid custom-iot-model-grid">
            {customIotProducts.map((product) => (
              <article className="camera-model-card custom-iot-model-card" id={product.slug} key={product.slug}>
                <div className="camera-model-card__visual">
                  {product.image
                    ? <img src={product.image} alt={product.imageAlt} loading="lazy" decoding="async" />
                    : <CustomIoTVisual type={product.visual} />}
                </div>
                <div className="camera-model-card__body">
                  <div className="camera-model-card__meta"><strong>{product.category}</strong></div>
                  <h3>{product.name}</h3>
                  <p>{product.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section camera-specifications iot-specifications" id="technical-specifications">
        <div className="site-container">
          <SectionIntro title="Technical specifications" light />
          <IoTSpecificationTable />
          <p className="content-qualifier">Final component selection, software integration, certification scope and availability are confirmed with ZMD.</p>
        </div>
      </section>

      <section className="section camera-applications surface-band surface-band--neutral" id="iot-applications">
        <div className="site-container">
          <SectionIntro title="Application areas" />
          <ProductApplicationCards items={iotApplications} />
          <div className="section-action"><ArrowButton to="/solutions" secondary>View solution areas</ArrowButton></div>
        </div>
      </section>
      <OEMEngagement
        title="Add Custom IoT Products to your portfolio"
        body="Discuss standard, branded or custom Safety Band and Parking Sensor configurations with ZMD."
        action="Start an IoT enquiry"
      />
    </div>
  );
}
