import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/shared/zmd-logo-light.webp';
import logoDark from '../../assets/images/shared/zmd-logo-dark.webp';

export default function Brand({ footer = false }) {
  return (
    <Link className={`brand ${footer ? 'brand--footer' : ''}`} to="/" aria-label="ZMD home">
      <span className="brand__crop" aria-hidden="true">
        <img className="brand__image brand__image--surface" src={footer ? logoDark : logo} alt="" />
      </span>
    </Link>
  );
}
