---
name: resumen-reunion
description: >
  Genera acta de reunion con decisiones y action items. Triggers: "resumen reunion",
  "acta de reunion", "meeting notes", "meeting summary", "minuta",
  "/resumen-reunion". Usa /resumen-reunion
argument-hint: ""
allowed-tools: [Read, Write, mcp__fireflies__fireflies_get_transcript, mcp__fireflies__fireflies_get_transcripts, mcp__fireflies__fireflies_get_summary, AskUserQuestion]
---

# Resumen Reunion — Generador de Actas de Reunion

Generas actas de reunion estructuradas con decisiones clave y action items claros. Tu output es el documento de referencia que el equipo usa para dar seguimiento.

---

## STEP 1: Obtener Transcript

Intenta usar Fireflies MCP:

1. Pregunta: *"Quieres que busque la reunion en Fireflies o prefieres pegar las notas?"*
2. Si Fireflies:
   - Usa `fireflies_get_transcripts` para listar reuniones recientes
   - Muestra las opciones al usuario
   - Usa `fireflies_get_transcript` para el transcript
   - Usa `fireflies_get_summary` para el resumen automatico como complemento

**Si Fireflies MCP no esta disponible o prefiere manual:**

*"Pegame el transcript o las notas de la reunion. Si no tienes transcript, dame:*
*- Quienes participaron*
*- Que temas se discutieron*
*- Que decisiones se tomaron*
*- Que quedo pendiente"*

---

## STEP 1.5: Verificar Carpeta del Cliente

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

## STEP 2: Generar Acta Estructurada

### Encabezado
- **Fecha:** [fecha de la reunion]
- **Participantes:** [lista de asistentes]
- **Duracion:** [aproximada]
- **Tipo:** [interna / con cliente / con partner]

### Resumen Ejecutivo
3-4 frases que capturen la esencia de la reunion. Que cualquier persona que no estuvo pueda entender que paso en 15 segundos.

### Decisiones Clave
Lista numerada de las decisiones que se tomaron:
1. [Decision] — contexto breve de por que
2. [Decision] — contexto breve
3. ...

### Action Items
Tabla o lista con formato claro:

| # | Tarea | Responsable | Fecha limite | Contexto |
|---|---|---|---|---|
| 1 | [que hay que hacer] | [quien] | [cuando] | [por que / de que parte de la reunion salio] |
| 2 | ... | ... | ... | ... |

### Temas Pendientes
Cosas que se mencionaron pero no se resolvieron o requieren mas informacion:
- [Tema] — que falta para avanzar
- ...

### Proxima Reunion
- **Fecha:** [si se menciono]
- **Temas a cubrir:** [si se acordaron]

---

## STEP 3: Guardar Output

Guarda como: `Clientes/[empresa]/contexto/acta-[fecha].md`

Ejemplo: `Clientes/acme/contexto/acta-2026-03-22.md`

---

## STEP 4: Confirmar

*"Acta de reunion generada:*

*Archivo: [ruta]*
*Participantes: [lista]*
*Decisiones: [cantidad]*
*Action items: [cantidad]*

*Quieres que ajuste algo o agregue detalle a algun punto?"*

---

## Reglas

- SIEMPRE intentar Fireflies primero, fallback a manual
- Los ACTION ITEMS son lo mas importante — deben tener responsable y fecha SIEMPRE
- Si en la reunion no se asignaron fechas, preguntar al usuario o sugerir fechas razonables
- El resumen ejecutivo debe ser ULTRA conciso — 3-4 frases max
- Si hubo tension o desacuerdos, capturarlos de forma neutral y profesional
- Espanol por defecto
- El acta debe ser util semanas despues — incluir suficiente contexto en cada punto
