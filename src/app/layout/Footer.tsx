import { Link } from 'react-router-dom';
import SocialLinks from '../../shared/ui/SocialLinks';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div>
          <h4>Otto Campers</h4>
          <p>Premium off-grid camper rentals in Chile and Patagonia.</p>
          <SocialLinks className="footer-social" />
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            <li><Link to="/vehicles">Vehicles</Link></li>
            <li><Link to="/booking">Book</Link></li>
            <li><Link to="/roadtrips">Roadtrips</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:hello@ottocampers.com">hello@ottocampers.com</a></li>
            <li><Link to="/terms" className="footer-terms-link">Terms &amp; Conditions</Link></li>
          </ul>
        </div>
        <div className="footer-bottom">
          &copy; Otto Campers. Chile &amp; Argentina.
        </div>
      </div>
    </footer>
  );
}
