import { formatCLP } from '../../../shared/utils/formatCLP';
import { VEHICLE_OPTIONS, LOCATIONS } from '../config/constants';
import { getSeason, getSeasonLabel, getDurationTier, getDurationTierLabel, getDailyRate } from '../config/pricing';
import type { VehicleKey } from '../types';

interface Props {
  pickup: string;
  dropoff: string;
  locationPickup: string;
  locationDropoff: string;
  vehicle: VehicleKey | '';
  days: number;
  onVehicleChange: (v: VehicleKey) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Step2Vehicle({
  pickup, dropoff, locationPickup, locationDropoff,
  vehicle, days,
  onVehicleChange, onNext, onPrev,
}: Props) {
  const summary = (pickup && dropoff
    ? `${pickup} – ${dropoff} (${days} days)`
    : '') +
    (locationPickup && locationDropoff
      ? ` · Pick-up: ${LOCATIONS[locationPickup] || locationPickup} · Drop-off: ${LOCATIONS[locationDropoff] || locationDropoff}`
      : '');

  const season = getSeason(pickup);
  const tier = getDurationTier(days);

  const selectedRate = vehicle ? getDailyRate(vehicle, season, tier) : 0;
  const subtotal = selectedRate && days ? days * selectedRate : 0;

  const handleNext = () => {
    if (!vehicle) return;
    onNext();
  };

  return (
    <div className="booking-step">
      <p className="step-summary">{summary}</p>

      <div className="season-info">
        <span className="season-badge">{getSeasonLabel(season)}</span>
        <span className="tier-badge">{getDurationTierLabel(tier)}</span>
      </div>

      <div className="form-group">
        <label>Select your vehicle</label>
        <div className="vehicle-options">
          {VEHICLE_OPTIONS.map((opt) => {
            const rate = getDailyRate(opt.key, season, tier);
            return (
              <label className="vehicle-option" key={opt.key}>
                <input
                  type="radio"
                  name="vehicle"
                  value={opt.key}
                  checked={vehicle === opt.key}
                  onChange={() => onVehicleChange(opt.key)}
                />
                <span className="vehicle-option-box">
                  <span className="vehicle-name">{opt.name}</span>
                  <span className="vehicle-desc">{opt.desc}</span>
                  <span className="vehicle-price">{formatCLP(rate)} / day</span>
                </span>
              </label>
            );
          })}
        </div>
      </div>
      <div className="price-block">
        <div className="label">Rental subtotal ({days} days × {formatCLP(selectedRate)})</div>
        <div className="amount">{subtotal ? formatCLP(subtotal) : '-'}</div>
      </div>
      <div className="step-buttons">
        <button type="button" className="btn btn-secondary" onClick={onPrev}>Back</button>
        <button type="button" className="btn btn-primary" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}
