---
name: pipeline-dashboard
description: >
  Genera un HTML visual interactivo con el estado de todos los clientes activos del pipeline.
  Incluye health scores, filtros, búsqueda, accordion expandible por cliente, forecast y timeline.
  Triggers: "pipeline", "dashboard", "estado del pipeline", "ver todos los clientes", "/pipeline-dashboard".
allowed-tools: [Read, Write, Glob, Grep]
---

# Pipeline Dashboard v2 — Vista Global Interactiva

Generas un dashboard HTML premium e interactivo con el estado completo del pipeline comercial. Escaneas en profundidad todas las carpetas de clientes, extraes contexto rico, calculas health scores, y generas un HTML autocontenido con filtros, búsqueda, y detalle expandible por cliente.

**REGLA CRITICA:** El diseño visual es un TEMPLATE FIJO definido en este skill. NO cambies el CSS, NO cambies la estructura HTML, NO cambies el JavaScript. Solo inyectas los datos en el placeholder `{{DATA_JSON}}`. Esto garantiza consistencia visual entre ejecuciones.

Antes de hacer CUALQUIER COSA:
1. Lee `CLAUDE.md` en la raíz del workspace
2. Lee `Assets Fijos/PROP_VALUE_IRRELEVANT.md`

---

## STEP 1: Escaneo Profundo de Clientes

Usa Glob para encontrar `Clientes/*/README.md`. Para CADA cliente, construye un objeto de datos leyendo múltiples archivos:

### 1a. README.md (OBLIGATORIO)
Extrae de la tabla markdown:
- empresa, industria, contacto (principal), servicio, como_llego, fecha_creacion, comercial, estado
- personas_clave (del campo "Personas clave" si existe)
- Parsea la sección `## Historial` para extraer array de {date, event}

### 1b. Discovery Notes (si existe)
Lee `discovery/discovery-notes.md`. Extrae:
- pain_points: busca secciones con "dolor", "problema", "pain", "friccion". Extrae los bullets.
- key_insights: busca "insight", "hallazgo", "conclusi". Extrae máximo 3 bullets.

### 1c. Diseño (si existe)
Lee `diseno/propuesta-skills.md`. Extrae:
- proposed_skills: lista de nombres de skills propuestos (busca headers ## o ### con nombres de skills)
Lee `diseno/stack.md` si existe. Extrae:
- stack_tools: nombres de herramientas recomendadas

### 1d. Contexto General (si existe)
Lee `contexto/contexto-general.md`. Extrae resumen breve (primeros 200 chars).

### 1e. Call Review (si existe)
Lee cualquier archivo en `evaluaciones/call-review-*.md`. Extrae:
- call_score: busca patrones como "X/10", "Score: X", "Puntaje: X"

### 1f. Emails
Cuenta archivos en `comercial/emails/` (excluyendo .gitkeep). El conteo = follow_ups_sent.

### 1g. Inventario de Archivos
Para cada subcarpeta (discovery, contexto, diseno, comercial, contratos, fase0, entregable, produccion, evaluaciones), lista los archivos reales (excluyendo .gitkeep).

### 1h. Determinación de Etapa

Aplica esta lógica EN ORDEN (la primera que NO se cumple determina dónde está):

| Etapa | Clave | Color | Prob. | Condición |
|-------|-------|-------|-------|-----------|
| Cerrado | cerrado | emerald | 100% | entregable + check-in post-entrega |
| Post-Entrega | post-entrega | pink | 98% | tiene entregable + evaluaciones post |
| Entrega | entrega | emerald | 95% | tiene archivos en entregable/ |
| Producción | produccion | purple | 90% | tiene archivos en produccion/ |
| Contratos | contratos | emerald | 85% | tiene archivos en contratos/ |
| Negociación | negociacion | orange | 65% | tiene cotización + slides pero NO contratos |
| Cotización | cotizacion | amber | 50% | tiene cotización en comercial/ |
| Diseño | diseno | purple | 35% | tiene archivos en diseno/ |
| Discovery | discovery | blue | 20% | tiene discovery-notes |
| Preparación | preparacion | cyan | 10% | tiene contexto o prep-call |
| Nuevo | nuevo | gray | 5% | solo README |

### 1i. Health Score (0-100)

Calcula así:
```
base = 50
+ min(cantidadDocumentos * 4, 20)    // docs generados, max +20
+ (tieneDiseno ? 10 : 0)              // tiene propuesta de skills
+ (tieneCallReview ? 8 : 0)           // tiene evaluación de call
+ (followUpsSent > 0 ? 7 : 0)         // tiene follow-ups enviados
+ (velocidadDias < 7 ? 5 : 0)         // rápido en avanzar
- min(diasSinActividad * 3, 40)        // penalización por inactividad
Resultado = clamp(0, 100)
```

### 1j. Valor Estimado
- Ops Layer: $7.000.000 COP
- Edu Layer: $4.500.000 COP
- Core Layer: $15.000.000 COP
- No definido: $0

### 1k. Siguiente Acción
Basada en la etapa actual y lo que FALTA en la carpeta. Formato: { command: "/skill empresa", description: "texto" }

---

## STEP 2: Construir el Objeto DATA_JSON

Ensambla TODO en esta estructura JSON exacta:

```json
{
  "generatedAt": "YYYY-MM-DDTHH:mm:ss",
  "summary": {
    "totalClients": N,
    "totalValue": N,
    "weightedValue": N,
    "atRisk": N,
    "avgHealthScore": N,
    "avgVelocity": N,
    "byStage": { "stage_key": count },
    "byComercial": { "nombre": count }
  },
  "clients": [
    {
      "id": "slug-empresa",
      "empresa": "Nombre",
      "industria": "Sector",
      "contacto": "Persona, Cargo",
      "personasClave": ["Nombre (Rol)"],
      "comercial": "Nombre",
      "servicio": "Ops Layer",
      "comoLlego": "Referido",
      "stage": "negociacion",
      "stageLabel": "Negociación",
      "stageColor": "orange",
      "value": 7000000,
      "probability": 65,
      "weightedValue": 4550000,
      "daysInStage": 0,
      "healthScore": 85,
      "lastActivity": "2026-03-24",
      "lastFile": "cotizacion-ops.html",
      "nextAction": { "command": "/contrato empresa", "description": "Preparar contratos" },
      "painPoints": ["Dolor 1", "Dolor 2"],
      "proposedSkills": ["Skill 1", "Skill 2"],
      "stackTools": ["Tool 1"],
      "callScore": null,
      "followUpsSent": 2,
      "contextoResumen": "Texto breve...",
      "files": {
        "discovery": ["file1.md"],
        "contexto": ["file2.md"],
        "diseno": [],
        "comercial": [],
        "contratos": [],
        "fase0": [],
        "entregable": [],
        "produccion": [],
        "evaluaciones": [],
        "emails": []
      },
      "timeline": [
        { "date": "2026-03-24", "event": "Carpeta creada" }
      ]
    }
  ],
  "activityFeed": [
    { "date": "2026-03-24", "client": "Galco", "clientId": "galco", "event": "Cotización generada", "file": "cotizacion-ops.html" }
  ],
  "quickActions": [
    { "command": "/contrato galco", "reason": "Galco listo para contratos", "priority": "high" }
  ]
}
```

Ordena `clients` por: deals en riesgo primero (más días sin actividad), luego por etapa más avanzada.
Ordena `activityFeed` por fecha descendente (más reciente primero), máximo 50 entries.
Genera `quickActions` con las acciones más urgentes de cada cliente (máximo 6).

---

## STEP 3: Generar el HTML

Copia el template de abajo TEXTUALMENTE. La ÚNICA modificación permitida es reemplazar `{{DATA_JSON}}` con el JSON real generado en Step 2.

**NO modifiques NADA más del template. Ni CSS, ni HTML, ni JS, ni estructura, ni colores, ni fuentes.**

Guarda el resultado como: `Assets Fijos/pipeline-dashboard.html` (SOBREESCRIBE cada vez)

---

## STEP 4: Mostrar en Chat + Confirmar

Muestra en el chat un resumen:

*"Dashboard generado: `Assets Fijos/pipeline-dashboard.html`"*

*"Resumen:*
- *[N] clientes activos*
- *Pipeline total: $[X] COP*
- *Pipeline ponderado: $[X] COP*
- *[N] deals en riesgo (>14 días sin actividad)*
- *Health score promedio: [X]/100*
- *Acciones sugeridas: [lista de quick actions]"*

*"Abre el archivo en un navegador para ver el dashboard interactivo."*

---

## TEMPLATE HTML (COPIAR TEXTUALMENTE)

```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Pipeline Dashboard — Irrelevant Sales OS</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">
<style>
:root{--bg:#0a0812;--surface:rgba(255,255,255,0.03);--surface-2:rgba(255,255,255,0.06);--border:rgba(255,255,255,0.06);--border-2:rgba(255,255,255,0.1);--text:#fff;--text-2:rgba(255,255,255,0.55);--text-3:rgba(255,255,255,0.35);--purple:#8B5CF6;--purple-light:#A78BFA;--purple-dark:#7C3AED;--emerald:#34d399;--amber:#fbbf24;--blue:#60a5fa;--pink:#f472b6;--cyan:#22d3ee;--orange:#fb923c;--red:#ef4444}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--text);line-height:1.6;overflow-x:hidden}
code,.mono{font-family:'JetBrains Mono',monospace}

.blob{position:fixed;border-radius:50%;filter:blur(120px);opacity:.07;pointer-events:none;z-index:-1}
.blob-1{width:500px;height:500px;background:var(--purple);top:-100px;right:-100px}
.blob-2{width:400px;height:400px;background:var(--emerald);bottom:200px;left:-150px}

/* NAV */
.nav{position:fixed;top:0;left:0;right:0;height:56px;z-index:100;background:rgba(10,8,18,.92);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;padding:0 32px}
.nav-brand{display:flex;align-items:center;gap:10px}
.nav-brand .dot{width:8px;height:8px;border-radius:50%;background:var(--purple);box-shadow:0 0 12px var(--purple)}
.nav-brand span{font-size:11px;color:var(--text-3);letter-spacing:1.5px;text-transform:uppercase;font-weight:600}
.nav-links{display:flex;gap:4px}
.nav-links a{font-size:11px;color:var(--text-3);text-decoration:none;padding:6px 12px;border-radius:6px;transition:all .2s;letter-spacing:.5px;font-weight:500}
.nav-links a:hover,.nav-links a.active{color:var(--purple-light);background:rgba(139,92,246,.1)}
.nav-meta{font-size:10px;color:var(--text-3);letter-spacing:1px;text-transform:uppercase;font-weight:600}
.nav-meta span{color:var(--emerald)}
.nav-toggle{display:none;background:none;border:none;color:var(--text-2);font-size:20px;cursor:pointer;padding:8px}

.container{max-width:1100px;margin:0 auto;padding:0 24px}

/* FADE IN */
.fi{opacity:0;transform:translateY(16px);transition:opacity .5s ease,transform .5s ease}
.fi.v{opacity:1;transform:translateY(0)}

/* HERO */
.hero{padding:100px 0 32px;text-align:center}
.hero h1{font-size:42px;font-weight:900;letter-spacing:-2px;margin-bottom:6px}
.hero h1 em{font-style:normal;background:linear-gradient(135deg,var(--purple-light),var(--emerald));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero .sub{font-size:12px;color:var(--text-3);text-transform:uppercase;letter-spacing:2px;font-weight:600}

/* STATS */
.stats{display:grid;grid-template-columns:repeat(6,1fr);gap:12px;margin:32px 0}
.stat{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px 16px;text-align:center;transition:border-color .2s}
.stat:hover{border-color:var(--border-2)}
.stat .num{font-family:'JetBrains Mono',monospace;font-size:28px;font-weight:800;line-height:1}
.stat .lbl{font-size:10px;color:var(--text-3);text-transform:uppercase;letter-spacing:1px;margin-top:6px;font-weight:600}
.stat .extra{font-size:10px;color:var(--text-3);margin-top:2px}

/* HEALTH CIRCLE */
.health-circle{position:relative;width:44px;height:44px;display:inline-block}
.health-circle svg{transform:rotate(-90deg)}
.health-circle .val{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700}

/* SECTION */
.sec{padding:40px 0;border-top:1px solid var(--border)}
.sec-title{font-size:13px;font-weight:700;color:var(--text-3);text-transform:uppercase;letter-spacing:2px;margin-bottom:20px;display:flex;align-items:center;gap:8px}
.sec-title .dot{width:6px;height:6px;border-radius:50%}

/* FUNNEL */
.funnel{display:flex;flex-direction:column;gap:6px;margin-bottom:24px}
.funnel-row{display:flex;align-items:center;gap:12px}
.funnel-label{width:110px;font-size:11px;font-weight:600;text-align:right;flex-shrink:0}
.funnel-bar-wrap{flex:1;height:28px;background:rgba(255,255,255,.02);border-radius:6px;overflow:hidden;position:relative}
.funnel-bar{height:100%;border-radius:6px;transition:width .8s ease-out;display:flex;align-items:center;padding-left:10px;font-size:10px;font-weight:700;color:rgba(0,0,0,.7);min-width:0}
.funnel-meta{width:100px;font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-2);text-align:right;flex-shrink:0}

/* CONTROLS */
.controls{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-bottom:20px}
.search-box{background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:8px 14px;color:var(--text);font-size:12px;font-family:'Inter',sans-serif;width:220px;outline:none;transition:border-color .2s}
.search-box:focus{border-color:var(--purple)}
.search-box::placeholder{color:var(--text-3)}
.filter-btn{background:var(--surface);border:1px solid var(--border);border-radius:6px;padding:5px 12px;font-size:10px;font-weight:600;color:var(--text-3);cursor:pointer;transition:all .2s;text-transform:uppercase;letter-spacing:.5px;font-family:'Inter',sans-serif}
.filter-btn:hover{border-color:var(--border-2);color:var(--text-2)}
.filter-btn.on{border-color:var(--purple);color:var(--purple-light);background:rgba(139,92,246,.1)}
.sort-select{background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:8px 12px;color:var(--text-2);font-size:11px;font-family:'Inter',sans-serif;outline:none;cursor:pointer}
.sort-select option{background:var(--bg)}

/* TABS */
.tab-bar{display:flex;gap:4px;margin-bottom:24px;border-bottom:1px solid var(--border);padding-bottom:0}
.tab{padding:10px 18px;font-size:11px;font-weight:600;color:var(--text-3);cursor:pointer;border-bottom:2px solid transparent;transition:all .2s;text-transform:uppercase;letter-spacing:.5px}
.tab:hover{color:var(--text-2)}
.tab.active{color:var(--purple-light);border-bottom-color:var(--purple)}
.tab-content{display:none}
.tab-content.active{display:block}

/* CLIENT CARDS */
.client-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.client-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;overflow:hidden;transition:all .2s;cursor:pointer}
.client-card:hover{border-color:var(--border-2);transform:translateY(-1px)}
.client-card.risk{border-left:3px solid var(--red)}
.cc-top{padding:18px 20px 14px;display:flex;justify-content:space-between;align-items:flex-start}
.cc-info h3{font-size:16px;font-weight:700;margin-bottom:2px}
.cc-info .cc-industry{font-size:10px;color:var(--text-3);text-transform:uppercase;letter-spacing:1px;font-weight:600}
.cc-meta{padding:0 20px 16px;display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.badge{display:inline-block;font-size:9px;font-weight:700;padding:3px 9px;border-radius:5px;text-transform:uppercase;letter-spacing:.5px;white-space:nowrap}
.cc-values{padding:0 20px 14px;display:flex;gap:16px;align-items:center}
.cc-val{font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:700}
.cc-val-label{font-size:9px;color:var(--text-3);text-transform:uppercase;letter-spacing:.5px;margin-top:1px}
.cc-val-sub{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-2)}
.cc-progress{padding:0 20px 4px}
.cc-progress-bar{height:4px;background:rgba(255,255,255,.04);border-radius:2px;overflow:hidden}
.cc-progress-fill{height:100%;border-radius:2px;transition:width .6s ease-out}
.cc-action{padding:10px 20px;border-top:1px solid var(--border);display:flex;align-items:center;gap:8px}
.cc-action code{font-size:11px;color:var(--purple-light);font-weight:600}
.cc-action span{font-size:10px;color:var(--text-3)}
.cc-chevron{margin-left:auto;font-size:14px;color:var(--text-3);transition:transform .3s}
.client-card.expanded .cc-chevron{transform:rotate(180deg)}

/* DETAIL PANEL */
.cc-detail{max-height:0;overflow:hidden;transition:max-height .4s ease;border-top:0 solid var(--border)}
.client-card.expanded .cc-detail{max-height:2000px;border-top-width:1px}
.cc-detail-inner{padding:16px 20px;display:grid;grid-template-columns:1fr 1fr;gap:14px}
.detail-section{margin-bottom:8px}
.detail-section .ds-title{font-size:9px;font-weight:700;color:var(--text-3);text-transform:uppercase;letter-spacing:1.5px;margin-bottom:6px}
.detail-section .ds-item{font-size:11px;color:var(--text-2);margin-bottom:3px;line-height:1.5}
.detail-section .ds-item code{font-size:10px;background:rgba(139,92,246,.1);padding:1px 5px;border-radius:3px;color:var(--purple-light)}
.ds-tag{display:inline-block;font-size:9px;background:var(--surface-2);border:1px solid var(--border);border-radius:4px;padding:2px 7px;margin:2px;color:var(--text-2);font-family:'JetBrains Mono',monospace}

/* TIMELINE */
.timeline{position:relative;padding-left:20px}
.timeline::before{content:'';position:absolute;left:6px;top:4px;bottom:4px;width:1px;background:var(--border-2)}
.tl-item{position:relative;margin-bottom:10px;padding-left:16px}
.tl-item::before{content:'';position:absolute;left:-17px;top:5px;width:7px;height:7px;border-radius:50%;background:var(--purple);border:2px solid var(--bg)}
.tl-date{font-family:'JetBrains Mono',monospace;font-size:9px;color:var(--text-3)}
.tl-event{font-size:11px;color:var(--text-2)}

/* FORECAST */
.fc-row{display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--border)}
.fc-row:last-child{border-bottom:none}
.fc-name{width:140px;font-weight:600;font-size:13px;flex-shrink:0}
.fc-stage{width:100px;flex-shrink:0}
.fc-bar-wrap{flex:1;height:22px;background:rgba(255,255,255,.02);border-radius:4px;overflow:hidden}
.fc-bar{height:100%;border-radius:4px;transition:width .8s ease-out;display:flex;align-items:center;justify-content:flex-end;padding-right:8px;font-size:9px;font-weight:700;color:rgba(0,0,0,.7)}
.fc-values{width:180px;display:flex;gap:16px;flex-shrink:0;text-align:right}
.fc-values span{font-family:'JetBrains Mono',monospace;font-size:12px}
.fc-total{background:rgba(52,211,153,.06);border:1px solid rgba(52,211,153,.15);border-radius:8px;padding:14px 20px;margin-top:12px;display:flex;justify-content:space-between;align-items:center}
.fc-total .ft-label{font-size:12px;font-weight:700;color:var(--emerald);text-transform:uppercase;letter-spacing:1px}
.fc-total .ft-value{font-family:'JetBrains Mono',monospace;font-size:20px;font-weight:800;color:var(--emerald)}

/* RISK */
.risk-card{background:var(--surface);border:1px solid rgba(239,68,68,.15);border-left:3px solid var(--red);border-radius:10px;padding:18px 20px;margin-bottom:12px}
.risk-card .rk-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}
.risk-card .rk-name{font-weight:700;font-size:14px}
.risk-card .rk-days{font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--red);font-weight:700}
.risk-card .rk-reason{font-size:11px;color:var(--text-2);margin-bottom:8px}
.risk-card .rk-action{font-size:11px;color:var(--text-3)}
.risk-card .rk-action code{color:var(--amber);font-weight:600}
.no-risk-card{background:var(--surface);border:1px solid rgba(52,211,153,.15);border-left:3px solid var(--emerald);border-radius:10px;padding:18px 20px}
.no-risk-card p{font-size:13px;color:var(--text-2)}
.no-risk-card strong{color:var(--emerald)}

/* ACTIVITY FEED */
.feed-item{display:flex;gap:14px;padding:10px 0;border-bottom:1px solid var(--border)}
.feed-item:last-child{border-bottom:none}
.feed-date{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text-3);width:80px;flex-shrink:0;padding-top:2px}
.feed-client{font-size:12px;font-weight:600;width:120px;flex-shrink:0}
.feed-event{font-size:12px;color:var(--text-2);flex:1}
.feed-file{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text-3)}

/* TEAM */
.team-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px}
.team-card{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:18px 20px}
.team-card h4{font-size:14px;font-weight:700;margin-bottom:8px}
.team-card .tm-stat{display:flex;justify-content:space-between;font-size:11px;color:var(--text-2);margin-bottom:4px}
.team-card .tm-stat .tm-val{font-family:'JetBrains Mono',monospace;font-weight:600;color:var(--text)}
.team-bar{height:6px;background:rgba(255,255,255,.04);border-radius:3px;overflow:hidden;display:flex;margin-top:8px}
.team-bar-seg{height:100%}

/* QUICK ACTIONS */
.qa-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.qa-card{background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:14px 16px;transition:all .2s;cursor:default}
.qa-card:hover{border-color:var(--purple);background:rgba(139,92,246,.04)}
.qa-card.high{border-left:3px solid var(--amber)}
.qa-card.normal{border-left:3px solid var(--purple)}
.qa-card code{font-size:12px;color:var(--purple-light);font-weight:600;display:block;margin-bottom:4px}
.qa-card p{font-size:10px;color:var(--text-3);line-height:1.4}

/* EMPTY STATE */
.empty{text-align:center;padding:80px 0}
.empty svg{opacity:.2;margin-bottom:16px}
.empty h2{font-size:20px;font-weight:700;color:var(--text-2);margin-bottom:8px}
.empty p{font-size:13px;color:var(--text-3)}
.empty code{color:var(--purple-light)}

/* FOOTER */
.footer{padding:32px 0;border-top:1px solid var(--border);text-align:center;font-size:10px;color:var(--text-3);letter-spacing:1px;text-transform:uppercase}
.footer span{color:var(--text-2)}

/* COLORS */
.c-purple{color:var(--purple-light)}
.c-emerald{color:var(--emerald)}
.c-amber{color:var(--amber)}
.c-blue{color:var(--blue)}
.c-pink{color:var(--pink)}
.c-cyan{color:var(--cyan)}
.c-orange{color:var(--orange)}
.c-red{color:var(--red)}
.c-gray{color:var(--text-3)}
.bg-purple{background:rgba(139,92,246,.12);border-color:rgba(139,92,246,.2);color:var(--purple-light)}
.bg-emerald{background:rgba(52,211,153,.12);border-color:rgba(52,211,153,.2);color:var(--emerald)}
.bg-amber{background:rgba(251,191,36,.12);border-color:rgba(251,191,36,.2);color:var(--amber)}
.bg-blue{background:rgba(96,165,250,.12);border-color:rgba(96,165,250,.2);color:var(--blue)}
.bg-pink{background:rgba(244,114,182,.12);border-color:rgba(244,114,182,.2);color:var(--pink)}
.bg-cyan{background:rgba(34,211,238,.12);border-color:rgba(34,211,238,.2);color:var(--cyan)}
.bg-orange{background:rgba(251,146,60,.12);border-color:rgba(251,146,60,.2);color:var(--orange)}
.bg-red{background:rgba(239,68,68,.12);border-color:rgba(239,68,68,.2);color:var(--red)}
.bg-gray{background:rgba(255,255,255,.04);border-color:rgba(255,255,255,.08);color:var(--text-3)}

/* RESPONSIVE */
@media(max-width:1024px){.stats{grid-template-columns:repeat(3,1fr)}.client-grid,.qa-grid{grid-template-columns:1fr 1fr}.cc-detail-inner{grid-template-columns:1fr}}
@media(max-width:768px){.nav-links{display:none}.nav-links.open{display:flex;flex-direction:column;position:absolute;top:56px;left:0;right:0;background:rgba(10,8,18,.96);padding:12px;border-bottom:1px solid var(--border)}.nav-toggle{display:block}.stats{grid-template-columns:repeat(2,1fr)}.client-grid,.qa-grid{grid-template-columns:1fr}.hero h1{font-size:28px}.controls{flex-direction:column;align-items:stretch}.search-box{width:100%}.fc-row{flex-wrap:wrap}.fc-name{width:100%}.fc-values{width:100%;justify-content:flex-start;gap:24px}.funnel-label{width:80px;font-size:10px}.funnel-meta{width:70px;font-size:10px}.tab-bar{overflow-x:auto;flex-wrap:nowrap}.tab{white-space:nowrap;flex-shrink:0}}
@media(max-width:480px){.container{padding:0 16px}.hero{padding-top:80px}.stat .num{font-size:22px}.stat{padding:14px 10px}}
</style>
</head>
<body>
<div class="blob blob-1"></div>
<div class="blob blob-2"></div>

<nav class="nav">
  <div class="nav-brand"><div class="dot"></div><span>Irrelevant</span></div>
  <button class="nav-toggle" onclick="document.querySelector('.nav-links').classList.toggle('open')">&#9776;</button>
  <div class="nav-links">
    <a href="#pipeline" class="active">Pipeline</a>
    <a href="#forecast">Forecast</a>
    <a href="#risk">Riesgo</a>
    <a href="#activity">Actividad</a>
    <a href="#actions">Acciones</a>
  </div>
  <div class="nav-meta" id="nav-meta"></div>
</nav>

<div class="container">
  <div class="hero fi">
    <div class="sub">Irrelevant Sales OS</div>
    <h1>Pipeline <em>Dashboard</em></h1>
  </div>

  <div class="stats" id="stats-container"></div>

  <section class="sec fi" id="pipeline">
    <div class="sec-title"><div class="dot" style="background:var(--purple)"></div> Pipeline Funnel</div>
    <div class="funnel" id="funnel-container"></div>
    <div class="controls" id="controls-container"></div>
    <div class="tab-bar" id="tab-bar">
      <div class="tab active" data-tab="cards">Clientes</div>
      <div class="tab" data-tab="forecast">Forecast</div>
      <div class="tab" data-tab="risk">Riesgo</div>
      <div class="tab" data-tab="activity">Actividad</div>
    </div>
    <div class="tab-content active" id="tab-cards">
      <div class="client-grid" id="client-grid"></div>
    </div>
    <div class="tab-content" id="tab-forecast"></div>
    <div class="tab-content" id="tab-risk"></div>
    <div class="tab-content" id="tab-activity"></div>
  </section>

  <section class="sec fi" id="team-section">
    <div class="sec-title"><div class="dot" style="background:var(--blue)"></div> Equipo</div>
    <div class="team-grid" id="team-container"></div>
  </section>

  <section class="sec fi" id="actions">
    <div class="sec-title"><div class="dot" style="background:var(--amber)"></div> Acciones Sugeridas</div>
    <div class="qa-grid" id="actions-container"></div>
  </section>

  <div class="footer">Generado por <span>Irrelevant Sales OS</span> &bull; <span id="footer-date"></span></div>
</div>

<div id="empty-state" style="display:none" class="container">
  <div class="empty">
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></svg>
    <h2>No hay clientes en el pipeline</h2>
    <p>Crea tu primer cliente con <code>/cliente crear [empresa]</code></p>
  </div>
</div>

<script>
const D={{DATA_JSON}};
const STAGES=['nuevo','preparacion','discovery','diseno','cotizacion','negociacion','contratos','produccion','entrega','post-entrega','cerrado'];
const STAGE_COLORS={nuevo:'gray',preparacion:'cyan',discovery:'blue',diseno:'purple',cotizacion:'amber',negociacion:'orange',contratos:'emerald',produccion:'purple',entrega:'emerald','post-entrega':'pink',cerrado:'emerald'};
const STAGE_LABELS={nuevo:'Nuevo',preparacion:'Preparación',discovery:'Discovery',diseno:'Diseño',cotizacion:'Cotización',negociacion:'Negociación',contratos:'Contratos',produccion:'Producción',entrega:'Entrega','post-entrega':'Post-Entrega',cerrado:'Cerrado'};
const CSS_COLORS={'purple':'#A78BFA','emerald':'#34d399','amber':'#fbbf24','blue':'#60a5fa','pink':'#f472b6','cyan':'#22d3ee','orange':'#fb923c','red':'#ef4444','gray':'rgba(255,255,255,0.35)'};

function fmt(n){if(!n)return'—';if(n>=1e6)return'$'+Math.round(n/1e6)+'M';if(n>=1e3)return'$'+Math.round(n/1e3)+'K';return'$'+n}
function fmtFull(n){if(!n)return'—';return'$'+n.toLocaleString('es-CO')}
function healthColor(s){return s>=70?'emerald':s>=40?'amber':'red'}
function healthSVG(score,size=44){const r=17,c=2*Math.PI*r,d=c*(1-score/100),col=CSS_COLORS[healthColor(score)];return`<div class="health-circle" style="width:${size}px;height:${size}px"><svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="3"/><circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${col}" stroke-width="3" stroke-dasharray="${c}" stroke-dashoffset="${d}" stroke-linecap="round"/></svg><div class="val" style="color:${col}">${score}</div></div>`}
function badge(text,color){return`<span class="badge bg-${color}">${text}</span>`}
function daysColor(d){return d>14?'red':d>7?'amber':'emerald'}

function renderStats(){
  const s=D.summary;const el=document.getElementById('stats-container');
  el.innerHTML=`
    <div class="stat fi"><div class="num c-purple">${s.totalClients}</div><div class="lbl">Clientes</div></div>
    <div class="stat fi"><div class="num c-emerald">${fmt(s.totalValue)}</div><div class="lbl">Pipeline Total</div><div class="extra">${fmtFull(s.totalValue)} COP</div></div>
    <div class="stat fi"><div class="num c-amber">${fmt(s.weightedValue)}</div><div class="lbl">Ponderado</div><div class="extra">valor × probabilidad</div></div>
    <div class="stat fi"><div class="num" style="display:flex;justify-content:center">${healthSVG(s.avgHealthScore,48)}</div><div class="lbl">Health Promedio</div></div>
    <div class="stat fi"><div class="num ${s.atRisk>0?'c-red':'c-emerald'}">${s.atRisk}</div><div class="lbl">En Riesgo</div><div class="extra">&gt;14 días sin actividad</div></div>
    <div class="stat fi"><div class="num c-blue">${s.avgVelocity||'—'}</div><div class="lbl">Velocidad</div><div class="extra">días/etapa promedio</div></div>`;
}

function renderFunnel(){
  const el=document.getElementById('funnel-container');const byStage=D.summary.byStage;
  const maxCount=Math.max(...Object.values(byStage),1);let html='';
  STAGES.forEach(s=>{const count=byStage[s]||0;const pct=count?Math.max((count/maxCount)*100,8):0;const col=CSS_COLORS[STAGE_COLORS[s]];
    const vals=D.clients.filter(c=>c.stage===s).reduce((a,c)=>a+c.value,0);
    html+=`<div class="funnel-row fi"><div class="funnel-label" style="color:${col}">${STAGE_LABELS[s]}</div><div class="funnel-bar-wrap"><div class="funnel-bar" style="width:${count?pct:0}%;background:${col}">${count||''}</div></div><div class="funnel-meta">${count} &bull; ${fmt(vals)}</div></div>`;
  });el.innerHTML=html;
}

function renderControls(){
  const el=document.getElementById('controls-container');const activeStages=[...new Set(D.clients.map(c=>c.stage))];
  let html=`<input class="search-box" type="text" placeholder="Buscar cliente..." id="search-input">`;
  activeStages.forEach(s=>{html+=`<button class="filter-btn on" data-stage="${s}" style="border-color:${CSS_COLORS[STAGE_COLORS[s]]};color:${CSS_COLORS[STAGE_COLORS[s]]}">${STAGE_LABELS[s]}</button>`});
  html+=`<select class="sort-select" id="sort-select"><option value="urgency">Urgencia</option><option value="value">Valor</option><option value="name">Nombre</option><option value="health">Health Score</option><option value="stage">Etapa</option></select>`;
  el.innerHTML=html;
}

function renderClientCards(){
  const el=document.getElementById('client-grid');let html='';
  D.clients.forEach((c,i)=>{
    const stgColor=STAGE_COLORS[c.stage]||'gray';const col=CSS_COLORS[stgColor];
    const stageIdx=STAGES.indexOf(c.stage);const progress=((stageIdx+1)/STAGES.length)*100;
    const isRisk=c.daysInStage>14||c.healthScore<40;
    html+=`<div class="client-card fi ${isRisk?'risk':''}" data-id="${c.id}" data-stage="${c.stage}" data-value="${c.value}" data-health="${c.healthScore}" data-days="${c.daysInStage}" data-name="${c.empresa}">
      <div class="cc-top"><div class="cc-info"><h3>${c.empresa}</h3><div class="cc-industry">${c.industria}</div></div>${healthSVG(c.healthScore)}</div>
      <div class="cc-meta">${badge(c.stageLabel,stgColor)} ${c.servicio?badge(c.servicio,'purple'):badge('Por definir','gray')} <span style="font-size:10px;color:var(--text-3)">Comercial: ${c.comercial}</span></div>
      <div class="cc-values"><div><div class="cc-val" style="color:${col}">${fmtFull(c.value)}</div><div class="cc-val-label">Valor deal</div></div><div><div class="cc-val-sub">${fmtFull(c.weightedValue)}</div><div class="cc-val-label">Ponderado</div></div><div><div class="cc-val-sub c-${daysColor(c.daysInStage)}">${c.daysInStage}d</div><div class="cc-val-label">En etapa</div></div></div>
      <div class="cc-progress"><div class="cc-progress-bar"><div class="cc-progress-fill" style="width:${progress}%;background:${col}"></div></div></div>
      <div class="cc-action"><code>${c.nextAction.command}</code><span>${c.nextAction.description}</span><span class="cc-chevron">&#9660;</span></div>
      <div class="cc-detail"><div class="cc-detail-inner">
        <div><div class="detail-section"><div class="ds-title">Contacto</div><div class="ds-item">${c.contacto}</div>${(c.personasClave||[]).map(p=>`<div class="ds-item" style="font-size:10px;color:var(--text-3)">${p}</div>`).join('')}${c.comoLlego?`<div class="ds-item" style="margin-top:6px;font-size:10px;color:var(--text-3)">Origen: ${c.comoLlego}</div>`:''}</div>
        ${c.painPoints&&c.painPoints.length?`<div class="detail-section"><div class="ds-title">Pain Points</div>${c.painPoints.map(p=>`<div class="ds-item">• ${p}</div>`).join('')}</div>`:''}
        ${c.proposedSkills&&c.proposedSkills.length?`<div class="detail-section"><div class="ds-title">Skills Propuestos</div><div>${c.proposedSkills.map(s=>`<span class="ds-tag">${s}</span>`).join('')}</div></div>`:''}
        ${c.stackTools&&c.stackTools.length?`<div class="detail-section"><div class="ds-title">Stack</div><div>${c.stackTools.map(t=>`<span class="ds-tag">${t}</span>`).join('')}</div></div>`:''}
        ${c.callScore?`<div class="detail-section"><div class="ds-title">Call Score</div><div class="ds-item" style="font-size:16px;font-weight:700;color:${CSS_COLORS[c.callScore>=7?'emerald':c.callScore>=5?'amber':'red']}">${c.callScore}/10</div></div>`:''}</div>
        <div><div class="detail-section"><div class="ds-title">Archivos</div>${Object.entries(c.files||{}).filter(([k,v])=>v.length>0).map(([k,v])=>`<div style="margin-bottom:6px"><div style="font-size:9px;color:var(--text-3);text-transform:uppercase;letter-spacing:1px;margin-bottom:2px">${k}/</div>${v.map(f=>`<span class="ds-tag">${f}</span>`).join('')}</div>`).join('')}</div>
        ${c.timeline&&c.timeline.length?`<div class="detail-section"><div class="ds-title">Historial</div><div class="timeline">${c.timeline.map(t=>`<div class="tl-item"><div class="tl-date">${t.date}</div><div class="tl-event">${t.event}</div></div>`).join('')}</div></div>`:''}</div>
      </div></div>
    </div>`;
  });el.innerHTML=html;
}

function renderForecast(){
  const el=document.getElementById('tab-forecast');let html='<div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px">';
  D.clients.forEach(c=>{const col=CSS_COLORS[STAGE_COLORS[c.stage]];
    html+=`<div class="fc-row"><div class="fc-name">${c.empresa}</div><div class="fc-stage">${badge(c.stageLabel,STAGE_COLORS[c.stage])}</div><div class="fc-bar-wrap"><div class="fc-bar" style="width:${c.probability}%;background:${col}">${c.probability}%</div></div><div class="fc-values"><span style="color:var(--text-2)">${fmtFull(c.value)}</span><span style="color:var(--emerald)">${fmtFull(c.weightedValue)}</span></div></div>`;
  });
  html+=`</div><div class="fc-total"><div class="ft-label">Pipeline Ponderado Total</div><div class="ft-value">${fmtFull(D.summary.weightedValue)}</div></div>`;
  el.innerHTML=html;
}

function renderRisk(){
  const el=document.getElementById('tab-risk');const risky=D.clients.filter(c=>c.daysInStage>14||c.healthScore<40);
  if(!risky.length){el.innerHTML=`<div class="no-risk-card"><p><strong>Sin deals en riesgo.</strong> Todos los clientes tienen actividad reciente y health score saludable.</p></div>`;return}
  let html='';risky.forEach(c=>{
    const reason=c.daysInStage>14?`${c.daysInStage} días sin actividad`:`Health score bajo (${c.healthScore}/100)`;
    html+=`<div class="risk-card"><div class="rk-header"><div class="rk-name">${c.empresa}</div><div class="rk-days">${c.daysInStage}d</div></div><div class="rk-reason">${reason} — Etapa: ${c.stageLabel}</div><div class="rk-action">Acción sugerida: <code>${c.nextAction.command}</code></div></div>`;
  });el.innerHTML=html;
}

function renderActivity(){
  const el=document.getElementById('tab-activity');
  if(!D.activityFeed||!D.activityFeed.length){el.innerHTML='<p style="color:var(--text-3);font-size:13px">Sin actividad registrada.</p>';return}
  let html='<div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px 20px">';
  D.activityFeed.slice(0,50).forEach(a=>{html+=`<div class="feed-item"><div class="feed-date">${a.date}</div><div class="feed-client">${a.client}</div><div class="feed-event">${a.event}</div><div class="feed-file">${a.file||''}</div></div>`});
  html+='</div>';el.innerHTML=html;
}

function renderTeam(){
  const el=document.getElementById('team-container');const teams={};
  D.clients.forEach(c=>{const t=c.comercial||'Sin asignar';if(!teams[t])teams[t]={clients:0,value:0,weighted:0,healthSum:0,stages:{}};teams[t].clients++;teams[t].value+=c.value;teams[t].weighted+=c.weightedValue;teams[t].healthSum+=c.healthScore;const s=c.stage;teams[t].stages[s]=(teams[t].stages[s]||0)+1});
  let html='';Object.entries(teams).forEach(([name,t])=>{
    const avgH=Math.round(t.healthSum/t.clients);
    const segs=Object.entries(t.stages).map(([s,count])=>`<div class="team-bar-seg" style="width:${(count/t.clients)*100}%;background:${CSS_COLORS[STAGE_COLORS[s]]}"></div>`).join('');
    html+=`<div class="team-card fi"><h4>${name}</h4><div class="tm-stat"><span>Clientes</span><span class="tm-val">${t.clients}</span></div><div class="tm-stat"><span>Pipeline</span><span class="tm-val">${fmt(t.value)}</span></div><div class="tm-stat"><span>Ponderado</span><span class="tm-val">${fmt(t.weighted)}</span></div><div class="tm-stat"><span>Health promedio</span><span class="tm-val c-${healthColor(avgH)}">${avgH}</span></div><div class="team-bar">${segs}</div></div>`;
  });el.innerHTML=html;
}

function renderActions(){
  const el=document.getElementById('actions-container');
  if(!D.quickActions||!D.quickActions.length){el.innerHTML='<p style="color:var(--text-3)">Sin acciones pendientes.</p>';return}
  let html='';D.quickActions.forEach(a=>{html+=`<div class="qa-card ${a.priority||'normal'}"><code>${a.command}</code><p>${a.reason}</p></div>`});
  el.innerHTML=html;
}

function setupInteractivity(){
  // Tabs
  document.querySelectorAll('.tab').forEach(t=>{t.addEventListener('click',()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));document.querySelectorAll('.tab-content').forEach(x=>x.classList.remove('active'));t.classList.add('active');document.getElementById('tab-'+t.dataset.tab).classList.add('active')})});
  // Search
  const si=document.getElementById('search-input');if(si)si.addEventListener('input',()=>{const q=si.value.toLowerCase();document.querySelectorAll('.client-card').forEach(c=>{c.style.display=c.dataset.name.toLowerCase().includes(q)?'':'none'})});
  // Filters
  document.querySelectorAll('.filter-btn').forEach(b=>{b.addEventListener('click',()=>{b.classList.toggle('on');applyFilters()})});
  // Sort
  const ss=document.getElementById('sort-select');if(ss)ss.addEventListener('change',()=>sortCards(ss.value));
  // Accordions
  document.querySelectorAll('.client-card').forEach(c=>{c.addEventListener('click',e=>{if(e.target.closest('.filter-btn,.search-box,.sort-select'))return;c.classList.toggle('expanded')})});
  // Nav links
  document.querySelectorAll('.nav-links a').forEach(a=>{a.addEventListener('click',()=>{document.querySelectorAll('.nav-links a').forEach(x=>x.classList.remove('active'));a.classList.add('active')})});
}

function applyFilters(){
  const active=[...document.querySelectorAll('.filter-btn.on')].map(b=>b.dataset.stage);
  document.querySelectorAll('.client-card').forEach(c=>{const match=active.includes(c.dataset.stage);c.style.display=match?'':'none'});
}

function sortCards(by){
  const grid=document.getElementById('client-grid');const cards=[...grid.children];
  cards.sort((a,b)=>{switch(by){case'urgency':return(+b.dataset.days)-(+a.dataset.days);case'value':return(+b.dataset.value)-(+a.dataset.value);case'name':return a.dataset.name.localeCompare(b.dataset.name);case'health':return(+a.dataset.health)-(+b.dataset.health);case'stage':return STAGES.indexOf(b.dataset.stage)-STAGES.indexOf(a.dataset.stage);default:return 0}});
  cards.forEach(c=>grid.appendChild(c));
}

function setupAnimations(){
  const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('v');obs.unobserve(e.target)}})},{threshold:0.1});
  document.querySelectorAll('.fi').forEach((el,i)=>{el.style.transitionDelay=(i%8)*50+'ms';obs.observe(el)});
}

document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('nav-meta').innerHTML=`<span>${D.summary.totalClients}</span> clientes &bull; ${new Date(D.generatedAt).toLocaleDateString('es-CO',{day:'numeric',month:'short',year:'numeric'})}`;
  document.getElementById('footer-date').textContent=new Date(D.generatedAt).toLocaleString('es-CO');
  if(!D.clients||!D.clients.length){document.querySelector('.container').style.display='none';document.getElementById('empty-state').style.display='block';return}
  renderStats();renderFunnel();renderControls();renderClientCards();renderForecast();renderRisk();renderActivity();renderTeam();renderActions();setupInteractivity();setupAnimations();
  // Animate funnel bars after render
  setTimeout(()=>{document.querySelectorAll('.funnel-bar').forEach(b=>{const w=b.style.width;b.style.width='0';requestAnimationFrame(()=>{b.style.width=w})})},100);
});
</script>
</body>
</html>
```

---

## Reglas

- **Español** por defecto
- SIEMPRE sobreescribir `Assets Fijos/pipeline-dashboard.html`
- El template de arriba se copia TEXTUALMENTE — solo reemplaza `{{DATA_JSON}}` con el JSON real
- NO modifiques CSS, HTML ni JS del template bajo ninguna circunstancia
- Si no hay clientes, genera el JSON con `clients: []` — el template maneja el empty state
- Los valores deben ser realistas — usar precios de CLAUDE.md
- Ordenar clientes por urgencia (más días sin actividad primero)
- Health scores: Galco debería estar ~80-90 (muy completo), MAAS ~65-75 (intermedio), Acrecer ~45-55 (temprano)
- `activityFeed` se genera a partir del Historial de cada README + archivos encontrados
- `quickActions` son las 6 acciones más urgentes/impactantes across all clients
