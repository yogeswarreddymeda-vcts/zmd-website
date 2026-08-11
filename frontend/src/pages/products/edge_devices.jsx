import React from 'react';
import { Link } from 'react-router-dom';
import { AUTO_CAROUSEL_INTERVAL, ArrowButton, ProductStoryHero, SectionIntro, SpecValue, ZevricProductGrid, assets, edgeProducts, keepFinalSectionVisibleAtPageEnd, zevricComparisonRows, zevricHeroSlides, zevricPlatformFeatures, zevricPlatformSpecs } from '../page_shared';

export default function EdgeDevicesPage() {
  const motionRoot = React.useRef(null);

  React.useLayoutEffect(() => {
    const root = motionRoot.current;
    if (!root) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const selectors = [
      '.zevric-product-hero .product-story-hero__copy h1',
      '.zevric-product-hero .product-story-hero__copy > p',
      '.zevric-product-hero .product-story-hero__actions .button',
      '.zevric-product-hero .product-story-hero__visual',
      '.zevric-product-hero .product-story-hero__controls',
      '.zevric-overview__grid > div',
      '.zevric-lineup .section-intro h2',
      '.zevric-lineup__guide',
      '.zevric-card',
      '.zevric-lineup > .site-container > .content-qualifier',
      '.zevric-comparison h2',
      '.zevric-comparison__table-scroll',
      '.zevric-platform .section-intro h2',
      '.zevric-platform__visual',
      '.zevric-platform__specs > div',
      '.zevric-feature-grid article',
      '.zevric-product-bridge__copy > *',
      '.zevric-product-bridge__visual',
      '.zevric-oem-cta h2',
      '.zevric-oem-cta p',
      '.zevric-oem-cta .button',
    ];

    const items = [...root.querySelectorAll(selectors.join(','))];
    const syncItem = (item) => {
      const bounds = item.getBoundingClientRect();
      const visible = keepFinalSectionVisibleAtPageEnd(item, root) || (item.classList.contains('is-zevric-motion-visible')
        ? bounds.top <= window.innerHeight * 1.05 && bounds.bottom >= window.innerHeight * -0.05
        : bounds.top <= window.innerHeight * 0.92 && bounds.bottom >= window.innerHeight * 0.01);
      item.classList.toggle('is-zevric-motion-visible', reducedMotion.matches || visible);
    };

    items.forEach((item, index) => {
      item.classList.add('zevric-motion-item');
      item.style.setProperty('--zevric-motion-order', index % 8);
    });
    root.classList.add('zevric-motion-ready');
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
    <div className="site-page zevric-product-page" ref={motionRoot}>
      <ProductStoryHero
        slides={zevricHeroSlides}
        title="Zevric Compact Edge Systems"
        body="Select processor, cooling and accelerator options on a shared Mini-ITX hardware platform."
        className="zevric-product-hero zevric-product-hero--blueprint"
        autoAdvanceMs={AUTO_CAROUSEL_INTERVAL}
        primaryAction={{ label: 'Compare configurations', to: '/products/edge-devices#configurations' }}
        secondaryAction={{ label: 'Discuss a Zevric configuration', to: '/contact' }}
      />
      <section className="zevric-overview" aria-label="Shared Zevric platform">
        <div className="site-container zevric-overview__grid">
          <div><span>Shared foundation</span><strong>One Mini-ITX board and I/O topology</strong></div>
          <div><span>Workload choice</span><strong>Core Ultra 5, 7 or 9 configurations</strong></div>
          <div><span>Expansion path</span><strong>Integrated acceleration or discrete GPU</strong></div>
          <div><span>Industrial connectivity</span><strong>Dual LAN, display and expansion interfaces</strong></div>
        </div>
      </section>
      <section className="section section--paper surface-transition surface-transition--light zevric-lineup edge-surface-motif edge-surface-motif--technical" id="configurations">
        <div className="site-container">
          <SectionIntro title="Three Zevric configurations" />
          <div className="zevric-lineup__guide">
            <p>Three processor levels, including one discrete-GPU configuration, on a shared board and I/O platform.</p>
          </div>
          <ZevricProductGrid />
          <p className="content-qualifier zevric-lineup__disclaimer">
            <small>Disclaimer</small>
            TOPS values are peak silicon specifications for the stated accelerator, not measured application performance. Product imagery is representative.
          </p>
          <div className="zevric-comparison" id="comparison">
            <h2 id="zevric-comparison-title">Configuration comparison</h2>
            <div className="zevric-comparison__table-scroll" role="region" aria-labelledby="zevric-comparison-title" tabIndex="0">
              <table>
                <caption>Comparison of Zevric Compact Edge System configurations</caption>
                <thead>
                  <tr>
                    <th scope="col">Specification</th>
                    {edgeProducts.map((product) => (
                      <th scope="col" key={product.slug}>
                        {product.name}<small>{product.sku}</small>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {zevricComparisonRows.map(([label, key]) => (
                    <tr key={key}>
                      <th scope="row">{label}</th>
                      {edgeProducts.map((product, productIndex) => (
                        <td
                          data-label={product.name}
                          key={product.slug}
                        >
                          <span className={productIndex === 0 || productIndex === 2 ? 'zevric-comparison__blurred-content' : undefined}>
                            <SpecValue value={key === 'processor' ? product.processor : product.comparison[key]} />
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="zevric-comparison__column-status zevric-comparison__column-status--nano">
                <span>Coming soon</span>
              </div>
              <div className="zevric-comparison__column-status zevric-comparison__column-status--ultra">
                <span>Coming soon</span>
              </div>
            </div>
          </div>
          <p className="content-qualifier"><sup className="pending-mark" aria-hidden="true">†</sup> Proposed value pending engineering validation.</p>
        </div>
      </section>

      <section className="section zevric-platform edge-surface-motif edge-surface-motif--technical" id="platform">
        <div className="site-container">
          <SectionIntro title="Shared platform" />
          <div className="zevric-platform__layout">
            <div className="zevric-platform__visual">
              <img src={assets.edgeSharedPlatform} alt="Zevric Compact Edge System illustrative configuration" loading="lazy" decoding="async" />
              <span>Illustrative configuration</span>
            </div>
            <dl className="zevric-platform__specs">
              {zevricPlatformSpecs.map(([label, value]) => (
                <div key={label}><dt>{label}</dt><dd><SpecValue value={value} /></dd></div>
              ))}
            </dl>
          </div>
          <div className="zevric-feature-grid">
            {zevricPlatformFeatures.map(([title, description], index) => (
              <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section zevric-product-bridge">
        <div className="site-container zevric-product-bridge__inner">
          <div className="zevric-product-bridge__copy">
            <span className="micro-label">Edge AI</span>
            <h2>Zevric in Edge AI deployments</h2>
            <p>Possible applications include local video processing, industrial inspection, site intelligence and distributed operations. Customers and integrators choose the runtime, models, applications and integrations.</p>
            <Link className="text-link" to="/edge-ai#applications">Explore Edge AI applications <span aria-hidden="true">→</span></Link>
          </div>
          <div className="zevric-product-bridge__visual">
            <img src={assets.cameraApplicationIndustrial} alt="Industrial site using cameras and local vision processing" loading="lazy" decoding="async" />
          </div>
        </div>
      </section>

      <section className="section zevric-oem-cta">
        <div className="site-container zevric-oem-cta__inner">
          <div className="edge-surface-motif edge-surface-motif--blueprint">
            <h2>Zevric for OEM portfolios</h2>
            <p>ZMD offers Zevric in standard, branded and white-label configurations.</p>
          </div>
          <ArrowButton to="/contact" light>Discuss a Zevric configuration</ArrowButton>
        </div>
      </section>
    </div>
  );
}
