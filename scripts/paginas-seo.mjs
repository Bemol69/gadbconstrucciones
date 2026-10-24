// Páginas de posicionamiento local (SEO). Las arma scripts/build.mjs con la plantilla pagina.html.
// Las define el desarrollador: cada una apunta a lo que la gente busca en Google
// («construcciones La Serena», «quinchos Coquimbo», «ampliaciones La Serena»…) con contenido propio.
// Regla: nada de precios, plazos ni datos que el cliente no haya confirmado.
//
//  slug        → URL: /<slug>/
//  proyectos   → qué obras mostrar: { lugar: /regex/i } o { tipos: ['quinchos'] } (ids de data/servicios)
//  servicios   → ids de data/servicios que se listan en la página
//  wa          → mensaje de WhatsApp de los botones de la página
//  relacionadas→ otras páginas a las que se enlaza (enlazado interno)

export const PAGINAS = [
  {
    slug: 'construcciones-la-serena',
    corto: 'Construcciones en La Serena',
    title: 'Construcciones en La Serena | Constructora GADB',
    description: 'Constructora en La Serena: casas, quinchos, ampliaciones, remodelaciones y piscinas con equipo propio. Visita a terreno y cotización sin compromiso.',
    eyebrow: 'Empresa constructora · La Serena',
    h1: 'Construcciones en', h1Destacado: 'La Serena.',
    lead: 'GADB Construcciones construye, amplía y remodela casas, quinchos y espacios exteriores en La Serena. Equipo propio, presupuesto por escrito y avances por WhatsApp en cada etapa de la obra.',
    foto: 'img/proyectos/mediterraneo-1.jpg',
    fotoAlt: 'Casa mediterránea de dos pisos construida por GADB en El Arrayán Costero, La Serena',
    proyectos: { lugar: /la serena/i },
    servicios: ['casas', 'quinchos', 'ampliaciones', 'remodelaciones', 'piscinas', 'techos'],
    wa: 'Hola, buenas 👋 Vi su página web y estoy buscando una constructora en La Serena. ¿Me podrían orientar con una cotización?',
    secciones: [
      {
        h2: 'Construir en La Serena: lo que conviene saber',
        parrafos: [
          'La Serena tiene un clima templado y soleado casi todo el año, ideal para vivir al aire libre: por eso en la ciudad se piden tanto los quinchos, las terrazas y las piscinas. Pero también pide decisiones técnicas distintas a las de otras zonas del país.',
          'Cerca del borde costero la humedad y el salitre desgastan antes los materiales: fierros, revestimientos, pinturas y maderas. Por eso en cada presupuesto conversamos contigo qué materiales y terminaciones conviene usar según el sector donde está tu terreno, y no solo cuál sale más barato.',
          'Trabajamos en sectores de La Serena como El Arrayán, La Florida, Las Compañías, Cuatro Esquinas y el borde costero, tanto en sitios con casa existente (ampliaciones y remodelaciones) como en terrenos para construir desde cero.',
        ],
      },
      {
        h2: 'Cómo trabajamos tu obra en La Serena',
        parrafos: [
          'Partimos con una conversación y una visita a terreno sin costo: tomamos medidas, vemos el estado del sitio y escuchamos qué necesitas. Después te entregamos un presupuesto con partidas, materiales y plazos por escrito, para que sepas qué estás contratando.',
          'La obra la ejecuta nuestro equipo propio y te mandamos avances con fotos por WhatsApp. Al final revisamos cada detalle contigo antes de la entrega.',
        ],
      },
    ],
    faq: [
      { q: '¿Hacen visita a terreno en La Serena?', a: 'Sí. Vamos a tu casa o terreno en La Serena, tomamos medidas y conversamos el proyecto sin costo ni compromiso. Escríbenos por WhatsApp para coordinar el día.' },
      { q: '¿Qué tipo de obras hacen en La Serena?', a: 'Construcción de casas, quinchos, ampliaciones, remodelaciones interiores y exteriores, piscinas, terrazas, reparación de techos y mantención general.' },
      { q: '¿Trabajan con equipo propio o subcontratan?', a: 'La mano de obra es propia: el mismo equipo que te visita y cotiza es el que ejecuta la obra, lo que nos permite controlar la calidad y los plazos.' },
      { q: '¿Cómo puedo cotizar mi proyecto?', a: 'Por WhatsApp al +56 9 4159 4862 o con el formulario de la página. Cuéntanos qué quieres hacer, en qué sector de La Serena estás y las medidas aproximadas; te respondemos con los siguientes pasos.' },
      { q: '¿Atienden también fuera de La Serena?', a: 'Sí: trabajamos en toda la conurbación La Serena–Coquimbo, en La Herradura, Guanaqueros, Tongoy y el Valle del Elqui.' },
    ],
    relacionadas: ['construcciones-coquimbo', 'construccion-de-casas-la-serena-coquimbo', 'quinchos-la-serena-coquimbo', 'ampliaciones-remodelaciones-la-serena-coquimbo'],
  },
  {
    slug: 'construcciones-coquimbo',
    corto: 'Construcciones en Coquimbo',
    title: 'Construcciones en Coquimbo | Constructora GADB',
    description: 'Constructora en Coquimbo, La Herradura, Guanaqueros y Tongoy: casas, quinchos, ampliaciones y remodelaciones con equipo propio. Cotiza sin compromiso.',
    eyebrow: 'Empresa constructora · Coquimbo',
    h1: 'Construcciones en', h1Destacado: 'Coquimbo.',
    lead: 'Somos una empresa constructora de Coquimbo. Construimos casas, quinchos, ampliaciones y remodelaciones en Coquimbo, La Herradura, Guanaqueros y Tongoy, con equipo propio y un presupuesto claro desde el primer día.',
    foto: 'img/proyectos/IMG_1279.webp',
    fotoAlt: 'Casa sobre pilotes con vista al mar construida por GADB en La Herradura, Coquimbo',
    proyectos: { lugar: /coquimbo|herradura|guanaqueros|tongoy|punta mira/i },
    servicios: ['casas', 'quinchos', 'ampliaciones', 'remodelaciones', 'obras-mayores', 'piscinas'],
    wa: 'Hola, buenas 👋 Vi su página web y estoy buscando una constructora en Coquimbo. ¿Me podrían orientar con una cotización?',
    secciones: [
      {
        h2: 'Una constructora de Coquimbo para obras en toda la comuna',
        parrafos: [
          'Nuestra base está en Coquimbo y conocemos bien cómo se construye acá: terrenos en pendiente, casas con vista al mar, sectores de playa y condominios en crecimiento. Trabajamos en Coquimbo y en los sectores de la comuna como Peñuelas, Tierras Blancas, Guayacán, Punta Mira, La Herradura, Guanaqueros y Tongoy.',
          'Entre nuestras obras hay una casa sobre pilotes con vista al mar en La Herradura, una remodelación y ampliación en Punta Mira, módulos container habilitados en Coquimbo y las losas del resort Rosa Agustina en Guanaqueros. También construimos 60 casas en condominio para Inmobiliaria Kupal.',
        ],
      },
      {
        h2: 'Construcción cerca del mar: materiales y terminaciones',
        parrafos: [
          'En la costa de Coquimbo el viento, la humedad y el salitre ponen a prueba cualquier obra. Antes de cotizar vemos el sitio y te proponemos estructura, revestimientos y terminaciones pensadas para durar en ese ambiente, y te explicamos por qué.',
          'Si tu terreno tiene pendiente o vista al mar, conversamos desde el inicio la mejor forma de aprovecharlo: fundaciones, terrazas, orientación y accesos.',
        ],
      },
      {
        h2: 'Para particulares, empresas e inmobiliarias',
        parrafos: [
          'Atendemos desde una remodelación de baño o un quincho para tu patio hasta obras de mayor tamaño para empresas e inmobiliarias. En todos los casos el trabajo parte con una visita a terreno y un presupuesto por escrito.',
        ],
      },
    ],
    faq: [
      { q: '¿Dónde están ubicados?', a: 'Somos una empresa de Coquimbo, Región de Coquimbo. Trabajamos en Coquimbo, La Serena, La Herradura, Guanaqueros, Tongoy y el Valle del Elqui.' },
      { q: '¿Construyen casas en La Herradura, Guanaqueros y Tongoy?', a: 'Sí. Hemos construido una casa sobre pilotes con vista al mar en La Herradura y obras en Guanaqueros. Si tu terreno está en la costa, evaluamos el sitio en una visita sin costo.' },
      { q: '¿Cuánto demora una obra en Coquimbo?', a: 'Depende de los metros cuadrados, el tipo de obra y las terminaciones. Después de la visita a terreno te entregamos un presupuesto por escrito con partidas, materiales y plazos.' },
      { q: '¿Hacen obras para empresas e inmobiliarias?', a: 'Sí. Hemos trabajado para Inmobiliaria Kupal (60 casas en condominio), Rosa Agustina Resort, Recamin y otros clientes. Cuéntanos tu proyecto y vemos cómo abordarlo.' },
      { q: '¿Cómo cotizo una construcción en Coquimbo?', a: 'Escríbenos por WhatsApp al +56 9 4159 4862 o usa el formulario de la página: tipo de proyecto, sector y medidas aproximadas. Te respondemos con los siguientes pasos.' },
    ],
    relacionadas: ['construcciones-la-serena', 'construccion-de-casas-la-serena-coquimbo', 'quinchos-la-serena-coquimbo', 'ampliaciones-remodelaciones-la-serena-coquimbo'],
  },
  {
    slug: 'construccion-de-casas-la-serena-coquimbo',
    corto: 'Construcción de casas',
    title: 'Construcción de casas en La Serena y Coquimbo | GADB',
    description: 'Construimos tu casa en La Serena, Coquimbo y la costa: obra gruesa, estructura y terminaciones. Estilo moderno, mediterráneo o modular. Cotiza gratis.',
    eyebrow: 'Casas · La Serena y Coquimbo',
    h1: 'Construcción de casas en', h1Destacado: 'La Serena y Coquimbo.',
    lead: 'Construimos casas nuevas de la obra gruesa a la entrega: radier, estructura, revestimientos y terminaciones. Un solo equipo responsable de tu casa, con presupuesto por escrito y avances semanales.',
    foto: 'img/proyectos/piedra-2.jpg',
    fotoAlt: 'Casa de un piso con muro de piedra y jardín construida por GADB en Coquimbo',
    proyectos: { tipos: ['casas'] },
    servicios: ['casas', 'obras-mayores'],
    wa: 'Hola, buenas 👋 Vi su página web y me interesa construir una casa en La Serena o Coquimbo. ¿Me podrían dar más información para cotizar?',
    secciones: [
      {
        h2: 'Casas a tu medida, en el estilo que quieras',
        parrafos: [
          'Cada casa parte de lo que necesitas: metros, dormitorios, orientación y presupuesto. Hemos construido casas de estilo moderno, mediterráneo, con muro de piedra, casas sobre pilotes con vista al mar y módulos container habilitados.',
          'Nos hacemos cargo del proceso completo: materiales, mano de obra y terminaciones. Tú hablas con una sola empresa, no con cinco contratistas distintos.',
        ],
        lista: ['Casas de uno y dos pisos', 'Casas sobre pilotes y en terrenos con pendiente', 'Estructura en paneles y revestimientos metálicos', 'Muros de piedra, porcelanato y terminaciones interiores', 'Casas en condominio (60 construidas para Inmobiliaria Kupal)'],
      },
      {
        h2: 'Las etapas de la construcción de tu casa',
        parrafos: [
          'Conversación y visita a terreno, presupuesto claro con partidas y plazos, planificación de obra, ejecución con seguimiento fotográfico y entrega con garantía. Sabes en qué va tu casa en cada momento y no hay sorpresas en el presupuesto.',
        ],
      },
      {
        h2: 'Pensado para la costa de la Región de Coquimbo',
        parrafos: [
          'Si tu terreno está cerca del mar, en La Serena, Coquimbo, La Herradura o Tongoy, la humedad y el salitre influyen en qué estructura, revestimientos y terminaciones conviene usar. Lo conversamos antes de cotizar para que tu casa se mantenga bien con los años.',
        ],
      },
    ],
    faq: [
      { q: '¿Construyen casas llave en mano?', a: 'Sí. Podemos hacernos cargo desde la obra gruesa hasta las terminaciones y la entrega. Si prefieres contratar solo una parte de la obra, también lo conversamos.' },
      { q: '¿Cuánto cuesta construir una casa en La Serena o Coquimbo?', a: 'El valor depende de los metros cuadrados, el terreno, el sistema constructivo y las terminaciones. Por eso hacemos una visita a terreno sin costo y te entregamos un presupuesto por escrito con cada partida.' },
      { q: '¿Qué estilos de casa construyen?', a: 'Casas modernas, de estilo mediterráneo, con muros de piedra, sobre pilotes con vista al mar y modulares. Puedes ver ejemplos reales en nuestra galería de proyectos.' },
      { q: '¿Construyen en terrenos con pendiente o en la costa?', a: 'Sí, tenemos obras en La Herradura y en sectores de Coquimbo con vista al mar. Evaluamos el terreno en la visita para definir fundaciones y estructura.' },
      { q: '¿Cómo parto?', a: 'Escríbenos por WhatsApp con la comuna, el tamaño aproximado y tu idea. Coordinamos una visita a terreno y luego te enviamos el presupuesto.' },
    ],
    relacionadas: ['construcciones-la-serena', 'construcciones-coquimbo', 'ampliaciones-remodelaciones-la-serena-coquimbo', 'quinchos-la-serena-coquimbo'],
  },
  {
    slug: 'quinchos-la-serena-coquimbo',
    corto: 'Quinchos',
    title: 'Quinchos en La Serena y Coquimbo | Construcción GADB',
    description: 'Construimos quinchos en madera con parrilla, barra y mesón de albañilería en La Serena y Coquimbo. Diseño a medida y cotización sin compromiso.',
    eyebrow: 'Quinchos · La Serena y Coquimbo',
    h1: 'Construcción de quinchos en', h1Destacado: 'La Serena y Coquimbo.',
    lead: 'Quinchos en madera con techumbre, parrilla, barra y mesón de albañilería, hechos a la medida de tu patio. Un espacio para compartir en familia todo el año.',
    foto: 'img/proyectos/quincho-1.jpg',
    fotoAlt: 'Quincho de madera con barra y parrilla revestidos en piedra construido por GADB en La Serena',
    proyectos: { tipos: ['quinchos'] },
    servicios: ['quinchos', 'piscinas'],
    wa: 'Hola, buenas 👋 Vi su página web y me gustaría hacer un quincho en La Serena o Coquimbo. ¿Me podrían cotizar?',
    secciones: [
      {
        h2: 'Quinchos hechos a la medida de tu patio',
        parrafos: [
          'Un buen quincho se diseña según el espacio, el sol, el viento y cómo lo vas a usar. Construimos la estructura y techumbre en madera, la parrilla, el mesón y la barra en albañilería, con revestimientos en piedra y la iluminación que acompañe el ambiente.',
          'Con el clima de La Serena y Coquimbo, un quincho se aprovecha gran parte del año. Por eso cuidamos la terminación de la madera y los materiales para que resistan sol, viento y humedad.',
        ],
        lista: ['Estructura y techumbre en madera', 'Parrilla, mesón y barra en albañilería', 'Revestimiento en piedra', 'Iluminación, pisos y pasto sintético', 'Integración con terraza, piscina o jardín'],
      },
      {
        h2: 'Del diseño a la entrega, con un equipo',
        parrafos: [
          'Visitamos tu casa, tomamos medidas y conversamos qué quieres: cuántas personas, qué tipo de parrilla, si lleva barra o lavaplatos. Te entregamos un presupuesto por escrito y construimos con nuestro equipo, con avances por WhatsApp.',
        ],
      },
    ],
    faq: [
      { q: '¿De qué material hacen los quinchos?', a: 'Trabajamos la estructura y techumbre en madera, con parrilla, mesón y barra en albañilería, y revestimientos en piedra, según el diseño que elijas.' },
      { q: '¿Hacen quinchos en La Serena y en Coquimbo?', a: 'Sí, en ambas comunas y también en La Herradura, Guanaqueros, Tongoy y el Valle del Elqui.' },
      { q: '¿Puedo agregar barra, lavaplatos o terraza?', a: 'Sí. Cada quincho se diseña según tu espacio y tus necesidades; en la visita definimos qué incluir.' },
      { q: '¿Cuánto cuesta un quincho?', a: 'Depende de los metros cuadrados, los materiales y lo que incluya (barra, parrilla, techumbre, iluminación). Hacemos una visita sin costo y te enviamos el presupuesto por escrito.' },
      { q: '¿Cómo cotizo?', a: 'Escríbenos por WhatsApp con tu comuna y medidas aproximadas del patio, o usa el formulario de la página.' },
    ],
    relacionadas: ['construcciones-la-serena', 'construcciones-coquimbo', 'ampliaciones-remodelaciones-la-serena-coquimbo', 'construccion-de-casas-la-serena-coquimbo'],
  },
  {
    slug: 'ampliaciones-remodelaciones-la-serena-coquimbo',
    corto: 'Ampliaciones y remodelaciones',
    title: 'Ampliaciones y remodelaciones en La Serena y Coquimbo',
    description: 'Ampliamos y remodelamos tu casa en La Serena y Coquimbo: dormitorios, segundo piso, cocinas, baños, terrazas y fachadas. Cotiza sin compromiso.',
    eyebrow: 'Ampliaciones y remodelaciones',
    h1: 'Ampliaciones y remodelaciones en', h1Destacado: 'La Serena y Coquimbo.',
    lead: 'Más metros y una casa renovada sin dolores de cabeza: ampliamos dormitorios, segundos pisos y terrazas, y remodelamos cocinas, baños, pisos y fachadas, integrados a lo que ya tienes.',
    foto: 'img/proyectos/IMG_3774.webp',
    fotoAlt: 'Remodelación y ampliación de una casa en Coquimbo realizada por GADB',
    proyectos: { tipos: ['ampliaciones', 'remodelaciones'] },
    servicios: ['ampliaciones', 'remodelaciones', 'techos'],
    wa: 'Hola, buenas 👋 Vi su página web y quiero ampliar o remodelar mi casa en La Serena o Coquimbo. ¿Me podrían orientar con una cotización?',
    secciones: [
      {
        h2: 'Ampliar o remodelar: lo que hacemos',
        parrafos: [
          'Si tu casa se quedó chica o ya no se ajusta a cómo vives, podemos hacerla crecer o renovarla. Ejecutamos las obras con cuidado de lo existente, para que lo nuevo se integre bien con lo que ya tienes.',
        ],
        lista: ['Ampliación de dormitorios, living y segundo piso', 'Terrazas, cierres y techumbres', 'Remodelación de cocinas y baños', 'Pisos, pintura, ventanales y fachadas', 'Remodelación exterior y de patio', 'Reparación de techos y filtraciones'],
      },
      {
        h2: 'Vivir en tu casa mientras se trabaja',
        parrafos: [
          'Sabemos que una remodelación se hace con la familia viviendo en la casa. Planificamos la obra por etapas, coordinamos los tiempos contigo y te informamos los avances para que sepas qué se hace cada semana.',
          'Antes de ampliar, conviene revisar la situación de tu propiedad y los permisos que se requieren en la Dirección de Obras Municipales de tu comuna. Te orientamos sobre los pasos según el tipo de obra que quieras hacer.',
        ],
      },
    ],
    faq: [
      { q: '¿Necesito permiso para ampliar mi casa?', a: 'En general, las ampliaciones requieren permiso de edificación en la Dirección de Obras Municipales (DOM) de tu comuna, y esto depende del tipo de obra y de la situación de tu propiedad. Te orientamos sobre los pasos en la visita.' },
      { q: '¿Puedo vivir en la casa durante la remodelación?', a: 'En la mayoría de los casos sí. Planificamos la obra por etapas para reducir las molestias y lo coordinamos contigo antes de partir.' },
      { q: '¿Hacen remodelación de baños y cocinas?', a: 'Sí, además de pisos, pintura, ventanales, fachadas y patios. Cuéntanos qué quieres cambiar y lo cotizamos.' },
      { q: '¿Atienden en La Serena y Coquimbo?', a: 'Sí, en ambas comunas y también en La Herradura, Guanaqueros, Tongoy y el Valle del Elqui.' },
      { q: '¿Cómo cotizo una ampliación o remodelación?', a: 'Por WhatsApp o con el formulario de la página. Coordinamos una visita a terreno sin costo y luego te enviamos el presupuesto por escrito.' },
    ],
    relacionadas: ['construcciones-la-serena', 'construcciones-coquimbo', 'construccion-de-casas-la-serena-coquimbo', 'quinchos-la-serena-coquimbo'],
  },
];

// Preguntas frecuentes de la portada (también van como datos estructurados)
export const FAQ_HOME = [
  { q: '¿Qué servicios de construcción ofrece GADB Construcciones?', a: 'Construcción de casas, quinchos, ampliaciones, remodelaciones, piscinas y exteriores, reparación de techos y obras mayores para empresas e inmobiliarias, en La Serena, Coquimbo y la Región de Coquimbo.' },
  { q: '¿En qué comunas trabajan?', a: 'En La Serena, Coquimbo, La Herradura, Guanaqueros, Tongoy y el Valle del Elqui. Si tu obra está en otra comuna de la región, escríbenos y lo evaluamos.' },
  { q: '¿Cómo puedo cotizar un proyecto?', a: 'Por WhatsApp al +56 9 4159 4862 o con el formulario de esta página. La visita a terreno y la cotización son sin compromiso.' },
  { q: '¿Trabajan con equipo propio?', a: 'Sí, la mano de obra es propia y garantizada. Te mandamos avances por WhatsApp y trabajamos con presupuesto por escrito.' },
  { q: '¿Cuántos años de experiencia tienen?', a: 'Más de 8 años construyendo en la Región de Coquimbo, con más de 130 trabajos publicados, desde remodelaciones hasta 60 casas en condominio.' },
];
