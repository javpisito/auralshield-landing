import { useEffect, useState } from 'react';
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

function NavLink({ label, onClick }: { label: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="whitespace-nowrap text-[15px] font-normal text-ink/70 transition-colors hover:text-ink"
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
      {/* Escritorio: la píldora del menú se expande en línea */}
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

          {/* 380 = 358 que miden los 3 enlaces + holgura por si la fuente tarda en cargar */}
          <motion.div
            animate={{ width: open ? 380 : 48 }}
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
                open
                  ? 'ml-1.5 h-9 w-9 rounded-[11px] bg-ink/5 hover:bg-ink/10'
                  : 'h-12 w-12 rounded-[14px]'
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

      {/*
        Móvil: nada se expande en línea. Los 3 enlaces no caben junto al
        hamburguesa y el carrito en 375 px, así que abren en un panel debajo.
      */}
      <div className="flex h-full w-full items-center justify-between gap-2 px-4 sm:hidden">
        <div className="flex min-w-0 items-center gap-2">
          <div
            style={pillStyle}
            className={`flex h-9 min-w-0 items-center gap-1.5 rounded-[10px] px-3 ${pillClass}`}
          >
            <Logo size={14} className="shrink-0 text-ink" />
            <span className="truncate text-[11px] font-bold tracking-[0.08em] text-ink">
              {TIENDA.nombre}
            </span>
          </div>

          <button
            type="button"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            style={pillStyle}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] text-ink ${pillClass}`}
          >
            <SquashHamburger isOpen={open} mobile />
          </button>
        </div>

        <CartButton mobile />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{ backgroundColor: 'rgba(255,254,252,0.96)' }}
            className={`absolute left-4 right-4 top-[68px] flex flex-col overflow-hidden rounded-2xl sm:hidden ${pillClass}`}
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => go(link.target)}
                className="border-b border-ink/10 px-5 py-4 text-left text-[14px] text-ink/80 transition-colors last:border-b-0 active:bg-ink/5"
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
