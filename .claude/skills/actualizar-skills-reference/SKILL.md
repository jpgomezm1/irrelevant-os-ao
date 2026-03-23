---
name: actualizar-skills-reference
description: >
  Actualiza el HTML de referencia de skills cuando se agrega, modifica o elimina un skill.
  Triggers: "actualizar referencia", "actualizar skills", "update skills reference",
  "/actualizar-skills-reference"
allowed-tools: [Read, Write, Glob, Grep]
---

# Actualizar Skills Reference

Actualiza el archivo HTML `Assets Fijos/skills-reference.html` para que refleje el estado actual de todas las skills disponibles.

---

## Proceso

### STEP 1: Escanear skills actuales

Lee todos los archivos SKILL.md en `.claude/skills/*/SKILL.md` y extrae de cada uno:
- **name** (del frontmatter YAML)
- **description** (del frontmatter)
- **allowed-tools** (del frontmatter)
- **Titulo** (primer H1 del contenido)
- **Input/Output** (del contenido, buscar secciones de input y output)

### STEP 2: Leer el HTML actual

Lee `Assets Fijos/skills-reference.html` completo.

### STEP 3: Actualizar el HTML

Reescribe el archivo HTML completo manteniendo el MISMO diseño y CSS pero actualizando:

1. **Nav stats**: actualizar el número total de skills y categorías
2. **Flow diagrams**: si hay skills nuevas que encajan en el flujo, agregarlas
3. **Skill cards**: para cada skill encontrada en STEP 1, verificar que tiene una card. Si es nueva, agregarla en la categoría correcta. Si fue eliminada, quitar la card.
4. **Category counts**: actualizar los contadores de cada categoría
5. **Footer**: actualizar la fecha de última actualización y el total de skills

### Categorización automática:
- Skills que usan templates → categoría "Documentos y Comercial"
- Skills que usan Fireflies MCP → categoría "Documentos y Comercial" (subcategoría Fireflies)
- Skills que referencian el framework de ventas → categoría "Ventas y Coaching"
- Skills que no encajan → preguntar al usuario

### Para cada skill card, incluir:
- Comando (ej: `/cotizacion`)
- Título descriptivo
- Descripción de 2-3 líneas
- Input/Output en cajas
- Tags: fireflies, template, websearch, framework (según tools usadas)
- Color de accent según categoría (emerald para docs, purple para ventas, blue para fireflies, amber para analytics)

### STEP 4: Actualizar CLAUDE.md

Verificar que la tabla de skills en `CLAUDE.md` también esté actualizada con la misma información.

### STEP 5: Guardar

Sobreescribir `Assets Fijos/skills-reference.html` con el HTML actualizado.

Confirmar al usuario: "Skills reference actualizada: X skills en Y categorías. Fecha: [hoy]."

---

## Reglas

- NUNCA cambiar el diseño o CSS — solo actualizar contenido
- Mantener el mismo estilo visual de las cards existentes
- Si no es claro a qué categoría pertenece un skill nuevo, preguntar
- Siempre verificar que el total de skills en el nav coincida con las cards
- La fecha de actualización debe reflejar el día actual
