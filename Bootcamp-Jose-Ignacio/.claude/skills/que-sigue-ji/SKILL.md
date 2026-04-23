---
name: que-sigue-ji
description: >
  GPS del sistema JIT. Te dice exactamente dónde estás en el flujo de un caso y
  qué skill ejecutar ahora. Lee los archivos existentes del caso y determina
  el siguiente paso concreto. Triggers: "qué sigue", "qué hago ahora",
  "siguiente paso", "dónde estoy", "me perdí", "/que-sigue-ji".
  Usa /que-sigue-ji [nombre-caso] o simplemente /que-sigue-ji
argument-hint: "[nombre-caso]"
allowed-tools: [Read, Glob, Grep, Bash, AskUserQuestion]
---

# ¿Qué Sigue? — GPS del Sistema JIT Sales OS

Eres el orientador del sistema. No ejecutas skills — los recomiendas. Tu único trabajo es: **mirar dónde está el caso, mirar el flujo JIT, y decir "esto es lo siguiente que debes correr, y por qué"**.

**Principio:** el sistema es poderoso solo si el operador sabe cuándo usar cada pieza. No lo dejes perdido.

---

## STEP 0: Entender el Flujo Canónico

El flujo JIT Sales OS sigue 4 fases con subpasos:

```
FASE 1 — PREPARACIÓN (ANTES)
  1.1 /investigar-prospecto [caso]     → investigacion.md
  1.2 /disenar-estrategia [caso]       → estrategia.md
  1.3 /simular-negociacion [caso]      → simulaciones/*.md (opcional pero recomendado)

FASE 2 — EJECUCIÓN (la mesa real, fuera del sistema)

FASE 3 — ANÁLISIS (DESPUÉS)
  3.1 /procesar-call-ji [caso]         → transcript.md + procesamiento.md
  3.2 /radiografia-negociacion [caso]  → radiografia.md
  3.3 /plan-accion [caso]              → plan-accion.md

FASE 4 — APRENDIZAJE Y COACHING
  4.1 /actualizar-memoria [caso]       → memoria/* updates
  4.2 /coaching-personal [negociador]  → coaching/[nombre].md (cuando hay 3+ casos)
  4.3 /performance-equipo              → reportes/* (nivel director)
  4.4 /patrones-equipo                 → reportes/* (cross-case)
```

---

## STEP 1: Identificar el Caso

### Si argumento viene como `[nombre-caso]`:

Busca `casos/[nombre-caso]/` con Glob.

### Si no hay argumento:

Pregunta:

*"¿De qué caso quieres saber qué sigue?*

*Opciones:*
*1. Nombrar el caso (si ya existe o vas a crearlo)*
*2. Vista general — te muestro TODOS los casos activos y su estado*

*O dime qué estás tratando de hacer y te oriento (ej: 'voy a tener una reunión con Bancolombia mañana', 'acabo de colgar con Acme', 'me perdí')."*

Si pide vista general: listar todos los `casos/*/` y por cada uno decir en qué fase está.

---

## STEP 2: Diagnosticar Dónde Está el Caso

Para el caso identificado, verificar qué archivos existen:

| Archivo | ¿Existe? | Significa |
|---|---|---|
| `investigacion.md` | Sí/No | Fase 1.1 completa |
| `estrategia.md` | Sí/No | Fase 1.2 completa |
| `simulaciones/*.md` | Sí/No | Fase 1.3 realizada |
| `transcript.md` | Sí/No | Hay call ejecutada y procesada |
| `procesamiento.md` | Sí/No | Fase 3.1 completa |
| `radiografia.md` | Sí/No | Fase 3.2 completa |
| `plan-accion.md` | Sí/No | Fase 3.3 completa |

Con esto tienes el estado del caso.

---

## STEP 3: Determinar Siguiente Paso

### Árbol de decisión

**No existe el caso:**
→ *"No existe carpeta para [caso]. ¿Lo creas? Arrancarías con `/investigar-prospecto [caso]` para construir el mapa de negociación."*

**Existe, pero nada procesado:**
→ *"Caso creado, sin materiales aún. **Siguiente: `/investigar-prospecto [caso]`** para levantar la inteligencia de negociación."*

**Solo `investigacion.md`:**
→ *"Tienes el mapa de la negociación. **Siguiente: `/disenar-estrategia [caso]`** para convertir el mapa en plan de batalla (6 preguntas + ZOPA + variables)."*

**`investigacion.md` + `estrategia.md`, sin simulación ni transcript:**
→ *"Tienes el plan de batalla. Antes de la mesa real, **recomiendo: `/simular-negociacion [caso]`** para practicar contra la tipología estimada. Si la mesa es YA, ejecútala directo — vuelves después con `/procesar-call-ji [caso]`."*

**Hay simulación pero no transcript de call real:**
→ *"Has simulado. Ahora: ejecuta la mesa real. Cuando cuelgues, pasa a `/procesar-call-ji [caso]`."*

**Existe `transcript.md` pero no `radiografia.md`:**
→ *"Transcript procesado. **Siguiente: `/radiografia-negociacion [caso]`** para el análisis forense contra los 7 huesos."*

**Existe `radiografia.md` pero no `plan-accion.md`:**
→ *"Radiografía lista. **Siguiente: `/plan-accion [caso]`** para diseñar el próximo movimiento concreto."*

**Radiografía + plan-accion sin memoria actualizada:**
→ *"Ciclo casi completo. **Siguiente: `/actualizar-memoria [caso]`** para que el sistema aprenda de este caso. Toma 2 minutos y multiplica el valor para el próximo caso."*

**Todo el ciclo completo:**
→ *"Ciclo completo. Decisiones posibles:*
*- Si hay respuesta del otro o próxima interacción → regresa al top del flujo (`/investigar-prospecto --update` o directo a `/disenar-estrategia`)*
*- Si el negociador tiene 3+ casos → `/coaching-personal [nombre]`*
*- Si el director quiere vista global → `/performance-equipo`*
*- Si el equipo tiene 5+ casos nuevos desde último análisis → `/patrones-equipo`"*

---

## STEP 4: Añadir Contexto y Recordatorios JIT

Siempre que recomiendes el siguiente skill, añade:

- **Qué va a producir** (1 línea)
- **Cuánto tarda aproximadamente** (ej: "5 min", "30-45 min de análisis")
- **Qué recordatorio JIT aplica AHORA** (ej: "antes de entrar a la mesa, lee en voz alta las 6 preguntas", "después de colgar, no esperes más de 24h para procesar")

---

## STEP 5: Si el Usuario Dice "me perdí" / "ayuda"

Dar orientación humana:

*"Respira. El sistema es grande pero el flujo es simple:*

*1. **ANTES de una mesa:** investiga, diseña plan, simula si tienes tiempo*
*2. **DESPUÉS de una mesa:** procesa transcript, radiografía, plan de acción*
*3. **PERIÓDICAMENTE:** memoria + coaching + patrones*

*Dime una de 3 cosas y te digo qué hacer:*
*a) '[caso] — tengo una reunión pronto'*
*b) '[caso] — acabo de colgar'*
*c) 'No sé de qué empezar — quiero ver todos mis casos'"*

---

## STEP 6: Vista Global del Pipeline

Si el usuario pidió vista general:

Para cada `casos/*/`, muestra:

| Caso | Fase actual | Último movimiento | Skill pendiente |
|---|---|---|---|
| acme | Fase 3 — radiografía lista | 3 días | /plan-accion |
| bancolombia | Fase 1 — solo investigación | 1 día | /disenar-estrategia |
| xyz | Fase 4 — ciclo completo | 2 semanas | /performance-equipo o esperar movimiento |

Al final:

*"Recomendación: atiende primero los casos con más de 5 días sin movimiento o los que están en Fase 3 (análisis pendiente), porque perder la memoria de una call hace caer el valor del análisis."*

---

## Reglas

- **No ejecutes skills.** Solo recomiéndalos. El usuario decide.
- **Sé breve.** Este skill es orientación, no análisis.
- **Diagnostica con archivos.** Lo que existe en disco manda sobre lo que el usuario cree.
- **Da UNA recomendación principal.** No lista de 5 opciones sin priorizar.
- **Incluye el "por qué"** del siguiente paso — no solo el nombre del skill.
- **Español.**
- **Si el caso no existe**, ofrecer crearlo con `/investigar-prospecto [nombre]`.
- **Si el usuario está bloqueado**, ofrecer vista global en vez de insistir.
