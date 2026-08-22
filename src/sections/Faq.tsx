import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { P9, VARIANTES } from '../products';

/**
 * REVISA LAS RESPUESTAS antes de publicar: los tiempos de envío y las
 * condiciones de garantía dependen de tu operación, no del proveedor.
 */
const listaColores = VARIANTES.map((v) => v.nombre.toLowerCase())
  .join(', ')
  .replace(/, ([^,]*)$/, ' y $1');

const QUESTIONS = [
  {
    q: '¿Cómo hago mi pedido?',
    a: 'Elige el color, agrégalo al carrito y confirma tu compra. Si prefieres, también puedes escribirnos por WhatsApp y te acompañamos en todo el proceso.',
  },
  {
    q: '¿Puedo pagar cuando reciba el producto?',
    a: 'Sí. Trabajamos con pago contra entrega: pagas al transportador en el momento en que recibes tu pedido.',
  },
  {
    q: '¿Cuánto demora el envío?',
    a: 'Los pedidos salen desde Bogotá hacia todo el país. El tiempo exacto depende de tu ciudad; te lo confirmamos antes de despachar.',
  },
  {
    q: '¿En qué colores están disponibles?',
    a: `En ${VARIANTES.length}: ${listaColores}. Puedes verlos todos en la galería y elegir el tuyo antes de agregarlo al carrito.`,
  },
  {
    q: '¿Sirven para trabajar o estudiar desde casa?',
    a: `Sí. Los ${P9.nombre} tienen micrófono integrado y cancelación de ruido, y las almohadillas over-ear están pensadas para jornadas largas, así que funcionan bien en reuniones virtuales.`,
  },
  {
    q: '¿Se pueden usar con cualquier celular?',
    a: 'Sí. Se conectan por Bluetooth, así que funcionan con Android, iPhone, tablets y computadores que tengan Bluetooth.',
  },
  {
    q: '¿Tienen garantía?',
    a: 'Sí, todos los productos salen con garantía. Si llega con algún defecto de fábrica, escríbenos y gestionamos el cambio.',
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="preguntas" className="w-full scroll-mt-24 bg-paper px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-[13px] uppercase tracking-[0.2em] text-ink/40 sm:text-[14px]"
        >
          Preguntas frecuentes
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-[clamp(28px,6vw,48px)] font-light leading-[1.1] tracking-[-0.03em] text-ink"
        >
          Antes de que preguntes.
        </motion.h2>

        <div>
          {QUESTIONS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q} className="border-t border-ink/10 last:border-b">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="text-[15px] text-ink sm:text-[17px]">{item.q}</span>
                  <motion.i
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="bi bi-plus-lg shrink-0 text-[15px] text-ink/50"
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.215, 0.61, 0.355, 1.0] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-7 pr-10 text-[13px] leading-relaxed text-ink/55 sm:text-[15px]">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
