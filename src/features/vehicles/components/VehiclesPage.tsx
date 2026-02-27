import { Link } from 'react-router-dom';
import { useSEO } from '../../../shared/hooks/useSEO';
import VehicleGallery from './VehicleGallery';

const FLEET_JSONLD = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Otto Campers Fleet',
  itemListElement: [
    { '@type': 'ListItem', position: 1, item: { '@type': 'Product', name: 'Otto Escape', description: 'Compact off-grid camper, sleeps 2. Solar, 2WD, 1.5L petrol. Chile & Argentina.' } },
    { '@type': 'ListItem', position: 2, item: { '@type': 'Product', name: 'Otto Scout', description: 'Compact 4WD overlander, sleeps 2. Solar, 1.5L petrol. Chile & Argentina.' } },
    { '@type': 'ListItem', position: 3, item: { '@type': 'Product', name: 'Otto Backcountry', description: 'Expedition rig, sleeps 2-3. 2.8L diesel, 4WD. Chile & Argentina.' } },
  ],
});

export default function VehiclesPage() {
  useSEO({
    title: 'Fleet: Otto Escape, Scout & Backcountry | Otto Campers',
    description: 'Three adventure-ready campers: Otto Escape (sleeps 2), Scout (sleeps 2, 4WD), Backcountry (sleeps 2-3, 4WD). Solar, fully equipped for Chile & Argentina.',
    ogImage: '/Otto Scout.png',
    ogUrl: 'https://ottocampers.com/vehicles',
    jsonLd: FLEET_JSONLD,
  });

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Our fleet</h1>
          <p>Three adventure-driven campers. Built for Chile, Argentina, and the road less travelled.</p>
        </div>
      </section>

      <section className="vehicle-detail" id="escape">
        <div className="container">
          <div className="vehicle-detail-grid">
            <VehicleGallery exterior="/Otto Escape.png" interior="/Otto-Escape-interior.png" alt="Otto Escape" />
            <div>
              <h2>Otto Escape</h2>
              <p>Compact and nimble. The Escape is built for couples or solo explorers who want to go far without the bulk. Perfect for Patagonian gravel, high passes, and remote camps where size matters.</p>
              <h3 style={{ marginTop: '1.5rem', fontSize: '1.1rem' }}>Key features</h3>
              <ul className="features-list">
                <li>Sleeps 2. 1 double bed (195 × 114 cm)</li>
                <li>Gas cooking stove</li>
                <li>30L fridge</li>
                <li>Kitchen sink</li>
                <li>Interior dining table</li>
                <li>Solar system + deep-cycle battery</li>
                <li>Clean water tank 40L</li>
              </ul>
              <h3 style={{ marginTop: '1rem', fontSize: '1.1rem' }}>Specs</h3>
              <ul className="spec-list">
                <li><strong>Engine</strong> 1.500cc</li>
                <li><strong>Transmission</strong> 6-speed manual</li>
                <li><strong>Fuel</strong> Petrol</li>
                <li><strong>Drive</strong> 2WD</li>
              </ul>
              <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--forest)' }}>
                <strong>Mini FAQ:</strong> Best for 1–2 people. Recommended for 7–14 day trips. Cross-border approved Chile/Argentina.
              </p>
              <Link to="/booking?vehicle=escape" className="btn btn-primary mt-2">Book this vehicle</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="vehicle-detail section-alt" id="scout">
        <div className="container">
          <div className="vehicle-detail-grid">
            <div>
              <h2>Otto Scout</h2>
              <p>Mid-size overlander with more room to move. The Scout keeps the same off-grid capability with space for a small family or longer trips. Ideal for Carretera Austral and lake districts.</p>
              <h3 style={{ marginTop: '1.5rem', fontSize: '1.1rem' }}>Key features</h3>
              <ul className="features-list">
                <li>Sleeps 2</li>
                <li>Gas cooking stove</li>
                <li>30L fridge</li>
                <li>Kitchen sink</li>
                <li>Solar system + deep-cycle battery</li>
                <li>Clean water tank 30L</li>
              </ul>
              <h3 style={{ marginTop: '1rem', fontSize: '1.1rem' }}>Specs</h3>
              <ul className="spec-list">
                <li><strong>Engine</strong> 1.5L unleaded 95 petrol</li>
                <li><strong>Transmission</strong> 5-speed manual</li>
                <li><strong>Fuel</strong> Petrol</li>
                <li><strong>Drive</strong> 4WD</li>
              </ul>
              <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                <strong>Mini FAQ:</strong> Best for 1–2 people. Compact 4WD for off-road adventures. Cross-border approved.
              </p>
              <Link to="/booking?vehicle=scout" className="btn btn-primary mt-2">Book this vehicle</Link>
            </div>
            <VehicleGallery exterior="/Otto Scout.png" interior="/Otto-Scout-interior.png" alt="Otto Scout" />
          </div>
        </div>
      </section>

      <section className="vehicle-detail" id="backcountry">
        <div className="container">
          <div className="vehicle-detail-grid">
            <VehicleGallery exterior="/Otto Backcountry.png" interior="/Otto-Backcountry-interior.png" alt="Otto Backcountry" />
            <div>
              <h2>Otto Backcountry</h2>
              <p>Full-size expedition rig. Maximum comfort, range, and storage for long hauls and harsh conditions. For crews who want to go deep and stay out longer.</p>
              <h3 style={{ marginTop: '1.5rem', fontSize: '1.1rem' }}>Key features</h3>
              <ul className="features-list">
                <li>Sleeps 2–3</li>
                <li>Gas cooking stove</li>
                <li>30L fridge</li>
                <li>Kitchen sink</li>
                <li>Solar system + deep-cycle battery</li>
                <li>Clean water tank 40L</li>
              </ul>
              <h3 style={{ marginTop: '1rem', fontSize: '1.1rem' }}>Specs</h3>
              <ul className="spec-list">
                <li><strong>Engine</strong> 2.8L diesel</li>
                <li><strong>Transmission</strong> 6-speed manual</li>
                <li><strong>Fuel</strong> Diesel</li>
                <li><strong>Drive</strong> 4WD</li>
              </ul>
              <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--forest)' }}>
                <strong>Mini FAQ:</strong> Best for 2–3 people or long expeditions. Cross-border approved. Requires standard driver's licence.
              </p>
              <Link to="/booking?vehicle=backcountry" className="btn btn-primary mt-2">Book this vehicle</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
