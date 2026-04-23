---
name: slides-propuesta-ops
description: >
  Genera slides de presentacion de propuesta para el AI Ops Layer.
  Presenta los 5 skills disenados, el stack sugerido, impacto esperado y precio.
  Triggers: "slides propuesta", "presentacion ops", "slides ops", "propuesta ops",
  "/slides-propuesta-ops".
  Usa /slides-propuesta-ops [empresa]
argument-hint: "[empresa]"
allowed-tools: [Read, Write, Glob, Grep, AskUserQuestion]
---

# Slides Propuesta Ops — Presentacion de Propuesta AI Ops Layer

Generas los slides de presentacion para la propuesta del AI Ops Layer. Estos slides son lo que el consultor presenta al cliente en la reunion de cierre — muestran los 5 skills disenados, el stack sugerido, el impacto esperado, y la inversion. Es la pieza visual que conecta el diseno con la cotizacion.

---

## STEP 0: Leer Referencias Obligatorias (SIEMPRE hacer esto PRIMERO)

ANTES de hacer cualquier otra cosa, lee estos archivos en este orden:

1. `CLAUDE.md` — datos fijos de Irrelevant, servicios, precios
2. `Assets Fijos/PROP_VALUE_IRRELEVANT.md` — propuesta de valor, portafolio, casos de exito
3. **`Templates/Comercial/Slides Propuesta Ops/ejemplo-escuela-ingenieria.html`** — EL EJEMPLO REAL. Este es el estandar de calidad. Tu output debe tener esta profundidad. Leelo completo.

Estos archivos son tu brujula. No procedas sin haberlos leido.

---

## STEP 0.5: Verificar Carpeta del Cliente

Si el usuario paso empresa como argumento ($ARGUMENTS), usa ese nombre. Si no, pregunta:

*"Para que empresa quieres generar los slides de propuesta?"*

Busca si existe carpeta del cliente en `Clientes/[empresa-lowercase]/` usando Glob.

**Si EXISTE:**
1. Usar esa carpeta para guardar outputs
2. Leer contexto previo relevante:
   - `Clientes/[empresa]/contexto/*` — transcripts y notas
   - `Clientes/[empresa]/discovery/*` — discovery notes, prep-calls
   - `Clientes/[empresa]/diseno/*` — propuestas de skills y stack
   - `Clientes/[empresa]/comercial/*` — cotizaciones existentes
   Esto enriquece tu output con todo el historial del cliente.

**Si NO EXISTE:**
Preguntar: *"No encontre carpeta para [Empresa]. La creo? (o usa /cliente crear [empresa])"*
Si dice si, crear la estructura basica de carpetas.

---

## STEP 1: Cargar Inputs de Skills Previos

Este skill DEPENDE de outputs de skills anteriores. Busca y lee:

### OBLIGATORIO:
1. **`Clientes/[empresa]/diseno/propuesta-skills.md`** (de /disenar-skills)
   - Contiene los 5 skills disenados con: nombre, problema que resuelve, como funciona, impacto estimado
   - **Si NO existe:** *"No encontre el diseno de skills. Necesitas ejecutar /disenar-skills [empresa] primero para que yo tenga los 5 procesos a presentar."* — DETENTE aqui.

2. **`Clientes/[empresa]/diseno/stack.md`** (de /disenar-stack)
   - Contiene las herramientas recomendadas con: nombre, rol, justificacion
   - **Si NO existe:** *"No encontre el diseno de stack. Necesitas ejecutar /disenar-stack [empresa] primero."* — DETENTE aqui.

### OPCIONAL (enriquece el output):
3. **`Clientes/[empresa]/comercial/cotizacion-*.html`** (de /cotizacion)
   - Extraer precio y forma de pago
   - Si no existe, pedir el precio al usuario

4. **`Clientes/[empresa]/discovery/*`** — para contexto y pain points

5. **`Clientes/[empresa]/contexto/*`** — transcripts y notas que den color

---

## STEP 2: Datos Complementarios

Con los inputs cargados, pregunta lo que falte:

*"Ya tengo el diseno de skills y stack. Necesito confirmar algunos datos:*

*1. Idioma: espanol o ingles?*
*2. Nombre del comercial que presenta (por defecto: Juan Pablo Gomez)*
*3. Precio: [si encontre cotizacion, confirmar] / [si no, pedir]*
*4. Hay algo especifico del contexto del cliente que quieras destacar en los slides?"*

---

## STEP 3: Leer Template

Segun el idioma, lee el template:

**Espanol:**
- `Templates/Comercial/Slides Propuesta Ops/slides-propuesta-ops-es.html`

**Ingles:**
- `Templates/Comercial/Slides Propuesta Ops/slides-propuesta-ops-en.html`

Tambien lee el ejemplo para referencia de calidad:
- `Templates/Comercial/Slides Propuesta Ops/ejemplo-escuela-ingenieria.html`

---

## STEP 4: Generar Slides

Reemplaza TODOS los `{{PLACEHOLDER}}` con contenido real:

### Mapeo de datos:

**Del diseno de skills (propuesta-skills.md):**
- {{SKILL_1_NOMBRE}} a {{SKILL_5_NOMBRE}} — nombre de cada skill
- {{SKILL_1_PROBLEMA}} a {{SKILL_5_PROBLEMA}} — problema que resuelve
- {{SKILL_1_PASO_1/2/3}} a {{SKILL_5_PASO_1/2/3}} — como funciona (3 pasos)
- {{SKILL_1_IMPACTO}} a {{SKILL_5_IMPACTO}} — impacto estimado (horas/semana)
- {{SKILL_1_CATEGORIA}} a {{SKILL_5_CATEGORIA}} — categoria del skill

**Del diseno de stack (stack.md):**
- {{TOOL_1_NOMBRE}} a {{TOOL_6_NOMBRE}} — nombre de herramienta
- {{TOOL_1_ROL}} a {{TOOL_6_ROL}} — rol en el stack
- IMPORTANTE: El stack debe aparecer como "SUGERIDO" — se valida en implementacion

**De la cotizacion o datos del usuario:**
- {{PRECIO}} — precio del servicio
- {{MONEDA_LABEL}} — "COP + IVA" o "USD"

**Del contexto del cliente:**
- {{EMPRESA}} — nombre de la empresa
- {{INDUSTRIA}} — sector
- {{FECHA}} — fecha de hoy
- {{CONTEXTO_DESC}} — resumen del contexto
- {{CONTEXTO_QUOTE}} — cita del cliente si hay
- {{DOLOR_1_TITULO}} a {{DOLOR_4_TITULO}} — titulos de pain points
- {{DOLOR_1_DESC}} a {{DOLOR_4_DESC}} — descripciones

**De impacto agregado:**
- {{HORAS_SEMANA}} — suma total de horas recuperadas (de los 5 skills)
- {{PROCESOS_AUTOMATIZADOS}} — numero de procesos (normalmente 5)
- {{ROI_ESTIMADO}} — calculo basado en horas * costo hora estimado

**Del comercial:**
- {{COMERCIAL_NOMBRE}} — por defecto "Juan Pablo Gomez"
- {{COMERCIAL_EMAIL}} — por defecto "jpgomez@stayirrelevant.com"
- {{COMERCIAL_TELEFONO}} — por defecto "+57 318 335 1733"

**Del Edu Empresarial (OBLIGATORIO — slides 16 y 17):**

**NOTA 2026-04-22 post cascade**: el producto Edu evolucionó del Workshop Think AI de 3 horas a **Programa Edu Empresarial (Soteco-style · 4 sesiones × 3h)**. El pricing y scope son distintos. Los templates de slides existentes (`Templates/Comercial/Slides Propuesta Ops/`) todavia mencionan el producto viejo. Cuando un comercial genere nuevos slides, reemplazar estos valores:

- {{EDU_LAYER_BENEFICIO_1}} — por defecto "Equipo pasa de 'he oido de IA' a operar con AI-first"
- {{EDU_LAYER_BENEFICIO_2}} — por defecto "Ejercicios con casos REALES del equipo (Discovery + Form previo)"
- {{EDU_LAYER_BENEFICIO_3}} — por defecto "Entregable: ≥3 procesos automatizados + biblioteca de prompts"
- {{EDU_LAYER_BENEFICIO_4}} — por defecto "Plan 30 dias post-programa para instalar habito"
- {{EDU_LAYER_CASO}} — por defecto "Bancolombia"
- {{EDU_LAYER_PRECIO}} — por defecto "$10.000.000 COP + IVA (4 sesiones mensual) o $8.000.000 intensiva"
- {{EDU_LAYER_DURACION}} — por defecto "4 semanas (mensual) o 1 semana (intensiva)"

**NOTA:** Los slides de Edu Empresarial son OBLIGATORIOS en cada presentacion de Ops Layer. Son el upsell natural — el cliente siente lo que su equipo se lleva despues del programa. Solo se remueven si el comercial lo pide explicitamente.

**Ademas del Edu Empresarial**, ahora existe Cohort B2C como producto paralelo (ver `docs/CASCADE_ALIGNMENT.md`) · pero Cohort B2C NO se menciona en slides de propuesta Ops porque es producto distinto para target distinto (individuos, no empresas).

### Reglas de generacion:

- Los pain points se extraen del contexto del cliente o del campo "problema" de cada skill
- El impacto total se CALCULA sumando los impactos individuales de los 5 skills
- El ROI se estima basandose en horas ahorradas * costo/hora promedio de la industria
- Si hay menos de 6 tools en el stack, eliminar las cards sobrantes del HTML (no dejar vacias)

---

## STEP 5: Mostrar en Chat + Guardar

**PRIMERO** muestra un resumen de los slides en el chat — slide por slide con el contenido clave. El comercial debe poder revisar, hacer preguntas, y pedir ajustes antes de la reunion.

**DESPUES** guarda el archivo HTML:
`Clientes/[empresa]/comercial/slides-propuesta-ops.html`

---

## STEP 6: Verificacion + Next Steps

1. Busca `{{` en el archivo — cero placeholders restantes
2. Confirma al usuario:

*"Slides de propuesta generados para [Empresa]:*
*Archivo: [ruta]*
*Verificacion: 0 placeholders pendientes.*
*Total: 18 slides — Cover, Contexto, Dolores, Solucion, 5 Skills, Stack Sugerido, Impacto, Timeline, Inversion, Think AI (Hay algo mas), Think AI (Workshop), Cierre.*

*Quieres que ajuste algo?*

*--- NEXT STEPS ---*

*Antes de la reunion:*
*- /prep-call [empresa] C3 — para prepararte tacticamente*
*- /call-simulator [guion] — para generar guion de como presentar estos slides*

*Despues de la reunion:*
*- /procesar-call — procesar el transcript*
*- /follow-up-writer — generar follow-up inmediato*
*- Si el cliente acepta: /contrato [empresa] ops — para generar los contratos"*

---

## Reglas

- **SIEMPRE** leer el ejemplo de referencia ANTES de generar
- **NUNCA** generar sin tener propuesta-skills.md y stack.md — son inputs obligatorios
- **NUNCA** inventar datos del cliente — si falta info, preguntar
- **NUNCA** dejar placeholders sin reemplazar
- El stack SIEMPRE debe aparecer como "SUGERIDO" — se valida en implementacion
- Tono: consultor estrategico, profesional, confiado
- Espanol por defecto
- Los slides deben ser coherentes con la cotizacion (mismo precio, mismos servicios)
- El impacto total debe ser la SUMA de los impactos individuales de los 5 skills
