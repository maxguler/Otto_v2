import { Link } from 'react-router-dom';
import { useResumenFromStorage } from '../hooks/useResumenFromStorage';
import { formatCLP } from '../../../shared/utils/formatCLP';
import { useSEO } from '../../../shared/hooks/useSEO';

export default function ResumenPage() {
  const { payload, sent, error } = useResumenFromStorage();

  useSEO({
    title: 'Booking Summary | Otto Campers',
    description: 'Booking summary for your Otto Campers reservation. Review your dates, vehicle, and pricing.',
  });

  const renderStatus = () => {
    if (!payload) {
      return (
        <p className="resumen-alert resumen-alert-info">
          No booking data found. <Link to="/booking">Complete the booking form</Link>.
        </p>
      );
    }
    if (sent === true) {
      return (
        <p className="resumen-alert resumen-alert-success">
          &#10003; Your request has been submitted. We will review availability and contact you soon via email or WhatsApp.
        </p>
      );
    }
    if (error) {
      return (
        <p className="resumen-alert resumen-alert-warning">
          Your request was saved but could not be sent to the server: {error}. You can contact us at{' '}
          <a href="mailto:hello@ottocampers.com">hello@ottocampers.com</a> with the details below.
        </p>
      );
    }
    return (
      <p className="resumen-alert resumen-alert-info">
        Review your booking details. If something is wrong, submit a <Link to="/booking">new request</Link>.
      </p>
    );
  };

  const addonsText = payload?.addons?.length ? payload.addons.join(', ') : 'None';

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Booking summary</h1>
          <p>Review your details. We will contact you to confirm availability.</p>
        </div>
      </section>

      <section className="booking-section">
        <div className="container">
          <div className="booking-card resumen-card">
            <div>{renderStatus()}</div>

            {payload && (
              <div className="resumen-grid">
                <div className="resumen-block">
                  <h3>Contact</h3>
                  <p>
                    <strong>{payload.nombre || '-'}</strong><br />
                    {payload.correo || '-'}<br />
                    {payload.telefono || '-'}
                  </p>
                </div>
                <div className="resumen-block">
                  <h3>Dates</h3>
                  <p>
                    Pick-up: {payload.pickup || '-'}<br />
                    Drop-off: {payload.dropoff || '-'}{' '}
                    <span className="resumen-days">({payload.days || 0} days)</span>
                  </p>
                </div>
                <div className="resumen-block">
                  <h3>Locations</h3>
                  <p>
                    Pick-up: {payload.locationPickupLabel || '-'}<br />
                    Drop-off: {payload.locationDropoffLabel || '-'}
                  </p>
                </div>
                <div className="resumen-block">
                  <h3>Vehicle</h3>
                  <p>
                    {payload.vehicleLabel || '-'}<br />
                    {payload.season && <span className="resumen-days">{payload.season}</span>}
                    {payload.dailyRate > 0 && <><br />{formatCLP(payload.dailyRate)} / day</>}
                  </p>
                </div>
                {(payload.pickupFee > 0 || payload.dropoffFee > 0) && (
                  <div className="resumen-block">
                    <h3>Location fees</h3>
                    <p>
                      {payload.pickupFee > 0 && <>Pick-up: {formatCLP(payload.pickupFee)}<br /></>}
                      {payload.dropoffFee > 0 && <>Drop-off: {formatCLP(payload.dropoffFee)}</>}
                    </p>
                  </div>
                )}
                {payload.discountCode && (
                  <div className="resumen-block">
                    <h3>Discount</h3>
                    <p>Code: {payload.discountCode} ({payload.discountPercent}%)</p>
                  </div>
                )}
                <div className="resumen-block">
                  <h3>Add-ons</h3>
                  <p>{addonsText}</p>
                </div>
                <div className="resumen-block resumen-total">
                  <h3>Estimated total</h3>
                  <p className="resumen-amount">{formatCLP(payload.total)}</p>
                </div>
              </div>
            )}

            <div className="resumen-actions">
              <Link to="/booking" className="btn btn-secondary">New request</Link>
              <Link to="/" className="btn btn-primary">Back to home</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
