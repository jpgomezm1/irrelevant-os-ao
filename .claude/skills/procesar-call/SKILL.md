---
name: procesar-call
description: >
  Procesa una llamada de Fireflies automaticamente. Triggers: "procesar call",
  "procesar llamada", "process call", "revisar call", "/procesar-call".
  Usa /procesar-call
argument-hint: ""
allowed-tools: [Read, Write, mcp__fireflies__fireflies_get_transcripts, mcp__fireflies__fireflies_get_transcript, mcp__fireflies__fireflies_get_summary, mcp__fireflies__fireflies_search, AskUserQuestion]
---

# Procesar Call — Procesador Automatico de Llamadas

Procesas llamadas grabadas en Fireflies de forma automatica. Detectas el tipo de call y generas el output apropiado: discovery notes, follow-up, deal summary, o acta de reunion.

---

## STEP 1: Leer Datos Base

Lee `CLAUDE.md` en la raiz del workspace para datos fijos de Irrelevant.
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

## STEP 2: Obtener la Llamada

Intenta usar Fireflies MCP:

1. Usa `fireflies_get_transcripts` para listar las llamadas recientes
2. Muestra al usuario las ultimas 5-10 llamadas con fecha y titulo
3. Pregunta cual quiere procesar (o sugiere la mas reciente)

*"Estas son las llamadas recientes en Fireflies:*

*1. [fecha] - [titulo]*
*2. [fecha] - [titulo]*
*...*

*Cual quieres procesar? (numero o la mas reciente)"*

4. Usa `fireflies_get_transcript` para el transcript completo
5. Usa `fireflies_get_summary` para el resumen automatico

**Si Fireflies MCP no esta disponible:**

*"No pude conectar con Fireflies. Tienes dos opciones:*
*1. Pegame el transcript de la call aqui*
*2. Dame un resumen de lo que paso"*

---

## STEP 3: Analizar Tipo de Call

Lee el transcript y clasifica la llamada:

### Discovery Call
- Se habla por primera vez con el prospecto
- Se exploran problemas, operacion actual, pain points
- Se mencionan procesos manuales, ineficiencias
- **Output:** Ejecutar logica de `/discovery-notes`

### Follow-up / Propuesta
- Ya hubo contacto previo
- Se discute propuesta, precio, condiciones
- Puede haber objeciones
- **Output:** Generar mensaje de follow-up (WhatsApp + email)

### Closing
- Se cierra un deal, se acuerdan terminos finales
- Se habla de arranque, onboarding, fechas
- **Output:** Generar deal summary con terminos acordados y proximos pasos

### Reunion Interna
- Reunion del equipo de Irrelevant
- Se discuten deals, estrategia, operaciones
- **Output:** Ejecutar logica de `/resumen-reunion`

Informa al usuario la clasificacion:
*"Identifique esta call como: [tipo]. Voy a generar el output correspondiente."*

---

## STEP 4: Generar Output Segun Tipo

### Para Discovery Call:
Genera brief estructurado con:
- Empresa, industria, tamano
- Contacto principal
- Dolores identificados (con citas textuales)
- Oportunidad principal
- Servicio recomendado
- Proximos pasos

### Para Follow-up:
Genera mensajes de seguimiento:
- **WhatsApp:** 4-5 lineas, directo, con referencia a puntos clave de la call
- **Email:** Subject line + body estructurado con recap y CTA

### Para Closing:
Genera deal summary:
- Terminos acordados (servicio, precio, forma de pago)
- Timeline de arranque
- Responsabilidades de cada parte
- Proximos pasos inmediatos (contrato, factura, kickoff)

### Para Reunion Interna:
Genera acta:
- Resumen ejecutivo
- Decisiones clave
- Action items con responsable y fecha
- Temas pendientes

---

## STEP 5: Guardar Output

Guarda el output como archivo en la carpeta del cliente:
`Clientes/[empresa]/contexto/transcript-[fecha].md`

Ejemplo: `Clientes/acme/contexto/transcript-2026-03-22.md`

---

## STEP 6: Sugerir Siguiente Accion

Segun el tipo de call, sugiere el proximo paso:

- **Discovery:** *"Quieres generar la cotizacion? Usa /cotizacion [empresa]"*
- **Follow-up:** *"Quieres generar el contrato? Usa /contrato [empresa]"*
- **Closing:** *"Quieres generar los contratos? Usa /contrato [empresa] [servicio]"*
- **Interna:** *"Necesitas algo mas del equipo?"*

---

## Reglas

- SIEMPRE intentar Fireflies MCP primero, fallback a manual
- SIEMPRE clasificar el tipo de call antes de generar output
- Las citas textuales del transcript dan credibilidad al output
- El output debe ser ACCIONABLE — no solo un resumen, sino que hacer despues
- Incluir fecha en el nombre del archivo siempre
- Espanol por defecto
