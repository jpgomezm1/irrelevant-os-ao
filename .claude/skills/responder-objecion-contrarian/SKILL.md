---
name: responder-objecion-contrarian
description: >
  Genera respuestas a objeciones comunes de prospects usando el insight contrarian
  de irrelevant ("AI sin comprensión no da ventaja · la ventaja está en la especificidad").
  Triggers: "responder objecion", "objecion", "como respondo", "handle objection",
  "/responder-objecion-contrarian". Usa /responder-objecion-contrarian [tipo-objecion]
argument-hint: "[tipo-objecion | descripcion]"
allowed-tools: [Read, Write, AskUserQuestion]
---

# Responder Objeción Contrarian — Biblioteca de respuestas estratégicas

Skill que genera respuestas a objeciones comerciales usando el **insight contrarian** de irrelevant (el ángulo comercial central del cascade · ver `Assets Fijos/PROP_VALUE_IRRELEVANT.md` sección 2).

**Insight central que usamos como base**:

> *"Las empresas que implementen AI sin comprensión + sin personalización profunda NO generarán ventaja competitiva. La ventaja está en la especificidad, no en la velocidad de adopción."*

---

## STEP 0: Leer referencias

Antes de responder:
1. `Assets Fijos/PROP_VALUE_IRRELEVANT.md` — insight contrarian + ángulos comunicativos
2. `docs/CASCADE_ALIGNMENT.md` — capas económicas para redirigir si aplica
3. `docs/ICP.md` — si la objeción revela que no hay fit

---

## STEP 1: Identificar la objeción

Si el usuario pasó argumento ($ARGUMENTS), usarlo. Si no, preguntar:

> *"¿Qué objeción estás enfrentando? Dame la frase textual del prospect."*

Clasificar en una de las 12 objeciones estándar (abajo) o como **objeción nueva** que se documenta para futura referencia.

---

## STEP 2: 12 objeciones estándar + respuestas

### Objeción 1 · "Ya estamos usando ChatGPT / Claude directo"

**Lo que el prospect realmente dice**: *"No vemos la diferencia entre tenerte a ti o usar la herramienta directo."*

**Respuesta contrarian**:
> *"Perfecto que lo estén usando. Déjame hacerte una pregunta: en 12 meses, cuando tu competencia también esté usando ChatGPT — porque la van a estar usando — ¿qué ventaja tienes? La respuesta honesta es **ninguna**, porque están haciendo lo mismo que todos. La ventaja competitiva no está en usar AI — está en usarla de forma específica a **tu operación**, donde tus competidores no pueden imitarte. Eso es lo que hacemos. No te vendemos AI · te ayudamos a que tu AI sea distinta."*

---

### Objeción 2 · "McKinsey / BCG / Accenture ya nos mandó propuesta"

**Respuesta contrarian**:
> *"Excelente que tengas esa opción. Déjame diferenciarnos clarito: McKinsey te entrega un PPT de 80 slides con recomendaciones. Nosotros te entregamos **operación funcionando**. Ellos te cobran por horas, nosotros por impacto. Ellos se van después del diagnóstico, nosotros nos quedamos adentro si es Core Layer. Y tú puedes preguntarles cuántos de sus consultores saben tocar código AI real — la mayoría, ninguno. No somos consultoría. Somos operadores."*

---

### Objeción 3 · "Es muy caro" / "El presupuesto no da"

**Respuesta** (primero entender · no reaccionar):
> *"Entiendo. Antes de discutir precio, necesito saber: ¿qué piensas que costaría resolverlo internamente? Piensa en 3 personas de tu equipo × 6 meses × sueldo + prueba y error + herramientas compradas mal. Típicamente eso es 3-5x lo que cobramos. Pero si de verdad el budget no está, te digo dos cosas: (1) **no te vendo Ops si no hay caja** — eso sería mal para ambos. (2) Hay opciones más accesibles según tu situación · el Edu Empresarial cuesta ~$10M, el cohort B2C es USD $300. ¿Qué escala estás buscando?"*

**Regla**: Si prospecto insiste pero hay fit → redirigir a capa más baja. Si no hay fit → ver `PROTOCOLO_REJECT.md`.

---

### Objeción 4 · "Preferimos hacerlo internamente"

**Respuesta contrarian**:
> *"Lo respeto, y te entiendo. Pero déjame advertirte de algo que hemos visto con clientes que intentaron lo mismo: sin un marco metodológico, el equipo interno termina construyendo muchas pequeñas automatizaciones que no se hablan entre sí · cada persona prueba distinto · y en 6 meses tienes un **zoológico** de AI sin coherencia, que nadie mantiene cuando alguien se va. **AI sin arquitectura = AI caótico**. Nosotros no te quitamos control — te damos un método para que el equipo construya coherente. Si igual quieres intentarlo solo, al menos considera nuestro Edu Empresarial ($10M) para que el equipo arranque bien. Mejor inversión que aprender a los golpes."*

---

### Objeción 5 · "Necesitamos un piloto / POC pequeño primero"

**Respuesta directa** (sin suavizar):
> *"No hacemos pilotos sin compromiso de ejecución — te lo digo directo. Aquí está la razón: los pilotos sin compromiso fracasan el 80% de las veces. No porque la tecnología no funcione, sino porque sin compromiso pleno del cliente, el equipo interno no adopta. Y cuando el piloto "no funciona", todos asumen que AI es el problema — cuando en realidad el problema fue la falta de commitment. Si quieres probar algo pequeño antes de pagar, te recomiendo: compra Claude Pro ($20/mes) y usa nuestros recursos gratuitos ([link metodología]). Si después de eso estás listo para algo serio, hablemos."*

---

### Objeción 6 · "Queremos ver casos de éxito de nuestra industria específica"

**Respuesta** (directa + contrarian):
> *"Entiendo, y te doy 2 respuestas. Primera: sí, tengo casos — [mencionar 2-3 casos cercanos de PROP_VALUE_IRRELEVANT.md]. Segunda y más importante: **el problema con pedir casos de tu industria específica es que asume que la ventaja viene de imitar** lo que otro en tu sector hizo. Pero si haces lo mismo que otra empresa de tu industria ya hizo, nunca vas a tener ventaja sobre ellos. Lo que nosotros hacemos es **distinto para cada cliente**, porque la ventaja viene de la particularidad. Los casos te dan confianza de que sabemos ejecutar — pero la solución para ti será tuya, no una copia."*

---

### Objeción 7 · "Claude va a cambiar mucho en 6 meses / vamos a esperar"

**Respuesta contrarian**:
> *"Eso es precisamente el argumento para **empezar ya**. Claude va a mejorar, sí · pero la gente que empezó a usarlo en 2023 ya está 3 años adelante en entender cómo piensa con AI. No es una tecnología estática que podés comprar cuando "esté lista" — es una capacidad que tu equipo construye. La empresa que empieza hoy entrena a su gente en mentalidad AI-first. En 12 meses, cuando Claude 5 llegue, tu equipo ya está listo para adoptarlo. La que esperó arranca de cero."*

---

### Objeción 8 · "¿Y si Anthropic / Claude desaparece?"

**Respuesta**:
> *"Buena pregunta · y responde mucho de cómo pensamos. Nosotros usamos Claude como **stack principal** porque es el más capaz para uso empresarial hoy. Pero el diseño de nuestras skills es **portable** — si mañana salta OpenAI con algo superior, migramos con esfuerzo moderado. Lo que NO es portable es el entendimiento del negocio del cliente + los procesos codificados + el sello metodológico. Eso es lo valioso. La tecnología es medio · el **sistema** que construimos es el activo."*

---

### Objeción 9 · "El equipo va a rechazar el cambio"

**Respuesta** (mueve al Edu Layer):
> *"100%. Y esa es la razón principal por la que nuestros proyectos Ops/Core **empiezan con Edu Empresarial**. Antes de tocar operación, capacitamos al equipo. No les enseñamos una herramienta — les cambiamos el mindset. Después del programa, el equipo **pide** más AI, no la resiste. Si empezamos por Ops sin Edu, tienes razón — el rechazo es probable. Por eso recomendamos combinar."*

---

### Objeción 10 · "¿Cómo se integra con nuestro [ERP/CRM/sistema]?"

**Respuesta** (redirigir a capacidad técnica):
> *"Cada cliente tiene stack distinto · parte de nuestro diseño es hacer el bridge. Concretamente: nuestro stack técnico incluye integraciones comunes con WhatsApp API, DIAN, Siigo, HubSpot, y APIs custom. Para el proyecto específico, durante Discovery + Fase 0 mapeamos exactamente qué integraciones se necesitan y cómo. Si tu sistema es raro o propietario, lo resolvemos — hemos trabajado con clientes enterprise que tienen stacks custom. No es el bloqueador que crees que es."*

---

### Objeción 11 · "¿Cuánto va a durar?"

**Respuesta clara** (depende de capa):
> Según capa:
> - **Edu Empresarial**: 4 semanas (mensual) o 1 semana (intensiva)
> - **Ops Layer**: 1 semana de setup
> - **Proyecto Custom**: 4-12 semanas según scope
> - **Core Layer**: 8-12 semanas de implementación + relación continua (mínimo 12 meses)
>
> *"Pero fíjate en el framing: no te vendemos duración · te vendemos **impacto**. Core Layer no termina — porque el producto es la relación permanente. Si buscas 'proyecto con fecha de fin definida que se cierra y se va', eso es Ops o Proyecto Custom, no Core."*

---

### Objeción 12 · "¿Por qué no usamos un SaaS enlatado tipo [X]?"

**Respuesta contrarian** (matadora):
> *"Porque si usas un SaaS enlatado, **estás usando el mismo producto que tu competidor**. La definición de commodity. Un SaaS es idéntico para todos los clientes — por diseño · así el proveedor escala. **Lo idéntico no genera ventaja competitiva**, nunca. Lo que nosotros hacemos es **distinto para ti**, porque está calibrado a tu operación específica. Ese es el insight completo: AI sin personalización es commodity. AI personalizado es ventaja."*

---

## STEP 3: Si la objeción no está en las 12 estándar

### Proceso:
1. Preguntar al usuario más contexto sobre la objeción
2. Identificar qué elemento del insight contrarian se puede invocar
3. Generar respuesta nueva usando el framework:
   - Reconocer la preocupación del prospect (no minimizar)
   - Reencuadrar desde el insight contrarian
   - Dar ejemplo concreto o redirección
   - Cerrar con pregunta o propuesta de siguiente paso

### Framework de respuesta contrarian

```
[Reconocimiento · 1 línea]
"Entiendo · [valida el punto del prospect]."

[Reencuadre contrarian · 2-3 líneas]
"Pero pensémoslo distinto · [insight que cambia el marco]."

[Evidencia o ejemplo · 1-2 líneas]
"[Caso / stat / principio de Roger Martin aplicado]."

[Propuesta concreta · 1 línea]
"Lo que yo haría en tu lugar es [X]. ¿Tiene sentido?"
```

---

## STEP 4: Documentar

Si la objeción era nueva (no en la lista de 12):

1. Guardar en `docs/objeciones_nuevas.md` (crear si no existe):
   ```markdown
   ## Objeción · [descripción] · [fecha]
   **Contexto**: [empresa, situación]
   **Frase textual del prospect**: [...]
   **Respuesta usada**: [...]
   **Resultado**: [cerró / no cerró / pendiente]
   ```

2. Mensualmente, estas objeciones se consolidan y las más comunes se añaden a la biblioteca estándar (actualizar este mismo SKILL.md).

---

## Reglas del skill

1. **Nunca negar al prospect**. Siempre reconocer primero.
2. **Usar el insight contrarian como brújula**. Cada respuesta debe tener un componente de reencuadre (no solo explicación).
3. **No inventar casos ni stats**. Solo usar los documentados en `PROP_VALUE_IRRELEVANT.md`.
4. **Si la objeción revela no-fit**, redirigir a `/evaluar-fit-cascade` o `PROTOCOLO_REJECT.md`.
5. **Documentar objeciones nuevas** para mejorar biblioteca.

---

## Output esperado

Al ejecutar el skill:
1. Usuario obtiene respuesta lista para copiar/adaptar (WhatsApp, email, live call)
2. Si era objeción nueva, queda documentada
3. Si revela no-fit, se recomienda ejecutar `/evaluar-fit-cascade`
