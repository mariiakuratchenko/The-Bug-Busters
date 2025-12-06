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
            <button className="btn-primary">Explore Products</button>
            <button className="btn-secondary">Meet the Team</button>
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
            <h3 className="card-title">Pesky Wasps</h3>
           
          </div>
          <div className="card">
            <h3 className="card-title">Crawling Infestation</h3>
           
          </div>
          <div className="card">
            <h3 className="card-title">Itchy Bed Bugs</h3>
            
          </div>
        </div>
      </section>
    </main>
  );
}

export default Mainpage;
