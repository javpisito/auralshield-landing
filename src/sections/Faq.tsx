import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { P9, ULTRAPODS, precioCOP } from '../products';

/**
 * REVISA LAS RESPUESTAS antes de publicar: los tiempos de envío y las
 * condiciones de garantía dependen de tu operación, no del proveedor.
 */
const QUESTIONS = [
  {
    q: '¿Cómo hago mi pedido?',
    a: 'Escríbenos por WhatsApp con el modelo y el color que quieres. Confirmamos tus datos de envío y despachamos el mismo día o el siguiente día hábil.',
  },
  {
    q: '¿Puedo pagar cuando reciba el producto?',
    a: 'Sí. Trabajamos con pago contra entrega: pagas al transportador en el momento en que recibes tu pedido.',
  },
  {
    q: '¿Cuánto demora el envío?',
    a: 'Los pedidos salen desde Bogotá hacia todo el país. El tiempo exacto depende de tu ciudad; te lo confirmamos por WhatsApp antes de despachar.',
  },
  {
    q: `¿Puedo elegir el color de los ${P9.nombre}?`,
    a: `Sí, están disponibles en ${P9.colores.join(', ').replace(/, ([^,]*)$/, ' y $1')}. Indícanos tu preferencia al hacer el pedido y confirmamos disponibilidad.`,
  },
  {
    q: '¿Cuál me conviene si trabajo o estudio desde casa?',
    a: `Los ${P9.nombre} (${precioCOP(P9.precio)}), porque tienen micrófono integrado, cancelación de ruido y almohadillas over-ear pensadas para jornadas largas.`,
  },
  {
    q: '¿Los UltraPods sirven para hacer ejercicio?',
    a: `Sí. Los ${ULTRAPODS.nombre} tienen certificación de resistencia al agua y un diseño ergonómico y ligero, así que aguantan el gimnasio y el sudor.`,
  },
  {
    q: '¿Tienen garantía?',
    a: 'Sí, todos los productos salen con garantía. Si llega con algún defecto de fábrica, escríbenos y gestionamos el cambio.',
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full bg-paper px-6 py-24 sm:py-28">
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
