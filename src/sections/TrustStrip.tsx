/**
 * CONFIRMA TUS POLÍTICAS antes de publicar: cada frase de aquí es una promesa
 * al comprador. Ajusta o borra las que no apliquen a tu operación.
 */
const ITEMS = [
  'Pago contra entrega',
  'Envío a todo Colombia',
  'Despachos desde Bogotá',
  'Atención por WhatsApp',
  'Garantía incluida',
];

export default function TrustStrip() {
  return (
    <div className="relative w-full overflow-hidden border-y border-ink/10 bg-paper py-4">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copia) => (
          <ul key={copia} className="flex shrink-0 items-center" aria-hidden={copia === 1}>
            {ITEMS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 whitespace-nowrap px-6 text-[11px] uppercase tracking-[0.18em] text-ink/50 sm:text-[12px]"
              >
                <span className="text-gold">◆</span>
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
