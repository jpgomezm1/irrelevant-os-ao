---
name: check-in
description: >
  Genera agenda y preguntas para llamadas de seguimiento post-entrega.
  Triggers: "check-in", "seguimiento", "cómo le va al cliente", "revisión post-entrega", "/check-in".
  Usa /check-in [empresa]
argument-hint: "[empresa]"
allowed-tools: [Read, Write, Glob, AskUserQuestion]
---

# Check-In — Seguimiento Post-Entrega

Generas agendas y preguntas para llamadas de seguimiento después de entregar un servicio. Tu objetivo es medir adopción, impacto y detectar oportunidades de crecimiento.

Antes de hacer CUALQUIER COSA:
1. Lee `CLAUDE.md` en la raíz del workspace para entender los servicios de Irrelevant y sus precios
2. Lee `Assets Fijos/PROP_VALUE_IRRELEVANT.md` para entender la propuesta de valor completa, servicios, portafolio, casos de éxito y reglas de comunicación de Irrelevant

---

## STEP 0.5: Verificar Carpeta del Cliente

Busca si existe carpeta del cliente en `Clientes/[empresa-lowercase]/` usando Glob.

**Si EXISTE:**
1. Usar esa carpeta para guardar outputs
2. Leer contexto previo relevante:
   - `Clientes/[empresa]/entregable/*` — qué se entregó
   - `Clientes/[empresa]/diseno/*` — qué se diseñó
   - `Clientes/[empresa]/contratos/*` — qué servicio se contrató
   - `Clientes/[empresa]/evaluaciones/*` — check-ins previos
   - `Clientes/[empresa]/README.md` — ficha del cliente

**Si NO EXISTE:**
Preguntar: *"No encontré carpeta para [Empresa]. ¿La creo? (o usa /cliente crear [empresa])"*
Si dice sí, crear la estructura básica de carpetas.

---

## STEP 1: Recopilar Contexto

Pregunta al usuario (si no proporcionó todo):

*"Voy a preparar el check-in de seguimiento. Necesito:*

*1. Nombre de la empresa*
*2. ¿Cuánto tiempo lleva desde la entrega? (2 semanas, 1 mes, 2+ meses)*
*3. ¿Qué servicio se entregó? (Ops Layer, Edu Layer, Core Layer)*
*4. ¿Algún feedback informal que ya tengas? (mensajes, comentarios, señales)"*

Espera la respuesta. Complementa con lo que encuentres en la carpeta del cliente.

---

## STEP 2: Generar Preguntas según Tiempo Transcurrido

### Semana 2 — Preguntas de Adopción

El foco es: ¿están usando lo que entregamos?

1. ¿Ya están usando los procesos/herramientas que implementamos? ¿Cuáles?
2. ¿Cuál funciona mejor? ¿Cuál les ha dado más valor inmediato?
3. ¿Hay alguno que no estén usando? ¿Por qué?
4. ¿El equipo se siente cómodo con las herramientas? ¿Necesitan soporte?
5. ¿Han encontrado algún error o algo que no funciona como esperaban?
6. ¿Hay algo que necesiten ajustar para que se adapte mejor a su día a día?

### Mes 1 — Preguntas de Impacto

El foco es: ¿estamos generando resultados medibles?

1. ¿Han medido horas ahorradas por semana/mes? ¿Cuántas estimarían?
2. ¿Qué proceso ha tenido el mayor impacto en su operación?
3. ¿Hay algo que necesite ajuste o no esté dando los resultados esperados?
4. ¿El equipo ha encontrado nuevos usos que no habíamos planeado?
5. ¿Cómo comparan la operación antes vs después?
6. ¿Hay algún proceso que ahora ven que también necesita IA?

### Mes 2+ — Preguntas de Crecimiento

El foco es: ¿están listos para el siguiente nivel?

1. ¿Qué resultados concretos han visto hasta ahora? (datos, métricas, testimonios)
2. ¿El equipo está pidiendo más herramientas o procesos automatizados?
3. ¿Hay áreas de la empresa que ven lo que implementamos y quieren algo similar?
4. ¿Han pensado en escalar esto a otros equipos o departamentos?
5. ¿Hay un proceso core del negocio que creen que podría beneficiarse de IA?
6. ¿Están listos para el siguiente nivel de transformación?

---

## STEP 3: Generar Agenda del Check-In

Genera una agenda clara para la llamada:

```markdown
# Check-In — [Empresa]
## [Fecha] | [Semana 2 / Mes 1 / Mes 2+] post-entrega

### Agenda (20-30 min)

| Bloque | Tiempo | Objetivo |
|--------|--------|----------|
| Apertura + rapport | 3 min | Cómo están, contexto general |
| Adopción / Uso | 8 min | Qué están usando, qué no, por qué |
| Resultados / Impacto | 8 min | Métricas, feedback, valor percibido |
| Ajustes necesarios | 5 min | Qué ajustar, qué mejorar |
| Próximos pasos | 3 min | Siguiente check-in, oportunidades |

### Preguntas Clave
[Las preguntas del STEP 2, personalizadas al cliente y servicio entregado]

### Notas Pre-Call
- Servicio entregado: [X]
- Tiempo desde entrega: [X]
- Contexto previo: [resumen de lo relevante de la carpeta]
- Señales detectadas: [feedback informal, si hay]
```

---

## STEP 4: Generar Email Pre-Call

Genera un email para enviar antes de la llamada:

```
Asunto: Check-in — ¿Cómo les va con [servicio]?

Hola [nombre],

Han pasado [X semanas/meses] desde que terminamos [servicio/lo que entregamos] y quería agendar una call rápida (20 min) para ver cómo les está yendo.

Me interesa saber:
- ¿Qué están usando más?
- ¿Qué resultados han visto?
- ¿Hay algo que ajustar?

¿Te funciona [sugerir fecha/hora] para una call rápida?

Saludos,
[Comercial]
```

---

## STEP 5: Guardar Output

Guarda como: `Clientes/[empresa]/evaluaciones/check-in-[fecha-YYYY-MM-DD].md`

El archivo incluye:
- Agenda completa
- Preguntas personalizadas
- Email pre-call
- Espacio para notas post-call (sección vacía para llenar después)

---

## STEP 6: Sugerir Siguiente Paso

Al final, siempre:

*"Check-in preparado y guardado en `Clientes/[empresa]/evaluaciones/check-in-[fecha].md`"*

Si el tiempo transcurrido es Mes 2+ o las señales indican crecimiento:
*"El cliente parece listo para crecer. Cuando hagas la call, evalúa si es momento de: `/upsell [empresa]`"*

Si el tiempo transcurrido es Semana 2 o Mes 1:
*"Después de la call, actualiza las notas en el archivo. Próximo check-in sugerido: [fecha + 2-4 semanas]"*

---

## Reglas

- **Español** por defecto
- Las preguntas deben ser ESPECÍFICAS al servicio entregado y al cliente
- Si hay entregable en la carpeta, leerlo para personalizar las preguntas
- Si hay check-ins previos, leerlos para no repetir preguntas
- Tono de partner, NO de proveedor revisando su trabajo
- El objetivo del check-in es generar valor, no solo medir satisfacción
- NUNCA inventar datos del cliente — usar solo lo que está en la carpeta
- Si no hay suficiente contexto, indicarlo y generar preguntas genéricas
