import { Link } from "react-router-dom";
import { useCart } from "../CartContext";
import { generatePrice } from "../price";

export default function Cart() {
  const { items, removeFromCart } = useCart();

  return (
    <div className="detail-page">
      <div className="detail-container cart-container">
        <Link to="/" className="back-link">
          &larr; Continue Shopping
        </Link>

        <h1 className="cart-title">
          Your Cart
          <span className="cart-count">{items.length}</span>
        </h1>

        {items.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon"><i className="fa-solid fa-cart-shopping" /></div>
            <p>Your cart is empty</p>
            <Link to="/" className="add-to-cart-btn" style={{ marginTop: 20, display: "inline-flex" }}>
              Browse Games
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => {
                return (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      {item.background_image ? (
                        <img src={item.background_image} alt={item.name} />
                      ) : (
                        <div className="game-img-fallback">
                          <span><i className="fa-solid fa-gamepad" /></span>
                        </div>
                      )}
                    </div>
                    <div className="cart-item-info">
                      <Link
                        to={`/game/${item.slug || item.id}`}
                        className="cart-item-name"
                      >
                        {item.name}
                      </Link>
                    </div>
                    <div className="cart-item-actions">
                      <span className="cart-item-price">
                        ${generatePrice(item.id).toFixed(2)}
                      </span>
                      <button
                        className="cart-remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>


          </>
        )}
      </div>
    </div>
  );
}
