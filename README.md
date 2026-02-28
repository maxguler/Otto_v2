# Otto Campers — React SPA

Refactorización del sitio estático Otto Campers a una SPA con React + TypeScript + Vite.

## Stack

- **React 19** + **TypeScript**
- **Vite** como bundler / dev server
- **React Router** para navegación SPA
- **CSS** global (migrado del `styles.css` original)
- **Backend:** Google Apps Script (sin cambios)

## Estructura de carpetas (monorepo por features)

```
src/
├── app/                   # Layout global y rutas
│   ├── layout/            # Header (hamburger), Footer, AppLayout
│   ├── ScrollToTop.tsx
│   └── routes.tsx
├── config/                # Variables de entorno, redes sociales
│   ├── env.ts
│   └── social.ts          # ← URLs de redes sociales y WhatsApp
├── features/
│   ├── home/              # Página principal
│   ├── vehicles/          # Flota de vehículos
│   ├── booking/           # Formulario de reserva (3 pasos)
│   │   ├── api/           # submitBooking.ts (fetch al backend)
│   │   ├── components/    # Step1, Step2, Step3
│   │   ├── config/        # Constantes, pricing, descuentos
│   │   ├── page/          # BookingPage.tsx
│   │   └── types.ts
│   ├── roadtrips/         # Rutas sugeridas con mapas
│   ├── faq/               # Preguntas frecuentes
│   └── resumen/           # Resumen post-envío
│       ├── hooks/         # useResumenFromStorage
│       └── page/          # ResumenPage.tsx
├── shared/
│   ├── hooks/             # useSEO (meta tags + JSON-LD)
│   ├── styles/            # index.css (variables, layout, responsive)
│   ├── ui/                # SocialLinks
│   └── utils/             # formatCLP
└── main.tsx, App.tsx
```

## Configurar el backend

El formulario de reserva envía los datos a una **Web App de Google Apps Script**.

1. Copia `.env.example` a `.env`
2. Reemplaza `VITE_BACKEND_URL` con la URL de tu Web App:
   ```
   VITE_BACKEND_URL=https://script.google.com/macros/s/TU_ID_AQUI/exec
   ```
3. Ver `google-apps-script/Code.gs` para el código del backend.

El contrato de la API no cambia: POST con `Content-Type: application/x-www-form-urlencoded` y body `data=<JSON>`.

## Configurar redes sociales

Editar `src/config/social.ts` y reemplazar las URLs placeholder con los perfiles reales de Otto Campers (Facebook, Instagram, TikTok, WhatsApp).

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Los archivos compilados se generan en `dist/`.

## Despliegue

La SPA genera archivos estáticos en `dist/`. Compatible con cualquier hosting de sitios estáticos.

### Vercel

1. Conecta el repositorio en [vercel.com](https://vercel.com)
2. Framework preset: **Vite**
3. Build command: `npm run build`
4. Output directory: `dist`
5. Variables de entorno: agrega `VITE_BACKEND_URL` con la URL del Apps Script

Vercel configura automáticamente las rewrites SPA (todas las rutas → `index.html`).

### Netlify

1. Conecta el repositorio en [netlify.com](https://netlify.com)
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Variables de entorno: agrega `VITE_BACKEND_URL`
5. Crea un archivo `public/_redirects` con:
   ```
   /*    /index.html   200
   ```
   Esto asegura que React Router funcione en rutas directas.

### Hosting manual (Apache / Nginx)

Sube el contenido de `dist/` al servidor. Configura una regla de rewrite para que todas las rutas no-archivo sirvan `index.html`:

**Nginx:**
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

**Apache** (`.htaccess`):
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

### cPanel (deploy automático con Playwright)

1. En `.env` define `CPANEL_URL`, `CPANEL_USER`, `CPANEL_PASSWORD` (ver `.env.example`).
2. Ejecuta:
   ```bash
   npm run deploy:cpanel
   ```
   El script hace build, crea un zip de `dist/`, abre cPanel en el navegador, inicia sesión, sube el zip a File Manager en `public_html` y lo extrae. Si tu cPanel tiene otra estructura, edita `scripts/deploy-cpanel.js` (selectores).

### Checklist pre-deploy

- [ ] Variable `VITE_BACKEND_URL` configurada en el entorno de producción
- [ ] URLs de redes sociales actualizadas en `src/config/social.ts`
- [ ] Número de WhatsApp real en `src/config/social.ts`
- [ ] Google Apps Script actualizado con `Code.gs` (incluye nuevos campos)
- [ ] Probar flujo booking completo en staging

## Rutas

| Ruta        | Página                |
|-------------|-----------------------|
| `/`         | Home                  |
| `/vehicles` | Flota de vehículos    |
| `/booking`  | Formulario de reserva |
| `/roadtrips`| Rutas sugeridas       |
| `/faq`      | Preguntas frecuentes  |
| `/resumen`  | Resumen de solicitud  |

## Query params soportados en `/booking`

- `?vehicle=escape|scout|backcountry` — preselecciona vehículo y salta a paso 2
- `?location=santiago|punta-arenas|...` — prellena lugar de retiro y devolución

## Imágenes de campers

Las fotos de los vehículos están en `public/` y actualmente son imágenes generadas por IA como placeholder. Para producción, se recomienda sustituirlas por fotos reales de las unidades.

| Archivo | Uso |
|---------|-----|
| `Otto Escape.png` | Exterior Escape (Home, Vehicles, hero) |
| `Otto Scout.png` | Exterior Scout (Home, Vehicles) |
| `Otto Backcountry.png` | Exterior Backcountry (Home, Vehicles, hero CSS) |
| `Otto-Escape-interior.png` | Interior Escape (Vehicles gallery) |
| `Otto-Scout-interior.png` | Interior Scout (Vehicles gallery) |
| `Otto-Backcountry-interior.png` | Interior Backcountry (Vehicles gallery) |

Para reemplazar: sube la foto real con el mismo nombre de archivo en `public/`. No es necesario cambiar código. Tamaño recomendado: 1600x1200px o superior, formato PNG o JPEG.

## SEO

Cada página tiene:
- `document.title` dinámico
- Meta `description` y Open Graph tags (`og:title`, `og:description`, `og:image`) vía el hook `useSEO`
- JSON-LD structured data (Organization, ItemList, FAQPage) donde aplica
- `sitemap.xml` y `robots.txt` en `public/`
