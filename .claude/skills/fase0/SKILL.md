---
name: fase0
description: >
  Genera documento de Fase 0 (diagnóstico estratégico) + slides de presentación para Core Layer.
  Triggers: "fase 0", "fase0", "diagnostico", "phase 0", "generar fase 0", "/fase0".
  Usa /fase0 [empresa]
argument-hint: "[empresa]"
allowed-tools: [Read, Write, Glob, Grep, AskUserQuestion, mcp__fireflies__fireflies_get_transcript, mcp__fireflies__fireflies_get_transcripts, mcp__fireflies__fireflies_search, mcp__fireflies__fireflies_get_summary]
---

# Fase 0 — Generador de Documento Diagnóstico + Slides

Generas el documento de Fase 0 (diagnóstico estratégico) y su presentación en slides para el servicio de AI Core Layer. Este es el documento más importante del ciclo comercial — es la propuesta formal que presenta el problema, el impacto, la tesis de intervención y la solución.

---

## STEP 0: Leer Referencias Obligatorias (SIEMPRE hacer esto PRIMERO)

ANTES de hacer cualquier otra cosa, lee estos archivos en este orden:

1. `CLAUDE.md` — datos fijos de Irrelevant
2. `Assets Fijos/PROP_VALUE_IRRELEVANT.md` — propuesta de valor, portafolio, casos de éxito, reglas de comunicación
3. **`Assets Fijos/Fase 0 Ejemplo/ejemplo_fase0.html`** — EL EJEMPLO REAL COMPLETO. Este es el estándar de calidad. Tu output debe tener esta profundidad y nivel de detalle. Léelo completo.
4. **`Templates/Comercial/Fase 0 Core Layer/ejemplo-escuela-ingenieria.html`** — Otro ejemplo de referencia del template rellenado.
5. **`Templates/Comercial/Slides Fase 0/ejemplo-escuela-ingenieria.html`** — Ejemplo de los slides. Tu output de slides debe tener esta calidad.

Estos 5 archivos son tu brújula. No procedas sin haberlos leído.

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

*"Vamos a generar la Fase 0. Necesito lo básico:*

*1. Nombre de la empresa*
*2. Industria / sector*
*3. Idioma: español o inglés?"*

---

## STEP 2: Cargar Todo el Contexto

**INPUT PRINCIPAL:** Si existe `Clientes/[empresa]/diseno/solucion.md`, leerlo PRIMERO — es el diseño de solución que alimenta este documento de Fase 0.

Pregunta al usuario:

*"Ahora necesito todo el contexto que tengas de este cliente. Entre más me des, mejor será el documento.*

*Puedes pasarme cualquier combinación de:*

*📞 **Transcripts de llamadas** — dame las rutas a los archivos (acepto .txt, .md, .pdf, o pega el texto directamente)*
*🎙️ **Transcripts de Fireflies** — dime el nombre de la reunión o del cliente y lo busco automáticamente*
*📝 **Discovery notes** — si usaste /discovery-notes, dame la ruta del archivo generado*
*📧 **Emails o notas** — cualquier comunicación relevante con el cliente*
*💬 **Info adicional** — lo que sepas: tamaño de la empresa, equipo, procesos, problemas que mencionaron*

*Mínimo necesito entender:*
*→ Qué problema tiene la empresa*
*→ Cuál es la oportunidad*
*→ Qué proponemos como solución*

*Dame todo lo que tengas."*

Espera la respuesta.

### Procesamiento de contexto:

**Si dan rutas a archivos:** Lee CADA archivo con Read tool (funciona con .txt, .md, .pdf, imágenes)

**Si mencionan Fireflies:** Usa el MCP para buscar y obtener transcripts. Si no está disponible, pedir que peguen el transcript.

**Si dan notas de /discovery-notes:** Lee el archivo — tiene todo estructurado.

### Análisis del contexto:

Con TODO el material, extraer y organizar:

1. **Problema central** — ¿Cuál es el dolor principal?
2. **Dolores específicos** (4) — Problemas concretos del día a día
3. **Proceso actual** — ¿Cómo funciona la operación hoy?
4. **Impacto económico** — ¿Cuánto les cuesta? (tiempo, dinero, oportunidad)
5. **Cuello dominante** — EL bottleneck principal
6. **Oportunidad** — ¿Qué se puede transformar con AI?
7. **Tesis de intervención** — ¿Por qué AI es la palanca correcta?
8. **Solución propuesta** — ¿Qué vamos a construir? (componentes)
9. **Métricas de éxito** — ¿Cómo medimos que funcionó?
10. **Timeline** — ¿Cuánto toma implementar?

Si falta información, preguntar al usuario. NUNCA inventar datos.

---

## STEP 3: Leer Templates

Según el idioma, lee AMBOS templates:

**Español:**
- Documento: `Templates/Comercial/Fase 0 Core Layer/fase0-core-layer-es.html`
- Slides: `Templates/Comercial/Slides Fase 0/slides-fase0-es.html`

**Inglés:**
- Documento: `Templates/Comercial/Fase 0 Core Layer/fase0-core-layer-en.html`
- Slides: `Templates/Comercial/Slides Fase 0/slides-fase0-en.html`

---

## STEP 4: Generar AMBOS Outputs

### 4A: Documento de Fase 0

Reemplaza TODOS los `{{PLACEHOLDER}}` con contenido del análisis. El documento debe:
- **Contar una historia** — Problema → Impacto → Cuello dominante → Tesis → Solución → Métricas
- Tener la **misma profundidad** que el ejemplo de la Escuela de Ingeniería
- Usar **lenguaje de consultor estratégico**, no de vendedor
- Incluir **datos específicos** del cliente
- Cuantificar el **impacto económico**

### 4B: Slides de Presentación

Reemplaza TODOS los `{{PLACEHOLDER}}` en slides. Deben ser:
- Coherentes con el documento (misma narrativa, mismos datos)
- Con **punch visual** — headlines grandes, stats impactantes, before/after
- Mismo nivel de calidad que el ejemplo de slides

**IMPORTANTE:** SIEMPRE generar ambos. Nunca uno sin el otro.

---

## STEP 5: Guardar

- Documento: `Clientes/[empresa]/fase0/fase0-documento.html`
- Slides: `Clientes/[empresa]/fase0/fase0-slides.html`

---

## STEP 6: Verificación

1. Busca `{{` en ambos archivos — cero placeholders restantes
2. Confirma al usuario:

*"Fase 0 generada para [Empresa]:*
*📄 Documento: [ruta]*
*🖥️ Slides: [ruta]*
*Verificación: 0 placeholders pendientes.*
*¿Quieres que ajuste algo?*
*Siguiente paso: /contrato [empresa] core (necesitarás este documento de Fase 0)."*

---

## Reglas

- **SIEMPRE** leer los ejemplos de referencia ANTES de generar
- **SIEMPRE** generar documento + slides juntos
- **NUNCA** inventar datos del cliente
- **NUNCA** dejar placeholders sin reemplazar
- Tono: consultor estratégico, no vendedor
- Español por defecto
- El precio NO va en la Fase 0 (va en cotización/contrato)
