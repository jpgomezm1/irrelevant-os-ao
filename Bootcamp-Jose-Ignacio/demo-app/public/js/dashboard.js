// Dashboard — carga los casos desde /api/casos y los renderiza

(async function () {
  const grid = document.getElementById('cases-grid');

  try {
    const res = await fetch('/api/casos');
    const casos = await res.json();

    if (!Array.isArray(casos) || casos.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <h3>Aún no hay casos</h3>
          <p>Corre una skill en vivo desde <a href="/live" style="color: var(--purple-light);">Live Demo</a> para generar el primer caso.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = casos.map(c => renderCaseCard(c)).join('');
  } catch (err) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <h3>Error cargando casos</h3>
        <p>${err.message}</p>
      </div>
    `;
  }
})();

function renderCaseCard(c) {
  const nombre = c.nombre || c.id;
  const desc = c.descripcion || c.industria || 'Caso de negociación';
  const industria = c.industria || '—';
  const tipologia = c.tipologia || '—';
  const fecha = c.fecha || '—';
  const tag = c.tag || 'Caso demo';

  const artifacts = (c.artifacts || []).map(a => `<span class="artifact-chip">${a}</span>`).join('');

  return `
    <a href="/caso/${encodeURIComponent(c.id)}" class="case-card">
      <span class="case-card-tag">${escapeHtml(tag)}</span>
      <h3>${escapeHtml(nombre)}</h3>
      <div class="case-card-desc">${escapeHtml(desc)}</div>
      <div class="case-card-artifacts">${artifacts}</div>
      <div class="case-card-meta">
        <span class="case-meta-item"><strong>Industria:</strong> ${escapeHtml(industria)}</span>
        <span class="case-meta-item"><strong>Tipología:</strong> ${escapeHtml(tipologia)}</span>
        <span class="case-meta-item"><strong>Fecha:</strong> ${escapeHtml(fecha)}</span>
      </div>
    </a>
  `;
}

function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
