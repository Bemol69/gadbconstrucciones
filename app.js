// GADB Construcciones · menú, revelados, contadores, filtros de proyectos, galería y formulario a WhatsApp.
// El HTML ya trae todo el contenido (lo escribe scripts/build.mjs); este archivo solo agrega interacción.
(() => {
  const SITIO = JSON.parse(document.getElementById('sitio-data').textContent);
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wa = (texto) => `https://api.whatsapp.com/send?phone=${SITIO.whatsapp}&text=${encodeURIComponent(texto)}`;

  // ---------- Menú: vidrio al bajar + menú móvil ----------
  const nav = $('#nav');
  const burger = $('.nav__burger');
  const menu = $('#menu');
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      nav.classList.toggle('is-scrolled', scrollY > 10);
      parallax();
      ticking = false;
    });
  };
  addEventListener('scroll', onScroll, { passive: true });
  const cerrarMenu = () => { menu.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false'); };
  burger.addEventListener('click', () => {
    const open = !menu.classList.contains('is-open');
    menu.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
  });
  $$('a', menu).forEach((a) => a.addEventListener('click', cerrarMenu));
  addEventListener('keydown', (e) => { if (e.key === 'Escape') cerrarMenu(); });

  // Sección activa en el menú
  const links = new Map($$(':scope > a[href^="#"], .nav__drop > a', menu).map((a) => [a.getAttribute('href').slice(1), a]));
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((a) => a.classList.remove('is-active'));
      const a = links.get(en.target.id);
      if (a) a.classList.add('is-active');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  links.forEach((a, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });

  // ---------- Revelados en cascada ----------
  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); reveal.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  $$('[data-reveal]').forEach((el) => reveal.observe(el));

  // ---------- Contadores (el HTML ya trae el número final) ----------
  const contar = (el) => {
    const fin = Number(el.dataset.count) || 0;
    if (quieto || !fin) return;
    const t0 = performance.now();
    const dur = 1400;
    const paso = (t) => {
      const k = Math.min(1, (t - t0) / dur);
      el.textContent = Math.round(fin * (1 - Math.pow(1 - k, 3))).toLocaleString('es-CL');
      if (k < 1) requestAnimationFrame(paso);
    };
    el.textContent = '0';
    requestAnimationFrame(paso);
  };
  const cuenta = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { contar(en.target); cuenta.unobserve(en.target); } });
  }, { threshold: 0.6 });
  $$('[data-count]').forEach((el) => cuenta.observe(el));

  // ---------- Parallax suave de la foto del proceso ----------
  const pFoto = $('.process__photo > img');
  function parallax() {
    if (!pFoto || quieto) return;
    const r = pFoto.parentElement.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    const k = (r.top + r.height / 2 - innerHeight / 2) / innerHeight; // -1 … 1
    pFoto.style.transform = `translate3d(0, ${(-8 - k * 8).toFixed(2)}%, 0)`;
  }
  parallax();

  // ---------- Servicios: en pantallas táctiles la tarjeta tocada queda activa ----------
  const svcs = $$('.svc');
  svcs.forEach((s) => s.addEventListener('mouseenter', () => svcs.forEach((x) => x.classList.toggle('is-on', x === s))));

  // ---------- Proyectos: filtros + ver todos ----------
  const grid = $('#prj-grid');
  const cards = $$('.prj', grid);
  const mas = $('#prj-mas');
  let todos = false;
  let filtro = '*';
  const pintar = () => {
    let visibles = 0;
    cards.forEach((c) => {
      const ok = filtro === '*' || c.dataset.cat === filtro;
      c.classList.toggle('is-hidden', !ok);
      // con filtro se muestran todos los de esa categoría; sin filtro, los 6 primeros hasta tocar «ver todos»
      c.classList.toggle('is-shown', ok && (todos || filtro !== '*'));
      c.classList.remove('is-big');
      if (ok) {
        if (visibles === 0 && filtro === '*') c.classList.add('is-big');
        visibles++;
        c.classList.add('is-in');
      }
    });
    if (mas) mas.hidden = todos || filtro !== '*';
  };
  const filtrar = (id) => {
    filtro = id;
    $$('.chip').forEach((x) => x.classList.toggle('is-on', x.dataset.filtro === id));
    pintar();
  };
  $$('.chip').forEach((b) => b.addEventListener('click', () => filtrar(b.dataset.filtro)));

  // Menú: «Proyectos» despliega los tipos; cada uno baja a la galería ya filtrada
  const drop = $('.nav__drop');
  if (drop) {
    const toggle = $('.nav__drop-btn', drop);
    const abrirDrop = (open) => { drop.classList.toggle('is-open', open); toggle.setAttribute('aria-expanded', String(open)); };
    toggle.addEventListener('click', (e) => { e.stopPropagation(); abrirDrop(!drop.classList.contains('is-open')); });
    document.addEventListener('click', (e) => { if (!drop.contains(e.target)) abrirDrop(false); });
    addEventListener('keydown', (e) => { if (e.key === 'Escape') abrirDrop(false); });
    $$('[data-tipo]', drop).forEach((l) => l.addEventListener('click', () => abrirDrop(false)));
  }
  // Cualquier link con data-tipo (menú o «Ver N proyectos» de un servicio) baja a la galería ya filtrada
  $$('[data-tipo]').forEach((l) => l.addEventListener('click', () => filtrar(l.dataset.tipo)));
  if (mas) mas.addEventListener('click', () => { todos = true; pintar(); });

  // ---------- Galería ----------
  const lb = $('#lb');
  const lbImg = $('#lb-img');
  let actual = null;
  let idx = 0;
  // La foto se oculta hasta que la nueva termina de cargar: así nunca se ve la del proyecto anterior
  const precargadas = new Set();
  const precargar = (src) => { if (src && !precargadas.has(src)) { precargadas.add(src); new Image().src = src; } };
  let turno = 0;
  // En pantallas chicas se usan las fotos de 1000 px (mucho más livianas)
  const fotos = () => (innerWidth <= 900 && actual.m ? actual.m : actual.f);
  const mostrar = (i) => {
    const f = fotos();
    idx = (i + f.length) % f.length;
    const src = f[idx];
    const mio = ++turno;
    lbImg.classList.add('is-loading');
    const listo = () => { if (mio === turno) lbImg.classList.remove('is-loading'); };
    lbImg.onload = listo;
    lbImg.onerror = listo;
    lbImg.src = src;
    if (lbImg.complete && lbImg.naturalWidth) listo();
    precargar(f[(idx + 1) % f.length]);
    precargar(f[(idx - 1 + f.length) % f.length]);
    lbImg.alt = `${actual.n} · foto ${idx + 1} de ${f.length}`;
    $('#lb-count').textContent = `${idx + 1} / ${f.length}`;
    $$('#lb-thumbs button').forEach((b, j) => b.classList.toggle('is-on', j === idx));
    const nav1 = f.length > 1;
    $$('.lb__nav', lb).forEach((b) => { b.hidden = !nav1; });
    $('#lb-count').hidden = !nav1;
  };
  const abrir = (id) => {
    actual = SITIO.proyectos[id];
    if (!actual) return;
    $('#lb-title').textContent = actual.n;
    $('#lb-place').textContent = actual.l;
    $('#lb-desc').textContent = actual.d;
    $('#lb-wa').href = wa(`Hola GADB 👋 Vi el proyecto *${actual.n}* en su web y quiero cotizar algo parecido.`);
    const th = $('#lb-thumbs');
    th.innerHTML = '';
    if (actual.f.length > 1) {
      actual.f.forEach((src, j) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', `Ver foto ${j + 1}`);
        b.innerHTML = `<img src="${(actual.t && actual.t[j]) || src}" alt="" width="120" height="120">`;
        b.addEventListener('click', () => mostrar(j));
        th.appendChild(b);
      });
    }
    mostrar(0);
    if (typeof lb.showModal === 'function') lb.showModal(); else lb.setAttribute('open', '');
    document.body.style.overflow = 'hidden';
  };
  const cerrar = () => { if (lb.open) lb.close(); };
  lb.addEventListener('close', () => {
    document.body.style.overflow = '';
    turno++;
    lbImg.removeAttribute('src'); // al abrir otro proyecto se parte sin foto
    lbImg.classList.add('is-loading');
  });
  $$('[data-proyecto]').forEach((b) => b.addEventListener('click', () => abrir(b.dataset.proyecto)));
  $$('[data-step]', lb).forEach((b) => b.addEventListener('click', () => mostrar(idx + Number(b.dataset.step))));
  $('[data-close]', lb).addEventListener('click', cerrar);
  lb.addEventListener('click', (e) => { if (e.target === lb) cerrar(); });
  lb.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') mostrar(idx + 1);
    if (e.key === 'ArrowLeft') mostrar(idx - 1);
  });
  // deslizar con el dedo
  let x0 = null;
  lbImg.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  lbImg.addEventListener('touchend', (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) mostrar(idx + (dx < 0 ? 1 : -1));
    x0 = null;
  }, { passive: true });

  // ---------- Formulario → mensaje armado en WhatsApp ----------
  const form = $('#form');
  const err = $('#form-error');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    const req = ['nombre', 'tipo', 'comuna'];
    let bad = false;
    req.forEach((k) => {
      const ok = String(d[k] || '').trim() !== '';
      form.elements[k].setAttribute('aria-invalid', String(!ok));
      if (!ok) bad = true;
    });
    err.hidden = !bad;
    if (bad) { form.elements[req.find((k) => !String(d[k] || '').trim())].focus(); return; }
    const t = (v) => String(v || '').trim();
    const lineas = [
      'Hola GADB Construcciones 👋 Quiero cotizar un proyecto.',
      '',
      `🏗️ *Proyecto:* ${t(d.tipo)}`,
      `📍 *Comuna:* ${t(d.comuna)}`,
      t(d.medidas) ? `📐 *Medidas aprox.:* ${t(d.medidas)}` : null,
      t(d.mensaje) ? `📝 *Idea:* ${t(d.mensaje)}` : null,
      '',
      `Mi nombre es ${t(d.nombre)}.`,
    ].filter((l) => l !== null); // los campos opcionales vacíos no se envían
    window.open(wa(lineas.join('\n').replace(/\n{3,}/g, '\n\n')), '_blank', 'noopener');
  });
  $$('input, select, textarea', form).forEach((el) => el.addEventListener('input', () => el.removeAttribute('aria-invalid')));
})();
