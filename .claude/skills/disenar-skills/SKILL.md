---
name: disenar-skills
description: >
  Define qué procesos inteligentes (skills) tiene sentido construir para un cliente del Ops Layer.
  Se basa en "The Complete Guide to Building Skills for Claude" de Anthropic.
  Genera propuesta para el cliente + spec técnico para el equipo con arquitectura de skills completa.
  Triggers: "diseñar skills", "qué skills le hacemos", "definir procesos", "propuesta de skills", "/disenar-skills".
  Usa /disenar-skills [empresa]
argument-hint: "[empresa]"
allowed-tools: [Read, Write, Glob, WebSearch, WebFetch, AskUserQuestion, mcp__fireflies__fireflies_get_transcript, mcp__fireflies__fireflies_get_transcripts, mcp__fireflies__fireflies_search, mcp__fireflies__fireflies_get_summary]
---

# Diseñar Skills — Definir Procesos Inteligentes para Ops Layer

Después del discovery, ANTES de cotizar, analizas la operación del cliente y defines QUÉ 5 procesos inteligentes tiene sentido construir. Te basas en el framework oficial de Anthropic para diseñar skills ("The Complete Guide to Building Skills for Claude").

Generas 2 documentos: uno para el cliente (lenguaje de negocio) y otro para el equipo (spec técnico con arquitectura de skills completa).

---

## STEP 0: Referencias (SIEMPRE leer primero)

1. `CLAUDE.md` — datos de Irrelevant
2. `Assets Fijos/PROP_VALUE_IRRELEVANT.md` — portafolio, servicios, casos de éxito
3. **`Assets Fijos/guide-building-skills-claude.pdf`** — La guía oficial de Anthropic para construir skills. Lee las secciones clave:
   - **Fundamentals** (pág 4-6): estructura de un skill, progressive disclosure, composability
   - **Planning and design** (pág 7-13): use cases, 3 categorías (Document Creation, Workflow Automation, MCP Enhancement), frontmatter, instrucciones efectivas
   - **Patterns** (pág 21-27): patrones comunes, progressive complexity, multi-step workflows
4. **`Assets Fijos/showcase-skills-irrelevant.html`** — CATÁLOGO de skills pre-diseñadas de Irrelevant. Lee este archivo COMPLETO. Contiene 14 combos con ~80 skills ya conceptualizadas organizadas por área:
   - Combo 01: Excel & Data (7 skills)
   - Combo 02: Comercial & Ventas (9 skills)
   - Combo 03: Documentos & Legal (5 skills)
   - Combo 04: Contabilidad & Finanzas (9 skills)
   - Combo 05: Marketing & Contenido (7 skills)
   - Combo 06: Reportes & Gerencia (7 skills)
   - Combo 07: Reuniones & Ejecución (5 skills)
   - Combo 08: Organización Interna (6 skills)
   - Combo 09: Operaciones (4 skills)
   - Combo 10: Productividad & Comunicación (4 skills)
   - Combo 11: Prospecting & Pre-Call (3 skills)
   - Combo 12: Coaching & Simulación de Ventas (4 skills)
   - Combo 13: Post-Call & Seguimiento (6 skills)
   - Combo 14: Diseño & Entrega de Soluciones (8 skills)

   **IMPORTANTE:** Este catálogo es tu referencia PRINCIPAL para hacer match con las necesidades del cliente.

Esta guía + el showcase son tus herramientas para diseñar skills.

---

## STEP 0.5: Verificar Carpeta del Cliente

Busca si existe carpeta del cliente en `Clientes/[empresa-lowercase]/` usando Glob.

**Si EXISTE:**
1. Usar esa carpeta para guardar outputs
2. Leer contexto previo relevante:
   - `Clientes/[empresa]/contexto/*` — transcripts y notas
   - `Clientes/[empresa]/discovery/*` — discovery notes
   - `Clientes/[empresa]/diseno/*` — propuestas y specs
   Esto enriquece tu output con todo el historial del cliente.

**Si NO EXISTE:**
Preguntar: *"No encontré carpeta para [Empresa]. ¿La creo? (o usa /cliente crear [empresa])"*
Si dice sí, crear la estructura básica de carpetas.

---

## STEP 1: Contexto del Cliente

*"Vamos a definir qué procesos inteligentes tiene sentido construir para este cliente.*

*1. Nombre de la empresa*
*2. Dame todo el contexto que tengas:*
*   📞 Transcripts de llamadas (rutas o pega el texto)*
*   🎙️ Fireflies (dime el nombre de la reunión)*
*   📝 Discovery notes (ruta del archivo de /discovery-notes)*
*   🌐 Web del cliente (URL para investigar)*
*   💬 Notas del comercial*
*3. ¿Qué áreas de la empresa conoces? (ventas, marketing, operaciones, finanzas, RRHH, atención al cliente)*
*4. ¿Cuántas personas tiene el equipo?*
*5. ¿Qué herramientas ya usan?"*

Lee todos los archivos. Investiga con WebSearch si dan URL. Jala Fireflies si aplica.

---

## STEP 2: Match con el Showcase de Skills

Este es el paso MÁS IMPORTANTE. Lee el showcase completo (`Assets Fijos/showcase-skills-irrelevant.html`) y haz matching:

### A. Analizar las necesidades del cliente

Con el contexto del STEP 1, identifica:
- ¿Qué áreas de la empresa tienen dolor? (ventas, marketing, finanzas, operaciones, etc.)
- ¿Qué tareas específicas son manuales y repetitivas?
- ¿Qué herramientas usan que se podrían potenciar con IA?

### B. Buscar match en el Showcase

Para cada necesidad identificada, busca en los 14 combos del showcase:
- ¿Hay un skill que ya resuelve exactamente esto?
- ¿Hay un skill similar que se podría adaptar?
- ¿El skill encaja en el combo correcto?

**Para cada skill que hace match, indicar:**
- Combo: [número y nombre]
- Skill: [número y nombre del showcase]
- Match: [exacto / adaptable / parcial]
- Adaptación necesaria: [si aplica]

### C. Skills que NO tienen match

Si alguna necesidad del cliente NO tiene match en el showcase:
1. Diseñar el skill nuevo desde cero
2. Determinar en qué combo debería ir (o si necesita un combo nuevo)
3. **AGREGAR al showcase:** Usar Write tool para agregar el skill nuevo al archivo `Assets Fijos/showcase-skills-irrelevant.html` en el combo correspondiente, siguiendo EXACTAMENTE el mismo formato HTML:

```html
<div class="skill-card c-[color]">
  <div class="skill-number">#[siguiente número]</div>
  <h3>[Nombre del skill]</h3>
  <div class="skill-area">[Área]</div>
  <p class="skill-problem">[Problema que resuelve]</p>
  <div class="skill-flow">
    <div class="step"><span class="step-icon">&#9654;</span> Le cargo: [input]</div>
    <div class="step"><span class="step-icon">&#9654;</span> El sistema: [procesamiento]</div>
    <div class="step"><span class="step-icon">&#9654;</span> Me devuelve: [output]</div>
  </div>
  <span class="output-badge">Output: [tipo de output]</span>
</div>
```

Colores por combo: c-purple, c-emerald, c-amber, c-blue, c-pink, c-cyan, c-orange, c-red

También actualizar el contador en el `combo-num` div (ej: "Combo 01 — 8 Skills" si era 7).

Confirmar al usuario: *"Agregué [X] skills nuevos al showcase: [lista]. El showcase ahora tiene [total] skills."*

---

## STEP 3: Seleccionar los 5 Skills Finales

### A. Priorizar

De todos los matches y skills nuevos, seleccionar los 5 de mayor impacto para este cliente:

1. **Impacto** — ¿Cuántas horas/semana ahorra?
2. **Frecuencia** — ¿Cuántas veces al día/semana se usaría?
3. **Complejidad** — ¿Es implementable en 1 semana?
4. **Match con showcase** — ¿Ya existe o hay que crearlo desde cero?

### B. Diseñar usando el Framework de Anthropic (pág 7-8 de la guía)

Para cada skill seleccionado, definir:
- **Use Case:** Qué quiere lograr el usuario
- **Trigger:** Qué dice o hace para activar el skill
- **Steps:** Pasos del workflow
- **Result:** Resultado final esperado

### C. Categorizar (pág 8-9 de la guía)

Asignar cada skill a una de las 3 categorías de Anthropic:

Para cada dolor identificado en el contexto, definir:
- **Use Case:** Qué quiere lograr el usuario
- **Trigger:** Qué dice o hace para activar el skill
- **Steps:** Pasos del workflow
- **Result:** Resultado final esperado

### B. Categorizar cada Skill (pág 8-9 de la guía)

Asignar cada skill a una de las 3 categorías de Anthropic:

1. **Document & Asset Creation** — Genera documentos, reportes, contenido consistente
   - Técnicas: style guides embebidos, templates, quality checklists
   - Tools: Read, Write (no requiere MCP)

2. **Workflow Automation** — Procesos multi-paso con metodología consistente
   - Técnicas: step-by-step con validation gates, templates, iterative refinement
   - Tools: Read, Write, AskUserQuestion, posiblemente MCP

3. **MCP Enhancement** — Workflows que potencian el acceso a herramientas via MCP
   - Técnicas: coordina múltiples MCP calls, embebe domain expertise, error handling
   - Tools: MCP tools específicos (Fireflies, Neon, etc.)

### C. Diseñar la Arquitectura de cada Skill (pág 10-13 de la guía)

Para cada skill definir:

**Frontmatter (YAML):**
```yaml
---
name: [kebab-case, matching folder name]
description: >
  [What it does]. [When to use it - trigger phrases].
  [Key capabilities].
argument-hint: "[expected arguments]"
allowed-tools: [list of tools needed]
---
```

**Structure (Progressive Disclosure):**
- Level 1 (YAML): Siempre cargado. Solo lo necesario para que Claude sepa cuándo activar el skill.
- Level 2 (SKILL.md body): Instrucciones completas. Se carga cuando el skill se activa.
- Level 3 (references/): Archivos adicionales que Claude lee solo si necesita.

**Instructions:**
- Steps claros y numerados
- Ejemplos concretos con inputs/outputs esperados
- Error handling para casos comunes
- Progressive complexity (empezar simple, escalar si necesario)

### D. Definir MCPs, Hooks y Subagents

Para cada skill, determinar:

**MCPs necesarios:**
- ¿Necesita Fireflies? (para transcripts de reuniones)
- ¿Necesita Neon/Supabase? (para datos en DB)
- ¿Necesita acceso a un CRM? (HubSpot, etc.)
- ¿Necesita WebSearch? (para research)

**Hooks (si aplica):**
- ¿Debe ejecutarse automáticamente después de un evento? (post-meeting, daily, weekly)
- ¿Necesita un trigger externo? (webhook, cron)

**Subagents (si aplica):**
- ¿El skill es demasiado complejo para un solo agente?
- ¿Necesita ejecutar pasos en paralelo?
- ¿Hay tareas que requieren un agente especializado?

### E. Seleccionar los 5 Skills Finales

Priorizar por:
1. **Impacto** — ¿Cuántas horas/semana ahorra?
2. **Frecuencia** — ¿Cuántas veces al día/semana se usaría?
3. **Complejidad** — ¿Es implementable en el timeline del Ops Layer (1 semana)?
4. **Dependencias** — ¿Necesita herramientas o accesos especiales?

---

## STEP 4: Output 1 — Para el Cliente (lenguaje de negocio)

```markdown
# Procesos Inteligentes Recomendados para [Empresa]

## Esto es lo que vamos a dejar funcionando

### 1. [Nombre en lenguaje simple]
**El problema:** [En palabras del cliente — usar citas del transcript si las hay]
**Cómo funciona:** [Explicación simple sin jerga — qué pasa cuando lo usan]
**Ejemplo:** "Hoy tu equipo [hace X en Y tiempo]. Después, [el sistema hace Z en W segundos]."
**Impacto estimado:** [X horas/semana recuperadas]

### 2-5. [Repetir]

## Impacto Total
- **Horas semanales recuperadas:** [suma de los 5]
- **Procesos que dejan de ser manuales:** [lista]
- **Tu equipo se enfoca en:** [lo que ahora pueden hacer con el tiempo libre]
```

Guardar como: `Clientes/[empresa]/diseno/propuesta-skills.md`

---

## STEP 5: Output 2 — Para el Equipo (spec técnico basado en guía Anthropic)

```markdown
# Spec Técnico: Skills para [Empresa]
## Basado en "The Complete Guide to Building Skills for Claude"

## Resumen de Matching con Showcase
| # | Skill | Fuente | Match |
|---|-------|--------|-------|
| 1 | [nombre] | Showcase Combo [X] #[Y] | Exacto/Adaptado/Nuevo |
| 2 | [nombre] | ... | ... |
| 3-5 | ... | ... | ... |

Skills nuevos agregados al showcase: [X] (en combos [lista])

---

## Skill 1: [slug-en-kebab-case]

### Frontmatter
```yaml
---
name: [slug]
description: >
  [What it does]. Use when [trigger phrases].
  [Key capabilities].
argument-hint: "[args]"
allowed-tools: [tools]
---
```

### Categoría Anthropic
[Document Creation / Workflow Automation / MCP Enhancement]

### Arquitectura
- **Level 1 (YAML):** [qué va en el frontmatter]
- **Level 2 (SKILL.md):** [qué instrucciones principales]
- **Level 3 (references/):** [qué archivos adicionales necesita]

### Tools y MCPs
- **Built-in tools:** [Read, Write, Glob, etc.]
- **MCPs necesarios:** [Fireflies, Neon, etc. — con justificación]
- **Hooks:** [si aplica — qué evento lo dispara]
- **Subagents:** [si aplica — para qué]

### Workflow
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Input / Output
- **Input:** [qué necesita]
- **Output:** [qué produce]

### Complejidad
[Baja / Media / Alta] — [justificación]

---

## Skill 2-5: [Repetir]

## Dependencias entre Skills
- [Skill X] → [Skill Y]: [cómo se encadenan]

## Stack de Herramientas Necesario
→ Ejecutar /disenar-stack [empresa] para el detalle

## Criterios de Éxito (pág 9 de la guía)
- Skill triggers en 90% de queries relevantes
- Completa workflow en X tool calls
- 0 errores de API
- Usuario no necesita corregir el output
```

Guardar como: `Clientes/[empresa]/diseno/spec-skills.md`

---

## STEP 6: Siguiente Paso

*"Skills diseñados para [Empresa]:*
*📄 Propuesta para cliente: [ruta]*
*🔧 Spec técnico para equipo: [ruta]*

*Los 5 skills recomendados:*
*1. [nombre] — [impacto]*
*2. [nombre] — [impacto]*
*3. [nombre] — [impacto]*
*4. [nombre] — [impacto]*
*5. [nombre] — [impacto]*

*Impacto total estimado: [X] horas/semana recuperadas*

*Siguientes pasos:*
*→ /disenar-stack [empresa] — definir herramientas del stack*
*→ /cotizacion [empresa] ops — generar la cotización"*

---

## Reglas

- **SIEMPRE** leer la guía de Anthropic antes de diseñar los skills
- Los 5 skills deben ser ESPECÍFICOS para este cliente, no genéricos
- El documento del cliente NO tiene jerga técnica
- El spec del equipo TIENE todo el detalle técnico (frontmatter, tools, MCPs, hooks)
- Cada skill debe seguir la estructura de progressive disclosure de la guía
- Nombres de skills en kebab-case (como dice la guía)
- Priorizar por impacto real, no por complejidad técnica
- Si no hay suficiente contexto, preguntar más — no inventar
- Usar citas del transcript/notas cuando sea posible
- Español por defecto
