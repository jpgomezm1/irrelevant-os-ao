---
name: weekly-update
description: >
  Genera reporte semanal de avance del proyecto Core Layer para enviar al cliente.
  Triggers: "reporte semanal", "weekly update", "avance del proyecto", "update semanal", "/weekly-update".
  Usa /weekly-update [empresa]
argument-hint: "[empresa]"
allowed-tools: [Read, Write, Glob, AskUserQuestion, mcp__fireflies__fireflies_get_transcript, mcp__fireflies__fireflies_get_transcripts, mcp__fireflies__fireflies_search]
---

# Weekly Update — Reporte Semanal del Core Layer

Generas reportes semanales de avance del proyecto Core Layer para enviar al cliente. Cada reporte muestra progreso vs plan, logros de la semana, próximos pasos y riesgos.

Antes de hacer CUALQUIER COSA:
1. Lee `CLAUDE.md` en la raíz del workspace para entender los servicios de Irrelevant y sus precios
2. Lee `Assets Fijos/PROP_VALUE_IRRELEVANT.md` para entender la propuesta de valor completa

---

## STEP 0.5: Verificar Carpeta del Cliente

Busca si existe carpeta del cliente en `Clientes/[empresa-lowercase]/` usando Glob.

**Si EXISTE:**
1. Usar esa carpeta para guardar outputs
2. Leer contexto del proyecto:
   - `Clientes/[empresa]/fase0/*` — Alcance y solución (qué se va a construir)
   - `Clientes/[empresa]/contratos/*` — Timeline y milestones acordados
   - `Clientes/[empresa]/produccion/kickoff/*` — Lo acordado en el kickoff
   - `Clientes/[empresa]/produccion/updates/*` — Updates anteriores (para continuidad)
   - `Clientes/[empresa]/README.md` — Ficha del cliente

**Si NO EXISTE:**
*"No encontré carpeta para [Empresa]. Usa `/cliente crear [empresa]` primero."*
DETENER ejecución.

---

## STEP 1: Recopilar Información de la Semana

Pregunta al usuario:

*"Voy a generar el weekly update. Necesito:*

*1. ¿Qué número de semana es? (ej: Semana 3 de 8)*
*2. ¿Qué se completó esta semana? (lista de entregables/tareas)*
*3. ¿Qué queda pendiente para la próxima semana?*
*4. ¿Hay blockers o riesgos? (algo que dependa del cliente, algo atrasado)*
*5. ¿Hay decisiones pendientes del cliente?"*

Espera la respuesta.

### Opcionalmente: Buscar en Fireflies

Si el usuario lo pide o si hay reuniones de proyecto recientes:
1. Usa `mcp__fireflies__fireflies_search` para buscar transcripts con el nombre de la empresa
2. Usa `mcp__fireflies__fireflies_get_transcripts` para listar reuniones recientes
3. Usa `mcp__fireflies__fireflies_get_transcript` para extraer contenido relevante
4. Complementa la información del usuario con lo discutido en reuniones

---

## STEP 2: Determinar Progreso vs Plan

Lee los milestones del contrato/Fase 0 y compara con lo reportado:

- ¿Qué milestones están completados?
- ¿Cuál es el % de avance general?
- ¿Estamos on track, adelantados o atrasados?
- ¿Qué milestone es el siguiente?

Si hay updates anteriores, lee el último para mantener continuidad.

---

## STEP 3: Generar Weekly Update

```markdown
# Weekly Update — [Empresa]
## Semana [X] de [Y] | [Fecha]

---

### Estado General: [🟢 On Track | 🟡 Atención | 🔴 Atrasado]

### Progreso vs Plan

| Milestone | Estado | % Avance | Notas |
|-----------|--------|----------|-------|
| [Milestone 1] | ✅ Completado | 100% | [nota] |
| [Milestone 2] | 🔄 En progreso | [X]% | [nota] |
| [Milestone 3] | ⏳ Pendiente | 0% | Inicia semana [X] |

**Avance general: [X]%**

---

### ✅ Completado esta semana
- [Tarea/entregable completado + detalle breve]
- [Tarea/entregable completado + detalle breve]
- [Tarea/entregable completado + detalle breve]

### 📋 Próxima semana
- [Tarea planeada + responsable]
- [Tarea planeada + responsable]
- [Tarea planeada + responsable]

### ⚠️ Blockers y Riesgos
[Si hay:]
- **[Blocker]:** [Descripción + qué se necesita para resolver + de quién depende]

[Si no hay:]
- Sin blockers esta semana

### 📌 Decisiones Pendientes del Cliente
[Si hay:]
- **[Decisión]:** [Contexto + deadline sugerido]

[Si no hay:]
- Sin decisiones pendientes

---

### Próximo check-in: [Fecha sugerida]
```

---

## STEP 4: Guardar Output

1. Verifica si existe `Clientes/[empresa]/produccion/updates/` — si no, crea `produccion/` y `produccion/updates/`
2. Guarda como: `Clientes/[empresa]/produccion/updates/update-semana-[X].md`

---

## STEP 5: Confirmar

*"Weekly update generado: `Clientes/[empresa]/produccion/updates/update-semana-[X].md`"*

*"Resumen:*
- *Semana [X] de [Y]*
- *Estado: [On Track / Atención / Atrasado]*
- *Avance general: [X]%*
- *Blockers: [X]*
- *Decisiones pendientes: [X]"*

*"Copia el contenido y envíalo por email al cliente. La próxima semana usa `/weekly-update [empresa]` de nuevo."*

---

## Reglas

- **Español** por defecto
- El reporte debe ser CONCISO — el cliente quiere saber el estado en 2 minutos
- Mantener CONTINUIDAD con updates anteriores — leer el último antes de generar
- El % de avance debe ser REALISTA — basado en milestones, no en estimación optimista
- Si hay blockers del lado del cliente, ser CLARO pero diplomático
- NUNCA inventar avance o completar tareas que no se hicieron
- Si no hay Fase 0 o contrato para comparar, pedir al usuario los milestones
- Numberar las semanas consistentemente (Semana X de Y)
- Si es la primera semana, mencionar que es el primer update post-kickoff
- El formato debe ser limpio para copiar y pegar en un email
