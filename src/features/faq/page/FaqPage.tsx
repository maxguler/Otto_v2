import { useSEO } from '../../../shared/hooks/useSEO';

const FAQ_JSONLD = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Insurance', acceptedAnswer: { '@type': 'Answer', text: 'Every rental includes basic third-party liability and collision damage waiver (CDW) for Chile and Argentina.' } },
    { '@type': 'Question', name: 'Cross-border rules (Chile & Argentina)', acceptedAnswer: { '@type': 'Answer', text: 'Our campers are approved for cross-border travel. We handle temporary import/export paperwork.' } },
    { '@type': 'Question', name: 'Driving requirements', acceptedAnswer: { '@type': 'Answer', text: 'Valid driver\'s license required. International Driving Permit recommended. Minimum age 21 (25 for Backcountry).' } },
    { '@type': 'Question', name: 'What\'s included', acceptedAnswer: { '@type': 'Answer', text: 'Full tank at pickup, kitchen kit, bedding, basic camping gear, solar/water briefing, 24/7 roadside support.' } },
  ],
});

export default function FaqPage() {
  useSEO({
    title: 'FAQ | Otto Campers | Insurance, Cross-border, Driving',
    description: 'Frequently asked questions about Otto Campers: insurance, cross-border travel Chile/Argentina, driving requirements, and what\'s included.',
    ogUrl: 'https://ottocampers.com/faq',
    jsonLd: FAQ_JSONLD,
  });

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>FAQ</h1>
          <p>Insurance, cross-border rules, driving requirements, and what's included. Everything you need before you go.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="faq-list">
            <div className="faq-item">
              <h3>Insurance</h3>
              <p>Every rental includes basic third-party liability and collision damage waiver (CDW) for Chile and Argentina. Deductible applies in case of damage; we'll explain the exact terms at booking. Optional full coverage upgrades are available. You must have a valid driver's license and be at least 21 (25 for some vehicles).</p>
            </div>
            <div className="faq-item">
              <h3>Cross-border rules (Chile &amp; Argentina)</h3>
              <p>Our campers are approved for cross-border travel between Chile and Argentina. You'll need your passport, driver's license, and the vehicle documents we provide. We handle the temporary import/export paperwork; you'll get a briefing at pickup. Some routes or seasons may have restrictions. We'll confirm when you book.</p>
            </div>
            <div className="faq-item">
              <h3>Driving requirements</h3>
              <p>You need a valid driver's license from your country of residence. An International Driving Permit (IDP) is recommended and required in some cases for non-Spanish licenses. Minimum age is 21 (25 for Otto Backcountry). Experience on gravel roads is helpful but not required; we give a full handover and driving tips at pickup.</p>
            </div>
            <div className="faq-item">
              <h3>What's included</h3>
              <p>All our campers come with: full tank of fuel at pickup, kitchen kit (stove, pots, utensils), bedding (sheets, blankets or sleeping bags on request), basic camping gear (chairs, table where applicable), solar power and water system briefing, and 24/7 roadside support number. Optional extras: additional km packages, camping gear upgrades, one-way fees for cross-country returns.</p>
            </div>
            <div className="faq-item">
              <h3>Pickup and drop-off</h3>
              <p>We offer pickup and drop-off at designated locations in Chile and Argentina (e.g. Santiago, Puerto Montt, Punta Arenas, Bariloche, Mendoza, Buenos Aires). Same-location return is standard; one-way between locations is possible with advance notice and may incur a fee. Exact times and meeting points are confirmed after booking.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
