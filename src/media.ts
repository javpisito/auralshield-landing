/**
 * Espacios para tus fotos y videos.
 *
 * CÓMO USARLO
 * 1. Copia el archivo dentro de la carpeta `public/`.
 * 2. Escribe aquí la ruta con una barra al inicio. Ej: '/p9-frente.jpg'.
 * 3. Guarda: la página lo toma sola.
 *
 * Mientras un espacio esté en `null` se muestra un recuadro gris con el nombre
 * sugerido del archivo, así la página funciona completa aunque falte material.
 */

export interface Slot {
  src: string | null;
  /** Nombre sugerido del archivo, se muestra en el recuadro vacío. */
  sugerido: string;
  /** Texto alternativo para accesibilidad y SEO. */
  alt: string;
}

export const MEDIA = {
  /** Video del hero. Se puede recorrer moviendo el cursor en horizontal. */
  heroVideo: {
    src: '/producto.mp4',
    sugerido: 'producto.mp4',
    alt: 'Audífonos P9 girando sobre una superficie oscura',
  } as Slot,

  /** Foto principal del hero. Se usa cuando no hay video. */
  heroImagen: {
    src: '/p9-hero.jpg',
    sugerido: 'p9-hero.jpg',
    alt: 'Audífonos P9 en color gris espacial vistos en tres cuartos',
  } as Slot,

  p9: [
    {
      src: '/p9-hero.jpg',
      sugerido: 'p9-hero.jpg',
      alt: 'Audífonos P9 en color gris espacial',
    },
    { src: null, sugerido: 'p9-colores.jpg', alt: 'Audífonos P9 en sus cinco colores' },
    { src: null, sugerido: 'p9-uso.jpg', alt: 'Persona usando los audífonos P9' },
  ] as Slot[],

  ultrapods: [
    {
      src: '/ultrapods-1.jpg',
      sugerido: 'ultrapods-1.jpg',
      alt: 'UltraPods Pro verde menta con su estuche transparente y pantalla LED',
    },
    { src: null, sugerido: 'ultrapods-led.jpg', alt: 'Pantalla LED de batería del estuche' },
    { src: null, sugerido: 'ultrapods-uso.jpg', alt: 'UltraPods Pro puestos en la oreja' },
  ] as Slot[],
};
