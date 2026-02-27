import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import WhatsAppButton from '../../shared/ui/WhatsAppButton';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="container">
        <Link to="/" className="logo">
          <img src="/Logos/Logo Otto Header.png" alt="Otto Campers" className="logo-img" />
        </Link>

        <button
          className={`hamburger${menuOpen ? ' is-active' : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>

        <nav className={`header-nav${menuOpen ? ' is-open' : ''}`}>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/vehicles">Vehicles</Link></li>
            <li><Link to="/booking">Book</Link></li>
            <li><Link to="/roadtrips">Roadtrips</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
          <WhatsAppButton />
        </nav>
      </div>
    </header>
  );
}
