// BILIAN Lily Palacios — Landing interactions
(function () {
  // ===== PRELOADER =====
  var preloader = document.getElementById('preloader');
  document.body.style.overflow = 'hidden';

  var hidePreloader = function () {
    if (preloader.classList.contains('loaded')) return;
    preloader.classList.add('loaded');
    document.body.style.overflow = '';
  };
  window.addEventListener('load', function () { setTimeout(hidePreloader, 400); });
  setTimeout(hidePreloader, 3500); // fallback de seguridad

  // ===== MENÚ MÓVIL =====
  var nav = document.querySelector('.nav');
  var btn = document.getElementById('menu-btn');
  var links = document.querySelectorAll('.nav-links a');

  btn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });
  links.forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  // ===== ACORDEÓN DE LA DISEÑADORA =====
  var panels = document.querySelectorAll('.ph-panel');
  panels.forEach(function (panel) {
    panel.addEventListener('click', function () {
      panels.forEach(function (p) { p.classList.remove('active'); });
      panel.classList.add('active');
    });
  });

  // ===== VISOR DE FOTOS (GALLERY) =====
  var galleries = {
    novias: {
      title: 'Colección Novias',
      images: ['img/Novias/novia1.jpeg', 'img/Novias/novia2.jpeg']
    },
    coctel: {
      title: 'Colección Cóctel',
      images: [
        'img/Coctel/coctel1.jpeg', 'img/Coctel/coctel2.jpeg', 'img/Coctel/coctel3.jpeg',
        'img/Coctel/coctel4.jpeg', 'img/Coctel/coctel5.jpeg', 'img/Coctel/coctel6.jpeg',
        'img/Coctel/coctel7.jpeg', 'img/Coctel/coctel8.jpeg', 'img/Coctel/coctel9.jpeg',
        'img/Coctel/coctel10.jpeg', 'img/Coctel/coctel11.jpeg', 'img/Coctel/coctel12.jpeg',
        'img/Coctel/coctel13.jpeg', 'img/Coctel/coctel14.jpeg', 'img/Coctel/coctel15.jpeg'
      ]
    },
    ninas: {
      title: 'Colección Niñas',
      images: ['img/Niñas/niñas1.jpeg', 'img/Niñas/niñas2.jpeg', 'img/Niñas/niñas3.jpeg']
    }
  };

  var gallery = document.getElementById('gallery');
  var galleryImg = document.getElementById('gallery-img');
  var galleryTitle = document.getElementById('gallery-title');
  var galleryCount = document.getElementById('gallery-count');
  var currentGallery = null;
  var currentIndex = 0;

  var render = function () {
    var list = currentGallery.images;
    var img = new Image();
    img.onload = function () {
      galleryImg.src = list[currentIndex];
      galleryImg.alt = currentGallery.title + ' — foto ' + (currentIndex + 1);
    };
    img.src = list[currentIndex];
    galleryTitle.textContent = currentGallery.title;
    galleryCount.textContent = (currentIndex + 1) + ' / ' + list.length;
    document.getElementById('gallery-prev').setAttribute('aria-hidden', list.length < 2);
    document.getElementById('gallery-next').setAttribute('aria-hidden', list.length < 2);
  };

  var openGallery = function (key) {
    currentGallery = galleries[key];
    if (!currentGallery) return;
    currentIndex = 0;
    render();
    gallery.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  var closeGallery = function () {
    gallery.classList.remove('open');
    document.body.style.overflow = '';
  };
  var move = function (dir) {
    if (!currentGallery) return;
    var list = currentGallery.images;
    currentIndex = (currentIndex + dir + list.length) % list.length;
    render();
  };

  document.querySelectorAll('[data-gallery]').forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      openGallery(trigger.getAttribute('data-gallery'));
    });
  });
  document.getElementById('gallery-close').addEventListener('click', closeGallery);
  document.getElementById('gallery-prev').addEventListener('click', function () { move(-1); });
  document.getElementById('gallery-next').addEventListener('click', function () { move(1); });
  gallery.addEventListener('click', function (e) {
    if (e.target === gallery) closeGallery();
  });
  document.addEventListener('keydown', function (e) {
    if (!gallery.classList.contains('open')) return;
    if (e.key === 'Escape') closeGallery();
    if (e.key === 'ArrowLeft') move(-1);
    if (e.key === 'ArrowRight') move(1);
  });
})();