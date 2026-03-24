<div align="center">

<img src="https://storage.googleapis.com/cluvi/The-Host/repo_image.png" alt="Irrelevant Operating System" width="100%">

# Irrelevant Operating System

**Think AI or stay irrelevant.**

El sistema operativo completo de Irrelevant — desde el primer contacto con un prospecto hasta la entrega del proyecto y el seguimiento post-entrega. Todo el ciclo comercial y de producción de la empresa vive aquí.

[![Skills](https://img.shields.io/badge/Skills-30-8B5CF6?style=for-the-badge)](/) [![Services](https://img.shields.io/badge/Servicios-3-34d399?style=for-the-badge)](/) [![Pipeline](https://img.shields.io/badge/Pipeline-9_etapas-fbbf24?style=for-the-badge)](/) [![E2E](https://img.shields.io/badge/Sistema-End_to_End-60a5fa?style=for-the-badge)](/)

</div>

---

## Qué es esto

Es un workspace de [Claude Code](https://claude.ai/claude-code) que contiene:

- **30 skills** (comandos) que automatizan cada paso del proceso comercial
- **Templates** para cotizaciones, contratos, entregables y presentaciones (ES + EN)
- **Contratos legales** revisados para los 3 servicios
- **Assets de ventas** listos para enviar (pitch decks, one pagers, casos de éxito)
- **Sistema de carpetas por cliente** donde se acumula todo el historial
- **Catálogo de 80+ skills** pre-diseñadas para clientes

El equipo usa Claude Code como su copiloto diario. En vez de crear documentos desde cero, armar cotizaciones manualmente o perder información entre llamadas — ejecuta un comando y el sistema genera todo automáticamente, usando la información acumulada del cliente.

---

## Cómo empezar

### Requisitos

- [Claude Code CLI](https://claude.ai/claude-code) instalado
- Cuenta de Anthropic con acceso a Claude
- Git instalado

### Instalación

```bash
git clone [URL_DEL_REPO]
cd Claude_Code
```

Claude Code detecta automáticamente las skills en `.claude/skills/` y las activa.

### Tu primer comando

```bash
# Si no sabes qué hacer, pregúntale al sistema:
/que-sigue

# Para crear un nuevo cliente:
/cliente crear [nombre-empresa]

# Para preparar una call:
/prep-call [nombre-empresa]
```

---

## Los 3 servicios de Irrelevant

| Servicio | Qué es | Precio COP | Precio USD |
|----------|--------|-----------|-----------|
| **AI Ops Layer** | Setup de IA: diagnóstico + motor de IA + stack + 5 procesos inteligentes. 1 semana. | $7.000.000 + IVA | $3,500 |
| **AI Edu Layer** | Workshop Think AI: 3 horas (45 min conceptual + 2h15 práctico). Suite de Claude. | $4.500.000 + IVA | $2,500 |
| **AI Core Layer** | Transformación del core del negocio. Fase 0 + implementación + fee mensual. 8-12 semanas. | Basado en impacto | Basado en impacto |

---

## El ciclo completo (9 etapas)

```
1. PROSPECTING        →  Investigar empresa, preparar approach, practicar la call
2. DISCOVERY           →  Hacer la call, procesar transcript, extraer brief
3. DISEÑO              →  Definir qué construir (skills/solución) y con qué herramientas
4. PROPUESTA           →  Cotización, ROI, Fase 0 (Core Layer)
5. CIERRE              →  Contratos firmados, anticipo pagado
6. CONSTRUCCIÓN        →  Construir skills, implementar sistemas
7. ENTREGA             →  Documento entregable + slides de presentación
8. POST-ENTREGA        →  Check-ins de seguimiento, detectar oportunidades de upsell
9. PRODUCCIÓN          →  Solo Core Layer: kickoff, weekly updates, gestión del proyecto
```

Cada etapa tiene skills específicos. El sistema `/que-sigue` te dice exactamente en qué etapa está cada cliente y qué comando ejecutar.

---

## Las 30 skills

### Navegación y gestión

| Comando | Qué hace |
|---------|----------|
| `/que-sigue [empresa]` | **Tu GPS.** Te dice dónde estás y qué hacer ahora. Úsalo cuando estés perdido. |
| `/cliente crear [empresa]` | Crea la carpeta del cliente con toda la estructura |
| `/cliente ver [empresa]` | Muestra el estado del pipeline del cliente |
| `/cliente listar` | Lista todos los clientes activos |
| `/crear-skill [nombre]` | Construye una skill de Claude Code completa |

### Pre-call y ventas

| Comando | Qué hace |
|---------|----------|
| `/prep-call [empresa]` | Investiga la empresa + prepara agenda, preguntas, objeciones y mensaje de outreach |
| `/email-sequence [empresa]` | Genera secuencia de prospecting multicanal (5 touchpoints, 18 días) |
| `/call-simulator` | Simula una call de ventas (random, real, o desde research) |
| `/objection-gym` | Practica manejo de objeciones con scoring |
| `/framework-quiz` | Quiz interactivo del framework de ventas |

### Post-call

| Comando | Qué hace |
|---------|----------|
| `/procesar-call` | Jala el transcript de Fireflies automáticamente |
| `/call-review` | Evalúa la call contra el framework (score + feedback) |
| `/follow-up-writer` | Genera follow-up para WhatsApp |
| `/email-post-reunion` | Genera email profesional post-reunión con adjuntos recomendados |
| `/discovery-notes` | Extrae brief estructurado del discovery call |
| `/resumen-reunion` | Genera acta de reunión con action items |

### Diseño (post-discovery)

| Comando | Qué hace |
|---------|----------|
| `/disenar-skills [empresa]` | Define 5 procesos inteligentes para Ops Layer (match con catálogo de 80+ skills) |
| `/disenar-solucion [empresa]` | Define la solución técnica para Core Layer |
| `/disenar-stack [empresa]` | Selecciona herramientas del catálogo de Supabase en tiempo real |

### Documentos y cierre

| Comando | Qué hace |
|---------|----------|
| `/cotizacion [empresa] [ops\|edu]` | Genera cotización HTML (acepta RUT para extraer datos automáticamente) |
| `/calcular-roi [empresa]` | Calcula ROI personalizado para presentar en reunión |
| `/fase0 [empresa]` | Genera documento de Fase 0 + slides (Core Layer) |
| `/contrato [empresa] [ops\|edu\|core]` | Genera paquete completo de contratos (acepta RUT) |
| `/entregable [empresa]` | Genera documento entregable + slides post-setup |

### Customer success

| Comando | Qué hace |
|---------|----------|
| `/check-in [empresa]` | Genera agenda de seguimiento post-entrega (semana 2, mes 1, mes 2+) |
| `/upsell [empresa]` | Analiza al cliente y sugiere siguiente servicio con mensaje de approach |

### Internal ops

| Comando | Qué hace |
|---------|----------|
| `/pipeline-dashboard` | Genera HTML con el estado de todos los clientes del pipeline |
| `/weekly-standup` | Genera agenda del standup semanal del equipo |
| `/weekly-sales-report` | Genera reporte semanal HTML con métricas de ventas |

### Core Layer producción

| Comando | Qué hace |
|---------|----------|
| `/kickoff [empresa]` | Genera materiales del kickoff meeting (agenda + slides + email) |
| `/weekly-update [empresa]` | Genera reporte semanal de avance del proyecto |

---

## Estructura de carpetas

```
Claude_Code/
│
├── .claude/skills/              ← 30 skills que corren en este workspace
│
├── Assets Fijos/                ← Documentos listos para enviar (no se modifican)
│   ├── Pitch Deck/              4 versiones: ES/EN, con/sin precio
│   ├── One Pager/               2 versiones: ES, EN (para outreach)
│   ├── Entregable Ejemplo/      Ejemplo real de entregable (NovaTech)
│   ├── Fase 0 Ejemplo/          Ejemplo real de Fase 0 (Escuela Ingeniería)
│   ├── PROP_VALUE_IRRELEVANT.md  La biblia: prop value, portafolio, casos de éxito
│   ├── framework-ventas.html     Metodología de ventas C1/C2/C3
│   ├── guide-building-skills.pdf Guía oficial de Anthropic para construir skills
│   ├── showcase-skills.html      Catálogo de 80+ skills pre-diseñadas
│   └── skills-reference.html     ESTE sistema — el Operating System visual
│
├── Templates/                   ← Templates con {{placeholders}} que los skills rellenan
│   ├── Comercial/
│   │   ├── Cotizacion Ops Layer/    ES + EN + ejemplo real
│   │   ├── Cotizacion Edu Layer/    ES + EN + ejemplo real
│   │   ├── Fase 0 Core Layer/      ES + EN + ejemplo real
│   │   ├── Slides Fase 0/          ES + EN + ejemplo real
│   │   ├── Entregable Ops Layer/   ES + EN + ejemplo real
│   │   └── Slides Entregable Ops/  ES + EN + ejemplo real
│   └── Contratos/
│       ├── AI Ops Layer/    Contrato + Acuerdo de Pago + NDA
│       ├── AI Edu Layer/    Contrato + Acuerdo de Pago + NDA
│       └── AI Core Layer/   Contrato + Acuerdo de Pago + NDA + Alcance Técnico
│
├── Clientes/                    ← Carpeta por cliente (se crea con /cliente crear)
│   └── [empresa]/
│       ├── README.md             Ficha del cliente
│       ├── contexto/             Transcripts, notas, archivos del cliente
│       ├── discovery/            Discovery notes, prep calls
│       ├── diseno/               Propuesta de skills, solución, stack
│       ├── comercial/            Cotizaciones, emails, ROI
│       ├── contratos/            Paquete contractual
│       ├── fase0/                Documento y slides de Fase 0
│       ├── entregable/           Documento y slides del entregable
│       ├── produccion/           Kickoff y weekly updates (Core Layer)
│       ├── evaluaciones/         Call reviews, check-ins, follow-ups
│       └── skills/               Skills construidas para este cliente
│
├── Skills Construidas/          ← Todas las skills ya implementadas
│   ├── sales-irrelevant/         12 skills de ventas originales
│   ├── [nombre-cliente]/         Skills construidas para un cliente
│   └── genericas/                Skills reutilizables
│
├── CLAUDE.md                    ← Instrucciones del workspace para Claude
└── README.md                    ← Este archivo
```

---

## Carpeta del cliente

Cada cliente tiene su propia carpeta donde se acumula TODO. Los skills guardan ahí automáticamente.

```bash
# Crear un nuevo cliente
/cliente crear bancolombia

# Ver en qué etapa está
/cliente ver bancolombia

# Listar todos los clientes
/cliente listar
```

La información fluye entre carpetas:
- `discovery/` alimenta a `diseno/`
- `diseno/` alimenta a `fase0/` y `entregable/`
- `fase0/` alimenta a `contratos/` (Core Layer)
- Todo alimenta a `evaluaciones/` (post-entrega)

---

## Herramientas externas conectadas

| Herramienta | Para qué | Skills que la usan |
|-------------|----------|-------------------|
| **Fireflies MCP** | Transcripts de reuniones y llamadas | `/procesar-call`, `/discovery-notes`, `/resumen-reunion`, `/fase0`, `/entregable`, `/weekly-update` |
| **Supabase API** | Catálogo de herramientas en tiempo real | `/disenar-stack` |
| **WebSearch** | Investigación de empresas | `/prep-call`, `/disenar-skills` |
| **RUT Reader** | Extrae datos legales de PDF/imagen | `/cotizacion`, `/contrato` |
| **Cal.com** | Link de agenda para discovery calls | Todos los skills de outreach |

---

## Playbooks: cómo abordar cada servicio

### El rol del comercial

> **La IA genera los documentos. Tú generas la información.**

Cada skill produce outputs tan buenos como la información que recibe. En cada call, tu trabajo es extraer: dolores específicos, números, procesos, herramientas que usan, tamaño del equipo, qué les quita el sueño.

**Regla de oro:** Si el prospect habla más del 60% de la call, vas bien.

### Ops Layer (7 pasos → 1 semana)

1. `/cliente crear` → Crear carpeta
2. `/prep-call` → Research + preparación
3. Call real (grabar en Fireflies)
4. `/procesar-call` → `/discovery-notes` → `/email-post-reunion`
5. `/disenar-skills` → `/disenar-stack`
6. `/cotizacion ops` → `/contrato ops` → **Firma + anticipo**
7. `/crear-skill` ×5 → `/entregable`
8. `/check-in` → `/upsell`

### Core Layer (8 pasos → 8-12 semanas)

1. `/cliente crear` → `/prep-call`
2. Discovery profundo (2-3 calls) → `/discovery-notes` por cada una
3. `/disenar-solucion` → `/disenar-stack`
4. `/fase0` (genera doc + slides) → presentar
5. `/cotizacion core` → `/contrato core` → **Firma + anticipo**
6. `/kickoff` → `/weekly-update` (×8-12 semanas)
7. Entrega del proyecto
8. `/check-in` → `/upsell`

### Edu Layer (5 pasos → 1 semana)

1. `/cliente crear` → `/prep-call`
2. Call + `/email-post-reunion`
3. `/cotizacion edu` → `/contrato edu` → **Firma + anticipo**
4. Sesión de contexto + Dictar workshop (3 horas)
5. `/check-in` → `/upsell`

---

## Para ingenieros: cómo agregar o modificar

### Agregar un skill nuevo

```bash
# Opción 1: Usar el skill builder
/crear-skill [nombre-del-skill]

# Opción 2: Manual
mkdir .claude/skills/mi-nuevo-skill
# Crear SKILL.md siguiendo la guía en Assets Fijos/guide-building-skills-claude.pdf
```

Cada skill es un archivo `SKILL.md` dentro de `.claude/skills/[nombre]/`. Formato:

```yaml
---
name: mi-skill                    # kebab-case, debe coincidir con el nombre de la carpeta
description: >
  Qué hace. Cuándo se activa.     # Máximo 1024 chars. Incluir trigger phrases.
  Usa /mi-skill [argumentos]
argument-hint: "[argumentos]"
allowed-tools: [Read, Write, Glob, AskUserQuestion]
---

# Nombre del Skill

Instrucciones en Markdown...
```

**Reglas (de la guía de Anthropic):**
- `name` siempre en kebab-case, sin mayúsculas, sin espacios
- `description` DEBE incluir qué hace + cuándo usarla (trigger phrases)
- NO incluir README.md dentro de la carpeta del skill
- NO usar "claude" ni "anthropic" en el name
- Seguir progressive disclosure: YAML ligero, body detallado

### Modificar un template

Los templates están en `Templates/` y usan placeholders `{{PLACEHOLDER}}`. Para modificar:

1. Abrir el template HTML
2. Editar el contenido (mantener los `{{PLACEHOLDER}}`)
3. Verificar que el ejemplo correspondiente sigue siendo coherente
4. Los skills que usan ese template lo tomarán automáticamente

### Agregar un contrato nuevo

Los contratos están en `Templates/Contratos/[servicio]/`. Son HTML legales con placeholders. Si necesitas modificar cláusulas, asegúrate de que:

- Los placeholders `{{CLIENTE_*}}` sigan presentes
- La numeración de cláusulas sea correcta
- Las referencias cruzadas entre documentos (contrato ↔ anexos) sean consistentes

### Agregar un asset fijo

Los assets fijos en `Assets Fijos/` son documentos que se envían tal cual. Para agregar uno nuevo:

1. Crear el HTML en `Assets Fijos/`
2. Documentarlo en `PROP_VALUE_IRRELEVANT.md` si es relevante
3. Si algún skill debe usarlo, agregar la referencia en el SKILL.md correspondiente

---

## Flujo diario del equipo

```bash
# Inicio del día
git pull                          # Sincronizar cambios del equipo

# Trabajar normalmente con Claude Code
/que-sigue                        # ¿Qué hago hoy?
/pipeline-dashboard               # ¿Cómo va el pipeline?
/weekly-standup                   # Preparar el standup

# Al final del día
git add .
git commit -m "Avances del día"
git push
```

---

## Datos de Irrelevant

| Campo | Valor |
|-------|-------|
| Razón social | IRRELEVANT CLUB S.A.S. |
| NIT | 901.935.642-1 |
| Representante Legal | Juan Pablo Gómez Mejía |
| Email | jpgomez@stayirrelevant.com |
| Teléfono | +57 318 335 1733 |
| Web | stayirrelevant.com |
| Discovery Call | [cal.com/juan-irrelevant/discovery](https://cal.com/juan-irrelevant/discovery) |

---

## Guía visual

Abre `Assets Fijos/skills-reference.html` en el browser para ver el **Operating System visual** — el pipeline completo, las 30 skills documentadas, los playbooks por servicio, los assets disponibles, y los power combos.

---

*Think AI or stay irrelevant.*
*30 skills — 3 servicios — 9 etapas — sistema end-to-end*
