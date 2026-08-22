import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MEDIA } from '../media';

/**
 * El video vive en su propia sección con alto controlado, no en el hero:
 * a pantalla completa en móvil se recortaba mal y no se veía el producto.
 * Solo se reproduce mientras está a la vista.
 */
export default function Showcase() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { rootMargin: '200px 0px' }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-bone">
      <div className="relative h-[62vh] min-h-[380px] w-full sm:h-[70vh] md:h-[80vh]">
        <video
          ref={ref}
          src={MEDIA.showcaseVideo.src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={MEDIA.showcaseVideo.alt}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(246,244,240,0.7) 0%, rgba(246,244,240,0) 30%, rgba(246,244,240,0) 60%, rgba(246,244,240,0.85) 100%)',
          }}
        />

        <div className="relative flex h-full flex-col justify-between px-6 py-10 sm:px-10 sm:py-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-[11px] uppercase tracking-[0.2em] text-ink/55 sm:text-[12px]"
          >
            Seis colores, un mismo sonido
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-xl text-[clamp(26px,5vw,48px)] font-light leading-[1.1] tracking-[-0.03em] text-ink"
          >
            Elige el que va contigo.
          </motion.h2>
        </div>
      </div>
    </section>
  );
}
