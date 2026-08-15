# Guía de contenidos

Landing de dos productos: **Audífonos P9** (protagonista) y **UltraPods Pro**.
Todas las rutas son relativas a la carpeta `synapsex/`.

---

## ⚠️ Antes de publicar

1. **Nombre de la tienda.** Ahora dice `TU MARCA`. Cámbialo en `src/products.ts` → `TIENDA.nombre`.
2. **WhatsApp.** Los 8 botones de "Pedir" no funcionan hasta que pongas tu número
   en `src/products.ts` → `TIENDA.whatsapp` (formato `573001234567`, sin + ni espacios).
3. **Fotos y video.** Ver la sección "Fotos y video" más abajo. Hoy se ven recuadros grises.
4. **Tus políticas.** Revisa que sean ciertas: pago contra entrega, garantía y tiempos
   de envío aparecen en `src/sections/TrustStrip.tsx` y en las respuestas de `src/sections/Faq.tsx`.
5. **Datos que faltan del proveedor.** Horas de batería, versión de Bluetooth y peso del P9;
   certificación IPX exacta de los UltraPods. Están listados en `porConfirmar` dentro de
   `src/products.ts`. Mientras no los tengas, la tabla comparativa dice "No indicada" —
   que es la verdad, y es mejor que inventar una cifra.

---

## 1. Datos de los productos

**Archivo: `src/products.ts`** — es el único lugar donde se escriben precios y características.

| Qué | Dónde |
|---|---|
| Nombre de la tienda, WhatsApp, ciudad | Objeto `TIENDA` |
| Audífonos P9: nombre, precio, descripción, colores, características | Constante `P9` |
| UltraPods Pro: lo mismo | Constante `ULTRAPODS` |
| Precio tachado (si haces promoción) | Campo `precioAntes`, hoy en `null` |

Precios actuales, tomados del "precio sugerido" de Dropi:
**P9 $60.000** · **UltraPods Pro $25.000** (pesos colombianos).

Los bloques de características (`bloques`) son listas: agrega o quita viñetas libremente,
y si agregas un bloque nuevo aparece solo en la página.

---

## 2. Fotos y video

**Archivo: `src/media.ts`**

Hoy hay 8 espacios vacíos. Cada uno muestra en pantalla el nombre de archivo que espera.
Para llenarlos:

1. Copia tu foto o video dentro de la carpeta `public/`.
2. En `src/media.ts` cambia `src: null` por `src: '/nombre-del-archivo.jpg'`.
3. Guarda. Listo.

| Espacio | Archivo | Estado | Dónde se ve |
|---|---|---|---|
| `heroVideo` | `producto.mp4` | ✅ puesto | Primera pantalla, se recorre con el cursor |
| `heroImagen` | `p9-hero.jpg` | ✅ puesto | Primera pantalla, si algún día quitas el video |
| `p9[0]` | `p9-hero.jpg` | ✅ puesto | Galería P9 (foto grande) **y footer** |
| `p9[1]` | `p9-colores.jpg` | ⬜ falta | Galería P9 |
| `p9[2]` | `p9-uso.jpg` | ⬜ falta | Galería P9 |
| `ultrapods[0]` | `ultrapods-1.jpg` | ✅ puesto | Galería UltraPods (foto grande) |
| `ultrapods[1]` | `ultrapods-led.jpg` | ⬜ falta | Galería UltraPods |
| `ultrapods[2]` | `ultrapods-uso.jpg` | ⬜ falta | Galería UltraPods |

Faltan 4 fotos. Lo ideal para cada producto: una de detalle, una con los colores
disponibles y una de alguien usándolo.

No tienes que usar esos nombres exactos; son solo una sugerencia. Cambia también el
campo `alt` de cada uno: es el texto que lee Google y los lectores de pantalla.

---

## 3. Textos por sección

| Sección | Archivo | Qué se cambia |
|---|---|---|
| Barra superior | `src/components/Navbar.tsx` | `NAV_LINKS` (los enlaces del menú) |
| Primera pantalla | `src/sections/Hero.tsx` | Titulares dentro de `<ScrambleIn text="...">`, el rótulo "Envío a todo Colombia" y la línea bajo el botón |
| Cinta que se desplaza | `src/sections/TrustStrip.tsx` | Array `ITEMS` |
| Ficha de cada producto | `src/sections/ProductFeature.tsx` | Es una plantilla: el contenido sale de `products.ts`. Aquí solo cambian los rótulos fijos ("Colores disponibles", "Pedir...") |
| Tabla comparativa | `src/sections/Compare.tsx` | Array `FILAS` y el titular |
| Preguntas frecuentes | `src/sections/Faq.tsx` | Array `QUESTIONS` |
| Footer | `src/sections/Footer.tsx` | Titular, texto y enlaces |
| Pestaña del navegador y Google | `index.html` | `<title>` y `<meta name="description">` |

---

## 4. Orden de la página

**Archivo: `src/App.tsx`** — para reordenar secciones, mover líneas. Para quitar una,
borra su línea. Hoy el orden es:

1. Primera pantalla (P9)
2. Cinta de garantías
3. Ficha Audífonos P9
4. Ficha UltraPods Pro
5. Tabla comparativa
6. Preguntas frecuentes
7. Footer

Si quieres que el protagonista sea el UltraPods, intercambia las dos líneas de
`<ProductFeature .../>` y cambia el producto del hero en `src/sections/Hero.tsx`.

---

## 5. Testimonios

La sección de reseñas **se eliminó**. Tenía tres testimonios inventados y una
calificación falsa, y eso no puede quedar en una página que vende productos reales.
Cuando tengas reseñas de clientes de verdad, pídemelas y la vuelvo a montar.

---

## 6. Colores y tipografía

- Paleta: `tailwind.config.js` (`bone`, `paper`, `ink`, `walnut`, `gold`).
- Los mismos valores están en `src/index.css` como variables CSS.
- **Importante:** después de editar `tailwind.config.js` hay que reiniciar el servidor
  (`Ctrl+C` y `npm run dev`), si no los colores nuevos no aparecen.

---

## 7. Animaciones

Ya están en un nivel suave y la página respeta la opción "reducir movimiento" del
sistema operativo. Si quieres bajarlas más:

- **Texto revuelto al cargar**: quita los `<ScrambleIn>` de `src/sections/Hero.tsx`.
- **Texto revuelto al pasar el mouse**: borra los `<ScrambleText text="X" ...>` y escribe
  `X` directamente (están en `Navbar.tsx`, `Hero.tsx`, `ProductFeature.tsx` y `Footer.tsx`).
- **Cinta que se desplaza sola**: en `src/index.css`, sube los `60s` de `.animate-marquee`.
