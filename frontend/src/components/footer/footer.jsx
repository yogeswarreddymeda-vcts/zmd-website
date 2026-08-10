import React from 'react';
import { Link } from 'react-router-dom';
import Brand from '../brand/brand';
import './footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="site-footer__grid site-footer__grid--without-contact">
          <div className="site-footer__brand">
            <Brand footer />
          </div>
          <div>
            <Link className="site-footer__label site-footer__label--link" to="/products">Products</Link>
            <Link to="/products/cameras">Cameras</Link>
            <Link to="/products/edge-devices">Compact Edge Systems</Link>
            <Link to="/products/servers">AI Datacenter Servers</Link>
            <Link to="/products/custom-iot">Custom IoT Products</Link>
          </div>
          <div>
            <Link className="site-footer__label site-footer__label--link" to="/solutions">Solutions</Link>
            <Link to="/solutions#surveillance">Surveillance and Security</Link>
            <Link to="/solutions#industrial-ai">Industrial AI</Link>
            <Link to="/solutions#healthcare">Healthcare Operations</Link>
            <Link to="/solutions#retail-intelligence">Retail Intelligence</Link>
            <Link to="/solutions#smart-cities-mobility">Smart Cities and Mobility</Link>
            <Link to="/solutions#airport-operations">Airport Operations</Link>
          </div>
          <div>
            <Link className="site-footer__label site-footer__label--link" to="/about">About</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
        </div>
        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} ZETTAMICRO DEVICES PRIVATE LIMITED</span>
        </div>
      </div>
    </footer>
  );
}
