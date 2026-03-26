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