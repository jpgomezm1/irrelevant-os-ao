// JIT Sales OS — Dashboard Server
// Local-only, serves static UI + orchestrates Claude Code for live demos

const express = require('express');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const config = require('./config');

const app = express();

// ─── Middleware ──────────────────────────────────────────
app.use(express.json({ limit: '2mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Disable caching for dev comfort
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  next();
});

// ─── Helpers ──────────────────────────────────────────────
function readCaseMeta(caseName) {
  const metaPath = path.join(config.CASOS_DEMO_DIR, caseName, 'meta.json');
  if (!fs.existsSync(metaPath)) return { nombre: caseName };
  try {
    return JSON.parse(fs.readFileSync(metaPath, 'utf8'));
  } catch (e) {
    return { nombre: caseName, error: 'meta parse error' };
  }
}

function listCaseArtifacts(caseName) {
  const caseDir = path.join(config.CASOS_DEMO_DIR, caseName);
  if (!fs.existsSync(caseDir)) return [];
  return fs.readdirSync(caseDir)
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const key = f.replace('.md', '');
      const info = config.ARTIFACT_LABELS[key] || { label: key, icon: '📄', module: 'other', order: 99 };
      return { key, filename: f, ...info };
    })
    .sort((a, b) => a.order - b.order);
}

// ─── Routes: Static Pages ─────────────────────────────────
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/caso/:name', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'caso.html'));
});

app.get('/live', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'live.html'));
});

app.get('/flujo', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'flujo.html'));
});

app.get('/propuesta', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'propuesta.html'));
});

// ─── Routes: API ──────────────────────────────────────────

// System metadata (for header, stats, etc)
app.get('/api/system', (req, res) => {
  res.json({
    system: config.SYSTEM,
    allowedSkills: config.ALLOWED_SKILLS,
    skillLabels: config.SKILL_LABELS
  });
});

// List all demo cases
app.get('/api/casos', (req, res) => {
  if (!fs.existsSync(config.CASOS_DEMO_DIR)) {
    return res.json([]);
  }
  const casos = fs.readdirSync(config.CASOS_DEMO_DIR)
    .filter(name => {
      const full = path.join(config.CASOS_DEMO_DIR, name);
      return fs.statSync(full).isDirectory();
    })
    .map(name => ({
      id: name,
      ...readCaseMeta(name),
      artifacts: listCaseArtifacts(name).map(a => a.key)
    }));
  res.json(casos);
});

// Get a single case's metadata + artifact list
app.get('/api/caso/:name', (req, res) => {
  const { name } = req.params;
  const caseDir = path.join(config.CASOS_DEMO_DIR, name);
  if (!fs.existsSync(caseDir)) {
    return res.status(404).json({ error: 'Caso no encontrado' });
  }
  res.json({
    id: name,
    meta: readCaseMeta(name),
    artifacts: listCaseArtifacts(name)
  });
});

// Get a specific artifact's markdown content
app.get('/api/caso/:name/:artifact', (req, res) => {
  const { name, artifact } = req.params;
  // Prevent path traversal
  if (name.includes('..') || artifact.includes('..') || artifact.includes('/')) {
    return res.status(400).json({ error: 'invalid path' });
  }
  const filePath = path.join(config.CASOS_DEMO_DIR, name, `${artifact}.md`);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Artefacto no encontrado' });
  }
  const content = fs.readFileSync(filePath, 'utf8');
  res.json({ content, name, artifact });
});

// Live skill execution — streams Claude's stdout to client
app.post('/api/run-skill', (req, res) => {
  const { skill, context } = req.body || {};

  // Whitelist guard
  if (!skill || !config.ALLOWED_SKILLS.includes(skill)) {
    return res.status(403).json({ error: 'skill no permitido' });
  }
  if (typeof context !== 'string' || context.length === 0) {
    return res.status(400).json({ error: 'context requerido' });
  }
  if (context.length > 5000) {
    return res.status(400).json({ error: 'context demasiado largo (max 5000 chars)' });
  }

  // Streaming headers
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'no-cache');
  res.flushHeaders && res.flushHeaders();

  // Build the prompt — natural language invocation of the skill
  // (slash commands are REPL-only; in -p mode we describe the task in plain text)
  const promptText = `Ejecuta el skill "${skill}" siguiendo exactamente las instrucciones del archivo .claude/skills/${skill}/SKILL.md en este workspace.

El contexto del caso que el usuario provee es el siguiente:

${context}

Con base en ese contexto, produce el output completo del skill sin preguntar clarificaciones al usuario — si falta algún dato menor, asume valores razonables y márcalos explícitamente como "asumido" en el output. Entrega el resultado en el formato de markdown que el SKILL.md especifica.`;

  // Build claude args. In demo mode we skip permission prompts so the skill can
  // use Write, WebSearch, WebFetch, Bash, etc. without hanging on subprocess.
  const claudeArgs = ['-p'];
  if (config.CLAUDE_SKIP_PERMS) {
    claudeArgs.push('--dangerously-skip-permissions');
  }

  console.log(`\n[skill-run] ${skill} · context=${context.length} chars · prompt=${promptText.length} chars`);
  console.log(`[skill-run] cwd=${config.BOOTCAMP_DIR}`);
  console.log(`[skill-run] cmd=${config.CLAUDE_CMD} ${claudeArgs.join(' ')}  (prompt via stdin)`);

  res.write(`[∙] Iniciando ejecución de /${skill}...\n`);
  res.write(`[∙] cwd: ${config.BOOTCAMP_DIR}\n`);
  res.write(`[∙] Herramientas auto-aprobadas: ${config.CLAUDE_SKIP_PERMS ? 'sí' : 'no'}\n`);
  res.write(`[∙] Pasando prompt a Claude vía stdin (${promptText.length} chars)...\n\n`);

  let proc;
  try {
    proc = spawn(config.CLAUDE_CMD, claudeArgs, {
      cwd: config.BOOTCAMP_DIR,
      env: { ...process.env },
      shell: false,
      windowsHide: true,
      stdio: ['pipe', 'pipe', 'pipe']
    });
  } catch (err) {
    res.write(`\n[!] Error al lanzar Claude: ${err.message}\n`);
    return res.end();
  }

  // Pipe the prompt via stdin (avoids arg escaping issues with multiline text)
  proc.stdin.write(promptText);
  proc.stdin.end();

  let stdoutBytes = 0;
  let stderrBytes = 0;
  let firstChunkAt = null;
  const startedAt = Date.now();

  proc.stdout.on('data', (data) => {
    if (!firstChunkAt) {
      firstChunkAt = Date.now();
      const delay = firstChunkAt - startedAt;
      console.log(`[skill-run] first stdout chunk after ${delay}ms`);
    }
    stdoutBytes += data.length;
    res.write(data);
  });

  proc.stderr.on('data', (data) => {
    stderrBytes += data.length;
    const text = data.toString();
    console.log(`[skill-run][stderr] ${text.trim()}`);
    res.write(`\n[stderr] ${text}`);
  });

  proc.on('close', (code, signal) => {
    const elapsed = Date.now() - startedAt;
    console.log(`[skill-run] process exited: code=${code} signal=${signal} stdout=${stdoutBytes}B stderr=${stderrBytes}B elapsed=${elapsed}ms`);
    if (stdoutBytes === 0 && stderrBytes === 0) {
      res.write(`\n\n[⚠] El proceso terminó sin generar ningún output.\n`);
      res.write(`    code=${code} signal=${signal} elapsed=${elapsed}ms\n\n`);
      res.write(`    Diagnóstico probable:\n`);
      res.write(`    · Claude no pudo arrancar (auth, permissions, TTY)\n`);
      res.write(`    · Probá en terminal: claude -p "hola" — debe responder\n`);
      res.write(`    · Revisá la terminal donde corre el server (hay más logs ahí)\n`);
    } else {
      res.write(`\n\n[∙] Proceso finalizado (exit ${code}, ${elapsed}ms, ${stdoutBytes} bytes)\n`);
    }
    res.end();
  });

  proc.on('error', (err) => {
    console.log(`[skill-run] process error: ${err.code} ${err.message}`);
    if (err.code === 'ENOENT') {
      res.write(`\n[!] No se pudo encontrar el comando '${config.CLAUDE_CMD}'.\n\n`);
      res.write(`    Verifica en otra terminal que Claude Code funcione:\n`);
      res.write(`      > ${config.CLAUDE_CMD} --version\n\n`);
      res.write(`    Si el comando tiene otro nombre en tu máquina, define:\n`);
      res.write(`      Windows (cmd):   set CLAUDE_CMD=mi-comando && npm start\n`);
      res.write(`      Windows (PS):    $env:CLAUDE_CMD="mi-comando"; npm start\n`);
      res.write(`      Mac/Linux:       CLAUDE_CMD=mi-comando npm start\n`);
    } else {
      res.write(`\n[!] Error: ${err.message}\n`);
    }
    res.end();
  });

  // Kill the child only if the client actually disconnects BEFORE we finish.
  // (Note: req.on('close') fires when the request body stream ends — which happens
  // immediately for small JSON bodies. Using res.on('close') instead and checking
  // res.writableEnded tells us if the client dropped before we finished streaming.)
  let procEnded = false;
  proc.once('close', () => { procEnded = true; });
  res.on('close', () => {
    if (!procEnded && !res.writableEnded && proc && !proc.killed) {
      console.log('[skill-run] client disconnected mid-stream — killing subprocess');
      proc.kill('SIGTERM');
    }
  });
});

// Save a live-generated output to casos-demo/
app.post('/api/save-output', (req, res) => {
  const { caseName, artifact, content } = req.body || {};
  if (!caseName || !artifact || !content) {
    return res.status(400).json({ error: 'faltan campos' });
  }
  if (caseName.includes('..') || artifact.includes('..') || artifact.includes('/')) {
    return res.status(400).json({ error: 'invalid path' });
  }

  const safeCaseName = caseName.toLowerCase().replace(/[^a-z0-9\-]/g, '-');
  const caseDir = path.join(config.CASOS_DEMO_DIR, safeCaseName);
  fs.mkdirSync(caseDir, { recursive: true });

  const filePath = path.join(caseDir, `${artifact}.md`);
  fs.writeFileSync(filePath, content, 'utf8');

  // Create minimal meta.json if doesn't exist
  const metaPath = path.join(caseDir, 'meta.json');
  if (!fs.existsSync(metaPath)) {
    fs.writeFileSync(metaPath, JSON.stringify({
      nombre: caseName,
      fecha: new Date().toISOString().slice(0, 10),
      generado: 'live'
    }, null, 2));
  }

  res.json({ ok: true, path: `casos-demo/${safeCaseName}/${artifact}.md` });
});

// ─── Start ───────────────────────────────────────────────
// Auto-fallback: try configured port, then the next 10 ports if busy.
function startServer(port, attempt = 0) {
  const server = app.listen(port, '127.0.0.1', () => {
    console.log('');
    console.log('  ✨  JIT Sales OS — Dashboard');
    console.log('  ──────────────────────────────');
    console.log(`      → http://localhost:${port}`);
    console.log(`      Directorio: ${config.BOOTCAMP_DIR}`);
    console.log(`      Skills habilitados: ${config.ALLOWED_SKILLS.length}`);
    if (attempt > 0) {
      console.log(`      (puerto ${config.PORT} estaba ocupado; usando ${port})`);
    }
    console.log('');
    console.log('  Para salir: Ctrl+C');
    console.log('');
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE' && attempt < 10) {
      console.log(`  ⚠  Puerto ${port} ocupado, probando ${port + 1}...`);
      startServer(port + 1, attempt + 1);
    } else if (err.code === 'EADDRINUSE') {
      console.error('');
      console.error(`  ❌ No se encontró puerto libre entre ${config.PORT} y ${port}.`);
      console.error('     Cierra la app que está usando esos puertos o define PORT manualmente:');
      console.error('     Windows CMD:   set PORT=4000 && npm start');
      console.error('     PowerShell:    $env:PORT=4000; npm start');
      console.error('     macOS/Linux:   PORT=4000 npm start');
      console.error('');
      process.exit(1);
    } else {
      throw err;
    }
  });
}

startServer(config.PORT);
