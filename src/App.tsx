import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Hero from './sections/Hero';
import TrustStrip from './sections/TrustStrip';
import Producto from './sections/Producto';
import Showcase from './sections/Showcase';
import Faq from './sections/Faq';
import Footer from './sections/Footer';
import { CarritoProvider } from './cart';

export default function App() {
  const [entranceComplete, setEntranceComplete] = useState(false);

  useEffect(() => {
    // Antes eran 800 ms: la página se sentía "muerta" durante casi un segundo.
    const timeout = setTimeout(() => setEntranceComplete(true), 400);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <CarritoProvider>
      <div
        className="relative w-full bg-bone text-ink"
        style={{ fontFamily: '"Space Mono", monospace' }}
      >
        <Navbar entranceComplete={entranceComplete} />
        <Hero entranceComplete={entranceComplete} />
        <TrustStrip />
        <Producto />
        {/* scroll-mt-24 evita que el título quede detrás de la barra fija */}
        <div id="colores" className="scroll-mt-24">
          <Showcase />
        </div>
        <Faq />
        <Footer />
        <CartDrawer />
      </div>
    </CarritoProvider>
  );
}
