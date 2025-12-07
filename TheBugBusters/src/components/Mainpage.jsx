// Mainpage.jsx
import React from "react";
import { Link } from "react-router-dom";

function Mainpage() {
  return (
    <main className="shell">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-text">
          <p className="hero-eyebrow">Smart protection for real-world bugs</p>

          <h1 className="hero-title">Continue Life Bug-Free</h1>

          <p className="hero-subtitle">
            From annoying wasps to itchy bed bugs, our products help keep your
            home, family, and pets safe and comfortable all year long.
          </p>

          <div className="hero-actions">
            <Link to="/explore">
              <button className="btn-primary">Explore Products</button>
            </Link>

            <Link to="/about">
              <button className="btn-secondary">Meet the Team</button>
            </Link>
          </div>

          <div className="hero-meta">
            <span className="hero-pill">24/7 Support</span>
            <span className="hero-pill">Indoor & Outdoor Solutions</span>
            <span className="hero-pill">Family & Pet-Friendly Options</span>
          </div>

          <p className="hero-note">
            The Bug Busters combines practical pest control products with clear,
            easy-to-use digital tools so you always know what&apos;s protecting your home.
          </p>
        </div>

        <div className="hero-image-wrapper">
          <img
            className="hero-image"
            src="https://images.pexels.com/photos/19351513/pexels-photo-19351513.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop"
            alt="Family enjoying a bug-free home"
          />
        </div>
      </section>

      {/* PRODUCT CATEGORY SECTION */}
      <section className="section">
        <h2 className="section-title">
          We have products for all types of bugs
        </h2>
        <p className="section-description">
          Choose from targeted solutions for specific insects or multi-purpose
          protection for your entire home. Click any category to see recommended
          products in our catalog.
        </p>

        <div className="grid-3">
          <Link to="/explore" className="card card-button">
            <h3 className="card-title">Crawling Insects</h3>
            <ul>
              <li>Ants</li>
              <li>Cockroaches</li>
              <li>Spiders</li>
              <li>Silverfish</li>
            </ul>
          </Link>

          <Link to="/explore" className="card card-button">
            <h3 className="card-title">Flying Insects</h3>
            <ul>
              <li>Flies</li>
              <li>Mosquitoes</li>
              <li>Gnats</li>
            </ul>
          </Link>

          <Link to="/explore" className="card card-button">
            <h3 className="card-title">Flea, Tick &amp; Bed Bugs</h3>
            <ul>
              <li>Fleas</li>
              <li>Ticks</li>
              <li>Bed Bugs</li>
            </ul>
          </Link>

          <Link to="/explore" className="card card-button">
            <h3 className="card-title">Multi-Bug Protection</h3>
            <ul>
              <li>Assorted Packs</li>
              <li>Indoor Use</li>
              <li>Outdoor Use</li>
            </ul>
          </Link>

          <Link to="/explore" className="card card-button">
            <h3 className="card-title">Wasps &amp; Stinging Insects</h3>
            <ul>
              <li>Wasps</li>
              <li>Hornets</li>
              <li>Yellow Jackets</li>
            </ul>
          </Link>
        </div>
      </section>

      {/* OPTIONAL: HOW IT WORKS SECTION ( basit ve profesyonel ) */}
      <section className="section">
        <h2 className="section-title">How The Bug Busters works</h2>
        <p className="section-description">
          We keep things simple, transparent, and effective so you can focus on
          living your life, not chasing bugs.
        </p>

        <div className="grid-3">
          <div className="card">
            <h3 className="card-title">1. Explore &amp; Select</h3>
            <p>
              Browse our catalog by bug type, indoor/outdoor use, or family-safe
              options and find the product that matches your situation.
            </p>
          </div>
          <div className="card">
            <h3 className="card-title">2. Apply with Confidence</h3>
            <p>
              Each product includes clear usage guidance so you can apply it
              safely and effectively, even if it&apos;s your first time.
            </p>
          </div>
          <div className="card">
            <h3 className="card-title">3. Track &amp; Adjust</h3>
            <p>
              Use our dashboard and simple product labels to track what you used,
              where you used it, and when it&apos;s time for a follow-up.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Mainpage;
