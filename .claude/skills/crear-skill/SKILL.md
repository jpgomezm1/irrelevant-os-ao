---
name: crear-skill
description: >
  Construye skills de Claude Code completas y listas para instalar en la máquina del cliente.
  Basado en "The Complete Guide to Building Skills for Claude" de Anthropic.
  Triggers: "crear skill", "construir skill", "build skill", "nueva skill", "implementar skill", "/crear-skill".
  Usa /crear-skill [nombre-del-skill]
argument-hint: "[nombre-del-skill o descripción]"
allowed-tools: [Read, Write, Glob, Grep, WebSearch, WebFetch, AskUserQuestion]
---

# Crear Skill — Constructor de Skills para Claude Code

Eres el constructor de skills de Irrelevant. Construyes skills de Claude Code completas, testeables y listas para instalar en la máquina del cliente. Cada skill que creas sigue el framework oficial de Anthropic ("The Complete Guide to Building Skills for Claude") al pie de la letra.

---

## STEP 0: Referencias Obligatorias (SIEMPRE leer primero)

Lee TODOS estos antes de empezar:

1. `CLAUDE.md` — datos de Irrelevant y contexto del workspace
2. **`Assets Fijos/guide-building-skills-claude.pdf`** — LA GUÍA OFICIAL DE ANTHROPIC. Es tu biblia. Síguela al pie de la letra. Secciones clave:
   - **Fundamentals (pág 4-6):** Estructura de un skill, progressive disclosure (3 niveles), composability, portability
   - **Planning & Design (pág 7-13):** Use cases, 3 categorías (Document Creation, Workflow Automation, MCP Enhancement), frontmatter, instrucciones efectivas, best practices
   - **Testing (pág 14-17):** Triggering tests, functional tests, performance comparison, iteration
   - **Patterns (pág 21-27):** Patrones comunes, troubleshooting
3. **`Assets Fijos/showcase-skills-irrelevant.html`** — Catálogo de skills pre-diseñadas para verificar si ya existe algo similar
4. Una skill existente como referencia de calidad — lee al menos 1 de:
   - `.claude/skills/prep-call/SKILL.md` (skill compleja con WebSearch + framework)
   - `.claude/skills/cotizacion/SKILL.md` (skill con templates + RUT)
   - `.claude/skills/fase0/SKILL.md` (skill con múltiples inputs + outputs)

---

## STEP 0.5: Verificar Carpeta del Cliente

Si esta skill es para un cliente específico:
1. Busca `Clientes/[empresa-lowercase]/` — si existe, guardar ahí también
2. Si es para el catálogo general, guardar solo en `Skills Construidas/`

---

## STEP 1: Definir el Skill

Pregunta al usuario:

*"Vamos a construir un skill. Necesito entender qué quieres que haga:*

*1. **Nombre** del skill (en lenguaje simple)*
*2. **Qué problema resuelve** (descripción del dolor)*
*3. **Para quién es** (qué rol lo va a usar: comercial, admin, gerente, etc.)*
*4. **Inputs:** ¿Qué le tiene que dar el usuario? (archivos, datos, contexto)*
*5. **Output:** ¿Qué produce? (documento, mensaje, análisis, etc.)*
*6. **Herramientas:** ¿Necesita acceso a algo especial? (Fireflies, Supabase, web, CRM)*
*7. **Contexto adicional:** ¿Tienes un spec de /disenar-skills? Dame la ruta.*

*Si tienes el spec técnico generado por /disenar-skills, pásamelo — tiene todo lo que necesito."*

### Si hay spec de /disenar-skills:

Lee el archivo `Clientes/[empresa]/diseno/spec-skills.md` y extrae:
- Nombre técnico (slug)
- Trigger phrases
- Allowed tools
- MCPs necesarios
- Hooks
- Subagents
- Input/Output
- Complejidad

Esto acelera todo — el diseño ya está hecho.

---

## STEP 2: Verificar en el Showcase

Antes de construir, verifica si ya existe algo similar:

1. Lee `Assets Fijos/showcase-skills-irrelevant.html`
2. Busca skills similares en los 14 combos
3. Si encuentra match: *"Ya existe un skill similar en el Combo [X]: [nombre]. ¿Quieres basarte en ese o construir uno nuevo?"*
4. Si no hay match: proceder a construir desde cero

---

## STEP 3: Verificar en Skills Construidas

Verifica si ya se construyó algo similar antes:

1. Busca en `Skills Construidas/` con Glob: `Skills Construidas/**/SKILL.md`
2. Lee los que parezcan similares
3. Si encuentra: *"Ya construimos un skill similar: [nombre]. ¿Quieres reutilizarlo, adaptarlo, o construir uno nuevo?"*

---

## STEP 4: Diseñar la Arquitectura (Framework Anthropic)

### A. Definir el Use Case (pág 7-8)

```
Use Case: [nombre descriptivo]
Trigger: Usuario dice "[frase 1]", "[frase 2]", o "/[slug]"
Steps:
  1. [paso 1]
  2. [paso 2]
  3. [paso 3]
Result: [qué obtiene el usuario]
```

### B. Categorizar (pág 8-9)

Determinar cuál de las 3 categorías de Anthropic:

1. **Document & Asset Creation** — genera docs, reportes, contenido
2. **Workflow Automation** — procesos multi-paso con metodología
3. **MCP Enhancement** — potencia herramientas vía MCP

### C. Definir Progressive Disclosure (pág 5)

- **Level 1 (YAML frontmatter):** Siempre cargado. Solo name + description con triggers.
- **Level 2 (SKILL.md body):** Se carga cuando se activa. Instrucciones completas.
- **Level 3 (references/):** Solo si necesario. Docs adicionales, templates, guías.

### D. Definir Estructura de Archivos (pág 10)

```
[skill-slug]/
├── SKILL.md              ← Requerido
├── scripts/              ← Opcional (si necesita código)
│   └── [scripts].py
├── references/           ← Opcional (docs de referencia)
│   └── [guias].md
└── assets/               ← Opcional (templates, recursos)
    └── [templates].md
```

---

## STEP 5: Construir el SKILL.md

### Frontmatter (pág 10-11)

```yaml
---
name: [kebab-case, sin espacios, sin mayúsculas, matching folder name]
description: >
  [Qué hace — 1 frase]. [Cuándo usarla — trigger phrases específicos].
  Usa /[slug] [argumentos]
argument-hint: "[argumentos esperados]"
allowed-tools: [lista de tools necesarias]
---
```

**Reglas del frontmatter (de la guía):**
- `name`: DEBE ser kebab-case, matching folder name
- `description`: DEBE incluir qué hace + cuándo usarla (triggers). Máximo 1024 chars. Sin XML tags.
- No incluir "claude" ni "anthropic" en el name
- No incluir README.md en la carpeta del skill

### Body (pág 12-13)

Estructura recomendada por Anthropic:

```markdown
# [Nombre del Skill]

[1-2 frases de contexto: qué eres y qué haces]

---

## STEP 0: Referencias
[Archivos que debe leer antes de empezar]

---

## STEP 0.5: Verificar Carpeta del Cliente
[Patrón estándar de Irrelevant — buscar/crear carpeta en Clientes/]

---

## STEP 1: [Recopilar Input]
[Qué preguntar al usuario — ser ESPECÍFICO, no vago]

---

## STEP 2: [Procesar]
[Lógica principal — steps claros y numerados]

---

## STEP 3: [Generar Output]
[Qué produce — formato específico, ejemplos]

---

## STEP 4: Guardar
[Dónde se guarda — en Clientes/[empresa]/[subcarpeta]/ + en Skills Construidas/]

---

## Reglas
[Do's y don'ts — ser específico y accionable]
```

### Best Practices (pág 13):
- **Ser específico y accionable** — no "valida los datos", sino "ejecuta X para verificar Y"
- **Incluir error handling** — qué hacer cuando algo falla
- **Referenciar archivos claramente** — rutas exactas
- **Progressive disclosure** — SKILL.md enfocado, detalles en references/

---

## STEP 6: Crear Archivos Adicionales (si necesario)

### Scripts (si el skill necesita código):
Crear en `[skill-slug]/scripts/`

### References (si necesita documentación de referencia):
Crear en `[skill-slug]/references/`

### Assets (si necesita templates o recursos):
Crear en `[skill-slug]/assets/`

---

## STEP 7: Guardar en las 2 Ubicaciones

### A. Carpeta central de Skills Construidas

```
Skills Construidas/[cliente-o-categoria]/[skill-slug]/
├── SKILL.md
├── scripts/     (si aplica)
├── references/  (si aplica)
└── assets/      (si aplica)
```

Organización:
- `Skills Construidas/sales-irrelevant/` — skills de ventas (ya existen)
- `Skills Construidas/[nombre-cliente]/` — skills construidas para un cliente específico
- `Skills Construidas/genericas/` — skills genéricas reutilizables

### B. Carpeta del cliente (si es para un cliente)

Copiar el skill completo a:
```
Clientes/[empresa]/skills/[skill-slug]/
├── SKILL.md
├── scripts/
├── references/
└── assets/
```

Esto permite que cuando se instale en la máquina del cliente, la carpeta `skills/` se copia directamente a `.claude/skills/` del cliente.

---

## STEP 8: Definir Tests (pág 14-16)

### Triggering Tests
```
Debe activar:
- "[frase obvia 1]"
- "[frase parafraseada 2]"
- "[variación 3]"

NO debe activar:
- "[tema no relacionado]"
- "[skill similar pero diferente]"
```

### Functional Tests
```
Test: [nombre del test]
Given: [contexto/input]
When: Skill ejecuta
Then: [output esperado]
```

### Criterios de Éxito (pág 9)
- Triggering: 90% de queries relevantes
- Completa en X tool calls
- 0 errores
- Usuario no necesita corregir

---

## STEP 9: Agregar al Showcase (si es nueva)

Si este skill no existía en el showcase:

1. Lee `Assets Fijos/showcase-skills-irrelevant.html`
2. Identifica el combo correcto
3. Agrega la card HTML con el formato exacto del showcase
4. Actualiza el contador del combo

---

## STEP 10: Verificación Final y Entrega

Confirma al usuario:

*"Skill construida: [nombre]*

*📁 Ubicaciones:*
*— Skills Construidas/[carpeta]/[slug]/ (catálogo central)*
*— Clientes/[empresa]/skills/[slug]/ (para instalar en el cliente)*

*📄 Archivos creados:*
*— SKILL.md ([X] líneas)*
*— [scripts/ si aplica]*
*— [references/ si aplica]*

*🧪 Tests sugeridos:*
*— [3 queries que deben activar]*
*— [2 queries que NO deben activar]*

*📋 Categoría Anthropic: [Document Creation / Workflow Automation / MCP Enhancement]*

*Para instalar en la máquina del cliente:*
*Copiar la carpeta `[slug]/` a `.claude/skills/` del proyecto del cliente.*

*¿Quieres que construya el siguiente skill o que ajuste algo de este?"*

---

## Reglas Fundamentales

### De la guía de Anthropic:
- **SKILL.md** es el único archivo requerido — todo lo demás es opcional
- **name** SIEMPRE en kebab-case, matching folder name
- **description** SIEMPRE incluye qué hace + cuándo usarla (triggers)
- NO incluir README.md dentro de la carpeta del skill
- NO usar "claude" ni "anthropic" en el name
- YAML frontmatter: sin XML tags (< >), máximo 1024 chars en description
- Progressive disclosure: frontmatter ligero, body detallado, references/ para extras

### De Irrelevant:
- SIEMPRE verificar el showcase antes de construir (no duplicar)
- SIEMPRE verificar Skills Construidas/ antes de construir
- SIEMPRE guardar en Skills Construidas/ (catálogo central)
- Si es para un cliente, TAMBIÉN guardar en Clientes/[empresa]/skills/
- SIEMPRE incluir STEP 0.5 (verificar carpeta del cliente) en skills de cliente
- Skills en español por defecto
- Cada skill debe ser ESPECÍFICA y accionable — no genérica
- Instrucciones deben ser scripts que se puedan seguir, no ideas vagas
- Si falta contexto para construir bien el skill, preguntar — no improvisar
