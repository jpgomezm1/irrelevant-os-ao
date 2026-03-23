---
name: discovery-notes
description: >
  Extrae brief estructurado de un discovery call. Triggers: "discovery notes",
  "notas discovery", "brief de call", "discovery brief", "/discovery-notes".
  Usa /discovery-notes
argument-hint: ""
allowed-tools: [Read, Write, mcp__fireflies__fireflies_get_transcript, mcp__fireflies__fireflies_get_transcripts, mcp__fireflies__fireflies_search, AskUserQuestion]
---

# Discovery Notes — Extractor de Brief de Discovery Call

Extraes un brief comercial estructurado de un discovery call. Tu output es la base para decidir que servicio ofrecer y como posicionar la propuesta.

---

## STEP 1: Leer Datos Base

Lee `CLAUDE.md` en la raiz del workspace para datos fijos de Irrelevant y los servicios disponibles.
2. Lee `Assets Fijos/PROP_VALUE_IRRELEVANT.md` para entender la propuesta de valor completa, servicios, portafolio, casos de exito y reglas de comunicacion de Irrelevant.

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

## STEP 2: Obtener Transcript

Intenta usar Fireflies MCP:

1. Pregunta al usuario: *"Quieres que busque la call en Fireflies o prefieres pegar el transcript?"*
2. Si Fireflies: usa `fireflies_search` con el nombre de la empresa, o `fireflies_get_transcripts` para listar recientes
3. Obtiene el transcript completo con `fireflies_get_transcript`

**Si Fireflies MCP no esta disponible o el usuario prefiere manual:**

*"Pegame el transcript de la discovery call. Si no tienes el transcript completo, dame al menos:*
*- Que empresa es y a que se dedican*
*- Que problemas mencionaron*
*- Que numeros o metricas salieron en la conversacion*
*- Que se acordo como siguiente paso"*

---

## STEP 3: Analizar y Extraer

Del transcript, extrae y estructura:

### 1. Datos Basicos
- **Empresa:** nombre completo
- **Industria:** sector y subsector
- **Tamano:** empleados, facturacion si se menciono
- **Contacto principal:** nombre, cargo, email si se menciono

### 2. Dolores Identificados (maximo 4)
Para cada dolor:
- Descripcion clara del problema
- **Cita textual** del transcript (las palabras exactas del prospecto)
- Impacto estimado (en tiempo, dinero, o calidad)

### 3. Oportunidad Principal
- Cual es la oportunidad mas grande para Irrelevant
- Por que este cliente es buen fit

### 4. Servicio Recomendado
- **Ops Layer, Edu Layer, o Core Layer** — con justificacion clara
- Por que ese y no otro
- Si aplica, combinacion de servicios

### 5. Metricas de Impacto Potencial
- Horas semanales recuperables
- Procesos automatizables
- Ahorro estimado (si hay datos para calcularlo)

### 6. Proximos Pasos Acordados
- Que se quedo para la siguiente reunion
- Fecha si se menciono
- Quien debe hacer que

### 7. Senales
- **Senales de compra:** urgencia, presupuesto mencionado, decision maker presente
- **Red flags:** no hay presupuesto, "lo voy a consultar", timeline indefinido, no hay dolor real

---

## STEP 4: Generar Output

Formatea el brief de forma limpia y escaneable. Usa headers claros, bullets, y las citas textuales resaltadas.

Guarda como: `Clientes/[empresa]/discovery/discovery-notes.md`

---

## STEP 5: Sugerir Siguiente Accion

Al final del brief, incluye:

*"--- Siguiente paso sugerido ---*

*Basado en este discovery, recomiendo:*
*- Servicio: [Ops/Edu/Core]*
*- Accion inmediata: [que hacer]*

*Quieres generar la cotizacion? Usa /cotizacion [empresa] [servicio]*
*Quieres calcular el ROI? Usa /calcular-roi [empresa]"*

---

## Reglas

- SIEMPRE intentar Fireflies primero, fallback a manual
- Las CITAS TEXTUALES son obligatorias — son la evidencia del dolor
- Maximo 4 dolores — si hay mas, priorizar los mas relevantes para Irrelevant
- La recomendacion de servicio debe ser JUSTIFICADA, no generica
- Si el discovery fue debil (no se abrio dolor real), decirlo: *"Ojo: este discovery no abrio dolor suficiente. Recomiendo una segunda call enfocada en [area] antes de enviar propuesta."*
- Espanol por defecto
- El brief debe ser util para CUALQUIER persona del equipo que lo lea, no solo quien hizo la call
