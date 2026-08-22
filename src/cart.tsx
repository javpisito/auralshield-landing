import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  CHECKOUT,
  P9,
  TIENDA,
  VARIANTES,
  baseCarrito,
  precioCOP,
  variantePorId,
} from './products';

const CLAVE = 'carrito-p9';

export interface ItemCarrito {
  /** id de la variante (color) */
  varianteId: string;
  cantidad: number;
}

interface CarritoCtx {
  items: ItemCarrito[];
  unidades: number;
  total: number;
  abierto: boolean;
  agregar: (varianteId: string, cantidad?: number) => void;
  cambiarCantidad: (varianteId: string, cantidad: number) => void;
  quitar: (varianteId: string) => void;
  vaciar: () => void;
  abrir: () => void;
  cerrar: () => void;
  /** URL de la pasarela, o null si todavía no está configurada. */
  urlPasarela: string | null;
  /** Pedido por WhatsApp, se usa cuando no hay pasarela. Null si no hay número. */
  urlWhatsapp: string | null;
}

const Ctx = createContext<CarritoCtx | null>(null);

const leerGuardado = (): ItemCarrito[] => {
  try {
    const crudo = localStorage.getItem(CLAVE);
    if (!crudo) return [];
    const datos = JSON.parse(crudo);
    if (!Array.isArray(datos)) return [];
    // Descarta colores que ya no existan en el catálogo.
    return datos
      .filter((i) => typeof i?.varianteId === 'string' && Number.isFinite(i?.cantidad))
      .filter((i) => VARIANTES.some((v) => v.id === i.varianteId))
      .map((i) => ({ varianteId: i.varianteId, cantidad: Math.max(1, Math.floor(i.cantidad)) }));
  } catch {
    return [];
  }
};

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ItemCarrito[]>(leerGuardado);
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(items));
    } catch {
      /* modo privado: seguimos sin persistir */
    }
  }, [items]);

  const agregar = useCallback((varianteId: string, cantidad = 1) => {
    setItems((prev) => {
      const existente = prev.find((i) => i.varianteId === varianteId);
      if (existente) {
        return prev.map((i) =>
          i.varianteId === varianteId ? { ...i, cantidad: i.cantidad + cantidad } : i
        );
      }
      return [...prev, { varianteId, cantidad }];
    });
  }, []);

  const cambiarCantidad = useCallback((varianteId: string, cantidad: number) => {
    setItems((prev) =>
      cantidad <= 0
        ? prev.filter((i) => i.varianteId !== varianteId)
        : prev.map((i) => (i.varianteId === varianteId ? { ...i, cantidad } : i))
    );
  }, []);

  const quitar = useCallback((varianteId: string) => {
    setItems((prev) => prev.filter((i) => i.varianteId !== varianteId));
  }, []);

  const valor = useMemo<CarritoCtx>(() => {
    const unidades = items.reduce((n, i) => n + i.cantidad, 0);
    const total = unidades * P9.precio;

    const todosConVariantId =
      items.length > 0 && items.every((i) => Boolean(variantePorId(i.varianteId)?.variantId));

    const base = baseCarrito();
    const urlPasarela =
      base && todosConVariantId
        ? base +
          items.map((i) => `${variantePorId(i.varianteId)!.variantId}:${i.cantidad}`).join(',') +
          CHECKOUT.sufijo
        : null;

    const detalle = items
      .map((i) => `${i.cantidad} x ${P9.nombre} ${variantePorId(i.varianteId)?.nombre ?? ''}`)
      .join('\n');
    const mensaje = items.length
      ? `Hola, quiero pedir:\n${detalle}\n\nTotal: ${precioCOP(total)}`
      : 'Hola, quiero pedir los Audífonos P9.';
    const urlWhatsapp = TIENDA.whatsapp
      ? `https://wa.me/${TIENDA.whatsapp}?text=${encodeURIComponent(mensaje)}`
      : null;

    return {
      items,
      unidades,
      total,
      abierto,
      agregar,
      cambiarCantidad,
      quitar,
      vaciar: () => setItems([]),
      abrir: () => setAbierto(true),
      cerrar: () => setAbierto(false),
      urlPasarela,
      urlWhatsapp,
    };
  }, [items, abierto, agregar, cambiarCantidad, quitar]);

  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>;
}

export function useCarrito() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCarrito debe usarse dentro de <CarritoProvider>');
  return ctx;
}
