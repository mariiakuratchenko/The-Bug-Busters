import { useState, useEffect } from "react";
import axios from "axios";

import sprayImg from "./auth/spray.jpg";
import spray2Img from "./auth/spray2.jpeg";
import coilImg from "./auth/coil.jpg";
import defenderImg from "./auth/defender.jpg";
import kidsImg from "./auth/kids.webp";
import ecoImg from "./auth/eco.avif"; // Eco-friendly glue trap image

import "./ExploreProducts.css";


const API_BASE = import.meta.env.VITE_API_URL;

const fakeProducts = [
  {
    id: 1,
    name: "Mosquito Guard Spray",
    category: "Spray",
    insectType: "Mosquito",
    price: 14.99,
    isElectric: false,
    isIndoor: true,
    description:
      "A skin-friendly mosquito repellent spray that provides long-lasting protection for up to 8 hours. Ideal for indoor use and perfect for daily home protection.",
    imageUrl: sprayImg,
  },
  {
    id: 2,
    name: "Outdoor Bug Zapper Pro",
    category: "Electric Zapper",
    insectType: "Mosquito & Fly",
    price: 39.99,
    isElectric: true,
    isIndoor: false,
    description:
      "A high-performance outdoor bug zapper designed for patios and gardens. Weather-resistant, energy-efficient, and highly effective against flying insects.",
    imageUrl: spray2Img,
  },
  {
    id: 3,
    name: "Lavender Mosquito Coil",
    category: "Coil",
    insectType: "Mosquito",
    price: 7.49,
    isElectric: false,
    isIndoor: false,
    description:
      "A lavender-scented mosquito coil that repels mosquitoes while creating a calm ambiance. Ideal for outdoor dining, camping, and evening gatherings.",
    imageUrl: coilImg,
  },
  {
    id: 4,
    name: "Ultrasonic Pest Defender",
    category: "Ultrasonic",
    insectType: "Multiple",
    price: 24.99,
    isElectric: true,
    isIndoor: true,
    description:
      "An advanced ultrasonic pest repeller that deters insects and small rodents using sound waves. Silent, non-toxic, and safe for pets and children.",
    imageUrl: defenderImg,
  },
  {
    id: 5,
    name: "Kids Safe Mosquito Patches",
    category: "Patch",
    insectType: "Mosquito",
    price: 9.99,
    isElectric: false,
    isIndoor: true,
    description:
      "Colorful citronella-infused patches specially designed for children. Easy to apply, gentle on sensitive skin, and perfect for all-day mosquito protection.",
    imageUrl: kidsImg,
  },
  {
    id: 6,
    name: "Eco-Friendly Glue Trap",
    category: "Trap",
    insectType: "Fly & Ant",
    price: 6.99,
    isElectric: false,
    isIndoor: true,
    description:
      "A non-toxic glue trap that safely captures flies, ants, and small crawling insects. Odor-free and ideal for kitchens, pantries, and indoor spaces.",
    imageUrl: ecoImg,
  },
];

function ExploreProducts() {
  const [filter, setFilter] = useState("All");
  const [products, setProducts] = useState(fakeProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔄 Backend
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(`${API_BASE}/api/items`);
        const apiItems = res.data; // [{id, name, category, price}, ...]

       
        const merged = apiItems.map((item) => {
          const local = fakeProducts.find((p) => p.id === item.id);
          return local ? { ...local, ...item } : item;
        });

        setProducts(merged);
      } catch (err) {
        console.error("Error loading products from API:", err);
        setError("Could not load products from the server. Showing demo data.");
        setProducts(fakeProducts); // fallback
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts =
    filter === "All"
      ? products
      : products.filter((p) => p.category === filter);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  return (
    <div className="explore-page">
      {/* HERO / HEADER AREA */}
      <section className="explore-hero">
        <div className="explore-hero-text">
          <p className="eyebrow">Product Catalog</p>
          <h1 className="explore-title">Smart Protection for Every Bug Scenario</h1>
          <p className="explore-subtitle">
            Explore our curated range of professional-grade solutions designed
            for families, outdoor spaces, and high-traffic environments.
          </p>

          <div className="hero-badges">
            <span className="hero-pill">Family-Safe</span>
            <span className="hero-pill">Lab Tested</span>
            <span className="hero-pill">Eco-Conscious Options</span>
          </div>
        </div>

        <div className="explore-hero-stats">
          <div className="stat-card">
            <span className="stat-number">6</span>
            <span className="stat-label">Core Products</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">4+</span>
            <span className="stat-label">Use Cases</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Protection</span>
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <div className="filter-bar">
        {[
          "All",
          "Spray",
          "Electric Zapper",
          "Coil",
          "Ultrasonic",
          "Patch",
          "Trap",
        ].map((cat) => (
          <button
            key={cat}
            className={filter === cat ? "filter-btn active" : "filter-btn"}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* LOADING & ERROR */}
      {loading && <p className="loading">Loading products...</p>}
      {!loading && error && <p className="error">{error}</p>}

      {/* PRODUCT GRID */}
      <section className="products-grid">
        {filteredProducts.map((product) => (
          <article className="product-card" key={product.id}>
            <div className="image-wrapper">
              <img src={product.imageUrl} alt={product.name} />
              <span className="chip chip-insect">{product.insectType}</span>
            </div>

            <div className="product-info">
              <h2>{product.name}</h2>
              <span className="category">{product.category}</span>
              <p className="description">{product.description}</p>

              <div className="tags">
                <span>{product.isElectric ? "Electric" : "Non-electric"}</span>
                <span>{product.isIndoor ? "Indoor" : "Outdoor"}</span>
              </div>

              <div className="bottom-row">
                <span className="price">${product.price.toFixed(2)}</span>
                <button
                  className="buy-btn"
                  onClick={() => openModal(product)}
                >
                  View details
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* PRODUCT DETAIL MODAL */}
      {isModalOpen && selectedProduct && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div
            className="modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>

            <div className="modal-layout">
              <div className="modal-image-side">
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  className="modal-img"
                />
              </div>
              <div className="modal-info-side">
                <p className="modal-eyebrow">Product Detail</p>
                <h2>{selectedProduct.name}</h2>
                <p className="modal-category">{selectedProduct.category}</p>

                <p className="modal-description">
                  {selectedProduct.description}
                </p>

                <div className="modal-meta">
                  <div>
                    <span className="meta-label">Insect type</span>
                    <span className="meta-value">
                      {selectedProduct.insectType}
                    </span>
                  </div>
                  <div>
                    <span className="meta-label">Usage</span>
                    <span className="meta-value">
                      {selectedProduct.isIndoor ? "Indoor" : "Outdoor"}
                    </span>
                  </div>
                  <div>
                    <span className="meta-label">Power</span>
                    <span className="meta-value">
                      {selectedProduct.isElectric
                        ? "Electric device"
                        : "Non-electric"}
                    </span>
                  </div>
                </div>

                <div className="modal-bottom-row">
                  <span className="modal-price">
                    ${selectedProduct.price.toFixed(2)}
                  </span>
                  <button className="modal-cta-btn">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExploreProducts;
