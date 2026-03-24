---
name: email-post-reunion
description: >
  Genera el email profesional que se envía después de cada reunión con un cliente o prospecto.
  Triggers: "email post reunion", "correo post call", "mandar email de la reunion",
  "email de seguimiento", "recap email", "email post meeting", "/email-post-reunion".
  Usa /email-post-reunion
allowed-tools: [Read, Glob, Grep, AskUserQuestion, mcp__fireflies__fireflies_get_transcript, mcp__fireflies__fireflies_get_transcripts, mcp__fireflies__fireflies_get_summary, Write]
---

# Email Post-Reunión — Email profesional de seguimiento

Generas el email formal que se envía después de CADA reunión con un cliente o prospecto. Este NO es un mensaje informal de WhatsApp (eso lo hace /follow-up-writer). Este es el email profesional con summary, next steps claros, y los documentos que corresponden según la etapa.

Antes de hacer CUALQUIER COSA:
1. Lee `CLAUDE.md` para datos fijos de Irrelevant
2. Lee `Assets Fijos/PROP_VALUE_IRRELEVANT.md` para el contexto completo de servicios y prop value
3. Lee `Assets Fijos/framework-ventas-irrelevant.html` para el framework de ventas

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

## STEP 1: Recopilar Contexto

Pregunta al usuario:

*"Vamos a generar el email post-reunión. Necesito saber:*

*1. Con quién fue la reunión? (nombre, cargo, empresa)*
*2. Qué tipo de reunión fue?*
*   - **Discovery Call** (primera vez que hablamos)*
*   - **Follow-up / Segunda reunión***
*   - **Presentación de Fase 0 / Propuesta***
*   - **Presentación de entregable***
*   - **Reunión de seguimiento con cliente activo***
*   - **Otra** (descríbela)*
*3. Tienes el transcript de Fireflies o notas de lo que se habló?*
*4. Qué se acordó como siguiente paso?"*

Espera la respuesta.

### Si hay transcript de Fireflies:
Usa el MCP para obtenerlo (fireflies_get_transcripts → fireflies_get_transcript). Si el MCP no está disponible, pedir que pegue el transcript o notas.

### Analizar el contexto:
Del transcript o notas, extraer:
- **Temas clave** discutidos (3-5 bullets máximo)
- **Decisiones** tomadas (si las hubo)
- **Dolores o necesidades** que el cliente expresó
- **Siguiente paso** concreto acordado (fecha, hora, quién hace qué)
- **Tono de la reunión** (positivo, neutral, escéptico) para calibrar el email
- **Nivel de interés** del prospecto (alto, medio, bajo)

---

## STEP 2: Determinar documentos a adjuntar

Según el tipo de reunión y el resultado, recomendar qué documentos enviar:

### DISCOVERY CALL — Primera reunión

**Si el prospecto mostró alto interés:**
- Adjuntar: **One Pager** (ES o EN según idioma)
- Adjuntar: **Pitch Deck sin precio** (para que explore)
- Ruta: `Assets Fijos/One Pager/onepager-irrelevant-[es|en].html`
- Ruta: `Assets Fijos/Pitch Deck/pitch-deck-irrelevant-[no-price].html`
- Mencionar en el email: "Te comparto un documento con más detalle de lo que hacemos y algunos casos."

**Si interés medio:**
- Adjuntar: Solo **One Pager**
- Mencionar: "Te dejo un resumen de lo que hacemos por si quieres compartirlo con tu equipo."

**Si interés bajo:**
- No adjuntar nada pesado. Solo el recap y el next step.
- Mencionar: "Quedo atento si surge alguna duda."

### FOLLOW-UP / SEGUNDA REUNIÓN

**Si se avanza a cotización:**
- Mencionar: "Estoy preparando la cotización, te la envío en [plazo]."
- NO adjuntar cotización en este email — se envía aparte con /cotizacion

**Si necesita más info:**
- Adjuntar: **Pitch Deck con precio** o **One Pager**
- Adjuntar: **Caso de éxito relevante** si aplica (mencionar Indemneasy, Fynder, etc. del PROP_VALUE)

### PRESENTACIÓN DE FASE 0 / PROPUESTA

**Si el cliente mostró interés en avanzar:**
- Adjuntar: **Documento de Fase 0** (el que se presentó)
- Adjuntar: **Slides de la presentación** (para que revise internamente)
- Mencionar: "Te adjunto el documento completo y las slides para que puedas revisarlo con tu equipo."
- Mencionar siguiente paso: contratos, timeline, inicio

**Si el cliente necesita tiempo:**
- Adjuntar: Solo el **documento de Fase 0**
- Mencionar: "Tómate el tiempo que necesites para revisarlo. Quedo disponible para cualquier duda."
- Proponer fecha de seguimiento: "¿Te parece si hablamos el [fecha] para resolver dudas?"

### PRESENTACIÓN DE ENTREGABLE

- Adjuntar: **Documento entregable**
- Adjuntar: **Slides del entregable**
- Mencionar: "Te adjunto toda la documentación de lo que implementamos."
- Mencionar soporte: "Recuerda que tienes 1 semana de soporte incluida."
- Sugerir siguiente nivel: "Cuando estén listos, podemos hablar del siguiente paso (AI Strategy o Workshop)."

### REUNIÓN CON CLIENTE ACTIVO

- No adjuntar documentos comerciales
- Solo recap + action items
- Tono: cercano y operativo, no comercial

---

## STEP 2.5: Clasificar Profundidad del Email

Antes de redactar, evalúa cuánta información accionable salió de la reunión:

### NIVEL 1 — Email Ligero (C1 sin discovery real / call corta / prospect controló la agenda)
**Cuándo aplica:**
- Fue primera reunión y no se abrió dolor real
- El prospect pidió que Irrelevant presentara (no hubo escucha activa)
- No se obtuvieron métricas ni problemas concretos
- El prospect se mostró cauteloso o en modo evaluación

**Estructura:** Apertura personal + siguiente paso + adjunto si aplica. SIN recap detallado.
**Por qué:** Si no hubo discovery real, un recap detallado inventa profundidad que no existió. Peor: puede mencionar cosas que incomodan o presionan al prospect.

### NIVEL 2 — Email Estándar (C1 con buen discovery / C2 / follow-up con avance)
**Cuándo aplica:**
- Se identificaron dolores reales que el prospect expresó por cuenta propia
- Hay métricas o información concreta que vale la pena documentar
- Hubo decisiones o acuerdos que necesitan quedar por escrito

**Estructura:** Apertura personal + recap (3-5 bullets) + siguiente paso + adjuntos.

### NIVEL 3 — Email Completo (C3 / Presentación de Fase 0 / Entregable)
**Cuándo aplica:**
- Se presentó propuesta formal, diagnóstico o entregable
- Hay documentos que adjuntar y términos que confirmar
- El prospect necesita material para socializar internamente

**Estructura:** Apertura + recap estructurado + docs adjuntos + siguiente paso + timeline.

---

## STEP 3: Generar el Email

### FRAMEWORK POR NIVEL:

#### NIVEL 1 — Email Ligero

**Formato:** Prosa natural, SIN headers, SIN negritas de sección, SIN bullets. Debe leerse como un email normal entre personas, no como un documento estructurado. La única excepción es poner en negrita la fecha/hora del siguiente paso.

**Regla de framing para temas de la siguiente reunión:** Si vas a mencionar algo que se mostrará en la siguiente call, enmárcalo como lo que TÚ vas a traer, no como lo que ELLOS quieren. "Vamos a traer casos prácticos, incluyendo el tema de X" (preparación tuya) ≠ "Su interés en X" (los compromete antes de tiempo).

**Links vs adjuntos:** Si existe un link web al documento (ej. one pager en Netlify), preferir el link sobre el adjunto. Es más ligero y más fácil de compartir internamente.

```
Asunto: Siguiente reunión [fecha] — Irrelevant + [Empresa]

Hola [Nombres agrupados], espero que estén muy bien.

[1-2 líneas de agradecimiento + reconocimiento de su empresa/operación/cómo están
viendo el tema de IA. Que se sienta que escuchaste y que valoras lo que hacen,
sin halagar de más ni ser genérico.]

[Siguiente paso: qué va a pasar, cuándo, y qué vas a traer tú. Si se mencionó
algún tema específico en la call, se puede referenciar como lo que TÚ prepararás,
no como lo que ellos pidieron.]

[Mención ligera de adjunto o link — "les comparto un one pager de lo que hacemos
por si lo quieren revisar o compartir internamente antes de la reunión."]

[Link si existe, o indicación del adjunto]

Quedo atenta a cualquier duda.

Saludos,

[Firma]
```

**Ejemplo real de Nivel 1 bien ejecutado:**
"Hola Sara y Melissa, espero que estén muy bien.

Gracias por el espacio hoy, fue muy valioso empezar a entender mejor cómo están trabajando hoy en Acrecer y el enfoque que tienen en cada una de las líneas y hacia la IA.

Nos vemos entonces el **jueves 9 de abril a las 3pm**. En esa sesión vamos a traer algunos casos prácticos, incluyendo en el tema de cotización para proyectos, para que puedan ver de forma más tangible cómo se podría aplicar en su operación.

Mientras tanto, les comparto un one pager de lo que hacemos por si lo quieren revisar o compartir internamente antes de la reunión.

[link]

Quedo atenta a cualquier duda.

Saludos,"

#### NIVEL 2 — Email Estándar
```
Asunto: Recap + próximos pasos — Irrelevant + [Empresa]

Hola [Nombre],

[1-2 líneas de apertura — referenciar algo específico que el prospect DIJO,
no algo que tú presentaste.]

**Lo que hablamos:**

• [Solo puntos que el PROSPECT trajo a la mesa — sus dolores, sus palabras]
• [No incluir lo que tú presentaste o propusiste]
• [Máximo 3-4 bullets]

**Siguiente paso:**

[QUÉ + QUIÉN + CUÁNDO]

[Adjuntos si aplican]

[Cierre]

[Firma]
```

#### NIVEL 3 — Email Completo
```
Asunto: [Documento] adjunto — [Empresa] + Irrelevant

Hola [Nombre],

[1-2 líneas que conecten con la decisión o el momento de la reunión]

**Resumen:**

• [Diagnóstico o propuesta presentada — 1 línea]
• [Decisiones tomadas]
• [Términos acordados si aplica]

**Documentos adjuntos:**

• [Doc 1 — qué es y para qué lo necesitan]
• [Doc 2]

**Siguiente paso:**

[QUÉ + QUIÉN + CUÁNDO — con timeline claro]

[Cierre con momentum si van a avanzar]

[Firma]
```

### REGLAS DEL EMAIL:

1. **SIEMPRE tiene que haber un next step con fecha.** Si no se acordó en la reunión, proponerlo: "¿Te funciona el [día] a las [hora] para [acción]?"

2. **Máximo 15 líneas.** Nadie lee emails largos. Si hay mucho que decir, ponerlo en los documentos adjuntos. Para Nivel 1, máximo 8 líneas.

3. **El asunto debe ser específico.** NO: "Seguimiento reunión". SÍ: "Siguiente reunión jueves 9 — Irrelevant + Acrecer" o "Fase 0 adjunta — [Empresa] + Irrelevant"

4. **El tono NO es de vendedor.** Es de socio estratégico. No agradecer excesivamente. No ser servil. Ser directo, profesional, y mostrar que entendiste lo que les importa.

5. **Las 2 primeras líneas deciden si leen el resto.** Deben referenciar algo ESPECÍFICO de la reunión — una frase que dijeron, un problema que mencionaron, una decisión que tomaron.

6. **NO usar:**
   - "Fue un placer" (genérico)
   - "No dudes en contactarme" (pasivo)
   - "Quedo a tu disposición" (servil)
   - "Adjunto encontrarás..." (formal anticuado)
   - "Hola [Nombre1], hola [Nombre2]" — NO saludar uno por uno. Agrupar en una línea natural: "Hola Sara y Melissa, espero que estén muy bien."

7. **SÍ usar:**
   - Lenguaje directo: "Te comparto...", "El siguiente paso es...", "Necesito de tu parte..."
   - Referencias específicas a lo que dijeron
   - Datos concretos si aplica (el número del 84%, casos de éxito relevantes)

### REGLAS DE CONTENIDO — QUÉ INCLUIR Y QUÉ NO:

8. **NUNCA mencionar soluciones o productos específicos que el prospect aún no ha visto en acción.** Si mostraste un caso (ej. cotizador) pero no hiciste demo, no lo nombres en el email. Hacerlo quema el wow moment de la siguiente reunión. Ejemplo: NO decir "el cotizador inteligente que les mostré" — SÍ decir "los casos que hablamos".

9. **NUNCA mencionar temas que el prospect cerró o dijo que no aplica a ellos.** Si dijeron "eso lo maneja otra área" o "eso ya lo tenemos cubierto", NO incluirlo en el recap. Mencionarlo demuestra que no escuchaste y presiona innecesariamente.

10. **El recap solo incluye lo que el PROSPECT dijo, no lo que tú presentaste.** El email no es un resumen de tu pitch — es un reflejo de lo que a ELLOS les importó. Si la reunión fue mayormente presentación tuya, el recap es mínimo o no existe (Nivel 1).

11. **Calibrar especificidad al nivel de confianza.** En C1 donde apenas se conocen, ser general: "cómo están viendo el tema de IA", "conocer más de su operación". En C2/C3 donde hay confianza, ser específico: "el problema de conversión de leads entre sedes", "los $X que están dejando en la mesa".

---

## STEP 4: Listar Documentos a Adjuntar

Después del email, listar claramente qué documentos adjuntar y dónde están:

*"Documentos para adjuntar a este email:*

*1. [Nombre del documento] → [Ruta del archivo]*
*2. [Nombre del documento] → [Ruta del archivo]*

*Tip: Abre los HTMLs en el browser y haz Ctrl+P → Guardar como PDF para adjuntarlos al email."*

Si no hay documentos que adjuntar, indicarlo: "Este email no necesita adjuntos."

---

## STEP 5: Guardar

Guarda el email como: `Clientes/[empresa]/comercial/emails/email-post-[fecha].md`

---

## VARIACIONES POR RESULTADO DE LA REUNIÓN

### La reunión fue MUY bien (quieren avanzar):
- Tono: seguro, con momentum
- Next step: concreto y pronto (48h máximo)
- Docs: los que correspondan al siguiente paso
- Cerrar con: "Nos movemos rápido para que empiecen a ver resultados cuanto antes."

### La reunión fue bien (interesados pero sin urgencia):
- Tono: profesional, sin presionar
- Next step: proponer fecha de seguimiento (1 semana)
- Docs: one pager o deck para que socialicen internamente
- Cerrar con: "Cuando estén listos, agendamos la siguiente conversación."

### La reunión fue neutra (no se ve claro):
- Tono: añadir valor, no vender
- Next step: ofrecer algo de valor gratuito (un insight, un dato, un caso relevante)
- Docs: solo one pager (ligero)
- Cerrar con: "Si en algún momento quieren explorar esto, estoy acá."

### La reunión fue para presentar resultados (entregable):
- Tono: celebratorio pero profesional
- Next step: período de soporte + fecha de revisión
- Docs: entregable completo + guía de uso
- Mencionar el siguiente nivel de servicio (sin presionar)

---

## Reglas

- **Español** por defecto. Si la reunión fue en inglés, generar en inglés.
- El email debe enviarse **dentro de las 2 horas** después de la reunión. Mencionar esto al usuario.
- SIEMPRE tener un next step con fecha. Sin excepción.
- NUNCA inventar lo que se dijo en la reunión — usar solo lo que está en el transcript/notas.
- Los documentos recomendados deben corresponder al momento del ciclo de ventas.
- Si no sabes qué documentos adjuntar, preguntar al usuario qué se acordó.
- La firma siempre usa los datos del comercial (preguntar si no es JP).
- Sugerir al usuario: "¿Quieres que también genere el follow-up de WhatsApp? Usa /follow-up-writer"
