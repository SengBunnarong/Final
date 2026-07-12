import { useState } from "react";
import { Link } from "react-router-dom";
import { generatePrice } from "./price";

export default function GameCard({ game, topSale, index }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const price = generatePrice(game.id);

  const platforms = game.platforms?.map((p) => p.name).slice(0, 3) || [];
  const releaseYear = game.released ? new Date(game.released).getFullYear() : null;

  return (
    <Link
      to={`/game/${game.slug || game.id}`}
      className="game-card"
      style={{ animationDelay: `${(index || 0) * 0.04}s` }}
    >
      <div className="game-card-image">
        {!imgError && game.background_image ? (
          <img
            src={game.background_image}
            alt={game.name}
            className={`game-img ${imgLoaded ? "loaded" : ""}`}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="game-img-fallback">
            <span><i className="fa-solid fa-gamepad" /></span>
          </div>
        )}
        <div className="game-card-overlay" />
        {topSale && <span className="top-sale-badge">TOP SALE</span>}
      </div>

      <div className="game-card-body">
        <h3 className="game-title" title={game.name}>
          {game.name}
        </h3>

        <div className="game-card-footer">
          <div className="game-card-left">
            {releaseYear && <span className="game-year">{releaseYear}</span>}
            {platforms.length > 0 && (
              <span className="game-platforms">{platforms.join(" / ")}</span>
            )}
          </div>
          <span className="game-price">${price.toFixed(2)}</span>
        </div>
      </div>
    </Link>
  );
}
