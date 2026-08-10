import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowButton, PageHero, assets, keepFinalSectionVisibleAtPageEnd } from '../page_shared';

export default function ProductsPage() {
  const motionRoot = React.useRef(null);

  React.useLayoutEffect(() => {
    const root = motionRoot.current;
    if (!root) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const selectors = [
      '.page-hero__copy h1',
      '.page-hero__copy > p',
      '.page-hero__actions .button',
      '.page-hero__visual',
      '.product-hub-index__item',
      '.product-hub-family__visual',
      '.product-hub-family__content h2',
      '.product-hub-family__content > p',
      '.product-hub-family__content > .button',
      '.product-hub-iot-visual > div',
      '.product-hub-engagement h2',
      '.product-hub-engagement p',
      '.product-hub-engagement .button',
    ];
    const elements = root.querySelectorAll(selectors.join(','));

    const revealVisibleElements = () => {
      elements.forEach((element) => {
        const bounds = element.getBoundingClientRect();
        const isVisible = keepFinalSectionVisibleAtPageEnd(element, root)
          || (bounds.top <= window.innerHeight * 0.92 && bounds.bottom >= window.innerHeight * 0.01);
        element.classList.toggle('is-products-motion-visible', isVisible);
      });
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const bounds = entry.target.getBoundingClientRect();
        const isVisible = keepFinalSectionVisibleAtPageEnd(entry.target, root)
          || (bounds.top <= window.innerHeight * 0.92 && bounds.bottom >= window.innerHeight * 0.01);
        entry.target.classList.toggle('is-products-motion-visible', isVisible);
      });
    }, { threshold: 0.01, rootMargin: '0px 0px -7% 0px' });

    root.classList.add('products-motion-ready');
    elements.forEach((element, index) => {
      element.classList.add('products-motion-item');
      element.style.setProperty('--products-motion-order', index % 8);
      if (reducedMotion.matches) element.classList.add('is-products-motion-visible');
      else revealObserver.observe(element);
    });
    revealVisibleElements();

    let frame = 0;
    const handleScroll = () => {
      if (frame || reducedMotion.matches) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        revealVisibleElements();
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      revealObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const productHubFamilies = [
    {
      slug: 'cameras',
      name: 'Cameras',
      role: 'Visual sensing',
      description: 'Four camera formats for panoramic, fixed, directional and hands-free imaging.',
      action: 'Explore camera models',
      to: '/products/cameras',
      image: assets.homeCameraIndustrial,
      imageAlt: 'ZMD camera installed above a commercial entrance',
      surface: 'white',
    },
    {
      slug: 'zevric',
      name: 'Zevric Compact Edge Systems',
      role: 'Local AI compute',
      description: 'Four configurations for local AI inference, video processing and industrial edge deployments.',
      action: 'Compare Zevric models',
      to: '/products/edge-devices',
      image: assets.homeEdgeIndustrial,
      imageAlt: 'Zevric Compact Edge System in a precision electronics environment',
      surface: 'neutral',
      reverse: true,
    },
    {
      slug: 'servers',
      name: 'AI Datacenter Servers',
      role: 'Datacenter compute',
      description: 'Centralized compute platforms for AI processing, storage and multi-site infrastructure.',
      action: 'Explore server platforms',
      to: '/products/servers',
      image: assets.homeServerIndustrial,
      imageAlt: 'ZMD AI Datacenter Server in a datacenter environment',
      surface: 'white',
    },
    {
      slug: 'custom-iot',
      name: 'Custom IoT Products',
      role: 'Connected sensing',
      description: 'Available Safety Band and Parking Sensor products, plus custom IoT hardware engagements.',
      action: 'Explore Custom IoT',
      to: '/products/custom-iot',
      surface: 'neutral',
      reverse: true,
      customVisual: true,
      compact: true,
    },
  ];

  return (
    <div className="site-page product-catalog-page product-hub" ref={motionRoot}>
      <PageHero
        title="Hardware products for sensing and compute"
        body="ZMD builds complete products for OEM and white-label portfolios."
        image={assets.physicalAIHardwareScene}
        imageAlt="ZMD cameras, Zevric Compact Edge Systems and an AI Datacenter Server"
        dark
        surfaceTone="ink"
      >
        <ArrowButton to="/products#product-families">Explore product families</ArrowButton>
        <ArrowButton to="/contact" secondary>Partner with ZMD</ArrowButton>
      </PageHero>

      <nav className="product-hub-index" id="product-families" aria-label="Product families">
        <div className="site-container product-hub-index__track">
          {productHubFamilies.map((family) => (
            <Link className="product-hub-index__item" to={`/products#${family.slug}`} key={family.slug}>
              <span>{family.name}</span>
              <small>{family.role}</small>
              <i aria-hidden="true">↓</i>
            </Link>
          ))}
        </div>
      </nav>

      <div className="product-hub-families">
        {productHubFamilies.map((family) => (
          <section
            className={`product-hub-family product-hub-family--${family.surface} ${family.reverse ? 'product-hub-family--reverse' : ''} ${family.compact ? 'product-hub-family--compact' : ''}`}
            id={family.slug}
            key={family.slug}
          >
            <div className="site-container product-hub-family__inner">
              <Link className="product-hub-family__visual" to={family.to} aria-label={`${family.action}: ${family.name}`}>
                {family.customVisual ? (
                  <div className="product-hub-iot-visual">
                    <div className="product-hub-iot-visual__band">
                      <img
                        src={assets.safetyBandContext}
                        alt="Industrial worker wearing a ZMD Safety Band"
                        loading="lazy"
                        decoding="async"
                      />
                      <span>Safety Band</span>
                    </div>
                    <div className="product-hub-iot-visual__sensor">
                      <img
                        src={assets.parkingSensorContextV2}
                        alt="ZMD Parking Sensor installed in a parking bay"
                        loading="lazy"
                        decoding="async"
                      />
                      <span>Parking Sensor</span>
                    </div>
                  </div>
                ) : (
                  <img src={family.image} alt={family.imageAlt} loading="lazy" decoding="async" />
                )}
              </Link>
              <div className="product-hub-family__content">
                <h2>{family.name}</h2>
                <p>{family.description}</p>
                <ArrowButton to={family.to} secondary>{family.action}</ArrowButton>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="product-hub-engagement">
        <div className="site-container product-hub-engagement__inner">
          <div>
            <h2>Discuss your product requirements</h2>
            <p>Select a product family, define the required configuration and discuss branding and supply with ZMD.</p>
          </div>
          <ArrowButton to="/contact">Contact sales</ArrowButton>
        </div>
      </section>
    </div>
  );
}
