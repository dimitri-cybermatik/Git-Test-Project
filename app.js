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
  
  // Éléments du DOM
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileOverlay = document.getElementById('mobile-overlay');
  
  // ===== MENU MOBILE HAMBURGER =====
  function openMobileMenu() {
    sidebar.classList.add('mobile-open');
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  function closeMobileMenu() {
    sidebar.classList.remove('mobile-open');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  function toggleMobileMenu() {
    if (sidebar.classList.contains('mobile-open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }
  
  // Bouton hamburger
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }
  
  // Fermer en cliquant sur l'overlay
  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }
  
  // Sidebar toggle (desktop only)
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('retracted');
    });
  }
  
  // Gestion responsive
  function handleResize() {
    if (window.innerWidth <= 800) {
      // Mobile : fermer la sidebar par défaut
      sidebar.classList.remove('retracted');
      closeMobileMenu();
    } else {
      // Desktop : réinitialiser
      sidebar.classList.remove('mobile-open');
      mobileOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
  handleResize();
  window.addEventListener('resize', handleResize);

  // Fermer le menu mobile quand on clique sur un item
  document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
      setScreen(item.dataset.screen);
      // Fermer le menu mobile après sélection
      if (window.innerWidth <= 800) {
        closeMobileMenu();
      }
    });
  });

  // Footer dynamique – Version Amazing
  function updateFooter() {
    const footer = document.getElementById('footer');
    if (!footer) return;
    const nbPieces = data.parts.length;
    const nbAlertes = data.parts.filter(p => p.stock < 10).length;
    const totalStock = data.parts.reduce((acc, p) => acc + p.stock, 0);
    const version = 'v2.0.0 ✨';
    
    const alerteStyle = nbAlertes > 0 
      ? 'background: linear-gradient(135deg, rgba(239,68,68,0.2), rgba(245,158,11,0.2)); border: 1px solid rgba(239,68,68,0.3);'
      : 'background: rgba(16,185,129,0.15); border: 1px solid rgba(16,185,129,0.3);';
    
    footer.innerHTML = `
      <span>📦 <b>${nbPieces}</b> pièces</span>
      <span>📊 <b>${totalStock}</b> en stock</span>
      <span style="${alerteStyle}">${nbAlertes > 0 ? '⚠️' : '✅'} <b>${nbAlertes}</b> alerte(s)</span>
      <span>🔖 ${version}</span>
      <span>💜 Créé avec amour</span>
    `;
  }
  updateFooter();
  // Mettre à jour le footer à chaque changement d'écran ou de données
  const origRender = render;
  render = function() {
    origRender.apply(this, arguments);
    updateFooter();
  };

  console.log("Starting initial render...");
  render();
  console.log("Initial render complete");
});

// Dashboard – Version Amazing Colorée
function renderDashboard(main) {
  const lowStock = data.parts.filter(p => p.stock < 10);
  const totalStock = data.parts.reduce((acc, p) => acc + p.stock, 0);
  const recentMovements = data.stockMovements.slice(-3).reverse();
  
  main.innerHTML = `
    <h1>🎯 Tableau de Bord</h1>
    
    <!-- Stats Cards Colorées -->
    <div class="stats-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:24px; margin-bottom:32px;">
      <div class="stat-card" style="background: linear-gradient(145deg, #fff 0%, rgba(99, 102, 241, 0.08) 100%); border: 2px solid rgba(99, 102, 241, 0.25); border-radius:20px; padding:28px; text-align:center; transition: all 0.3s ease;">
        <div style="font-size:2.8rem; margin-bottom:8px;">📦</div>
        <div style="font-size:2.2rem; font-weight:800; background: linear-gradient(135deg, #6366f1, #8b5cf6); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">${data.parts.length}</div>
        <div style="color:#64748b; font-weight:600; text-transform:uppercase; letter-spacing:0.5px; font-size:0.85rem;">Pièces</div>
      </div>
      
      <div class="stat-card" style="background: linear-gradient(145deg, #fff 0%, rgba(16, 185, 129, 0.08) 100%); border: 2px solid rgba(16, 185, 129, 0.25); border-radius:20px; padding:28px; text-align:center; transition: all 0.3s ease;">
        <div style="font-size:2.8rem; margin-bottom:8px;">🏬</div>
        <div style="font-size:2.2rem; font-weight:800; background: linear-gradient(135deg, #10b981, #06b6d4); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">${data.stores.length}</div>
        <div style="color:#64748b; font-weight:600; text-transform:uppercase; letter-spacing:0.5px; font-size:0.85rem;">Magasins</div>
      </div>
      
      <div class="stat-card" style="background: linear-gradient(145deg, #fff 0%, rgba(236, 72, 153, 0.08) 100%); border: 2px solid rgba(236, 72, 153, 0.25); border-radius:20px; padding:28px; text-align:center; transition: all 0.3s ease;">
        <div style="font-size:2.8rem; margin-bottom:8px;">👥</div>
        <div style="font-size:2.2rem; font-weight:800; background: linear-gradient(135deg, #ec4899, #f59e0b); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">${data.users.length}</div>
        <div style="color:#64748b; font-weight:600; text-transform:uppercase; letter-spacing:0.5px; font-size:0.85rem;">Utilisateurs</div>
      </div>
      
      <div class="stat-card" style="background: linear-gradient(145deg, #fff 0%, rgba(139, 92, 246, 0.08) 100%); border: 2px solid rgba(139, 92, 246, 0.25); border-radius:20px; padding:28px; text-align:center; transition: all 0.3s ease;">
        <div style="font-size:2.8rem; margin-bottom:8px;">📊</div>
        <div style="font-size:2.2rem; font-weight:800; background: linear-gradient(135deg, #8b5cf6, #6366f1); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">${totalStock}</div>
        <div style="color:#64748b; font-weight:600; text-transform:uppercase; letter-spacing:0.5px; font-size:0.85rem;">Stock Total</div>
      </div>
    </div>
    
    <!-- Alerte Stock -->
    ${lowStock.length > 0 ? `
      <div class="alert" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 2px solid #f59e0b; border-radius:16px; padding:20px 28px; margin-bottom:28px; box-shadow: 0 4px 15px rgba(245, 158, 11, 0.25);">
        <span class="icon" style="font-size:1.6em; margin-right:16px;">⚠️</span>
        <div>
          <strong style="font-size:1.1em;">Attention !</strong> 
          <span style="margin-left:8px;">${lowStock.length} pièce(s) en stock faible nécessitent votre attention</span>
        </div>
      </div>
    ` : `
      <div style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); border: 2px solid #10b981; border-radius:16px; padding:20px 28px; margin-bottom:28px; display:flex; align-items:center; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.2);">
        <span style="font-size:1.6em; margin-right:16px;">✅</span>
        <div><strong>Parfait !</strong> Tous les stocks sont à un niveau optimal</div>
      </div>
    `}
    
    <!-- Grille de contenu -->
    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:28px;">
      
      <!-- Alertes Stock Faible -->
      <div class="card" style="position:relative; overflow:hidden;">
        <div style="position:absolute; top:0; left:0; right:0; height:4px; background: linear-gradient(90deg, #f59e0b, #ef4444);"></div>
        <h2 style="display:flex; align-items:center; gap:12px; margin-top:8px;">
          <span style="font-size:1.4em;">🔔</span> Alertes Stock
        </h2>
        ${lowStock.length > 0 ? `
          <ul style="list-style:none; padding:0; margin:0;">
            ${lowStock.map(p => `
              <li style="display:flex; align-items:center; justify-content:space-between; padding:14px 16px; margin:8px 0; background: linear-gradient(90deg, rgba(239, 68, 68, 0.08), rgba(245, 158, 11, 0.05)); border-radius:12px; border-left:4px solid #ef4444;">
                <div>
                  <strong style="color:#1e1b4b;">${p.name}</strong>
                  <span style="color:#64748b; font-size:0.9em; margin-left:8px;">(${p.ref})</span>
                </div>
                <span style="background: linear-gradient(135deg, #ef4444, #f59e0b); color:#fff; padding:6px 14px; border-radius:20px; font-weight:700; font-size:0.9em;">${p.stock} en stock</span>
              </li>
            `).join('')}
          </ul>
        ` : `
          <div style="text-align:center; padding:32px; color:#64748b;">
            <div style="font-size:3rem; margin-bottom:12px;">🎉</div>
            <p>Aucune alerte ! Tous les stocks sont suffisants.</p>
          </div>
        `}
      </div>
      
      <!-- Mouvements Récents -->
      <div class="card" style="position:relative; overflow:hidden;">
        <div style="position:absolute; top:0; left:0; right:0; height:4px; background: linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899);"></div>
        <h2 style="display:flex; align-items:center; gap:12px; margin-top:8px;">
          <span style="font-size:1.4em;">📈</span> Derniers Mouvements
        </h2>
        ${recentMovements.length > 0 ? `
          <ul style="list-style:none; padding:0; margin:0;">
            ${recentMovements.map(m => {
              const part = data.parts.find(p => p.id === m.partId);
              const isEntree = m.type === 'Entrée';
              return `
                <li style="display:flex; align-items:center; justify-content:space-between; padding:14px 16px; margin:8px 0; background: ${isEntree ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)'}; border-radius:12px; border-left:4px solid ${isEntree ? '#10b981' : '#ef4444'};">
                  <div>
                    <strong style="color:#1e1b4b;">${part ? part.name : 'Pièce inconnue'}</strong>
                    <span style="color:#64748b; font-size:0.85em; display:block; margin-top:4px;">${m.date}</span>
                  </div>
                  <span style="background: ${isEntree ? 'linear-gradient(135deg, #10b981, #06b6d4)' : 'linear-gradient(135deg, #ef4444, #f59e0b)'}; color:#fff; padding:6px 14px; border-radius:20px; font-weight:700; font-size:0.9em;">${isEntree ? '+' : '-'}${m.qty}</span>
                </li>
              `;
            }).join('')}
          </ul>
        ` : `
          <div style="text-align:center; padding:32px; color:#64748b;">
            <div style="font-size:3rem; margin-bottom:12px;">📋</div>
            <p>Aucun mouvement récent</p>
          </div>
        `}
      </div>
      
    </div>
    
    <!-- Actions Rapides -->
    <div class="card" style="margin-top:28px; position:relative; overflow:hidden;">
      <div style="position:absolute; top:0; left:0; right:0; height:4px; background: linear-gradient(90deg, #10b981, #06b6d4, #6366f1);"></div>
      <h2 style="display:flex; align-items:center; gap:12px; margin-top:8px;">
        <span style="font-size:1.4em;">⚡</span> Actions Rapides
      </h2>
      <div style="display:flex; flex-wrap:wrap; gap:16px; margin-top:16px;">
        <button class="button" onclick="setScreen('parts')" style="display:flex; align-items:center; gap:10px;">
          <span style="font-size:1.2em;">📦</span> Gérer les Pièces
        </button>
        <button class="button" onclick="setScreen('stores')" style="display:flex; align-items:center; gap:10px; background: linear-gradient(135deg, #10b981, #06b6d4);">
          <span style="font-size:1.2em;">🏬</span> Voir les Magasins
        </button>
        <button class="button" onclick="setScreen('users')" style="display:flex; align-items:center; gap:10px; background: linear-gradient(135deg, #ec4899, #f59e0b);">
          <span style="font-size:1.2em;">👥</span> Gérer les Utilisateurs
        </button>
      </div>
    </div>
  `;
  
  // Ajouter des animations au survol des stat-cards
  document.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.02)';
      card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
      card.style.boxShadow = 'none';
    });
  });
}

// Pièces – Version Amazing Colorée
function renderParts(main) {
  main.innerHTML = `
    <h1>📦 Gestion des Pièces</h1>
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; margin-bottom:24px;">
      <button class="button" onclick="openPartModal()" style="display:flex; align-items:center; gap:10px;">
        <span style="font-size:1.2em;">➕</span> Ajouter une pièce
      </button>
      <div style="display:flex; align-items:center; gap:12px; color:#64748b;">
        <span style="background:linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1)); padding:8px 16px; border-radius:20px; font-weight:600;">
          📊 ${data.parts.length} pièce(s) au total
        </span>
      </div>
    </div>
    <div class="card" style="margin-top:18px;overflow-x:auto; position:relative;">
      <div style="position:absolute; top:0; left:0; right:0; height:4px; background: linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899);"></div>
      <table class="table" style="margin-top:8px;">
        <thead>
          <tr>
            <th style="border-radius:12px 0 0 0;">📋 Nom</th>
            <th>🔖 Référence</th>
            <th>📦 Stock</th>
            <th>🏬 Magasin</th>
            <th style="border-radius:0 12px 0 0; text-align:center;">⚡ Actions</th>
          </tr>
        </thead>
        <tbody>
          ${data.parts.map(p => {
            const stockClass = p.stock < 10 ? 'background: linear-gradient(135deg, #ef4444, #f59e0b); color:#fff;' : 'background: linear-gradient(135deg, #10b981, #06b6d4); color:#fff;';
            return `
            <tr style="transition: all 0.2s ease;">
              <td style="font-weight:600; color:#1e1b4b;">${p.name}</td>
              <td><span style="background:rgba(99,102,241,0.1); padding:4px 12px; border-radius:8px; color:#6366f1; font-weight:500;">${p.ref}</span></td>
              <td><span style="${stockClass} padding:6px 14px; border-radius:20px; font-weight:700; font-size:0.9em;">${p.stock}</span></td>
              <td style="color:#64748b;">${storeName(p.storeId)}</td>
              <td style="text-align:center;">
                <button class="button" style="padding:10px 20px; font-size:0.9em; background: linear-gradient(135deg, #8b5cf6, #ec4899);" onclick="openPartDetail(${p.id})">
                  👁️ Détail
                </button>
              </td>
            </tr>
          `}).join('')}
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

// Magasins – Version Amazing Colorée
function renderStores(main) {
  main.innerHTML = `
    <h1>🏬 Gestion des Magasins</h1>
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; margin-bottom:24px;">
      <button class="button" onclick="openStoreModal()" style="display:flex; align-items:center; gap:10px; background: linear-gradient(135deg, #10b981, #06b6d4);">
        <span style="font-size:1.2em;">➕</span> Ajouter un magasin
      </button>
      <div style="display:flex; align-items:center; gap:12px; color:#64748b;">
        <span style="background:linear-gradient(135deg, rgba(16,185,129,0.1), rgba(6,182,212,0.1)); padding:8px 16px; border-radius:20px; font-weight:600;">
          🏢 ${data.stores.length} magasin(s) actif(s)
        </span>
      </div>
    </div>
    
    <!-- Grille de Magasins -->
    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:24px;">
      ${data.stores.map((s, index) => {
        const colors = [
          { bg: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.3)', icon: '🏪' },
          { bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.3)', icon: '🏭' },
          { bg: 'rgba(236,72,153,0.08)', border: 'rgba(236,72,153,0.3)', icon: '🏬' },
          { bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.3)', icon: '🏗️' }
        ];
        const color = colors[index % colors.length];
        const partsInStore = data.parts.filter(p => p.storeId === s.id);
        const totalStock = partsInStore.reduce((acc, p) => acc + p.stock, 0);
        
        return `
          <div class="card" style="background: linear-gradient(145deg, #fff 0%, ${color.bg} 100%); border: 2px solid ${color.border}; position:relative; overflow:hidden;">
            <div style="position:absolute; top:0; left:0; right:0; height:4px; background: linear-gradient(90deg, #10b981, #06b6d4);"></div>
            <div style="display:flex; align-items:center; gap:16px; margin-bottom:16px; margin-top:8px;">
              <div style="font-size:2.5rem;">${color.icon}</div>
              <div>
                <h3 style="margin:0; color:#1e1b4b; font-size:1.3rem;">${s.name}</h3>
                <p style="margin:4px 0 0 0; color:#64748b; display:flex; align-items:center; gap:6px;">
                  <span>📍</span> ${s.location}
                </p>
              </div>
            </div>
            <div style="display:flex; gap:12px; flex-wrap:wrap;">
              <span style="background:rgba(99,102,241,0.15); color:#6366f1; padding:6px 14px; border-radius:12px; font-weight:600; font-size:0.85em;">
                📦 ${partsInStore.length} pièce(s)
              </span>
              <span style="background:rgba(16,185,129,0.15); color:#10b981; padding:6px 14px; border-radius:12px; font-weight:600; font-size:0.85em;">
                📊 ${totalStock} en stock
              </span>
            </div>
          </div>
        `;
      }).join('')}
    </div>
    
    <!-- Tableau récapitulatif -->
    <div class="card" style="margin-top:28px; position:relative; overflow:hidden;">
      <div style="position:absolute; top:0; left:0; right:0; height:4px; background: linear-gradient(90deg, #10b981, #06b6d4, #6366f1);"></div>
      <h2 style="display:flex; align-items:center; gap:12px; margin-top:8px;">
        <span style="font-size:1.3em;">📋</span> Vue Tableau
      </h2>
      <table class="table">
        <thead>
          <tr>
            <th style="border-radius:12px 0 0 0;">🏬 Nom</th>
            <th style="border-radius:0 12px 0 0;">📍 Localisation</th>
          </tr>
        </thead>
        <tbody>
          ${data.stores.map(s => `
            <tr>
              <td style="font-weight:600; color:#1e1b4b;">${s.name}</td>
              <td style="color:#64748b;">${s.location}</td>
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

// Utilisateurs – Version Amazing Colorée
function renderUsers(main) {
  main.innerHTML = `
    <h1>👥 Gestion des Utilisateurs</h1>
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; margin-bottom:24px;">
      <button class="button" onclick="openUserModal()" style="display:flex; align-items:center; gap:10px; background: linear-gradient(135deg, #ec4899, #f59e0b);">
        <span style="font-size:1.2em;">➕</span> Ajouter un utilisateur
      </button>
      <div style="display:flex; align-items:center; gap:12px; color:#64748b;">
        <span style="background:linear-gradient(135deg, rgba(236,72,153,0.1), rgba(245,158,11,0.1)); padding:8px 16px; border-radius:20px; font-weight:600;">
          👤 ${data.users.length} utilisateur(s) enregistré(s)
        </span>
      </div>
    </div>
    
    <!-- Grille d'Utilisateurs -->
    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:24px; margin-bottom:28px;">
      ${data.users.map((u, index) => {
        const avatars = ['👨‍💼', '👩‍💼', '👨‍💻', '👩‍💻', '🧑‍💼', '🧑‍💻'];
        const avatar = avatars[index % avatars.length];
        const isAdmin = u.role === 'Admin';
        const roleStyle = isAdmin 
          ? 'background: linear-gradient(135deg, #6366f1, #8b5cf6); color:#fff;'
          : 'background: linear-gradient(135deg, #10b981, #06b6d4); color:#fff;';
        
        return `
          <div class="card" style="position:relative; overflow:hidden; transition: all 0.3s ease;">
            <div style="position:absolute; top:0; left:0; right:0; height:4px; background: ${isAdmin ? 'linear-gradient(90deg, #6366f1, #8b5cf6)' : 'linear-gradient(90deg, #10b981, #06b6d4)'};"></div>
            <div style="display:flex; align-items:center; gap:18px; margin-top:8px;">
              <div style="width:60px; height:60px; background: linear-gradient(135deg, rgba(99,102,241,0.1), rgba(236,72,153,0.1)); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:2rem;">
                ${avatar}
              </div>
              <div style="flex:1;">
                <h3 style="margin:0 0 4px 0; color:#1e1b4b; font-size:1.2rem;">${u.name}</h3>
                <p style="margin:0; color:#64748b; font-size:0.9em; display:flex; align-items:center; gap:6px;">
                  <span>📧</span> ${u.email}
                </p>
              </div>
            </div>
            <div style="margin-top:16px; display:flex; align-items:center; justify-content:space-between;">
              <span style="${roleStyle} padding:8px 18px; border-radius:20px; font-weight:600; font-size:0.85em; display:flex; align-items:center; gap:6px;">
                ${isAdmin ? '👑' : '👤'} ${u.role}
              </span>
              <span style="color:#94a3b8; font-size:0.8em;">ID: ${u.id}</span>
            </div>
          </div>
        `;
      }).join('')}
    </div>
    
    <!-- Tableau récapitulatif -->
    <div class="card" style="position:relative; overflow:hidden;">
      <div style="position:absolute; top:0; left:0; right:0; height:4px; background: linear-gradient(90deg, #ec4899, #f59e0b, #10b981);"></div>
      <h2 style="display:flex; align-items:center; gap:12px; margin-top:8px;">
        <span style="font-size:1.3em;">📋</span> Liste Complète
      </h2>
      <div style="overflow-x:auto;">
        <table class="table">
          <thead>
            <tr>
              <th style="border-radius:12px 0 0 0;">👤 Nom</th>
              <th>📧 Email</th>
              <th style="border-radius:0 12px 0 0;">🏷️ Rôle</th>
            </tr>
          </thead>
          <tbody>
            ${data.users.map(u => {
              const isAdmin = u.role === 'Admin';
              const roleStyle = isAdmin 
                ? 'background: linear-gradient(135deg, #6366f1, #8b5cf6); color:#fff;'
                : 'background: linear-gradient(135deg, #10b981, #06b6d4); color:#fff;';
              return `
              <tr>
                <td style="font-weight:600; color:#1e1b4b;">${u.name}</td>
                <td style="color:#64748b;">${u.email}</td>
                <td><span style="${roleStyle} padding:6px 14px; border-radius:16px; font-weight:600; font-size:0.85em;">${u.role}</span></td>
              </tr>
            `}).join('')}
          </tbody>
        </table>
      </div>
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
window.setScreen = setScreen;
