// Simplified Invoice Demo - No Firebase, Mock Data Only
// This is a demo version for portfolio showcase

// Mock data for invoices
const mockInvoices = [
  {
    id: "202601003",
    client: "ENTREPRISE A",
    email: "contact@entreprise-a.com",
    address: "Paris, France",
    total: 156.50,
    date: "2026-01-15",
    status: "paid"
  },
  {
    id: "202601002",
    client: "CLIENT B",
    email: "client.b@example.com",
    address: "Lyon, France",
    total: 98.20,
    date: "2026-01-12",
    status: "pending"
  },
  {
    id: "202601001",
    client: "SOCIÉTÉ C",
    email: "info@societe-c.org",
    address: "Marseille, France",
    total: 245.80,
    date: "2026-01-08",
    status: "paid"
  },
  {
    id: "202512042",
    client: "RESTAURANT D",
    email: "chef@resto-d.fr",
    address: "Bordeaux, France",
    total: 412.00,
    date: "2025-12-28",
    status: "paid"
  },
  {
    id: "202512041",
    client: "STARTUP E",
    email: "billing@startup-e.io",
    address: "Nantes, France",
    total: 89.90,
    date: "2025-12-20",
    status: "paid"
  }
];

// Configuration
let config = {
  tva: 10,
  prixPDJ: 8,
  taxeSejour: 2.86,
  devise: "€",
  nextInvoiceNumber: 202601004
};

// Room types
const chambreTypes = [
  { label: "Chambre Single", value: 40 },
  { label: "Chambre Double", value: 55 },
  { label: "Chambre Triple", value: 75 },
  { label: "Chambre Quadruple", value: 90 }
];

// Initialize on load
document.addEventListener('DOMContentLoaded', function () {
  initApp();
});

function initApp() {
  // Show app
  const app = document.getElementById('app');
  if (app) {
    app.style.opacity = '1';
    app.style.display = 'block';
  }

  // Initialize form
  initForm();

  // Load history
  loadHistory();

  // Setup event listeners
  setupEventListeners();

  // Update preview
  calculatePreview();
}

function initForm() {
  // Initialize room list
  updateRoomList();

  // Set invoice number
  document.getElementById('preview-invoice-number').textContent = `Facture n° ${config.nextInvoiceNumber}`;
}

function setupEventListeners() {
  // Demo Modal
  const startDemoBtn = document.getElementById('btn-start-demo');
  if (startDemoBtn) {
    startDemoBtn.addEventListener('click', function () {
      const modal = document.getElementById('demo-intro-modal');
      if (modal) {
        modal.style.opacity = '0';
        modal.style.transition = 'opacity 0.3s ease';
        setTimeout(() => modal.remove(), 300);
      }
    });
  }

  // Number of rooms change
  document.getElementById('nb-chambres').addEventListener('input', updateRoomList);

  // Form inputs for preview
  const previewInputs = ['nb-chambres', 'nb-clients', 'pdj-switch', 'nb-nuits'];
  previewInputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', calculatePreview);
      el.addEventListener('change', calculatePreview);
    }
  });

  // Create invoice button
  document.getElementById('btn-creer').addEventListener('click', createInvoice);

  // Reset button
  document.getElementById('btn-reset').addEventListener('click', resetForm);

  // PDJ switch text update
  document.getElementById('pdj-switch').addEventListener('change', function () {
    const text = this.nextElementSibling.nextElementSibling;
    text.textContent = this.checked ? 'Oui' : 'Non';
  });

  // Download PDF
  const btnDownload = document.getElementById('btn-download');
  if (btnDownload) {
    btnDownload.addEventListener('click', generatePDF);
  }

  // Back from PDF view
  const btnBack = document.getElementById('btn-back');
  if (btnBack) {
    btnBack.addEventListener('click', function () {
      document.getElementById('facture-pdf').style.display = 'none';
      document.getElementById('app').style.display = 'block';
    });
  }

  // View All Invoices
  document.getElementById('btn-view-factures').addEventListener('click', showAllInvoices);

  // Back from All Invoices
  document.getElementById('btn-back-to-app').addEventListener('click', function () {
    document.getElementById('factures-container').style.display = 'none';
    document.getElementById('app').style.display = 'block';
  });

  // Toggle Grid/List view
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      toggleBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const view = this.dataset.view;
      document.getElementById('factures-grid').style.display = view === 'grid' ? 'grid' : 'none';
      document.getElementById('factures-list').style.display = view === 'list' ? 'flex' : 'none';
    });
  });

  // Search
  document.getElementById('facture-search').addEventListener('input', function (e) {
    const term = e.target.value.toLowerCase();
    renderInvoices(term);
  });

  // Panels Handlers
  setupPanelHandlers();
}

function setupPanelHandlers() {
  // Settings Panel
  const btnSettings = document.getElementById('toggle-admin');
  const panelSettings = document.getElementById('admin-panel');
  const closeSettings = document.getElementById('close-admin');

  btnSettings.addEventListener('click', () => {
    panelSettings.classList.add('open');
    // Populate settings
    document.getElementById('admin-num-facture').value = config.nextInvoiceNumber;
    document.getElementById('admin-tva').value = config.tva;
    document.getElementById('admin-pdj').value = config.prixPDJ;
    document.getElementById('admin-taxe').value = config.taxeSejour;
  });

  closeSettings.addEventListener('click', () => {
    panelSettings.classList.remove('open');
  });

  document.getElementById('btn-save-settings').addEventListener('click', () => {
    config.tva = parseFloat(document.getElementById('admin-tva').value);
    config.prixPDJ = parseFloat(document.getElementById('admin-pdj').value);
    config.taxeSejour = parseFloat(document.getElementById('admin-taxe').value);
    calculatePreview();
    panelSettings.classList.remove('open');
    showToast('Paramètres enregistrés (Session)', 'success');
  });

  // Dashboard Panel
  const btnDashboard = document.getElementById('toggle-dashboard');
  const panelDashboard = document.getElementById('dashboard-panel');
  const closeDashboard = document.getElementById('close-dashboard');

  btnDashboard.addEventListener('click', () => {
    panelDashboard.classList.add('open');
    // Skip auth for demo
    const authPanel = document.getElementById('dashboard-auth');
    const contentPanel = document.getElementById('dashboard-content');
    if (authPanel) authPanel.style.display = 'none';
    if (contentPanel) contentPanel.style.display = 'block';
    updateDashboardStats();
  });

  closeDashboard.addEventListener('click', () => {
    panelDashboard.classList.remove('open');
  });

  // Activity Panel
  const btnActivity = document.getElementById('toggle-activity');
  const panelActivity = document.getElementById('activity-panel');
  const closeActivity = document.getElementById('close-activity');

  btnActivity.addEventListener('click', () => {
    panelActivity.classList.add('open');
    updateActivityLog();
  });

  closeActivity.addEventListener('click', () => {
    panelActivity.classList.remove('open');
  });
}

function updateDashboardStats() {
  const totalCA = mockInvoices.reduce((acc, inv) => acc + inv.total, 0);
  const avg = totalCA / mockInvoices.length;

  document.getElementById('stat-total').textContent = formatPrice(totalCA);
  document.getElementById('stat-count').textContent = mockInvoices.length;
  document.getElementById('stat-avg').textContent = formatPrice(avg);
  document.getElementById('stat-pdj').textContent = '24%'; // Mock
}

function updateActivityLog() {
  const list = document.getElementById('activity-list');
  list.innerHTML = `
    <div style="padding:12px; border-bottom:1px dashed #333">
      <div style="font-weight:600">Facture créée</div>
      <div class="muted" style="font-size:0.8rem">Agent A - Il y a 5 min</div>
    </div>
    <div style="padding:12px; border-bottom:1px dashed #333">
      <div style="font-weight:600">Réglages modifiés</div>
      <div class="muted" style="font-size:0.8rem">Admin - Il y a 2h</div>
    </div>
    <div style="padding:12px; border-bottom:1px dashed #333">
      <div style="font-weight:600">Facture #202601003 payée</div>
      <div class="muted" style="font-size:0.8rem">Système - Hier</div>
    </div>
  `;
}

function updateRoomList() {
  const nbChambres = parseInt(document.getElementById('nb-chambres').value) || 1;
  const container = document.getElementById('liste-chambres');
  container.innerHTML = '';

  for (let i = 0; i < nbChambres; i++) {
    const roomDiv = document.createElement('div');
    roomDiv.className = 'room';
    roomDiv.innerHTML = `
      <div class="field">
        <label for="room-type-${i}">Chambre ${i + 1}</label>
        <div class="select-wrapper">
          <select id="room-type-${i}" class="room-select" data-index="${i}">
            ${chambreTypes.map(type => `
              <option value="${type.value}">${type.label} - ${type.value}€</option>
            `).join('')}
          </select>
        </div>
      </div>
    `;
    container.appendChild(roomDiv);

    // Add event listener
    roomDiv.querySelector('select').addEventListener('change', calculatePreview);
  }

  calculatePreview();
}

function calculatePreview() {
  // Get all room prices
  const roomSelects = document.querySelectorAll('.room-select');
  let totalChambres = 0;
  roomSelects.forEach(select => {
    totalChambres += parseFloat(select.value) || 0;
  });

  const nbNuits = parseInt(document.getElementById('nb-nuits').value) || 1;
  const nbClients = parseInt(document.getElementById('nb-clients').value) || 1;
  const pdjEnabled = document.getElementById('pdj-switch').checked;

  // Calculate totals
  const chambresTotal = totalChambres * nbNuits;
  const pdjTotal = pdjEnabled ? config.prixPDJ * nbClients * nbNuits : 0;
  const totalHT = chambresTotal + pdjTotal;
  const tva = totalHT * (config.tva / 100);
  const taxe = config.taxeSejour * nbClients * nbNuits;
  const totalTTC = totalHT + tva + taxe;

  // Update preview
  document.getElementById('preview-chambres').textContent = formatPrice(chambresTotal);
  document.getElementById('preview-pdj').textContent = formatPrice(pdjTotal);
  document.getElementById('preview-ht').textContent = formatPrice(totalHT);
  document.getElementById('preview-tva').textContent = formatPrice(tva);
  document.getElementById('preview-taxe').textContent = formatPrice(taxe);
  document.getElementById('preview-total').textContent = formatPrice(totalTTC);

  return {
    chambresTotal,
    pdjTotal,
    totalHT,
    tva,
    taxe,
    totalTTC,
    nbNuits,
    nbClients,
    pdjEnabled
  };
}

function formatPrice(price) {
  return price.toFixed(2).replace('.', ',') + ' €';
}

function createInvoice() {
  const nom = document.getElementById('nom').value;
  const email = document.getElementById('email').value;
  const adresse = document.getElementById('adresse').value;

  if (!nom) {
    showToast('Veuillez remplir le nom du client', 'error');
    return;
  }

  // Create simulated invoice
  const totals = calculatePreview();
  const invoiceId = config.nextInvoiceNumber.toString();

  const newInvoice = {
    id: invoiceId,
    client: nom,
    email: email,
    address: adresse,
    total: totals.totalTTC,
    date: new Date().toISOString().split('T')[0],
    status: 'pending'
  };

  mockInvoices.unshift(newInvoice);
  config.nextInvoiceNumber++;

  showToast('Facture générée avec succès !', 'success');
  loadHistory();

  // Populate PDF view
  populatePDF(newInvoice, totals);

  // Show PDF view
  document.getElementById('app').style.display = 'none';
  document.getElementById('facture-pdf').style.display = 'block';

  resetForm();
}

function populatePDF(invoice, totals) {
  document.getElementById('num-facture').textContent = invoice ? invoice.id : config.nextInvoiceNumber;
  document.getElementById('date-facture').textContent = new Date().toLocaleDateString('fr-FR');

  document.getElementById('client-nom').textContent = invoice ? invoice.client : document.getElementById('nom').value;
  document.getElementById('client-adresse').textContent = invoice ? invoice.address : document.getElementById('adresse').value;
  document.getElementById('client-email').textContent = invoice ? invoice.email : document.getElementById('email').value;

  if (!totals) totals = calculatePreview();

  // Build lines
  const roomSelects = document.querySelectorAll('.room-select');
  let linesHtml = '';

  // Rooms
  const uniqueRooms = {};
  roomSelects.forEach(select => {
    const type = select.options[select.selectedIndex].text.split(' - ')[0];
    const price = parseFloat(select.value);
    const key = `${type}-${price}`;
    if (!uniqueRooms[key]) {
      uniqueRooms[key] = { name: type, price: price, count: 0 };
    }
    uniqueRooms[key].count++;
  });

  for (const key in uniqueRooms) {
    const room = uniqueRooms[key];
    linesHtml += `
      <tr>
        <td style="text-align:left">${room.name} (${totals.nbNuits} nuits)</td>
        <td>${room.count}</td>
        <td>${formatPrice(room.price * totals.nbNuits)}</td>
        <td>${formatPrice(room.price * room.count * totals.nbNuits)}</td>
      </tr>
    `;
  }

  // PDJ
  if (totals.pdjEnabled) {
    linesHtml += `
      <tr>
        <td style="text-align:left">Petit-déjeuner</td>
        <td>${totals.nbClients * totals.nbNuits}</td>
        <td>${formatPrice(config.prixPDJ)}</td>
        <td>${formatPrice(totals.pdjTotal)}</td>
      </tr>
    `;
  }

  document.getElementById('ligne-facture').innerHTML = linesHtml;

  // Totals
  document.getElementById('total-ht').textContent = formatPrice(totals.totalHT);
  document.getElementById('tva-rate').textContent = config.tva;
  document.getElementById('tva').textContent = formatPrice(totals.tva);
  document.getElementById('taxe-sejour').textContent = formatPrice(totals.taxe);
  document.getElementById('total-ttc').innerHTML = `<strong>${formatPrice(totals.totalTTC)}</strong>`;
}

function generatePDF() {
  const element = document.getElementById('invoice-root');
  const opt = {
    margin: 0,
    filename: `facture_${document.getElementById('num-facture').textContent}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  // Hide buttons for PDF generation
  const buttons = document.querySelectorAll('.no-print');
  buttons.forEach(b => b.style.display = 'none');

  html2pdf().set(opt).from(element).save().then(() => {
    // Restore buttons
    buttons.forEach(b => b.style.display = '');
    showToast('PDF téléchargé !', 'success');
  });
}

function resetForm() {
  document.getElementById('facture-form').reset();
  document.getElementById('nb-chambres').value = 1;
  document.getElementById('nb-clients').value = 1;
  document.getElementById('nb-nuits').value = 1;
  document.getElementById('pdj-switch').checked = false;
  document.querySelector('.switch-text').textContent = 'Non';
  updateRoomList();
  calculatePreview();
}

function loadHistory() {
  const historyList = document.getElementById('history-list');
  if (!historyList) return;

  if (mockInvoices.length === 0) {
    historyList.innerHTML = '<div class="muted" style="padding:8px">Aucune facture enregistrée</div>';
    return;
  }

  historyList.innerHTML = mockInvoices.slice(0, 10).map(invoice => `
    <div class="history-item">
      <div style="flex:1">
        <div style="font-weight:600">${invoice.id}</div>
        <div class="muted" style="font-size:0.85rem">${invoice.client}</div>
        ${invoice.email ? `<div class="muted" style="font-size:0.8rem">${invoice.email}</div>` : ''}
      </div>
      <div style="display:flex; gap:6px">
        <button class="btn" style="padding:4px 8px; font-size:0.75rem" onclick="viewInvoice('${invoice.id}')">Voir</button>
        <button class="btn warn" style="padding:4px 8px; font-size:0.75rem" onclick="editInvoice('${invoice.id}')">Modifier</button>
        <button class="btn danger" style="padding:4px 8px; font-size:0.75rem" onclick="deleteInvoice('${invoice.id}')">×</button>
      </div>
    </div>
  `).join('');
}

function showAllInvoices() {
  document.getElementById('app').style.display = 'none';
  document.getElementById('factures-container').style.display = 'block';
  renderInvoices();
}

function renderInvoices(searchTerm = '') {
  const grid = document.getElementById('factures-grid');
  const list = document.getElementById('factures-list');

  const filtered = mockInvoices.filter(inv =>
    inv.client.toLowerCase().includes(searchTerm) ||
    inv.id.includes(searchTerm) ||
    (inv.email && inv.email.toLowerCase().includes(searchTerm))
  );

  // Render Grid
  grid.innerHTML = filtered.map(inv => `
    <div class="facture-card">
      <div class="facture-header">
        <div class="facture-num">#${inv.id}</div>
        <div class="facture-date">${new Date(inv.date).toLocaleDateString('fr-FR')}</div>
      </div>
      <div class="facture-client">
        <div class="client-name">${inv.client}</div>
        <div class="client-email">${inv.email || '-'}</div>
      </div>
      <div class="facture-total">${formatPrice(inv.total)}</div>
      <div class="facture-actions">
        <button class="btn secondary" onclick="viewInvoice('${inv.id}')">Voir</button>
        <button class="btn warn" onclick="editInvoice('${inv.id}')">Modifier</button>
      </div>
    </div>
  `).join('');

  // Render List
  list.innerHTML = filtered.map(inv => `
    <div class="facture-item">
      <div class="facture-num">#${inv.id}</div>
      <div class="facture-client">${inv.client}</div>
      <div class="facture-date">${new Date(inv.date).toLocaleDateString('fr-FR')}</div>
      <div class="facture-total">${formatPrice(inv.total)}</div>
      <button class="btn secondary" style="margin-left:auto" onclick="viewInvoice('${inv.id}')">Voir</button>
    </div>
  `).join('');

  if (filtered.length === 0) {
    grid.innerHTML = '<div class="empty-state">Aucune facture trouvée</div>';
    list.innerHTML = '<div class="empty-state">Aucune facture trouvée</div>';
  }
}

function viewInvoice(id) {
  const invoice = mockInvoices.find(inv => inv.id === id);
  if (invoice) {
    // If we're in "All Invoices" view, hide it
    document.getElementById('factures-container').style.display = 'none';

    // Switch to App view temporarily to use its logic (or directly to PDF)
    // For this demo, let's allow "Re-generation" of the PDF for this invoice
    // We mock the "totals" since we don't store them in mockInvoices detail

    // Mock standard totals for viewing old invoice
    const mockDetail = {
      nbNuits: 1, nbClients: 1, pdjEnabled: false,
      pdjTotal: 0, totalHT: invoice.total * 0.9, tva: invoice.total * 0.09, taxe: invoice.total * 0.01, totalTTC: invoice.total
    };

    populatePDF(invoice, mockDetail);

    document.getElementById('app').style.display = 'none';
    document.getElementById('facture-pdf').style.display = 'block';

    showToast('Visualisation de la facture ' + id, 'info');
  }
}

function editInvoice(id) {
  showToast('Fonctionnalité d\'édition (DEMO)', 'info');
}

function deleteInvoice(id) {
  if (confirm('Supprimer cette facture (DEMO)?')) {
    const index = mockInvoices.findIndex(inv => inv.id === id);
    if (index > -1) {
      mockInvoices.splice(index, 1);
      loadHistory();
      renderInvoices(); // Refresh if in all invoices view
      showToast('Facture supprimée (DEMO)', 'success');
    }
  }
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.style.cssText = `
    background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    margin-bottom: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Make functions global for onclick handlers
window.viewInvoice = viewInvoice;
window.editInvoice = editInvoice;
window.deleteInvoice = deleteInvoice;
window.generatePDF = generatePDF;
window.exportData = () => showToast('Export CSV simulé (DEMO)', 'info');
window.exportDataExcel = () => showToast('Export Excel simulé (DEMO)', 'info');
