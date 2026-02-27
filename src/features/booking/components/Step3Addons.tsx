import { formatCLP } from '../../../shared/utils/formatCLP';
import { ADDONS, VEHICLE_NAMES } from '../config/constants';
import { validateDiscountCode } from '../config/pricing';
import type { VehicleKey, PricingBreakdown } from '../types';

interface Props {
  vehicle: VehicleKey | '';
  days: number;
  pricing: PricingBreakdown;
  selectedAddons: string[];
  discountCode: string;
  nombre: string;
  correo: string;
  telefono: string;
  submitting: boolean;
  onToggleAddon: (value: string) => void;
  onDiscountCodeChange: (v: string) => void;
  onNombreChange: (v: string) => void;
  onCorreoChange: (v: string) => void;
  onTelefonoChange: (v: string) => void;
  onPrev: () => void;
  onSubmit: () => void;
}

export default function Step3Addons({
  vehicle, days, pricing, selectedAddons, discountCode,
  nombre, correo, telefono, submitting,
  onToggleAddon, onDiscountCodeChange,
  onNombreChange, onCorreoChange, onTelefonoChange,
  onPrev, onSubmit,
}: Props) {
  const vehicleLabel = vehicle ? VEHICLE_NAMES[vehicle as VehicleKey] : '';
  const summary = vehicleLabel ? `${vehicleLabel} · ${days} days · ${pricing.seasonLabel}` : '';

  const discount = validateDiscountCode(discountCode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !correo.trim() || !telefono.trim()) return;
    onSubmit();
  };

  return (
    <form className="booking-step" onSubmit={handleSubmit}>
      <p className="step-summary">{summary}</p>

      {/* Discount code */}
      <div className="form-group">
        <label htmlFor="discount-code">Discount code</label>
        <div className="discount-input-row">
          <input
            type="text"
            id="discount-code"
            value={discountCode}
            onChange={(e) => onDiscountCodeChange(e.target.value.toUpperCase())}
            placeholder="Ej. OTTO10"
            autoComplete="off"
          />
          {discountCode.trim() && (
            <span className={`discount-status ${discount.valid ? 'discount-valid' : 'discount-invalid'}`}>
              {discount.valid ? `${discount.label}` : 'Invalid code'}
            </span>
          )}
        </div>
      </div>

      {/* Add-ons */}
      <div className="form-group">
        <label>Add-ons (optional)</label>
        <p className="addon-hint">All prices in CLP. Includes basic insurance and km package.</p>
        <table className="addon-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th className="addon-th-checkbox"></th>
            </tr>
          </thead>
          <tbody>
            {ADDONS.map((addon) => (
              <tr key={addon.value}>
                <td>{addon.label}</td>
                <td>{addon.priceLabel}</td>
                <td className="addon-td-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedAddons.includes(addon.value)}
                      onChange={() => onToggleAddon(addon.value)}
                    />
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Contact info */}
      <div className="form-group">
        <label htmlFor="nombre">Full name <span className="required">*</span></label>
        <input type="text" id="nombre" value={nombre} onChange={(e) => onNombreChange(e.target.value)} required placeholder="e.g. John Smith" />
      </div>
      <div className="form-group">
        <label htmlFor="correo">Email <span className="required">*</span></label>
        <input type="email" id="correo" value={correo} onChange={(e) => onCorreoChange(e.target.value)} required placeholder="tu@email.com" />
      </div>
      <div className="form-group">
        <label htmlFor="telefono">WhatsApp / Phone <span className="required">*</span></label>
        <input type="tel" id="telefono" value={telefono} onChange={(e) => onTelefonoChange(e.target.value)} required placeholder="+56 9 1234 5678" />
      </div>

      {/* Price breakdown */}
      <div className="price-block total-block">
        <div className="price-breakdown">
          <div className="breakdown-row">
            <span>Rental ({days} days × {formatCLP(pricing.discountedDailyRate)})</span>
            <span>{formatCLP(pricing.rentalSubtotal)}</span>
          </div>
          {pricing.discountPercent > 0 && (
            <div className="breakdown-row breakdown-discount">
              <span>Discount ({pricing.discountPercent}% off daily rate)</span>
              <span>-{formatCLP((pricing.baseDailyRate - pricing.discountedDailyRate) * days)}</span>
            </div>
          )}
          {pricing.locationFeesTotal > 0 && (
            <div className="breakdown-row">
              <span>Location fees</span>
              <span>{formatCLP(pricing.locationFeesTotal)}</span>
            </div>
          )}
          {pricing.addonsTotal > 0 && (
            <div className="breakdown-row">
              <span>Add-ons</span>
              <span>{formatCLP(pricing.addonsTotal)}</span>
            </div>
          )}
        </div>
        <div className="breakdown-total">
          <div className="label">Estimated total (CLP)</div>
          <div className="amount">{pricing.total ? formatCLP(pricing.total) : '-'}</div>
        </div>
        <p className="price-note">Final price confirmed after availability check.</p>
      </div>

      <div className="step-buttons">
        <button type="button" className="btn btn-secondary" onClick={onPrev}>Back</button>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Check availability'}
        </button>
      </div>
    </form>
  );
}
