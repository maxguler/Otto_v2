export type VehicleKey = 'escape' | 'scout' | 'backcountry';

export type Season = 'high' | 'low';

export type DurationTier = 'short' | 'medium' | 'long';

export interface SeasonalPricing {
  high: Record<DurationTier, number>;
  low: Record<DurationTier, number>;
}

export interface LocationFee {
  pickup: number;
  dropoff: number;
}

export interface DiscountCode {
  code: string;
  percent: number;
  label: string;
}

export interface AddonItem {
  value: string;
  label: string;
  price: number;
  priceLabel: string;
}

export interface PricingBreakdown {
  season: Season;
  seasonLabel: string;
  durationTier: DurationTier;
  durationTierLabel: string;
  baseDailyRate: number;
  discountPercent: number;
  discountedDailyRate: number;
  days: number;
  rentalSubtotal: number;
  pickupFee: number;
  dropoffFee: number;
  locationFeesTotal: number;
  addonsTotal: number;
  total: number;
}

export interface BookingPayload {
  pickup: string;
  dropoff: string;
  locationPickup: string;
  locationPickupLabel: string;
  locationDropoff: string;
  locationDropoffLabel: string;
  vehicle: string;
  vehicleLabel: string;
  days: number;
  season: string;
  durationTier: string;
  dailyRate: number;
  discountCode: string;
  discountPercent: number;
  rentalSubtotal: number;
  pickupFee: number;
  dropoffFee: number;
  addons: string[];
  addonsTotal: number;
  total: number;
  nombre: string;
  correo: string;
  telefono: string;
  timestamp: string;
}
