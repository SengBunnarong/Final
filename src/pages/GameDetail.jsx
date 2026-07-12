import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../CartContext";
import { generatePrice } from "../price";
import gamesData from "../games_data.json";

export default function GameDetail() {
  const { id } = useParams();
  const { addToCart, isInCart } = useCart();
  const [added, setAdded] = useState(false);

  const game = gamesData.find((g) => g.id === id || g.slug === id);

  const featured = useMemo(() => {
    if (!game) return [];
    return gamesData
      .filter((g) => g.id !== game.id)
      .slice(0, 4);
  }, [game]);

  const handleAddToCart = () => {
    if (game && !isInCart(game.id)) {
      addToCart(game);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  if (!game) {
    return (
      <div className="detail-page">
        <div className="detail-container">
          <div className="empty-state">
            <h2>Game not found</h2>
            <p style={{ marginTop: 12 }}>
              <Link to="/" className="back-link">
                &larr; Back to store
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const price = generatePrice(game.id);

  return (
    <div className="detail-page">
      <div className="detail-container">
        <Link to="/" className="back-link">
          &larr; Back to store
        </Link>

        <div className="detail-hero">
          <div className="detail-hero-image">
            {game.background_image ? (
              <img src={game.background_image} alt={game.name} />
            ) : (
              <div className="game-img-fallback">
                <span><i className="fa-solid fa-gamepad" /></span>
              </div>
            )}
            <div className="detail-hero-overlay" />
          </div>

          <div className="detail-hero-content">
            <h1 className="detail-title">{game.name}</h1>

            <div className="detail-price-row">
              <span className="detail-price">${price.toFixed(2)}</span>
              <button
                className={`add-to-cart-btn ${isInCart(game.id) ? "in-cart" : ""} ${added ? "just-added" : ""}`}
                onClick={handleAddToCart}
                disabled={isInCart(game.id)}
              >
                {isInCart(game.id)
                  ? "In Cart"
                  : added
                    ? "Added!"
                    : "Add to Cart"}
              </button>
            </div>

            {game.released && (
              <div className="detail-info">
                <span className="detail-info-label">Released</span>
                <span>{new Date(game.released).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
              </div>
            )}

            {game.platforms && game.platforms.length > 0 && (
              <div className="detail-info">
                <span className="detail-info-label">Platforms</span>
                <span>{game.platforms.map((p) => p.name).join(", ")}</span>
              </div>
            )}

            {game.stores && game.stores.length > 0 && (
              <div className="detail-info">
                <span className="detail-info-label">Available on</span>
                <span>{game.stores.map((s) => s.name).join(", ")}</span>
              </div>
            )}
          </div>
        </div>

        {featured.length > 0 && (
          <div className="featured-section">
            <h2 className="detail-section-title">Featured Games</h2>
            <div className="featured-grid">
              {featured.map((g) => (
                <Link key={g.id} to={`/game/${g.slug || g.id}`} className="featured-card">
                  <div className="featured-card-image">
                    {g.background_image ? (
                      <img src={g.background_image} alt={g.name} loading="lazy" />
                    ) : (
                      <div className="game-img-fallback"><span>🎮</span></div>
                    )}
                    <div className="game-card-overlay" />
                  </div>
                  <div className="featured-card-body">
                    <h3 className="featured-card-title">{g.name}</h3>
                    <div className="featured-card-meta">
                      {g.released && <span>{new Date(g.released).getFullYear()}</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
