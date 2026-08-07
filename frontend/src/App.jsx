import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { SiteLayout } from './site/SiteChrome';
import {
  CamerasPage,
  CompanyPage,
  ContactPage,
  CustomIoTPage,
  EdgeAIPage,
  EdgeDevicesPage,
  HomePage,
  NotFoundPage,
  ProductsPage,
  ServersPage,
  SolutionsPage,
} from './site/Pages';
import './site/site.css';
import './site/physical-ai-story.css';
import './site/zevric.css';
import './site/edge-pages.css';
import './site/visual-enrichment.css';
import './site/product-family-pages.css';
import './site/surface-bands.css';
import './site/architecture-story.css';
import './site/products-page.css';
import './site/heading-system.css';
import './site/mobile-composition.css';

export default function App() {
  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/cameras" element={<CamerasPage />} />
        <Route path="/products/cameras/:slug" element={<Navigate to="/products/cameras" replace />} />
        <Route path="/products/edge-devices" element={<EdgeDevicesPage />} />
        <Route path="/products/edge-devices/:slug" element={<Navigate to="/products/edge-devices" replace />} />
        <Route path="/products/servers" element={<ServersPage />} />
        <Route path="/products/custom-iot" element={<CustomIoTPage />} />
        <Route path="/products/iot" element={<Navigate to="/products/custom-iot" replace />} />
        <Route path="/edge-ai" element={<EdgeAIPage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/solutions/surveillance" element={<Navigate to="/solutions#surveillance" replace />} />
        <Route path="/solutions/industrial-ai" element={<Navigate to="/solutions#industrial-ai" replace />} />
        <Route path="/solutions/healthcare" element={<Navigate to="/solutions#healthcare" replace />} />
        <Route path="/about" element={<CompanyPage />} />
        <Route path="/company" element={<Navigate to="/about" replace />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/partner-with-zmd" element={<Navigate to="/contact" replace />} />
        <Route path="/products/cam" element={<Navigate to="/products/cameras" replace />} />
        <Route path="/products/edge" element={<Navigate to="/products/edge-devices" replace />} />
        <Route path="/products/edge-box" element={<Navigate to="/products/edge-devices" replace />} />
        <Route path="/products/server" element={<Navigate to="/products/servers" replace />} />
        <Route path="/products/sensors" element={<Navigate to="/products/custom-iot" replace />} />
        <Route path="/products/safety" element={<Navigate to="/products/custom-iot#safety-band" replace />} />
        <Route path="/products/parking-sensor" element={<Navigate to="/products/custom-iot#parking-sensor" replace />} />
        <Route path="/solutions/hospitals" element={<Navigate to="/solutions#healthcare" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SiteLayout>
  );
}
