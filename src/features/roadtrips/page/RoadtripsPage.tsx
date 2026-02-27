import { Link } from 'react-router-dom';
import { useSEO } from '../../../shared/hooks/useSEO';

export default function RoadtripsPage() {
  useSEO({
    title: 'Road Trips | Otto Campers | Chile & Argentina',
    description: 'Four epic camper routes: Atacama Desert, Central Chile, Lakes & Volcanoes, and Patagonia. Pick up and drop off at any Otto hub. Cross-border ready.',
    ogUrl: 'https://ottocampers.com/roadtrips',
  });

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Road Trips</h1>
          <p>Four epic routes across Chile and Argentina. Pick up and drop off at any Otto hub. Cross-border ready.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="routes-grid">

            {/* North & Atacama */}
            <div className="route-card route-card--with-map">
              <div className="route-card-map">
                <img src="/route-north-atacama.png" alt="Mapa Norte y Atacama" />
              </div>
              <div className="route-card-content">
                <h3>North &amp; Atacama Desert</h3>
                <p className="route-meta">Santiago → San Pedro de Atacama · 10–18 nights</p>
                <p>
                  From the vineyards of Casablanca and the colourful streets of Valparaiso, head north along the
                  coast through La Serena and the Elqui Valley, Chile's stargazing capital. Continue to the
                  Atacama Desert: Valle de la Luna, El Tatio Geysers, altiplano lagoons and Piedras Rojas. End in
                  San Pedro de Atacama or retrace south to Santiago.
                </p>
                <div className="route-hubs">
                  <span className="route-hub-badge">Santiago</span>
                  <span className="route-hub-badge">San Pedro de Atacama</span>
                </div>
                <Link to="/booking?locationPickup=santiago&locationDropoff=san-pedro-atacama" className="btn btn-primary">Book this route</Link>
              </div>
            </div>

            {/* Central Chile */}
            <div className="route-card route-card--with-map">
              <div className="route-card-map">
                <img src="/route-central-chile.png" alt="Mapa Chile Central" />
              </div>
              <div className="route-card-content">
                <h3>Santiago, Valparaiso &amp; Central Valleys</h3>
                <p className="route-meta">Santiago (roundtrip) · 5–10 nights</p>
                <p>
                  A compact loop from Santiago. Explore the UNESCO streets of Valparaiso, surf in Pichilemu,
                  taste world-class reds in the Colchagua Valley, hike the seven waterfalls of Radal Siete Tazas,
                  and finish with Andean hot springs at Termas Valle de Colina. Perfect for shorter trips.
                </p>
                <div className="route-hubs">
                  <span className="route-hub-badge">Santiago</span>
                </div>
                <Link to="/booking?locationPickup=santiago&locationDropoff=santiago" className="btn btn-primary">Book this route</Link>
              </div>
            </div>

            {/* Lakes, Volcanoes & Chiloé */}
            <div className="route-card route-card--with-map">
              <div className="route-card-map">
                <img src="/route-lakes-volcanoes.png" alt="Mapa Lagos, Volcanes y Chiloé" />
              </div>
              <div className="route-card-content">
                <h3>Lakes, Volcanoes &amp; Chiloe</h3>
                <p className="route-meta">Santiago → Puerto Varas · 10–21 nights</p>
                <p>
                  Head south on Ruta 5 to Parque Nacional Conguillío and the Araucaria forests. Hike Volcán
                  Villarrica from Pucón, soak in thermal springs, and wind through the lakes: Calafquén,
                  Panguipulli, Ranco, Llanquihue. Catch the ferry to Chiloé for penguins and wooden churches.
                  Optional cross-border to Bariloche and the Ruta de los Siete Lagos in Argentina.
                </p>
                <div className="route-hubs">
                  <span className="route-hub-badge">Santiago</span>
                  <span className="route-hub-badge">Puerto Varas</span>
                </div>
                <Link to="/booking?locationPickup=santiago&locationDropoff=puerto-varas" className="btn btn-primary">Book this route</Link>
              </div>
            </div>

            {/* Patagonia */}
            <div className="route-card route-card--with-map">
              <div className="route-card-map">
                <img src="/route-patagonia.png" alt="Mapa Patagonia" />
              </div>
              <div className="route-card-content">
                <h3>Patagonia &amp; Carretera Austral</h3>
                <p className="route-meta">Puerto Varas → Punta Arenas · 14–30 nights</p>
                <p>
                  The ultimate road trip. Drive the 1,240 km Carretera Austral through fjords, glaciers and
                  ancient forests: Chaitén, Queulat, Cerro Castillo, marble caves of Puerto Río Tranquilo.
                  Cross into Argentina for El Chaltén, Fitz Roy, and Glaciar Perito Moreno. Return to Chile
                  for Torres del Paine and end in Punta Arenas at the edge of the world.
                </p>
                <div className="route-hubs">
                  <span className="route-hub-badge">Puerto Varas</span>
                  <span className="route-hub-badge">Punta Arenas</span>
                </div>
                <Link to="/booking?locationPickup=puerto-varas&locationDropoff=punta-arenas" className="btn btn-primary">Book this route</Link>
              </div>
            </div>

          </div>

          <div className="map-note">
            <strong>Cross-border travel:</strong> All our campers are approved for Chile and Argentina.
            We handle the paperwork. You must pick up and drop off at one of our hubs: San Pedro de Atacama,
            Santiago, Puerto Varas, or Punta Arenas. One-way between hubs is available with advance notice.
            See <Link to="/faq">FAQ</Link> for details.
          </div>
        </div>
      </section>
    </>
  );
}
