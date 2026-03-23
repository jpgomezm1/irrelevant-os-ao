---
name: upsell
description: >
  Analiza la carpeta del cliente y sugiere el siguiente servicio natural con mensaje de approach.
  Triggers: "upsell", "siguiente servicio", "qué más le ofrecemos", "expandir cuenta", "/upsell".
  Usa /upsell [empresa]
argument-hint: "[empresa]"
allowed-tools: [Read, Write, Glob, AskUserQuestion]
---

# Upsell — Siguiente Servicio Natural

Analizas toda la historia del cliente para recomendar el siguiente servicio de Irrelevant con un approach personalizado. No vendes — detectas la oportunidad natural.

Antes de hacer CUALQUIER COSA:
1. Lee `CLAUDE.md` en la raíz del workspace para entender los servicios de Irrelevant y sus precios
2. Lee `Assets Fijos/PROP_VALUE_IRRELEVANT.md` para entender la propuesta de valor completa, servicios, portafolio, casos de éxito y reglas de comunicación de Irrelevant

---

## STEP 0.5: Verificar Carpeta del Cliente

Busca si existe carpeta del cliente en `Clientes/[empresa-lowercase]/` usando Glob.

**Si EXISTE:**
1. Usar esa carpeta para guardar outputs
2. Leer TODO el contexto del cliente:
   - `Clientes/[empresa]/README.md` — ficha del cliente
   - `Clientes/[empresa]/contexto/*` — transcripts y notas
   - `Clientes/[empresa]/discovery/*` — discovery notes, pain points originales
   - `Clientes/[empresa]/diseno/*` — qué se diseñó
   - `Clientes/[empresa]/comercial/*` — cotizaciones, ROI
   - `Clientes/[empresa]/contratos/*` — qué firmó
   - `Clientes/[empresa]/entregable/*` — qué se entregó
   - `Clientes/[empresa]/evaluaciones/*` — check-ins, call reviews
   - `Clientes/[empresa]/fase0/*` — Fase 0 (Core)
   - `Clientes/[empresa]/produccion/*` — avance del proyecto (Core)

**Si NO EXISTE:**
*"No encontré carpeta para [Empresa]. Necesito el historial del cliente para analizar el upsell. Usa `/cliente crear [empresa]` primero."*
DETENER ejecución.

---

## STEP 1: Análisis del Cliente

Lee TODA la carpeta del cliente y extrae:

1. **Servicio actual:** ¿Qué tiene contratado? (Ops, Edu, Core)
2. **Pain points originales:** Del discovery, ¿qué dolía?
3. **Pain points NO resueltos:** ¿Qué dolores mencionó que NO se abordaron con el servicio actual?
4. **Métricas de impacto:** ¿Hay datos de resultados? (de check-ins, entregables)
5. **Señales de crecimiento:** ¿En check-ins mencionaron querer más? ¿Equipo pidiendo herramientas?
6. **Relación:** ¿Cómo ha sido la interacción? ¿Confianza alta o baja?

---

## STEP 2: Determinar Siguiente Servicio

### Lógica de recomendación:

**Post Ops Layer → 2 caminos:**
- **→ Edu Layer** si: el equipo necesita pensar con IA, hay resistencia al cambio, los skills se subutilizan porque no entienden el "por qué"
  - Pitch: *"Ya tienen las herramientas, ahora el equipo necesita la mentalidad"*
- **→ Core Layer** si: hay un proceso core del negocio que necesita transformación profunda, el Ops mostró que hay potencial grande
  - Pitch: *"Ops fue el punto de entrada, pero el verdadero impacto está en transformar [proceso core]"*

**Post Edu Layer → 2 caminos:**
- **→ Ops Layer** si: el equipo ahora entiende IA y pide herramientas, hay procesos claros para automatizar
  - Pitch: *"Ahora que el equipo piensa en IA, vamos a darles las herramientas"*
- **→ Core Layer** si: durante el workshop identificaron un proceso core que transformar
  - Pitch: *"En el workshop descubrieron que [proceso] es donde está el mayor impacto"*

**Post Core Layer → 2 caminos:**
- **→ Ops Layer para otras áreas** si: el Core fue en un área específica y otras quieren lo mismo
  - Pitch: *"[Área original] está transformada, ahora [otra área] quiere lo mismo"*
- **→ Edu Layer** si: el equipo ampliado necesita capacitación para aprovechar la nueva infraestructura
  - Pitch: *"La infraestructura está lista, pero el equipo necesita pensar diferente para aprovecharla"*

---

## STEP 3: Generar Mensajes de Approach

### WhatsApp (corto, natural):

```
Hola [nombre],

[Referencia a algo específico — un resultado, un comentario del check-in, algo real]

Estuve pensando en algo que podría ser el siguiente paso natural para [empresa]: [servicio recomendado en 1 línea, sin jerga].

¿Tienes 15 min esta semana para platicarlo?
```

### Email (más detallado):

```
Asunto: [Algo personalizado, NO "Propuesta de upsell"]

Hola [nombre],

Desde que [resumen de lo que se hizo + resultado clave], he estado pensando en el siguiente paso natural para [empresa].

[2-3 líneas explicando por qué el siguiente servicio tiene sentido, conectando con pain points originales o nuevos que surgieron]

El [servicio recomendado] les permitiría [beneficio concreto]. Basado en lo que ya conozco de [empresa], estimaría [impacto esperado].

¿Agendamos 20 minutos para explorar esto? [link Cal.com]

Saludos,
[Comercial]
```

---

## STEP 4: Generar Brief Interno

Genera un documento interno con:

```markdown
# Upsell Analysis — [Empresa]
## [Fecha]

### Servicio Actual
- **Tipo:** [Ops/Edu/Core]
- **Fecha de entrega:** [si disponible]
- **Resultados reportados:** [métricas, feedback]

### Servicio Recomendado
- **Tipo:** [Ops/Edu/Core]
- **Justificación:** [por qué este servicio y no otro, con evidencia]

### Precio Estimado
- **Rango:** [precio según CLAUDE.md]
- **Ajustes:** [si hay razón para ajustar — cliente repetido, scope diferente]

### Probabilidad de Cierre
- **Alta / Media / Baja**
- **Razón:** [señales concretas que soportan la estimación]

### Pain Points que Resuelve
1. [Pain point + cómo lo resuelve el nuevo servicio]
2. [Pain point + cómo lo resuelve]
3. [Pain point + cómo lo resuelve]

### Riesgos
- [Qué podría hacer que digan no]
- [Cómo mitigarlo]

### Mensajes de Approach
[WhatsApp y email generados en STEP 3]
```

---

## STEP 5: Guardar Output

Guarda como: `Clientes/[empresa]/comercial/upsell-[fecha-YYYY-MM-DD].md`

---

## STEP 6: Sugerir Siguiente Paso

*"Análisis de upsell guardado en `Clientes/[empresa]/comercial/upsell-[fecha].md`"*

*"Próximos pasos sugeridos:*
- *Envía el WhatsApp o email generado*
- *Si responde positivo: `/prep-call [empresa]` para preparar la call*
- *Si necesitas cotizar: `/cotizacion [empresa] [servicio]`"*

---

## Reglas

- **Español** por defecto
- NUNCA recomendar un servicio sin justificación basada en datos del cliente
- El approach debe ser NATURAL — como un partner que ve una oportunidad, no un vendedor
- Si no hay suficiente contexto (sin check-ins, sin feedback), indicarlo y recomendar `/check-in` primero
- Usar el lenguaje y tono del cliente (si en los transcripts habla informal, el approach es informal)
- NUNCA inventar métricas o resultados — solo usar datos reales de la carpeta
- La probabilidad de cierre debe ser HONESTA — mejor ser conservador
- Si el cliente tuvo problemas con el servicio actual, NO recomendar upsell — recomendar arreglar primero
