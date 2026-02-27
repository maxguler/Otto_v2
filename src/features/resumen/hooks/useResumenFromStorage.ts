import { useMemo } from 'react';
import type { BookingPayload } from '../../booking/types';

interface ResumenData {
  payload: BookingPayload | null;
  sent: boolean | null;
  error: string | null;
}

export function useResumenFromStorage(): ResumenData {
  return useMemo(() => {
    const raw = sessionStorage.getItem('otto_booking');
    const sentRaw = sessionStorage.getItem('otto_booking_sent');
    const error = sessionStorage.getItem('otto_booking_error');

    let payload: BookingPayload | null = null;
    if (raw) {
      try {
        payload = JSON.parse(raw);
      } catch {
        payload = null;
      }
    }

    const sent = sentRaw === '1' ? true : sentRaw === '0' ? false : null;

    return { payload, sent, error };
  }, []);
}
