// app.js – Mockup gestion de stock, navigation, données fictives, modales

// Données fictives
const demoData = {
  users: [
    { id: 1, name: "Alice Martin", email: "alice@magasin.com", role: "Admin" },
    { id: 2, name: "Bob Dupont", email: "bob@magasin.com", role: "Utilisateur" }
  ],
  stores: [
    { id: 1, name: "Magasin Central", location: "Paris" },
    { id: 2, name: "Dépôt Sud", location: "Lyon" }
  ],
  parts: [
    { id: 1, name: "Filtre à huile", ref: "FILT-001", stock: 12, storeId: 1 },
    { id: 2, name: "Courroie alternateur", ref: "COUR-002", stock: 5, storeId: 1 },
    { id: 3, name: "Ampoule H7", ref: "AMPO-003", stock: 30, storeId: 2 }
  ],
  stockMovements: [
    { id: 1, partId: 1, type: "Entrée", qty: 10, date: "2026-01-10", userId: 1 },
    { id: 2, partId: 2, type: "Sortie", qty: 2, date: "2026-01-12", userId: 2 },
    { id: 3, partId: 3, type: "Entrée", qty: 30, date: "2026-01-15", userId: 1 }
  ]
};

let data = JSON.parse(JSON.stringify(demoData));
let currentScreen = "dashboard";

function render() {
  console.log("render() called, currentScreen:", currentScreen);
  const main = document.getElementById("main-content");
  console.log("main element in render:", main);
  
  if (!main) {
    console.error("main-content element not found!");
    return;
  }
  
  switch (currentScreen) {
    case "dashboard": renderDashboard(main); break;
    case "parts": renderParts(main); break;
    case "stores": renderStores(main); break;
    case "users": renderUsers(main); break;
    case "demo": resetDemo(); break;
    default: main.innerHTML = "<div>Écran inconnu</div>";
  }
  console.log("render() complete, main.innerHTML length:", main.innerHTML.length);
}

function setScreen(screen) {
  currentScreen = screen;
  document.querySelectorAll('.menu-item').forEach(item => {
    item.classList.toggle('active', item.dataset.screen === screen);
  });
  render();
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content Loaded");
  const main = document.getElementById("main-content");
  console.log("main-content element:", main);
  
  document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => setScreen(item.dataset.screen));
  });
  
  console.log("Starting initial render...");
  render();
  console.log("Initial render complete");
});

// Dashboard
function renderDashboard(main) {
  const lowStock = data.parts.filter(p => p.stock < 10);
  main.innerHTML = `
    <h1>Accueil</h1>
    <div class="card">
      <div class="alert"><span class="icon">⚠️</span> <b>${lowStock.length}</b> pièce(s) en stock faible</div>
      <div style="display:flex;gap:32px;flex-wrap:wrap;">
        <div>
          <div class="badge">${data.parts.length} pièces</div>
          <div class="label">Total pièces</div>
        </div>
        <div>
          <div class="badge">${data.stores.length} magasins</div>
          <div class="label">Total magasins</div>
        </div>
        <div>
          <div class="badge">${data.users.length} utilisateurs</div>
          <div class="label">Utilisateurs</div>
        </div>
      </div>
    </div>
    <div class="card">
      <h2>Alertes stock faible</h2>
      <ul>
        ${lowStock.map(p => `<li>${p.name} (${p.ref}) – <b>${p.stock}</b> en stock</li>`).join('') || '<li>Aucune alerte</li>'}
      </ul>
    </div>
  `;
}

// Pièces
function renderParts(main) {
  main.innerHTML = `
    <h1>Pièces</h1>
    <button class="button" onclick="openPartModal()">+ Ajouter une pièce</button>
    <div class="card" style="margin-top:18px;overflow-x:auto;">
      <table class="table">
        <thead><tr><th>Nom</th><th>Référence</th><th>Stock</th><th>Magasin</th><th></th></tr></thead>
        <tbody>
          ${data.parts.map(p => `
            <tr>
              <td>${p.name}</td>
              <td>${p.ref}</td>
              <td>${p.stock}</td>
              <td>${storeName(p.storeId)}</td>
              <td><button class="button" style="padding:6px 14px;font-size:0.95em;" onclick="openPartDetail(${p.id})">Détail</button></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}
function storeName(id) {
  const s = data.stores.find(s => s.id === id);
  return s ? s.name : "?";
}

// Détail pièce (modale)
function openPartDetail(id) {
  const part = data.parts.find(p => p.id === id);
  if (!part) return;
  const movements = data.stockMovements.filter(m => m.partId === id);
  showModal(`
    <h2>${part.name} <span class="badge">${part.ref}</span></h2>
    <div style="margin-bottom:12px;">Stock actuel : <b>${part.stock}</b> en <b id='store-editable'>${storeName(part.storeId)}</b>
      <button class="button" style="margin-left:10px;padding:4px 12px;font-size:0.95em;" onclick="openEditStoreModal(${part.id})">Modifier magasin</button>
    </div>
    <button class="button" onclick="openStockMovementModal(${id})">+ Mouvement de stock</button>
    <h3 style="margin-top:24px;">Historique des mouvements</h3>
    <table class="table">
      <thead><tr><th>Date</th><th>Type</th><th>Qté</th><th>Utilisateur</th><th>Magasin</th></tr></thead>
      <tbody>
        ${movements.map(m => {
          const p = data.parts.find(pp => pp.id === m.partId);
          return `<tr>
            <td>${m.date}</td>
            <td>${m.type}</td>
            <td>${m.qty}</td>
            <td>${userName(m.userId)}</td>
            <td>${storeName(p ? p.storeId : '?')}</td>
          </tr>`;
        }).join('') || '<tr><td colspan="5">Aucun mouvement</td></tr>'}
      </tbody>
    </table>
  `);

}

// Edition du magasin d'une pièce (modale)
function openEditStoreModal(partId) {
  const part = data.parts.find(p => p.id === partId);
  if (!part) return;
  showModal(`
    <h2>Changer le magasin de la pièce</h2>
    <form id="edit-store-form">
      <label class="label">Magasin</label>
      <select class="select" name="storeId" required>
        ${data.stores.map(s => `<option value="${s.id}" ${s.id === part.storeId ? 'selected' : ''}>${s.name}</option>`).join('')}
      </select>
      <button class="button" type="submit">Valider</button>
    </form>
  `);
  document.getElementById('edit-store-form').onsubmit = function(e) {
    e.preventDefault();
    const form = e.target;
    part.storeId = parseInt(form.storeId.value, 10);
    closeModal();
    openPartDetail(partId);
  };
}
function userName(id) {
  const u = data.users.find(u => u.id === id);
  return u ? u.name : "?";
}

// Mouvement de stock (modale)
function openStockMovementModal(partId) {
  const part = data.parts.find(p => p.id === partId);
  if (!part) return;
  showModal(`
    <h2>Mouvement de stock – ${part.name}</h2>
    <form id="stock-move-form">
      <label class="label">Type</label>
      <select class="select" name="type" required>
        <option value="Entrée">Entrée</option>
        <option value="Sortie">Sortie</option>
      </select>
      <label class="label">Quantité</label>
      <input class="input" name="qty" type="number" min="1" max="999" required />
      <label class="label">Utilisateur</label>
      <select class="select" name="userId" required>
        ${data.users.map(u => `<option value="${u.id}">${u.name}</option>`).join('')}
      </select>
      <button class="button" type="submit">Valider</button>
    </form>
  `);
  document.getElementById('stock-move-form').onsubmit = function(e) {
    e.preventDefault();
    const form = e.target;
    const type = form.type.value;
    const qty = parseInt(form.qty.value, 10);
    const userId = parseInt(form.userId.value, 10);
    if (type === "Sortie" && qty > part.stock) {
      alert("Stock insuffisant");
      return;
    }
    if (type === "Entrée") part.stock += qty;
    else part.stock -= qty;
    data.stockMovements.push({
      id: data.stockMovements.length + 1,
      partId: part.id,
      type, qty,
      date: new Date().toISOString().slice(0,10),
      userId
    });
    closeModal();
    render();
  };
}

// Ajout pièce (modale)
function openPartModal() {
  showModal(`
    <h2>Ajouter une pièce</h2>
    <form id="add-part-form">
      <label class="label">Nom</label>
      <input class="input" name="name" required />
      <label class="label">Référence</label>
      <input class="input" name="ref" required />
      <label class="label">Stock initial</label>
      <input class="input" name="stock" type="number" min="0" required />
      <label class="label">Magasin</label>
      <select class="select" name="storeId" required>
        ${data.stores.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
      </select>
      <button class="button" type="submit">Ajouter</button>
    </form>
  `);
  document.getElementById('add-part-form').onsubmit = function(e) {
    e.preventDefault();
    const form = e.target;
    data.parts.push({
      id: data.parts.length + 1,
      name: form.name.value,
      ref: form.ref.value,
      stock: parseInt(form.stock.value, 10),
      storeId: parseInt(form.storeId.value, 10)
    });
    closeModal();
    render();
  };
}

// Magasins
function renderStores(main) {
  main.innerHTML = `
    <h1>Magasins</h1>
    <button class="button" onclick="openStoreModal()">+ Ajouter un magasin</button>
    <div class="card" style="margin-top:18px;overflow-x:auto;">
      <table class="table">
        <thead><tr><th>Nom</th><th>Localisation</th></tr></thead>
        <tbody>
          ${data.stores.map(s => `
            <tr>
              <td>${s.name}</td>
              <td>${s.location}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}
function openStoreModal() {
  showModal(`
    <h2>Ajouter un magasin</h2>
    <form id="add-store-form">
      <label class="label">Nom</label>
      <input class="input" name="name" required />
      <label class="label">Localisation</label>
      <input class="input" name="location" required />
      <button class="button" type="submit">Ajouter</button>
    </form>
  `);
  document.getElementById('add-store-form').onsubmit = function(e) {
    e.preventDefault();
    const form = e.target;
    data.stores.push({
      id: data.stores.length + 1,
      name: form.name.value,
      location: form.location.value
    });
    closeModal();
    render();
  };
}

// Utilisateurs
function renderUsers(main) {
  main.innerHTML = `
    <h1>Utilisateurs</h1>
    <button class="button" onclick="openUserModal()">+ Ajouter un utilisateur</button>
    <div class="card" style="margin-top:18px;overflow-x:auto;">
      <table class="table">
        <thead><tr><th>Nom</th><th>Email</th><th>Rôle</th></tr></thead>
        <tbody>
          ${data.users.map(u => `
            <tr>
              <td>${u.name}</td>
              <td>${u.email}</td>
              <td>${u.role}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}
function openUserModal() {
  showModal(`
    <h2>Ajouter un utilisateur</h2>
    <form id="add-user-form">
      <label class="label">Nom</label>
      <input class="input" name="name" required />
      <label class="label">Email</label>
      <input class="input" name="email" type="email" required />
      <label class="label">Rôle</label>
      <select class="select" name="role" required>
        <option value="Admin">Admin</option>
        <option value="Utilisateur">Utilisateur</option>
      </select>
      <button class="button" type="submit">Ajouter</button>
    </form>
  `);
  document.getElementById('add-user-form').onsubmit = function(e) {
    e.preventDefault();
    const form = e.target;
    data.users.push({
      id: data.users.length + 1,
      name: form.name.value,
      email: form.email.value,
      role: form.role.value
    });
    closeModal();
    render();
  };
}

// Modale générique
function showModal(html) {
  const root = document.getElementById('modal-root');
  root.innerHTML = `<div class="modal">${html}<div style="text-align:right;margin-top:18px;"><button class="button" onclick="closeModal()">Fermer</button></div></div>`;
  root.classList.add('active');
  // Ajout : fermeture de la modale au clic sur le fond
  root.onclick = function(e) {
    if (e.target === root) closeModal();
  };
}
function closeModal() {
  const root = document.getElementById('modal-root');
  root.classList.remove('active');
  setTimeout(() => { root.innerHTML = ''; root.onclick = null; }, 200);
}

// Mode démo (reset)
function resetDemo() {
  if (confirm("Réinitialiser toutes les données fictives ?")) {
    data = JSON.parse(JSON.stringify(demoData));
    setScreen("dashboard");
  } else {
    setScreen("dashboard");
  }
}

// Pour accès global depuis HTML
window.openPartDetail = openPartDetail;
window.openStockMovementModal = openStockMovementModal;
window.openPartModal = openPartModal;
window.openStoreModal = openStoreModal;
window.openUserModal = openUserModal;
window.closeModal = closeModal;
window.openEditStoreModal = openEditStoreModal;
