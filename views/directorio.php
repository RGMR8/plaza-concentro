<main class="directorio-page">
  <section class="directorio-layout">
    <aside class="directorio-sidebar" aria-label="Categoría activa">
      <div class="directorio-panel category-panel">
        <h2>Categoría</h2>
        <p class="category-panel-text">
          La categoría de la empresa seleccionada aparecerá aquí.
        </p>

        <div class="active-category-card" id="activeCategoryCard">
          <span class="active-category-dot"></span>
          <span class="active-category-name" id="activeCategoryName">Sin categoría</span>
        </div>
      </div>
    </aside>

    <section class="directorio-main">
      <div class="directorio-toolbar" role="search" aria-label="Buscar empresa">
        <div class="search-block">
          <label for="storeSearch">Busca una empresa</label>

          <div class="search-input-wrap">
            <input
              type="text"
              id="storeSearch"
              placeholder="Escribe el nombre de la empresa"
              autocomplete="off"
            />
            <button type="button" id="clearSearch" aria-label="Limpiar búsqueda">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="directorio-content">
        <div class="directorio-results directorio-panel">
          <div class="results-head">
            <h2>Resultados</h2>
            <span id="resultsCount">0 negocios</span>
          </div>

          <ul id="storeList" class="store-list"></ul>

          <p id="emptyState" class="empty-state" hidden>
            No encontramos coincidencias para tu búsqueda.
          </p>
        </div>

        <div class="directorio-detail-stack">
          <article class="directorio-detail directorio-panel" id="storeDetail">
            <div class="detail-media">
              <img
                id="detailImage"
                src="<?= ASSETS_URL ?>img/logos/sin_logo.png"
                alt="Empresa destacada"
              />
            </div>

            <div class="detail-body">
              <div class="detail-top">
                <span class="detail-tag" id="detailCategory">Categoría</span>
                <h2 id="detailName">Selecciona una empresa</h2>
                <p id="detailDescription">
                  Aquí se mostrará la información del negocio seleccionado dentro del directorio.
                </p>
              </div>

              <ul class="detail-meta">
                <li>
                  <i class="fa-solid fa-location-dot"></i>
                  <span id="detailLocation">Ubicación pendiente</span>
                </li>
                <li>
                  <i class="fa-solid fa-phone"></i>
                  <span id="detailPhone">Información no disponible</span>
                </li>
                <li>
                  <i class="fa-solid fa-clock"></i>
                  <span id="detailHours">Horario no disponible</span>
                </li>
                <li>
                  <i class="fa-solid fa-envelope"></i>
                  <span id="detailEmail">Correo no disponible</span>
                </li>
              </ul>

              <!--
              <div class="detail-actions">
                <a id="detailMapLink" href="<?= BASE_URL ?>index.php#mapa" class="card-btn">
                  Ver mapa
                </a>
              </div>
              -->
            </div>
          </article>
        </div>
      </div>

      <section class="directorio-map-wide">
        <?php require_once VIEWS_PATH . 'componentes/concentro-map.php'; ?>
      </section>
    </section>
  </section>
</main>