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
│   │   ├── Slides Assessment/         # Templates slides de assessment/hallazgos (ES)
│   │   ├── Slides Propuesta Ops/     # Templates slides propuesta Ops (ES/EN + ejemplo + Edu upsell)
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

## Arquitectura de Productos · 4 Capas Económicas

**Actualizado 2026-04-22 post Sesión 1 Strategy Cascade (Roger Martin).**

Ver detalle completo en [`docs/CASCADE_ALIGNMENT.md`](docs/CASCADE_ALIGNMENT.md) y [`Assets Fijos/PROP_VALUE_IRRELEVANT.md`](Assets%20Fijos/PROP_VALUE_IRRELEVANT.md).

### CAPA 0 · Proyectos Custom (Badge)
- **Rol**: credibilidad · "construimos con AI, por eso enseñamos con autoridad"
- **Precio**: $5-15M COP setup · retainer mantenimiento opcional
- **Capacidad**: 2-3 proyectos/mes MAX
- **Ejemplos**: Indemneasy · Fynder · Hotel Aramé · Grasshopper

### CAPA 1a · AI Edu Empresarial (Soteco-style)
- **Precio**: ~$10M COP + IVA (mensual) · ~$8M (intensiva)
- **Qué es**: programa empresarial 4 sesiones × 3h · personalizado vía Discovery + Form · grupos max 10 personas · plan 30 días post-programa
- **Template**: `Templates/Comercial/Programa Edu Empresarial/`
- **Reemplaza al anterior Workshop Think AI de 3 horas**

### CAPA 1b · AI Edu Cohorts (B2C por lanzamiento)
- **Precio**: USD $300 early bird · $350 regular · $400 last minute
- **Qué es**: cohort digital 1 mes · mix 60% pregrabado + 30% live + 10% comunidad · por vertical específico
- **Lanzamientos**: Sales AI (1 jun 2026) · Operations AI (Q3) · Marketing AI (Q4)
- **Modelo**: por lanzamiento · no siempre disponible
- **Template**: `Templates/Comercial/Cohort B2C/`

### CAPA 2 · AI Ops Layer (Setup de Claude)
- **Precio**: $7.000.000 COP + IVA / $3,500 USD
- **Qué es**: Setup completo de infraestructura AI para una área específica de operación · 5 skills · 1 semana
- **Modelo**: **one-shot · sin retainer** (decisión JP 2026-04-22)
- **Condiciones**: 50% anticipo + 50% entrega

### CAPA 3 · AI Core Layer (Embedded AI Operator)
- **Precio**: Basado en impacto · implementación inicial + **retainer mensual recurrente**
- **Qué es**: transformación completa · nos quedamos adentro operando · producto-corazón · MRR premium
- **Capacidad**: 3-5 cuentas simultáneas MAX
- **Proceso**: Discovery → Fase 0 → Implementación → Embedded operation permanente

---

## A quién NO servimos (exclusiones explícitas)

Ver [`docs/ICP.md`](docs/ICP.md) para detalle completo. Resumen:

- ❌ Enterprise global ($50M+ USD revenue) · excepción tolerada Bancolombia
- ❌ Startups pre-seed (<$100k revenue)
- ❌ Audience "AI general" sin vertical
- ❌ Consultoría pura sin implementación
- ❌ SaaS genérico / integrador commodity
- ❌ Empresas tradicionales sin champion interno
- ❌ Pilotos/POCs sin compromiso

Para ejecutar rechazos estructurados ver [`docs/PROTOCOLO_REJECT.md`](docs/PROTOCOLO_REJECT.md).

---

## Insight contrarian · ángulo comercial central

> **"Las empresas que implementen AI sin comprensión + sin personalización NO generarán ventaja competitiva. La ventaja está en la especificidad."**

Este es el ángulo en cada conversación comercial. Ver [`Assets Fijos/PROP_VALUE_IRRELEVANT.md`](Assets%20Fijos/PROP_VALUE_IRRELEVANT.md) sección 2 para objection handling.

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

## Skills Disponibles (35 total)

### Gestión, Navegación y Construcción (3 skills)

| Skill | Comando | Descripcion |
|---|---|---|
| **¿Qué Sigue?** | **`/que-sigue`** | **Tu GPS — te dice exactamente dónde estás y qué skill ejecutar ahora** |
| Cliente | `/cliente` | Crea, consulta y lista carpetas de clientes |
| Crear Skill | `/crear-skill` | Construye skills de Claude Code basándose en la guía de Anthropic |

| Skill | Comando | Descripcion |
|---|---|---|
| Cliente | `/cliente` | Crea, consulta y lista carpetas de clientes. Usa /cliente [crear\|ver\|listar] [empresa] |

### Assessment Ops Layer (2 skills)

| Skill | Comando | Descripcion |
|---|---|---|
| Discovery Ops | `/discovery-ops` | Discovery estructurado con 5 pilares obligatorios para Ops Layer. Produce output que alimenta el assessment |
| Reporte Assessment | `/reporte-assessment` | Análisis profundo + slides de assessment. Matriz de procesos, ROI 3 escenarios, costo de no actuar |

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

### Documentos y Comercial (10 skills)

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
| Slides Propuesta Ops | `/slides-propuesta-ops` | Genera slides de presentacion de propuesta para Ops Layer (5 skills + stack + precio) |

### Ventas y Coaching (8 skills — Framework Irrelevant)

| Skill | Comando | Descripcion |
|---|---|---|
| Prep Call | `/prep-call` | Investiga empresa, coaching tactico, guion de referencia, recursos a presentar, pain points y objeciones |
| Email Sequence | `/email-sequence` | Genera secuencia de prospecting multicanal (5 touchpoints, 18 dias) |
| Call Simulator | `/call-simulator` | Simula llamada (role-play) o genera guion completo de call con scripts listos |
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
/discovery-notes                 → Extrae brief del discovery (genérico)

ASSESSMENT (post-discovery, pre-diseño — Ops Layer):
/discovery-ops [empresa]         → Discovery estructurado 5 pilares obligatorios
/reporte-assessment [empresa]    → Análisis profundo + slides assessment (urgencia)

CONTEXTO (en cualquier momento):
/agregar-contexto [empresa]      → Agrega contexto: URL, LinkedIn, notas

DISEÑO (post-assessment):
/disenar-skills [empresa]        → Qué 5 procesos construir (Ops Layer)
/disenar-solucion [empresa]      → Solución técnica (Core Layer)
/disenar-stack [empresa]         → Stack de herramientas (consulta Supabase)

DOCUMENTOS:
/cotizacion [empresa]            → Genera cotizacion
/slides-propuesta-ops [empresa]  → Slides de propuesta Ops (5 skills + stack + precio + Edu upsell)
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
- **REGLA CRITICA — Chat primero, archivo despues:** TODOS los skills deben mostrar su output completo en el chat ANTES de guardar el archivo. El chat es la herramienta de trabajo interactiva — el comercial debe poder leer el resultado, hacer preguntas, pedir ajustes, y discutirlo. El archivo guardado es la referencia persistente. Nunca guardar en silencio sin mostrar en chat.
