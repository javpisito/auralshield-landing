import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrambleText from '../components/ScrambleText';
import { useCarrito } from '../cart';
import { P9, VARIANTES, precioCOP } from '../products';

export default function Producto() {
  const { agregar, abrir } = useCarrito();
  const [seleccion, setSeleccion] = useState(VARIANTES[0]);
  const [cantidad, setCantidad] = useState(1);
  const [hovered, setHovered] = useState(false);

  const alCarrito = () => {
    agregar(seleccion.id, cantidad);
    setCantidad(1);
    abrir();
  };

  return (
    <section id="p9" className="w-full bg-paper px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          {/* Imagen del color elegido */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            {/*
              Intercambio directo de la foto, sin animación de salida: un selector
              de color tiene que responder en el mismo clic. Las miniaturas cargan
              en `eager` y son los mismos archivos, así que al elegir un color la
              foto grande ya está en caché.
            */}
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-ink/10 bg-bone">
              <img
                src={seleccion.imagen}
                alt={`${P9.nombre} en color ${seleccion.nombre.toLowerCase()}`}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            {/* Miniaturas */}
            <div className="mt-4 grid grid-cols-6 gap-2 sm:gap-3">
              {VARIANTES.map((variante) => {
                const activa = variante.id === seleccion.id;
                return (
                  <button
                    key={variante.id}
                    type="button"
                    onClick={() => setSeleccion(variante)}
                    aria-label={`Ver color ${variante.nombre}`}
                    aria-pressed={activa}
                    className={`relative aspect-square overflow-hidden rounded-xl border transition-all ${
                      activa
                        ? 'border-ink ring-1 ring-ink'
                        : 'border-ink/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={variante.imagen} alt="" className="h-full w-full object-cover" />
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Datos y compra */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col"
          >
            <p className="mb-4 text-[12px] uppercase tracking-[0.2em] text-ink/40">{P9.tagline}</p>

            <h2 className="mb-5 text-[clamp(30px,6vw,52px)] font-light leading-[1.05] tracking-[-0.03em] text-ink">
              {P9.nombre}
            </h2>

            <div className="mb-7 flex items-baseline gap-3">
              <span className="text-[32px] font-light leading-none tracking-[-0.03em] text-ink">
                {precioCOP(P9.precio)}
              </span>
              {P9.precioAntes && (
                <span className="text-[15px] text-ink/35 line-through">
                  {precioCOP(P9.precioAntes)}
                </span>
              )}
            </div>

            <p className="mb-9 text-[14px] leading-relaxed text-ink/60 sm:text-[15px]">
              {P9.descripcion}
            </p>

            {/* Selector de color */}
            <div className="mb-8">
              <p className="mb-3 text-[12px] uppercase tracking-[0.16em] text-ink/40">
                Color: <span className="text-ink/70">{seleccion.nombre}</span>
              </p>
              <div className="flex flex-wrap gap-2.5">
                {VARIANTES.map((variante) => {
                  const activa = variante.id === seleccion.id;
                  return (
                    <button
                      key={variante.id}
                      type="button"
                      onClick={() => setSeleccion(variante)}
                      aria-label={variante.nombre}
                      aria-pressed={activa}
                      title={variante.nombre}
                      style={{ backgroundColor: variante.hex }}
                      className={`h-9 w-9 rounded-full border transition-all ${
                        activa
                          ? 'border-ink ring-2 ring-ink ring-offset-2 ring-offset-paper'
                          : 'border-ink/20 hover:border-ink/50'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Cantidad y carrito */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex h-14 w-fit items-center gap-2 rounded-full border border-ink/15 px-2">
                <button
                  type="button"
                  onClick={() => setCantidad((n) => Math.max(1, n - 1))}
                  aria-label="Quitar una unidad"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink"
                >
                  <i className="bi bi-dash text-[16px]" />
                </button>
                <span className="min-w-[24px] text-center text-[15px] text-ink">{cantidad}</span>
                <button
                  type="button"
                  onClick={() => setCantidad((n) => n + 1)}
                  aria-label="Agregar una unidad"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink"
                >
                  <i className="bi bi-plus text-[16px]" />
                </button>
              </div>

              <button
                type="button"
                onClick={alCarrito}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="flex h-14 flex-1 items-center justify-center gap-3 rounded-full bg-ink px-8 text-[15px] text-bone transition-colors hover:bg-[#2b2622]"
              >
                <i className="bi bi-bag-plus text-[16px]" />
                <ScrambleText text="Añadir al carrito" isHovered={hovered} />
              </button>
            </div>

            <ul className="space-y-2 border-t border-ink/10 pt-6">
              {['Envío a todo Colombia', 'Pago contra entrega disponible', 'Garantía incluida'].map(
                (linea) => (
                  <li key={linea} className="flex items-center gap-2.5 text-[13px] text-ink/55">
                    <i className="bi bi-check2 text-[14px] text-gold" />
                    {linea}
                  </li>
                )
              )}
            </ul>
          </motion.div>
        </div>

        {/* Características */}
        <div className="mt-24 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {P9.bloques.map((bloque, i) => (
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
      </div>
    </section>
  );
}
