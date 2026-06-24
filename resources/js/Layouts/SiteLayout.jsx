import { useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Fab } from '../Components/Bits';
import { initSite } from '../lib/animations';

export default function SiteLayout({ children, title, description }) {
  useEffect(() => {
    // Door transitions are orchestrated globally in app.jsx so they survive
    // Inertia navigations; here we just (re)wire the per-page animations.
    initSite();
  }, []);

  return (
    <>
      <Head>
        <title>{title || 'إيوان للمصاعد'}</title>
      </Head>
      <div id="progress"><span /></div>
      <Header />
      <main>{children}</main>
      <Footer />
      <Fab />
    </>
  );
}
