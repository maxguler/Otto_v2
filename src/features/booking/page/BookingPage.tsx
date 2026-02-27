import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Step1Dates from '../components/Step1Dates';
import Step2Vehicle from '../components/Step2Vehicle';
import Step3Addons from '../components/Step3Addons';
import { submitBooking } from '../api/submitBooking';
import { LOCATIONS, VEHICLE_NAMES, ADDON_NAMES } from '../config/constants';
import { calculatePricing } from '../config/pricing';
import { useSEO } from '../../../shared/hooks/useSEO';
import type { VehicleKey, BookingPayload } from '../types';

const STEP_LABELS: Record<number, string> = { 1: 'Dates & locations', 2: 'Vehicle type', 3: 'Add-ons & details' };
const VALID_VEHICLES: VehicleKey[] = ['escape', 'scout', 'backcountry'];

export default function BookingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [step, setStep] = useState(1);
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [locationPickup, setLocationPickup] = useState('');
  const [locationDropoff, setLocationDropoff] = useState('');
  const [vehicle, setVehicle] = useState<VehicleKey | ''>('');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [discountCode, setDiscountCode] = useState('');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useSEO({
    title: 'Book Your Camper | Otto Campers | Chile & Patagonia',
    description: 'Book your off-grid camper in Chile and Patagonia. Choose dates, vehicle, and add-ons. Transparent pricing, seasonal rates, discount codes.',
    ogUrl: 'https://ottocampers.com/booking',
  });

  useEffect(() => {
    const v = searchParams.get('vehicle') as VehicleKey | null;
    if (v && VALID_VEHICLES.includes(v)) {
      setVehicle(v);
      setStep(2);
    }

    const loc = searchParams.get('location');
    if (loc) {
      setLocationPickup(loc);
      setLocationDropoff(loc);
    }

    const qLocPickup = searchParams.get('locationPickup');
    const qLocDropoff = searchParams.get('locationDropoff');
    const qPickup = searchParams.get('pickup');
    const qDropoff = searchParams.get('dropoff');
    const qStep = searchParams.get('step');

    if (qLocPickup) setLocationPickup(qLocPickup);
    if (qLocDropoff) setLocationDropoff(qLocDropoff);
    if (qPickup) setPickup(qPickup);
    if (qDropoff) setDropoff(qDropoff);

    if (qLocPickup && qLocDropoff && qPickup && qDropoff && qStep === '2') {
      setStep(2);
    }
  }, [searchParams]);

  const getDays = useCallback(() => {
    if (!pickup || !dropoff) return 0;
    const start = new Date(pickup);
    const end = new Date(dropoff);
    if (end <= start) return 0;
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  }, [pickup, dropoff]);

  const days = getDays();

  const pricing = useMemo(() => calculatePricing({
    vehicle,
    pickupDate: pickup,
    days,
    locationPickup,
    locationDropoff,
    selectedAddons,
    discountCode,
  }), [vehicle, pickup, days, locationPickup, locationDropoff, selectedAddons, discountCode]);

  const toggleAddon = (value: string) => {
    setSelectedAddons((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);

    const addonLabels = selectedAddons.map((v) => ADDON_NAMES[v] || v);

    const payload: BookingPayload = {
      pickup,
      dropoff,
      locationPickup,
      locationPickupLabel: LOCATIONS[locationPickup] || locationPickup,
      locationDropoff,
      locationDropoffLabel: LOCATIONS[locationDropoff] || locationDropoff,
      vehicle,
      vehicleLabel: vehicle ? VEHICLE_NAMES[vehicle] : '',
      days,
      season: pricing.seasonLabel,
      durationTier: pricing.durationTierLabel,
      dailyRate: pricing.discountedDailyRate,
      discountCode: discountCode.trim() || '',
      discountPercent: pricing.discountPercent,
      rentalSubtotal: pricing.rentalSubtotal,
      pickupFee: pricing.pickupFee,
      dropoffFee: pricing.dropoffFee,
      addons: addonLabels,
      addonsTotal: pricing.addonsTotal,
      total: pricing.total,
      nombre: nombre.trim(),
      correo: correo.trim(),
      telefono: telefono.trim(),
      timestamp: new Date().toISOString(),
    };

    sessionStorage.setItem('otto_booking', JSON.stringify(payload));
    await submitBooking(payload);
    navigate('/resumen');
  };

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Book your camper</h1>
          <p>Paso {step} de 3 · Todos los precios en CLP</p>
        </div>
      </section>

      <section className="booking-section" id="availability">
        <div className="container">
          <div className="booking-steps">
            <div className="step-dots">
              {[1, 2, 3].map((s) => (
                <span key={s} className={`step-dot${step === s ? ' active' : ''}`}>{s}</span>
              ))}
            </div>
            <p className="step-label">{STEP_LABELS[step]}</p>
          </div>

          <div className="booking-card">
            {step === 1 && (
              <Step1Dates
                pickup={pickup}
                dropoff={dropoff}
                locationPickup={locationPickup}
                locationDropoff={locationDropoff}
                onPickupChange={setPickup}
                onDropoffChange={setDropoff}
                onLocationPickupChange={setLocationPickup}
                onLocationDropoffChange={setLocationDropoff}
                onNext={() => setStep(2)}
              />
            )}
            {step === 2 && (
              <Step2Vehicle
                pickup={pickup}
                dropoff={dropoff}
                locationPickup={locationPickup}
                locationDropoff={locationDropoff}
                vehicle={vehicle}
                days={days}
                onVehicleChange={setVehicle}
                onNext={() => setStep(3)}
                onPrev={() => setStep(1)}
              />
            )}
            {step === 3 && (
              <Step3Addons
                vehicle={vehicle}
                days={days}
                pricing={pricing}
                selectedAddons={selectedAddons}
                discountCode={discountCode}
                nombre={nombre}
                correo={correo}
                telefono={telefono}
                submitting={submitting}
                onToggleAddon={toggleAddon}
                onDiscountCodeChange={setDiscountCode}
                onNombreChange={setNombre}
                onCorreoChange={setCorreo}
                onTelefonoChange={setTelefono}
                onPrev={() => setStep(2)}
                onSubmit={handleSubmit}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
