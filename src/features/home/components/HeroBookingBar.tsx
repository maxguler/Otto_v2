import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOCATIONS } from '../../booking/config/constants';

export default function HeroBookingBar() {
  const navigate = useNavigate();
  const today = new Date().toISOString().slice(0, 10);

  const [locationPickup, setLocationPickup] = useState('');
  const [locationDropoff, setLocationDropoff] = useState('');
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');

  const canSubmit = locationPickup && locationDropoff && pickup && dropoff;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    const params = new URLSearchParams({
      locationPickup,
      locationDropoff,
      pickup,
      dropoff,
      step: '2',
    });

    navigate(`/booking?${params.toString()}`);
  };

  return (
    <form className="hero-booking-bar" onSubmit={handleSubmit}>
      <div className="hero-booking-field">
        <label htmlFor="hb-loc-pickup">Pick-up location</label>
        <select
          id="hb-loc-pickup"
          value={locationPickup}
          onChange={(e) => setLocationPickup(e.target.value)}
          required
        >
          <option value="">Select</option>
          {Object.entries(LOCATIONS).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>

      <div className="hero-booking-field">
        <label htmlFor="hb-loc-dropoff">Drop-off location</label>
        <select
          id="hb-loc-dropoff"
          value={locationDropoff}
          onChange={(e) => setLocationDropoff(e.target.value)}
          required
        >
          <option value="">Select</option>
          {Object.entries(LOCATIONS).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>

      <div className="hero-booking-field">
        <label htmlFor="hb-pickup">Pick-up date</label>
        <input
          type="date"
          id="hb-pickup"
          value={pickup}
          min={today}
          onChange={(e) => setPickup(e.target.value)}
          required
        />
      </div>

      <div className="hero-booking-field">
        <label htmlFor="hb-dropoff">Drop-off date</label>
        <input
          type="date"
          id="hb-dropoff"
          value={dropoff}
          min={pickup || today}
          onChange={(e) => setDropoff(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary hero-booking-btn" disabled={!canSubmit}>
        Find your camper
      </button>
    </form>
  );
}
