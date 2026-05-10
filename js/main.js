// ═══════════════════════════════════════════════════════
//  MAIN.JS — Boda Bryan & Stefany
// ═══════════════════════════════════════════════════════

const C = window.BODA_CONFIG;

// ── Aplicar config al DOM ─────────────────────────────
function applyConfig() {
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  const setHref = (id, url) => { const el = document.getElementById(id); if (el) el.href = url; };
  const setSrc  = (id, src) => { const el = document.getElementById(id); if (el && src) { el.src = src; el.onerror = () => el.parentElement.style.display='none'; } };

  // Nombres
  set('novioNombre', C.novio.nombre);
  set('noviaNombre', C.novia.nombre);
  set('heroApellidos', C.novio.apellidos + ' · ' + C.novia.apellidos);
  set('footerNovio', C.novio.nombre.split(' ')[0]);
  set('footerNovia', C.novia.nombre.split(' ')[0]);

  // Evento
  set('eventDate', C.evento.fechaTexto);
  set('eventTime', C.evento.hora);
  set('eventVenue', C.evento.lugar);
  set('venueName',  C.evento.lugar);
  setHref('mapsBtn', C.evento.mapsUrl);
  setHref('wazeBtn', C.evento.wazeUrl);

  // WhatsApp
  const waUrl = `https://wa.me/${C.whatsapp.numero}?text=${encodeURIComponent(C.whatsapp.mensaje)}`;
  setHref('whatsappBtn', waUrl);

  // Versículo
  const bq = document.getElementById('verseText');
  if (bq) bq.textContent = C.versiculo.texto;
  set('verseCite', C.versiculo.cita);

  // Instrucciones
  const grid = document.getElementById('instructionsGrid');
  if (grid) {
    grid.innerHTML = '';
    C.instrucciones.forEach(instr => {
      grid.innerHTML += `
        <div class="instr-card reveal">
          <div class="instr-card__icon">${instr.icono}</div>
          <h3>${instr.titulo}</h3>
          <p>${instr.texto}</p>
        </div>`;
    });
  }

  // Historia textos
  const storyIds = ['story1Text','story2Text','story3Text'];
  C.historiaTextos.forEach((t, i) => { set(storyIds[i], t); });

  // RSVP
  set('rsvpDescription', C.rsvp.descripcion);

  // Footer
  set('footerPhrase', C.footer.frase);

  // Hero
  set('heroPre', C.hero.pre);

  // Fotos
  const f = C.fotos;
  setSrc('heroPhoto',   f.hero);
  setSrc('versePhoto',  f.verso);
  setSrc('eventPhoto',  f.evento);
  setSrc('rsvpPhoto',   f.rsvp);
  setSrc('footerPhoto', f.footer);

  // Historia fotos
  const histPhotos = document.querySelectorAll('.story-block__image img');
  const histKeys = ['historia1','historia2','historia3'];
  histPhotos.forEach((img, i) => {
    if (f[histKeys[i]]) {
      img.src = f[histKeys[i]];
      img.onerror = () => img.parentElement.parentElement.style.display='none';
    }
  });

  // Galería
  const gallGrid = document.getElementById('galleryGrid');
  if (gallGrid && f.galeria) {
    gallGrid.innerHTML = '';
    f.galeria.forEach((src, i) => {
      gallGrid.innerHTML += `
        <div class="gallery-item reveal" data-index="${i}">
          <img src="${src}" alt="Preboda ${i+1}" onerror="this.parentElement.style.display='none'" />
        </div>`;
    });
  }

  // Colores CSS
  const root = document.documentElement.style;
  root.setProperty('--rose-deep', C.colores.roseProfundo);
  root.setProperty('--rose-mid',  C.colores.roseMedio);
  root.setProperty('--rose-soft', C.colores.roseSuave);
  root.setProperty('--blush',     C.colores.blush);
  root.setProperty('--cream',     C.colores.crema);
}

// ── Countdown ─────────────────────────────────────────
function startCountdown() {
  const target = new Date(C.evento.fecha).getTime();
  function tick() {
    const now  = Date.now();
    const diff = target - now;
    if (diff <= 0) {
      document.getElementById('countdownLabel').textContent = '¡Es hoy! 🌹';
      ['cd-days','cd-hours','cd-mins','cd-secs'].forEach(id => {
        const el = document.getElementById(id); if (el) el.textContent = '00';
      });
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const pad = n => String(n).padStart(2,'0');
    document.getElementById('cd-days').textContent  = pad(d);
    document.getElementById('cd-hours').textContent = pad(h);
    document.getElementById('cd-mins').textContent  = pad(m);
    document.getElementById('cd-secs').textContent  = pad(s);
  }
  tick();
  setInterval(tick, 1000);
}

// ── Scroll Reveal ─────────────────────────────────────
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    .forEach(el => observer.observe(el));
}

// ── Lightbox ──────────────────────────────────────────
let lightboxImages = [];
let lightboxIndex  = 0;

function openLightbox(src, index) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  lightboxIndex = index;
  img.src = src;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
function navLightbox(dir) {
  lightboxIndex = (lightboxIndex + dir + lightboxImages.length) % lightboxImages.length;
  document.getElementById('lightboxImg').src = lightboxImages[lightboxIndex];
}

function initLightbox() {
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  document.getElementById('lightboxPrev').addEventListener('click', () => navLightbox(-1));
  document.getElementById('lightboxNext').addEventListener('click', () => navLightbox(1));
  document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target === document.getElementById('lightbox')) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft')  navLightbox(-1);
    if (e.key === 'ArrowRight') navLightbox(1);
  });
  document.getElementById('galleryGrid').addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (!item) return;
    lightboxImages = Array.from(document.querySelectorAll('.gallery-grid .gallery-item img')).map(i => i.src);
    openLightbox(e.target.closest('.gallery-item').querySelector('img').src, parseInt(item.dataset.index));
  });
}

// ── Admin Trigger (doble clic esquina inferior derecha) ─
let adminClicks = 0;
let adminTimer;
document.getElementById('adminTrigger').addEventListener('click', () => {
  adminClicks++;
  clearTimeout(adminTimer);
  adminTimer = setTimeout(() => adminClicks = 0, 800);
  if (adminClicks >= 3) { adminClicks = 0; openAdminLogin(); }
});

// ── PANEL DE ADMINISTRACIÓN ───────────────────────────
function openAdminLogin() {
  const overlay = createOverlay();
  overlay.innerHTML = `
    <div class="adm-modal" style="max-width:380px">
      <h2 style="font-family:var(--font-display);font-size:1.8rem;color:var(--rose-deep);margin-bottom:.5rem">Panel de edición</h2>
      <p style="font-size:.85rem;color:var(--text-light);margin-bottom:1.5rem">Ingresa la contraseña para continuar</p>
      <input type="password" id="adminPass" placeholder="Contraseña" style="${inputStyle}" />
      <div style="display:flex;gap:.75rem;margin-top:1.25rem">
        <button onclick="checkAdminPass()" style="${btnStyle('var(--rose-deep)','white')}">Entrar</button>
        <button onclick="closeOverlay()" style="${btnStyle('transparent','var(--rose-deep)','1.5px solid var(--rose-deep)')}">Cancelar</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  document.getElementById('adminPass').addEventListener('keydown', e => { if(e.key==='Enter') checkAdminPass(); });
  setTimeout(() => overlay.style.opacity='1', 10);
}

window.checkAdminPass = function() {
  const pass = document.getElementById('adminPass').value;
  if (pass === 'bodadanieljissel') {
    closeOverlay();
    openAdminPanel();
  } else {
    document.getElementById('adminPass').style.borderColor = '#e55';
    document.getElementById('adminPass').value = '';
    document.getElementById('adminPass').placeholder = 'Contraseña incorrecta';
  }
};

function openAdminPanel() {
  const overlay = createOverlay();
  const cfg = window.BODA_CONFIG;

  overlay.innerHTML = `
  <div class="adm-modal" style="max-width:680px;max-height:90vh;overflow-y:auto">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2rem;position:sticky;top:0;background:white;padding:.5rem 0;z-index:1">
      <h2 style="font-family:var(--font-display);font-size:2rem;color:var(--rose-deep)">✏️ Editar invitación</h2>
      <button onclick="closeOverlay()" style="background:none;border:none;font-size:1.5rem;cursor:pointer;color:var(--text-light)">✕</button>
    </div>

    ${admSection('👫 Nombres', `
      ${admField('Nombre del novio',  'adm_novioNombre',    cfg.novio.nombre)}
      ${admField('Apellidos del novio','adm_novioApellidos', cfg.novio.apellidos)}
      ${admField('Nombre de la novia','adm_noviaNombre',    cfg.novia.nombre)}
      ${admField('Apellidos de la novia','adm_noviaApellidos',cfg.novia.apellidos)}
    `)}

    ${admSection('📅 Evento', `
      ${admField('Fecha (para el contador) — formato: YYYY-MM-DDTHH:MM:SS','adm_fecha', cfg.evento.fecha)}
      ${admField('Fecha en texto (ej: Sábado, 03 de octubre de 2026)','adm_fechaTexto', cfg.evento.fechaTexto)}
      ${admField('Hora (ej: 11:00 AM)','adm_hora', cfg.evento.hora)}
      ${admField('Nombre del lugar','adm_lugar', cfg.evento.lugar)}
      ${admField('Enlace Google Maps','adm_maps', cfg.evento.mapsUrl)}
      ${admField('Enlace Waze','adm_waze', cfg.evento.wazeUrl)}
    `)}

    ${admSection('💬 WhatsApp', `
      ${admField('Número (sin + ni espacios, ej: 50431626792)','adm_waNum', cfg.whatsapp.numero)}
      ${admField('Mensaje inicial','adm_waMsj', cfg.whatsapp.mensaje)}
    `)}

    ${admSection('📖 Versículo', `
      ${admField('Texto del versículo','adm_versText', cfg.versiculo.texto)}
      ${admField('Cita (ej: — 1 Corintios 13:4)','adm_versCita', cfg.versiculo.cita)}
    `)}

    ${admSection('📝 Instrucciones', `
      ${cfg.instrucciones.map((instr, i) => `
        <div style="border:1px solid var(--blush);border-radius:12px;padding:1rem;margin-bottom:.75rem">
          <p style="font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;color:var(--rose-mid);margin-bottom:.5rem">Tarjeta ${i+1} — ${instr.icono}</p>
          ${admField('Título', `adm_iTitle${i}`, instr.titulo)}
          ${admField('Texto',  `adm_iText${i}`,  instr.texto)}
        </div>
      `).join('')}
    `)}

    ${admSection('📸 Historia (textos con fotos)', `
      ${cfg.historiaTextos.map((t, i) => admField(`Párrafo ${i+1}`, `adm_histText${i}`, t)).join('')}
    `)}

    ${admSection('💌 Confirmación', `
      ${admField('Texto de descripción','adm_rsvpDesc', cfg.rsvp.descripcion)}
    `)}

    ${admSection('🌸 Frase final (pie de página)', `
      ${admField('Frase','adm_footerFrase', cfg.footer.frase)}
    `)}

    ${admSection('🎨 Colores', `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem">
        ${admColor('Rosa profundo (títulos, botones)','adm_c1', cfg.colores.roseProfundo)}
        ${admColor('Rosa medio','adm_c2', cfg.colores.roseMedio)}
        ${admColor('Rosa suave','adm_c3', cfg.colores.roseSuave)}
        ${admColor('Blush','adm_c4', cfg.colores.blush)}
        ${admColor('Crema (fondos)','adm_c5', cfg.colores.crema)}
      </div>
    `)}

    <div style="display:flex;gap:1rem;margin-top:2rem;flex-wrap:wrap">
      <button onclick="applyAdminChanges()" style="${btnStyle('var(--rose-deep)','white')}">✅ Aplicar y ver cambios</button>
      <button onclick="exportConfig()" style="${btnStyle('white','var(--rose-deep)','1.5px solid var(--rose-deep)')}">📥 Descargar config.js</button>
      <button onclick="closeOverlay()" style="background:none;border:none;color:var(--text-light);cursor:pointer;font-size:.85rem">Cancelar</button>
    </div>
    <p style="font-size:.72rem;color:var(--text-light);margin-top:1rem;line-height:1.6">
      <strong>Tip:</strong> Después de aplicar los cambios los verás en la página al instante.<br>
      Para que sean permanentes, descarga el archivo <code>config.js</code> y reemplázalo en GitHub.
    </p>
  </div>`;

  document.body.appendChild(overlay);
  setTimeout(() => overlay.style.opacity='1', 10);
}

// ── Helpers del admin ─────────────────────────────────
const inputStyle = `width:100%;padding:.65rem .9rem;border:1.5px solid var(--blush);border-radius:10px;font-family:var(--font-body);font-size:.88rem;color:var(--text-dark);outline:none;transition:border .2s;box-sizing:border-box`;
const btnStyle = (bg, color, border='none') =>
  `padding:.7rem 1.5rem;background:${bg};color:${color};border:${border};border-radius:50px;font-family:var(--font-body);font-size:.8rem;letter-spacing:.08em;cursor:pointer;transition:all .2s;white-space:nowrap`;

function admSection(title, content) {
  return `<div style="margin-bottom:2rem">
    <h3 style="font-family:var(--font-display);font-size:1.2rem;color:var(--rose-deep);margin-bottom:1rem;padding-bottom:.5rem;border-bottom:1px solid var(--blush)">${title}</h3>
    ${content}
  </div>`;
}
function admField(label, id, value) {
  return `<div style="margin-bottom:.75rem">
    <label style="font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;color:var(--text-light);display:block;margin-bottom:.3rem">${label}</label>
    <input type="text" id="${id}" value="${escHtml(value)}" style="${inputStyle}" />
  </div>`;
}
function admColor(label, id, value) {
  return `<div>
    <label style="font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;color:var(--text-light);display:block;margin-bottom:.3rem">${label}</label>
    <div style="display:flex;align-items:center;gap:.5rem">
      <input type="color" id="${id}" value="${value}" style="width:2.5rem;height:2.5rem;border:none;padding:0;cursor:pointer;border-radius:8px" />
      <input type="text" id="${id}_txt" value="${value}" style="${inputStyle};flex:1" oninput="document.getElementById('${id}').value=this.value" />
    </div>
  </div>`;
}
function escHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ── Aplicar cambios desde el panel ────────────────────
window.applyAdminChanges = function() {
  const get = id => { const el = document.getElementById(id); return el ? el.value : ''; };

  C.novio.nombre        = get('adm_novioNombre');
  C.novio.apellidos     = get('adm_novioApellidos');
  C.novia.nombre        = get('adm_noviaNombre');
  C.novia.apellidos     = get('adm_noviaApellidos');

  C.evento.fecha        = get('adm_fecha');
  C.evento.fechaTexto   = get('adm_fechaTexto');
  C.evento.hora         = get('adm_hora');
  C.evento.lugar        = get('adm_lugar');
  C.evento.mapsUrl      = get('adm_maps');
  C.evento.wazeUrl      = get('adm_waze');

  C.whatsapp.numero     = get('adm_waNum');
  C.whatsapp.mensaje    = get('adm_waMsj');

  C.versiculo.texto     = get('adm_versText');
  C.versiculo.cita      = get('adm_versCita');

  C.instrucciones = C.instrucciones.map((instr, i) => ({
    ...instr,
    titulo: get(`adm_iTitle${i}`),
    texto:  get(`adm_iText${i}`)
  }));

  C.historiaTextos = C.historiaTextos.map((_, i) => get(`adm_histText${i}`));

  C.rsvp.descripcion    = get('adm_rsvpDesc');
  C.footer.frase        = get('adm_footerFrase');

  C.colores.roseProfundo = get('adm_c1_txt') || get('adm_c1');
  C.colores.roseMedio    = get('adm_c2_txt') || get('adm_c2');
  C.colores.roseSuave    = get('adm_c3_txt') || get('adm_c3');
  C.colores.blush        = get('adm_c4_txt') || get('adm_c4');
  C.colores.crema        = get('adm_c5_txt') || get('adm_c5');

  closeOverlay();
  applyConfig();
  initReveal();
  startCountdown();

  // Toast de confirmación
  const toast = document.createElement('div');
  toast.style.cssText = `position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);background:var(--rose-deep);color:white;padding:.85rem 2rem;border-radius:50px;font-family:var(--font-body);font-size:.85rem;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,.2);animation:fadeUp .4s both`;
  toast.textContent = '✅ Cambios aplicados. Descarga config.js para hacerlos permanentes.';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
};

// ── Exportar config.js ────────────────────────────────
window.exportConfig = function() {
  const cfg = window.BODA_CONFIG;
  const content = `// ═══════════════════════════════════════════════════════
//  ARCHIVO DE CONFIGURACIÓN — BODA BRYAN & STEFANY
// ═══════════════════════════════════════════════════════

window.BODA_CONFIG = ${JSON.stringify(cfg, null, 2)};
`;
  const blob = new Blob([content], { type: 'text/javascript' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'config.js';
  a.click();
  URL.revokeObjectURL(url);
};

// ── Overlay helper ────────────────────────────────────
function createOverlay() {
  closeOverlay();
  const overlay = document.createElement('div');
  overlay.id = 'adm-overlay';
  overlay.style.cssText = `
    position:fixed;inset:0;background:rgba(20,10,10,.6);backdrop-filter:blur(6px);
    z-index:2000;display:flex;align-items:center;justify-content:center;
    padding:1rem;opacity:0;transition:opacity .3s
  `;
  // Estilos del modal interno
  const style = document.createElement('style');
  style.textContent = `.adm-modal{background:white;border-radius:24px;padding:2.5rem;width:100%;box-shadow:0 20px 60px rgba(0,0,0,.25);}`;
  overlay.appendChild(style);
  return overlay;
}
window.closeOverlay = function() {
  const el = document.getElementById('adm-overlay');
  if (el) { el.style.opacity='0'; setTimeout(() => el.remove(), 300); }
};

// ── Init ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyConfig();
  startCountdown();
  setTimeout(initReveal, 50);
  initLightbox();
});
