import { ArrowButton } from './page_shared';

export default function NotFoundPage() {
  return (
    <div className="site-page not-found-page">
      <div className="site-container">
        <span className="not-found-page__number">404</span>
        <h1 tabIndex="-1">This page is outside the current product map.</h1>
        <div><ArrowButton to="/">Return home</ArrowButton><ArrowButton to="/products" secondary>Explore products</ArrowButton></div>
      </div>
    </div>
  );
}
