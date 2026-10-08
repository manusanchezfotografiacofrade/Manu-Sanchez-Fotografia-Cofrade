/* ÚNICO archivo que editas para añadir reportajes. Cada uno se abre en reportaje.html?r=<id>.
   foto() genera imágenes de prueba. Sustitúyela por tus rutas reales:
   { src:'img/ss26/01-min.jpg', full:'img/ss26/01.jpg', w:600, h:800, alt:'Descripción' }  */
const foto = (seed, rw, rh, alt) => {
  const h = Math.round(600 * rh / rw);
  return { src: `https://picsum.photos/seed/${seed}/600/${h}`, full: `https://picsum.photos/seed/${seed}/1600/${Math.round(1600 * rh / rw)}`, w: 600, h, alt };
};

window.REPORTAJES = [
  {
    id: 'semana-santa-2026',
    titulo: 'Semana Santa 2026',
    fecha: 'Marzo y abril de 2026',
    desc: 'Siete días de cofradías en la calle: madrugadas, palios y el silencio previo a cada levantá.',
    portada: foto('ss0', 4, 5, 'Nazareno en la madrugada'),
    fotos: [
      foto('ss1', 3, 4, 'Nazareno en la madrugada'), foto('ss2', 3, 2, 'Paso de misterio a contraluz'),
      foto('ss3', 1, 1, 'Costaleros antes de la levantá'), foto('ss4', 3, 4, 'Cirios bajo el palio'),
      foto('ss5', 3, 2, 'Bordado en oro del manto'), foto('ss6', 3, 4, 'Mirada de una penitente')
    ]
  },
  {
    id: 'besamanos',
    titulo: 'Besamanos',
    fecha: 'Diciembre de 2025',
    desc: 'La intimidad del culto: filas de devotos, flores y velas ante la imagen.',
    portada: foto('bm0', 4, 5, 'La Virgen en su besamanos'),
    fotos: [
      foto('bm1', 3, 4, 'La Virgen en su besamanos'), foto('bm2', 3, 2, 'Fila de devotos'),
      foto('bm3', 1, 1, 'Flores ante el altar'), foto('bm4', 3, 4, 'Manos sobre el rosario')
    ]
  },
  {
    id: 'corpus-2026',
    titulo: 'Corpus Christi 2026',
    fecha: 'Junio de 2026',
    desc: 'Calles engalanadas, altares efímeros y la custodia bajo el sol de junio.',
    portada: foto('cp0', 4, 5, 'Custodia en la procesión del Corpus'),
    fotos: [
      foto('cp1', 3, 2, 'Custodia en la procesión del Corpus'), foto('cp2', 3, 4, 'Altar de Corpus en la calle'),
      foto('cp3', 1, 1, 'Alfombra de flores'), foto('cp4', 3, 4, 'Niños de primera comunión')
    ]
  }
];
