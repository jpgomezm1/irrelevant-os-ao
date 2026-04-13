# Spec Tecnico: Skills para Unified Systems
## Basado en "The Complete Guide to Building Skills for Claude"

## Resumen de Matching con Showcase

| # | Skill | Fuente | Match |
|---|-------|--------|-------|
| 1 | call-simulator-insurance | Showcase Combo 12 #67 (Call Simulator) | Adaptado — cambiar framework B2B por protocolo Medicare/seguros |
| 2 | agent-onboarding | Showcase Combo 03 #21 (SOP) | Nuevo — el SOP es estatico, esto es interactivo con quiz |
| 3 | qa-scorecard | Showcase Combo 12 #70 (Call Review) + Combo 02 #15 (Feedback) | Adaptado — scorecard de compliance insurance, no framework Irrelevant |
| 4 | campaign-script-generator | Showcase Combo 05 #31 (Guiones para Redes) | Nuevo — contexto completamente diferente (call center insurance) |
| 5 | daily-performance-digest | Showcase Combo 06 #39 (Reporte por Area) + Combo 08 #54 (Resumen Diario) | Adaptado — enfocado en metricas de call center/dialer |

Skills nuevos a agregar al showcase: 3 (agent-onboarding, campaign-script-generator como nuevos; los demas son adaptaciones)

---

## Skill 1: call-simulator-insurance

### Frontmatter
```yaml
---
name: call-simulator-insurance
description: >
  Simula llamadas de Medicare, Ancillary, Final Expense y ACA para que agentes practiquen
  sin quemar leads reales. Use when user says "practice", "simulate call", "practicar llamada",
  or "/practice [campaign]". Soporta ingles y espanol.
argument-hint: "[campaign: medicare|ancillary|final-expense|aca] [language: en|es]"
allowed-tools: ["Read", "Write", "Glob", "AskUserQuestion"]
---
```

### Categoria Anthropic
Workflow Automation — proceso multi-paso con metodologia consistente (simular, evaluar, coaching)

### Arquitectura
- **Level 1 (YAML):** Trigger phrases, campanas disponibles, idiomas
- **Level 2 (SKILL.md):** Flujo de simulacion: seleccion de campana → generacion de persona del cliente → simulacion interactiva → evaluacion contra scorecard
- **Level 3 (references/):**
  - `references/medicare-protocol.md` — preguntas obligatorias, compliance rules, script base Medicare
  - `references/ancillary-protocol.md` — protocolo Ancillary/Hospital Indemnity
  - `references/final-expense-protocol.md` — protocolo Final Expense closing
  - `references/compliance-rules.md` — reglas de compliance federales (CMS, TCPA)
  - `references/scoring-rubric.md` — rubrica de evaluacion

### Tools y MCPs
- **Built-in tools:** Read (protocolos), Write (guardar evaluacion), AskUserQuestion (simulacion interactiva)
- **MCPs necesarios:** Ninguno
- **Hooks:** Ninguno
- **Subagents:** Ninguno

### Workflow
1. Usuario elige campana (medicare/ancillary/final-expense) e idioma (en/es)
2. Sistema lee el protocolo correspondiente de references/
3. Sistema genera persona del cliente (edad, situacion, nivel de cooperacion, objeciones probables)
4. Simulacion interactiva: sistema actua como cliente, usuario responde
5. Al finalizar (transfer exitoso o llamada perdida): evaluacion contra scorecard
6. Output: score numerico + fortalezas + areas de mejora + coaching especifico

### Input / Output
- **Input:** Campana + idioma + nivel de dificultad (opcional)
- **Output:** Transcript de la simulacion + scorecard + coaching

### Complejidad
Media — requiere crear los protocolos de cada campana (references/) y la rubrica de evaluacion. La logica del skill es similar al Call Simulator existente de Irrelevant.

---

## Skill 2: agent-onboarding

### Frontmatter
```yaml
---
name: agent-onboarding
description: >
  Guia interactiva de onboarding para agentes nuevos de call center. Cubre protocolos de campana,
  uso del dialer, codigos de disposicion, compliance y verificacion de conocimiento.
  Use when user says "onboarding", "nuevo agente", "new agent", or "/onboarding [name] [campaign]".
argument-hint: "[agent-name] [campaign: medicare|ancillary|final-expense|aca]"
allowed-tools: ["Read", "Write", "AskUserQuestion"]
---
```

### Categoria Anthropic
Workflow Automation — proceso multi-paso con validation gates (quiz por modulo)

### Arquitectura
- **Level 1 (YAML):** Trigger phrases, campanas
- **Level 2 (SKILL.md):** Flujo de onboarding: bienvenida → modulo campana → modulo dialer → modulo compliance → modulo transfer → quiz final → checklist
- **Level 3 (references/):**
  - `references/medicare-protocol.md` (compartido con call-simulator)
  - `references/dialer-guide.md` — como usar VICIdial: dial next, disposiciones, pause codes
  - `references/compliance-rules.md` (compartido)
  - `references/transfer-protocol.md` — paso a paso de como transferir a agente licenciado
  - `references/disposition-codes.md` — tabla de codigos de disposicion y cuando usar cada uno

### Tools y MCPs
- **Built-in tools:** Read (protocolos), Write (generar checklist completado), AskUserQuestion (quiz interactivo)
- **MCPs necesarios:** Ninguno
- **Hooks:** Ninguno
- **Subagents:** Ninguno

### Workflow
1. Supervisor registra nombre del agente y campana asignada
2. Modulo 1: Que es [campana] — contexto del producto, mercado, perfil del cliente
3. Modulo 2: El dialer — como funciona VICIdial, dial next, disposiciones
4. Modulo 3: Compliance — que decir, que NO decir, reglas CMS/TCPA
5. Modulo 4: Protocolo de transferencia — paso a paso, buffer time esperado
6. Quiz de verificacion por modulo (3-5 preguntas cada uno)
7. Output: checklist de onboarding completado + score del quiz + areas a reforzar

### Input / Output
- **Input:** Nombre del agente + campana
- **Output:** Checklist de onboarding completado (md) + score del quiz

### Complejidad
Media — requiere crear todo el contenido de references/ con Abdul (protocolos reales de la empresa). La logica del skill es step-by-step con validation gates.

---

## Skill 3: qa-scorecard

### Frontmatter
```yaml
---
name: qa-scorecard
description: >
  Analiza transcripts de llamadas contra el scorecard de compliance y calidad de la campana.
  Evalua presentacion, preguntas obligatorias, compliance, buffer time y disposicion.
  Use when user says "QA", "review call", "quality check", "evaluar llamada", or "/qa-review".
argument-hint: "[paste transcript or file path]"
allowed-tools: ["Read", "Write", "Glob"]
---
```

### Categoria Anthropic
Document & Asset Creation — genera scorecard/reporte consistente desde input variable

### Arquitectura
- **Level 1 (YAML):** Trigger phrases
- **Level 2 (SKILL.md):** Flujo: recibir transcript → identificar campana → evaluar contra scorecard → generar reporte
- **Level 3 (references/):**
  - `references/scorecard-medicare.md` — criterios de evaluacion Medicare
  - `references/scorecard-ancillary.md` — criterios Ancillary
  - `references/scorecard-final-expense.md` — criterios Final Expense
  - `references/compliance-rules.md` (compartido)
  - `references/red-flags.md` — patrones que indican problemas graves (promesas falsas, info incorrecta)

### Tools y MCPs
- **Built-in tools:** Read (scorecards, transcripts), Write (generar reporte), Glob (buscar transcripts en batch)
- **MCPs necesarios:** Ninguno (transcripts se pegan o se cargan como archivo)
- **Hooks:** Ninguno
- **Subagents:** Para batch processing de multiples transcripts, usar subagent por transcript

### Workflow
1. QA manager pega transcript o indica ruta de archivo(s)
2. Sistema detecta campana (Medicare, Ancillary, etc.) por contexto
3. Evalua contra scorecard especifico:
   - Presentacion correcta (0-10)
   - Preguntas obligatorias completadas (0-10)
   - Compliance (0-10) — red flags criticos
   - Duracion/buffer time (0-10)
   - Disposicion correcta (0-10)
4. Score total + red flags + coaching sugerido
5. Si es batch: tabla resumen de todos los agentes evaluados

### Input / Output
- **Input:** Transcript(s) de llamada(s)
- **Output:** Scorecard individual o tabla resumen batch + red flags + coaching

### Complejidad
Media-Alta — la evaluacion de compliance requiere domain expertise que debe estar muy bien definida en references/. El batch processing agrega complejidad.

---

## Skill 4: campaign-script-generator

### Frontmatter
```yaml
---
name: campaign-script-generator
description: >
  Genera scripts completos para llamadas de call center por campana e idioma.
  Incluye apertura, calificacion, objeciones, transferencia y cierre.
  Use when user says "generate script", "crear script", "new campaign script",
  or "/generate-script [campaign] [language]".
argument-hint: "[campaign: medicare|ancillary|final-expense|aca] [language: en|es]"
allowed-tools: ["Read", "Write"]
---
```

### Categoria Anthropic
Document & Asset Creation — genera documento consistente con embedded style guide

### Arquitectura
- **Level 1 (YAML):** Trigger phrases, campanas, idiomas
- **Level 2 (SKILL.md):** Flujo: seleccion de campana → lectura de protocolo → generacion de script completo con variantes
- **Level 3 (references/):**
  - `references/medicare-protocol.md` (compartido)
  - `references/script-style-guide.md` — tono, longitud, reglas de comunicacion por idioma
  - `references/common-objections.md` — objeciones frecuentes por campana con respuestas
  - `references/cultural-adaptation.md` — diferencias culturales hispano vs anglo para adaptar scripts

### Tools y MCPs
- **Built-in tools:** Read (protocolos), Write (generar script)
- **MCPs necesarios:** Ninguno
- **Hooks:** Ninguno
- **Subagents:** Ninguno

### Workflow
1. Usuario indica campana e idioma
2. Sistema lee protocolo de la campana y style guide
3. Genera script completo:
   - Apertura (3 variantes)
   - Preguntas de calificacion (secuencia exacta)
   - Manejo de objeciones (5-8 mas comunes con respuesta)
   - Protocolo de transferencia (que decir al pasar la llamada)
   - Cierre (si no califica, si pide callback, si pide DNC)
4. Output: script formateado listo para imprimir o cargar al dialer

### Input / Output
- **Input:** Campana + idioma
- **Output:** Script completo con variantes (md o PDF)

### Complejidad
Baja-Media — es principalmente Document Creation. Requiere el contenido de references/ pero la logica del skill es directa.

---

## Skill 5: daily-performance-digest

### Frontmatter
```yaml
---
name: daily-performance-digest
description: >
  Genera resumen ejecutivo diario de performance del call center. Top/bottom agentes,
  campanas vs target, alertas de coaching, anomalias. Lectura de 2 minutos.
  Use when user says "daily digest", "daily report", "reporte del dia",
  or "/daily-digest".
allowed-tools: ["Read", "Write", "Glob"]
---
```

### Categoria Anthropic
Document & Asset Creation — genera reporte consistente desde data variable

### Arquitectura
- **Level 1 (YAML):** Trigger phrases
- **Level 2 (SKILL.md):** Flujo: recibir data del dia → analizar metricas → generar digest con alertas y recomendaciones
- **Level 3 (references/):**
  - `references/kpi-targets.md` — targets por campana (7 calls exitosas/agente, buffer >180s, etc.)
  - `references/alert-thresholds.md` — umbrales para alertas (underperformance, pause time excesivo, etc.)
  - `references/digest-template.md` — formato del digest

### Tools y MCPs
- **Built-in tools:** Read (data, targets), Write (generar digest)
- **MCPs necesarios:** Potencialmente MCP de VICIdial si se conecta directo a la DB (futuro). Inicialmente, data se pega o carga como CSV/Excel.
- **Hooks:** Potencial cron hook para ejecucion automatica al final del dia
- **Subagents:** Ninguno

### Workflow
1. Usuario pega data del dia (export del dialer: agente, calls, disposiciones, talk time, pause time) o sistema la jala via MCP
2. Sistema analiza contra targets definidos en references/
3. Genera digest:
   - Headline del dia (ej: "82% del target alcanzado — 3 agentes criticos")
   - Top 5 agentes (con metricas)
   - Bottom 5 agentes (con recomendacion: practica, coaching, o red flag)
   - Performance por campana vs target
   - Anomalias detectadas
   - Recomendacion de accion para manana
4. Output: digest corto y ejecutivo

### Input / Output
- **Input:** Data del dialer (CSV, Excel, o texto pegado)
- **Output:** Digest ejecutivo (md) — lectura de 2 minutos

### Complejidad
Baja-Media — Document Creation con analisis. La mayor complejidad es definir bien los targets y thresholds con el cliente.

---

## Dependencias entre Skills

```
campaign-script-generator → call-simulator-insurance
  (el simulador usa los scripts como referencia de "respuesta ideal")

agent-onboarding → call-simulator-insurance
  (al final del onboarding, el agente practica con el simulador)

qa-scorecard → daily-performance-digest
  (los red flags del QA alimentan las alertas del digest)

campaign-script-generator → qa-scorecard
  (los scripts definen contra que se evalua en el QA)
```

## Archivos Compartidos entre Skills (references/)

| Archivo | Usado por |
|---------|-----------|
| `medicare-protocol.md` | call-simulator, agent-onboarding, campaign-script-generator, qa-scorecard |
| `ancillary-protocol.md` | call-simulator, agent-onboarding, campaign-script-generator, qa-scorecard |
| `final-expense-protocol.md` | call-simulator, agent-onboarding, campaign-script-generator, qa-scorecard |
| `compliance-rules.md` | call-simulator, agent-onboarding, qa-scorecard |
| `disposition-codes.md` | agent-onboarding, qa-scorecard |

**Nota:** Los protocolos de campana son el corazon del sistema. Se deben construir CON Abdul — el tiene el conocimiento de dominio. Sin estos archivos, los skills no funcionan.

## Stack de Herramientas Necesario
→ Ejecutar /disenar-stack unified-systems para el detalle

## Desarrollo Aparte: Dashboard de Performance
No es un skill — es un producto web que se conecta al VICIdial (API/MySQL):
- **Tech stack sugerido:** React + Supabase (o PostgreSQL) + API connector al VICIdial
- **Features:** Real-time agent status, KPIs por campana, alertas, vista mobile
- **Se cotiza separado del Ops Layer**

## Criterios de Exito
- Skill triggers en 90% de queries relevantes
- Simulacion completa en <15 interacciones
- QA scorecard consistente (mismo transcript = mismo score +/-5%)
- Onboarding completable sin intervencion humana
- Digest generado en <30 segundos desde data cargada
