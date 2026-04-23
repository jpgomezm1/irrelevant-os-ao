// Caso viewer — loads metadata + artifacts, renders markdown, prev/next nav

let currentArtifacts = [];
let currentCaseName = null;
let currentArtifactKey = null;

(async function () {
  const path = window.location.pathname.split('/');
  const caseName = decodeURIComponent(path[path.length - 1]);
  currentCaseName = caseName;

  if (typeof marked !== 'undefined') {
    marked.setOptions({ gfm: true, breaks: false, headerIds: false, mangle: false });
  }

  try {
    const res = await fetch(`/api/caso/${encodeURIComponent(caseName)}`);
    if (!res.ok) throw new Error('Caso no encontrado');
    const data = await res.json();

    currentArtifacts = data.artifacts || [];
    renderMeta(data);
    renderNav(data.artifacts, caseName);

    const initialArtifact = window.location.hash.slice(1) || (data.artifacts[0] && data.artifacts[0].key);
    if (initialArtifact) {
      loadArtifact(caseName, initialArtifact);
    } else {
      document.getElementById('markdown-body').innerHTML = `
        <div class="empty-state">
          <h3>Este caso no tiene artefactos aún</h3>
          <p>Corre una skill en vivo para generar contenido.</p>
        </div>
      `;
    }
  } catch (err) {
    document.getElementById('markdown-body').innerHTML = `
      <div class="empty-state">
        <h3>Error cargando el caso</h3>
        <p>${err.message}</p>
        <p style="margin-top:12px;"><a href="/" style="color: var(--maya);">← Volver al dashboard</a></p>
      </div>
    `;
    document.getElementById('caso-nombre').textContent = 'Error';
  }
})();

function renderMeta(data) {
  const meta = data.meta || {};
  document.getElementById('bc-case-name').textContent = meta.nombre || data.id;
  document.getElementById('caso-nombre').textContent = meta.nombre || data.id;
  document.getElementById('caso-industria').textContent = meta.industria || '—';
  document.getElementById('caso-tipologia').textContent = meta.tipologia || '—';
  document.getElementById('caso-fase').textContent = meta.fase || '—';
  document.getElementById('caso-dealsize').textContent = meta.deal_size || '—';
  document.getElementById('caso-fecha').textContent = meta.fecha || '—';
  document.getElementById('caso-tag').textContent = meta.tag || 'Caso';
  document.title = `${meta.nombre || data.id} — JIT Sales OS`;
}

function renderNav(artifacts, caseName) {
  const nav = document.getElementById('caso-nav');
  const countEl = document.getElementById('caso-nav-count');

  if (!artifacts || artifacts.length === 0) {
    nav.innerHTML = '<div style="padding: 12px; color: var(--text-muted); font-size: 12px;">Sin artefactos</div>';
    countEl.textContent = '';
    return;
  }

  countEl.textContent = `${artifacts.length}`;

  const moduleLabels = { m1: 'M1', m2: 'M2', m3: 'M3', mesa: 'Mesa', other: '' };

  nav.innerHTML = artifacts.map(a => `
    <button class="caso-nav-item" data-module="${a.module}" data-key="${a.key}" onclick="loadArtifactFromNav('${a.key}')">
      <span class="nav-icon">${a.icon}</span>
      <span class="nav-text">${a.label}</span>
      ${moduleLabels[a.module] ? `<span class="nav-module">${moduleLabels[a.module]}</span>` : ''}
    </button>
  `).join('');
}

window.loadArtifactFromNav = function (artifactKey) {
  loadArtifact(currentCaseName, artifactKey);
};

async function loadArtifact(caseName, artifactKey) {
  currentArtifactKey = artifactKey;
  window.history.replaceState(null, '', `#${artifactKey}`);

  const body = document.getElementById('markdown-body');
  body.innerHTML = '<div class="empty-state"><div class="loader"></div></div>';

  document.querySelectorAll('.caso-nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.key === artifactKey);
  });

  const artifact = currentArtifacts.find(a => a.key === artifactKey);
  if (artifact) {
    document.getElementById('artifact-icon').textContent = artifact.icon;
    document.getElementById('artifact-label').textContent = artifact.label;
    const moduleMap = { m1: 'Módulo 1 · Preparación', m2: 'Módulo 2 · Análisis', m3: 'Módulo 3 · Coaching', mesa: 'Mesa real' };
    document.getElementById('artifact-module').textContent = moduleMap[artifact.module] || '';
  }

  try {
    const res = await fetch(`/api/caso/${encodeURIComponent(caseName)}/${encodeURIComponent(artifactKey)}`);
    if (!res.ok) throw new Error('Artefacto no encontrado');
    const data = await res.json();

    const html = typeof marked !== 'undefined' ? marked.parse(data.content) : data.content;
    body.innerHTML = html;

    renderPager(artifactKey);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (err) {
    body.innerHTML = `
      <div class="empty-state">
        <h3>Error cargando artefacto</h3>
        <p>${err.message}</p>
      </div>
    `;
  }
}

function renderPager(currentKey) {
  const pager = document.getElementById('caso-pager');
  if (currentArtifacts.length < 2) {
    pager.style.display = 'none';
    return;
  }

  const idx = currentArtifacts.findIndex(a => a.key === currentKey);
  const prev = idx > 0 ? currentArtifacts[idx - 1] : null;
  const next = idx < currentArtifacts.length - 1 ? currentArtifacts[idx + 1] : null;

  pager.style.display = 'grid';

  const prevBtn = document.getElementById('pager-prev');
  const nextBtn = document.getElementById('pager-next');

  if (prev) {
    prevBtn.disabled = false;
    document.getElementById('prev-title').textContent = prev.label;
    prevBtn.onclick = () => loadArtifact(currentCaseName, prev.key);
  } else {
    prevBtn.disabled = true;
    document.getElementById('prev-title').textContent = '—';
    prevBtn.onclick = null;
  }

  if (next) {
    nextBtn.disabled = false;
    document.getElementById('next-title').textContent = next.label;
    nextBtn.onclick = () => loadArtifact(currentCaseName, next.key);
  } else {
    nextBtn.disabled = true;
    document.getElementById('next-title').textContent = '—';
    nextBtn.onclick = null;
  }
}
