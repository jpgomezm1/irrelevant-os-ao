---
name: weekly-standup
description: >
  Genera la agenda del standup semanal del equipo comercial.
  Triggers: "standup", "agenda de la semana", "reunión de equipo", "/weekly-standup".
allowed-tools: [Read, Write, Glob]
---

# Weekly Standup — Agenda Semanal del Equipo Comercial

Generas la agenda del standup semanal escaneando todo el pipeline. El resultado es un documento limpio, legible en 5 minutos, que permite al equipo alinearse sin perder tiempo.

Antes de hacer CUALQUIER COSA:
1. Lee `CLAUDE.md` en la raíz del workspace para entender los servicios de Irrelevant y sus precios
2. Lee `Assets Fijos/PROP_VALUE_IRRELEVANT.md` para entender la propuesta de valor completa

---

## STEP 1: Escanear Pipeline Completo

Usa Glob para encontrar todas las carpetas en `Clientes/*/README.md`.

Para CADA cliente:
1. Lee `README.md` — empresa, servicio, estado
2. Escanea subcarpetas — qué archivos hay, cuándo fue el último
3. Lee archivos recientes de `evaluaciones/` (call-reviews, check-ins de la última semana)
4. Determina etapa del pipeline (misma lógica que /pipeline-dashboard)
5. Identifica:
   - ¿Avanzó esta semana? (archivos nuevos creados en los últimos 7 días)
   - ¿Está estancado? (sin actividad en >7 días)
   - ¿Cuál es el siguiente paso?

---

## STEP 2: Generar Agenda del Standup

Genera un markdown limpio y directo:

```markdown
# Standup Semanal — [Fecha]

## Pipeline Summary
| Métrica | Valor |
|---------|-------|
| Clientes activos | [X] |
| Pipeline total | $[X] COP |
| Deals avanzados esta semana | [X] |
| Deals estancados (>7 días) | [X] |

---

## Por Deal

### [Empresa 1] — [Servicio] | Etapa: [X]
- **Estado:** [Qué pasó esta semana / sin movimiento]
- **Última acción:** [Archivo más reciente + fecha]
- **Siguiente paso:** /[skill] [empresa] — [qué hace]
- **Owner:** [Si está en README]
- **⚠️ Riesgo:** [Si tiene >7 días sin movimiento]

### [Empresa 2] — [Servicio] | Etapa: [X]
...

---

## Deals en Riesgo ⚠️
Deals con >7 días sin actividad que necesitan atención urgente:

| Cliente | Etapa | Días sin actividad | Acción sugerida |
|---------|-------|--------------------|-----------------|
| [X]     | [X]   | [X]                | [X]             |

---

## Wins de la Semana 🏆
[Deals que avanzaron de etapa o cerraron esta semana]
- [Empresa]: [Qué pasó]

---

## Blockers
[Deals que necesitan algo externo para avanzar]
- [Empresa]: [Qué necesita — decisión del cliente, documento pendiente, etc.]

---

## Action Items
- [ ] [Acción concreta + responsable + deadline]
- [ ] [Acción concreta + responsable + deadline]
```

---

## STEP 3: Guardar Output

1. Verifica si existe la carpeta `Assets Fijos/standups/` — si no, créala
2. Guarda como: `Assets Fijos/standups/standup-[fecha-YYYY-MM-DD].md`

---

## STEP 4: Confirmar

*"Standup generado: `Assets Fijos/standups/standup-[fecha].md`"*

*"Resumen rápido:*
- *[X] clientes activos, [X] avanzaron esta semana*
- *[X] deals en riesgo*
- *[X] action items pendientes*
- *Pipeline total: $[X] COP"*

---

## Reglas

- **Español** por defecto
- El documento DEBE ser legible en 5 minutos — sin texto innecesario
- Ordenar deals por urgencia (más riesgosos primero)
- Si no hay clientes, generar standup vacío: "No hay deals activos esta semana"
- "Esta semana" = últimos 7 días desde la fecha actual
- Wins = deals que pasaron de una etapa a otra (archivos nuevos en carpeta de etapa posterior)
- Blockers = deals donde el siguiente paso requiere acción del cliente
- NUNCA inventar actividad — solo reportar lo que existe en las carpetas
- Si un deal no tiene owner en README, poner "Sin asignar"
