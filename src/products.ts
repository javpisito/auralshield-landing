/**
 * Datos reales tomados de la ficha de Dropi (agosto 2026).
 * El precio es el SUGERIDO de venta al público, en pesos colombianos.
 *
 * Si un dato no aparecía en la ficha del proveedor, no está aquí.
 * Los de `porConfirmar` son los que conviene pedirle al proveedor.
 */

export const TIENDA = {
  /** ← CAMBIA ESTO por el nombre de tu tienda. Aparece en la barra y el footer. */
  nombre: 'TU MARCA',
  /** Teléfono de WhatsApp con indicativo, sin espacios ni +. Ej: '573001234567'.
   *  Si lo dejas vacío, los botones de WhatsApp no abren nada. */
  whatsapp: '',
  ciudad: 'Bogotá',
};

/**
 * PASARELA DE PAGO
 *
 * Dominio de la tienda Shopify a donde va el carrito. Mientras esté vacío, o
 * falte el `variantId` de algún color, el botón de pago envía el pedido por
 * WhatsApp en lugar de ir a la pasarela.
 *
 * También se puede definir sin tocar código con la variable de entorno
 * VITE_SHOPIFY_DOMINIO (útil para configurarlo desde Vercel sin redeploy manual).
 *
 * Ver CHECKOUT-SHOPIFY.md para el paso a paso.
 */
const DOMINIO_TIENDA = 'auralshield.myshopify.com';

/** Normaliza lo que hayas pegado a la forma `https://dominio/cart/`. */
export const baseCarrito = (): string => {
  const crudo = (import.meta.env.VITE_SHOPIFY_DOMINIO as string | undefined) || DOMINIO_TIENDA;
  if (!crudo.trim()) return '';

  let base = crudo.trim().replace(/\/+$/, '');
  if (!/^https?:\/\//i.test(base) && !base.startsWith('/')) base = `https://${base}`;
  if (!/\/cart$/i.test(base)) base = `${base}/cart`;
  return `${base}/`;
};

export const CHECKOUT = {
  /** Se pega al final de la URL. En Shopify normalmente se deja vacío. */
  sufijo: '',
};

export interface Variante {
  /** Clave interna, no se muestra. */
  id: string;
  nombre: string;
  /** Color del círculo del selector. */
  hex: string;
  imagen: string;
  /** ← PEGA AQUÍ el ID de variante de tu pasarela de pago. */
  variantId: string;
}

/** Los 6 colores del catálogo, con su ID de variante de Shopify. */
export const VARIANTES: Variante[] = [
  {
    id: 'negro',
    nombre: 'Negro',
    hex: '#2b2b2d',
    imagen: '/p9-negro.jpg',
    variantId: '50989106200828',
  },
  {
    id: 'gris',
    nombre: 'Gris',
    hex: '#cdcdd1',
    imagen: '/p9-gris.jpg',
    variantId: '50989106135292',
  },
  {
    id: 'azul',
    nombre: 'Azul',
    hex: '#3f5a78',
    imagen: '/p9-azul.jpg',
    variantId: '50989106102524',
  },
  {
    id: 'verde',
    nombre: 'Verde',
    hex: '#7ba98d',
    imagen: '/p9-verde.jpg',
    variantId: '50989106168060',
  },
  {
    id: 'rosado-claro',
    nombre: 'Rosado claro',
    hex: '#e9c9cb',
    imagen: '/p9-rosado-claro.jpg',
    variantId: '50989106069756',
  },
  {
    id: 'rosado-oscuro',
    nombre: 'Rosado oscuro',
    hex: '#d69fb8',
    imagen: '/p9-rosado-oscuro.jpg',
    variantId: '50989106233596',
  },
];

export const P9 = {
  id: 'p9',
  nombre: 'Audífonos P9',
  tagline: 'Over-ear con cancelación de ruido',
  precio: 60000,
  precioAntes: null as number | null,
  descripcion:
    'Diseño moderno, sonido envolvente y comodidad total para que disfrutes tu música, llamadas y contenido sin interrupciones.',
  bloques: [
    {
      titulo: 'Características principales',
      items: [
        'Conectividad Bluetooth estable y rápida',
        'Diseño over-ear acolchado ultra cómodo',
        'Tecnología de cancelación de ruido',
        'Controles laterales integrados',
        'Batería de larga duración',
        'Disponibles en varios colores elegantes',
      ],
    },
    {
      titulo: 'Experiencia de sonido',
      items: [
        'Graves profundos y potentes',
        'Agudos claros y definidos',
        'Aislamiento que mejora la inmersión',
        'Ideal para música, gaming, trabajo y viajes',
      ],
    },
    {
      titulo: 'Comodidad todo el día',
      items: ['Almohadillas suaves y ergonómicas', 'Diadema ajustable', 'Diseño ligero y plegable'],
    },
    {
      titulo: 'Manos libres',
      items: [
        'Micrófono integrado',
        'Responde llamadas sin sacar el celular',
        'Perfectos para reuniones virtuales',
      ],
    },
  ],
  porConfirmar: ['Horas de batería', 'Versión de Bluetooth', 'Peso', 'Tamaño del driver'],
};

/** Formatea 60000 → "$60.000" */
export const precioCOP = (valor: number) => `$${valor.toLocaleString('es-CO')}`;

export const variantePorId = (id: string) => VARIANTES.find((v) => v.id === id);

/** Link de WhatsApp genérico, sin producto específico. */
export const linkTienda = () => {
  if (!TIENDA.whatsapp) return '#';
  const mensaje = 'Hola, quiero más información sobre los Audífonos P9.';
  return `https://wa.me/${TIENDA.whatsapp}?text=${encodeURIComponent(mensaje)}`;
};
