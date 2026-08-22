# Guía de contenidos

Landing de un solo producto: **Audífonos P9**, en 6 colores, con carrito de compras.
Todas las rutas son relativas a la carpeta `synapsex/`.

---

## ⚠️ Los pendientes para vender

### 1. El dominio de Shopify ← lo único que falta para cobrar

Los 6 `variantId` ya están puestos y probados. Solo falta decirle a la landing a
qué tienda mandar el carrito. **Ver `CHECKOUT-SHOPIFY.md`** para el paso a paso;
en corto, es pegar tu dominio en `src/products.ts` → `DOMINIO_TIENDA`, o
definir la variable `VITE_SHOPIFY_DOMINIO` en Vercel.

Mientras falte, el botón del carrito **envía el pedido por WhatsApp** con el
detalle escrito, en vez de romperse. Cuando esté puesto, cambia solo de
"Enviar pedido por WhatsApp" a "Ir a pagar".

### 2. Nombre de la tienda y WhatsApp

**Archivo: `src/products.ts`** → objeto `TIENDA`. Hoy dice `TU MARCA` y el
teléfono está vacío (formato: `573001234567`, sin + ni espacios).

### 3. La segunda foto del hero

Ver la tabla de la sección "Otras fotos y el video".

---

## Colores y fotos del producto

**Archivo: `src/products.ts`** → lista `VARIANTES`. Cada entrada tiene:

| Campo | Para qué |
|---|---|
| `nombre` | El texto que ve el cliente ("Negro") |
| `hex` | El color del círculo del selector |
| `imagen` | La foto que se muestra al elegir ese color |
| `variantId` | El ID de tu pasarela |

Las 6 fotos ya están puestas y optimizadas (de ~1,7 MB a ~100 KB cada una), y
cada una está conectada a su ID de Shopify:

| Color | Foto | variantId |
|---|---|---|
| Negro | `p9-negro.jpg` | 50989106200828 |
| Gris | `p9-gris.jpg` | 50989106135292 |
| Azul | `p9-azul.jpg` | 50989106102524 |
| Verde | `p9-verde.jpg` | 50989106168060 |
| Rosado claro | `p9-rosado-claro.jpg` | 50989106069756 |
| Rosado oscuro | `p9-rosado-oscuro.jpg` | 50989106233596 |

Para **agregar un color**: copia la foto a `public/`, y añade una entrada más a la
lista. El selector, las miniaturas y el carrito lo toman solo.
Para **quitar un color**: borra su línea.

---

## Otras fotos y el video

**Archivo: `src/media.ts`**

| Espacio | Archivo | Estado | Dónde se ve |
|---|---|---|---|
| `heroImagen` | `p9-hero.jpg` | ✅ puesto | Primera pantalla, foto grande |
| `heroSecundaria` | `p9-hero-2.jpg` | ⬜ **falta** | Primera pantalla, recuadro pequeño |
| `showcaseVideo` | `showcase.mp4` | ✅ puesto | Sección de colores |
| `footer` | `p9-negro.jpg` | ✅ puesto | Footer |

Falta 1 foto: la segunda del hero. Mientras no esté, ahí se ve un recuadro gris
con el nombre del archivo que espera.

Para cambiar cualquiera: copia el archivo a `public/` y escribe la ruta con barra
al inicio (ej. `src: '/p9-hero-2.jpg'`).

> El video ya **no** está en el hero. Se movió a su propia sección con alto
> controlado (62 % de la pantalla en móvil, 80 % en escritorio) porque a pantalla
> completa se recortaba mal en celular. Solo se reproduce cuando está a la vista.

---

## Textos por sección

| Sección | Archivo | Qué se cambia |
|---|---|---|
| Barra superior | `src/components/Navbar.tsx` | `NAV_LINKS` |
| Primera pantalla | `src/sections/Hero.tsx` | Titulares dentro de `<ScrambleIn text="...">` y el rótulo de arriba |
| Cinta que se desplaza | `src/sections/TrustStrip.tsx` | Array `ITEMS` |
| Ficha del producto | `src/sections/Producto.tsx` | Rótulos fijos. El nombre, precio y características salen de `products.ts` |
| Características | `src/products.ts` | Lista `bloques` dentro de `P9` |
| Sección de colores | `src/sections/Showcase.tsx` | Antetítulo y titular |
| Preguntas frecuentes | `src/sections/Faq.tsx` | Array `QUESTIONS` |
| Carrito | `src/components/CartDrawer.tsx` | Textos del panel lateral |
| Footer | `src/sections/Footer.tsx` | Titular, texto y enlaces |
| Pestaña y Google | `index.html` | `<title>` y `<meta name="description">` |

**Revisa tus políticas** antes de publicar: "pago contra entrega", "garantía
incluida" y los tiempos de envío aparecen en `TrustStrip.tsx`, `Producto.tsx`,
`CartDrawer.tsx` y en las respuestas del FAQ.

---

## Cómo funciona el carrito

**Archivo: `src/cart.tsx`**

- Guarda el pedido en el navegador (`localStorage`), así no se pierde si el
  cliente recarga la página.
- Si un color se elimina del catálogo, se descarta solo del carrito guardado.
- El total se calcula con el precio de `P9.precio` por unidad.
- El panel lateral se abre solo al añadir algo, y también desde el botón
  "Carrito" de la barra o "Ver mi carrito" del footer.

---

## Datos que faltan del proveedor

Horas de batería, versión de Bluetooth, peso y tamaño del driver. Están en el
campo `porConfirmar` de `src/products.ts`. No los inventamos: mientras no los
tengas, no aparecen en la página.

---

## Colores del diseño y tipografía

- Paleta: `tailwind.config.js` (`bone`, `paper`, `ink`, `walnut`, `gold`).
- Los mismos valores están en `src/index.css` como variables CSS.
- **Importante:** después de editar `tailwind.config.js` hay que reiniciar el
  servidor (`Ctrl+C` y `npm run dev`), si no los colores nuevos no aparecen.

---

## Animaciones

Están en un nivel suave y la página respeta la opción "reducir movimiento" del
sistema operativo. Si quieres bajarlas más:

- **Texto revuelto al cargar**: quita los `<ScrambleIn>` de `src/sections/Hero.tsx`.
- **Texto revuelto al pasar el mouse**: borra los `<ScrambleText text="X" ...>` y
  escribe `X` directamente (`Navbar.tsx`, `Hero.tsx`, `Producto.tsx`, `Footer.tsx`).
- **Cinta que se desplaza sola**: en `src/index.css`, sube los `60s` de `.animate-marquee`.
