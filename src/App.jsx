import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import GameCard from "./GameCard";
import GameDetail from "./pages/GameDetail";
import Cart from "./pages/Cart";
import gamesData from "./games_data.json";
import "./App.css";

const tickerItems = [
  { icon: "fa-solid fa-bolt", text: "NEW ARRIVALS EVERY WEEK" },
  { icon: "fa-solid fa-medal", text: "GOOD DEAL, GRAB IT FAST" },
  { icon: "fa-solid fa-trophy", text: "RETRO CLASSICS IN STOCK" },
];

function TickerContent(props) {
  return (
    <ul className="ticker__content" {...props}>
      {tickerItems.map((item, i) => (
        <li key={i} className="ticker-item">
          <i className={item.icon} /> {item.text}
          <span className="ticker-sep"><i className="fa-solid fa-star" /></span>
        </li>
      ))}
    </ul>
  );
}

export default function App() {
  const { items } = useCart();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="game-store">
      <header className="store-header">
        <div className="store-header-inner">
          <Link to="/" className="store-brand" onClick={() => setMobileMenuOpen(false)}>
            <span className="store-logo"><i className="fa-solid fa-gamepad" /></span>
            <h1 className="store-title">
              GAME<span className="gradient-text">VAULT</span>
            </h1>
          </Link>

          <nav className={`store-nav ${mobileMenuOpen ? "open" : ""}`}>
            <Link to="/#top-sale" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Top Sale</Link>
            <Link to="/#games" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Games</Link>
            <Link to="/cart" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Cart</Link>
          </nav>

          <div className="header-actions">
            <Link to="/cart" className="cart-link">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {items.length > 0 && (
                <span className="cart-badge">{items.length}</span>
              )}
            </Link>

            <button
              className={`hamburger-btn ${mobileMenuOpen ? "open" : ""}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className="marquee ticker-wrap">
        <TickerContent />
        <TickerContent aria-hidden="true" />
      </div>

      <Routes>
        <Route path="/" element={<StorePage />} />
        <Route path="/game/:id" element={<GameDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>

      <button
        className={`scroll-top-btn${showScrollTop ? " visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >
        <i className="fa-solid fa-arrow-up" />
      </button>
    </div>
  );
}

function StorePage() {
  const topSale = gamesData.slice(0, 4);
  const allGames = gamesData.slice(4);
  const carouselGames = gamesData.slice(0, 6);

  return (
    <>
      <section className="hero-carousel">
        <div id="gameCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="4000">
          <div className="carousel-indicators">
            {carouselGames.map((_, i) => (
              <button
                key={i}
                type="button"
                data-bs-target="#gameCarousel"
                data-bs-slide-to={i}
                className={i === 0 ? "active" : ""}
                aria-current={i === 0 ? "true" : undefined}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          <div className="carousel-inner">
            {carouselGames.map((game, i) => (
              <div key={game.id} className={`carousel-item ${i === 0 ? "active" : ""}`}>
                <Link to={`/game/${game.slug || game.id}`} className="carousel-slide-link">
                  <div className="carousel-slide">
                    {game.background_image ? (
                      <img src={game.background_image} alt={game.name} className="carousel-bg" />
                    ) : (
                      <div className="carousel-bg carousel-bg-fallback" />
                    )}
                    <div className="carousel-overlay" />
                    <div className="carousel-content">
                      <span className="carousel-tag">FEATURED</span>
                      <h2 className="carousel-title">{game.name}</h2>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#gameCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#gameCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      <main className="store-main">
        <section id="top-sale" className="game-section">
          <div className="section-header">
            <div className="section-header-left">
              <span className="section-icon top-sale-icon"><i className="fa-solid fa-fire" /></span>
              <h2 className="section-title">Top Sale</h2>
            </div>
          </div>
          <div className="games-grid">
            {topSale.map((game, index) => (
              <GameCard key={game.id} game={game} topSale={index < 4} index={index} />
            ))}
          </div>
        </section>

        <section id="games" className="game-section">
          <div className="section-header">
            <div className="section-header-left">
              <span className="section-icon games-icon"><i className="fa-solid fa-gamepad" /></span>
              <h2 className="section-title">Games</h2>
            </div>
          </div>
          <div className="games-grid">
            {allGames.map((game, index) => (
              <GameCard key={game.id} game={game} index={index + 4} />
            ))}
          </div>
        </section>
      </main>

      <footer className="store-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-logo"><i className="fa-solid fa-gamepad" /></span>
            <span className="footer-brand-name">GAMEVAULT</span>
          </div>

          <div className="footer-copy">
            &copy; 2026 GameVault. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
