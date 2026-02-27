import type { AddonItem, VehicleKey, SeasonalPricing, LocationFee, DiscountCode } from '../types';

export const LOCATIONS: Record<string, string> = {
  'san-pedro-atacama': 'San Pedro de Atacama, Chile',
  'santiago': 'Santiago (Main Hub), Chile',
  'puerto-varas': 'Puerto Varas, Chile',
  'punta-arenas': 'Punta Arenas, Chile',
};

export const LOCATION_FEES: Record<string, LocationFee> = {
  'san-pedro-atacama': { pickup: 380000, dropoff: 380000 },
  'santiago':          { pickup: 0,      dropoff: 0 },
  'puerto-varas':      { pickup: 340000, dropoff: 340000 },
  'punta-arenas':      { pickup: 380000, dropoff: 380000 },
};

export const VEHICLE_NAMES: Record<VehicleKey, string> = {
  escape: 'Otto Escape',
  scout: 'Otto Scout',
  backcountry: 'Otto Backcountry',
};

export const VEHICLE_PRICING: Record<VehicleKey, SeasonalPricing> = {
  escape: {
    high: { short: 120000, medium: 114000, long: 110400 },
    low:  { short: 105000, medium: 99750,  long: 96600 },
  },
  scout: {
    high: { short: 155000, medium: 147250, long: 142600 },
    low:  { short: 125000, medium: 118750, long: 115000 },
  },
  backcountry: {
    high: { short: 250000, medium: 237500, long: 230000 },
    low:  { short: 200000, medium: 190000, long: 184000 },
  },
};

export const VEHICLE_OPTIONS: { key: VehicleKey; name: string; desc: string }[] = [
  { key: 'escape', name: 'Otto Escape', desc: 'Sleeps 2' },
  { key: 'scout', name: 'Otto Scout', desc: 'Sleeps 2, 4WD' },
  { key: 'backcountry', name: 'Otto Backcountry', desc: 'Sleeps 2-3, 4WD' },
];

export const ADDON_NAMES: Record<string, string> = {
  snowchains: 'Snow Chains',
  'argentina-permit': 'Argentina Permit',
  'zero-liability': 'Zero Liability',
  'power-station': 'Power Station',
  starlink: 'Starlink',
  'extra-km': 'Extra Km',
};

export const ADDONS: AddonItem[] = [
  { value: 'snowchains', label: 'Snow Chains', price: 50000, priceLabel: '$50.000' },
  { value: 'argentina-permit', label: 'Argentina Permit', price: 220000, priceLabel: '$220.000' },
  { value: 'zero-liability', label: 'Zero Liability', price: 450000, priceLabel: '$450.000' },
  { value: 'power-station', label: 'Power Station', price: 0, priceLabel: 'On request' },
  { value: 'starlink', label: 'Starlink', price: 0, priceLabel: 'On request' },
  { value: 'extra-km', label: 'Extra Km', price: 0, priceLabel: 'On request' },
];

/**
 * Discount codes: add entries here to enable new codes.
 * `percent` is the discount applied to the daily rate (e.g. 10 = 10% off).
 */
export const DISCOUNT_CODES: DiscountCode[] = [
  { code: 'OTTO10', percent: 10, label: '10% discount' },
  { code: 'EARLY15', percent: 15, label: '15% early bird' },
  { code: 'AMIGO20', percent: 20, label: '20% referral' },
];
