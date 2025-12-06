// src/components/CartPage.jsx
import { useCart } from "../context/CartContext";
import "./CartPage.css";

function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, totalItems, totalPrice } =
    useCart();

  if (items.length === 0) {
    return (
      <main className="cart-page">
        <h1>Your Cart</h1>
        <p>Your cart is currently empty.</p>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <header className="cart-header">
        <h1>Your Cart</h1>
        <div className="cart-summary">
          <span>{totalItems} item(s)</span>
          <span>Total: ${totalPrice.toFixed(2)}</span>
        </div>
      </header>

      <section className="cart-items">
        {items.map((item) => (
          <article key={item.id} className="cart-item">
            <img src={item.imageUrl} alt={item.name} className="cart-item-img" />
            <div className="cart-item-info">
              <h2>{item.name}</h2>
              <p className="cart-item-price">
                ${item.price.toFixed(2)} each
              </p>

              <div className="cart-item-controls">
                <div className="qty-controls">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <p className="cart-item-subtotal">
                  Subtotal: ${(item.price * item.quantity).toFixed(2)}
                </p>

                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <footer className="cart-footer">
        <button type="button" className="clear-btn" onClick={clearCart}>
          Clear cart
        </button>
      </footer>
    </main>
  );
}

export default CartPage;
