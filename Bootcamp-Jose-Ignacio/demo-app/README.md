# JIT Sales OS — Dashboard de Demo

Webapp local para demostrar el sistema JIT Sales OS en vivo. Diseñada para bootcamps y presentaciones con audiencias no-técnicas.

**Stack:** Node.js + Express + Vanilla JS + CSS (cero frameworks)
**Uso:** local-only, 127.0.0.1
**Requisitos:** Node.js ≥18 + Claude Code CLI autenticado

---

## Quick start

```bash
# 1. Instalar dependencias (solo primera vez)
cd Bootcamp-Jose-Ignacio/demo-app
npm install

# 2. Arrancar
npm start
```

Abre **http://localhost:3000** en tu navegador.

Para cambiar puerto:
```bash
PORT=3005 npm start
```

---

## Qué hace

### Dashboard (`/`)
Página principal con:
- Hero con métricas del sistema (11 skills, 7 huesos, etc)
- CTA prominente al modo Live Demo
- Grid de casos pre-generados — cada uno abre una vista detallada

### Vista de caso (`/caso/:nombre`)
Documento profesional con:
- Sidebar izquierdo con metadata del caso + navegación entre artefactos
- Main con markdown renderizado como documento enterprise-grade
- Navegación fluida entre: investigación → estrategia → radiografía → plan de acción

### Live Demo (`/live`)
Ejecución real de skills:
1. Seleccionas una skill (investigar-prospecto, disenar-estrategia, radiografia-negociacion, plan-accion, coaching-personal, simular-negociacion)
2. Escribes el contexto del caso
3. Click **▶ Ejecutar**
4. Claude Code corre la skill sobre el framework JIT
5. Output se renderiza en tiempo real como markdown bonito
6. Al terminar, podés guardar como nuevo caso

---

## Arquitectura

```
Browser
   ↕ HTTP/Streaming
Node.js server (Express)
   ↕ subprocess spawn
Claude Code CLI
   ↕
Skills de .claude/skills/
   ↕
Framework JIT (framework-jose-ignacio.md)
   ↕
Memoria organizacional (memoria/*.md)
```

**Principios operativos:**
- Todo local — ningún dato sale de la máquina
- Whitelist de skills (seguridad contra inyección)
- Subprocess con `cwd: Bootcamp-Jose-Ignacio/` — acceso exacto al framework + memoria
- SSE-like streaming con fetch + ReadableStream
- Rendering incremental con marked.js

---

## Estructura de archivos

```
demo-app/
├── README.md                    # este archivo
├── package.json
├── server.js                    # orquestador Node.js
├── config.js                    # casos + skills + labels
├── public/
│   ├── index.html              # dashboard
│   ├── caso.html               # vista de caso
│   ├── live.html               # live demo
│   ├── css/
│   │   ├── styles.css          # paleta Irrelevant dark
│   │   ├── caso.css            # sidebar + markdown body
│   │   └── live.css            # form + streaming viewer
│   └── js/
│       ├── dashboard.js
│       ├── caso.js
│       └── live.js
└── casos-demo/
    └── bancolombia-ejemplo/
        ├── meta.json           # metadata del caso
        ├── investigacion.md    # mapa de negociación
        ├── estrategia.md       # plan de batalla
        ├── radiografia.md      # análisis forense
        └── plan-accion.md      # próximo movimiento
```

---

## Uso en el bootcamp

### Antes de la sesión

1. Verifica que el sistema funciona: `npm start` y abre http://localhost:3000
2. Revisa el caso Bancolombia haciendo click en la card. Los 4 artefactos deben cargar.
3. Prueba el Live Demo con una skill simple (sugerido: `coaching-personal`) con un contexto corto para validar que Claude Code corre bien.
4. Conecta el proyector. El HTML es responsive — se ve bien en 1920×1080.

### Durante la sesión (flujo recomendado 80 min)

**Apertura (10 min):** canvas (`/FLUJO-JIT-CANVAS.html`) con modo "Ver flujo guiado". Muestra el sistema completo en 90s.

**Demo principal (50 min):**
1. Abre el dashboard
2. Click en caso Bancolombia
3. Recorre los 4 artefactos explicando cada uno (**pausa larga después de cada output**)
4. Pregunta: *"¿Cuánto tiempo les tomaría hacer esto hoy con el rigor que ven?"*
5. Click en **Live Demo**
6. Ejecuta `/investigar-prospecto` con un caso del público — la gente lo ve suceder en vivo

**Cierre (20 min):** Q&A + call to action ("¿quién quiere correr esto con un deal suyo?")

---

## Troubleshooting

### "Port 3000 already in use"
```bash
PORT=3005 npm start
```

### "claude: command not found" (al hacer Live Demo)
Claude Code CLI no está instalado o no está en PATH. Verifica:
```bash
which claude
claude --version
```
Si no está, instálalo desde la [documentación oficial](https://docs.claude.com/claude-code).

### El Live Demo "cuelga" sin respuesta
- Verifica que tu sesión de Claude Code está autenticada: `claude` en terminal debería abrir sesión sin pedir login.
- Verifica que `Bootcamp-Jose-Ignacio/.claude/skills/` existe y tiene las 10+ skills.
- Revisa la terminal donde corre `npm start` — cualquier error aparece ahí.

### El output del Live Demo se ve raw / sin formato
marked.js se carga desde CDN. Si no hay internet, el output se muestra raw. Para uso offline:
```bash
npm install marked
# y actualizar import en live.html
```

### Error "Caso no encontrado"
Verifica que la carpeta `casos-demo/nombre-caso/` existe y tiene al menos un `.md` dentro.

---

## Comandos útiles

```bash
# Dev mode (auto-restart on changes)
npm run dev

# Ver qué casos hay
ls casos-demo/

# Agregar un caso manual
mkdir casos-demo/mi-caso
echo '# Mi caso\n\nContenido...' > casos-demo/mi-caso/investigacion.md
echo '{"nombre":"Mi Caso","fecha":"2026-05-01"}' > casos-demo/mi-caso/meta.json
```

---

## Extensiones futuras (si hace sentido)

- **Exportar caso como PDF** — botón en vista de caso
- **Comparar 2 casos side-by-side**
- **Dashboard de patrones cruzados** — `/patrones-equipo` visual
- **Autenticación básica** si se expone fuera de localhost
- **Auto-guardado** de transcripts de Fireflies
- **Bundle standalone** con `pkg` (single executable, sin instalar Node)

---

## Créditos

**Sistema:** JIT Sales OS v1.0
**Método:** José Ignacio Tobón (framework completo en `../framework/framework-jose-ignacio.md`)
**Implementación:** Irrelevant · Juan Pablo Gómez
**Contacto:** jpgomez@stayirrelevant.com

---

*Corre localmente. Todos los transcripts, casos y memoria organizacional quedan en tu máquina. Ideal para B2B con confidencialidad estricta.*
