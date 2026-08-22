/**
 * Fotos y videos de la página que no son de un color específico.
 *
 * Las fotos de cada color NO se configuran aquí, sino en `src/products.ts`
 * (una por variante, junto a su `variantId` de Shopify).
 *
 * Para cambiar cualquiera: copia el archivo a `public/` y escribe la ruta con
 * una barra al inicio. Ej: '/p9-hero.jpg'.
 */

export interface Media {
  src: string;
  /** Texto alternativo para accesibilidad y SEO. */
  alt: string;
}

export const MEDIA = {
  /** Foto grande de la primera pantalla. Cuadrada, para que no se recorte. */
  heroImagen: {
    src: '/p9-hero.jpg',
    alt: 'Audífonos Aura Max P9 en color gris espacial vistos en tres cuartos',
  } as Media,

  /** Video de la sección de colores. */
  showcaseVideo: {
    src: '/showcase.mp4',
    alt: 'Audífonos Aura Max P9 mostrados en sus distintos colores',
  } as Media,

  /** Foto del footer. */
  footer: {
    src: '/p9-negro.jpg',
    alt: 'Audífonos Aura Max P9 en color negro',
  } as Media,
};
