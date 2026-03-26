  const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSbo_it8B89laBlWdvI9lPKUXntzQVKWHE7awUDwlO0hO8Xaau3SGz4-4idrmUnediH_bQpublQHTLB/pub?gid=365576386&single=true&output=csv';

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

  function normalizeText(value) {
    return String(value ?? '').trim();
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
          image: image || 'img/oficina.jpeg',
          status,
          phone: 'Información no disponible',
          hours: 'Horario no disponible',
          email: 'Correo no disponible',
          mapLink: 'index.html#mapa'
        };
      })
      .filter(store => store.name && store.status === 'SI');
  }

  function renderStoreDetail(store) {
    detailImage.src = store.image || 'img/oficina.jpeg';
    detailImage.alt = store.name || 'Empresa destacada';
    detailCategory.textContent = store.category || 'General';
    detailName.textContent = store.name || 'Selecciona una empresa';
    detailDescription.textContent = store.description || 'Información disponible próximamente.';
    detailLocation.textContent = store.location || 'Ubicación pendiente';
    detailPhone.textContent = store.phone || 'Información no disponible';
    detailHours.textContent = store.hours || 'Horario no disponible';
    detailEmail.textContent = store.email || 'Correo no disponible';
    detailMapLink.href = store.mapLink || 'index.html#mapa';
    renderActiveCategory(store.category || 'General');
  }

  function renderStoreList(filteredStores) {
    storeList.innerHTML = '';
    resultsCount.textContent = `${filteredStores.length} ${filteredStores.length === 1 ? 'negocio' : 'negocios'}`;

    if (!filteredStores.length) {
      emptyState.hidden = false;
      renderStoreDetail({
        name: 'Sin resultados',
        category: 'Directorio',
        description: 'No encontramos coincidencias para tu búsqueda.',
        location: 'Ubicación pendiente',
        phone: 'Información no disponible',
        hours: 'Horario no disponible',
        email: 'Correo no disponible',
        image: 'img/oficina.jpeg',
        mapLink: 'index.html#mapa'
      });
      return;
    }

    emptyState.hidden = true;

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

    renderStoreDetail({
      name: 'Directorio',
      category: 'Categoría',
      description: 'Escribe en el buscador para ver resultados.',
      location: 'Ubicación pendiente',
      phone: 'Información no disponible',
      hours: 'Horario no disponible',
      email: 'Correo no disponible',
      image: 'img/oficina.jpeg',
      mapLink: 'index.html#mapa'
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
      filterStores();
    } catch (error) {
      console.error('Error cargando directorio desde Google Sheets:', error);

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
        image: 'img/oficina.jpeg',
        mapLink: 'index.html#mapa'
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
