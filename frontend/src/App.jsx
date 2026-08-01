import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import './App.css';

const HomePage = lazy(() => import('./pages/home'));
const CameraPage = lazy(() => import('./pages/products/cam'));
const DelibotPage = lazy(() => import('./pages/products/delibot'));
const DronePage = lazy(() => import('./pages/products/drone'));
const SafetyBandPage = lazy(() => import('./pages/products/health'));
const SensorsPage = lazy(() => import('./pages/products/sensors'));
const ServerPage = lazy(() => import('./pages/products/server'));
const EdgeAIPage = lazy(() => import('./pages/edge_ai'));

export default function App() {
  return (
    <div className="app-root">
      {/* Header displayed on every page */}
      <Header />

      {/* Main Page Content */}
      <main>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/edge-ai" element={<EdgeAIPage />} />
            <Route path="/solutions" element={<EdgeAIPage />} />
            <Route path="/products/cam" element={<CameraPage />} />
            <Route path="/products/delibot" element={<DelibotPage />} />
            <Route path="/products/drone" element={<DronePage />} />
            <Route path="/products/safety" element={<SafetyBandPage />} />
            <Route path="/products/sensors" element={<SensorsPage />} />
            <Route path="/products/server" element={<ServerPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Suspense>
      </main>

      {/* Footer displayed on every page */}
      <Footer />
    </div>
  );
}
