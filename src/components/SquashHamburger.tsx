import { motion } from 'framer-motion';

interface SquashHamburgerProps {
  isOpen: boolean;
  mobile?: boolean;
}

const SPRING = { type: 'spring' as const, stiffness: 260, damping: 28 };

export default function SquashHamburger({ isOpen, mobile = false }: SquashHamburgerProps) {
  const width = mobile ? 15 : 18;
  const height = mobile ? 10 : 12;
  const bar = mobile ? 1.2 : 1.5;
  const center = height / 2 - bar / 2;

  return (
    <span className="relative block" style={{ width, height }}>
      <motion.span
        className="absolute left-0 block w-full bg-current"
        style={{ height: bar, top: 0, borderRadius: bar }}
        animate={isOpen ? { rotate: 45, y: center } : { rotate: 0, y: 0 }}
        transition={SPRING}
      />
      <motion.span
        className="absolute left-0 block w-full bg-current"
        style={{ height: bar, top: center, borderRadius: bar }}
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={SPRING}
      />
      <motion.span
        className="absolute left-0 block w-full bg-current"
        style={{ height: bar, bottom: 0, borderRadius: bar }}
        animate={isOpen ? { rotate: -45, y: -center } : { rotate: 0, y: 0 }}
        transition={SPRING}
      />
    </span>
  );
}
