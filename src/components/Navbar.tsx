import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from './Logo';
import SquashHamburger from './SquashHamburger';
import ScrambleText from './ScrambleText';
import { useCarrito } from '../cart';
import { TIENDA } from '../products';

// Menos rebote que el original (350/28): la píldora ya no oscila al abrir.
const PILL_SPRING = { type: 'spring' as const, stiffness: 260, damping: 34 };

const NAV_LINKS = [
  { label: 'Producto', target: '#p9' },
  { label: 'Colores', target: '#colores' },
  { label: 'Preguntas', target: '#preguntas' },
];

const scrollToId = (id: string) => {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

function NavLink({
  label,
  onClick,
  mobile = false,
}: {
  label: string;
  onClick: () => void;
  mobile?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`whitespace-nowrap font-normal text-ink/70 transition-colors hover:text-ink ${
        mobile ? 'text-[12px]' : 'text-[15px]'
      }`}
    >
      <ScrambleText text={label} isHovered={hovered} />
    </button>
  );
}

function CartButton({ mobile = false }: { mobile?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const { unidades, abrir } = useCarrito();

  return (
    <motion.button
      type="button"
      onClick={abrir}
      aria-label={`Abrir carrito (${unidades} ${unidades === 1 ? 'unidad' : 'unidades'})`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ backgroundColor: '#2b2622' }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      style={{ backgroundColor: '#12100e' }}
      className={`relative flex shrink-0 items-center gap-2 rounded-full text-bone ${
        mobile ? 'h-9 px-3.5 text-[12px]' : 'h-12 px-6 text-[15px]'
      }`}
    >
      <i className={`bi bi-bag ${mobile ? 'text-[12px]' : 'text-[14px]'}`} />
      <ScrambleText text="Carrito" isHovered={hovered} className="whitespace-nowrap" />
      {unidades > 0 && (
        <span
          className={`ml-0.5 flex items-center justify-center rounded-full bg-gold-soft font-bold text-ink ${
            mobile ? 'h-4 min-w-4 px-1 text-[10px]' : 'h-5 min-w-5 px-1.5 text-[11px]'
          }`}
        >
          {unidades}
        </span>
      )}
    </motion.button>
  );
}

interface NavbarProps {
  entranceComplete: boolean;
}

export default function Navbar({ entranceComplete }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const mobileRowRef = useRef<HTMLDivElement>(null);
  const [mobileRowWidth, setMobileRowWidth] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (mobileRowRef.current) setMobileRowWidth(mobileRowRef.current.offsetWidth);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (target: string) => {
    scrollToId(target);
    setOpen(false);
  };

  const pillStyle = { backgroundColor: 'rgba(255,254,252,0.72)' };
  const pillClass = 'backdrop-blur-md border border-ink/10 shadow-[0_2px_20px_rgba(18,16,14,0.06)]';

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: entranceComplete ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-0 z-50 h-20 w-full bg-transparent"
    >
      {/* Escritorio */}
      <div className="mx-auto hidden h-full w-full items-center justify-between px-6 sm:flex md:px-8">
        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            style={pillStyle}
            className={`h-12 cursor-pointer select-none items-center gap-2.5 rounded-[14px] px-5 ${pillClass} ${
              open ? 'hidden md:flex' : 'flex'
            }`}
          >
            <Logo size={19} className="text-ink" />
            <span className="text-[15px] font-bold tracking-[0.08em] text-ink">
              {TIENDA.nombre}
            </span>
          </motion.button>

          <motion.div
            animate={{ width: open ? 330 : 48 }}
            transition={PILL_SPRING}
            style={pillStyle}
            className={`flex h-12 items-center overflow-hidden rounded-[14px] ${pillClass}`}
          >
            <button
              type="button"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className={`flex shrink-0 items-center justify-center text-ink transition-colors ${
                open ? 'ml-1.5 h-9 w-9 rounded-[11px] bg-ink/5 hover:bg-ink/10' : 'h-12 w-12 rounded-[14px]'
              }`}
            >
              <SquashHamburger isOpen={open} />
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.2, delay: 0.04 }}
                  className="flex items-center gap-6 px-6"
                >
                  {NAV_LINKS.map((link) => (
                    <NavLink key={link.label} label={link.label} onClick={() => go(link.target)} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <CartButton />
      </div>

      {/* Móvil */}
      <div className="flex h-full w-full items-center justify-between gap-2 px-4 sm:hidden">
        <div ref={mobileRowRef} className="flex min-w-0 flex-1 items-center gap-2">
          <motion.div
            animate={{ width: open ? 0 : 104, opacity: open ? 0 : 1 }}
            transition={PILL_SPRING}
            style={pillStyle}
            className={`flex h-9 shrink-0 items-center gap-1.5 overflow-hidden rounded-[10px] px-3 ${pillClass}`}
          >
            <Logo size={14} className="shrink-0 text-ink" />
            <span className="whitespace-nowrap text-[11px] font-bold tracking-[0.08em] text-ink">
              {TIENDA.nombre.split(' ')[0]}
            </span>
          </motion.div>

          <motion.div
            animate={{ width: open ? mobileRowWidth || 240 : 36 }}
            transition={PILL_SPRING}
            style={pillStyle}
            className={`flex h-9 shrink-0 items-center overflow-hidden rounded-[10px] ${pillClass}`}
          >
            <button
              type="button"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className={`flex shrink-0 items-center justify-center text-ink transition-colors ${
                open ? 'ml-1 h-7 w-7 rounded-[8px] bg-ink/5' : 'h-9 w-9 rounded-[10px]'
              }`}
            >
              <SquashHamburger isOpen={open} mobile />
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.2, delay: 0.04 }}
                  className="flex items-center gap-4 px-3"
                >
                  {NAV_LINKS.map((link) => (
                    <NavLink
                      key={link.label}
                      label={link.label}
                      mobile
                      onClick={() => go(link.target)}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <CartButton mobile />
      </div>
    </motion.nav>
  );
}
