/**
 * Espacios para tus fotos y videos.
 *
 * CÓMO USARLO
 * 1. Copia el archivo dentro de la carpeta `public/`.
 * 2. Escribe aquí la ruta con una barra al inicio. Ej: '/p9-hero.jpg'.
 * 3. Guarda: la página lo toma sola.
 *
 * Las fotos de los colores NO se configuran aquí, sino en `src/products.ts`
 * (una por variante, junto a su `variantId`).
 */

export interface Slot {
  src: string | null;
  /** Nombre sugerido del archivo, se muestra en el recuadro vacío. */
  sugerido: string;
  /** Texto alternativo para accesibilidad y SEO. */
  alt: string;
}

export const MEDIA = {
  /** Foto grande de la primera pantalla. Estática, sin video. */
  heroImagen: {
    src: '/p9-hero.jpg',
    sugerido: 'p9-hero.jpg',
    alt: 'Audífonos P9 en color gris espacial vistos en tres cuartos',
  } as Slot,

  /** Segunda foto de la primera pantalla, al lado de la principal. */
  heroSecundaria: {
    src: null,
    sugerido: 'p9-hero-2.jpg',
    alt: 'Audífonos P9 en detalle',
  } as Slot,

  /** Video de la sección de colores. */
  showcaseVideo: {
    src: '/showcase.mp4',
    sugerido: 'showcase.mp4',
    alt: 'Audífonos P9 mostrados en sus distintos colores',
  } as Slot,

  /** Foto del footer. */
  footer: {
    src: '/p9-negro.jpg',
    sugerido: 'p9-negro.jpg',
    alt: 'Audífonos P9 en color negro',
  } as Slot,
};
