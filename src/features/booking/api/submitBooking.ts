import { BACKEND_URL } from '../../../config/env';
import type { BookingPayload } from '../types';

export async function submitBooking(payload: BookingPayload): Promise<void> {
  if (!BACKEND_URL) {
    sessionStorage.setItem('otto_booking_sent', '0');
    sessionStorage.setItem('otto_booking_error', 'Backend not configured. Set VITE_BACKEND_URL in .env.');
    return;
  }

  try {
    sessionStorage.removeItem('otto_booking_sent');
    sessionStorage.removeItem('otto_booking_error');

    await fetch(BACKEND_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'data=' + encodeURIComponent(JSON.stringify(payload)),
    });

    sessionStorage.setItem('otto_booking_sent', '1');
  } catch (err: unknown) {
    sessionStorage.setItem('otto_booking_sent', '0');
    const message = err instanceof Error ? err.message : 'Connection error';
    sessionStorage.setItem('otto_booking_error', message);
  }
}
