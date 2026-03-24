document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const headerLogo = document.getElementById('header-logo');

  const sidebar = document.getElementById('sidebar');
  const overlay = document.querySelector('.overlay');
  const hero = document.querySelector('.hero');
  const heroBg = document.querySelector('.hero-art');

  let ticking = false;

  // ===== HERO CARRUSEL =====
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-dot');
  const heroPrev = document.querySelector('.hero-prev');
  const heroNext = document.querySelector('.hero-next');

  let currentHero = 0;
  let heroTimer = null;

  function showHeroSlide(index) {
    heroSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
      if (i !== index) {
        slide.style.transform = 'scale(1.03)';
      }
    });

    heroDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    currentHero = index;
    updateHeroParallax();
  }

  function nextHeroSlide() {
    if (!heroSlides.length) return;
    const next = (currentHero + 1) % heroSlides.length;
    showHeroSlide(next);
  }

  function prevHeroSlide() {
    if (!heroSlides.length) return;
    const prev = (currentHero - 1 + heroSlides.length) % heroSlides.length;
    showHeroSlide(prev);
  }

  function startHeroAuto() {
    if (!heroSlides.length) return;
    heroTimer = setInterval(() => {
      nextHeroSlide();
    }, 5000);
  }

  function resetHeroAuto() {
    clearInterval(heroTimer);
    startHeroAuto();
  }

  // HEADER dinámico + cambio de logo
  const updateHeader = () => {
    if (!header || !headerLogo) return;

    const isScrolled = window.scrollY > 60;
    header.classList.toggle('scrolled', isScrolled);

    if (isScrolled) {
      headerLogo.src = 'img/icono_logo.png';
      headerLogo.classList.add('logo-icon-only');
    } else {
      headerLogo.src = 'img/logo_negro.png';
      headerLogo.classList.remove('logo-icon-only');
    }
  };

  // Parallax ligero solo para hero
  const updateHeroParallax = () => {
    if (!hero || !heroBg || !heroSlides.length) return;

    const activeSlide = document.querySelector('.hero-slide.active');
    if (!activeSlide) return;

    const heroRect = hero.getBoundingClientRect();
    const isVisible = heroRect.bottom > 0 && heroRect.top < window.innerHeight;

    if (!isVisible) return;

    const offset = window.scrollY * 0.12;
    activeSlide.style.transform = `translateY(${offset}px) scale(1.03)`;
  };

  // Scroll optimizado
  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateHeader();
        updateHeroParallax();
        ticking = false;
      });
      ticking = true;
    }
  };

  updateHeader();

  if (heroSlides.length > 0) {
    showHeroSlide(0);
    startHeroAuto();

    heroNext?.addEventListener('click', () => {
      nextHeroSlide();
      resetHeroAuto();
    });

    heroPrev?.addEventListener('click', () => {
      prevHeroSlide();
      resetHeroAuto();
    });

    heroDots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.dataset.slide, 10);
        showHeroSlide(index);
        resetHeroAuto();
      });
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Sidebar: cerrar solo en links reales, no en toggles de submenú
  document.querySelectorAll('#sidebar a:not(.submenu-toggle)').forEach((link) => {
    link.addEventListener('click', () => {
      sidebar?.classList.remove('open');
    });
  });

  // Sidebar: cerrar con ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      sidebar?.classList.remove('open');
    }
  });

  // Sidebar: cerrar con overlay
  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar?.classList.remove('open');
    });
  }

  const imagenesGaleria = [
    "img/img11.jpg",
    "img/img2.jpg",
    "img/img3.jpg",
    "img/img4.jpg",
    "img/img5.jpg",
    "img/img6.jpg",
    "img/img8.jpg",
    "img/img9.jpg",
    "img/galeria_1.jpeg",
    "img/galeria_2.jpeg",
    "img/estacionamiento.jpeg",
  ];

  const leftColumn = document.querySelector(".gallery-column-left");
  const rightColumn = document.querySelector(".gallery-column-right");

  const sizePattern = ["medium", "tall", "small", "medium", "tall"];

  imagenesGaleria.forEach((src, index) => {
    const item = document.createElement("div");
    item.classList.add("gallery-item", sizePattern[index % sizePattern.length]);

    const img = document.createElement("img");
    img.src = src;
    img.alt = `Galería Plaza Concentro ${index + 1}`;

    item.appendChild(img);

    if (index % 2 === 0) {
      leftColumn?.appendChild(item);
    } else {
      rightColumn?.appendChild(item);
    }
  });

  const revealItems = document.querySelectorAll(".reveal");
  const galleryItems = document.querySelectorAll(".gallery-item");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  revealItems.forEach((item) => observer.observe(item));

  galleryItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.10}s`;
    observer.observe(item);
  });

  // Tabs del mapa
  const mapTabs = document.querySelectorAll('.mapa-tab');
  const mapPanels = document.querySelectorAll('.mapa-panel');

  mapTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.map;

      mapTabs.forEach((btn) => btn.classList.remove('active'));
      mapPanels.forEach((panel) => panel.classList.remove('active'));

      tab.classList.add('active');
      document.getElementById(`mapa-${target}`)?.classList.add('active');
    });
  });

  // FORMULARIO WEB3FORMS
  const form = document.getElementById('contact-form');
  const resultado = document.getElementById('resultado-formulario');

  if (form && resultado) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      resultado.className = 'form-message';
      resultado.textContent = 'Enviando mensaje...';
      resultado.classList.add('show');

      try {
        const formData = new FormData(form);

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();

        if (data.success) {
          resultado.textContent = 'Mensaje enviado correctamente.';
          resultado.classList.add('success');
          form.reset();
        } else {
          resultado.textContent = 'No se pudo enviar el mensaje.';
          resultado.classList.add('error');
        }
      } catch (error) {
        resultado.textContent = 'Ocurrió un error al enviar el formulario.';
        resultado.classList.add('error');
      }
    });
  }
});