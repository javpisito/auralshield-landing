import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCarrito } from '../cart';
import { P9, precioCOP, variantePorId } from '../products';

export default function CartDrawer() {
  const { items, abierto, cerrar, cambiarCantidad, quitar, total, urlPasarela, urlWhatsapp } =
    useCarrito();

  useEffect(() => {
    if (!abierto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') cerrar();
    };
    window.addEventListener('keydown', onKey);
    const previo = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previo;
    };
  }, [abierto, cerrar]);

  const destino = urlPasarela ?? urlWhatsapp;
  const etiquetaPago = urlPasarela ? 'Ir a pagar' : 'Enviar pedido por WhatsApp';

  return (
    <AnimatePresence>
      {abierto && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={cerrar}
            className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-[2px]"
            aria-hidden="true"
          />

          <motion.aside
            role="dialog"
            aria-label="Carrito de compras"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 34 }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full flex-col bg-paper sm:max-w-[420px]"
          >
            <header className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <h2 className="text-[15px] font-bold tracking-[0.06em] text-ink">TU CARRITO</h2>
              <button
                type="button"
                onClick={cerrar}
                aria-label="Cerrar carrito"
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink"
              >
                <i className="bi bi-x-lg text-[15px]" />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
                <i className="bi bi-bag text-[26px] text-ink/20" />
                <p className="text-[14px] text-ink/45">Todavía no has agregado nada.</p>
                <button
                  type="button"
                  onClick={cerrar}
                  className="mt-2 text-[13px] text-ink underline decoration-ink/30 underline-offset-4"
                >
                  Ver los colores
                </button>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-ink/10 overflow-y-auto px-6">
                  {items.map((item) => {
                    const variante = variantePorId(item.varianteId);
                    if (!variante) return null;
                    return (
                      <li key={item.varianteId} className="flex gap-4 py-5">
                        <img
                          src={variante.imagen}
                          alt={`${P9.nombre} ${variante.nombre}`}
                          className="h-20 w-20 shrink-0 rounded-xl border border-ink/10 object-cover"
                        />

                        <div className="flex min-w-0 flex-1 flex-col justify-between">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-[13px] text-ink">{P9.nombre}</p>
                              <p className="text-[12px] text-ink/45">{variante.nombre}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => quitar(item.varianteId)}
                              aria-label={`Quitar ${variante.nombre}`}
                              className="text-[12px] text-ink/35 transition-colors hover:text-ink"
                            >
                              <i className="bi bi-trash3" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-1 rounded-full border border-ink/15">
                              <button
                                type="button"
                                onClick={() => cambiarCantidad(item.varianteId, item.cantidad - 1)}
                                aria-label="Quitar una unidad"
                                className="flex h-8 w-8 items-center justify-center text-ink/60 transition-colors hover:text-ink"
                              >
                                <i className="bi bi-dash text-[14px]" />
                              </button>
                              <span className="min-w-[20px] text-center text-[13px] text-ink">
                                {item.cantidad}
                              </span>
                              <button
                                type="button"
                                onClick={() => cambiarCantidad(item.varianteId, item.cantidad + 1)}
                                aria-label="Agregar una unidad"
                                className="flex h-8 w-8 items-center justify-center text-ink/60 transition-colors hover:text-ink"
                              >
                                <i className="bi bi-plus text-[14px]" />
                              </button>
                            </div>
                            <span className="text-[14px] text-ink">
                              {precioCOP(item.cantidad * P9.precio)}
                            </span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <footer className="border-t border-ink/10 px-6 py-6">
                  <div className="mb-5 flex items-baseline justify-between">
                    <span className="text-[12px] uppercase tracking-[0.16em] text-ink/45">
                      Total
                    </span>
                    <span className="text-[24px] font-light text-ink">{precioCOP(total)}</span>
                  </div>

                  <a
                    href={destino}
                    target={destino.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex h-14 w-full items-center justify-center gap-3 rounded-full bg-ink text-[15px] text-bone transition-colors hover:bg-[#2b2622]"
                  >
                    <i className={`bi ${urlPasarela ? 'bi-lock' : 'bi-whatsapp'} text-[15px]`} />
                    {etiquetaPago}
                  </a>

                  <p className="mt-4 text-center text-[11px] leading-relaxed text-ink/40">
                    Envío a todo Colombia · Pago contra entrega disponible
                  </p>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
