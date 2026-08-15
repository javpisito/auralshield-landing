import { motion } from 'framer-motion';
import { P9, ULTRAPODS, linkPedido, precioCOP } from '../products';

/**
 * Solo compara datos que aparecen en la ficha del proveedor.
 * Si más adelante confirmas batería, peso o versión de Bluetooth del P9,
 * agrégalos como filas nuevas aquí.
 */
const FILAS: { concepto: string; p9: string; ultrapods: string }[] = [
  { concepto: 'Tipo', p9: 'Over-ear (diadema)', ultrapods: 'In-ear inalámbricos' },
  { concepto: 'Cancelación de ruido', p9: 'Sí', ultrapods: 'No indicada' },
  { concepto: 'Micrófono', p9: 'Integrado', ultrapods: 'No indicado' },
  { concepto: 'Bluetooth', p9: 'Sí, estable y rápido', ultrapods: 'Versión 5.3' },
  { concepto: 'Carga', p9: 'No indicada', ultrapods: 'USB-C rápida' },
  { concepto: 'Resistencia al agua', p9: 'No indicada', ultrapods: 'Con certificación' },
  { concepto: 'Indicador de batería', p9: 'No indicado', ultrapods: 'Pantalla LED en el estuche' },
  { concepto: 'Plegable', p9: 'Sí', ultrapods: 'Estuche de bolsillo' },
  { concepto: 'Colores', p9: '5 colores', ultrapods: 'Verde menta' },
];

export default function Compare() {
  return (
    <section id="comparar" className="w-full bg-bone px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="mb-6 text-[13px] uppercase tracking-[0.2em] text-ink/40 sm:text-[14px]">
            Cuál te conviene
          </p>
          <h2 className="max-w-xl text-[clamp(28px,5vw,44px)] font-light leading-[1.1] tracking-[-0.03em] text-ink">
            Dos formas de escuchar. Elige la tuya.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="overflow-x-auto"
        >
          <table className="w-full min-w-[520px] border-collapse text-left">
            <thead>
              <tr className="border-b border-ink/15">
                <th className="py-4 pr-4 text-[12px] font-normal uppercase tracking-[0.14em] text-ink/40">
                  Característica
                </th>
                <th className="py-4 pr-4 text-[14px] font-bold text-ink">{P9.nombre}</th>
                <th className="py-4 text-[14px] font-bold text-ink">{ULTRAPODS.nombre}</th>
              </tr>
            </thead>
            <tbody>
              {FILAS.map((fila) => (
                <tr key={fila.concepto} className="border-b border-ink/10">
                  <td className="py-4 pr-4 text-[12px] uppercase tracking-[0.12em] text-ink/40">
                    {fila.concepto}
                  </td>
                  <td className="py-4 pr-4 text-[13px] text-ink/75 sm:text-[14px]">{fila.p9}</td>
                  <td className="py-4 text-[13px] text-ink/75 sm:text-[14px]">{fila.ultrapods}</td>
                </tr>
              ))}
              <tr>
                <td className="py-6 pr-4 text-[12px] uppercase tracking-[0.12em] text-ink/40">
                  Precio
                </td>
                <td className="py-6 pr-4">
                  <div className="mb-3 text-[20px] font-light text-ink">
                    {precioCOP(P9.precio)}
                  </div>
                  <a
                    href={linkPedido(P9)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center rounded-full bg-ink px-5 text-[13px] text-bone transition-colors hover:bg-[#2b2622]"
                  >
                    Pedir
                  </a>
                </td>
                <td className="py-6">
                  <div className="mb-3 text-[20px] font-light text-ink">
                    {precioCOP(ULTRAPODS.precio)}
                  </div>
                  <a
                    href={linkPedido(ULTRAPODS)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center rounded-full border border-ink/20 px-5 text-[13px] text-ink transition-colors hover:bg-ink/5"
                  >
                    Pedir
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </motion.div>

        <p className="mt-8 text-[12px] leading-relaxed text-ink/35">
          "No indicada" significa que el proveedor no publica ese dato. Confírmalo antes de
          prometerlo en la página.
        </p>
      </div>
    </section>
  );
}
