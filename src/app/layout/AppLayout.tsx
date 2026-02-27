import { Outlet } from 'react-router-dom';
import ScrollToTop from '../ScrollToTop';
import Header from './Header';
import Footer from './Footer';

export default function AppLayout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
