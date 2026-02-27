import { Link } from 'react-router-dom';
import { useSEO } from '../../../shared/hooks/useSEO';
import HeroBookingBar from './HeroBookingBar';

const ORG_JSONLD = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Otto Campers',
  description: 'Premium off-grid camper rentals in Chile and Patagonia. Cross-border travel to Argentina.',
  url: 'https://ottocampers.com',
  areaServed: [
    { '@type': 'Country', name: 'Chile' },
    { '@type': 'Country', name: 'Argentina' },
  ],
});

export default function HomePage() {
  useSEO({
    title: 'Otto Campers | Premium Off-Grid Camper Rentals in Chile & Patagonia',
    description: 'Rent fully equipped off-grid campers in Chile and Patagonia. Cross-border travel to Argentina. Solar, water, 4WD. Adventure-ready.',
    ogImage: '/Otto Backcountry.png',
    ogUrl: 'https://ottocampers.com/',
    jsonLd: ORG_JSONLD,
  });

  return (
    <>
      <section className="hero">
        <h1>Live the experience.</h1>
        <p className="tagline">Premium off-grid camper rentals in Chile and Patagonia. Fully equipped. Cross-border ready.</p>
        <HeroBookingBar />
      </section>

      <section className="section">
        <div className="container text-center">
          <h2 className="section-title">Why Otto</h2>
          <p className="section-subtitle">Rugged, reliable, intentional. Built for exploration.</p>
          <div className="value-grid">
            <div className="value-card">
              <h3>Fully equipped off-grid campers</h3>
              <p>Solar, water, fridge, cooking gear, and everything you need to go anywhere. No hookups required.</p>
            </div>
            <div className="value-card">
              <h3>Cross-border travel</h3>
              <p>Chile and Argentina. One trip, two countries. We handle the paperwork so you focus on the road.</p>
            </div>
            <div className="value-card">
              <h3>Unlimited kilometres</h3>
              <p>Drive as far as you want with no mileage caps. Every road, every detour, all included in your rate.</p>
            </div>
            <div className="value-card">
              <h3>No additional driver fees</h3>
              <p>Add as many drivers as you need at no extra cost. Share the wheel and enjoy the ride together.</p>
            </div>
            <div className="value-card">
              <h3>No hidden fees</h3>
              <p>What you see is what you pay. No surprise charges, no fine print. Just honest, upfront pricing.</p>
            </div>
            <div className="value-card">
              <h3>Easy booking &amp; flexible routes</h3>
              <p>Pick your dates, choose your camper, and hit the road. Simple, transparent pricing and support.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container text-center">
          <h2 className="section-title">Our fleet</h2>
          <p className="section-subtitle">Three vehicles. One standard: adventure-ready.</p>
          <div className="vehicle-grid">
            <div className="vehicle-card">
              <div className="vehicle-card-image" style={{ backgroundImage: "url('/Otto Escape.png')" }} />
              <div className="vehicle-card-body">
                <h3>Otto Escape</h3>
                <p>Compact, nimble, perfect for two. Ideal for gravel roads and remote camps.</p>
                <Link to="/vehicles#escape" className="btn btn-primary">View details</Link>
              </div>
            </div>
            <div className="vehicle-card">
              <div className="vehicle-card-image" style={{ backgroundImage: "url('/Otto Scout.png')" }} />
              <div className="vehicle-card-body">
                <h3>Otto Scout</h3>
                <p>Mid-size overlander. More space, same capability. Sleeps up to four.</p>
                <Link to="/vehicles#scout" className="btn btn-primary">View details</Link>
              </div>
            </div>
            <div className="vehicle-card">
              <div className="vehicle-card-image" style={{ backgroundImage: "url('/Otto Backcountry.png')" }} />
              <div className="vehicle-card-body">
                <h3>Otto Backcountry</h3>
                <p>Full-size expedition rig. Maximum comfort and range for long hauls.</p>
                <Link to="/vehicles#backcountry" className="btn btn-primary">View details</Link>
              </div>
            </div>
          </div>
          <p className="mt-2"><Link to="/vehicles" className="btn btn-secondary">See all vehicles</Link></p>
        </div>
      </section>

      <section className="section">
        <div className="container text-center">
          <h2 className="section-title">Travel inspiration</h2>
          <p className="section-subtitle">Chile and Argentina. Roundtrips and one-way routes. Your route, your pace.</p>
          <p>From Patagonia to the Atacama, we've mapped routes that work with our campers and cross-border rules. <Link to="/roadtrips">Explore roadtrips →</Link></p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container text-center">
          <h2 className="section-title">Ready to go?</h2>
          <p className="section-subtitle mb-2">Pick your dates. Choose your camper. We'll take care of the rest.</p>
          <Link to="/booking" className="btn btn-primary">Book your camper</Link>
        </div>
      </section>
    </>
  );
}
