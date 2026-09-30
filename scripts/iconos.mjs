// Íconos de línea para las tarjetas de servicios (24x24, trazo = currentColor).
// Es la única lista: la usa build.mjs para la web, para las opciones del campo «Ícono» en /admin
// y para la hoja de muestra /admin/iconos.html. Para agregar uno nuevo basta con sumarlo aquí.
export const ICONOS = {
  casa: { nombre: 'Casa', svg: '<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>' },
  edificio: { nombre: 'Edificio / obra mayor', svg: '<path d="M4 21V5l8-2v18"/><path d="M12 8h8v13"/><path d="M7 8h2M7 12h2M7 16h2M15 12h2M15 16h2"/><path d="M2 21h20"/>' },
  quincho: { nombre: 'Quincho', svg: '<path d="M2 9 12 4l10 5"/><path d="M4 9v11M20 9v11"/><path d="M8 20v-5h8v5"/><path d="M4 13h16"/>' },
  parrilla: { nombre: 'Parrilla / asado', svg: '<path d="M4 10h16a8 8 0 0 1-16 0Z"/><path d="M8 18l-2 4M16 18l2 4"/><path d="M9 3c-1 1.5 1 2.5 0 4M13 3c-1 1.5 1 2.5 0 4"/>' },
  ampliacion: { nombre: 'Ampliación (+)', svg: '<rect x="3" y="3" width="18" height="18" rx="1"/><path d="M12 8v8M8 12h8"/>' },
  segundo_piso: { nombre: 'Segundo piso', svg: '<path d="M3 10 12 3l9 7"/><path d="M5 9v12h14V9"/><path d="M5 15h14"/><path d="M9 21v-3h3v3"/><path d="M9 12h2M14 12h2"/>' },
  remodelacion: { nombre: 'Remodelación (herramienta)', svg: '<path d="m14 6 4 4"/><path d="M3 21l3-1 11-11-2-2L4 18z"/><path d="m15 3 6 6"/>' },
  herramientas: { nombre: 'Herramientas (llave)', svg: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4Z"/>' },
  martillo: { nombre: 'Martillo', svg: '<path d="m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9"/><path d="M17.6 15 22 10.6 13.4 2 9 6.4l3 3 2-2 3.6 3.6-2 2Z"/>' },
  casco: { nombre: 'Casco de obra', svg: '<path d="M3 17h18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2Z"/><path d="M5 17v-2a7 7 0 0 1 14 0v2"/><path d="M10 8.5V6h4v2.5"/><path d="M12 6v5"/>' },
  piscina: { nombre: 'Piscina', svg: '<path d="M2 17c2 0 2-1.5 4-1.5S8 17 10 17s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5"/><path d="M2 21c2 0 2-1.5 4-1.5S8 21 10 21s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5"/><path d="M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0M8 9h8"/>' },
  techo: { nombre: 'Techo', svg: '<path d="M2 12 12 4l10 8"/><path d="M6 10v10h12V10"/><path d="M12 13v3"/><circle cx="12" cy="18.5" r=".6"/>' },
  gota: { nombre: 'Filtraciones / gasfitería', svg: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z"/><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5"/>' },
  electricidad: { nombre: 'Electricidad', svg: '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/>' },
  pintura: { nombre: 'Pintura (rodillo)', svg: '<rect x="3" y="3" width="15" height="6" rx="1"/><path d="M18 6h3v5h-9v3"/><path d="M11 14h2v7h-2z"/>' },
  ladrillo: { nombre: 'Muro / albañilería', svg: '<rect x="2" y="4" width="20" height="16" rx="1"/><path d="M2 9.3h20M2 14.6h20M8 4v5.3M16 4v5.3M12 9.3v5.3M8 14.6V20M16 14.6V20"/>' },
  radier: { nombre: 'Radier / hormigón', svg: '<path d="M2 21h20"/><path d="M4 21v-3h16v3"/><path d="M7 14h10l-2-5H9Z"/><path d="M12 9V4h3"/>' },
  fosa: { nombre: 'Fosa / excavación', svg: '<path d="M2 7h5v11h10V7h5"/><path d="M12 10v5"/><path d="m10 13 2 2 2-2"/>' },
  pala: { nombre: 'Pala / movimiento de tierra', svg: '<path d="M12 2v11"/><path d="M9 2h6"/><path d="M8 13h8v4a4 4 0 0 1-8 0Z"/>' },
  camion: { nombre: 'Camión / retiro de escombros', svg: '<path d="M2 16V6h11v10"/><path d="M13 9h4l4 4v3h-8"/><circle cx="6.5" cy="17.5" r="2"/><circle cx="16.5" cy="17.5" r="2"/>' },
  ventana: { nombre: 'Ventanas', svg: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M12 3v18M4 12h16"/>' },
  puerta: { nombre: 'Puertas', svg: '<path d="M5 21V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v17"/><path d="M3 21h18"/><circle cx="15" cy="12" r=".8"/>' },
  escalera: { nombre: 'Escaleras', svg: '<path d="M3 21h4v-4h4v-4h4V9h4V5h2"/><path d="M3 21V17"/>' },
  reja: { nombre: 'Cierres / rejas', svg: '<path d="M4 21V6l2-3 2 3v15M11 21V6l2-3 2 3v15M18 21V6l2-3 2 3v15"/><path d="M2 10h20M2 16h20"/>' },
  terraza: { nombre: 'Terraza / deck', svg: '<path d="M3 10h18"/><path d="M5 10 12 4l7 6"/><path d="M5 10v11M19 10v11"/><path d="M2 21h20"/><path d="M5 16h14"/>' },
  jardin: { nombre: 'Jardín / paisajismo', svg: '<path d="M12 22v-8"/><path d="M12 14a6 6 0 0 0 6-6V4a6 6 0 0 0-6 6 6 6 0 0 0-6-6v4a6 6 0 0 0 6 6Z"/><path d="M6 22h12"/>' },
  bano: { nombre: 'Baños', svg: '<path d="M4 12h16v2a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6Z"/><path d="M6 12V5a2 2 0 0 1 4 0"/><path d="M7 20l-1 2M17 20l1 2"/>' },
  cocina: { nombre: 'Cocinas', svg: '<rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h18"/><circle cx="8" cy="6" r=".8"/><circle cx="12" cy="6" r=".8"/><path d="M8 13h8v5H8z"/>' },
  piso: { nombre: 'Pisos / cerámica', svg: '<path d="M3 3h18v18H3z"/><path d="M3 12h18M12 3v18"/><path d="M3 7.5h9M12 16.5h9"/>' },
  plano: { nombre: 'Planos / diseño', svg: '<path d="M3 5l6-2 6 2 6-2v16l-6 2-6-2-6 2Z"/><path d="M9 3v16M15 5v16"/>' },
  container: { nombre: 'Módulos / container', svg: '<rect x="2" y="7" width="20" height="11" rx="1"/><path d="M6 7v11M10 7v11M14 7v11M18 7v11"/>' },
  foodtruck: { nombre: 'Food truck', svg: '<path d="M2 16V7h13v9"/><path d="M15 10h3l4 3v3h-7"/><path d="M5 10h7"/><circle cx="6" cy="17.5" r="2"/><circle cx="17" cy="17.5" r="2"/>' },
};

export const iconoSvg = (k) => `<svg viewBox="0 0 24 24" aria-hidden="true">${(ICONOS[k] || ICONOS.casa).svg}</svg>`;
