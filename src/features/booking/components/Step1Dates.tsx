import { LOCATIONS, LOCATION_FEES } from '../config/constants';
import { formatCLP } from '../../../shared/utils/formatCLP';

interface Props {
  pickup: string;
  dropoff: string;
  locationPickup: string;
  locationDropoff: string;
  onPickupChange: (v: string) => void;
  onDropoffChange: (v: string) => void;
  onLocationPickupChange: (v: string) => void;
  onLocationDropoffChange: (v: string) => void;
  onNext: () => void;
}

export default function Step1Dates({
  pickup, dropoff, locationPickup, locationDropoff,
  onPickupChange, onDropoffChange,
  onLocationPickupChange, onLocationDropoffChange,
  onNext,
}: Props) {
  const today = new Date().toISOString().slice(0, 10);

  const pickupFee = locationPickup ? LOCATION_FEES[locationPickup]?.pickup ?? 0 : 0;
  const dropoffFee = locationDropoff ? LOCATION_FEES[locationDropoff]?.dropoff ?? 0 : 0;

  const handleNext = () => {
    if (!pickup || !dropoff || !locationPickup || !locationDropoff) return;
    onNext();
  };

  return (
    <div className="booking-step">
      <div className="form-group">
        <label htmlFor="pickup">Pick-up date</label>
        <input type="date" id="pickup" value={pickup} min={today} onChange={(e) => onPickupChange(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="dropoff">Drop-off date</label>
        <input type="date" id="dropoff" value={dropoff} min={pickup || today} onChange={(e) => onDropoffChange(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="location-pickup">Pick-up location</label>
        <select id="location-pickup" value={locationPickup} onChange={(e) => onLocationPickupChange(e.target.value)} required>
          <option value="">Select location</option>
          {Object.entries(LOCATIONS).map(([key, label]) => {
            const fee = LOCATION_FEES[key]?.pickup ?? 0;
            const suffix = fee > 0 ? ` (+${formatCLP(fee)})` : '';
            return <option key={key} value={key}>{label}{suffix}</option>;
          })}
        </select>
        {pickupFee > 0 && (
          <p className="field-hint">Remote pick-up fee: {formatCLP(pickupFee)}</p>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="location-dropoff">Drop-off location</label>
        <select id="location-dropoff" value={locationDropoff} onChange={(e) => onLocationDropoffChange(e.target.value)} required>
          <option value="">Select location</option>
          {Object.entries(LOCATIONS).map(([key, label]) => {
            const fee = LOCATION_FEES[key]?.dropoff ?? 0;
            const suffix = fee > 0 ? ` (+${formatCLP(fee)})` : '';
            return <option key={key} value={key}>{label}{suffix}</option>;
          })}
        </select>
        {dropoffFee > 0 && (
          <p className="field-hint">Remote drop-off fee: {formatCLP(dropoffFee)}</p>
        )}
      </div>
      {(pickupFee > 0 || dropoffFee > 0) && (
        <div className="price-block">
          <div className="label">Location fees</div>
          <div className="amount">{formatCLP(pickupFee + dropoffFee)}</div>
        </div>
      )}
      <button type="button" className="btn btn-primary" onClick={handleNext}>Next</button>
    </div>
  );
}
