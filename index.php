<?php
require_once __DIR__ . '/config/config.php';

$extra_css = [];
$extra_js = ['script.js'];

include __DIR__ . '/views/templates/header.php';
?>

<!-- HERO -->
<section id="inicio" class="hero">
  <div class="hero-art">
    <div class="hero-slide active" style="background-image: url('<?= ASSETS_URL ?>img/concentro.jpeg');"></div>
    <div class="hero-slide" style="background-image: url('<?= ASSETS_URL ?>img/img5.jpg');"></div>
    <div class="hero-slide" style="background-image: url('<?= ASSETS_URL ?>img/parque_concentro.jpeg');"></div>
    <div class="hero-slide" style="background-image: url('<?= ASSETS_URL ?>img/img8.jpg');"></div>
  </div>

  <div class="hero-overlay"></div>
  <div class="hero-gradient"></div>

  <div class="hero-content reveal">
    <p>
      <span class="hero-line-1">Aquí Es Donde Tu Negocio</span>
      <span class="hero-line-2">Toma <span class="hero-impulso">Impulso.</span></span>
    </p>
  </div>

  <div class="hero-dots">
    <span class="hero-dot active" data-slide="0"></span>
    <span class="hero-dot" data-slide="1"></span>
    <span class="hero-dot" data-slide="2"></span>
    <span class="hero-dot" data-slide="3"></span>
  </div>

  <div class="hero-scroll">
    <span>Explorar</span>
  </div>
</section>

<!-- SOBRE -->
<section id="sobre" class="section section-light reveal">
  <div class="about-split">
    <div class="section-intro about-text">
      <h2>Plaza Concentro</h2>
      <p>
        Plaza Concentro es un espacio diseñado para conectar personas, negocios y experiencias en un solo lugar. Ubicada estratégicamente. Se ha consolidado como un punto de encuentro ideal para quienes buscan una oferta integral de servicios y comercio. Nuestro objetivo es brindar un entorno moderno, seguro y accesible, donde cada visitante pueda encontrar lo que necesita, desde productos y servicios especializados.
      </p>
    </div>

    <div class="about-image">
      <img src="<?= ASSETS_URL ?>img/parque_concentro.jpeg" alt="Vista de Plaza Concentro">
    </div>
  </div>
</section>

<!-- INSTALACIONES -->
<section id="instalaciones" class="section section-light reveal">
  <div class="instalaciones-wrap">
    <div class="section-intro instalaciones-intro">
      <h2>Instalaciones</h2>
      <p>Espacios pensados para brindar comodidad, funcionalidad y una mejor experiencia.</p>
    </div>

    <!-- ESTACIONAMIENTO -->
    <div class="instalacion-card">
      <div class="instalacion-content">
        <span class="instalacion-tag">Estacionamiento</span>
        <h3>Comodidad y acceso en cada visita</h3>
        <p>
          En Plaza Concentro – Centro de Negocios, contamos con un área de estacionamiento
          diseñada para brindar comodidad, seguridad y fácil acceso a todos nuestros
          visitantes y usuarios.
        </p>

        <div class="instalacion-beneficios">
          <h4>Beneficios</h4>
          <ul>
            <li>Espacios amplios y bien distribuidos</li>
            <li>Fácil acceso a todas las áreas de la plaza</li>
            <li>Circulación eficiente</li>
            <li>Entorno seguro y ordenado</li>
            <li>Comodidad para visitantes y colaboradores</li>
          </ul>
        </div>
      </div>

      <div class="instalacion-image">
        <img src="<?= ASSETS_URL ?>img/estacionamiento_2.jpeg" alt="Estacionamiento de Plaza Concentro">
      </div>
    </div>

    <!-- ÁREAS COMUNES -->
    <div id="area-comedor" class="area-comun-card">
      <div class="area-comun-content">
        <span class="area-comun-tag">Áreas comunes</span>
        <h3>Un Entorno Pensado Para Tu Día a Día</h3>
        <p>
          En Plaza Concentro, las áreas comunes no solo conectan espacios, sino que también
          contribuyen a crear un ambiente profesional y accesible, ideal para el desarrollo
          de actividades empresariales.
        </p>
        <p>
          Su diseño refleja una imagen contemporánea y ordenada, alineada con la visión de
          un centro de negocios dinámico y en constante crecimiento.
        </p>
      </div>

      <div class="area-comun-gallery">
        <div class="area-comun-gallery-item">
          <img src="<?= ASSETS_URL ?>img/area_3.jpeg" alt="Áreas comunes de Plaza Concentro">
        </div>
        <div class="area-comun-gallery-item">
          <img src="<?= ASSETS_URL ?>img/area_4.jpeg" alt="Pasillos y áreas comunes de Plaza Concentro">
        </div>
      </div>
    </div>

    <!-- EMPRESAS QUE IMPULSAN CONCENTRO -->
    <div id="empresas" class="area-comun-card">
      <div class="area-comun-content">
        <h3>Empresas que Impulsan Concentro</h3>
        <p>
          En Concentro Centro de Negocios, convergen empresas que destacan por su
          profesionalismo, innovación y liderazgo en sus respectivas industrias.
        </p>
        <p>
          Nuestro ecosistema empresarial está conformado por organizaciones de distintos sectores como:
        </p>

        <ul class="area-comun-list">
          <li>Servicios profesionales</li>
          <li>Tecnología</li>
          <li>Finanzas y consultoría</li>
          <li>Arquitectura e ingeniería</li>
          <li>Comercialización y negocios especializados</li>
        </ul>

        <p>
          Cada empresa que forma parte de Concentro aporta valor, generando un entorno dinámico
          donde las oportunidades de colaboración, crecimiento y networking surgen de manera natural.
        </p>
      </div>

      <div class="area-comun-gallery empresas-gallery">
        <div class="area-comun-gallery-item empresa-logo-item">
          <img src="<?= ASSETS_URL ?>img/logos/amco.jpeg" alt="Logo empresa 1">
        </div>
        <div class="area-comun-gallery-item empresa-logo-item">
          <img src="<?= ASSETS_URL ?>img/logos/centro_experto.jpeg" alt="Logo empresa 2">
        </div>
        <div class="area-comun-gallery-item empresa-logo-item empresa-logo-full">
          <img src="<?= ASSETS_URL ?>img/logos/castelec.jpeg" alt="Logo empresa 3">
        </div>
      </div>
    </div>

    <!-- OFICINAS -->
    <div class="instalacion-card">
      <div class="instalacion-content">
        <span class="instalacion-tag">Oficinas</span>
        <h3>Espacios diseñados para crecer</h3>
        <p>
          En Plaza Concentro – Centro de Negocios, nuestras oficinas están pensadas para
          brindar un entorno profesional, funcional y moderno que impulse el desarrollo de
          empresas y proyectos.
        </p>
        <p>
          Cada espacio ha sido diseñado para adaptarse a diferentes necesidades, desde
          oficinas privadas hasta áreas corporativas, ofreciendo comodidad, imagen y un
          ambiente ideal para trabajar, recibir clientes y tomar decisiones importantes.
        </p>
      </div>

      <div class="instalacion-gallery">
        <img src="<?= ASSETS_URL ?>img/oficina.jpeg" alt="Oficinas en Plaza Concentro">
        <img src="<?= ASSETS_URL ?>img/oficina_2.jpeg" alt="Espacios de oficinas en Plaza Concentro">
      </div>
    </div>
  </div>
</section>

<!-- DIRECTORIO -->
<section id="directorio" class="section section-dark reveal">
  <div class="section-intro center">
    <span class="section-label"></span>
    <h2>Directorio de Negocios</h2>
    <p>Descubre los espacios y servicios que forman parte de la experiencia Plaza Concentro.</p>
  </div>

  <div class="cards">
    <div class="card" id="restaurantes">
      <div class="card-number"><i class="fa-solid fa-utensils"></i></div>
      <h3>Área de Comedor</h3>
      <p>Descubre las opciones gastronómicas de la plaza.</p>
      <a href="#area-comedor" class="card-btn">Más información</a>
    </div>

    <div class="card" id="oficinas">
      <div class="card-number"><i class="fa-solid fa-building"></i></div>
      <h3>Oficinas</h3>
      <p>Un espacio donde las empresas crecen, conectan y evolucionan.</p>
      <a href="<?= BASE_URL ?>directorio.php" class="card-btn">Más información</a>
    </div>

    <div class="card" id="servicios">
      <div class="card-number"><i class="fa-solid fa-briefcase"></i></div>
      <h3>Servicios</h3>

      <ul class="servicios-lista">
        <li>Seguridad 24/7</li>
        <li>Limpieza</li>
        <li>Accesos</li>
        <li>Reciclaje</li>
        <li>Cargadores eléctricos</li>
        <li>Acciones ambientales</li>
      </ul>

      <a href="#contacto" class="card-btn">Más información</a>
    </div>
  </div>
</section>

<!-- MAPA -->
<section id="mapa" class="section mapa-section">
  <div class="section-intro center">
    <span class="section-label"></span>
    <h2>Mapa de la Plaza</h2>
    <p>Consulta la ubicación de los negocios, oficinas y servicios dentro del complejo.</p>
  </div>

  <div class="mapa-card mapa-tabs-card">
    <div class="mapa-tabs">
      <button class="mapa-tab active" data-map="baja">Planta Baja</button>
      <button class="mapa-tab" data-map="alta">Planta Alta</button>
    </div>

    <div class="mapa-viewer">
      <div class="mapa-panel active" id="mapa-baja">
        <img src="<?= ASSETS_URL ?>img/mapa-planta-baja.png" alt="Mapa Planta Baja Plaza Concentro" class="mapa-img">
      </div>

      <div class="mapa-panel" id="mapa-alta">
        <img src="<?= ASSETS_URL ?>img/mapa-planta-alta.png" alt="Mapa Planta Alta Plaza Concentro" class="mapa-img">
      </div>
    </div>

    <div class="mapa-overlay mapa-overlay-static">
      <div class="mapa-icon"></div>
    </div>
  </div>
</section>

<!-- ÁREA DE COMEDOR -->
<div id="area-comedor" class="instalacion-card">
  <div class="instalacion-content">
    <span class="instalacion-tag">Área de comedor</span>
    <h3>Un espacio para disfrutar y conectar</h3>
    <p>
      El área de comedor de Plaza Concentro – Centro de Negocios ha sido diseñada
      como un espacio cómodo, funcional y agradable, ideal para disfrutar de una
      pausa durante la jornada laboral.
    </p>
    <p>
      Este espacio integra diferentes opciones para quienes buscan un lugar práctico
      donde comer, convivir o simplemente desconectarse por unos momentos dentro de
      un entorno profesional.
    </p>
  </div>

  <div class="instalacion-image">
    <img src="<?= ASSETS_URL ?>img/img2.jpg" alt="Área de comedor de Plaza Concentro">
  </div>
</div>

<!-- RENTA -->
<section id="renta" class="section section-gold">
  <div class="split-content">
    <div class="split-text">
      <h2>Renta de Locales</h2>
      <p>¿Quieres establecer tu negocio en Plaza Concentro?, puede comunicarte con nosotros 3313502051.</p>

      <p>Espacios disponibles para:</p>

      <ul class="renta-lista">
        <li>Oficinas</li>
        <li>Comercio</li>
        <li>Bodegas</li>
      </ul>

      <a class="btn-renta large" href="#contacto">Solicitar Información</a>
    </div>

    <div class="split-visual">
      <div
        class="visual-box"
        style="--visual-box-bg: url('<?= ASSETS_URL ?>img/img1.jpg');"
      ></div>
    </div>
  </div>
</section>

<!-- GALERÍA -->
<section id="galeria" class="section section-light reveal">
  <div class="section-intro center">
    <span class="section-label"></span>
    <h2>Galería</h2>
  </div>

  <div class="galeria-cascada" id="galeriaCascada">
    <div class="gallery-column gallery-column-left"></div>
    <div class="gallery-column gallery-column-right"></div>
  </div>
</section>

<!-- UBICACIÓN -->
<section id="ubicacion" class="section section-light reveal">
  <div class="section-intro center">
    <h2>Encuéntranos</h2>
    <p>Visítanos en Plaza Concentro y conoce nuestras instalaciones.</p>
  </div>

  <div class="ubicacion-wrap">
    <div class="ubicacion-mapa">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.4401413551627!2d-103.4538743!3d20.692344199999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428a92d0913b6cb%3A0x863db15c96d21969!2sConcentro!5e0!3m2!1ses-419!2sch!4v1773952842445!5m2!1ses-419!2sch"
        width="100%"
        height="450"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </div>
  </div>
</section>

<!-- VIDEO -->
<section id="video-concentro" class="section section-light reveal">
  <div class="video-section">
    <div class="video-wrapper">
      <video controls playsinline preload="metadata">
        <source src="<?= ASSETS_URL ?>video/concentro.mp4" type="video/mp4">
        Tu navegador no soporta la reproducción de video.
      </video>
    </div>
  </div>
</section>

<!-- CONTACTO -->
<section id="contacto" class="section contact-section reveal">
  <div class="contact-wrap">
    <div class="contact-info">
      <span class="section-label"></span>
      <h2>Contáctanos</h2>
      <p>
        Conoce más sobre Plaza Concentro, su directorio y las oportunidades
        para tu negocio dentro del complejo.
      </p>

      <div class="contact-icons">
        <a
          href="https://www.facebook.com/Concentro.CentrodeNegocios?locale=es_LA"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook Plaza Concentro"
          class="contact-social-icon"
        >
          <i class="fa-brands fa-facebook-f"></i>
        </a>

        <a
          href=""
          aria-label="Enviar correo a Plaza Concentro"
          class="contact-social-icon"
        >
          <i class="fa-solid fa-envelope"></i>
        </a>
      </div>
    </div>

    <div>
      <p id="resultado-formulario" class="form-message"></p>

      <form id="contact-form" class="contact-form">
        <input type="hidden" name="access_key" value="3aa2c740-624c-42da-8381-8601c1edb4e3">
        <input type="hidden" name="subject" value="Nuevo mensaje desde Plaza Concentro">
        <input type="hidden" name="from_name" value="Plaza Concentro Web">

        <input type="text" name="nombre" placeholder="Nombre" required>
        <input type="email" name="correo" placeholder="Correo" required>
        <input type="tel" name="telefono" placeholder="Teléfono">
        <textarea name="mensaje" placeholder="Mensaje" required></textarea>

        <button type="submit">Enviar</button>
      </form>
    </div>
  </div>
</section>

<?php include __DIR__ . '/views/templates/footer.php'; ?>