// Live demo — select skill, execute, stream output

// Skill → module mapping (for grouping in UI)
const SKILL_MODULES = {
  'investigar-prospecto': 'm1',
  'disenar-estrategia': 'm1',
  'simular-negociacion': 'm1',
  'radiografia-negociacion': 'm2',
  'plan-accion': 'm2',
  'coaching-personal': 'm3'
};

const MODULE_LABELS = {
  'm1': 'Módulo 1 · Antes de la mesa',
  'm2': 'Módulo 2 · Después de la mesa',
  'm3': 'Módulo 3 · Coaching'
};

let selectedSkill = null;
let skillLabels = {};
let currentAbort = null;
let startTime = null;
let timeInterval = null;
let accumulated = '';

const els = {
  skillsGroups: document.getElementById('skills-groups'),
  context: document.getElementById('context'),
  charCount: document.getElementById('char-count'),
  loadExample: document.getElementById('load-example'),
  btnRun: document.getElementById('btn-run'),
  actionsHint: document.getElementById('actions-hint'),
  formSection: document.getElementById('form-section'),
  execSection: document.getElementById('exec-section'),
  execOutput: document.getElementById('exec-output'),
  execTitle: document.getElementById('exec-title'),
  execSubtitle: document.getElementById('exec-subtitle'),
  statusSkill: document.getElementById('status-skill'),
  statusTime: document.getElementById('status-time'),
  statusChars: document.getElementById('status-chars'),
  statusState: document.getElementById('status-state'),
  btnStop: document.getElementById('btn-stop'),
  saveSection: document.getElementById('save-section'),
  saveCaseName: document.getElementById('save-case-name'),
  saveArtifact: document.getElementById('save-artifact'),
  btnSave: document.getElementById('btn-save'),
  btnNewRun: document.getElementById('btn-new-run'),
  execStepNum: document.getElementById('exec-step-num'),
  stepper: document.getElementById('stepper')
};

if (typeof marked !== 'undefined') {
  marked.setOptions({ gfm: true, breaks: false, headerIds: false, mangle: false });
}

// ─── Load skills grouped by module ────────────────────
(async function loadSystem() {
  try {
    const res = await fetch('/api/system');
    const data = await res.json();
    skillLabels = data.skillLabels || {};
    renderSkillsGrouped(data.allowedSkills, data.skillLabels);
  } catch (err) {
    els.skillsGroups.innerHTML = `<div class="empty-state"><p>Error: ${err.message}</p></div>`;
  }
})();

function renderSkillsGrouped(skills, labels) {
  // Group skills by module
  const groups = { m1: [], m2: [], m3: [] };
  skills.forEach(s => {
    const mod = SKILL_MODULES[s] || 'm1';
    if (!groups[mod]) groups[mod] = [];
    groups[mod].push(s);
  });

  els.skillsGroups.innerHTML = Object.entries(groups)
    .filter(([mod, arr]) => arr.length > 0)
    .map(([mod, arr]) => `
      <div class="skills-group" data-module="${mod}">
        <div class="skills-group-label">
          <span>${MODULE_LABELS[mod] || mod}</span>
          <span class="line"></span>
        </div>
        <div class="skills-grid">
          ${arr.map(s => {
            const l = labels[s] || { label: s, icon: '⚙️', description: '' };
            return `
              <button type="button" class="skill-option" data-skill="${s}">
                <span class="skill-option-icon">${l.icon}</span>
                <span class="skill-option-content">
                  <span class="skill-option-name">/${s}</span>
                  <span class="skill-option-label">${l.label}</span>
                  <span class="skill-option-desc">${l.description}</span>
                </span>
              </button>
            `;
          }).join('')}
        </div>
      </div>
    `).join('');

  els.skillsGroups.querySelectorAll('.skill-option').forEach(btn => {
    btn.addEventListener('click', () => selectSkill(btn.dataset.skill));
  });
}

function selectSkill(skill) {
  selectedSkill = skill;
  document.querySelectorAll('.skill-option').forEach(b => {
    b.classList.toggle('selected', b.dataset.skill === skill);
  });
  const l = skillLabels[skill];
  if (l && l.placeholder) {
    els.context.placeholder = l.placeholder;
  }
  updateStepper(els.context.value.trim().length > 10 ? 3 : 2);
  updateRunBtn();
}

// ─── Context form ─────────────────────────────────────
els.context.addEventListener('input', () => {
  els.charCount.textContent = els.context.value.length;
  updateRunBtn();
  if (selectedSkill && els.context.value.trim().length > 10) updateStepper(3);
  else if (selectedSkill) updateStepper(2);
});

els.loadExample.addEventListener('click', () => {
  if (!selectedSkill) {
    els.actionsHint.textContent = 'Primero selecciona un skill ↑';
    els.actionsHint.style.color = 'var(--coral)';
    setTimeout(() => {
      els.actionsHint.style.color = '';
      updateRunBtn();
    }, 2000);
    return;
  }
  const l = skillLabels[selectedSkill];
  if (l && l.placeholder) {
    els.context.value = l.placeholder;
    els.charCount.textContent = els.context.value.length;
    updateRunBtn();
    updateStepper(3);
  }
});

function updateRunBtn() {
  const valid = selectedSkill && els.context.value.trim().length > 10;
  els.btnRun.disabled = !valid;
  if (!selectedSkill) {
    els.actionsHint.textContent = 'Selecciona un skill para continuar';
  } else if (els.context.value.trim().length < 10) {
    els.actionsHint.textContent = 'Agrega contexto del caso (mínimo ~10 chars)';
  } else {
    els.actionsHint.textContent = '✓ Listo para ejecutar';
    els.actionsHint.style.color = 'var(--emerald)';
  }
}

function updateStepper(step) {
  document.querySelectorAll('.step-dot').forEach(d => {
    const s = parseInt(d.dataset.step, 10);
    d.classList.remove('active', 'done');
    if (s < step) d.classList.add('done');
    else if (s === step) d.classList.add('active');
  });
}

// ─── Execute ──────────────────────────────────────────
els.btnRun.addEventListener('click', runSkill);
els.btnStop.addEventListener('click', stopRun);
els.btnNewRun.addEventListener('click', resetExecution);

async function runSkill() {
  if (!selectedSkill || !els.context.value.trim()) return;

  els.formSection.classList.add('hidden');
  els.execSection.classList.remove('hidden');
  els.saveSection.classList.add('hidden');

  accumulated = '';
  startTime = Date.now();
  els.execOutput.classList.add('generating');
  els.execOutput.innerHTML = `
    <div class="exec-waiting">
      <div class="loader"></div>
      <p>Claude está leyendo el framework JIT y preparando la respuesta.
        <small>La primera palabra suele aparecer en 5–15 segundos.</small>
      </p>
    </div>
  `;

  const l = skillLabels[selectedSkill];
  els.statusSkill.textContent = `/${selectedSkill}`;
  els.execTitle.textContent = `Ejecutando: ${l ? l.label : selectedSkill}`;
  els.execSubtitle.textContent = 'Claude está trabajando sobre el framework JIT.';
  els.statusChars.textContent = '0';
  els.statusTime.textContent = '0s';
  updateStatus('running', 'Ejecutando');
  els.execStepNum.innerHTML = '<span class="loader"></span>';
  els.btnStop.style.display = '';

  if (timeInterval) clearInterval(timeInterval);
  timeInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    els.statusTime.textContent = elapsed + 's';
  }, 500);

  els.execSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

  currentAbort = new AbortController();
  try {
    const response = await fetch('/api/run-skill', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ skill: selectedSkill, context: els.context.value.trim() }),
      signal: currentAbort.signal
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let firstChunkReceived = false;

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      accumulated += chunk;

      if (!firstChunkReceived) {
        firstChunkReceived = true;
        els.execSubtitle.textContent = 'Recibiendo y renderizando output en tiempo real.';
      }

      renderOutput();
      els.statusChars.textContent = accumulated.length.toLocaleString();
    }

    finishRun('done');
  } catch (err) {
    if (err.name === 'AbortError') {
      finishRun('stopped', 'Ejecución detenida por el usuario');
    } else {
      finishRun('error', err.message);
    }
  }
}

function renderOutput() {
  if (!accumulated) return;
  try {
    const html = typeof marked !== 'undefined' ? marked.parse(accumulated) : escapeHtml(accumulated);
    els.execOutput.innerHTML = html;
    els.execOutput.scrollTop = els.execOutput.scrollHeight;
  } catch (e) {
    els.execOutput.innerHTML = `<pre>${escapeHtml(accumulated)}</pre>`;
  }
}

function finishRun(kind, errorMsg) {
  if (timeInterval) { clearInterval(timeInterval); timeInterval = null; }
  els.execOutput.classList.remove('generating');

  const elapsed = Math.floor((Date.now() - startTime) / 1000);

  if (kind === 'done') {
    updateStatus('done', `Completado en ${elapsed}s`);
    els.execTitle.textContent = '✓ Ejecución completada';
    els.execSubtitle.textContent = `Skill /${selectedSkill} corrió en ${elapsed}s. Guarda el output como caso para consultarlo después.`;
    els.execStepNum.innerHTML = '✓';
    els.execStepNum.style.background = 'var(--emerald-soft)';
    els.execStepNum.style.color = 'var(--emerald)';
    els.execStepNum.style.borderColor = 'rgba(94, 229, 164, 0.3)';
    els.saveSection.classList.remove('hidden');
    els.btnStop.style.display = 'none';
    updateStepper(3);
    document.querySelectorAll('.step-dot').forEach(d => d.classList.add('done'));
  } else if (kind === 'stopped') {
    updateStatus('error', 'Detenido');
    els.execTitle.textContent = '✕ Ejecución detenida';
    els.execSubtitle.textContent = errorMsg || 'El proceso fue interrumpido.';
    els.execStepNum.innerHTML = '✕';
    els.execStepNum.style.background = 'var(--coral-soft)';
    els.execStepNum.style.color = 'var(--coral)';
    els.btnStop.style.display = 'none';
  } else {
    updateStatus('error', 'Error');
    els.execTitle.textContent = '⚠ Error durante la ejecución';
    els.execSubtitle.textContent = errorMsg || 'Algo salió mal.';
    els.execStepNum.innerHTML = '!';
    els.execStepNum.style.background = 'var(--coral-soft)';
    els.execStepNum.style.color = 'var(--coral)';
    if (!accumulated) {
      els.execOutput.innerHTML = `<div class="empty-state"><h3>Error</h3><p>${escapeHtml(errorMsg || 'Sin detalles')}</p></div>`;
    }
    els.btnStop.style.display = 'none';
  }
}

function updateStatus(kind, text) {
  els.statusState.innerHTML = `<span class="status-dot ${kind}"></span>${text}`;
}

function stopRun() {
  if (currentAbort) currentAbort.abort();
}

function resetExecution() {
  els.execSection.classList.add('hidden');
  els.formSection.classList.remove('hidden');
  els.btnStop.style.display = '';
  els.execStepNum.style.background = '';
  els.execStepNum.style.color = '';
  els.execStepNum.style.borderColor = '';
  els.btnSave.textContent = 'Guardar';
  els.btnSave.disabled = false;
  els.saveCaseName.value = '';
  accumulated = '';
  updateStepper(selectedSkill ? (els.context.value.trim().length > 10 ? 3 : 2) : 1);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── Save output ──────────────────────────────────────
els.btnSave.addEventListener('click', async () => {
  const caseName = els.saveCaseName.value.trim();
  const artifact = els.saveArtifact.value;

  if (!caseName) {
    showToast('Dame un nombre para el caso', 'error');
    els.saveCaseName.focus();
    return;
  }
  if (!accumulated) {
    showToast('No hay output para guardar', 'error');
    return;
  }

  try {
    const res = await fetch('/api/save-output', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ caseName, artifact, content: accumulated })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}`);
    }
    const data = await res.json();
    showToast(`✓ Guardado en ${data.path}`);
    els.btnSave.textContent = '✓ Guardado';
    els.btnSave.disabled = true;
  } catch (err) {
    showToast(`Error: ${err.message}`, 'error');
  }
});

function showToast(msg, kind) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.classList.toggle('error', kind === 'error');
  toast.textContent = msg;
  toast.classList.add('visible');
  setTimeout(() => toast.classList.remove('visible'), 3500);
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
