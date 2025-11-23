// Mainpage.jsx
import React from "react";

function Mainpage() {
  return (
    <main className="shell">
      <section className="hero">
        <div className="hero-text">
          <h1 className="hero-title">Continue Life Bug-Free</h1>
          <p className="hero-subtitle">
            From real-world insects to software bugs, our team keeps your home
            and your applications clean, safe and reliable.
          </p>

          <div className="hero-actions">
            <button className="btn-primary">Explore Products</button>
            <button className="btn-secondary">Meet the Team</button>
          </div>

          <div className="hero-meta">
            <span className="hero-pill">24/7 Support</span>
            <span className="hero-pill eco-badge">Eco-Friendly Solutions</span>
            <span className="hero-pill">Bug-Safe Guarantee</span>
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
        <h2 className="section-title">Why customers trust The Bug Busters</h2>
        <p className="section-description">
          A professional experience both online and on-site. Our dashboard lets
          you track service visits, product usage, and real-time notifications.
        </p>

        <div className="grid-3">
          <div className="card">
            <h3 className="card-title">Smart Monitoring</h3>
            <p className="card-text">
              Our system detects unusual activity early and alerts you before
              issues turn into infestations or critical bugs.
            </p>
          </div>
          <div className="card">
            <h3 className="card-title">Expert Team</h3>
            <p className="card-text">
              Certified technicians and developers work together to keep both
              your home and your software protected.
            </p>
          </div>
          <div className="card">
            <h3 className="card-title">Clear Reporting</h3>
            <p className="card-text">
              Clean, visual reports with everything you need at a glance: visits,
              fixes, upcoming maintenance, and more.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Mainpage;
