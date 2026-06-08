// ─────────────────────────────────────────────────────────────────────────────
// CATÁLOGO DE WILLIAM VENDE
// Precios en pesos colombianos (COP). El precio final se confirma por WhatsApp.
// priceFrom = precio 1 unidad (al detal). wholesale = precios por mayor (del catálogo).
// Para editar un precio cambia priceFrom o las tarifas de wholesale.
// ─────────────────────────────────────────────────────────────────────────────

export const products = [
  // ── AirPods ──────────────────────────────────────────────────────────────
  {
    id: 'airpods-3gen',
    name: 'AirPods 3ª Generación',
    line: 'AirPods',
    blurb: 'Audio espacial personalizado, diseño resistente al agua y estuche de carga MagSafe.',
    priceFrom: 49900,
    image: '/images/productos/airpods-3gen.webp',
    wholesale: [
      { qty: 5, unit: 43000 },
      { qty: 10, unit: 41000 },
      { qty: 30, unit: 39900 },
      { qty: 50, unit: 37000 },
    ],
  },
  {
    id: 'airpods-4gen',
    name: 'AirPods 4ª Generación',
    line: 'AirPods',
    blurb: 'El diseño más cómodo de Apple, sonido reinventado y hasta 30 horas de reproducción.',
    priceFrom: 69000,
    image: '/images/productos/airpods-4gen.webp',
    wholesale: [
      { qty: 5, unit: 47000 },
      { qty: 10, unit: 45000 },
      { qty: 30, unit: 43000 },
      { qty: 50, unit: 41000 },
    ],
  },
  {
    id: 'airpods-pro-2',
    name: 'AirPods Pro 2',
    line: 'AirPods',
    blurb: 'Cancelación activa de ruido de nivel profesional, audio adaptativo y chip H2.',
    priceFrom: 59900,
    image: '/images/productos/airpods-pro-2.webp',
    wholesale: [
      { qty: 5, unit: 45000 },
      { qty: 10, unit: 43000 },
      { qty: 30, unit: 41000 },
      { qty: 50, unit: 37900 },
    ],
  },
  {
    id: 'airpods-max-azul',
    name: 'AirPods Max — Azul Medianoche',
    line: 'AirPods',
    blurb: 'Sonido de alta fidelidad, cancelación de ruido premium y diseño over-ear de aluminio.',
    priceFrom: 89900,
    image: '/images/productos/airpods-max-azul.webp',
    wholesale: [
      { qty: 5, unit: 79900 },
      { qty: 10, unit: 75000 },
      { qty: 30, unit: 73000 },
      { qty: 50, unit: 70000 },
    ],
  },
  {
    id: 'airpods-max-blancos',
    name: 'AirPods Max — Blancos',
    line: 'AirPods',
    blurb: 'El mismo audio espectacular de los AirPods Max en el clásico blanco estelar de Apple.',
    priceFrom: 89900,
    image: '/images/productos/airpods-max-blancos.webp',
    wholesale: [
      { qty: 5, unit: 79900 },
      { qty: 10, unit: 75000 },
      { qty: 30, unit: 73000 },
      { qty: 50, unit: 70000 },
    ],
  },

  // ── Apple Watch ───────────────────────────────────────────────────────────
  {
    id: 'watch-ultra-2',
    name: 'Apple Watch Ultra 2',
    line: 'Apple Watch',
    blurb: 'Caja de titanio, GPS de doble frecuencia y 36h de batería para aventura extrema.',
    priceFrom: 130000,
    image: '/images/productos/watch-ultra-2.webp',
    wholesale: [
      { qty: 5, unit: 115000 },
      { qty: 10, unit: 110000 },
      { qty: 20, unit: 100000 },
      { qty: 40, unit: 90000 },
    ],
  },
  {
    id: 'watch-series-10',
    name: 'Apple Watch Series 10',
    line: 'Apple Watch',
    blurb: 'La pantalla más grande y delgada, detección de apnea del sueño y carga ultrarrápida.',
    priceFrom: 140000,
    image: '/images/productos/watch-series-10.webp',
    wholesale: [
      { qty: 5, unit: 120000 },
      { qty: 10, unit: 105000 },
    ],
  },

  // ── Accesorios ────────────────────────────────────────────────────────────
  {
    id: 'cargador-usbc',
    name: 'Cargador USB-C 20 W',
    line: 'Accesorios',
    blurb: 'Carga rápida para iPhone, iPad y MacBook. Compacto, potente y certificado.',
    priceFrom: 20000,
    image: '/images/productos/cargador-usbc.webp',
    wholesale: [
      { qty: 5, unit: 18000 },
      { qty: 10, unit: 16000 },
      { qty: 30, unit: 14000 },
      { qty: 50, unit: 12000 },
      { qty: 100, unit: 10000 },
    ],
  },
  {
    id: 'cable-lightning',
    name: 'Cable USB-C a Lightning',
    line: 'Accesorios',
    blurb: 'Compatible con iPhone 14 y anteriores. Carga rápida y transferencia de datos.',
    priceFrom: 18000,
    image: '/images/productos/cable-lightning.webp',
    wholesale: [
      { qty: 5, unit: 15000 },
      { qty: 10, unit: 12000 },
      { qty: 30, unit: 10000 },
      { qty: 50, unit: 8000 },
    ],
  },
  {
    id: 'cable-usbc',
    name: 'Cable USB-C a USB-C',
    line: 'Accesorios',
    blurb: 'Compatible con iPhone 15+, iPad y MacBook. Ideal para carga y sincronización.',
    priceFrom: 18000,
    image: '/images/productos/cable-usbc.webp',
    wholesale: [
      { qty: 5, unit: 15000 },
      { qty: 10, unit: 12000 },
      { qty: 30, unit: 10000 },
      { qty: 50, unit: 8000 },
    ],
  },
  {
    id: 'parlante-tg',
    name: 'Parlante T&G',
    line: 'Accesorios',
    blurb: 'Sonido potente y grave, Bluetooth 5.0, resistente al agua y batería de larga duración.',
    priceFrom: 60000,
    image: '/images/productos/parlante-tg.webp',
    wholesale: [
      { qty: 5, unit: 50000 },
      { qty: 10, unit: 47000 },
      { qty: 20, unit: 44000 },
    ],
  },
]
