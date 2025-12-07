// Checkout.jsx
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Checkout.css";

const CART_STORAGE_KEY = "bugbusters_cart";

function Checkout() {
  const { loggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Load cart from localStorage
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!loggedIn) {
      alert("Please login to checkout");
      navigate("/login");
    }
  }, [loggedIn, navigate]);

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0 && !showSuccess) {
      navigate("/explore");
    }
  }, [cart, navigate, showSuccess]);

  // Calculate totals
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);

      // Clear cart from localStorage
      localStorage.removeItem(CART_STORAGE_KEY);
      setCart([]);

      // Redirect to home after 3 seconds
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }, 1500);
  };

  // Success screen
  if (showSuccess) {
    return (
      <div className="checkout-page">
        <div className="checkout-success">
          <div className="success-icon">✓</div>
          <h1 className="success-title">Purchase Complete!</h1>
          <p className="success-message">
            Thank you for your order. You will be redirected to the home page
            shortly.
          </p>
          <button
            className="btn-primary"
            onClick={() => navigate("/")}
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1 className="checkout-title">Checkout</h1>

        <div className="checkout-layout">
          {/* Left side - Order Summary */}
          <section className="order-summary">
            <h2 className="section-heading">Order Summary</h2>
            
            <div className="summary-items">
              {cart.map((item) => (
                <div key={item.id} className="summary-item">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="summary-item-img"
                  />
                  <div className="summary-item-details">
                    <p className="summary-item-name">{item.name}</p>
                    <p className="summary-item-qty">Qty: {item.quantity}</p>
                  </div>
                  <p className="summary-item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="summary-row">
                <span>Subtotal ({totalItems} items)</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax</span>
                <span>$0.00</span>
              </div>
              <div className="summary-row summary-total">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </section>

          {/* Right side - Billing Form */}
          <section className="billing-section">
            <h2 className="section-heading">Billing Information</h2>

            <form className="checkout-form" onSubmit={handleSubmit}>
              {/* Personal Information */}
              <div className="form-section">
                <h3 className="form-section-title">Personal Information</h3>
                
                <div className="form-group">
                  <label htmlFor="fullName" className="form-label">
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    className="form-input"
                    placeholder="John Smith"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    disabled={isProcessing}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-input"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isProcessing}
                  />
                </div>
              </div>

              {/* Billing Address */}
              <div className="form-section">
                <h3 className="form-section-title">Billing Address</h3>

                <div className="form-group">
                  <label htmlFor="address" className="form-label">
                    Street Address *
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    className="form-input"
                    placeholder="123 Main Street"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    disabled={isProcessing}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city" className="form-label">
                      City *
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      className="form-input"
                      placeholder="New York"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      disabled={isProcessing}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="state" className="form-label">
                      State/Province *
                    </label>
                    <input
                      id="state"
                      name="state"
                      type="text"
                      className="form-input"
                      placeholder="NY"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      disabled={isProcessing}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="zipCode" className="form-label">
                      ZIP / Postal Code *
                    </label>
                    <input
                      id="zipCode"
                      name="zipCode"
                      type="text"
                      className="form-input"
                      placeholder="10001"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      disabled={isProcessing}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="country" className="form-label">
                      Country *
                    </label>
                    <input
                      id="country"
                      name="country"
                      type="text"
                      className="form-input"
                      placeholder="United States"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      disabled={isProcessing}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="checkout-submit-btn"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Complete Checkout"}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
