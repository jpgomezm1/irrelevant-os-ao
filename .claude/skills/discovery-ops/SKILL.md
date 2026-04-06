---
name: discovery-ops
description: >
  Discovery estructurado con 5 pilares obligatorios para Ops Layer.
  Produce output machine-parseable que alimenta el análisis y assessment.
  Triggers: "discovery ops", "discovery operativo", "discovery estructurado",
  "/discovery-ops". Usa /discovery-ops [empresa]
argument-hint: "[empresa]"
allowed-tools: [Read, Write, Glob, Grep, mcp__fireflies__fireflies_get_transcript, mcp__fireflies__fireflies_get_transcripts, mcp__fireflies__fireflies_search, AskUserQuestion]
---

# Discovery Ops — Discovery Estructurado para AI Ops Layer

Extraes un discovery estructurado de una call de Ops Layer usando 5 pilares obligatorios. Tu output es la base para el análisis profundo y el Assessment Report. A diferencia de `/discovery-notes` (genérico), este skill enforza preguntas específicas, cuantifica cada dolor, y produce un formato estructurado que alimenta directamente a `/reporte-assessment`.

---

## STEP 0: Leer Referencias Obligatorias

ANTES de hacer cualquier otra cosa:

1. Lee `CLAUDE.md` — datos fijos de Irrelevant, servicios, precios
2. Lee `Assets Fijos/PROP_VALUE_IRRELEVANT.md` — propuesta de valor, portafolio, casos de éxito

---

## STEP 0.5: Verificar Carpeta del Cliente

Si el usuario pasó empresa como argumento ($ARGUMENTS), usa ese nombre. Si no, pregunta:

*"¿Para qué empresa quieres procesar el discovery?"*

Busca si existe carpeta del cliente en `Clientes/[empresa-lowercase]/` usando Glob.

**Si EXISTE:**
1. Usar esa carpeta para guardar outputs
2. Leer contexto previo relevante:
   - `Clientes/[empresa]/contexto/*` — transcripts y notas
   - `Clientes/[empresa]/discovery/*` — discovery notes previos, prep-calls
   - `Clientes/[empresa]/README.md` — ficha del cliente
   Esto enriquece tu análisis con todo el historial.

**Si NO EXISTE:**
Preguntar: *"No encontré carpeta para [Empresa]. ¿La creo? (o usa /cliente crear [empresa])"*

---

## STEP 1: Obtener Transcript

Pregunta al usuario:

*"¿Quieres que busque la call en Fireflies o preferís pegar el transcript?"*

**Si Fireflies:**
1. Usa `fireflies_search` con nombre de la empresa
2. Lista las calls encontradas, pide confirmación
3. Obtiene transcript completo con `fireflies_get_transcript`

**Si manual:**

*"Pegame el transcript de la discovery call. Si no tenés el transcript completo, dame al menos:*
*- Con quién hablaste (nombre, cargo)*
*- Qué procesos describieron paso a paso*
*- Qué números o métricas mencionaron (horas, frecuencia, costos)*
*- Qué herramientas usan hoy*
*- Quién toma la decisión de compra"*

---

## STEP 2: Analizar con los 5 Pilares Obligatorios

Analiza el transcript extrayendo información para CADA pilar. Si un pilar no fue cubierto en la call, márcalo como RED y lista las preguntas que faltan hacer en un follow-up.

---

### PILAR 1: Auditoría de Tiempo

**Pregunta ancla:** *"Recorré conmigo tu día de ayer. ¿En qué se te fue el tiempo?"*

**Preguntas de profundización:**
- "¿Cuántas horas por semana le dedicás a [tarea mencionada]?"
- "¿Con qué frecuencia hacés esto? ¿Diario, semanal, mensual?"
- "¿Qué porcentaje de tu día es trabajo repetitivo vs estratégico?"
- "¿Qué tarea te gustaría nunca más tener que hacer?"

**Qué extraer:**
- Lista de tareas con horas/semana estimadas
- Tareas repetitivas vs tareas de valor
- Interrupciones y context switching
- Total de horas en trabajo manual/repetitivo

**Checklist mínimo:**
- [ ] Al menos 3 tareas con horas estimadas
- [ ] Distinción entre trabajo manual y estratégico
- [ ] Frecuencia de cada tarea (diaria/semanal/mensual)

---

### PILAR 2: Mapeo de Procesos

**Pregunta ancla:** *"¿Cuál proceso te frustra más? Mostrame paso a paso cómo lo hacés."*

**Preguntas de profundización:**
- "¿Cuántas personas tocan este proceso?"
- "¿Qué pasa cuando sale mal? ¿Con qué frecuencia pasa?"
- "¿Cuántos pasos tiene desde que empieza hasta que termina?"
- "¿Hay algún paso que sea puro copy/paste o data entry?"
- "¿Podrías mostrarme en pantalla cómo lo hacés?" (si es virtual)

**Qué extraer:**
- Top 3-5 procesos con:
  - Nombre descriptivo
  - Pasos del workflow actual (numerados)
  - Personas involucradas
  - Frecuencia (veces/semana o mes)
  - Tiempo por ejecución
  - Herramientas usadas en cada paso
  - Puntos de fricción específicos

**Checklist mínimo:**
- [ ] Al menos 3 procesos mapeados
- [ ] Pasos del workflow documentados para cada uno
- [ ] Personas y herramientas por proceso

---

### PILAR 3: Inventario de Herramientas

**Pregunta ancla:** *"¿Qué herramientas usa tu equipo? ¿Cuántas abrís para una sola tarea?"*

**Preguntas de profundización:**
- "¿Están contentos con [herramienta X] o les frustra?"
- "¿Cuánto pagan por estas herramientas al mes?"
- "¿Hay herramientas que se solapan o que casi no usan?"
- "¿Tienen información en un sistema que necesitan pasar manualmente a otro?"
- "¿Han probado alguna herramienta de IA antes?"

**Qué extraer:**
- Lista completa de herramientas con:
  - Nombre
  - Para qué la usan
  - Satisfacción (alta/media/baja)
  - Costo mensual (si lo saben)
- Redundancias y gaps identificados
- Flujos entre herramientas (qué se copia de dónde a dónde)
- Experiencia previa con IA

**Checklist mínimo:**
- [ ] Al menos 4 herramientas listadas
- [ ] Satisfacción por herramienta
- [ ] Flujos de datos entre herramientas identificados

---

### PILAR 4: Cuantificación del Dolor

**Pregunta ancla:** *"¿Cuánto te cuesta este problema? Si esto sigue 6 meses más, ¿qué pasa?"*

**Preguntas de profundización:**
- "¿Cuánto le pagan a la persona que hace esta tarea? (para estimar costo/hora)"
- "¿Han perdido clientes o oportunidades por esta lentitud?"
- "¿Cuántos errores se cometen por hacerlo manual?"
- "¿Han intentado resolver esto antes? ¿Qué pasó?"
- "Si pudieras recuperar esas horas, ¿en qué las invertirías?"

**Qué extraer:**
- Costo estimado por proceso (horas × costo/hora estimado)
- Costo de errores (retrabajos, clientes perdidos, multas)
- Intentos previos de solución y por qué fallaron
- Consecuencias de no resolver (6 meses, 12 meses)
- Costo de oportunidad (qué harían con el tiempo recuperado)

**Checklist mínimo:**
- [ ] Al menos 1 métrica cuantificada en dinero o tiempo
- [ ] Consecuencias de no actuar
- [ ] Intentos previos de solución

---

### PILAR 5: Mapa de Decisión

**Pregunta ancla:** *"¿Quién más necesita estar convencido? ¿Cómo toman decisiones de inversión de este tamaño?"*

**Preguntas de profundización:**
- "¿Vos podés tomar esta decisión o necesitás aprobación?"
- "¿Hay un presupuesto asignado para mejoras operativas o tecnología?"
- "¿Hay algo que pase pronto (auditoría, cierre fiscal, temporada alta) que genere urgencia?"
- "¿Qué necesitarías ver para estar convencido de que esto funciona?"
- "¿Cuál es tu timeline ideal para implementar algo así?"

**Qué extraer:**
- Decision maker(s) identificados con nombre y cargo
- Proceso de aprobación (quién aprueba, cuántos niveles)
- Budget signals (hay presupuesto, rango, fiscal year)
- Timeline y eventos de urgencia
- Criterios de decisión del prospecto
- Red flags (no hay budget, "lo consulto", timeline indefinido)

**Checklist mínimo:**
- [ ] Decision maker identificado
- [ ] Proceso de aprobación claro
- [ ] Timeline o urgencia identificada

---

## STEP 3: Generar Output Estructurado

Genera el documento con esta estructura EXACTA:

```markdown
# Discovery Ops — [Empresa]

**Fecha:** [fecha de la call]
**Tipo:** C2 — Discovery Ops Layer
**Participantes:** [nombres y cargos]
**Comercial:** [nombre]
**Coverage Score:** [X/5 pilares cubiertos]

---

## Datos Básicos

| Campo | Valor |
|-------|-------|
| **Empresa** | [nombre] |
| **Industria** | [sector] |
| **Tamaño** | [empleados, facturación si se mencionó] |
| **Contacto principal** | [nombre, cargo] |
| **Servicio recomendado** | AI Ops Layer |

---

## Pilar 1: Auditoría de Tiempo [GREEN/YELLOW/RED]

### Hallazgos
[narrativa de lo encontrado]

### Distribución de Tiempo
| Tarea | Horas/semana | Frecuencia | Tipo |
|-------|-------------|-----------|------|
| [tarea] | [hrs] | [diaria/semanal] | Manual/Estratégico |

### Citas Textuales
> "[cita exacta del prospect]"

### Total: [X] horas/semana en trabajo manual repetitivo

---

## Pilar 2: Mapeo de Procesos [GREEN/YELLOW/RED]

### Proceso 1: [Nombre]
**Frecuencia:** [X veces/semana]
**Tiempo por ejecución:** [X minutos/horas]
**Personas:** [quiénes]
**Herramientas:** [cuáles]

**Workflow actual:**
1. [paso 1]
2. [paso 2]
3. [paso 3]

**Puntos de fricción:** [qué duele]

> "[cita textual]"

### Proceso 2: [Nombre]
[misma estructura]

### Proceso 3: [Nombre]
[misma estructura]

---

## Pilar 3: Inventario de Herramientas [GREEN/YELLOW/RED]

### Stack Actual
| Herramienta | Uso | Satisfacción | Costo/mes |
|-------------|-----|-------------|----------|
| [tool] | [para qué] | Alta/Media/Baja | [si saben] |

### Flujos de Datos
- [Tool A] → (manual/copy-paste) → [Tool B]: [qué dato]
- [Tool B] → (manual) → [Tool C]: [qué dato]

### Experiencia con IA
[qué han probado, resultados]

---

## Pilar 4: Cuantificación del Dolor [GREEN/YELLOW/RED]

### Costo Estimado del Dolor
| Proceso | Horas/semana | Costo estimado/mes |
|---------|-------------|-------------------|
| [proceso] | [hrs] | [COP si se puede estimar] |

### Consecuencias de No Actuar
- **6 meses:** [proyección]
- **12 meses:** [proyección]

### Intentos Previos de Solución
- [qué intentaron y por qué no funcionó]

### Costo de Oportunidad
[qué harían con el tiempo recuperado]

---

## Pilar 5: Mapa de Decisión [GREEN/YELLOW/RED]

### Decision Makers
| Nombre | Cargo | Rol en decisión |
|--------|-------|----------------|
| [nombre] | [cargo] | Aprueba/Influye/Usuario |

### Proceso de Aprobación
[cómo toman la decisión]

### Budget Signals
[señales de presupuesto]

### Timeline y Urgencia
[fecha objetivo, eventos que generan presión]

### Red Flags
- [si hay: no budget, "lo consulto", etc.]

---

## Tabla Resumen de Procesos

| # | Proceso | Frecuencia | Tiempo/sem | Personas | Herramientas | Dolor (1-5) |
|---|---------|-----------|-----------|----------|-------------|------------|
| 1 | [nombre] | [freq] | [hrs] | [quién] | [tools] | [1-5] |
| 2 | [nombre] | [freq] | [hrs] | [quién] | [tools] | [1-5] |
| 3 | [nombre] | [freq] | [hrs] | [quién] | [tools] | [1-5] |

---

## Gaps y Preguntas Pendientes

[Lista de información que falta y preguntas para follow-up call]

---

## Siguiente Paso Recomendado

→ Ejecutar `/reporte-assessment [empresa]` para generar análisis profundo + slides de assessment
```

---

## STEP 4: Evaluar Cobertura

Para cada pilar, asigna un color:
- **GREEN** — Pilar bien cubierto. Datos suficientes para el análisis.
- **YELLOW** — Información parcial. Se puede trabajar pero hay gaps.
- **RED** — No se cubrió o información insuficiente. Necesita follow-up.

El **Coverage Score** es la cuenta de pilares GREEN + YELLOW (los que al menos tienen info parcial).

Si hay 2+ pilares RED, recomienda:
*"Sugiero agendar una call de follow-up de 15-20 minutos para cubrir los pilares que quedaron pendientes. Sin esta información, el assessment va a tener gaps importantes."*

---

## STEP 5: Mostrar en Chat + Guardar

**PRIMERO** muestra el documento completo en el chat. El comercial debe poder:
- Revisar que las citas sean correctas
- Validar los números
- Agregar contexto que el transcript no capturó
- Pedir ajustes

**DESPUÉS** guarda:
`Clientes/[empresa]/discovery/discovery-ops.md`

Confirma:
*"Discovery Ops generado para [Empresa]:*
*Archivo: [ruta]*
*Coverage: [X/5] pilares cubiertos*
*Procesos identificados: [N]*
*Horas manuales detectadas: [X] hrs/semana*

*Pilares: [GREEN] Tiempo [GREEN] Procesos [YELLOW] Herramientas [GREEN] Dolor [RED] Decisión*

*Gaps pendientes: [lista breve]*

*→ Siguiente paso: `/reporte-assessment [empresa]`"*

---

## Reglas

- **Español** por defecto — preguntar si necesita inglés
- **Citas textuales SIEMPRE** — mínimo 1 por pilar cubierto. Son las palabras exactas del prospect, entre comillas
- **No inventar datos** — si algo no se mencionó, déjalo vacío y márcalo como gap
- **Ser específico, no genérico** — "Jorge copia 75 ítems uno por uno al Excel" > "El equipo hace data entry"
- **Cuantificar siempre que sea posible** — horas > "mucho tiempo", COP > "caro"
- **La tabla resumen de procesos es OBLIGATORIA** — es el input directo para `/reporte-assessment`
