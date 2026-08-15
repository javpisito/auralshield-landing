import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ScrambleIn from '../components/ScrambleIn';
import ScrambleText from '../components/ScrambleText';
import MediaSlot from '../components/MediaSlot';
import { MEDIA } from '../media';
import { P9, linkPedido, precioCOP } from '../products';

const SENSITIVITY = 0.8;

/**
 * Si el video del hero es un giro 360°, el movimiento horizontal del mouse lo
 * hace rotar en vivo. Los seeks se encadenan con `seeked` para no tirar cuadros.
 * En pantallas táctiles no hay cursor: ahí el video se reproduce en bucle.
 */
function ScrubVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTime = useRef(0);
  const isSeeking = useRef(false);
  const lastX = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const isTouch = window.matchMedia('(hover: none)').matches;

    const onLoaded = () => {
      if (isTouch) {
        video.loop = true;
        void video.play().catch(() => {});
        return;
      }
      video.pause();
      video.currentTime = 0;
      targetTime.current = 0;
    };

    const onSeeked = () => {
      if (!video.duration) {
        isSeeking.current = false;
        return;
      }
      if (Math.abs(video.currentTime - targetTime.current) > 0.01) {
        video.currentTime = targetTime.current;
      } else {
        isSeeking.current = false;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const duration = video.duration;
      if (!duration || Number.isNaN(duration)) return;
      if (lastX.current === null) {
        lastX.current = e.clientX;
        return;
      }
      const delta = e.clientX - lastX.current;
      lastX.current = e.clientX;
      if (delta === 0) return;

      const next = targetTime.current + (delta / window.innerWidth) * duration * SENSITIVITY;
      targetTime.current = Math.min(Math.max(next, 0), Math.max(duration - 0.05, 0));

      if (!isSeeking.current) {
        isSeeking.current = true;
        video.currentTime = targetTime.current;
      }
    };

    video.addEventListener('loadedmetadata', onLoaded);
    video.addEventListener('seeked', onSeeked);
    if (!isTouch) window.addEventListener('mousemove', onMouseMove);
    if (video.readyState >= 1) onLoaded();

    return () => {
      video.removeEventListener('loadedmetadata', onLoaded);
      video.removeEventListener('seeked', onSeeked);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      playsInline
      preload="auto"
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}

interface HeroProps {
  entranceComplete: boolean;
}

export default function Hero({ entranceComplete }: HeroProps) {
  const [ctaHovered, setCtaHovered] = useState(false);
  const hayVideo = Boolean(MEDIA.heroVideo.src);

  // El material del producto está fotografiado sobre fondo oscuro, así que el
  // hero se invierte: texto claro sobre el video, y de ahí para abajo la
  // página vuelve al fondo hueso.
  const headingClass =
    'text-bone font-light leading-[0.95] tracking-[-0.03em] text-[clamp(40px,10vw,100px)]';

  return (
    <section className="relative h-screen h-[100dvh] w-full overflow-hidden bg-ink">
      {hayVideo ? (
        <ScrubVideo src={MEDIA.heroVideo.src as string} />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center p-10">
          <div className="h-full max-h-[70vh] w-full max-w-3xl">
            <MediaSlot slot={MEDIA.heroImagen} mediaClassName="h-full w-full object-contain" />
          </div>
        </div>
      )}

      {/* Retícula de puntos */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.06,
        }}
      />

      {/* Veladura para sostener el texto sobre el video */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            'linear-gradient(to bottom, rgba(18,16,14,0.8) 0%, rgba(18,16,14,0.1) 26%, rgba(18,16,14,0.15) 45%, rgba(18,16,14,0.62) 64%, rgba(18,16,14,0.9) 84%, rgba(18,16,14,0.95) 100%)',
        }}
      />

      {/* Palabra de fondo */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-full select-none text-center"
        style={{ transform: 'translate(-50%, calc(-50% + 50px))', opacity: 0.14 }}
      >
        <span
          className="block whitespace-nowrap uppercase leading-none"
          style={{
            fontFamily: '"Anton SC", sans-serif',
            fontSize: 'clamp(120px, 30vw, 521px)',
            letterSpacing: '-4px',
            background: 'radial-gradient(circle, rgba(201,169,106,0) 0%, #C9A96A 70%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
          }}
        >
          Sonido
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: entranceComplete ? 1 : 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-20 flex h-full flex-col px-4 pb-8 pt-24 sm:px-6 sm:pb-12 sm:pt-28 md:px-8"
      >
        <div className="flex items-start justify-between gap-4">
          <p className="max-w-[15rem] text-[11px] uppercase leading-relaxed tracking-[0.18em] text-bone/55 sm:max-w-xs sm:text-[12px]">
            Envío a todo Colombia
          </p>
          {hayVideo && (
            <p className="hidden items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-bone/55 md:flex">
              <i className="bi bi-arrow-left-right text-[13px]" />
              Mueve el cursor para girarlos
            </p>
          )}
        </div>

        <div className="flex-1" />

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-8">
            <h1 className={headingClass}>
              <ScrambleIn text="Sonido" delay={150} triggered={entranceComplete} />
              <br />
              <ScrambleIn text="Sin Ruido" delay={300} triggered={entranceComplete} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={entranceComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1.0], delay: 0.15 }}
              className="max-w-sm text-[13px] leading-relaxed text-bone/65 sm:text-[15px]"
            >
              {P9.nombre}: {P9.descripcion.toLowerCase()}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={entranceComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1.0], delay: 0.3 }}
              className="flex flex-wrap items-center gap-x-5 gap-y-3"
            >
              <a
                href={linkPedido(P9)}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCtaHovered(true)}
                onMouseLeave={() => setCtaHovered(false)}
                className="flex h-12 items-center gap-2 rounded-full bg-bone px-7 text-[14px] text-ink transition-colors hover:bg-white"
              >
                <ScrambleText text="Pedir ahora" isHovered={ctaHovered} />
                <span className="text-gold">{precioCOP(P9.precio)}</span>
              </a>
              <p className="text-[12px] text-bone/50">Pago contra entrega · Garantía incluida</p>
            </motion.div>
          </div>

          <h1 className={`${headingClass} text-left md:text-right`}>
            <ScrambleIn text="Cinco" delay={450} triggered={entranceComplete} />
            <br />
            <ScrambleIn text="Colores" delay={600} triggered={entranceComplete} />
          </h1>
        </div>
      </motion.div>
    </section>
  );
}
