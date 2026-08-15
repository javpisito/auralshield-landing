import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrambleText from '../components/ScrambleText';
import MediaSlot from '../components/MediaSlot';
import type { Slot } from '../media';
import { type Producto, linkPedido, precioCOP } from '../products';

interface ProductFeatureProps {
  producto: Producto;
  fotos: Slot[];
  /** Número que se muestra como antetítulo (01, 02...). */
  indice: string;
  fondo?: 'bone' | 'paper';
}

export default function ProductFeature({
  producto,
  fotos,
  indice,
  fondo = 'paper',
}: ProductFeatureProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      id={producto.id}
      className={`w-full px-6 py-24 sm:py-28 ${fondo === 'paper' ? 'bg-paper' : 'bg-bone'}`}
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="mb-4 text-[12px] uppercase tracking-[0.2em] text-ink/40">
              {indice} · {producto.tagline}
            </p>
            <h2 className="text-[clamp(30px,6vw,56px)] font-light leading-[1.05] tracking-[-0.03em] text-ink">
              {producto.nombre}
            </h2>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-[clamp(28px,5vw,42px)] font-light leading-none tracking-[-0.03em] text-ink">
              {precioCOP(producto.precio)}
            </span>
            {producto.precioAntes && (
              <span className="text-[15px] text-ink/35 line-through">
                {precioCOP(producto.precioAntes)}
              </span>
            )}
          </div>
        </motion.div>

        {/* Galería */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-14 grid grid-cols-1 gap-4 sm:h-[440px] sm:grid-cols-3 sm:grid-rows-2"
        >
          {fotos.map((foto, i) => (
            <div
              key={foto.sugerido}
              className={`relative aspect-[4/3] overflow-hidden rounded-2xl border border-ink/10 bg-bone sm:aspect-auto ${
                i === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
              }`}
            >
              <MediaSlot slot={foto} />
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl text-[15px] leading-relaxed text-ink/60 sm:text-[17px]"
        >
          {producto.descripcion}
        </motion.p>

        {/* Bloques de características */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {producto.bloques.map((bloque, i) => (
            <motion.div
              key={bloque.titulo}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="border-t border-ink/10 pt-5"
            >
              <h3 className="mb-4 text-[14px] font-bold text-ink sm:text-[15px]">
                {bloque.titulo}
              </h3>
              <ul className="space-y-2.5">
                {bloque.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[13px] leading-relaxed text-ink/55"
                  >
                    <i className="bi bi-check2 mt-[2px] text-[13px] text-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Colores + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-14 flex flex-col gap-6 border-t border-ink/10 pt-10 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="mb-3 text-[12px] uppercase tracking-[0.16em] text-ink/40">
              {producto.colores.length > 1 ? 'Colores disponibles' : 'Color'}
            </p>
            <div className="flex flex-wrap gap-2">
              {producto.colores.map((color) => (
                <span
                  key={color}
                  className="rounded-full border border-ink/15 px-4 py-1.5 text-[12px] text-ink/65"
                >
                  {color}
                </span>
              ))}
            </div>
          </div>

          <a
            href={linkPedido(producto)}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="flex h-14 shrink-0 items-center justify-center gap-3 rounded-full bg-ink px-10 text-[15px] text-bone transition-colors hover:bg-[#2b2622]"
          >
            <i className="bi bi-whatsapp text-[16px]" />
            <ScrambleText text={`Pedir ${producto.nombre}`} isHovered={hovered} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
