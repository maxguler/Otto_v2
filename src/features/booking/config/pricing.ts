import type { VehicleKey, Season, DurationTier, PricingBreakdown } from '../types';
import { VEHICLE_PRICING, LOCATION_FEES, DISCOUNT_CODES, ADDONS } from './constants';

export function getSeason(pickupDate: string): Season {
  if (!pickupDate) return 'low';
  const d = new Date(pickupDate);
  const month = d.getMonth() + 1; // 1-12
  // High season: November 1 through March 31
  return (month >= 11 || month <= 3) ? 'high' : 'low';
}

export function getSeasonLabel(season: Season): string {
  return season === 'high' ? 'High season (Nov–Mar)' : 'Low season (Apr–Oct)';
}

export function getDurationTier(days: number): DurationTier {
  if (days > 30) return 'long';
  if (days >= 20) return 'medium';
  return 'short';
}

export function getDurationTierLabel(tier: DurationTier): string {
  const labels: Record<DurationTier, string> = {
    short: 'Less than 20 days',
    medium: '20–30 days',
    long: 'More than 30 days',
  };
  return labels[tier];
}

export function getDailyRate(vehicle: VehicleKey, season: Season, tier: DurationTier): number {
  return VEHICLE_PRICING[vehicle][season][tier];
}

export function validateDiscountCode(code: string): { valid: boolean; percent: number; label: string } {
  if (!code.trim()) return { valid: false, percent: 0, label: '' };
  const match = DISCOUNT_CODES.find((d) => d.code.toUpperCase() === code.trim().toUpperCase());
  if (match) return { valid: true, percent: match.percent, label: match.label };
  return { valid: false, percent: 0, label: '' };
}

export function getLocationFee(locationKey: string, type: 'pickup' | 'dropoff'): number {
  const fees = LOCATION_FEES[locationKey];
  if (!fees) return 0;
  return fees[type];
}

export function calculatePricing(params: {
  vehicle: VehicleKey | '';
  pickupDate: string;
  days: number;
  locationPickup: string;
  locationDropoff: string;
  selectedAddons: string[];
  discountCode: string;
}): PricingBreakdown {
  const { vehicle, pickupDate, days, locationPickup, locationDropoff, selectedAddons, discountCode } = params;

  const season = getSeason(pickupDate);
  const tier = getDurationTier(days);
  const baseDailyRate = vehicle ? getDailyRate(vehicle as VehicleKey, season, tier) : 0;

  const { percent: discountPercent } = validateDiscountCode(discountCode);
  const discountedDailyRate = Math.round(baseDailyRate * (1 - discountPercent / 100));

  const rentalSubtotal = days > 0 ? discountedDailyRate * days : 0;

  const pickupFee = getLocationFee(locationPickup, 'pickup');
  const dropoffFee = getLocationFee(locationDropoff, 'dropoff');
  const locationFeesTotal = pickupFee + dropoffFee;

  const addonsTotal = selectedAddons.reduce((sum, v) => {
    const addon = ADDONS.find((a) => a.value === v);
    return sum + (addon?.price || 0);
  }, 0);

  return {
    season,
    seasonLabel: getSeasonLabel(season),
    durationTier: tier,
    durationTierLabel: getDurationTierLabel(tier),
    baseDailyRate,
    discountPercent,
    discountedDailyRate,
    days,
    rentalSubtotal,
    pickupFee,
    dropoffFee,
    locationFeesTotal,
    addonsTotal,
    total: rentalSubtotal + locationFeesTotal + addonsTotal,
  };
}
