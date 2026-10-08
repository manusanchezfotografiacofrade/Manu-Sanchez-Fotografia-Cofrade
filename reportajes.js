/* ÚNICO archivo que editas para añadir reportajes. Cada uno se abre en reportaje.html?r=<id>.
   foto() genera imágenes de prueba. Sustitúyela por tus rutas reales:
   { src:'img/ss26/01-min.jpg', full:'img/ss26/01.jpg', w:600, h:800, alt:'Descripción' }  */
const foto = (seed, rw, rh, alt) => {
  const h = Math.round(600 * rh / rw);
  return { src: `https://picsum.photos/seed/${seed}/600/${h}`, full: `https://picsum.photos/seed/${seed}/1600/${Math.round(1600 * rh / rw)}`, w: 600, h, alt };
};

window.REPORTAJES = [
  {
    id: 'san-francisco-guadalcacín',
    titulo: 'Procesión San Francisco de Asís - Hermandad de la Entrega Guadalcacín',
    fecha: '4 de Octubre de 2026',
    desc: 'Procesión de San Francisco de Asís por las calles de Guadalcacín, Jerez de la Frontera.',
    portada: foto('ss0', 4, 5, 'Nazareno en la madrugada'),
    fotos: [
      foto('imagenes/galerias/san-francisco-guada/IMG_0724.jpg', 3, 4, 'Detalle del Banderín de la Banda'),
    ]
  },
];
