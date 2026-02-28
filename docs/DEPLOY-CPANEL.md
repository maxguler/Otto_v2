# Deploy de Otto 2.0 en cPanel — Paso a paso

Puedes subir el sitio de dos formas: **manual** (desde el Administrador de archivos de cPanel) o **automática** (script con Playwright). En ambos casos el resultado es el mismo.

---

## Antes de cualquier deploy

1. **Backend:** En la raíz del proyecto crea o edita el archivo `.env` y pon la URL real de tu Google Apps Script:
   ```
   VITE_BACKEND_URL=https://script.google.com/macros/s/TU_ID_REAL/exec
   ```
2. **Build:** En la carpeta del proyecto abre una terminal y ejecuta:
   ```bash
   npm install
   npm run build
   ```
   Se generará la carpeta `dist/` con todo el sitio listo para subir.

3. **Redes sociales (opcional):** Revisa `src/config/social.ts` y pon los enlaces y el número de WhatsApp reales antes de hacer el build.

---

## Opción A: Deploy manual (subir archivos a mano)

### Paso 1 — Entrar a cPanel

1. Entra a la URL de cPanel que te dio tu proveedor (ej. `https://tudominio.com:2083` o `https://cpanel.tudominio.com`).
2. Inicia sesión con tu usuario y contraseña de cPanel.

### Paso 2 — Abrir el Administrador de archivos

1. En la página principal de cPanel, busca la sección **“Archivos”**.
2. Haz clic en **“Administrador de archivos”** (File Manager).

### Paso 3 — Ir a la carpeta del sitio

1. En el panel izquierdo (o en la lista de carpetas) entra a **`public_html`**.
   - Si tu dominio apunta a esa carpeta, ahí debe estar el sitio.
   - Si usas un subdominio o otra carpeta, entra en la que corresponda.
2. **(Opcional)** Si ya había una web antes y quieres reemplazarla: selecciona todo el contenido de `public_html` y bórralo (o respaldalo en otra carpeta antes).

### Paso 4 — Subir el contenido de `dist/`

1. En el Administrador de archivos, haz clic en **“Cargar”** / **“Upload”**.
2. Abre en tu PC la carpeta **`dist`** del proyecto Otto 2.0 (la que se generó con `npm run build`).
3. Sube **todo lo que hay dentro** de `dist/` (no la carpeta `dist` en sí):
   - `index.html` (en la raíz de `public_html`)
   - carpeta `assets/`
   - carpeta `Logos/` (si existe)
   - imágenes (Otto Escape.png, etc.)
   - `_redirects`, `robots.txt`, `sitemap.xml` (si existen)
   - **`.htaccess`** (debe estar en la misma carpeta que `index.html`; en algunos administradores hay que activar “Mostrar archivos ocultos” para verlo).

Asegúrate de que `index.html` y `.htaccess` queden en la **raíz** de `public_html` (no dentro de una subcarpeta).

### Paso 5 — Comprobar

1. Abre en el navegador tu dominio (ej. `https://tudominio.com`).
2. Navega a varias páginas (Inicio, Vehículos, Reserva, Términos) y recarga: no debe salir error 404.
3. Prueba enviar una solicitud de reserva y revisa que llegue al Google Apps Script (Sheet o correo).

---

## Opción B: Deploy automático (script con Playwright)

El script hace el build, crea un zip de `dist/`, abre cPanel en el navegador, inicia sesión, sube el zip a `public_html` y lo extrae.

### Paso 1 — Configurar credenciales

1. En la raíz del proyecto abre (o crea) el archivo **`.env`**.
2. Añade estas tres líneas con tus datos de cPanel:
   ```
   CPANEL_URL=https://tudominio.com:2083
   CPANEL_USER=tu_usuario_cpanel
   CPANEL_PASSWORD=tu_contraseña_cpanel
   ```
   - `CPANEL_URL`: la URL con la que entras a cPanel (puede ser puerto 2083 o una URL tipo `cpanel.tudominio.com`).
   - Sustituye usuario y contraseña por los reales.
3. Guarda el archivo. **No subas `.env` a Git** (ya está en `.gitignore`).

### Paso 2 — Ejecutar el deploy

1. En la terminal, en la carpeta del proyecto, ejecuta:
   ```bash
   npm run deploy:cpanel
   ```
2. Se abrirá una ventana del navegador:
   - Iniciará sesión en cPanel.
   - Abrirá el File Manager, irá a `public_html`, subirá el zip y lo extraerá.
3. Cuando el script termine, cierra el navegador si lo desea.
4. Si tu cPanel tiene una interfaz distinta (otros nombres o botones), puede que haya que ajustar los selectores en `scripts/deploy-cpanel.js` (ahí se indica qué hace cada paso).

### Paso 3 — Comprobar

Igual que en la Opción A: abre tu dominio, prueba las rutas y el formulario de reserva.

---

## Resumen rápido

| Qué hacer | Comando / acción |
|-----------|-------------------|
| Generar el sitio | `npm run build` (crea `dist/`) |
| Deploy manual | Subir **contenido** de `dist/` a `public_html` en cPanel (File Manager → Upload). |
| Deploy automático | Poner `CPANEL_URL`, `CPANEL_USER`, `CPANEL_PASSWORD` en `.env` y ejecutar `npm run deploy:cpanel`. |
| Que no falte | `index.html` y `.htaccess` en la raíz de `public_html`. |

---

## Si algo falla

- **404 al recargar una ruta:** Falta o no se aplica el `.htaccess`. Comprueba que está en la misma carpeta que `index.html` y que el servidor permite `RewriteEngine`.
- **El formulario no envía:** Revisa que en el `.env` con el que hiciste el build tengas la `VITE_BACKEND_URL` correcta y vuelve a ejecutar `npm run build` antes de subir.
- **Script de deploy no encuentra botones:** La interfaz de cPanel cambia según el host. Edita `scripts/deploy-cpanel.js` y adapta los textos o selectores (File Manager, Upload, Extract, etc.) a lo que veas en tu pantalla.
