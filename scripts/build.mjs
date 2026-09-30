// Arma la web para publicar. Vercel lo ejecuta en cada cambio (ver vercel.json).
//  1. Lee sitio.config.json (lo define el desarrollador) y data/*.json (lo edita el cliente en /admin):
//     ajustes, servicios, proyectos, proceso y testimonios
//  2. Optimiza las fotos a WebP (dist/img/_opt) y escribe las tarjetas dentro del HTML (para Google)
//  3. Reemplaza los %%MARCADORES%% y bloques <!-- SI:CLAVE -->, y genera canonical, Open Graph,
//     datos estructurados, robots.txt y sitemap.xml
// Uso local: node scripts/build.mjs  →  servir la carpeta dist/
import { readdirSync, readFileSync, writeFileSync, rmSync, mkdirSync, cpSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DATA = join(ROOT, 'data');
const DIST = join(ROOT, 'dist');

const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));
const readData = (file) => {
  if (!existsSync(join(DATA, file))) return {};
  try { return readJson(join(DATA, file)); } catch (e) { console.warn(`⚠️  data/${file} dañado, se usan valores por defecto: ${e.message}`); return {}; }
};

// Se vacía dist/ por dentro (en Windows la carpeta puede estar abierta por el servidor local o una terminal)
mkdirSync(DIST, { recursive: true });
for (const f of readdirSync(DIST)) rmSync(join(DIST, f), { recursive: true, force: true });
mkdirSync(join(DIST, 'data'), { recursive: true });

// ---------- Fotos livianas ----------
// Copia WebP del ancho justo en dist/img/_opt/, con hash del contenido en el nombre:
// el navegador la guarda en caché y una foto reemplazada en /admin se ve al tiro.
// Si sharp no está instalado, se usan las originales.
let sharp = null;
try { sharp = (await import('sharp')).default; } catch { console.warn('⚠️  sharp no está instalado (npm install): se usan las fotos originales'); }
const OPT = 'img/_opt';
const optimizadas = new Map();
function optimizar(src, ancho) {
  const path = String(src || '').replace(/^\//, '');
  if (!sharp || !/\.(jpe?g|png|webp)$/i.test(path) || !existsSync(join(ROOT, path))) return Promise.resolve(path);
  const key = `${path}@${ancho}`;
  if (!optimizadas.has(key)) {
    optimizadas.set(key, (async () => {
      try {
        const buf = readFileSync(join(ROOT, path));
        const out = `${OPT}/${createHash('sha1').update(buf).digest('hex').slice(0, 12)}-${ancho}.webp`;
        mkdirSync(join(DIST, OPT), { recursive: true });
        await sharp(buf).rotate().resize({ width: ancho, withoutEnlargement: true }).webp({ quality: 76 }).toFile(join(DIST, out));
        return out;
      } catch (e) {
        console.warn(`⚠️  No se pudo optimizar ${path}: ${e.message}`);
        return path;
      }
    })());
  }
  return optimizadas.get(key);
}

const config = readJson(join(ROOT, 'sitio.config.json'));
const ajustes = readData('ajustes.json');
const procesoData = readData('proceso.json');
const testimoniosData = readData('testimonios.json');

// Manda el dominio propio de site_url; si todavía es un .vercel.app, se usa el dominio de producción de Vercel
const propio = config.site_url && !/\.vercel\.app/.test(config.site_url);
const SITE = (!propio && process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : config.site_url || 'http://localhost:5610').replace(/\/$/, '');

// ---------- 1. Datos ----------
const str = (v) => (v === undefined || v === null ? '' : String(v).trim());
const rel = (path) => str(path).replace(/^\//, '');
const num = (v, def) => (v !== '' && v !== null && Number.isFinite(Number(v)) ? Number(v) : def);
const lista = (v) => (Array.isArray(v) ? v.map(str).filter(Boolean) : []);

const T = {
  nombre: str(config.nombre),
  marca_a: str(config.marca_a) || str(config.nombre),
  marca_b: str(config.marca_b),
  lema: str(config.lema),
  rubro: str(config.rubro),
  whatsapp: str(ajustes.whatsapp).replace(/\D/g, ''),
  mensaje: str(ajustes.mensaje_whatsapp) || 'Hola! Quiero cotizar un proyecto.',
  instagram: str(ajustes.instagram).replace(/^@/, ''),
  email: str(ajustes.email),
  ciudad: str(ajustes.ciudad),
  region: str(ajustes.region),
  horario: str(ajustes.horario),
  zonas: lista(ajustes.zonas),
  clientes: lista(ajustes.clientes),
};

const faltan = ['nombre', 'whatsapp', 'ciudad'].filter((k) => !T[k]);
if (faltan.length) throw new Error(`Faltan datos obligatorios: ${faltan.join(', ')} (sitio.config.json / data/ajustes.json)`);
if (!/^\d{10,15}$/.test(T.whatsapp) || (T.whatsapp.startsWith('56') && !/^569\d{8}$/.test(T.whatsapp))) {
  throw new Error(`WhatsApp inválido "${T.whatsapp}": usa formato internacional; en Chile son 11 dígitos, ej 56912345678`);
}
const wa = (texto) => `https://api.whatsapp.com/send?phone=${T.whatsapp}&text=${encodeURIComponent(texto)}`;

function readFolder(folder) {
  const dir = join(DATA, folder);
  let files = [];
  try { files = readdirSync(dir).filter((f) => f.endsWith('.json')); } catch { return []; }
  const items = [];
  for (const file of files) {
    try {
      items.push({ id: basename(file, '.json'), ...readJson(join(dir, file)) });
    } catch (e) {
      // Un archivo dañado no debe botar la web: se omite y se avisa en el log
      console.warn(`⚠️  Se omitió ${folder}/${file}: ${e.message}`);
    }
  }
  return items;
}
const byOrder = (a, b) => a.orden - b.orden || a.nombre.localeCompare(b.nombre, 'es');
const conNombre = (x) => x.visible !== false && typeof x.nombre === 'string' && x.nombre.trim();

const servicios = readFolder('servicios').filter(conNombre).map((s) => ({
  id: s.id,
  nombre: s.nombre.trim(),
  texto: str(s.texto),
  palabra: str(s.palabra) || s.nombre.trim().toUpperCase(),
  icono: str(s.icono) || 'casa',
  orden: num(s.orden, 1000),
})).sort(byOrder);

// Tipos de proyecto (data/tipos, editables en /admin): son los filtros de la galería
const tipos = readFolder('tipos').filter(conNombre).map((t) => ({
  id: t.id,
  nombre: t.nombre.trim(),
  orden: num(t.orden, 1000),
})).sort(byOrder);
const normTipo = (s) => str(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
// El proyecto guarda el identificador del tipo; también se acepta el nombre (datos antiguos o escritos a mano)
function tipoDe(p) {
  const v = str(p.tipo) || str(p.categoria);
  const t = tipos.find((x) => x.id === v) || tipos.find((x) => normTipo(x.nombre) === normTipo(v));
  if (t) return t;
  console.warn(`⚠️  Proyecto «${str(p.nombre)}»: el tipo «${v || '(vacío)'}» no existe o está oculto, se muestra como «Proyectos»`);
  return { id: 'otros', nombre: 'Proyectos', orden: 9999 };
}

const proyectos = readFolder('proyectos').filter(conNombre).map((p) => ({
  id: p.id,
  nombre: p.nombre.trim(),
  lugar: str(p.lugar),
  tipo: tipoDe(p),
  anio: str(p.anio),
  descripcion: str(p.descripcion),
  portada: rel(p.portada) || 'img/logo.jpg',
  fotos: lista(p.fotos).map(rel),
  destacado: p.destacado === true,
  orden: num(p.orden, 1000),
})).sort((a, b) => (b.destacado - a.destacado) || byOrder(a, b));

// Tarjetas con foto chica; la galería usa una versión grande (1600 px)
await Promise.all(proyectos.map(async (p, i) => {
  p.mini = await optimizar(p.portada, i === 0 ? 1400 : 800);
  p.galeria = await Promise.all([p.portada, ...p.fotos].map((f) => optimizar(f, 1600)));
}));

const etapas = (Array.isArray(procesoData.etapas) ? procesoData.etapas : [])
  .map((e) => ({ titulo: str(e && e.titulo), texto: str(e && e.texto) })).filter((e) => e.titulo);
const testimonios = (Array.isArray(testimoniosData.testimonios) ? testimoniosData.testimonios : [])
  .map((t) => ({ texto: str(t && t.texto), nombre: str(t && t.nombre), detalle: str(t && t.detalle) })).filter((t) => t.texto && t.nombre);
const cifras = (Array.isArray(ajustes.cifras) ? ajustes.cifras : [])
  .map((c) => ({ numero: Math.max(0, Math.round(num(c && c.numero, 0))), prefijo: str(c && c.prefijo), sufijo: str(c && c.sufijo), texto: str(c && c.texto) }))
  .filter((c) => c.texto).slice(0, 4);

// Filtros: solo los tipos que tienen al menos un proyecto visible, en el orden elegido en /admin
const usados = new Map(proyectos.map((p) => [p.tipo.id, p.tipo]));
const categorias = [...usados.values()].sort(byOrder);
console.log(`✅ datos: ${servicios.length} servicios, ${tipos.length} tipos, ${proyectos.length} proyectos, ${etapas.length} etapas, ${testimonios.length} testimonios`);

// ---------- 2. HTML de las secciones ----------
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const abs = (path) => `${SITE}/${String(path).replace(/^\//, '')}`;
const pad = (n) => String(n).padStart(2, '0');
const miles = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

// Íconos de línea (24x24, trazo = currentColor)
const ICONOS = {
  casa: '<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  quincho: '<path d="M2 9 12 4l10 5"/><path d="M4 9v11M20 9v11"/><path d="M8 20v-5h8v5"/><path d="M4 13h16"/>',
  ampliacion: '<rect x="3" y="3" width="18" height="18" rx="1"/><path d="M12 8v8M8 12h8"/>',
  remodelacion: '<path d="m14 6 4 4"/><path d="M3 21l3-1 11-11-2-2L4 18z"/><path d="m15 3 6 6"/>',
  piscina: '<path d="M2 17c2 0 2-1.5 4-1.5S8 17 10 17s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5"/><path d="M2 21c2 0 2-1.5 4-1.5S8 21 10 21s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5"/><path d="M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0M8 9h8"/>',
  techo: '<path d="M2 12 12 4l10 8"/><path d="M6 10v10h12V10"/><path d="M12 13v3"/><circle cx="12" cy="18.5" r=".6"/>',
};
const icono = (k) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONOS[k] || ICONOS.casa}</svg>`;
const flecha = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

const servicioHtml = (s, i) => `
        <article class="svc${i === 0 ? ' is-on' : ''}" data-reveal style="--d:${i * 70}ms">
          <div class="svc__top"><span class="svc__num">${pad(i + 1)}</span><span class="svc__ico">${icono(s.icono)}</span></div>
          <h3>${esc(s.nombre)}</h3>
          <p>${esc(s.texto)}</p>
          <a class="svc__link" target="_blank" rel="noopener" href="${esc(wa(`Hola GADB 👋 Quiero cotizar: *${s.palabra}*`))}">Cotizar ${esc(s.nombre.toLowerCase())} ${flecha}</a>
        </article>`;

const proyectoHtml = (p, i) => `
        <article class="prj${i === 0 ? ' is-big' : ''}${i >= 6 ? ' is-extra' : ''}" data-cat="${esc(p.tipo.id)}" data-reveal>
          <button type="button" class="prj__btn" data-proyecto="${esc(p.id)}" aria-label="Ver fotos de ${esc(p.nombre)}">
            <img src="${esc(p.mini)}" alt="${esc(`${p.nombre} · ${p.lugar}`)}" loading="${i < 3 ? 'eager' : 'lazy'}" decoding="async">
            <span class="prj__tag">${esc(p.tipo.nombre)}${p.anio ? ` · ${esc(p.anio)}` : ''}</span>
            ${p.galeria.length > 1 ? `<span class="prj__count">${p.galeria.length} fotos</span>` : ''}
            <span class="prj__info">
              <strong>${esc(p.nombre)}</strong>
              <small>${esc(p.lugar)}</small>
            </span>
            <span class="prj__go">${flecha}</span>
          </button>
        </article>`;

const etapaHtml = (e, i) => `
          <li data-reveal style="--d:${i * 80}ms"><span class="step__n">${pad(i + 1)}</span><div><strong>${esc(e.titulo)}</strong><p>${esc(e.texto)}</p></div></li>`;

const cifraHtml = (c) => `
        <div class="stat"><strong><span>${esc(c.prefijo)}</span><span data-count="${c.numero}">${miles(c.numero)}</span><span>${esc(c.sufijo)}</span></strong><p>${esc(c.texto)}</p></div>`;

const testimonioHtml = (t, i) => `
        <figure class="quote" data-reveal style="--d:${i * 80}ms">
          <div class="quote__stars" aria-label="5 estrellas">★★★★★</div>
          <blockquote>“${esc(t.texto)}”</blockquote>
          <figcaption><strong>${esc(t.nombre)}</strong>${t.detalle ? `<span>${esc(t.detalle)}</span>` : ''}</figcaption>
        </figure>`;

const filtrosHtml = [{ id: '*', nombre: 'Todos' }, ...categorias].map((c, i) =>
  `<button type="button" class="chip${i === 0 ? ' is-on' : ''}" data-filtro="${esc(c.id)}">${esc(c.nombre)}</button>`).join('');

// ---------- 3. Marcadores ----------
const colores = config.colores || {};
const fuentes = config.fuentes || {};
const FUENTE_TITULOS = fuentes.titulos || 'Barlow Condensed';
const FUENTE_TEXTO = fuentes.texto || 'Barlow';
const fuenteParam = (f, pesos) => `family=${encodeURIComponent(f).replace(/%20/g, '+')}:wght@${pesos}`;
const heroFoto = rel(ajustes.hero_foto) || (proyectos[0] && proyectos[0].portada) || 'img/logo.jpg';
const PROCESO_FOTO = await optimizar(rel(procesoData.foto) || heroFoto, 900);
const SEO_TITULO = str(config.seo_titulo) || `${T.nombre} · ${T.rubro} en ${T.ciudad}`;
const SEO_DESCRIPCION = str(config.seo_descripcion) || str(ajustes.hero_bajada);

const VARS = {
  NOMBRE: T.nombre, MARCA_A: T.marca_a, MARCA_B: T.marca_b, LEMA: T.lema, RUBRO: T.rubro,
  SEO_TITULO, SEO_DESCRIPCION,
  CIUDAD: T.ciudad, REGION: T.region, HORARIO: T.horario, EMAIL: T.email, INSTAGRAM: T.instagram,
  ZONAS_TEXTO: T.zonas.join(' · '),
  WA_LINK: wa(T.mensaje), WA_NUMERO: `+${T.whatsapp.slice(0, 2)} ${T.whatsapp.slice(2, 3)} ${T.whatsapp.slice(3, 7)} ${T.whatsapp.slice(7)}`,
  HERO_EYEBROW: str(ajustes.hero_eyebrow), HERO_TITULO: str(ajustes.hero_titulo), HERO_DESTACADO: str(ajustes.hero_destacado),
  HERO_BAJADA: str(ajustes.hero_bajada),
  HERO_FOTO: await optimizar(heroFoto, 1600), HERO_FOTO_MOVIL: await optimizar(heroFoto, 800),
  HERO_FOTO_TITULO: str(ajustes.hero_foto_titulo), HERO_FOTO_LUGAR: str(ajustes.hero_foto_lugar),
  PROCESO_TITULO: str(procesoData.titulo) || 'Nuestro proceso', PROCESO_BAJADA: str(procesoData.bajada), PROCESO_FOTO,
  N_PROYECTOS: String(proyectos.length), MAS_PROYECTOS: proyectos.length > 6 ? '1' : '',
  TESTIMONIOS: testimonios.length ? '1' : '', CLIENTES: T.clientes.length ? '1' : '',
  FUENTES_URL: `https://fonts.googleapis.com/css2?${fuenteParam(FUENTE_TITULOS, '500;600;700;800')}&${fuenteParam(FUENTE_TEXTO, '400;500;600;700')}&display=swap`,
  FUENTE_TITULOS, FUENTE_TEXTO,
  GITHUB_REPO: str(config.github_repo), SITE_URL: `${SITE}/`, ANIO: String(new Date().getFullYear()),
  COLOR_ACENTO: colores.acento, COLOR_ACENTO_OSCURO: colores.acento_oscuro, COLOR_TINTA: colores.tinta,
  COLOR_GRAFITO: colores.grafito, COLOR_FONDO: colores.fondo, COLOR_PAPEL: colores.papel, COLOR_LINEA: colores.linea,
  // Solo lo que necesita el navegador (app.js)
  SITIO_JSON: JSON.stringify({
    whatsapp: T.whatsapp,
    proyectos: Object.fromEntries(proyectos.map((p) => [p.id, { n: p.nombre, l: p.lugar, d: p.descripcion, f: p.galeria }])),
  }).replace(/</g, '\\u003c'),
};

// Bloques opcionales: <!-- SI:CLAVE --> ... <!-- /SI:CLAVE --> se eliminan si CLAVE está vacía
function render(text, file, escape) {
  let out = text;
  for (let prev; prev !== out;) {
    prev = out;
    out = out.replace(/<!-- SI:([A-Z0-9_]+) -->([\s\S]*?)<!-- \/SI:\1 -->/g, (m, key, body) => (str(VARS[key]) ? body : ''));
  }
  const missing = new Set();
  out = out.replace(/%%([A-Z0-9_]+)%%/g, (m, key) => {
    const v = VARS[key];
    if (v === undefined || v === null || (v === '' && key.startsWith('COLOR_'))) { missing.add(key); return m; }
    return escape && key !== 'SITIO_JSON' ? esc(v) : String(v);
  });
  if (missing.size) throw new Error(`${file}: faltan valores para ${[...missing].join(', ')}`);
  return out;
}

// ---------- 4. SEO ----------
const OG_IMAGE = abs(heroFoto);
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': str(config.schema_tipo) || 'GeneralContractor',
  '@id': `${SITE}/#empresa`,
  name: T.nombre,
  slogan: T.lema || undefined,
  description: SEO_DESCRIPCION,
  url: `${SITE}/`,
  logo: abs('img/logo.jpg'),
  image: [OG_IMAGE, ...proyectos.slice(0, 4).map((p) => abs(p.portada))],
  email: T.email || undefined,
  telephone: `+${T.whatsapp}`,
  areaServed: T.zonas.map((name) => ({ '@type': 'Place', name })),
  address: { '@type': 'PostalAddress', addressLocality: T.ciudad, addressRegion: T.region || undefined, addressCountry: 'CL' },
  sameAs: T.instagram ? [`https://www.instagram.com/${T.instagram}/`] : undefined,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios',
    itemListElement: servicios.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.nombre, description: s.texto } })),
  },
};

const head = `<link rel="canonical" href="${SITE}/">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${esc(T.nombre)}">
  <meta property="og:locale" content="es_CL">
  <meta property="og:url" content="${SITE}/">
  <meta property="og:title" content="${esc(SEO_TITULO)}">
  <meta property="og:description" content="${esc(SEO_DESCRIPCION)}">
  <meta property="og:image" content="${OG_IMAGE}">
  <meta name="twitter:card" content="summary_large_image">${config.google_verificacion
    ? `\n  <meta name="google-site-verification" content="${esc(config.google_verificacion)}">` : ''}
  <script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`;

// ---------- 5. dist/ ----------
const BLOQUES = {
  '<!-- SERVICIOS -->': servicios.map(servicioHtml).join(''),
  '<!-- PROYECTOS -->': proyectos.map(proyectoHtml).join(''),
  '<!-- FILTROS -->': filtrosHtml,
  '<!-- NAV_TIPOS -->': categorias.map((c) => `
            <a href="#proyectos" data-tipo="${esc(c.id)}">${esc(c.nombre)}</a>`).join(''),
  '<!-- ETAPAS -->': etapas.map(etapaHtml).join(''),
  '<!-- CIFRAS -->': cifras.map(cifraHtml).join(''),
  '<!-- TESTIMONIOS -->': testimonios.map(testimonioHtml).join(''),
  '<!-- CLIENTES -->': [...T.clientes, ...T.clientes].map((c) => `<span>${esc(c)}</span>`).join(''),
  '<!-- ZONAS -->': T.zonas.map((z) => `<option>${esc(z)}</option>`).join(''),
  '<!-- TIPOS -->': servicios.map((s) => `<option>${esc(s.nombre)}</option>`).join(''),
};
let html = readFileSync(join(ROOT, 'index.html'), 'utf8');
for (const marker of ['<!-- SEO:HEAD', ...Object.keys(BLOQUES)]) {
  if (!html.includes(marker)) throw new Error(`Falta el marcador ${marker} en index.html`);
}
html = render(html, 'index.html', true).replace(/<!-- SEO:HEAD[^>]*-->/, head);
for (const [marker, contenido] of Object.entries(BLOQUES)) html = html.replaceAll(marker, contenido);

cpSync(join(ROOT, 'img'), join(DIST, 'img'), { recursive: true });
cpSync(join(ROOT, 'admin'), join(DIST, 'admin'), { recursive: true });
// styles.css y app.js llevan ?v=hash: se guardan en caché y cada cambio publicado se descarga de nuevo
const css = render(readFileSync(join(ROOT, 'styles.css'), 'utf8'), 'styles.css', false);
const js = render(readFileSync(join(ROOT, 'app.js'), 'utf8'), 'app.js', false);
const version = (text) => createHash('sha1').update(text).digest('hex').slice(0, 10);
html = html
  .replace('href="styles.css"', `href="styles.css?v=${version(css)}"`)
  .replace('src="app.js"', `src="app.js?v=${version(js)}"`);
writeFileSync(join(DIST, 'index.html'), html);
writeFileSync(join(DIST, 'styles.css'), css);
writeFileSync(join(DIST, 'app.js'), js);
writeFileSync(join(DIST, 'admin', 'config.yml'), render(readFileSync(join(ROOT, 'admin', 'config.yml'), 'utf8'), 'admin/config.yml', false));

writeFileSync(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: ${SITE}/sitemap.xml\n`);
writeFileSync(join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE}/</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod></url>
</urlset>
`);

if (!existsSync(join(ROOT, 'img', 'logo.jpg'))) console.warn('⚠️  Falta img/logo.jpg (logo)');
console.log(`✅ sitio listo en dist/ para ${SITE}`);
