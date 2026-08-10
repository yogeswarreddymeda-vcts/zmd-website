import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowButton, HomeProductFeature, HomeSolutionsCarousel, PhysicalAIStory, SectionIntro, assets, homeProductSlides, keepFinalSectionVisibleAtPageEnd, solutions } from './page_shared';

export default function HomePage() {
  const motionRoot = React.useRef(null);

  React.useLayoutEffect(() => {
    const root = motionRoot.current;
    if (!root) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const selectors = [
      '.home-hero__copy > h1',
      '.home-hero__copy > p',
      '.home-hero__actions .button',
      '.hero-catalog__panel',
      '.physical-ai-section__intro .section-intro h2',
      '.physical-ai-section__intro .section-intro p',
      '.physical-ai-story__group',
      '.physical-ai-story__stage',
      '.home-product-feature__copy > *',
      '.home-product-feature__visual',
      '.home-product-feature__controls',
      '.solutions-preview .section-intro h2',
      '.solution-preview-card',
      '.home-solutions-carousel__footer > *',
    ];

    let revealObserver;
    const registered = new WeakSet();

    const registerMotionElements = () => {
      const elements = root.querySelectorAll(selectors.join(','));
      elements.forEach((element, index) => {
        if (registered.has(element)) return;
        registered.add(element);
        element.classList.add('home-motion-item');
        element.style.setProperty('--home-motion-order', index % 8);
        if (reducedMotion.matches) {
          element.classList.add('is-motion-visible');
        } else {
          revealObserver.observe(element);
        }
      });
    };

    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const bounds = entry.target.getBoundingClientRect();
        const isVisible = keepFinalSectionVisibleAtPageEnd(entry.target, root)
          || (bounds.top <= window.innerHeight * 0.93 && bounds.bottom >= window.innerHeight * 0.01);
        entry.target.classList.toggle('is-motion-visible', isVisible);
      });
    }, { threshold: 0.01, rootMargin: '0px 0px -7% 0px' });

    const revealVisibleElements = () => {
      root.querySelectorAll('.home-motion-item').forEach((element) => {
        const bounds = element.getBoundingClientRect();
        const isVisible = keepFinalSectionVisibleAtPageEnd(element, root)
          || (bounds.top <= window.innerHeight * 0.93 && bounds.bottom >= window.innerHeight * 0.01);
        element.classList.toggle('is-motion-visible', isVisible);
      });
    };

    root.classList.add('home-motion-ready');
    registerMotionElements();
    revealVisibleElements();

    const mutationObserver = new MutationObserver(() => {
      registerMotionElements();
      revealVisibleElements();
    });
    mutationObserver.observe(root, { childList: true, subtree: true });

    let frame = 0;
    const updateMotionPosition = () => {
      frame = 0;
      const bounds = root.getBoundingClientRect();
      root.style.setProperty('--home-scroll-progress', Math.max(-1, Math.min(1, -bounds.top / Math.max(window.innerHeight, 1))).toFixed(4));
      revealVisibleElements();
    };
    const handleScroll = () => {
      if (frame || reducedMotion.matches) return;
      frame = window.requestAnimationFrame(updateMotionPosition);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    updateMotionPosition();

    return () => {
      mutationObserver.disconnect();
      revealObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="site-page home-page" ref={motionRoot}>
      <section className="home-hero">
        <div className="site-container home-hero__inner">
          <div className="home-hero__copy">
            <h1 tabIndex="-1">Complete hardware products for <span>OEM portfolios.</span></h1>
            <p>ZMD is the ODM partner behind complete product families for OEM portfolios: Cameras, Compact Edge Systems, AI Datacenter Servers and Custom IoT Products.</p>
            <div className="home-hero__actions">
              <ArrowButton to="/contact">Partner with ZMD</ArrowButton>
              <ArrowButton to="/products" secondary>View products</ArrowButton>
            </div>
          </div>

          <div className="hero-catalog" aria-label="ZMD product portfolio">
            <Link className="hero-catalog__panel hero-catalog__panel--edge" to="/products/edge-devices">
              <strong>Zevric Compact Edge Systems</strong>
              <img src={assets.homeEdgeIndustrial} alt="Zevric Compact Edge System in a precision electronics lab" fetchPriority="high" />
            </Link>
            <div className="hero-catalog__secondary">
              <Link className="hero-catalog__panel hero-catalog__panel--camera" to="/products/cameras">
                <strong>Cameras</strong>
                <img src={assets.homeCameraIndustrial} alt="ZMD dual-lens camera mounted above an enterprise entrance" />
              </Link>
              <Link className="hero-catalog__panel hero-catalog__panel--server" to="/products/servers">
                <strong>AI Datacenter Servers</strong>
                <img src={assets.homeServerIndustrial} alt="ZMD AI Datacenter Server in a precision electronics lab" />
              </Link>
              <Link className="hero-catalog__panel hero-catalog__panel--iot" to="/products/custom-iot">
                <strong>Custom IoT Products</strong>
                <img src={assets.homeIotIndustrial} alt="ZMD parking sensor in a precision electronics lab" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="physical-ai-section">
        <div className="physical-ai-section__intro">
          <div className="site-container">
            <SectionIntro
              title="Building Physical AI, from sensing to action"
              body="ZMD builds the sensing and compute hardware. Customers and integrators add their chosen applications, data and integrations."
              light
            />
          </div>
        </div>
        <div className="physical-ai-section__body">
          <div className="site-container">
            <PhysicalAIStory />
          </div>
        </div>
      </section>

      <HomeProductFeature
        slides={homeProductSlides}
      />

      <section className="section solutions-preview">
        <div className="site-container">
          <SectionIntro
            title="Applications built on ZMD hardware"
          />
          <HomeSolutionsCarousel items={solutions} />
        </div>
      </section>

    </div>
  );
}
