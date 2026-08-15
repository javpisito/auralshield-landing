/**
 * Datos reales tomados de las fichas de Dropi (agosto 2026).
 * Los precios son los SUGERIDOS de venta al público, en pesos colombianos.
 *
 * Nada de lo que está aquí es inventado: si un dato no aparecía en la ficha
 * del proveedor, no está. Los campos marcados como `porConfirmar` son los que
 * conviene pedirle al proveedor antes de publicar.
 */

export const TIENDA = {
  /** ← CAMBIA ESTO por el nombre de tu tienda. Aparece en la barra y el footer. */
  nombre: 'TU MARCA',
  /** Teléfono de WhatsApp con indicativo, sin espacios ni +. Ej: '573001234567'.
   *  Si lo dejas vacío, los botones no abren WhatsApp. */
  whatsapp: '',
  ciudad: 'Bogotá',
};

export interface Producto {
  id: string;
  nombre: string;
  tagline: string;
  precio: number;
  precioAntes: number | null;
  descripcion: string;
  colores: string[];
  bloques: { titulo: string; items: string[] }[];
  /** Datos que hay que confirmar con el proveedor antes de publicarlos. */
  porConfirmar: string[];
}

export const P9: Producto = {
  id: 'p9',
  nombre: 'Audífonos P9',
  tagline: 'Over-ear con cancelación de ruido',
  precio: 60000,
  precioAntes: null,
  descripcion:
    'Diseño moderno, sonido envolvente y comodidad total para que disfrutes tu música, llamadas y contenido sin interrupciones.',
  colores: ['Negro', 'Plata', 'Rosa', 'Azul', 'Verde'],
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

export const ULTRAPODS: Producto = {
  id: 'ultrapods',
  nombre: 'UltraPods Pro',
  tagline: 'Inalámbricos transparentes con pantalla LED',
  precio: 25000,
  precioAntes: null,
  descripcion:
    'Su fuselaje 360° totalmente transparente deja a la vista la ingeniería detrás de un sonido impecable, y el estuche lleva una pantalla LED digital para que siempre sepas el nivel de batería disponible.',
  colores: ['Verde menta'],
  bloques: [
    {
      titulo: 'Conexión y carga',
      items: [
        'Bluetooth 5.3 de alta estabilidad',
        'Conexión rápida y sin retrasos',
        'Puerto USB-C de carga ultra rápida',
      ],
    },
    {
      titulo: 'Diseño',
      items: [
        'Fuselaje 360° totalmente transparente',
        'Ergonómico y ligero para horas de uso',
        'Pantalla LED de control de carga en el estuche',
      ],
    },
    {
      titulo: 'Resistencia',
      items: [
        'Certificación de resistencia al agua',
        'Pensados para el gimnasio y la calle',
        'Sonido envolvente en un formato mínimo',
      ],
    },
  ],
  porConfirmar: [
    'Horas de batería (audífonos y estuche)',
    'Certificación exacta de agua (IPX)',
    'Otros colores disponibles',
  ],
};

export const PRODUCTOS = [P9, ULTRAPODS];

/** Formatea 60000 → "$60.000" */
export const precioCOP = (valor: number) => `$${valor.toLocaleString('es-CO')}`;

/** Link de WhatsApp genérico, sin producto específico. */
export const linkTienda = () => {
  if (!TIENDA.whatsapp) return '#';
  return `https://wa.me/${TIENDA.whatsapp}?text=${encodeURIComponent('Hola, quiero más información sobre los audífonos.')}`;
};

/** Link de WhatsApp con el mensaje del producto ya escrito. */
export const linkPedido = (producto: Producto) => {
  if (!TIENDA.whatsapp) return '#';
  const mensaje = `Hola, quiero pedir los ${producto.nombre} (${precioCOP(producto.precio)}).`;
  return `https://wa.me/${TIENDA.whatsapp}?text=${encodeURIComponent(mensaje)}`;
};
