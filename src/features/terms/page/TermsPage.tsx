import { useSEO } from '../../../shared/hooks/useSEO';

const TOC = [
  { id: 'rental-term', label: '1. Rental Term & Cancellations' },
  { id: 'pickup-dropoff', label: '2. Pick-up & Drop-off' },
  { id: 'office-hours', label: '3. Office Hours' },
  { id: 'extensions', label: '4. Rental Extensions' },
  { id: 'argentina', label: '5. Travelling to Argentina' },
  { id: 'driver-reqs', label: '6. Driver Requirements' },
  { id: 'vehicle-use', label: '7. Use of the Vehicle' },
  { id: 'maintenance', label: '8. Maintenance & Repairs' },
  { id: 'roadside', label: '9. Roadside Assistance' },
  { id: 'liability', label: '10. Liability & Security Deposit' },
  { id: 'accident', label: '11. Accident Procedures' },
  { id: 'traffic', label: '12. Traffic Offences & Tolls' },
  { id: 'payments', label: '13. Payments' },
  { id: 'limitation', label: '14. Limitation of Liability' },
  { id: 'termination', label: '15. Termination' },
  { id: 'governing-law', label: '16. Governing Law' },
  { id: 'responsibilities', label: 'Tenant Responsibilities' },
];

export default function TermsPage() {
  useSEO({
    title: 'Terms & Conditions | Otto Campers',
    description:
      'Rental terms, cancellation policy, liability, and conditions for Otto Campers campervan hire in Chile and Patagonia.',
    ogUrl: 'https://ottocampers.com/terms',
  });

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Terms &amp; Conditions</h1>
          <p>Otto Campers Rental Agreement. Chile &amp; Patagonia</p>
        </div>
      </section>

      <section className="section terms-page">
        <div className="container terms-layout">

          {/* Table of contents sidebar */}
          <aside className="terms-toc">
            <h3>Contents</h3>
            <ul>
              {TOC.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>{item.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          {/* Main content */}
          <div className="terms-body">

            <div className="terms-intro-box">
              <p>
                This Rental Agreement (&quot;Agreement&quot;) is entered between <strong>Otto Campers</strong> (&quot;Otto&quot;)
                and the Tenant and outlines the rights and obligations of both parties relating to the rental
                of a camper vehicle. &quot;Vehicle&quot; means the vehicle hired by the Tenant including any mounted
                camper module, rooftop tent, tyres, tools, accessories, camping equipment, and all related items.
              </p>
            </div>

            {/* Highlights strip */}
            <div className="terms-highlights">
              <div className="terms-highlight-item">
                <span className="terms-highlight-icon">&#x2713;</span>
                <span>Unlimited kilometres</span>
              </div>
              <div className="terms-highlight-item">
                <span className="terms-highlight-icon">&#x2713;</span>
                <span>No additional driver fees</span>
              </div>
              <div className="terms-highlight-item">
                <span className="terms-highlight-icon">&#x2713;</span>
                <span>Cross-border ready</span>
              </div>
              <div className="terms-highlight-item">
                <span className="terms-highlight-icon">&#x2713;</span>
                <span>24/7 roadside assistance</span>
              </div>
            </div>

            {/* Section 1 */}
            <div className="terms-section" id="rental-term">
              <h2>1. Rental Term, Extensions &amp; Cancellations</h2>
              <div className="terms-summary">Your rental starts and ends on the agreed dates. Early returns are not refunded, and cancellations have specific fees.</div>
              <p>1.1 The rental term runs from the pick-up date until the Vehicle is returned to Otto, regardless of pick-up or drop-off time. Rental days are calculated on a calendar-day basis. The day of pick-up counts as day one.</p>
              <p>1.2 The minimum rental period is <strong>5 days</strong> when pick-up and drop-off are at the same location.</p>
              <p>1.3 <strong>Unlimited kilometres</strong> are included with every rental. There are no mileage caps or extra-km charges.</p>
              <p>1.4 <strong>No additional driver fees.</strong> Extra drivers are included at no extra cost, provided they meet the licence and age requirements outlined in this Agreement.</p>
              <p>1.5 One-way rentals are available between all Otto hub locations (Santiago, San Pedro de Atacama, Puerto Varas, Punta Arenas). Location fees apply as listed at the time of booking.</p>

              <h3>Cancellation fees</h3>
              <table className="terms-table">
                <thead>
                  <tr><th>Notice period</th><th>Fee</th></tr>
                </thead>
                <tbody>
                  <tr><td>30+ days before pick-up</td><td>20% of total rental</td></tr>
                  <tr><td>29–19 days before pick-up</td><td>30% of total rental</td></tr>
                  <tr><td>18–7 days before pick-up</td><td>50% of total rental</td></tr>
                  <tr><td>6 days or less / no-show</td><td>100% of total rental</td></tr>
                  <tr><td>Early return</td><td>No refund</td></tr>
                </tbody>
              </table>

              <p>1.6 In cases of <strong>Force Majeure</strong> (natural disasters, pandemics, political unrest), Otto may issue a voucher for the amount paid, valid for two (2) years from the original booking date, redeemable at the rate applicable at the time of rebooking.</p>
            </div>

            {/* Section 2 */}
            <div className="terms-section" id="pickup-dropoff">
              <h2>2. Pick-up &amp; Drop-off</h2>
              <div className="terms-summary">Inspect your camper carefully at pick-up and return it clean, on time, and with the same fuel level.</div>
              <p>2.1 The Tenant must inspect the Vehicle upon pick-up and note any existing damage on the condition report. By taking possession, the Tenant acknowledges receiving the Vehicle in good working order.</p>
              <p>2.2 The Vehicle must be returned on the agreed date, during office hours, at the agreed location, clean and with the same fuel level as at pick-up.</p>
              <p>2.3 If the Vehicle is returned dirty or with less fuel, a cleaning and/or refuelling fee will apply.</p>
              <p>2.4 Late returns without prior approval incur the daily rental rate plus a penalty fee per day.</p>
              <p>2.5 One-way rentals are available between all Otto hubs: Santiago, San Pedro de Atacama, Puerto Varas, and Punta Arenas.</p>
            </div>

            {/* Section 3 */}
            <div className="terms-section" id="office-hours">
              <h2>3. Office Hours</h2>
              <div className="terms-summary">Plan to pick up and return your camper during business hours unless you've arranged an out-of-hours service.</div>
              <table className="terms-table">
                <thead>
                  <tr><th>Day</th><th>Hours</th></tr>
                </thead>
                <tbody>
                  <tr><td>Monday – Friday</td><td>10:00 AM – 5:00 PM</td></tr>
                  <tr><td>Saturday</td><td>10:00 AM – 1:00 PM</td></tr>
                  <tr><td>Sunday &amp; Public Holidays</td><td>Closed</td></tr>
                </tbody>
              </table>
              <p>3.1 Pick-ups or drop-offs outside operating hours must be arranged and approved in advance. Unauthorised out-of-hours returns will incur additional fees.</p>
            </div>

            {/* Section 4 */}
            <div className="terms-section" id="extensions">
              <h2>4. Rental Extensions</h2>
              <div className="terms-summary">Want to keep exploring? Let us know early. Extensions must be authorised and prepaid.</div>
              <p>4.1 Extensions must be requested and approved by Otto before the current rental term expires. Extensions are subject to availability and will be charged at the current daily rate.</p>
              <p>4.2 Unauthorised extensions are subject to the daily rate plus a penalty fee per day.</p>
              <p>4.3 For cross-border rentals, the Tenant must ensure that border-crossing documents remain valid. If they expire, new documents must be issued by Otto before re-entry into Argentina.</p>
            </div>

            {/* Section 5 */}
            <div className="terms-section" id="argentina">
              <h2>5. Travelling to Argentina</h2>
              <div className="terms-summary">Cross-border trips are welcome. You must depart from and return to an Otto hub in Chile.</div>
              <p>5.1 Cross-border travel to Argentina is permitted. The Tenant must pick up and return the Vehicle at an Otto hub location in Chile.</p>
              <p>5.2 An <strong>Argentina Permit &amp; Insurance</strong> is mandatory for all cross-border trips. This must be requested at booking time and requires at least 2 business days for processing.</p>
              <p>5.3 The permit is valid for multiple entries and must cover the entire rental period.</p>
              <p>5.4 In case of breakdown in Argentina, the Tenant must return the Vehicle to Chile. If Otto is responsible for the failure, repair costs will be refunded at the official exchange rate.</p>
            </div>

            {/* Section 6 */}
            <div className="terms-section" id="driver-reqs">
              <h2>6. Driver Requirements</h2>
              <div className="terms-summary">You need a valid, full driver's licence. Every driver must be registered in the agreement.</div>
              <p>6.1 All drivers must present a valid, full (non-probationary) driver's licence at pick-up and must have held it for at least <strong>2 years</strong>.</p>
              <p>6.2 Foreign licences are accepted if written in English or Spanish. Otherwise, an International Driving Permit (IDP) is required alongside the national licence.</p>
              <p>6.3 Drivers must be at least <strong>21 years old</strong>. All drivers must be registered in the Rental Agreement.</p>
            </div>

            {/* Section 7 */}
            <div className="terms-section" id="vehicle-use">
              <h2>7. Use of the Vehicle</h2>
              <div className="terms-summary">Drive responsibly. Misuse or off-road driving voids your cover and makes you liable for all damage.</div>
              <p>7.1 The Tenant must use the Vehicle with care and only on authorised roads. Misuse, reckless driving, or negligence voids all damage cover.</p>
              <p>7.2 <strong>The Vehicle must not be used:</strong></p>
              <ul>
                <li>Under the influence of alcohol, drugs, or impairing medication</li>
                <li>On beaches, rivers, salt flats, or flooded terrain</li>
                <li>For racing, towing, or carrying passengers for hire</li>
                <li>For transporting flammable, toxic, or illegal materials</li>
                <li>In underground parking if the Vehicle exceeds 2 metres in height</li>
              </ul>
              <p>7.3 The Tenant must perform basic daily checks (oil, coolant, tyre pressure, battery) and immediately report warning lights or mechanical issues to Otto.</p>
              <p>7.4 Otto may restrict travel in specific areas due to road or weather conditions.</p>
            </div>

            {/* Section 8 */}
            <div className="terms-section" id="maintenance">
              <h2>8. Maintenance &amp; Repairs on the Road</h2>
              <div className="terms-summary">Inform Otto before any repairs. Unauthorised repairs are not reimbursed.</div>
              <p>8.1 The Tenant must inform Otto and obtain approval before any repairs. Unauthorised repairs are at the Tenant's risk and cost.</p>
              <p>8.2 Reimbursements apply only if the repair was approved by Otto, the Tenant is not responsible for the issue, and original invoices are submitted within <strong>48 hours</strong> of Vehicle return.</p>
              <p>8.3 Malfunctions of accessories (radio, interior lights, water pump) are not considered mechanical breakdowns and do not qualify for compensation.</p>
              <p>8.4 If the camper structure becomes uninhabitable but the Vehicle remains drivable, the Tenant is entitled to a refund equal to 30% of the daily rental rate for each affected day.</p>
              <p>8.5 Destroyed tyres must be replaced with new ones of the same size. Otherwise, Otto will charge the replacement cost at drop-off.</p>
            </div>

            {/* Section 9 */}
            <div className="terms-section" id="roadside">
              <h2>9. Roadside Assistance</h2>
              <div className="terms-summary">Otto provides 24/7 remote support. If the problem is caused by misuse, you cover the cost.</div>
              <p>9.1 Otto provides <strong>24/7 remote roadside assistance</strong> via phone, WhatsApp, or email to help resolve issues or coordinate third-party help.</p>
              <p>9.2 The service includes remote technical guidance, coordination of local mechanics or towing services, and navigation or travel advice.</p>
              <p>9.3 <strong>The following situations are not covered</strong> and must be paid by the Tenant:</p>
              <ul>
                <li>Running out of fuel</li>
                <li>Lost or locked keys</li>
                <li>Flat batteries from leaving lights or devices on</li>
                <li>Getting stuck in sand, water, or mud</li>
                <li>Flat or damaged tyres caused by misuse</li>
                <li>Towing or recovery due to off-road or negligent driving</li>
              </ul>
              <p>9.4 In case of breakdown in Argentina, the Tenant must return the Vehicle to Chile for inspection. If Otto is responsible, repair costs will be refunded at the official exchange rate.</p>
            </div>

            {/* Section 10 */}
            <div className="terms-section" id="liability">
              <h2>10. Liability &amp; Security Deposit</h2>
              <div className="terms-summary">You're responsible for any damage up to your bond amount. Some situations are never covered.</div>
              <p>10.1 The Tenant is responsible for all damage (direct or indirect) to the Vehicle, third-party property, or infrastructure while the Vehicle is under their control.</p>
              <p>10.2 A <strong>security deposit (bond)</strong> will be held on the Tenant's credit card at pick-up. Cash payments are not accepted. The deposit is released within 5 business days after return if no issues are found.</p>
              <p>10.3 The Tenant's liability may be reduced by selecting a <strong>Damage Cover</strong> option at pick-up.</p>
              <p>10.4 For rentals exceeding 30 days, Otto may re-authorise or renew the bond automatically.</p>

              <h3>Exclusions (not covered by any plan)</h3>
              <ul>
                <li>Single-vehicle accidents (rollover, tipping)</li>
                <li>Damage to roof, underbody, interior, or tyres (unless in a multi-vehicle accident)</li>
                <li>Driving under the influence of alcohol or drugs</li>
                <li>Water submersion, beach or river driving</li>
                <li>Wrong fuel use</li>
                <li>Gearbox or clutch damage from misuse</li>
                <li>Theft if keys were left inside</li>
                <li>Failure to report incidents to Otto and police within 24 hours</li>
                <li>Damage caused by unregistered drivers</li>
                <li>Improper use of snow chains or 4WD system</li>
                <li>Collision with a fixed object or accident while reversing</li>
                <li>Damage caused by carrying animals</li>
                <li>Incorrect use of the vehicle jack</li>
              </ul>

              <p>10.5 If the Vehicle is deemed undrivable due to an accident, the Tenant forfeits any remaining rental days and no refund will be provided. The Tenant is not automatically entitled to a replacement vehicle.</p>
            </div>

            {/* Section 11 */}
            <div className="terms-section" id="accident">
              <h2>11. Accident Procedures</h2>
              <div className="terms-summary">Stay calm, collect details, call the police, and contact Otto within 24 hours.</div>
              <p>11.1 In the event of an accident, the Tenant must:</p>
              <ol>
                <li>Stop immediately and ensure everyone's safety</li>
                <li>Obtain names, addresses, and contacts of all parties and witnesses</li>
                <li>Report the accident to the police immediately</li>
                <li>Take photos of all damage, the location, and vehicle plates</li>
                <li>Contact Otto within 24 hours with the details and supporting photos</li>
              </ol>
              <p>11.2 <strong>Do not admit fault</strong> or make private agreements at the scene.</p>
              <p>11.3 The Tenant must present the police report, driver's licence, and all documentation at drop-off.</p>
              <p>11.4 The applicable bond amount will be charged at the time the accident report is completed. If Otto recovers damages from a third party, the amount will be refunded.</p>
            </div>

            {/* Section 12 */}
            <div className="terms-section" id="traffic">
              <h2>12. Traffic Offences &amp; Tolls</h2>
              <div className="terms-summary">You're responsible for all traffic fines and tolls. Otto will charge them to your card plus an admin fee.</div>
              <p>12.1 The Tenant is responsible for all parking, toll, and traffic violations during the rental period.</p>
              <p>12.2 Otto will charge any fines received, plus an administration fee per incident, to the Tenant's card. This may occur up to <strong>15 months</strong> after the offence date.</p>
              <p>12.3 The Tenant authorises Otto to disclose personal details to authorities for the purpose of resolving traffic violations.</p>
            </div>

            {/* Section 13 */}
            <div className="terms-section" id="payments">
              <h2>13. Payments</h2>
              <div className="terms-summary">All prices in CLP. Accepted methods: Visa, MasterCard, American Express.</div>
              <p>13.1 All prices are quoted and payable in <strong>Chilean Pesos (CLP)</strong>.</p>
              <p>13.2 Payment is due as specified at the time of booking.</p>
              <p>13.3 Accepted payment methods: Visa, MasterCard, American Express. Cash and cheques are not accepted.</p>
              <p>13.4 The Tenant authorises Otto to charge their card for any outstanding amounts including damages, fines, tolls, or administrative fees.</p>
              <p>13.5 Small variations may occur due to bank fees or exchange fluctuations. Otto accepts no liability for such variations.</p>
            </div>

            {/* Section 14 */}
            <div className="terms-section" id="limitation">
              <h2>14. Limitation of Liability</h2>
              <div className="terms-summary">Otto's liability is limited to the cost of your rental. No compensation for indirect losses.</div>
              <p>14.1 Otto shall not be liable for indirect or consequential damages, including but not limited to:</p>
              <ul>
                <li>Missed flights, hotels, or tours</li>
                <li>Loss of enjoyment or delays</li>
                <li>Theft or loss of personal belongings</li>
              </ul>
              <p>14.2 If a mechanical failure under Otto's responsibility prevents Vehicle use, the Tenant is entitled to a refund limited to the daily rental rate for each affected day.</p>
              <p>14.3 Otto is not responsible for personal items left in the Vehicle after return.</p>
              <p>14.4 Tenants are strongly encouraged to obtain personal <strong>travel insurance</strong> covering trip interruption, accidents, and personal property.</p>
            </div>

            {/* Section 15 */}
            <div className="terms-section" id="termination">
              <h2>15. Termination</h2>
              <div className="terms-summary">Otto can end this Agreement if you breach its terms or use the Vehicle improperly.</div>
              <p>15.1 Otto may terminate this Agreement and repossess the Vehicle at any time if the Tenant breaches any provision, provides false information, operates the Vehicle recklessly or illegally, or fails to make due payments.</p>
              <p>15.2 Upon termination, Otto may repossess the Vehicle without prior notice and at the Tenant's expense. No refund applies for unused rental days.</p>
              <p>15.3 The Tenant remains responsible for towing, transport, or relocation costs back to the nearest Otto hub.</p>
            </div>

            {/* Section 16 */}
            <div className="terms-section" id="governing-law">
              <h2>16. Governing Law</h2>
              <div className="terms-summary">Chilean law applies. Any dispute is handled by the courts of Santiago.</div>
              <p>16.1 This Agreement is governed by and construed in accordance with the laws of Chile.</p>
              <p>16.2 Any dispute arising from this Agreement shall be submitted to the courts of Santiago, Chile, which have exclusive jurisdiction.</p>
              <p>16.3 If any clause of this Agreement is found invalid, the remaining clauses shall remain in effect.</p>
            </div>

            {/* Responsibilities */}
            <div className="terms-section terms-responsibilities" id="responsibilities">
              <h2>Tenant Responsibilities</h2>
              <div className="terms-summary">Damaging the Vehicle will cost you in repairs. While it is in your hands, you are responsible for it.</div>

              <div className="terms-resp-grid">
                <div className="terms-resp-card">
                  <strong>Drive carefully on unsealed roads</strong>
                  <p>Go slowly on gravel, especially on Ruta 40 (Argentina) and Carretera Austral (Chile).</p>
                </div>
                <div className="terms-resp-card">
                  <strong>Monitor engine temperature</strong>
                  <p>Never let it go above halfway. If it rises, stop driving and call roadside assistance.</p>
                </div>
                <div className="terms-resp-card">
                  <strong>Check water &amp; oil daily</strong>
                  <p>Every morning and at every fuel stop. Immediately report any issues.</p>
                </div>
                <div className="terms-resp-card">
                  <strong>Check tyre pressure</strong>
                  <p>Visually every morning. Use a gauge at petrol stations. Pressure info is on the driver-side door frame.</p>
                </div>
                <div className="terms-resp-card">
                  <strong>Use the correct fuel</strong>
                  <p>Ask for &quot;93&quot; in Chile and &quot;super&quot; in Argentina for petrol engines. &quot;Diesel&quot; for diesel engines.</p>
                </div>
                <div className="terms-resp-card">
                  <strong>Obey speed limits</strong>
                  <p>All fines (even a year later) will be charged to your card.</p>
                </div>
                <div className="terms-resp-card">
                  <strong>No beach, salt flat, or mud driving</strong>
                  <p>Avoid sand, water, and flooded terrain. Getting stuck is at your own cost.</p>
                </div>
                <div className="terms-resp-card">
                  <strong>Avoid underground parking</strong>
                  <p>Unless your vehicle fits. Do not trust maximum height signs.</p>
                </div>
                <div className="terms-resp-card">
                  <strong>Return the Vehicle clean</strong>
                  <p>Inside and outside. Cleaning fees apply otherwise.</p>
                </div>
                <div className="terms-resp-card">
                  <strong>Return on the agreed date</strong>
                  <p>Late returns incur daily penalties. Contact us in advance for extensions.</p>
                </div>
              </div>

              <div className="terms-emergency-grid">
                <div className="terms-emergency-card">
                  <h3>In case of breakdown</h3>
                  <ol>
                    <li>Turn on hazard lights and use warning triangles</li>
                    <li>Call Otto Roadside Assistance. We will help you</li>
                  </ol>
                </div>
                <div className="terms-emergency-card">
                  <h3>In case of accident</h3>
                  <ol>
                    <li>Turn on hazard lights and use warning triangles</li>
                    <li>Call Otto Roadside Assistance with details and photos</li>
                    <li>Note other drivers: name, ID, plate number, insurance</li>
                    <li>File a police report at the nearest station</li>
                  </ol>
                </div>
              </div>

              <h3>Safety tips</h3>
              <ul>
                <li>Always lock the vehicle and avoid leaving valuables in plain sight</li>
                <li>You can wild camp in Chile and Argentina. Both countries are safe for overnight stops in rest areas, national parks, and remote spots</li>
                <li>Download offline maps (maps.me) and check iOverlander for camping spots</li>
                <li>If crossing to Argentina, double-check your border documents at pick-up</li>
                <li>Chilean and Argentine police are strict but fair. Always cooperate politely</li>
              </ul>
            </div>

            <div className="terms-closing-box">
              <p>
                By signing the Rental Agreement at pick-up, you confirm that you have read, understood, and
                agree to these Terms &amp; Conditions.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
