---
name: procesar-transcript
description: >
  Procesa transcripts de reuniones que no son del pipeline comercial (internas del cliente,
  presentaciones, sesiones estrategicas). Triggers: "procesar transcript", "transcript reunion",
  "procesar meeting", "/procesar-transcript".
  Usa /procesar-transcript [empresa]
argument-hint: "[empresa]"
allowed-tools: [Read, Write, Glob, Grep, mcp__fireflies__fireflies_get_transcripts, mcp__fireflies__fireflies_get_transcript, mcp__fireflies__fireflies_get_summary, mcp__fireflies__fireflies_search, AskUserQuestion]
---

# Procesar Transcript — Extractor de Contexto de Reuniones No-Pipeline

Procesas transcripts de reuniones que NO son del pipeline comercial de Irrelevant (C1/C2/C3). Reuniones internas del cliente, presentaciones, sesiones estrategicas, juntas con terceros — cualquier reunion que aporte contexto valioso para nuestro trabajo de consultoria.

---

## STEP 1: Leer Datos Base

1. Lee `CLAUDE.md` en la raiz del workspace para datos fijos de Irrelevant.
2. Lee `Assets Fijos/PROP_VALUE_IRRELEVANT.md` para entender la propuesta de valor completa, servicios, portafolio, casos de exito y reglas de comunicacion de Irrelevant.

---

## STEP 1.5: Verificar Carpeta del Cliente

Si el usuario paso empresa como argumento ($ARGUMENTS), usa ese nombre. Si no, pregunta:

*"De que empresa es esta reunion?"*

Busca si existe carpeta del cliente en `Clientes/[empresa-lowercase]/` usando Glob.

**Si EXISTE:**
1. Usar esa carpeta para guardar outputs
2. Leer contexto previo relevante:
   - `Clientes/[empresa]/contexto/*` — transcripts y notas
   - `Clientes/[empresa]/discovery/*` — discovery notes
   - `Clientes/[empresa]/diseno/*` — propuestas y specs
   Esto enriquece tu output con todo el historial del cliente.

**Si NO EXISTE:**
Preguntar: *"No encontre carpeta para [Empresa]. La creo? (o usa /cliente crear [empresa])"*
Si dice si, crear la estructura basica de carpetas.

---

## STEP 2: Obtener Transcript

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
*1. Pegame el transcript de la reunion aqui*
*2. Dame un resumen detallado de lo que paso"*

---

## STEP 3: Validar Tipo de Reunion

Lee el transcript y valida que NO es una call de ventas de Irrelevant.

**Si parece call de ventas de Irrelevant** (se mencionan servicios de Irrelevant, es discovery/follow-up/closing con un prospecto):

*"Ojo: esta reunion parece ser una call del pipeline comercial de Irrelevant. Para procesarla correctamente usa /procesar-call en vez de /procesar-transcript."*

Detente aqui y espera instruccion del usuario.

**Si NO es del pipeline**, clasifica el tipo:

- **Reunion interna del cliente** — standup, planning, retrospectiva, reunion de equipo
- **Presentacion o conferencia** — el cliente presento o asistio a algo
- **Sesion estrategica** — junta directiva, comite, planning estrategico
- **Reunion con terceros** — el cliente con proveedores, partners, clientes de ellos
- **Otro** — cualquier otra reunion relevante

Informa: *"Identifique esta reunion como: [tipo]. Voy a extraer el contexto relevante para nuestro trabajo."*

---

## STEP 4: Extraer Contexto Estructurado

Genera el documento de contexto con las siguientes secciones:

### Metadata
- **Fecha:** [fecha de la reunion]
- **Duracion:** [estimada si no es explicita]
- **Tipo:** [clasificacion del STEP 3]
- **Participantes:** Lista con nombre y cargo de cada persona identificada

### Resumen Ejecutivo
3-5 frases que capturan la esencia de la reunion. Que paso, que se decidio, que importa.

### Temas Discutidos
Lista de cada tema tratado con:
- Descripcion breve del tema
- Puntos clave discutidos
- Conclusion o estado (abierto/cerrado/pendiente)

### Decisiones Tomadas
Lista de decisiones concretas con:
- La decision
- Quien la tomo o propuso
- Implicaciones

### Insights Clave para Irrelevant
**Esta es la seccion mas importante.** Que aprendimos sobre esta empresa que es relevante para nuestro trabajo de consultoria:
- Pain points operativos revelados (procesos manuales, ineficiencias, quejas)
- Dinamicas de poder (quien decide, quien influye, quien bloquea)
- Cultura organizacional (como trabajan, que valoran, resistencias)
- Nivel de madurez tecnologica (que herramientas usan, como las usan)
- Oportunidades detectadas (donde Irrelevant podria aportar valor)
- Riesgos o banderas rojas (resistencia al cambio, presupuesto, prioridades)

### Citas Textuales Relevantes
Minimo 3 citas directas del transcript que revelen:
- Pain points o frustraciones
- Mentalidad o cultura
- Oportunidades
- Dinamicas de decision

Formato:
> "[Cita exacta]" — **[Nombre], [Cargo]**

### Personas Mencionadas o Presentes
Para cada persona identificada:
- **Nombre:** [nombre]
- **Cargo:** [cargo]
- **Rol en la reunion:** [que hizo, que aporto]
- **Relevancia para Irrelevant:** [es decision maker? influencer? champion? blocker?]

### Preguntas que Surgen
3-5 preguntas que deberiamos investigar o preguntar basados en esta reunion:
- La pregunta
- Por que importa para nuestro trabajo

---

## STEP 5: Guardar Output

Guarda como: `Clientes/[empresa]/contexto/transcript-[fecha]-[descriptor].md`

El descriptor es un slug de 2-3 palabras sobre la reunion.

Ejemplos:
- `transcript-2026-03-24-reunion-produccion.md`
- `transcript-2026-03-24-junta-directiva.md`
- `transcript-2026-03-24-planning-trimestral.md`

---

## STEP 6: Sugerir Siguiente Accion

*"Transcript procesado y guardado. Este contexto enriquece el perfil del cliente para futuros skills.*

*Sugerencias:*
*- /agregar-contexto [empresa] — para agregar mas info (web, LinkedIn, notas)*
*- /disenar-skills [empresa] — si ya tienes suficiente contexto para disenar la solucion*
*- /prep-call [empresa] — si tienes una call de ventas proxima con ellos"*

---

## Reglas

- SIEMPRE intentar Fireflies primero, fallback a manual
- Este skill es para reuniones que NO son del pipeline C1/C2/C3 de Irrelevant
- Si el transcript parece call de ventas de Irrelevant, redirigir a `/procesar-call`
- Citas textuales OBLIGATORIAS — minimo 3
- Los insights para Irrelevant son lo MAS IMPORTANTE — no es solo un resumen, es inteligencia de negocio
- El output debe ser util para CUALQUIER persona del equipo que lo lea
- Incluir fecha y descriptor en el nombre del archivo
- Espanol por defecto
