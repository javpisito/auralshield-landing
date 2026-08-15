import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import TrustStrip from './sections/TrustStrip';
import ProductFeature from './sections/ProductFeature';
import Compare from './sections/Compare';
import Faq from './sections/Faq';
import Footer from './sections/Footer';
import { MEDIA } from './media';
import { P9, ULTRAPODS } from './products';

export default function App() {
  const [entranceComplete, setEntranceComplete] = useState(false);

  useEffect(() => {
    // Antes eran 800 ms: la página se sentía "muerta" durante casi un segundo.
    const timeout = setTimeout(() => setEntranceComplete(true), 400);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className="relative w-full bg-bone text-ink"
      style={{ fontFamily: '"Space Mono", monospace' }}
    >
      <Navbar entranceComplete={entranceComplete} />
      <Hero entranceComplete={entranceComplete} />
      <TrustStrip />
      <ProductFeature producto={P9} fotos={MEDIA.p9} indice="01" fondo="paper" />
      <ProductFeature producto={ULTRAPODS} fotos={MEDIA.ultrapods} indice="02" fondo="bone" />
      <Compare />
      <Faq />
      <Footer />
    </div>
  );
}
