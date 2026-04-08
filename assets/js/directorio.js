const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSAAw-ZnXPZGgUlbWSm-HeOovZbsFjcN_feTY1SHYgB1b1AhNfx9nHFvMynb5kGMw/pub?gid=69587388&single=true&output=csv';

const BASE_URL = ['localhost', '127.0.0.1'].includes(window.location.hostname)
  ? `${window.location.origin}/plaza-concentro/`
  : `${window.location.origin}/`;

const FALLBACK_LOGO = `${BASE_URL}assets/img/logos/sin_logo.png`;

let stores = [];

const searchInput = document.getElementById('storeSearch');
const clearSearch = document.getElementById('clearSearch');
const storeList = document.getElementById('storeList');
const resultsCount = document.getElementById('resultsCount');
const emptyState = document.getElementById('emptyState');

const detailImage = document.getElementById('detailImage');
const detailCategory = document.getElementById('detailCategory');
const detailName = document.getElementById('detailName');
const detailDescription = document.getElementById('detailDescription');
const detailLocation = document.getElementById('detailLocation');
const detailPhone = document.getElementById('detailPhone');
const detailHours = document.getElementById('detailHours');
const detailEmail = document.getElementById('detailEmail');
const detailMapLink = document.getElementById('detailMapLink');
const activeCategoryName = document.getElementById('activeCategoryName');
const directorioMapSection = document.querySelector('.directorio-map-wide');

function normalizeText(value) {
  return String(value ?? '').trim();
}

function resolveImagePath(path) {
  const cleanPath = normalizeText(path);

  if (!cleanPath) {
    return FALLBACK_LOGO;
  }

  if (/^https?:\/\//i.test(cleanPath)) {
    return cleanPath;
  }

  if (cleanPath.startsWith('/assets/')) {
    return `${BASE_URL}${cleanPath.replace(/^\/+/, '')}`;
  }

  if (cleanPath.startsWith('assets/')) {
    return `${BASE_URL}${cleanPath}`;
  }

  if (cleanPath.startsWith('/img/')) {
    return `${BASE_URL}assets/${cleanPath.replace(/^\/+/, '')}`;
  }

  if (cleanPath.startsWith('img/')) {
    return `${BASE_URL}assets/${cleanPath}`;
  }

  return `${BASE_URL}${cleanPath.replace(/^\/+/, '')}`;
}

function setDetailImage(src, altText = 'Empresa destacada') {
  if (!detailImage) return;

  detailImage.alt = altText;
  detailImage.onerror = function () {
    this.onerror = null;
    this.src = FALLBACK_LOGO;
  };
  detailImage.src = src || FALLBACK_LOGO;
}

function toggleDirectoryMap(show) {
  if (!directorioMapSection) return;
  directorioMapSection.hidden = !show;
}

function getPlantaFromLocation(location) {
  const text = normalizeText(location).toUpperCase();

  if (!text) return 'unknown';

  const PLANTA_BAJA = ['B', 'C', 'D', 'E', 'F', 'J'];
  const PLANTA_ALTA = ['A', 'G', 'H', 'I', 'L', 'M', 'N'];

  const matches = text.match(/[A-Z]/g) || [];

  let hasBaja = false;
  let hasAlta = false;

  matches.forEach((letter) => {
    if (PLANTA_BAJA.includes(letter)) hasBaja = true;
    if (PLANTA_ALTA.includes(letter)) hasAlta = true;
  });

  if (hasBaja && hasAlta) return 'mixed';
  if (hasBaja) return 'baja';
  if (hasAlta) return 'alta';

  return 'unknown';
}

function activateMapByPlanta(planta) {
  const tabs = document.querySelectorAll('.directorio-mapa-tab');
  const panels = document.querySelectorAll('.directorio-mapa-panel');

  if (!tabs.length || !panels.length) return;

  let targetKey = null;

  if (planta === 'baja') targetKey = 'baja';
  if (planta === 'alta') targetKey = 'alta';

  if (!targetKey) return;

  tabs.forEach((tab) => {
    const isActive = tab.dataset.dirMap === targetKey;
    tab.classList.toggle('is-active', isActive);
    tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  panels.forEach((panel) => {
    const isActive = panel.id === `directorio-mapa-${targetKey}`;
    panel.classList.toggle('is-active', isActive);
    panel.setAttribute('aria-hidden', isActive ? 'false' : 'true');
  });
}

function csvToArray(text) {
  const rows = [];
  let row = [];
  let value = '';
  let insideQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        value += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      row.push(value);
      value = '';
    } else if ((char === '\n' || char === '\r') && !insideQuotes) {
      if (char === '\r' && nextChar === '\n') i++;
      row.push(value);
      if (row.some(cell => String(cell).trim() !== '')) {
        rows.push(row);
      }
      row = [];
      value = '';
    } else {
      value += char;
    }
  }

  if (value.length || row.length) {
    row.push(value);
    if (row.some(cell => String(cell).trim() !== '')) {
      rows.push(row);
    }
  }

  return rows;
}

function getHeaderIndex(headers, headerName) {
  return headers.findIndex(
    header => normalizeText(header).toLowerCase() === headerName.toLowerCase()
  );
}

function findHeaderRowIndex(rows) {
  return rows.findIndex(row => {
    const normalizedRow = row.map(cell => normalizeText(cell).toLowerCase());
    return normalizedRow.includes('empresa') && normalizedRow.includes('local');
  });
}

function buildStoresFromRows(rows) {
  if (!rows.length) return [];

  const headerRowIndex = findHeaderRowIndex(rows);

  if (headerRowIndex === -1) {
    console.error('No se encontró la fila de encabezados en el CSV');
    return [];
  }

  const headers = rows[headerRowIndex];

  const empresaIndex = getHeaderIndex(headers, 'Empresa');
  const generalIndex = getHeaderIndex(headers, 'General');
  const serviciosIndex = getHeaderIndex(headers, 'Servicios generales');
  const localIndex = getHeaderIndex(headers, 'Local');
  const logoIndex = getHeaderIndex(headers, 'Logo');
  const statusIndex = getHeaderIndex(headers, 'Estatus');

  return rows
    .slice(headerRowIndex + 1)
    .map((row, index) => {
      const name = empresaIndex >= 0 ? normalizeText(row[empresaIndex]) : '';
      const category = generalIndex >= 0 ? normalizeText(row[generalIndex]) : 'General';
      const description = serviciosIndex >= 0 ? normalizeText(row[serviciosIndex]) : 'Información disponible próximamente.';
      const location = localIndex >= 0 ? normalizeText(row[localIndex]) : 'Ubicación pendiente';
      const image = logoIndex >= 0 ? normalizeText(row[logoIndex]) : '';
      const status = statusIndex >= 0 ? normalizeText(row[statusIndex]).toUpperCase() : 'SI';

      return {
        id: index + 1,
        name,
        category,
        description,
        location,
        image: resolveImagePath(image),
        planta: getPlantaFromLocation(location),
        status,
        phone: 'Información no disponible',
        hours: 'Horario no disponible',
        email: 'Correo no disponible',
        mapLink: `${BASE_URL}#mapa`
      };
    })
    .filter(store => store.name && store.status === 'SI');
}

function renderStoreDetail(store) {
  setDetailImage(store.image || FALLBACK_LOGO, store.name || 'Empresa destacada');
  detailCategory.textContent = store.category || 'General';
  detailName.textContent = store.name || 'Selecciona una empresa';
  detailDescription.textContent = store.description || 'Información disponible próximamente.';
  detailLocation.textContent = store.location || 'Ubicación pendiente';
  detailPhone.textContent = store.phone || 'Información no disponible';
  detailHours.textContent = store.hours || 'Horario no disponible';
  detailEmail.textContent = store.email || 'Correo no disponible';
  detailMapLink.href = store.mapLink || `${BASE_URL}#mapa`;
  renderActiveCategory(store.category || 'General');
  activateMapByPlanta(store.planta);
}

function renderStoreList(filteredStores) {
  storeList.innerHTML = '';
  resultsCount.textContent = `${filteredStores.length} ${filteredStores.length === 1 ? 'negocio' : 'negocios'}`;

  if (!filteredStores.length) {
    emptyState.hidden = false;
    emptyState.textContent = 'No encontramos coincidencias para tu búsqueda.';
    toggleDirectoryMap(false);

    renderStoreDetail({
      name: 'Sin resultados',
      category: 'Directorio',
      description: 'No encontramos coincidencias para tu búsqueda.',
      location: 'Ubicación pendiente',
      phone: 'Información no disponible',
      hours: 'Horario no disponible',
      email: 'Correo no disponible',
      image: FALLBACK_LOGO,
      planta: 'unknown',
      mapLink: `${BASE_URL}#mapa`
    });
    return;
  }

  emptyState.hidden = true;
  toggleDirectoryMap(true);

  filteredStores.forEach((store, index) => {
    const item = document.createElement('li');
    item.className = 'store-item';

    item.innerHTML = `
      <button class="store-item-btn ${index === 0 ? 'is-active' : ''}" data-store-id="${store.id}">
        <span class="store-item-name">${store.name}</span>
        <span class="store-item-category">${store.category}</span>
      </button>
    `;

    storeList.appendChild(item);
  });

  const buttons = storeList.querySelectorAll('.store-item-btn');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((btn) => btn.classList.remove('is-active'));
      button.classList.add('is-active');

      const selectedStore = filteredStores.find(
        store => store.id === Number(button.dataset.storeId)
      );

      if (selectedStore) {
        renderStoreDetail(selectedStore);
      }
    });
  });

  renderStoreDetail(filteredStores[0]);
}

function filterStores() {
  const term = searchInput.value.trim().toLowerCase();

  if (!term) {
    storeList.innerHTML = '';
    resultsCount.textContent = '0 negocios';
    emptyState.hidden = false;
    emptyState.textContent = 'Escribe el nombre de una empresa para comenzar la búsqueda.';
    toggleDirectoryMap(false);

    renderStoreDetail({
      name: 'Directorio',
      category: 'Categoría',
      description: 'Escribe en el buscador para ver resultados.',
      location: 'Ubicación pendiente',
      phone: 'Información no disponible',
      hours: 'Horario no disponible',
      email: 'Correo no disponible',
      image: FALLBACK_LOGO,
      planta: 'unknown',
      mapLink: `${BASE_URL}#mapa`
    });

    return;
  }

  const filtered = stores.filter(store =>
    (store.name || '').toLowerCase().includes(term) ||
    (store.category || '').toLowerCase().includes(term) ||
    (store.location || '').toLowerCase().includes(term) ||
    (store.description || '').toLowerCase().includes(term)
  );

  renderStoreList(filtered);
}

function renderActiveCategory(category) {
  if (!activeCategoryName) return;
  activeCategoryName.textContent = category || 'Sin categoría';
}

async function loadStoresFromSheet() {
  try {
    const response = await fetch(SHEET_CSV_URL);
    const csvText = await response.text();
    const rows = csvToArray(csvText);

    stores = buildStoresFromRows(rows);
    toggleDirectoryMap(false);
    filterStores();
  } catch (error) {
    console.error('Error cargando directorio desde Google Sheets:', error);

    toggleDirectoryMap(false);
    emptyState.hidden = false;
    emptyState.textContent = 'No se pudo cargar el directorio en este momento.';
    resultsCount.textContent = '0 negocios';

    renderStoreDetail({
      name: 'Error de carga',
      category: 'Directorio',
      description: 'No fue posible cargar la información desde Google Sheets.',
      location: 'Ubicación pendiente',
      phone: 'Información no disponible',
      hours: 'Horario no disponible',
      email: 'Correo no disponible',
      image: FALLBACK_LOGO,
      planta: 'unknown',
      mapLink: `${BASE_URL}#mapa`
    });
  }
}

searchInput.addEventListener('input', filterStores);

clearSearch.addEventListener('click', () => {
  searchInput.value = '';
  filterStores();
  searchInput.focus();
});

loadStoresFromSheet();

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.directorio-mapa-tab');
  const panels = document.querySelectorAll('.directorio-mapa-panel');

  if (!tabs.length || !panels.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const mapKey = tab.dataset.dirMap;

      tabs.forEach((btn) => {
        btn.classList.remove('is-active');
        btn.setAttribute('aria-selected', 'false');
      });

      panels.forEach((panel) => {
        panel.classList.remove('is-active');
        panel.setAttribute('aria-hidden', 'true');
      });

      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      const target = document.getElementById(`directorio-mapa-${mapKey}`);
      if (target) {
        target.classList.add('is-active');
        target.setAttribute('aria-hidden', 'false');
      }
    });
  });
});