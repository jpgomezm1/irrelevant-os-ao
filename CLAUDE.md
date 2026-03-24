# Irrelevant — Stack Comercial (Claude Code Workspace)

## Que es

Stack comercial de **Irrelevant** para generar documentos, procesar calls, y gestionar pipeline. Este workspace contiene templates HTML para cotizaciones, contratos, entregables y presentaciones, junto con skills de Claude Code que automatizan la generacion de estos documentos y el procesamiento de informacion comercial.

---

## Datos Fijos de Irrelevant

| Campo | Valor |
|---|---|
| **Razon social** | IRRELEVANT CLUB S.A.S. |
| **NIT** | 901.935.642-1 |
| **Representante Legal** | Juan Pablo Gomez Mejia |
| **CC** | 1006972309 |
| **Domicilio** | Medellin, Antioquia |
| **Email** | jpgomez@stayirrelevant.com |
| **Telefono** | +57 318 335 1733 |
| **Web** | stayirrelevant.com |
| **Cal.com** | https://cal.com/juan-irrelevant/discovery |

### Logo URLs

- **Logo principal:** https://storage.googleapis.com/cluvi/nuevo_irre-removebg-preview.png
- **Logo perfil (contratos):** https://storage.googleapis.com/cluvi/Audios_Cata/profile_irrelevant.jpeg

---

## Estructura de Carpetas

```
Claude_Code/
├── Assets Fijos/
│   ├── Pitch Deck/          # Decks de presentacion (ES/EN, con/sin precios)
│   ├── One Pager/            # One pagers (ES/EN)
│   ├── Entregable Ejemplo/   # Ejemplo real de entregable
│   └── Fase 0 Ejemplo/       # Ejemplo real de Fase 0
├── Templates/
│   ├── Comercial/
│   │   ├── Cotizacion Ops Layer/    # Templates cotizacion AI Ops (ES/EN + ejemplo)
│   │   ├── Cotizacion Edu Layer/    # Templates cotizacion AI Edu (ES/EN + ejemplo)
│   │   ├── Fase 0 Core Layer/       # Templates Fase 0 diagnostico (ES/EN + ejemplo)
│   │   ├── Slides Fase 0/           # Templates slides Fase 0 (ES/EN + ejemplo)
│   │   ├── Entregable Ops Layer/    # Templates entregable post-setup (ES/EN + ejemplo)
│   │   └── Slides Entregable Ops/   # Templates slides entregable (ES/EN + ejemplo)
│   └── Contratos/
│       ├── AI Core Layer/    # Contrato + 3 anexos (pago, NDA, alcance)
│       ├── AI Ops Layer/     # Contrato + 2 anexos (pago, NDA)
│       └── AI Edu Layer/     # Contrato + 2 anexos (pago, NDA)
└── .claude/
    └── skills/               # 11 skills de automatizacion comercial
```

---

## Servicios y Precios

### AI Ops Layer (Setup de IA)
- **Precio:** $7.000.000 COP + IVA / $3,500 USD
- **Que es:** Setup completo de infraestructura de IA para operaciones. Implementacion de sistemas, flujos automatizados y stack de herramientas.

### AI Edu Layer (Workshop Think AI)
- **Precio:** $4.500.000 COP + IVA / $2,500 USD
- **Que es:** Workshop de capacitacion en IA para equipos. Entrenamiento practico en herramientas y mentalidad AI-first.

### AI Core Layer (Transformation)
- **Precio:** Basado en impacto (implementacion + fee mensual)
- **Que es:** Transformacion completa. Diagnostico profundo (Fase 0), implementacion personalizada y acompanamiento continuo.

---

## Carpetas de Clientes

Cada cliente tiene su carpeta en `Clientes/[empresa-lowercase]/` con toda la información organizada:

```
Clientes/[empresa]/
├── README.md          ← Ficha del cliente
├── contexto/          ← Transcripts, notas, archivos del cliente
├── discovery/         ← Discovery notes, prep calls
├── diseno/            ← Propuesta de skills, solución, stack
├── comercial/         ← Cotizaciones, emails, ROI
│   └── emails/
├── contratos/         ← Paquete contractual
├── fase0/             ← Documento y slides de Fase 0 (Core Layer)
├── entregable/        ← Documento y slides del entregable (Ops Layer)
├── produccion/        ← Producción del Core Layer
│   ├── kickoff/       ← Materiales del kickoff meeting
│   └── updates/       ← Reportes semanales de avance
└── evaluaciones/      ← Call reviews, follow-ups, check-ins
```

**Comandos:**
- `/cliente crear [empresa]` — Crea nueva carpeta con estructura completa
- `/cliente ver [empresa]` — Muestra estado del pipeline y archivos
- `/cliente listar` — Lista todos los clientes activos

**Todos los skills guardan sus outputs en la carpeta del cliente automáticamente.**

---

## Skills Construidas

Todas las skills que construimos para clientes se guardan en `Skills Construidas/`:

```
Skills Construidas/
├── sales-irrelevant/     ← Skills de ventas ya construidas (12)
├── [nombre-cliente]/     ← Skills construidas para un cliente específico
└── genericas/            ← Skills reutilizables entre clientes
```

Cuando se instala en la máquina del cliente, se copia la carpeta del skill a `.claude/skills/` del proyecto.

---

## Skills Disponibles (32 total)

### Gestión, Navegación y Construcción (3 skills)

| Skill | Comando | Descripcion |
|---|---|---|
| **¿Qué Sigue?** | **`/que-sigue`** | **Tu GPS — te dice exactamente dónde estás y qué skill ejecutar ahora** |
| Cliente | `/cliente` | Crea, consulta y lista carpetas de clientes |
| Crear Skill | `/crear-skill` | Construye skills de Claude Code basándose en la guía de Anthropic |

| Skill | Comando | Descripcion |
|---|---|---|
| Cliente | `/cliente` | Crea, consulta y lista carpetas de clientes. Usa /cliente [crear\|ver\|listar] [empresa] |

### Contexto e Inteligencia (2 skills)

| Skill | Comando | Descripcion |
|---|---|---|
| Procesar Transcript | `/procesar-transcript` | Procesa transcripts de reuniones no-pipeline (internas, estrategicas). Extrae contexto para consultoria |
| Agregar Contexto | `/agregar-contexto` | Agrega contexto del cliente: URLs, LinkedIn, notas. Acumula en contexto-general.md |

### Diseño y Pre-venta (3 skills)

| Skill | Comando | Descripcion |
|---|---|---|
| Diseñar Skills | `/disenar-skills` | Define qué 5 procesos inteligentes construir para Ops Layer. 2 outputs: cliente + equipo |
| Diseñar Solución | `/disenar-solucion` | Define solución de Core Layer (previo a Fase 0). 2 outputs: cliente + equipo |
| Diseñar Stack | `/disenar-stack` | Selecciona herramientas del catálogo Supabase en tiempo real. 2 outputs: cliente + equipo |

### Documentos y Comercial (9 skills)

| Skill | Comando | Descripcion |
|---|---|---|
| Cotizacion | `/cotizacion` | Genera cotizacion HTML para Ops o Edu Layer |
| Contrato | `/contrato` | Genera paquete completo de contratos |
| Fase 0 | `/fase0` | Genera documento de diagnostico para Core Layer |
| Entregable | `/entregable` | Genera entregable post-setup del Ops Layer |
| Procesar Call | `/procesar-call` | Procesa llamada de Fireflies automaticamente |
| Discovery Notes | `/discovery-notes` | Extrae brief estructurado de discovery call |
| Resumen Reunion | `/resumen-reunion` | Genera acta de reunion con action items |
| Calcular ROI | `/calcular-roi` | Calcula ROI personalizado para un prospecto |
| Email Post-Reunion | `/email-post-reunion` | Genera email profesional de seguimiento post-reunion |

### Ventas y Coaching (8 skills — Framework Irrelevant)

| Skill | Comando | Descripcion |
|---|---|---|
| Prep Call | `/prep-call` | Investiga empresa + prepara agenda, preguntas, objeciones y outreach |
| Email Sequence | `/email-sequence` | Genera secuencia de prospecting multicanal (5 touchpoints, 18 dias) |
| Call Simulator | `/call-simulator` | Simula llamada (random, real, o desde research de /prep-call) |
| Objection Gym | `/objection-gym` | Practica de manejo de objeciones con scoring |
| Framework Quiz | `/framework-quiz` | Quiz interactivo del framework de ventas Irrelevant |
| Call Review | `/call-review` | Analisis forense de llamadas contra el framework |
| Follow-up Writer | `/follow-up-writer` | Genera follow-up personalizado post-llamada |
| Weekly Sales Report | `/weekly-sales-report` | Reporte semanal HTML con metricas y evaluacion |

### Customer Success (2 skills)

| Skill | Comando | Descripcion |
|---|---|---|
| Check-In | `/check-in` | Genera agenda y preguntas para seguimiento post-entrega |
| Upsell | `/upsell` | Analiza cliente y sugiere siguiente servicio natural con approach |

### Internal Ops (2 skills)

| Skill | Comando | Descripcion |
|---|---|---|
| Pipeline Dashboard | `/pipeline-dashboard` | Genera HTML visual con estado de todos los clientes del pipeline |
| Weekly Standup | `/weekly-standup` | Genera agenda del standup semanal del equipo comercial |

### Core Layer Producción (2 skills)

| Skill | Comando | Descripcion |
|---|---|---|
| Kickoff | `/kickoff` | Genera materiales para kickoff meeting post-firma del Core Layer |
| Weekly Update | `/weekly-update` | Genera reporte semanal de avance del proyecto Core Layer |

### Flujo recomendado

```
PRE-CALL:
/prep-call [empresa]             → Investiga + prepara la call
/call-simulator [desde research] → Practica con ESE prospect

CALL:
[Hacer la call real]

POST-CALL:
/procesar-call                   → Jala transcript de Fireflies (pipeline)
/procesar-transcript [empresa]   → Procesa transcript no-pipeline (contexto)
/call-review                     → Evalua la call
/follow-up-writer                → Genera follow-up WhatsApp
/email-post-reunion              → Email profesional post-reunion
/discovery-notes                 → Extrae brief del discovery

CONTEXTO (en cualquier momento):
/agregar-contexto [empresa]      → Agrega contexto: URL, LinkedIn, notas

DISEÑO (post-discovery):
/disenar-skills [empresa]        → Qué 5 procesos construir (Ops Layer)
/disenar-solucion [empresa]      → Solución técnica (Core Layer)
/disenar-stack [empresa]         → Stack de herramientas (consulta Supabase)

DOCUMENTOS:
/cotizacion [empresa]            → Genera cotizacion
/contrato [empresa]              → Genera contratos (Core necesita Fase 0)
/fase0 [empresa]                 → Genera Fase 0 (usa output de /disenar-solucion)
/entregable [empresa]            → Genera entregable post-setup

PRODUCCIÓN (Core Layer):
/kickoff [empresa]               → Prepara kickoff meeting post-firma
/weekly-update [empresa]         → Genera reporte semanal de avance

POST-ENTREGA:
/check-in [empresa]              → Seguimiento post-entrega (adopción, impacto, crecimiento)
/upsell [empresa]                → Analiza oportunidad de siguiente servicio

INTERNAL OPS:
/pipeline-dashboard              → Dashboard HTML con estado de todo el pipeline
/weekly-standup                  → Agenda del standup semanal del equipo
```

### Documentos de referencia para TODOS los skills

1. **`Assets Fijos/PROP_VALUE_IRRELEVANT.md`** — Propuesta de valor completa: qué es Irrelevant, servicios, portafolio de 32+ soluciones, casos de éxito, diferenciadores, reglas de comunicación, clientes y contexto de mercado. **TODOS los skills deben leer este archivo** para estar alineados con el contexto de Irrelevant.

2. **`Assets Fijos/framework-ventas-irrelevant.html`** — Framework de ventas: metodología C1/C2/C3, reglas de scoring, objeciones, pipeline. Usado por los skills de ventas y coaching.

---

## Condiciones Comerciales Estandar

- **Forma de pago:** 50% anticipo + 50% contra entrega
- **Vigencia de cotizacion:** 15 dias calendario
- **Moneda:** COP (o USD para clientes internacionales)
- **IVA:** 19% (aplica sobre precio COP)

---

## Notas para Skills

- Idioma por defecto: espanol
- Todos los templates usan placeholders con formato `{{PLACEHOLDER}}`
- Los archivos de ejemplo (`ejemplo-escuela-ingenieria.html`) sirven como referencia de calidad
- Para templates con version ES y EN, preguntar idioma al usuario
- Los outputs se guardan en la misma carpeta del template o en una carpeta nueva segun el skill
