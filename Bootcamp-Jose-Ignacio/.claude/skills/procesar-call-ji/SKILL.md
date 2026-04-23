---
name: procesar-call-ji
description: >
  Ingesta un transcript de llamada de negociación (Fireflies, archivo, paste)
  y lo prepara para análisis JIT. Detecta participantes, estructura por
  momentos, identifica la tipología aparente del otro, y deja todo listo para
  /radiografia-negociacion. Triggers: "procesar call", "ingesta transcript",
  "cargar llamada JIT", "/procesar-call-ji".
  Usa /procesar-call-ji [nombre-caso]
argument-hint: "[nombre-caso]"
allowed-tools: [Read, Write, Glob, Grep, Bash, AskUserQuestion, mcp__fireflies__fireflies_get_transcripts, mcp__fireflies__fireflies_get_transcript, mcp__fireflies__fireflies_search]
---

# Procesar Call JI — Ingesta y Estructuración

Eres el preprocesador del sistema. Tu trabajo es tomar un transcript crudo (de Fireflies, un .txt, o pegado en chat) y dejarlo listo para el análisis forense de `/radiografia-negociacion`. Detectas participantes, estructuras la conversación por momentos clave, y haces un diagnóstico preliminar de tipología.

**Tu output no es el análisis** — es la materia prima limpia + un diagnóstico express.

---

## STEP 0: Leer Framework + Materiales Previos del Caso

1. Lee `framework/framework-jose-ignacio.md` (necesitas saber qué estructurar)
2. Si existe `casos/[nombre-caso]/investigacion.md`, léelo
3. Si existe `casos/[nombre-caso]/estrategia.md`, léelo — así puedes comparar lo que se planeó vs lo que se ejecutó

---

## STEP 1: Ubicar o Crear el Caso

Usa Glob para buscar `casos/[nombre-caso-lowercase]/`. Si no existe, créala.

---

## STEP 2: Obtener el Transcript

Pregunta al usuario:

*"¿Cómo me pasas el transcript de la llamada?*

*1. **Fireflies** — te busco la llamada (necesito título o fecha aproximada)*
*2. **Archivo** — dame la ruta (.txt, .json, .vtt, .srt)*
*3. **Paste** — pegalo directamente aquí*

*Y necesito saber también:*
*- **Nombre del negociador de tu lado:** (quién hizo la llamada)*
*- **Nombre(s) de la contraparte:** (si lo sabes)*
*- **Duración aproximada:**"*

### 2.A — Si Fireflies

Usa `mcp__fireflies__fireflies_search` o `mcp__fireflies__fireflies_get_transcripts` para encontrar la llamada.

Si hay múltiples candidatos, mostrar opciones y pedir confirmación.

Una vez identificada, usar `mcp__fireflies__fireflies_get_transcript` con el ID para el transcript completo.

### 2.B — Si archivo

Lee el archivo directamente. Si es .vtt o .srt, parsea a texto plano con timestamps.

### 2.C — Si paste

Toma el texto directamente del mensaje.

---

## STEP 3: Limpieza y Estructuración

Procesa el transcript crudo:

### 3.A — Identificar participantes
- Mapea quién es quién. Si Fireflies no trae nombres claros, inferir por contexto.
- Marca: **NUESTRO LADO** vs **CONTRAPARTE**

### 3.B — Normalizar formato

Formato objetivo por cada intervención:

```
[mm:ss] LADO — Nombre: texto del turno.
```

Ejemplo:
```
[00:12] NUESTRO — Carlos: Hola Diana, gracias por el tiempo...
[00:35] CONTRAPARTE — Diana: Sí, dime, ¿en qué te puedo ayudar?
```

### 3.C — Segmentación por momentos

Identifica y marca los segmentos clave:

- **APERTURA** (primeros 2-3 minutos)
- **EXPLORACIÓN** (extracción de intereses / preguntas / descubrimiento)
- **PROPUESTA** (cuando alguien pone algo en la mesa)
- **OBJECIONES** (cada vez que aparece resistencia)
- **NEGOCIACIÓN** (intercambio de variables, concesiones, anclaje)
- **CIERRE** (últimos minutos)

Ejemplo de marcación:
```
--- APERTURA ---
[00:00–02:30]
...

--- EXPLORACIÓN ---
[02:30–18:00]
...
```

### 3.D — Highlights automáticos

Detecta y marca en el transcript limpio:
- 💰 **Cifras mencionadas** (precio, volumen, tiempo, cantidades)
- 🎯 **Anclas** (primera cifra que alguien pone en la mesa)
- ⚠️ **Objeciones explícitas** ("está caro", "no me parece", "el problema es que…")
- 🤐 **Silencios largos** (si el formato los permite — ej. >5s)
- 🗣️ **Ratio de palabras** — estimación por cada bloque (%nuestro / %contraparte)
- 🧠 **Intereses revelados** (cuando la contraparte dice el "por qué" detrás de un "qué")

---

## STEP 4: Diagnóstico Express — Tipología Aparente

Basado solo en el transcript (sin entrar al análisis profundo), dar un primer diagnóstico de la tipología del otro:

- **Tipología estimada:** [Suave / Duro / Firme / Soviético / HP]
- **Confianza:** Baja / Media / Alta
- **Evidencias concretas:** 3 citas del transcript que sustentan la clasificación

Este diagnóstico alimenta `/radiografia-negociacion` (que profundiza).

---

## STEP 5: Comparación con la Estrategia (si aplica)

Si existe `estrategia.md`:

- ¿Se mantuvo la estructura del plan?
- ¿Cuál fue el primer desvío vs la estrategia?
- ¿Se respetó la ZOPA planeada?
- ¿Se usaron las variables de rentabilidad infinita planeadas?

No profundizar — solo apuntar. El análisis completo es del skill siguiente.

---

## STEP 6: Output en Chat + Guardar

### 6.A — Chat

Muestra en chat:
1. **Metadata:** fecha, duración, participantes, segmentos detectados
2. **Diagnóstico express de tipología** con evidencias
3. **Primeros hallazgos** (3-5 observaciones rápidas)
4. **Vista preliminar del transcript estructurado** (los primeros 3 minutos como muestra)

### 6.B — Archivos a guardar

En `casos/[nombre-caso]/`:
- `transcript.md` — transcript completo estructurado (con timestamps, segmentos, highlights)
- `procesamiento.md` — metadata + diagnóstico express de este skill

Formato de `procesamiento.md`:

```markdown
# Procesamiento de Call — [nombre-caso]

**Fecha:** YYYY-MM-DD
**Duración:** X min
**Negociador:** Nombre
**Contraparte:** Nombre (empresa)
**Fuente:** Fireflies / archivo / paste

## Diagnóstico Express

**Tipología aparente del otro:** [X]
**Confianza:** [Baja/Media/Alta]

**Evidencias:**
1. "[cita textual]" — min X:Y
2. "[cita textual]" — min X:Y
3. "[cita textual]" — min X:Y

## Segmentos detectados
- Apertura: min 00:00–02:30
- Exploración: 02:30–18:00
- Propuesta: 18:00–25:00
- Objeciones: 25:00–35:00
- Cierre: 35:00–40:00

## Highlights
- Cifras mencionadas: [lista]
- Anclas puestas: [quién y cuánto]
- Objeciones: [lista]
- Ratio estimado de palabras: [X% nuestro / Y% contraparte]

## Comparación con estrategia (si aplica)
- ...

## Primeros hallazgos
1. ...
2. ...
3. ...
```

---

## STEP 7: Next Steps

*"--- NEXT STEPS ---*

*El transcript está procesado y listo para análisis. Siguiente:*

*- /radiografia-negociacion [caso] — análisis forense contra los 7 huesos (40-60 min de análisis)*

*Si necesitas antes:*
*- /investigar-prospecto [caso] — si aún no tienes el mapa*
*- /disenar-estrategia [caso] — si aún no tienes el plan (sirve como retrospectiva también)*

*Archivos generados:*
*- `casos/[caso]/transcript.md` — transcript limpio*
*- `casos/[caso]/procesamiento.md` — metadata + diagnóstico express"*

---

## Reglas

- **No analizar en profundidad aquí.** Este skill estructura; `/radiografia-negociacion` analiza.
- **Preservar todo el contenido original.** Nunca recortar partes "poco relevantes" — el contexto completo es materia prima.
- **Diagnóstico express con evidencia.** Toda afirmación sobre tipología debe anclar a una cita del transcript.
- **Si el transcript es muy corto o muy malo, decirlo.** "Este transcript es insuficiente para un análisis robusto — sugiero ampliar info."
- **Español.**
