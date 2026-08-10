import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { SiteLayout } from './components/layout/site_layout';
import HomePage from './pages/home';
import AboutPage from './pages/about';
import ContactPage from './pages/contact';
import EdgeAIPage from './pages/edge_ai';
import SolutionsPage from './pages/solutions';
import NotFoundPage from './pages/not_found';
import ProductsPage from './pages/products';
import CamerasPage from './pages/products/cam';
import CustomIoTPage from './pages/products/custom_iot';
import EdgeDevicesPage from './pages/products/edge_devices';
import ServersPage from './pages/products/servers';
import './assets/css/site.css';
import './assets/css/physical-ai-story.css';
import './assets/css/zevric.css';
import './assets/css/edge-pages.css';
import './assets/css/visual-enrichment.css';
import './assets/css/product-family-pages.css';
import './assets/css/surface-bands.css';
import './assets/css/architecture-story.css';
import './assets/css/products-page.css';
import './assets/css/typography.css';
import './assets/css/responsive.css';
import './assets/css/home.css';
import './assets/css/products.css';
import './assets/css/cam.css';
import './assets/css/edge_devices.css';
import './assets/css/servers.css';
import './assets/css/custom_iot.css';
import './assets/css/edge_ai.css';
import './assets/css/solutions.css';
import './assets/css/about.css';
import './assets/css/contact.css';
import './assets/css/motion-safety.css';

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
        <Route path="/about" element={<AboutPage />} />
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
