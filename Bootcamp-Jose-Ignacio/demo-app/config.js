// JIT Sales OS Dashboard — Configuración

const path = require('path');

module.exports = {
  // Directorio raíz donde viven las skills y el framework
  BOOTCAMP_DIR: path.resolve(__dirname, '..'),

  // Directorio de casos pre-generados
  CASOS_DEMO_DIR: path.resolve(__dirname, 'casos-demo'),

  // Skills habilitados para ejecución en vivo (whitelist de seguridad)
  ALLOWED_SKILLS: [
    'investigar-prospecto',
    'disenar-estrategia',
    'simular-negociacion',
    'radiografia-negociacion',
    'plan-accion',
    'coaching-personal'
  ],

  // Etiquetas legibles de los artefactos
  ARTIFACT_LABELS: {
    'investigacion': { label: 'Investigación', icon: '🔍', module: 'm1', order: 1 },
    'estrategia': { label: 'Estrategia', icon: '⚔️', module: 'm1', order: 2 },
    'simulacion': { label: 'Simulación', icon: '🥊', module: 'm1', order: 3 },
    'transcript': { label: 'Transcript', icon: '📝', module: 'mesa', order: 4 },
    'procesamiento': { label: 'Procesamiento', icon: '📥', module: 'm2', order: 5 },
    'radiografia': { label: 'Radiografía', icon: '🔬', module: 'm2', order: 6 },
    'plan-accion': { label: 'Plan de acción', icon: '🎯', module: 'm2', order: 7 },
    'coaching': { label: 'Coaching', icon: '👤', module: 'm3', order: 8 }
  },

  // Labels legibles de los skills
  SKILL_LABELS: {
    'investigar-prospecto': {
      label: 'Investigar prospecto',
      icon: '🔍',
      description: 'Levanta inteligencia de negociación: intereses, BATNA, tipología, decisor real.',
      placeholder: 'Ej: El prospecto es Bancolombia. Estamos negociando un contrato de transformación digital. El decisor nominal es el CTO. Ya hablamos 2 veces con ellos.'
    },
    'disenar-estrategia': {
      label: 'Diseñar estrategia',
      icon: '⚔️',
      description: 'Convierte la investigación en un plan de batalla: las 6 preguntas, ZOPA, variables.',
      placeholder: 'Ej: Para el caso Bancolombia. Nuestro excelente es $200M, aceptable $140M. Su BATNA probable es quedarse con su proveedor actual.'
    },
    'radiografia-negociacion': {
      label: 'Radiografía forense',
      icon: '🔬',
      description: 'Analiza una call contra los 7 huesos de JIT. Scores, momentos pivotales, errores críticos.',
      placeholder: 'Ej: Analiza el transcript de la última call con Bancolombia. Es una C3 — presentación de propuesta. Me interesa saber si cedí precio antes de tiempo.'
    },
    'plan-accion': {
      label: 'Plan de acción',
      icon: '🎯',
      description: 'Diseña el próximo movimiento concreto post-mesa: variables nuevas, mensaje listo.',
      placeholder: 'Ej: Post radiografía de Bancolombia. El cliente quedó pensando. Necesito reactivar sin perder posición.'
    },
    'coaching-personal': {
      label: 'Coaching personal',
      icon: '👤',
      description: 'Feedback de trayectoria para un negociador. Blind spots + plan de 90 días.',
      placeholder: 'Ej: Coaching para Juan Pablo. Ha hecho 5 calls en los últimos 2 meses. Siento que cede precio muy rápido cuando el prospecto empuja.'
    },
    'simular-negociacion': {
      label: 'Simular negociación',
      icon: '🥊',
      description: 'Role-play contra tipología de contraparte (HP, Soviético, Firme...).',
      placeholder: 'Ej: Simula una negociación tipo HP para el caso Bancolombia. Intensidad combate. Yo soy vendedor y voy a abrir.'
    }
  },

  // Título y metadata del sistema
  SYSTEM: {
    name: 'JIT Sales OS',
    version: '1.0',
    tagline: 'Sistema operativo de negociación — método José Ignacio Tobón',
    stats: [
      { value: '11', label: 'Skills' },
      { value: '7', label: 'Huesos' },
      { value: '3', label: 'Módulos' },
      { value: '∞', label: 'Memoria' }
    ]
  },

  // Puerto por default
  PORT: parseInt(process.env.PORT, 10) || 3000,

  // Claude CLI command — Windows usa claude.cmd, Unix usa claude.
  // Override con env var CLAUDE_CMD si el nombre es distinto en tu máquina.
  CLAUDE_CMD: process.env.CLAUDE_CMD ||
    (process.platform === 'win32' ? 'claude.cmd' : 'claude'),

  // En modo demo local, auto-aprobamos todas las herramientas del skill (Read, Write,
  // WebSearch, WebFetch, Glob, Grep, Bash) para que los skills funcionen end-to-end
  // sin prompts de permisos que no podemos responder en subprocess.
  // Desactivá poniendo CLAUDE_SKIP_PERMS=0 si algún día este server se expone fuera
  // de localhost (no recomendado de todas formas).
  CLAUDE_SKIP_PERMS: process.env.CLAUDE_SKIP_PERMS !== '0'
};
