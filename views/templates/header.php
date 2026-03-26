<?php
$extra_css = $extra_css ?? [];
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Plaza Concentro | Centro de Negocios</title>

  <link rel="stylesheet" href="<?= ASSETS_URL ?>css/style.css">

  <?php if (!empty($extra_css)): ?>
    <?php foreach ($extra_css as $css): ?>
      <link rel="stylesheet" href="<?= ASSETS_URL . 'css/' . $css ?>">
    <?php endforeach; ?>
  <?php endif; ?>

  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">

  <script>
    window.APP_CONFIG = {
      baseUrl: "<?= BASE_URL ?>",
      assetsUrl: "<?= ASSETS_URL ?>"
    };
  </script>
</head>
<body>

  <header class="site-header">
    <a href="<?= BASE_URL ?>#inicio" class="logo">
      <img id="header-logo" src="<?= ASSETS_URL ?>img/logo_negro.png" alt="Plaza Concentro">
    </a>

    <button
      class="menu-toggle"
      type="button"
      aria-label="Abrir menú"
      onclick="document.getElementById('sidebar').classList.toggle('open')"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  </header>

  <nav id="sidebar" class="sidebar">
    <div class="sidebar-top">
      <div class="sidebar-brand"><b>Plaza Concentro</b></div>
      <button
        class="sidebar-close"
        type="button"
        aria-label="Cerrar menú"
        onclick="document.getElementById('sidebar').classList.remove('open')"
      >✕</button>
    </div>

    <ul>
      <li>
        <a href="<?= BASE_URL ?>#inicio" onclick="document.getElementById('sidebar').classList.remove('open')">
          Inicio
        </a>
      </li>

      <li class="has-submenu">
        <a href="#" class="submenu-toggle" onclick="this.parentElement.classList.toggle('active'); return false;">
          Plaza Concentro <span class="arrow">▾</span>
        </a>
        <ul class="submenu">
          <li>
            <a href="<?= BASE_URL ?>#sobre" onclick="document.getElementById('sidebar').classList.remove('open')">
              Sobre Concentro
            </a>
          </li>
          <li>
            <a href="<?= BASE_URL ?>#instalaciones" onclick="document.getElementById('sidebar').classList.remove('open')">
              Instalaciones
            </a>
          </li>
          <li>
            <a href="<?= BASE_URL ?>#servicios" onclick="document.getElementById('sidebar').classList.remove('open')">
              Servicios
            </a>
          </li>
          <li>
            <a href="<?= BASE_URL ?>#renta" onclick="document.getElementById('sidebar').classList.remove('open')">
              Renta de Locales
            </a>
          </li>
        </ul>
      </li>

      <li class="has-submenu">
        <a href="#" class="submenu-toggle" onclick="this.parentElement.classList.toggle('active'); return false;">
          Directorio <span class="arrow">▾</span>
        </a>
        <ul class="submenu">
          <li>
            <a href="<?= BASE_URL ?>index.php?page=directorio&tipo=comedor" onclick="document.getElementById('sidebar').classList.remove('open')">
              Área de Comedor
            </a>
          </li>
          <li>
            <a href="<?= BASE_URL ?>index.php?page=directorio&tipo=oficinas" onclick="document.getElementById('sidebar').classList.remove('open')">
              Oficinas
            </a>
          </li>
          <li>
            <a href="<?= BASE_URL ?>index.php?page=directorio&tipo=servicios" onclick="document.getElementById('sidebar').classList.remove('open')">
              Servicios
            </a>
          </li>
        </ul>
      </li>

      <li>
        <a href="<?= BASE_URL ?>#mapa" onclick="document.getElementById('sidebar').classList.remove('open')">
          Mapa
        </a>
      </li>
      <li>
        <a href="<?= BASE_URL ?>#renta" onclick="document.getElementById('sidebar').classList.remove('open')">
          Renta de Locales
        </a>
      </li>
      <li>
        <a href="<?= BASE_URL ?>#galeria" onclick="document.getElementById('sidebar').classList.remove('open')">
          Galería
        </a>
      </li>
      <li>
        <a href="<?= BASE_URL ?>#ubicacion" onclick="document.getElementById('sidebar').classList.remove('open')">
          Ubicación
        </a>
      </li>
      <li>
        <a href="<?= BASE_URL ?>#contacto" onclick="document.getElementById('sidebar').classList.remove('open')">
          Contacto
        </a>
      </li>
    </ul>
  </nav>

  <div class="overlay" onclick="document.getElementById('sidebar').classList.remove('open')"></div>