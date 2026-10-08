(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const R = window.REPORTAJES || [];

  /* Navbar: transparente arriba, oscura al hacer scroll */
  const nav = $('#nav'), burger = $('.burger'), menu = $('#menu');
  const onScroll = () => nav.classList.toggle('scrolled', scrollY > 40);
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });
  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  /* galerias.html: índice de reportajes */
  const albums = $('#albums');
  if (albums) albums.innerHTML = R.map(r => `<a class="album" href="reportaje.html?r=${r.id}"><img src="${r.portada.src}" width="${r.portada.w}" height="${r.portada.h}" loading="lazy" alt="Portada de ${r.titulo}"><div><h2>${r.titulo}</h2><p>${r.fecha}, ${r.fotos.length} fotografías</p></div></a>`).join('');

  /* reportaje.html?r=<id>: galería completa */
  const grid = $('#grid');
  if (!grid) return;
  const i = R.findIndex(r => r.id === new URLSearchParams(location.search).get('r'));
  const r = R[i];
  if (!r) {
    $('#r-title').textContent = 'Reportaje no encontrado';
    $('#r-desc').textContent = 'Este enlace no corresponde a ningún reportaje. Vuelve al índice para elegir uno.';
    return;
  }
  const title = `${r.titulo} | Nombre Apellido, fotografía cofrade`;
  document.title = title;
  $('link[rel=canonical]').href = location.href.split('#')[0];
  $('meta[name=description]').content = $('meta[property="og:description"]').content = r.desc;
  $('meta[property="og:title"]').content = title;
  $('#r-title').textContent = r.titulo;
  $('#r-desc').textContent = r.desc;
  $('#r-meta').textContent = `${r.fecha}, ${r.fotos.length} fotografías`;
  grid.innerHTML = r.fotos.map(f => `<figure><a href="${f.full}"><img src="${f.src}" width="${f.w}" height="${f.h}" loading="lazy" alt="${f.alt}"></a></figure>`).join('');
  $$('img', grid).forEach(m => m.parentElement.dataset.t = m.alt);
  if (R.length > 1) {
    const n = R[(i + 1) % R.length];
    $('#next').innerHTML = `<a href="reportaje.html?r=${n.id}"><small>Siguiente reportaje</small><br>${n.titulo}</a>`;
  }

  /* Lightbox a medida */
  const lb = document.createElement('div');
  lb.className = 'lb';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Visor de fotografías');
  lb.innerHTML = '<button class="close" aria-label="Cerrar">×</button><button class="prev" aria-label="Anterior">‹</button><button class="next" aria-label="Siguiente">›</button><figure><img alt=""><figcaption></figcaption></figure>';
  document.body.append(lb);
  const img = $('img', lb), cap = $('figcaption', lb), list = $$('a', grid);
  let k = 0, origin;

  const show = n => {
    k = (n + list.length) % list.length;
    const a = list[k], alt = $('img', a).alt;
    img.style.opacity = 0;
    img.onload = img.onerror = () => img.style.opacity = 1;
    img.src = a.href;
    img.alt = alt;
    cap.textContent = `${alt} (${k + 1} de ${list.length})`;
    [1, -1].forEach(d => new Image().src = list[(k + d + list.length) % list.length].href);
  };
  const open = a => {
    origin = a;
    show(list.indexOf(a));
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    $('.close', lb).focus();
  };
  const close = () => {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    origin && origin.focus();
  };

  grid.addEventListener('click', e => {
    const a = e.target.closest('a');
    if (a) { e.preventDefault(); open(a); }
  });
  lb.addEventListener('click', e => {
    if (e.target === lb || e.target.closest('.close')) close();
    else if (e.target.closest('.prev')) show(k - 1);
    else if (e.target.closest('.next')) show(k + 1);
  });
  addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') show(k + 1);
    else if (e.key === 'ArrowLeft') show(k - 1);
    else if (e.key === 'Tab') {
      e.preventDefault();
      const b = $$('button', lb), j = b.indexOf(document.activeElement);
      b[(j + (e.shiftKey ? -1 : 1) + b.length) % b.length].focus();
    }
  });
  let x0;
  lb.addEventListener('touchstart', e => x0 = e.touches[0].clientX, { passive: true });
  lb.addEventListener('touchend', e => {
    const d = e.changedTouches[0].clientX - x0;
    if (Math.abs(d) > 50) show(k + (d < 0 ? 1 : -1));
  });
})();
