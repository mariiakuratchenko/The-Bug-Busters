// ExploreProducts.jsx
import { useState, useEffect } from "react";
import axios from "axios";

import sprayImg from "./auth/spray.jpg";
import spray2Img from "./auth/spray2.jpeg";
import coilImg from "./auth/coil.jpg";
import defenderImg from "./auth/defender.jpg";
import kidsImg from "./auth/kids.webp";
import ecoImg from "./auth/eco.avif";

import "./ExploreProducts.css";

// API adresi: önce .env, yoksa localhost
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

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

const CART_STORAGE_KEY = "bugbusters_cart";
const QUESTIONS_STORAGE_KEY = "bugbusters_questions";

function ExploreProducts() {
  const [filter, setFilter] = useState("All");
  const [products, setProducts] = useState(fakeProducts);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Cart state (ürün + miktar)
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [cartMessage, setCartMessage] = useState("");
  const [quantity, setQuantity] = useState(1); // modal için adet

  // Question state
  const [questionText, setQuestionText] = useState("");
  const [questions, setQuestions] = useState(() => {
    try {
      const raw = localStorage.getItem(QUESTIONS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }); // {productId, text, createdAt}

  // 🔄 Backend’ten ürünleri çek (varsa), yoksa fakeProducts kalır
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(`${API_BASE}/api/items`);
        const apiItems = res.data || [];

        // API'den gelen ürünleri local fakeProducts ile ID bazlı birleştir
        const merged = apiItems.map((item) => {
          const local = fakeProducts.find((p) => p.id === item.id);
          return local ? { ...local, ...item } : item;
        });

        // Eğer API boş dönerse fallback olarak fake products kalsın
        setProducts(merged.length > 0 ? merged : fakeProducts);
      } catch (err) {
        console.error("Error loading products from API:", err);
        // Hata mesajını istersen burada gösterebilirsin
        // setError("Could not load products from server. Showing demo products.");
        setError("");
        setProducts(fakeProducts);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Cart değişince localStorage’a yaz
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  // Questions değişince localStorage’a yaz
  useEffect(() => {
    localStorage.setItem(QUESTIONS_STORAGE_KEY, JSON.stringify(questions));
  }, [questions]);

  const filteredProducts =
    filter === "All"
      ? products
      : products.filter((p) => p.category === filter);

  // Modal open
  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    setCartMessage("");
    setQuestionText("");
    setQuantity(1);
  };

  // Modal close
  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
    setCartMessage("");
    setQuestionText("");
  };

  // Quantity değiştir (1–10 arası)
  const handleQuantityChange = (delta) => {
    setQuantity((prev) => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (next > 10) return 10;
      return next;
    });
  };

  // ✅ ADD TO CART
  const handleAddToCart = () => {
    if (!selectedProduct) return;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === selectedProduct.id);
      if (existing) {
        return prev.map((item) =>
          item.id === selectedProduct.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: selectedProduct.id,
          name: selectedProduct.name,
          price: selectedProduct.price,
          imageUrl: selectedProduct.imageUrl,
          quantity,
        },
      ];
    });

    setCartMessage(`Added ${quantity} item(s) to cart.`);
  };

  // ✅ SUBMIT QUESTION
  const handleSubmitQuestion = (e) => {
    e.preventDefault();
    if (!selectedProduct) return;
    if (!questionText.trim()) return;

    const newQuestion = {
      productId: selectedProduct.id,
      text: questionText.trim(),
      createdAt: new Date().toISOString(),
    };

    setQuestions((prev) => [...prev, newQuestion]);
    setQuestionText("");
  };

  // Seçili ürünün soruları
  const currentProductQuestions = selectedProduct
    ? questions.filter((q) => q.productId === selectedProduct.id)
    : [];

  // Cart toplam adet (ürün sayısı değil, quantity toplamı)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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

          <p className="cart-indicator">
            Cart: <strong>{cartCount}</strong> item(s) | Total:{" "}
            <strong>${cartTotal.toFixed(2)}</strong>
          </p>
        </div>

        <div className="explore-hero-stats">
          <div className="stat-card">
            <span className="stat-number">{products.length}</span>
            <span className="stat-label">Core Products</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">4+</span>
            <span className="stat-label">Use Cases</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{cartCount}</span>
            <span className="stat-label">Items in Cart</span>
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <div className="filter-bar">
        {["All", "Spray", "Electric Zapper", "Coil", "Ultrasonic", "Patch", "Trap"].map(
          (cat) => (
            <button
              key={cat}
              className={filter === cat ? "filter-btn active" : "filter-btn"}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          )
        )}
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
                <span className="price">
                  ${Number(product.price).toFixed(2)}
                </span>
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

      {/* CART SECTION – sayfanın altında cart’ı görme */}
      {cart.length > 0 && (
        <section className="cart-section">
          <h2 className="cart-title">Cart</h2>
          <p className="cart-subtitle">
            You have {cartCount} item(s) in your cart. Total:{" "}
            <strong>${cartTotal.toFixed(2)}</strong>
          </p>

          <div className="cart-list">
            {cart.map((item) => (
              <div key={item.id} className="cart-row">
                <div className="cart-row-left">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="cart-thumb"
                  />
                  <div>
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-price">
                      ${Number(item.price).toFixed(2)} each
                    </p>
                  </div>
                </div>
                <div className="cart-row-right">
                  <span className="cart-item-qty">
                    Qty: <strong>{item.quantity}</strong>
                  </span>
                  <span className="cart-item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PRODUCT DETAIL MODAL (Add to Cart + Questions) */}
      {isModalOpen && selectedProduct && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
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

                {/* Quantity + Add to cart */}
                <div className="modal-bottom-row">
                  <span className="modal-price">
                    ${Number(selectedProduct.price).toFixed(2)}
                  </span>

                  <div className="quantity-control">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(-1)}
                    >
                      -
                    </button>
                    <span>{quantity}</span>
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(1)}
                    >
                      +
                    </button>
                  </div>

                  <button className="modal-cta-btn" onClick={handleAddToCart}>
                    Add to cart
                  </button>
                </div>

                {cartMessage && (
                  <p className="cart-message">{cartMessage}</p>
                )}

                {/* Question form */}
                <div className="question-section">
                  <h3 className="question-title">Question about this product?</h3>
                  <form onSubmit={handleSubmitQuestion}>
                    <textarea
                      className="question-textarea"
                      value={questionText}
                      onChange={(e) => setQuestionText(e.target.value)}
                      placeholder="Type your question here…"
                      rows={3}
                    />
                    <button
                      type="submit"
                      className="question-submit-btn"
                      disabled={!questionText.trim()}
                    >
                      Submit question
                    </button>
                  </form>

                  {currentProductQuestions.length > 0 && (
                    <div className="question-list">
                      <h4>Previous questions</h4>
                      <ul>
                        {currentProductQuestions.map((q, idx) => (
                          <li key={idx}>
                            <span className="question-text">{q.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
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
