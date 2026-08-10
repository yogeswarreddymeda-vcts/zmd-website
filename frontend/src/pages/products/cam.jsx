import React from 'react';
import { AUTO_CAROUSEL_INTERVAL, ArrowButton, CameraModelCard, CameraSpecificationTable, OEMEngagement, ProductApplicationCards, ProductHighlights, ProductStoryHero, SectionIntro, cameraApplicationVisuals, cameraHeroSlides, cameraProducts, keepFinalSectionVisibleAtPageEnd } from '../page_shared';

export default function CamerasPage() {
  const motionRoot = React.useRef(null);

  React.useLayoutEffect(() => {
    const root = motionRoot.current;
    if (!root) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const selectors = [
      '.camera-story-hero .product-story-hero__copy h1',
      '.camera-story-hero .product-story-hero__copy > p',
      '.camera-story-hero .product-story-hero__actions .button',
      '.camera-story-hero .product-story-hero__visual',
      '.camera-story-hero .product-story-hero__controls',
      '.product-highlight-band__grid > div',
      '.camera-models .section-intro h2',
      '.camera-model-card',
      '.camera-specifications .section-intro h2',
      '.camera-specification-tabs button',
      '.camera-specification-table',
      '.camera-specification-table tbody tr',
      '.camera-specifications .content-qualifier',
      '.camera-applications .section-intro h2',
      '.camera-application-grid article',
      '.camera-applications .section-action',
      '.product-oem-engagement h2',
      '.product-oem-engagement p',
      '.product-oem-engagement .button',
    ];

    let revealObserver;
    const registered = new WeakSet();

    const syncElementVisibility = (element) => {
      const bounds = element.getBoundingClientRect();
      const wasVisible = element.classList.contains('is-camera-motion-visible');
      const isVisible = keepFinalSectionVisibleAtPageEnd(element, root) || (wasVisible
        ? bounds.top <= window.innerHeight * 1.05 && bounds.bottom >= window.innerHeight * -0.05
        : bounds.top <= window.innerHeight * 0.92 && bounds.bottom >= window.innerHeight * 0.01);
      element.classList.toggle('is-camera-motion-visible', reducedMotion.matches || isVisible);
    };

    const syncVisibility = () => {
      root.querySelectorAll('.camera-motion-item').forEach(syncElementVisibility);
    };

    const registerElements = () => {
      root.querySelectorAll(selectors.join(',')).forEach((element, index) => {
        if (registered.has(element)) return;
        registered.add(element);
        element.classList.add('camera-motion-item');
        element.style.setProperty('--camera-motion-order', index % 8);
        if (reducedMotion.matches) element.classList.add('is-camera-motion-visible');
        else revealObserver.observe(element);
      });
    };

    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        syncElementVisibility(entry.target);
      });
    }, { threshold: 0.01, rootMargin: '0px 0px -7% 0px' });

    root.classList.add('camera-motion-ready');
    registerElements();
    syncVisibility();

    const mutationObserver = new MutationObserver(() => {
      registerElements();
      syncVisibility();
    });
    mutationObserver.observe(root, { childList: true, subtree: true });

    let frame = 0;
    const handleScroll = () => {
      if (frame || reducedMotion.matches) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        syncVisibility();
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      mutationObserver.disconnect();
      revealObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="site-page camera-page" ref={motionRoot}>
      <ProductStoryHero
        slides={cameraHeroSlides}
        title="Cameras for OEM portfolios"
        body="Three formats for panoramic, directional and hands-free imaging."
        className="camera-story-hero"
        autoAdvanceMs={AUTO_CAROUSEL_INTERVAL}
        primaryAction={{ label: 'View camera models', to: '/products/cameras#camera-models' }}
        secondaryAction={{ label: 'Discuss camera requirements', to: '/contact' }}
        tone="navy"
      />
      <ProductHighlights
        items={[
          ['Imaging', '2 MP per sensor'],
          ['Coverage', '180° panoramic or 110° wide'],
          ['On-device AI', '14 analytics engines'],
          ['Local storage', 'MicroSD up to 512 GB'],
        ]}
      />
      <section className="section section--paper camera-models surface-band surface-band--neutral" id="camera-models">
        <div className="site-container">
          <SectionIntro title="Camera models" />
          <div className="camera-model-grid">
            {cameraProducts.map((product) => <CameraModelCard key={product.slug} product={product} />)}
          </div>
        </div>
      </section>
      <section className="section camera-specifications" id="camera-specifications">
        <div className="site-container">
          <SectionIntro
            title="Specifications"
            light
          />
          <CameraSpecificationTable />
          <p className="content-qualifier">Specifications below cover Dual Lens and Single Lens models. Bullet Camera and Head-Mount Camera configuration details are available from ZMD.</p>
        </div>
      </section>
      <section className="section camera-applications surface-band surface-band--neutral" id="camera-applications">
        <div className="site-container">
          <SectionIntro title="Application areas" />
          <ProductApplicationCards items={cameraApplicationVisuals} />
          <div className="section-action"><ArrowButton to="/solutions" secondary>View solution areas</ArrowButton></div>
        </div>
      </section>
      <OEMEngagement
        title="Add ZMD Cameras to your portfolio"
        body="Discuss standard, branded or white-label Camera configurations and supply requirements."
        action="Discuss camera requirements"
      />
    </div>
  );
}
