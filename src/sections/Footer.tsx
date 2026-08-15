import { useState } from 'react';
import Logo from '../components/Logo';
import ScrambleText from '../components/ScrambleText';
import MediaSlot from '../components/MediaSlot';
import { MEDIA } from '../media';
import { P9, TIENDA, ULTRAPODS, linkTienda, precioCOP } from '../products';

export default function Footer() {
  const [hovered, setHovered] = useState(false);

  return (
    <footer className="relative w-full overflow-hidden bg-bone">
      <div className="flex min-h-[440px] flex-col md:flex-row">
        <div className="relative h-[300px] w-full md:h-auto md:w-1/2">
          <MediaSlot slot={MEDIA.p9[0]} />
        </div>

        <div className="flex w-full flex-col justify-between p-10 sm:p-16 md:w-1/2">
          <div>
            <div className="mb-8 flex items-center gap-2.5">
              <Logo size={19} className="text-ink/70" />
              <span className="text-[14px] font-bold tracking-[0.08em] text-ink/70">
                {TIENDA.nombre}
              </span>
            </div>

            <h2 className="mb-5 max-w-sm text-[clamp(24px,4vw,34px)] font-light leading-[1.15] tracking-[-0.02em] text-ink">
              Pídelos hoy, págalos cuando lleguen.
            </h2>

            <p className="mb-8 max-w-sm text-[13px] leading-relaxed text-ink/45 sm:text-[15px]">
              {P9.nombre} por {precioCOP(P9.precio)} y {ULTRAPODS.nombre} por{' '}
              {precioCOP(ULTRAPODS.precio)}. Envíos a todo Colombia desde {TIENDA.ciudad}.
            </p>

            <a
              href={linkTienda()}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-7 text-[14px] text-bone transition-colors hover:bg-[#2b2622]"
            >
              <i className="bi bi-whatsapp text-[15px]" />
              <ScrambleText text="Escríbenos por WhatsApp" isHovered={hovered} />
            </a>
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[12px] text-ink/30">
              © 2026 {TIENDA.nombre}. Todos los derechos reservados.
            </p>
            <nav className="flex gap-5 text-[12px] text-ink/40">
              <a href="#p9" className="transition-colors hover:text-ink">
                {P9.nombre}
              </a>
              <a href="#ultrapods" className="transition-colors hover:text-ink">
                {ULTRAPODS.nombre}
              </a>
              <a href="#comparar" className="transition-colors hover:text-ink">
                Comparar
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
