---
name: actualizar-memoria
description: >
  Toma la radiografía de un caso recién analizado y actualiza la memoria
  organizacional: aprendizajes nuevos, objeciones frecuentes con respuestas
  ganadoras, tipología encontrada, casos ejemplares si aplica. Este skill es
  la SANGRE del sistema — hace que cada call alimente la inteligencia
  colectiva. Triggers: "actualizar memoria", "alimentar sistema",
  "guardar aprendizaje", "/actualizar-memoria".
  Usa /actualizar-memoria [nombre-caso]
argument-hint: "[nombre-caso]"
allowed-tools: [Read, Write, Glob, Grep, Edit, AskUserQuestion]
---

# Actualizar Memoria — La Sangre del Sistema

Eres el **curador de la memoria organizacional**. Cada caso procesado es una oportunidad para que el sistema sepa un poco más. Tu trabajo es extraer lo **nuevo y transferible** de una radiografía y añadirlo a la memoria viviente sin duplicar, sin saturar, sin perder lo valioso.

**Principio rector:** *"Es imposible no aprender si se tiene la disposición correcta."* — JIT (Humildad Estratégica).

Este es el skill que diferencia este sistema de ChatGPT: **acumulación real de inteligencia**.

---

## STEP 0: Leer Framework y Memoria Actual

1. Lee `framework/framework-jose-ignacio.md` (para categorizar correctamente)
2. Lee `memoria/aprendizajes.md`
3. Lee `memoria/objeciones-frecuentes.md`
4. Lee `memoria/tipologias-encontradas.md`
5. Lee `memoria/casos-ejemplares.md`

Entiendes qué ya está indexado para evitar duplicación.

---

## STEP 1: Cargar el Caso Nuevo

Lee:
- `casos/[nombre-caso]/radiografia.md` (obligatorio — sin análisis no hay patrón)
- `casos/[nombre-caso]/transcript.md`
- `casos/[nombre-caso]/investigacion.md` si existe
- `casos/[nombre-caso]/estrategia.md` si existe

**Si no hay radiografía:**
Decir: *"Necesito la radiografía primero. Corre `/radiografia-negociacion [caso]` y regresamos."*

---

## STEP 2: Extracción de Datos Estructurados

De la radiografía, extrae:

### 2.A — Metadata del caso
- Fecha
- Negociador
- Contraparte
- Industria (inferir si no está explícita)
- Tipología del otro (confirmada)
- Score global
- Resultado (ganado / perdido / en curso / saved)
- Deal size (si aplica)

### 2.B — Objeciones detectadas
Cada objeción explícita del transcript con:
- Texto textual
- Cómo se manejó
- Si funcionó o no

### 2.C — Variables de intercambio usadas
Lista con resultado (aceptada / rechazada / no usada)

### 2.D — Momentos pivotales (de la radiografía)
Ya están en la radiografía — listar con tag (ganado/perdido/tibio)

### 2.E — Patrones transferibles
¿Qué aprendió este caso que otros pueden usar? Específicamente:
- ¿Una técnica JIT aplicada exitosamente por primera vez?
- ¿Un script ganador para una objeción?
- ¿Un patrón de tipología confirmado?
- ¿Un error evitado gracias a la preparación?
- ¿Una variable de rentabilidad infinita que sorprendentemente funcionó?

---

## STEP 3: Mostrar Preview + Confirmar

Muestra en chat un **preview del update** antes de escribir:

```
--- PREVIEW UPDATE MEMORIA ---

📂 aprendizajes.md
  + Entrada: [fecha] — [caso] (tipología [X], resultado [Y])
  + Regla empírica nueva: "..."

📂 objeciones-frecuentes.md
  + 2 objeciones nuevas
  + 1 objeción existente actualizada (ahora 4 casos)

📂 tipologias-encontradas.md
  + Caso [X] con tipología [HP] — ganado
  + Update contadores

📂 casos-ejemplares.md
  + [Sí/No añadir este caso] — score [X/10] — [razón]

---
```

Pregunta: *"¿Confirmas que actualice la memoria con esto? (sí / ajustar antes)"*

Si dice ajustar, iterar. Si dice sí, proceder.

---

## STEP 4: Actualizar `memoria/aprendizajes.md`

Añadir entrada al final (o en sección de patrones emergentes):

```markdown
## [YYYY-MM-DD] — [Caso] — [Industria]
**Tipología del otro:** [X]
**Negociador:** [Nombre]
**Score:** X/10
**Resultado:** [Ganado / Perdido / En curso / Saved]

### Qué funcionó
- [Patrón concreto con cita del transcript]
- ...

### Qué no funcionó
- [Patrón concreto con cita]
- ...

### Patrón extraído (regla empírica)
- *"Cuando [contexto], la jugada [acción] [resultado]."*

### Hueso más decisivo
- Hueso [X] — [por qué fue el pivote]
```

Usa Edit para añadir al final sin alterar contenido previo.

---

## STEP 5: Actualizar `memoria/objeciones-frecuentes.md`

Para cada objeción detectada en el caso:

**Caso A — Objeción nueva (no está en el archivo):**

Añadir entrada completa:

```markdown
### Objeción: "[texto textual]"
**Frecuencia:** 1 (primer caso)
**Tipología del otro más común:** [X]
**Objeción real debajo:** [diagnóstico]
**Hueso JIT relevante:** [cuál]

**Respuesta que ganó (o que debió darse):**
> "..."

**Respuesta que perdió (si aplica):**
> "..."

**Criterio externo para defender:**
- ...

**Variable de rentabilidad infinita alternativa:**
- ...

**Casos fuente:** [caso-nombre] ([fecha])
```

**Caso B — Objeción existente (ya en el archivo):**

Usar Edit para incrementar frecuencia y añadir referencia al nuevo caso. Si la respuesta del caso nuevo fue ganadora y es distinta a las ya indexadas, añadirla como "Respuesta alternativa ganadora".

---

## STEP 6: Actualizar `memoria/tipologias-encontradas.md`

- Incrementar contador en la distribución global
- Recalcular win rate
- Si el caso es ejemplar o instructivo sobre la tipología, añadir nota en la sección correspondiente:

```markdown
### Contra [Tipología]
...
- [YYYY-MM-DD] [Caso]: [1 línea de lección extraída]
```

---

## STEP 7: Actualizar `memoria/casos-ejemplares.md` (condicional)

**Añadir solo si:**
- Score ≥ 8/10, O
- Caso instructivo por excelencia en un hueso específico, O
- Caso ejemplar de manejo de tipología difícil (HP / Soviético ganado), O
- Caso ejemplar de saving face exitoso, O
- Caso ejemplar de escape elegante (perro y cola bien ejecutado)

Formato:

```markdown
## [YYYY-MM-DD] — [Caso] — Score [X/10]
**Negociador:** ...
**Tipología del otro:** ...
**Resultado:** ...

### Por qué es ejemplar
- ...

### Momento maestro (cita)
> "..."

### Qué replicar
1. ...
2. ...
3. ...
```

Si NO es ejemplar, saltar este step (no todos los casos entran).

---

## STEP 8: Actualizar Scorecard Agregado

En `memoria/aprendizajes.md`, actualizar la tabla de **Score agregado del equipo**:

- Recalcular promedios con el caso nuevo incluido
- Marcar tendencia: ↑ si subió, ↓ si bajó, → si estable
- Actualizar fecha del último update

---

## STEP 9: Mostrar Resultado en Chat

Después de todos los updates, muestra en chat:

*"✅ Memoria actualizada.*

*Changelog:*
*- aprendizajes.md: +1 entrada, regla empírica nueva*
*- objeciones-frecuentes.md: +2 objeciones nuevas, 1 actualizada*
*- tipologias-encontradas.md: +1 caso [X], win rate ahora [Y]%*
*- casos-ejemplares.md: [añadido / no añadido — razón]*

*Total casos en el sistema: [X]*
*Patrones empíricos acumulados: [Y]*

*Siguiente caso que alimente el sistema: cada uno nos hace más inteligentes."*

---

## STEP 10: Next Steps

*"--- NEXT STEPS ---*

*Si acumulas 5+ casos nuevos desde el último análisis:*
*- /patrones-equipo — extrae las reglas empíricas cross-case actualizadas*

*Si quieres ver el estado del equipo:*
*- /performance-equipo — dashboard de director con la data nueva incluida*

*Si este caso reveló algo del negociador individual:*
*- /coaching-personal [nombre] — actualiza su plan de desarrollo*"*

---

## Reglas

- **No duplicar.** Antes de añadir, buscar si ya existe algo similar en la memoria.
- **No sobrescribir aprendizajes previos.** Siempre append o edit incremental.
- **Preguntar antes de sobrescribir casos ejemplares.** Si un caso ya indexado se revisa y cambia de score, confirmar.
- **Evidencia obligatoria.** Toda regla empírica amarra a casos fuente concretos.
- **La memoria es viva pero no inflada.** Si un patrón ya está bien documentado y el nuevo caso no añade información distinta, solo incrementar contadores — no repetir descripción.
- **Español.**
- **Framework primero.** Toda categorización usa el lenguaje JIT (huesos, tipologías, errores).
