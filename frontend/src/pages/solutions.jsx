import React from 'react';
import { ArrowButton, PageHero, SectionIntro, SharedSolutionArchitecture, SolutionCard, SolutionSection, assets, keepFinalSectionVisibleAtPageEnd, solutions } from './page_shared';

export default function SolutionsPage() {
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
      '.solution-index-section .section-intro h2',
      '.solution-preview-card',
      '.solution-architecture-section .section-intro h2',
      '.solution-architecture-section .section-intro p',
      '.physical-ai-story--solutions .physical-ai-story__group',
      '.physical-ai-story--solutions .physical-ai-story__stage',
      '.solution-architecture-caption',
      '.solution-vertical .solution-module__header',
      '.solution-vertical .solution-module__visual',
      '.solution-vertical .solution-module__applications',
      '.solution-vertical .solution-module__applications li',
      '.solution-vertical .solution-module__hardware-intro',
      '.solution-vertical .solution-module__hardware-path > div',
      '.solutions-contact-section__copy',
      '.solutions-contact-section .button',
    ];

    const items = [...root.querySelectorAll(selectors.join(','))];
    const syncItem = (item) => {
      const bounds = item.getBoundingClientRect();
      const visible = keepFinalSectionVisibleAtPageEnd(item, root) || (item.classList.contains('is-solutions-motion-visible')
        ? bounds.top <= window.innerHeight * 1.05 && bounds.bottom >= window.innerHeight * -0.05
        : bounds.top <= window.innerHeight * 0.92 && bounds.bottom >= window.innerHeight * 0.01);
      item.classList.toggle('is-solutions-motion-visible', reducedMotion.matches || visible);
    };

    items.forEach((item, index) => {
      item.classList.add('solutions-motion-item');
      item.style.setProperty('--solutions-motion-order', index % 8);
    });
    root.classList.add('solutions-motion-ready');
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
    <div className="site-page solutions-page" ref={motionRoot}>
      <PageHero
        title="Physical AI applications using ZMD hardware"
        body="ZMD builds the sensing and compute hardware. Customers and integrators add the software, integrations and operational systems required for each deployment."
        image={assets.solutionsHero}
        imageAlt="ZMD hardware connected to manufacturing, security, logistics and enterprise environments"
        dark
      >
        <ArrowButton to="/solutions#solution-areas">Explore applications</ArrowButton>
      </PageHero>
      <section className="section solution-index-section" id="solution-areas">
        <div className="site-container">
          <SectionIntro
            title="Application areas"
          />
          <div className="solution-showcase solution-showcase--six">
            {solutions.map((solution) => <SolutionCard solution={solution} key={solution.slug} />)}
          </div>
        </div>
      </section>
      <SharedSolutionArchitecture />
      {solutions.map((solution, index) => <SolutionSection solution={solution} index={index} key={solution.slug} />)}
      <section className="section solutions-contact-section">
        <div className="site-container">
          <div className="solutions-contact-section__inner">
            <div className="solutions-contact-section__copy">
              <h2>Configure ZMD hardware for your deployment</h2>
            </div>
            <ArrowButton to="/contact">Discuss hardware configuration</ArrowButton>
          </div>
        </div>
      </section>
    </div>
  );
}
