import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import HomePage from '../features/home/components/HomePage';
import VehiclesPage from '../features/vehicles/components/VehiclesPage';
import BookingPage from '../features/booking/page/BookingPage';
import RoadtripsPage from '../features/roadtrips/page/RoadtripsPage';
import FaqPage from '../features/faq/page/FaqPage';
import ResumenPage from '../features/resumen/page/ResumenPage';
import TermsPage from '../features/terms/page/TermsPage';

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/vehicles', element: <VehiclesPage /> },
      { path: '/booking', element: <BookingPage /> },
      { path: '/roadtrips', element: <RoadtripsPage /> },
      { path: '/faq', element: <FaqPage /> },
      { path: '/resumen', element: <ResumenPage /> },
      { path: '/terms', element: <TermsPage /> },
    ],
  },
]);
