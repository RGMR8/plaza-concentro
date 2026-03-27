<!-- MAPA DIRECTORIO -->
<section class="directorio-mapa-shell">
  <div class="directorio-mapa-nav" role="tablist" aria-label="Seleccionar plano">
    <button
      class="directorio-mapa-tab is-active"
      type="button"
      role="tab"
      aria-selected="true"
      aria-controls="directorio-mapa-baja"
      data-dir-map="baja">
      Planta Baja
    </button>

    <button
      class="directorio-mapa-tab"
      type="button"
      role="tab"
      aria-selected="false"
      aria-controls="directorio-mapa-alta"
      data-dir-map="alta">
      Planta Alta
    </button>
  </div>

  <div class="directorio-mapa-stage">
    <div
      class="directorio-mapa-panel is-active"
      id="directorio-mapa-baja"
      role="tabpanel"
      aria-hidden="false">
      <img
        src="<?= ASSETS_URL ?>img/mapa-planta-baja.png"
        alt="Mapa de Planta Baja de Plaza Concentro"
        class="directorio-mapa-img">
    </div>

    <div
      class="directorio-mapa-panel"
      id="directorio-mapa-alta"
      role="tabpanel"
      aria-hidden="true">
      <img
        src="<?= ASSETS_URL ?>img/mapa-planta-alta.png"
        alt="Mapa de Planta Alta de Plaza Concentro"
        class="directorio-mapa-img">
    </div>
  </div>
</section>