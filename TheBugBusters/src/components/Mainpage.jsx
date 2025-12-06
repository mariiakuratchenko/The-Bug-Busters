// Mainpage.jsx
import React from "react";

function Mainpage() {
  return (
    <main className="shell">
      <section className="hero">
        <div className="hero-text">
          <h1 className="hero-title">Continue Life Bug-Free</h1>
          <p className="hero-subtitle">
            From annoying wasps to itchy bed bugs, our products keep your family safe and happy.
          </p>

          <div className="hero-actions">
          </div>

          <div className="hero-meta">
            <span className="hero-pill">24/7 Support</span>
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

      <section className="section">
        <h2 className="section-title">We have products for all types of bugs</h2>
        <div className="grid-3">

          <div className="card">
            <h3 className="card-title">Crawling Insects</h3>
            <ul>
              <li>Ants</li>
              <li>Cockroaches</li>
              <li>Spiders</li>
              <li>Silverfish</li>
            </ul>
          </div>

          <div className="card">
            <h3 className="card-title">Flying Insects</h3>
            <ul>
              <li>Flies</li>
              <li>Mosquitoes</li>
              <li>Gnats</li>
            </ul>
          </div>

          <div className="card">
            <h3 className="card-title">Flea, Tick and Bed Bugs</h3>
            <ul>
              <li>Fleas</li>
              <li>Ticks</li>
              <li>Bed Bugs</li>
            </ul>
          </div>

          <div className="card">
            <h3 className="card-title">Multi-Bugs</h3>
            <ul>
              <li>Assorted Pack</li>
              <li>Inside Use</li>
              <li>Outside Use</li>
            </ul>
          </div>

          <div className="card">
            <h3 className="card-title">Wasps</h3>
            <ul>
              <li>Wasps</li>
              <li>Hornets</li>
              <li>Yellow Jackets</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Mainpage;
