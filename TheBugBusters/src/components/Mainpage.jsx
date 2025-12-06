// Mainpage.jsx
import React from "react";
import { Link } from "react-router-dom";

function Mainpage() {
  return (
    <main className="shell">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-text">
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
            <span className="hero-pill">Family & Pet Friendly Options</span>
          </div>
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
          protection for your entire home.
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
            <h3 className="card-title">Flea, Tick & Bed Bugs</h3>
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
            <h3 className="card-title">Wasps & Stinging Insects</h3>
            <ul>
              <li>Wasps</li>
              <li>Hornets</li>
              <li>Yellow Jackets</li>
            </ul>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Mainpage;
