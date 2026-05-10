# 💍 Invitación de Boda — Bryan & Stefany
## Guía completa paso a paso

---

## 📁 ESTRUCTURA DE ARCHIVOS

```
boda/
├── index.html          ← La página principal (no tocar)
├── css/
│   ├── style.css       ← Diseño visual (no tocar)
│   └── admin.css       ← Estilos del panel (no tocar)
├── js/
│   ├── config.js       ← ✅ AQUÍ están todos los textos editables
│   └── main.js         ← Código de funciones (no tocar)
├── img/                ← ✅ AQUÍ van todas tus fotos
│   ├── hero.jpg            → Foto principal del inicio
│   ├── preboda1.jpg        → Foto junto al versículo
│   ├── preboda2.jpg        → Foto junto al lugar del evento
│   ├── preboda3.jpg        → Foto historia bloque 1
│   ├── preboda4.jpg        → Foto historia bloque 2
│   ├── preboda5.jpg        → Foto historia bloque 3
│   ├── preboda6.jpg        → Galería foto 1
│   ├── preboda7.jpg        → Galería foto 2
│   ├── preboda8.jpg        → Galería foto 3
│   ├── preboda9.jpg        → Galería foto 4
│   ├── preboda10.jpg       → Galería foto 5
│   ├── preboda11.jpg       → Galería foto 6
│   ├── preboda12.jpg       → Foto junto a confirmación
│   └── footer.jpg          → Foto del pie de página
└── INSTRUCCIONES.md    ← Este archivo
```

---

## 🚀 PARTE 1 — SUBIR A GITHUB PAGES
### (Para Bryan — solo se hace una vez)

### Paso 1 — Instalar Git
1. Ve a https://git-scm.com/downloads
2. Descarga e instala Git para Windows/Mac
3. Durante la instalación, deja todo en las opciones predeterminadas

### Paso 2 — Crear el repositorio en GitHub
1. Ve a https://github.com e inicia sesión con tu cuenta (B.colindres)
2. Haz clic en el botón verde **"New"** (arriba a la izquierda)
3. En "Repository name" escribe exactamente: `boda`
4. Selecciona **"Public"**
5. NO marques ninguna casilla adicional
6. Haz clic en **"Create repository"**

### Paso 3 — Preparar tus fotos
1. Abre la carpeta `img/` que viene en este paquete
2. Copia tus fotos de preboda ahí dentro
3. **IMPORTANTE:** Renombra cada foto exactamente así:
   - `hero.jpg` — la foto más bonita para el inicio
   - `preboda1.jpg` hasta `preboda12.jpg` — las demás en orden
   - `footer.jpg` — una foto para el fondo del pie de página
4. Si tus fotos son `.PNG` en vez de `.JPG`, puedes renombrarlas igual (solo cambia la extensión) o cambia el nombre en `config.js`

### Paso 4 — Subir los archivos a GitHub

**Opción A — Desde el navegador (más fácil, sin instalar nada):**
1. Entra a tu repositorio en GitHub: https://github.com/B.colindres/boda
2. Haz clic en **"uploading an existing file"** (o "Add file" → "Upload files")
3. Arrastra TODA la carpeta `boda` a la zona de carga
4. Espera que suban todos los archivos
5. En "Commit changes" escribe: `Subir invitación de boda`
6. Haz clic en **"Commit changes"**

**Opción B — Desde la terminal (más rápido si tienes Git instalado):**
```bash
cd boda
git init
git add .
git commit -m "Subir invitación de boda"
git branch -M main
git remote add origin https://github.com/B.colindres/boda.git
git push -u origin main
```

### Paso 5 — Activar GitHub Pages
1. En tu repositorio, haz clic en **"Settings"** (la rueda de configuración)
2. En el menú izquierdo busca **"Pages"**
3. En "Source" selecciona **"Deploy from a branch"**
4. En "Branch" selecciona **"main"** y carpeta **"/ (root)"**
5. Haz clic en **"Save"**
6. Espera 2-3 minutos
7. GitHub te mostrará la URL: `https://b.colindres.github.io/boda/`

¡Listo! Esa es la URL que compartes con tus invitados. 🎉

---

## ✏️ PARTE 2 — CÓMO EDITA STEFANY SIN TOCAR CÓDIGO
### (Instrucciones para Stefany)

Hola Stefany 💕 Aquí te explico cómo cambiar cualquier cosa de la invitación.

### Para abrir el panel de edición:
1. Abre la invitación en el navegador
2. Ve hasta el final de la página (el pie de página con los nombres)
3. Haz clic **3 veces seguidas** en la **esquina inferior derecha** de la pantalla
4. Te pedirá una contraseña → escribe: **bodadanieljissel**
5. Se abrirá el panel de edición

### Qué puedes cambiar desde el panel:
- ✅ Nombres completos de los dos
- ✅ Fecha, hora y lugar
- ✅ El versículo o frase bíblica
- ✅ Las instrucciones (vestimenta, horario, niños, etc.)
- ✅ Los párrafos de historia entre las fotos
- ✅ El texto de confirmación
- ✅ La frase del pie de página
- ✅ Los colores de toda la invitación
- ✅ Los enlaces de Maps y Waze
- ✅ El número de WhatsApp

### Cómo aplicar los cambios:
1. Cambia lo que necesites
2. Haz clic en **"✅ Aplicar y ver cambios"**
3. Los cambios se verán inmediatamente en la página
4. Si quieres que sean permanentes (que se guarden para siempre):
   - Haz clic en **"📥 Descargar config.js"**
   - Se descargará un archivo llamado `config.js`
   - Envíaselo a Bryan para que lo suba a GitHub (ver abajo)

### Para que Bryan suba el nuevo config.js:
1. Entra a https://github.com/B.colindres/boda
2. Haz clic en la carpeta `js/`
3. Haz clic en el archivo `config.js`
4. Haz clic en el ícono del lápiz ✏️ (editar)
5. Borra todo el contenido
6. Abre el `config.js` descargado con el Bloc de Notas
7. Copia todo y pégalo en GitHub
8. Haz clic en **"Commit changes"**
9. En 1-2 minutos la página se actualiza sola

---

## 📸 PARTE 3 — CAMBIAR LAS FOTOS

### Opción A — Desde GitHub (más fácil):
1. Entra a https://github.com/B.colindres/boda
2. Haz clic en la carpeta `img/`
3. Haz clic en **"Add file"** → **"Upload files"**
4. Sube tus fotos con los mismos nombres que ya existen
   (ejemplo: si quieres cambiar `preboda3.jpg`, sube una nueva foto con ese mismo nombre)
5. GitHub reemplazará automáticamente la foto anterior
6. Haz clic en **"Commit changes"**

### Opción B — Cambiar el orden de las fotos:
Si quieres que una foto aparezca en otro lugar:
1. Abre el panel de edición (3 clics + contraseña)
2. Haz clic en **"📥 Descargar config.js"**
3. Abre ese archivo con el Bloc de Notas
4. Busca la sección `"fotos":`
5. Cambia los nombres de las fotos como necesites
   Ejemplo: si quieres que `preboda5.jpg` aparezca como foto de portada, cambia `"hero": "img/preboda5.jpg"`
6. Guarda el archivo y sigue los pasos de la sección anterior para subir el `config.js`

---

## 🔑 CONTRASEÑA DEL PANEL
`bodadanieljissel`

(Puedes cambiarla editando la línea en `js/main.js` que dice: `if (pass === 'bodadanieljissel')`)

---

## ❓ PREGUNTAS FRECUENTES

**¿Los cambios del panel se pierden si recargo la página?**
Sí, los cambios del panel son solo para vista previa. Para que sean permanentes, descarga el `config.js` y súbelo a GitHub.

**¿Puedo agregar más fotos a la galería?**
Sí. Sube la foto a la carpeta `img/` en GitHub, luego edita el `config.js` y agrega el nombre al arreglo `galeria: [...]`.

**¿Funciona en celular?**
Sí, la página está diseñada 100% para celular.

**¿Es gratis?**
Sí, GitHub Pages es completamente gratis para sitios estáticos como este.

**¿Puedo usar un dominio propio como bodabryanstefany.com?**
Sí. En la sección "Pages" de GitHub Settings puedes agregar un dominio personalizado. El dominio en sí tiene un costo anual (~$10-15 USD/año).

---

## 📞 URL FINAL DEL SITIO
`https://b.colindres.github.io/boda/`

*(Disponible 2-3 minutos después de activar GitHub Pages)*
