/* ============================================================
   BENJI HOLIDAY — main.js
   Partial-Loader ({{ROOT}}-Token) · Mikro-Animationen ·
   mailto-Formulare · Click-to-Load-Spotify · Auto-Hide-Header
   CSP-konform: kein Inline-JS, keine Inline-Handler.
   ============================================================ */

/* JS-Flag sofort setzen: Reveal-Inhalte werden nur bei aktivem JS versteckt.
   Fällt JS aus (oder blockt), bleibt der gesamte Inhalt sichtbar. */
document.documentElement.classList.add('js');

/* ---- {{ROOT}}-Tiefenauflösung (portabel: github.io/repo/ ODER Domain-Root) ---- */
function getRootPrefix() {
  const parts = window.location.pathname.split('/').filter(Boolean);
  // letzter Teil ist die HTML-Datei (oder leer bei /) → Tiefe = parts-1
  const isFile = /\.[a-z0-9]+$/i.test(parts[parts.length - 1] || '');
  const depth = Math.max(0, parts.length - (isFile ? 1 : 0));
  // Bei Verzeichnis-URL (endet auf /) zeigt depth auf den Ordner selbst.
  // Wir wollen relativ zur aktuellen HTML-Datei: identisch, da index.html implizit.
  return '../'.repeat(isFile ? depth : depth);
}
function resolveRootToken(s) { return (s || '').replace(/\{\{ROOT\}\}/g, getRootPrefix()); }

async function loadIncludes() {
  const targets = document.querySelectorAll('[data-include]');
  for (const el of targets) {
    let url = el.getAttribute('data-include');
    if (!url) continue;
    url = resolveRootToken(url);
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      el.innerHTML = resolveRootToken(await res.text());
    } catch (e) {
      console.error('Include fehlgeschlagen:', url, e);
    }
  }
}

/* ---- Burger ---- */
function initBurger() {
  const btn = document.querySelector('[data-burger]');
  const menu = document.querySelector('[data-mobile-menu]');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    const isHidden = menu.hasAttribute('hidden');
    if (isHidden) menu.removeAttribute('hidden'); else menu.setAttribute('hidden', '');
    btn.setAttribute('aria-expanded', String(isHidden));
    btn.setAttribute('aria-label', isHidden ? 'Menü schließen' : 'Menü öffnen');
  });
  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) { menu.setAttribute('hidden', ''); btn.setAttribute('aria-expanded', 'false'); }
  });
}

/* ---- Aktiven Nav-Link markieren (aria-current → CSS-Unterstrich) ---- */
function highlightActiveNav() {
  let path = window.location.pathname.split('/').pop() || 'index.html';
  if (path === '') path = 'index.html';
  const dir = window.location.pathname.split('/').slice(-2, -1)[0] || '';
  document.querySelectorAll('.nav-links a, [data-mobile-menu] a').forEach(a => {
    const href = a.getAttribute('href'); if (!href) return;
    const target = href.split('/').pop().split('#')[0];
    const inDjSection = dir === 'dj' && href.includes('dj.html');
    if (target === path || inDjSection) a.setAttribute('aria-current', 'page');
  });
}

/* ---- Auto-Hide-Header ---- */
function initHeaderAutoHide() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  header.style.transition = 'transform .32s cubic-bezier(.2,.8,.2,1)';
  let lastY = window.pageYOffset, ticking = false;
  function update() {
    const y = window.pageYOffset;
    const h = header.offsetHeight || 0;
    const menuOpen = document.querySelector('[data-mobile-menu]:not([hidden])');
    if (y > lastY && y > h && !menuOpen) header.style.transform = 'translateY(-100%)';
    else header.style.transform = 'translateY(0)';
    lastY = y; ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
}

/* ---- Scroll-Reveals (Sonnenaufgang) + Stagger + Arch-Clip ---- */
function initReveals() {
  const els = document.querySelectorAll('.reveal, [data-stagger], .arch-clip');
  if (!('IntersectionObserver' in window) || !els.length) {
    els.forEach(el => el.classList.add('in')); return;
  }
  // Stagger-Indizes setzen
  document.querySelectorAll('[data-stagger]').forEach(grid => {
    [...grid.children].forEach((c, i) => c.style.setProperty('--i', i));
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .16, rootMargin: '0px 0px -8% 0px' });
  els.forEach(el => {
    if (el.classList.contains('arch-clip')) {
      // Voll geclippte Elemente melden in Chromium ratio 0 → Elternelement als Proxy beobachten
      const proxy = el.parentElement || el;
      const pio = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { el.classList.add('in'); pio.disconnect(); } });
      }, { threshold: .16, rootMargin: '0px 0px -8% 0px' });
      pio.observe(proxy);
    } else {
      io.observe(el);
    }
  });
}

/* ---- Marquee (Track duplizieren für nahtlosen Loop) ---- */
function initMarquee() {
  document.querySelectorAll('.marquee-track').forEach(track => {
    if (track.dataset.dup) return;
    track.dataset.dup = '1';
    track.innerHTML += track.innerHTML;
  });
}

/* ---- Jahr im Footer ---- */
function setYear() {
  const y = new Date().getFullYear();
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = y);
}

/* ---- Magnetische Buttons (dezent, nur Zeiger + keine reduced-motion) ---- */
function initMagnetic() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(pointer: fine)').matches) return;
  document.querySelectorAll('[data-magnetic]').forEach(btn => {
    btn.addEventListener('pointermove', (e) => {
      const r = btn.getBoundingClientRect();
      const mx = e.clientX - r.left - r.width / 2;
      const my = e.clientY - r.top - r.height / 2;
      btn.style.transform = 'translate(' + mx * .18 + 'px,' + my * .22 + 'px)';
    });
    btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
  });
}

/* ---- mailto-Formulare (vorausgefüllte E-Mail) ---- */
function initForms() {
  document.querySelectorAll('form[data-mailto]').forEach(form => {
    const status = form.querySelector('[data-form-status]');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let ok = true;
      form.querySelectorAll('[required]').forEach(inp => {
        const field = inp.closest('.field');
        const valid = inp.value.trim() !== '' && (inp.type !== 'email' || /.+@.+\..+/.test(inp.value));
        if (field) field.classList.toggle('invalid', !valid);
        if (!valid && ok) { inp.focus(); ok = false; }
      });
      if (!ok) { if (status) { status.textContent = 'Bitte fülle die markierten Felder korrekt aus.'; status.style.color = 'var(--glut-tief)'; } return; }

      const to = form.getAttribute('data-mailto');
      const subject = form.getAttribute('data-subject') || 'Anfrage über benjiholiday.com';
      const lines = [];
      form.querySelectorAll('[name]').forEach(inp => {
        const label = inp.getAttribute('data-label') || inp.getAttribute('name');
        let val = inp.value.trim();
        if (inp.tagName === 'SELECT' && inp.selectedOptions[0]) val = inp.selectedOptions[0].textContent.trim();
        if (val) lines.push(label + ': ' + val);
      });
      const intro = form.getAttribute('data-intro') || 'Hallo Benji,';
      const body = intro + '\n\n' + lines.join('\n') + '\n\nViele Grüße';
      const href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      window.location.href = href;
      if (status) { status.textContent = 'Dein E-Mail-Programm öffnet sich mit der fertigen Anfrage. Falls nicht, schreib direkt an ' + to + '.'; status.style.color = 'var(--espresso)'; }
    });
    // Live-Validierung: invalid entfernen sobald korrigiert
    form.querySelectorAll('[required]').forEach(inp => {
      inp.addEventListener('input', () => { const f = inp.closest('.field'); if (f) f.classList.remove('invalid'); });
    });
  });
}

/* ---- Click-to-Load Spotify (DSGVO: iframe erst nach Klick) ---- */
function initSpotify() {
  document.querySelectorAll('[data-spotify]').forEach(box => {
    const btn = box.querySelector('[data-spotify-load]');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const src = box.getAttribute('data-spotify');
      const iframe = document.createElement('iframe');
      iframe.setAttribute('src', src);
      iframe.setAttribute('width', '100%');
      iframe.setAttribute('height', box.getAttribute('data-height') || '352');
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('loading', 'lazy');
      iframe.setAttribute('allow', 'encrypted-media; clipboard-write; fullscreen; picture-in-picture');
      iframe.style.borderRadius = '16px';
      iframe.title = 'Spotify Player';
      box.replaceChildren(iframe);
    });
  });
}

/* ---- Gigs (partials/gigs.html): Datum formatieren, Vergangenes ausblenden ---- */
function initGigs() {
  const list = document.querySelector('[data-gigs]');
  if (!list) return;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const gigs = [];
  list.querySelectorAll('.gig').forEach(gig => {
    const t = gig.querySelector('time[datetime]');
    const m = t && /^(\d{4})-(\d{2})-(\d{2})$/.exec(t.getAttribute('datetime').trim());
    if (!m) return; // ungültiges Datum: Zeile bleibt mit Rohwert sichtbar
    const d = new Date(+m[1], +m[2] - 1, +m[3]);
    if (d < today) { gig.remove(); return; }
    t.textContent = m[3] + '.' + m[2] + '.' + (+m[1] !== today.getFullYear() ? m[1] : '');
    gigs.push([d, gig]);
  });
  gigs.sort((a, b) => a[0] - b[0]).forEach(([, gig]) => list.appendChild(gig));
  const empty = document.querySelector('[data-gigs-empty]');
  if (empty) empty.hidden = list.querySelector('.gig') !== null;
}

/* ---- Init ---- */
(async () => {
  await loadIncludes();
  initGigs();
  initBurger();
  highlightActiveNav();
  initHeaderAutoHide();
  initReveals();
  initMarquee();
  initMagnetic();
  initForms();
  initSpotify();
  setYear();
})();
