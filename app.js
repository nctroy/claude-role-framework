// State Management
const state = {
    domains: {}, // id -> domain
    roles: {},   // id -> role
    selectedRoles: new Set(),
    activeItem: null // currently viewed item
};

// DOM Elements
const elements = {
    treeView: document.getElementById('tree-view'),
    contentArea: document.getElementById('details-view'),
    welcomeMsg: document.getElementById('welcome-message'),
    folderInput: document.getElementById('folder-input'),
    loadDemoBtn: document.getElementById('load-demo-btn'),
    searchInput: document.getElementById('search-input'),
    skillGraph: document.getElementById('skill-graph-container'),
    selectedRolesList: document.getElementById('selected-roles-list'),
    compositionControls: document.getElementById('composition-controls'),
    selectedCount: document.getElementById('selected-count'),
    clearSelectionBtn: document.getElementById('clear-selection-btn'),
    statsSummary: document.getElementById('stats-summary')
};

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Check for pre-loaded data (from generate_data.py)
    if (window.CRF_DATA) {
        loadData(window.CRF_DATA.domains, window.CRF_DATA.roles);
    }

    // Event Listeners
    elements.folderInput.addEventListener('change', handleFileSelect);
    elements.loadDemoBtn.addEventListener('click', () => {
        if (window.CRF_DATA) {
            loadData(window.CRF_DATA.domains, window.CRF_DATA.roles);
        } else {
            alert('Demo data not found. Please run the generation script or load a folder.');
        }
    });
    
    elements.searchInput.addEventListener('input', (e) => filterTree(e.target.value));
    elements.clearSelectionBtn.addEventListener('click', clearSelection);
});

// Data Loading Logic
function loadData(domainsList, rolesList) {
    // Reset state
    state.domains = {};
    state.roles = {};
    state.selectedRoles.clear();
    state.activeItem = null;

    // Index data
    domainsList.forEach(d => state.domains[d.id] = d);
    rolesList.forEach(r => state.roles[r.id] = r);

    renderTree();
    updateVisualization();
    showWelcome();
}

async function handleFileSelect(event) {
    const files = Array.from(event.target.files);
    const jsonFiles = files.filter(f => f.name.endsWith('.json'));
    
    if (jsonFiles.length === 0) {
        alert('No JSON files found in selected directory.');
        return;
    }

    const domainsList = [];
    const rolesList = [];

    // Read files
    const promises = jsonFiles.map(file => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const content = JSON.parse(e.target.result);
                    // Determine type based on content or filename
                    if (file.name === 'domain.json' || content.roles) {
                        domainsList.push(content);
                    } else {
                        rolesList.push(content);
                    }
                    resolve();
                } catch (err) {
                    console.error('Error parsing ' + file.name, err);
                    resolve(); // Skip error files
                }
            };
            reader.readAsText(file);
        });
    });

    await Promise.all(promises);
    loadData(domainsList, rolesList);
}

// Rendering Logic
function renderTree() {
    elements.treeView.innerHTML = '';
    
    // Group roles by domain
    const domainsSorted = Object.values(state.domains).sort((a, b) => a.name.localeCompare(b.name));
    
    // Handle orphan roles (if any)
    const orphans = Object.values(state.roles).filter(r => !state.domains[r.domain]);
    if (orphans.length > 0) {
        domainsSorted.push({ id: '_orphans', name: 'Other Roles', roles: orphans.map(r => r.id) });
    }

    domainsSorted.forEach(domain => {
        const group = document.createElement('div');
        group.className = 'domain-group';
        
        const title = document.createElement('div');
        title.className = 'domain-title';
        title.textContent = domain.name;
        title.onclick = () => showDomainDetails(domain);
        group.appendChild(title);

        // Find roles for this domain
        const domainRoles = Object.values(state.roles)
            .filter(r => r.domain === domain.id)
            .sort((a, b) => a.name.localeCompare(b.name));

        domainRoles.forEach(role => {
            const item = document.createElement('div');
            item.className = 'role-item';
            item.dataset.id = role.id;
            
            const nameSpan = document.createElement('span');
            nameSpan.textContent = role.name;
            nameSpan.onclick = () => showRoleDetails(role);
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'checkbox-wrapper';
            checkbox.checked = state.selectedRoles.has(role.id);
            checkbox.onchange = (e) => toggleRoleSelection(role.id, e.target.checked);

            item.appendChild(checkbox);
            item.appendChild(nameSpan);
            group.appendChild(item);
        });

        elements.treeView.appendChild(group);
    });
}

function showWelcome() {
    elements.welcomeMsg.classList.remove('hidden');
    elements.contentArea.classList.add('hidden');
    elements.statsSummary.innerHTML = `
        <p>Loaded <strong>${Object.keys(state.domains).length}</strong> domains and <strong>${Object.keys(state.roles).length}</strong> roles.</p>
    `;
}

function showDomainDetails(domain) {
    state.activeItem = domain;
    updateActiveHighlight();
    elements.welcomeMsg.classList.add('hidden');
    elements.contentArea.classList.remove('hidden');

    let content = `
        <div class="detail-header">
            <div style="color: ${domain.metadata?.color || '#333'}">Domain</div>
            <h1>${domain.name}</h1>
            <p>${domain.description}</p>
        </div>
        <div class="section">
            <h3>Roles in this Domain</h3>
            <div class="skill-list">
                ${(domain.roles || []).map(rId => {
                    const r = state.roles[rId];
                    return r ? `<span class="skill-chip" onclick="showRoleDetails(state.roles['${rId}'])" style="cursor:pointer">${r.name}</span>` : '';
                }).join('')}
            </div>
        </div>
    `;
    elements.contentArea.innerHTML = content;
}

function showRoleDetails(role) {
    state.activeItem = role;
    updateActiveHighlight();
    elements.welcomeMsg.classList.add('hidden');
    elements.contentArea.classList.remove('hidden');

    const meta = role.metadata || {};
    const context = role.context || {};
    
    let content = `
        <div class="detail-header">
            <div style="color: ${meta.color || '#333'}">Role</div>
            <h1>${role.name}</h1>
            <p>${role.description}</p>
            <div style="margin-top:1rem">
                ${(meta.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}
            </div>
        </div>

        <div class="grid-2">
            <div>
                <h3>Skills</h3>
                <div class="skill-list">
                    ${(role.skills || []).map(s => `<span class="skill-chip">${s}</span>`).join('')}
                </div>
            </div>
            <div>
                <h3>MCPs</h3>
                <div class="mcp-list">
                    ${(role.mcps || []).map(m => `<span class="skill-chip highlight">${m}</span>`).join('')}
                </div>
            </div>
        </div>

        <div class="section">
            <h3>Context & Responsibilities</h3>
            <ul>
                ${(context.responsibilities || []).map(r => `<li>${r}</li>`).join('')}
            </ul>
        </div>
    `;
    elements.contentArea.innerHTML = content;
}

function updateActiveHighlight() {
    document.querySelectorAll('.role-item').forEach(el => {
        el.classList.toggle('active', state.activeItem && el.dataset.id === state.activeItem.id);
    });
}

// Composition Logic
function toggleRoleSelection(roleId, isSelected) {
    if (isSelected) {
        state.selectedRoles.add(roleId);
    } else {
        state.selectedRoles.delete(roleId);
    }
    updateCompositionUI();
    updateVisualization();
}

function clearSelection() {
    state.selectedRoles.clear();
    document.querySelectorAll('.role-item input[type="checkbox"]').forEach(cb => cb.checked = false);
    updateCompositionUI();
    updateVisualization();
}

function updateCompositionUI() {
    elements.selectedCount.textContent = state.selectedRoles.size;
    elements.compositionControls.classList.toggle('hidden', state.selectedRoles.size === 0);
    
    elements.selectedRolesList.innerHTML = '';
    state.selectedRoles.forEach(id => {
        const role = state.roles[id];
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${role.name}</span>
            <span class="remove-role" onclick="toggleRoleSelection('${id}', false); document.querySelector('.role-item[data-id=\'${id}\'] input').checked = false;">×</span>
        `;
        elements.selectedRolesList.appendChild(li);
    });

    // If roles selected, maybe show composition view?
    // For now, we'll keep showing the active detail, but the viz panel shows the combined skills.
}

// Visualization Logic
function updateVisualization() {
    // Determine which roles to analyze: selected roles if any, else ALL roles
    const usingSelected = state.selectedRoles.size > 0;
    const rolesToAnalyze = usingSelected 
        ? Array.from(state.selectedRoles).map(id => state.roles[id])
        : Object.values(state.roles);

    if (rolesToAnalyze.length === 0) return;

    // Count skills
    const skillCounts = {};
    let totalRoles = rolesToAnalyze.length;

    rolesToAnalyze.forEach(role => {
        (role.skills || []).forEach(skill => {
            skillCounts[skill] = (skillCounts[skill] || 0) + 1;
        });
    });

    // Sort by frequency
    const sortedSkills = Object.entries(skillCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15); // Top 15

    let html = `<h3>${usingSelected ? 'Combined Skills' : 'Top Reused Skills'}</h3>`;
    
    sortedSkills.forEach(([skill, count]) => {
        const percentage = Math.round((count / totalRoles) * 100);
        html += `
            <div class="skill-bar-container">
                <div class="skill-bar-label">
                    <span>${skill}</span>
                    <span>${count} (${percentage}%)</span>
                </div>
                <div class="skill-bar-bg">
                    <div class="skill-bar-fill" style="width: ${percentage}%"></div>
                </div>
            </div>
        `;
    });

    elements.skillGraph.innerHTML = html;
}

function filterTree(query) {
    query = query.toLowerCase();
    const groups = document.querySelectorAll('.domain-group');
    
    groups.forEach(group => {
        const roles = group.querySelectorAll('.role-item');
        let groupVisible = false;
        
        roles.forEach(roleEl => {
            const roleId = roleEl.dataset.id;
            const role = state.roles[roleId];
            // Search in name or skills
            const match = role.name.toLowerCase().includes(query) || 
                          (role.skills || []).some(s => s.toLowerCase().includes(query));
            
            roleEl.style.display = match ? 'flex' : 'none';
            if (match) groupVisible = true;
        });

        // Also check domain name
        const title = group.querySelector('.domain-title').textContent.toLowerCase();
        if (title.includes(query)) {
            groupVisible = true;
            roles.forEach(r => r.style.display = 'flex'); // Show all children if domain matches
        }
        
        group.style.display = groupVisible ? 'block' : 'none';
    });
}
