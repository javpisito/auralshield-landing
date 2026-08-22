import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrambleIn from '../components/ScrambleIn';
import ScrambleText from '../components/ScrambleText';
import MediaSlot from '../components/MediaSlot';
import { MEDIA } from '../media';
import { P9, VARIANTES, precioCOP } from '../products';

interface HeroProps {
  entranceComplete: boolean;
}

/**
 * Hero estático en dos columnas: el texto nunca va encima de la foto, así que
 * el contraste no depende de la imagen y en móvil solo se apila.
 */
export default function Hero({ entranceComplete }: HeroProps) {
  const [ctaHovered, setCtaHovered] = useState(false);

  const irAlProducto = () =>
    document.querySelector('#p9')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const headingClass =
    'text-ink font-light leading-[0.95] tracking-[-0.03em] text-[clamp(38px,7vw,84px)]';

  return (
    <section className="relative w-full overflow-hidden bg-bone px-6 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32 md:min-h-screen md:pb-24">
      {/* Retícula de puntos */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(#12100e 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.04,
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: entranceComplete ? 1 : 0 }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:min-h-[calc(100vh-14rem)] md:grid-cols-2 md:gap-16"
      >
        {/* Texto */}
        <div className="flex flex-col">
          <p className="mb-6 text-[11px] uppercase tracking-[0.18em] text-ink/50 sm:text-[12px]">
            Envío a todo Colombia · Pago contra entrega
          </p>

          <h1 className={headingClass}>
            <ScrambleIn text="Sonido" delay={150} triggered={entranceComplete} />
            <br />
            <ScrambleIn text="Sin Ruido" delay={300} triggered={entranceComplete} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={entranceComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1.0], delay: 0.15 }}
            className="mt-7 max-w-md text-[14px] leading-relaxed text-ink/60 sm:text-[16px]"
          >
            {P9.descripcion}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={entranceComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1.0], delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4"
          >
            <button
              type="button"
              onClick={irAlProducto}
              onMouseEnter={() => setCtaHovered(true)}
              onMouseLeave={() => setCtaHovered(false)}
              className="flex h-14 items-center gap-2.5 rounded-full bg-ink px-8 text-[15px] text-bone transition-colors hover:bg-[#2b2622]"
            >
              <ScrambleText text="Comprar ahora" isHovered={ctaHovered} />
              <span className="text-gold-soft">{precioCOP(P9.precio)}</span>
            </button>

            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">
                {VARIANTES.map((v) => (
                  <span
                    key={v.id}
                    title={v.nombre}
                    style={{ backgroundColor: v.hex }}
                    className="h-6 w-6 rounded-full border border-paper"
                  />
                ))}
              </div>
              <span className="text-[12px] text-ink/45">6 colores</span>
            </div>
          </motion.div>
        </div>

        {/* Fotos */}
        <div className="grid grid-cols-2 gap-3">
          <div className="relative col-span-2 aspect-[4/3] overflow-hidden rounded-2xl border border-ink/10 bg-paper">
            <MediaSlot slot={MEDIA.heroImagen} />
          </div>

          <div className="relative aspect-square overflow-hidden rounded-2xl border border-ink/10 bg-paper">
            <MediaSlot slot={MEDIA.heroSecundaria} />
          </div>

          <button
            type="button"
            onClick={irAlProducto}
            className="flex aspect-square flex-col items-start justify-between rounded-2xl border border-ink/10 bg-paper p-5 text-left transition-colors hover:bg-ink/[0.03]"
          >
            <span className="text-[12px] uppercase tracking-[0.16em] text-ink/40">Disponible</span>
            <span className="flex flex-wrap gap-1.5">
              {VARIANTES.map((v) => (
                <span
                  key={v.id}
                  style={{ backgroundColor: v.hex }}
                  className="h-5 w-5 rounded-full border border-ink/15"
                />
              ))}
            </span>
            <span className="flex items-center gap-2 text-[13px] text-ink">
              Ver los 6 colores
              <i className="bi bi-arrow-right text-[13px]" />
            </span>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
