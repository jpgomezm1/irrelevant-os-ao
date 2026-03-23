---
name: entregable
description: >
  Genera documento entregable post-setup del Ops Layer + slides de presentación.
  Triggers: "entregable", "deliverable", "generar entregable", "documento de entrega", "/entregable".
  Usa /entregable [empresa]
argument-hint: "[empresa]"
allowed-tools: [Read, Write, Glob, Grep, AskUserQuestion, mcp__fireflies__fireflies_get_transcript, mcp__fireflies__fireflies_get_transcripts, mcp__fireflies__fireflies_search, mcp__fireflies__fireflies_get_summary]
---

# Entregable — Generador de Documento Entregable + Slides Post-Setup

Generas el documento entregable completo y su presentación en slides después de completar un AI Ops Layer Setup. Este documento muestra al cliente todo lo que se implementó, cómo funciona, y el impacto medido.

---

## STEP 0: Leer Referencias Obligatorias (SIEMPRE hacer esto PRIMERO)

ANTES de hacer cualquier otra cosa, lee estos archivos:

1. `CLAUDE.md` — datos fijos de Irrelevant
2. `Assets Fijos/PROP_VALUE_IRRELEVANT.md` — propuesta de valor y reglas de comunicación
3. **`Assets Fijos/Entregable Ejemplo/entregable-ai-work-stack.html`** — EL EJEMPLO REAL COMPLETO. Tu output debe tener este nivel de detalle. Léelo completo.
4. **`Templates/Comercial/Entregable Ops Layer/ejemplo-escuela-ingenieria.html`** — Ejemplo del template rellenado.
5. **`Templates/Comercial/Slides Entregable Ops/ejemplo-escuela-ingenieria.html`** — Ejemplo de los slides.

Estos 5 archivos son tu estándar. No procedas sin haberlos leído.

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

## STEP 1: Datos Básicos

Pregunta al usuario:

*"Vamos a generar el entregable del Ops Layer. Necesito lo básico:*

*1. Nombre de la empresa*
*2. Industria / sector*
*3. Tamaño del equipo (número de personas)*
*4. Idioma: español o inglés?"*

---

## STEP 2: Cargar Todo el Contexto del Setup

**INPUT CLAVE:** Si existe `Clientes/[empresa]/diseno/propuesta-skills.md`, leerlo PRIMERO — contiene los skills diseñados para este cliente que alimentan el entregable.

Pregunta al usuario:

*"Ahora necesito toda la información del setup que hicimos. Entre más me des, mejor será el entregable.*

*📋 **Sobre el diagnóstico:***
*→ ¿Qué encontramos? ¿Cuáles fueron los dolores principales? ¿Cuántas horas manuales estimamos?*

*🔧 **Sobre los 3 sistemas implementados** (para cada uno necesito):*
*→ Nombre del sistema*
*→ Qué hace (descripción)*
*→ Qué herramientas usa*
*→ Qué procesos inteligentes quedaron funcionando (nombre + qué hacen)*

*🛠️ **Sobre el stack de herramientas:***
*→ Qué herramientas configuramos (nombre + para qué)*

*📊 **Sobre el impacto:***
*→ Horas antes vs después por sistema*
*→ Cualquier métrica medida*

*También puedes pasarme:*
*📞 **Transcripts de llamadas** del proyecto (rutas o texto)*
*🎙️ **Transcripts de Fireflies** (dime el nombre y los busco)*
*📝 **Notas del setup** (lo que anotaste durante la implementación)*
*💬 **Cualquier otra info** del proceso*

*Dame todo lo que tengas."*

Espera la respuesta.

### Procesamiento de contexto:

**Si dan rutas a archivos:** Lee CADA archivo con Read tool
**Si mencionan Fireflies:** Usa MCP para buscar y obtener transcripts
**Si dan notas:** Usar tal cual

### Organización del contexto:

1. **Diagnóstico** — Dolores, horas manuales identificadas
2. **Before/After** — 5 puntos de comparación
3. **Sistema 1** — Nombre, descripción, herramientas, procesos, ejemplo de output
4. **Sistema 2** — Igual
5. **Sistema 3** — Igual
6. **Stack** — 6 herramientas con nombre, rol, razón
7. **Guía de uso** — Procesos organizados por sistema
8. **Flujos** — Cadenas de procesos recomendadas
9. **Métricas** — Ahorro por sistema, total, ROI
10. **Próximos pasos** — L1 completado → L2 recomendado → L3

Si falta información, preguntar. NUNCA inventar datos.

---

## STEP 3: Leer Templates

Según el idioma, lee AMBOS templates:

**Español:**
- Documento: `Templates/Comercial/Entregable Ops Layer/entregable-ops-layer-es.html`
- Slides: `Templates/Comercial/Slides Entregable Ops/slides-entregable-ops-es.html`

**Inglés:**
- Documento: `Templates/Comercial/Entregable Ops Layer/entregable-ops-layer-en.html`
- Slides: `Templates/Comercial/Slides Entregable Ops/slides-entregable-ops-en.html`

---

## STEP 4: Generar AMBOS Outputs

### 4A: Documento Entregable
- Misma profundidad que el ejemplo de NovaTech
- Example outputs realistas en bloques terminal
- Métricas específicas
- Guía de uso práctica

### 4B: Slides de Presentación
- Coherentes con el documento
- Stats grandes, before/after
- Example outputs tipo terminal para los 3 sistemas
- Hub diagram con herramientas reales

**SIEMPRE generar ambos. Nunca uno sin el otro.**

---

## STEP 5: Guardar

- Documento: `Clientes/[empresa]/entregable/entregable-documento.html`
- Slides: `Clientes/[empresa]/entregable/entregable-slides.html`

---

## STEP 6: Verificación

1. Cero placeholders en ambos archivos
2. Confirmar al usuario con resumen de contenido

---

## Reglas

- **SIEMPRE** leer los 3 ejemplos de referencia ANTES de generar
- **SIEMPRE** generar documento + slides juntos
- **NUNCA** inventar datos
- **NUNCA** dejar placeholders
- Example outputs en bloques terminal deben ser realistas y específicos
- Tono: profesional y claro
- Español por defecto
