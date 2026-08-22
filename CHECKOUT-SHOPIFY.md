# Conectar la landing con el checkout de Shopify

## Lo primero: no hay que "conectar dos tiendas"

La landing no necesita integrarse con Shopify ni instalar nada. Es una página
normal en Vercel, y lo único que la une a Shopify es **un enlace**: cuando el
cliente toca "Ir a pagar", lo mandamos a una URL de tu tienda que ya lleva los
productos dentro del carrito.

Esa URL se llama *cart permalink* y se ve así:

```
https://TU-DOMINIO-SHOPIFY/cart/50989106200828:1,50989106069756:2
```

Se lee: "una unidad de la variante 50989106200828 y dos de la 50989106069756".
Shopify recibe eso, arma el carrito y muestra el checkout con tus métodos de pago.
Los IDs ya están puestos en el código; **solo falta el dominio.**

---

## Paso 1 — Encontrar tu dominio de Shopify

En el panel de Shopify: **Configuración → Dominios**.

Ahí vas a ver dos cosas:

- **El dominio `.myshopify.com`** (algo como `mitienda.myshopify.com`). Existe
  siempre, nunca deja de funcionar y sirve perfecto para esto.
- **Tu dominio propio**, si ya lo conectaste a Shopify.

Cualquiera de los dos funciona. Si tienes dudas, usa el `.myshopify.com`: es el
que no se rompe.

---

## Paso 2 — Pegarlo en el proyecto

Dos formas, elige una:

**A. En el código** — `src/products.ts`, primera línea de la sección de checkout:

```ts
const DOMINIO_TIENDA = 'mitienda.myshopify.com';
```

**B. Sin tocar código** — en Vercel: **Settings → Environment Variables**, agrega

| Name | Value |
|---|---|
| `VITE_SHOPIFY_DOMINIO` | `mitienda.myshopify.com` |

y vuelve a desplegar. (Localmente sería un archivo `.env`, ver `.env.example`.)

No importa si lo pegas con `https://`, sin él, o con una barra al final: el código
lo normaliza y le agrega `/cart/` solo.

---

## Paso 3 — Revisar que el producto esté publicado

En Shopify, abre el producto y mira **Canales de venta**. Tiene que estar
publicado en **Tienda online**. Si no lo está, el enlace del carrito no funciona
aunque el ID sea correcto.

---

## Ojo con esto: un dominio apunta a un solo lado

Este es el punto donde la gente se traba. Tu dominio (los DNS) puede apuntar a
Vercel **o** a Shopify, no a los dos al mismo tiempo. Tienes que decidir quién se
queda con el dominio principal:

**Opción 1 — La landing se queda con el dominio (recomendada para vender con ads)**

| Quién | Dirección |
|---|---|
| Landing (Vercel) | `midominio.com` |
| Tienda y checkout (Shopify) | `tienda.midominio.com` o `mitienda.myshopify.com` |

Para el subdominio: en Shopify → Dominios → *Conectar dominio existente* →
escribes `tienda.midominio.com`, y en tu proveedor de DNS creas un registro
`CNAME` de `tienda` apuntando a `shops.myshopify.com`.

**Opción 2 — La tienda se queda con el dominio**

| Quién | Dirección |
|---|---|
| Tienda (Shopify) | `midominio.com` |
| Landing (Vercel) | `promo.midominio.com` o `oferta.midominio.com` |

Aquí el subdominio se crea en Vercel → Settings → Domains, y el `CNAME` apunta a
`cname.vercel-dns.com`.

Las dos funcionan igual de bien para el carrito. La diferencia es de marca: en la
opción 1 tus anuncios llevan al dominio limpio.

---

## Paso a paso con Hostinger (Opción 1: landing en el dominio raíz)

Este es el caso más común: el dominio se compró en Hostinger, la landing va en
`midominio.com` (Vercel) y la tienda queda en `tienda.midominio.com` (Shopify).

### A. Apuntar el dominio raíz a Vercel

1. En **Vercel** → tu proyecto → **Settings → Domains** → escribe `midominio.com`
   → **Add**.
2. Vercel te va a mostrar los registros que necesita. Normalmente son:
   - Un registro **A** para `@` (el dominio raíz) apuntando a `76.76.21.21`
   - Un registro **CNAME** para `www` apuntando a `cname.vercel-dns.com`
   - Copia exactamente lo que Vercel te muestre en pantalla, porque puede variar.
3. En **Hostinger** → hPanel → **Dominios** → selecciona tu dominio →
   **DNS / Nameservers** → **Zona DNS**.
4. Agrega los registros que copiaste de Vercel:
   - Tipo `A`, Nombre `@` (o vacío), Apunta a `76.76.21.21`, TTL por defecto.
   - Tipo `CNAME`, Nombre `www`, Apunta a `cname.vercel-dns.com`, TTL por defecto.
5. Si ya existía un registro `A` o `CNAME` para `@` o `www` (Hostinger suele traer
   uno por defecto apuntando a su propio hosting), **bórralo primero** — no
   pueden coexistir dos registros del mismo tipo para el mismo nombre.
6. Vuelve a Vercel y espera a que el estado pase de "Invalid Configuration" a
   "Valid Configuration" (puede tardar desde minutos hasta un par de horas).

### B. Conectar el subdominio de la tienda

1. En **Shopify** → **Configuración → Dominios** → **Conectar dominio existente**.
2. Escribe `tienda.midominio.com` y sigue el asistente.
3. Shopify te muestra un registro para agregar, normalmente:
   - Tipo `CNAME`, Nombre `tienda`, Apunta a `shops.myshopify.com`.
4. En **Hostinger** → la misma **Zona DNS** del paso A, agrega ese registro:
   - Tipo `CNAME`, Nombre `tienda`, Apunta a `shops.myshopify.com`, TTL por defecto.
5. Vuelve a la pantalla de Shopify y confirma/verifica. Cuando el DNS propague,
   Shopify marca el dominio como **Conectado**.

### C. Últimos ajustes

- En Hostinger, revisa que no haya quedado activado el "reenvío de dominio" ni
  ningún registro `A`/`AAAA` viejo apuntando al hosting de Hostinger — eso
  compite con lo que configuraste y causa que a veces cargue una cosa y a veces
  otra.
- La propagación de DNS puede tardar de minutos a 24-48 horas. Si algo no carga
  de inmediato, no sigas cambiando registros: espera al menos 1-2 horas antes de
  tocar algo de nuevo.

---

## Cómo saber si quedó bien

1. Abre la landing, elige un color y agrégalo al carrito.
2. Toca el botón. Debe decir **"Ir a pagar"** (si dice "Enviar pedido por
   WhatsApp", el dominio todavía no está puesto).
3. Debe abrir el carrito de Shopify **con el color y la cantidad correctos**.
   Verifica que el color que aparece en Shopify sea el que elegiste; así confirmas
   que cada ID quedó en la foto correcta.

---

## Mientras no esté configurado

El botón no se rompe: envía el pedido por WhatsApp con el detalle escrito
(cantidades, colores y total). Para que eso funcione hace falta tu número en
`src/products.ts` → `TIENDA.whatsapp`.

Es buena idea dejar el WhatsApp puesto de todas formas, incluso con el checkout
andando, porque muchos compradores en Colombia prefieren pedir por ahí.
