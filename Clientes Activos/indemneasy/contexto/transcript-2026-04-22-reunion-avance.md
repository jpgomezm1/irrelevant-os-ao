# Transcript procesado — Reunión de avance Indemneasy

## Metadata
- **Fecha:** 22 de abril de 2026
- **Duración estimada:** ~45–60 min
- **Tipo:** Reunión de seguimiento de producción — Core Layer (Irrelevant ↔ Indemneasy)
- **Cadencia:** Semanal (cambiada a jueves 10 AM desde la próxima)
- **Participantes:**
  - Sara Garces — Irrelevant, comercial / PM del cliente
  - Juan — Irrelevant, equipo técnico (lidera infra y deploy del agente)
  - Juanda — Indemneasy, decisor estratégico
  - Nicolás — Indemneasy, usuario activo haciendo pruebas
  - Simón — Indemneasy, presente, poca intervención
  - Ana — mencionada, no presente (reagendamiento)

## Resumen ejecutivo

Reunión semanal de avance del Core Layer. Irrelevant presentó: migración de infraestructura DigitalOcean → Google Cloud, soporte de notas de voz, mapeo de respuestas rápidas de WhatsApp, y trazabilidad del modelo. Se corrió prueba en vivo del agente con un caso de accidente de moto — respondió bien en la interfaz pero **no llegó a Telegram** (bug en corrección). Juanda levantó un request clave de scope: que el equipo pueda revisar y validar humanamente cada lead antes de que el agente dispare la generación automática de poder y contrato, por riesgo de firmar casos mal clasificados. El equipo aclaró que la clasificación la hace un programa Python determinístico (no el LLM) pero quedó abierto implementar una vista de resumen + validación. Se movió la reunión semanal a **jueves 10 AM** por conflicto de clase de Juanda.

## Temas discutidos

### 1. Migración de infraestructura a Google Cloud
- Antes: DigitalOcean, latencia >2 min, riesgo de caída.
- Ahora: Google Cloud — estabilidad, seguridad, escalamiento automático, costo variable por uso.
- Beneficio adicional: capas de seguridad de Google sumadas a las del modelo.
- **Estado:** cerrado, ya desplegado.

### 2. Procesamiento de notas de voz
- Se adaptó la infraestructura para reconocer audio.
- Se probó en vivo con un audio diciendo una dirección difícil de capturar.
- **Estado:** funcionando.

### 3. Respuestas rápidas de WhatsApp mapeadas
- El agente conoce y usa las respuestas rápidas internas del equipo de Indemneasy.
- **Estado:** cerrado.

### 4. Trazabilidad del modelo
- Registro de decisiones y razonamientos internos del agente.
- Permite debugging y validar estabilidad (diferenciar errores reproducibles de respuestas estables).
- **Estado:** implementado.

### 5. Bug Telegram
- El agente responde en la interfaz pero los mensajes no llegan a Telegram.
- Juan identificó el error en la call, despliega el fix hoy.
- **Estado:** abierto.

### 6. Versión desactualizada vs versión actual
- La versión que está probando el cliente es una anterior a la actual.
- La versión actual corrige:
  - Respuestas muy largas y redundantes → más concisas.
  - Repetición de preguntas.
  - Tono alineado con la atención al cliente de Indemneasy.
- **Estado:** abierto, deploy después de clase de Juan.

### 7. Limitación de fechas del modelo
- Corte de conocimiento del LLM en septiembre 2023 → genera confusión en fechas del accidente.
- Se está configurando explícitamente para que use fechas correctas.
- **Estado:** en corrección.

### 8. Metodología de pruebas: árbol de decisión
- Se mapean todos los flujos del agente como árbol de decisión.
- Pruebas unitarias caso por caso, rama por rama.
- Juan asigna internamente usuarios diversos (incluyendo "gente vieja") para cubrir diferentes estilos de conversación.
- **Estado:** infraestructura montada, ejecución pendiente.

### 9. Request Juanda: dashboard de validación humana de leads
- Ver sección de Decisiones y Citas.
- **Estado:** abierto, a evaluar.

### 10. Cambio de horario semanal
- De miércoles a jueves 10:00 AM.
- **Estado:** cerrado.

## Decisiones tomadas

- **Reunión semanal se mueve a jueves 10:00 AM** (propuesta Juan por su clase de miércoles, acordada con Juanda y Nicolás).
- **Juan despliega versión actualizada hoy** y avisa por grupo para que el cliente pruebe.
- **Equipo Irrelevant absorbe el testing caso por caso** — se le explicó al cliente que no es su responsabilidad mandar screenshots, aunque pueden seguir probando.
- **Queda abierto evaluar:** implementar vista de resumen + validación humana antes de la generación automática de poder/contrato.

## Insights clave para Irrelevant

### Dinámicas del cliente
- **Juanda = decisor estratégico.** Hace la pregunta de fondo (liability legal), no las operativas. Foco de influencia principal.
- **Nicolás = champion operativo.** Prueba activamente, reporta bugs concretos (fecha del accidente, pregunta sobre contrato).
- **Simón = stakeholder secundario.** Presente pero casi sin intervención — mantenerlo informado, no foco.

### Pain points y preocupaciones reveladas
- **Preocupación real sobre liability legal:** La firma automatizada del poder y contrato sin validación humana les preocupa por exposición legal. Cita textual: "estaríamos cometiendo un error muy grande... empecemos a firmar por ejemplo un montón de gente que por algún motivo no era".
- **Riesgo concreto identificado por Juanda:** El agente clasificó como "responsable identificado" solo con base en lo que dijo el cliente, cuando el informe policial podría decir otra cosa. Es un ejemplo real de por qué quieren override humano.

### Cultura y madurez
- **Madurez del cliente:** Juanda entiende el margen de error de los LLMs — no espera perfección. Piensa en riesgo legal, no en ingeniería. Conversar con él en términos de liability y cumplimiento, no técnicos.
- **Receptividad al proceso de iteración:** El cliente acepta que habrá errores las primeras semanas sin ansiedad. Es un activo — no perderlo. Seguir comunicando avances concretos cada semana.
- **Nivel de madurez tecnológica:** Medio. Entienden arquitectura a alto nivel pero no detalles (Juanda: "los beneficios operativos de integración, eso sí casi no lo entendemos"). Sara compensa traduciendo.
- **Adopción real:** Nicolás está usando activamente el agente y encontró bugs concretos — adopción temprana real, no pasiva.

### Oportunidades y riesgos

**Oportunidades:**
- Reforzar confianza con un camino claro para mitigar el riesgo de liability — esto convierte a Juanda en champion firme.
- El CRM Inteligente contratado podría ya contemplar parte de la vista de revisión — verificar y comunicar para bajar ansiedad.

**Riesgos / banderas rojas:**
- **Scope creep potencial:** La vista de resumen + validación humana puede no estar en el alcance de los 3 productos contratados (Agente de Ventas, CRM Inteligente, Agente Jurídico). Verificar antes de la próxima reunión.
- **Liability legal no mitigada:** Si no se da respuesta clara al request de Juanda, puede frenar la adopción final y el go-live de la automatización extremo a extremo.
- **Inestabilidad visible del agente:** Bug Telegram, versión desactualizada, respuestas largas — el cliente necesita ver la versión pulida pronto para mantener confianza.
- **Restricción de tiempo de Juanda:** Tiene clases (¿profesor? ¿estudiante de postgrado?) — la cadencia semanal depende de su disponibilidad.

## Citas textuales relevantes

> "Estaríamos cometiendo un error muy grande donde empiece, porque va a estar automatizada hasta la generación del poder y el contrato, entonces empecemos a firmar por ejemplo un montón de gente que por algún motivo no era." — **Juanda, Indemneasy**

> "¿Qué tan viable sea que esa inteligencia artificial... tenga una pre-clasificación sobre todos los casos y... uno tenga la posibilidad de entrar a alguna parte y revisar caso por caso... y que uno le tenga que dar aceptar o no para ver si puede que se equivoque?" — **Juanda, Indemneasy**

> "Aquí dijo que el responsable, pero fue a partir de lo que la persona dijo. Creo que si el informe policial será diferente." — **Juanda, Indemneasy**

> "Los beneficios operativos de integración, eso sí casi no lo entendemos." — **Juanda, Indemneasy**

> "No, súper claro, muchísimas gracias, todo súper bien, pues está más claro que nada." — **Juanda, Indemneasy** (cierre positivo)

> "Aquí nosotros no le damos como tanto permiso al modelo de tomar decisiones sino las decisiones importantes se hacen con Python y lo que interpreta o comunica esas decisiones lo hace el modelo." — **Juan, Irrelevant** (respuesta técnica al request de Juanda)

## Personas

### Juanda — Indemneasy
- **Rol:** Decisor estratégico
- **Aporte en la reunión:** Hace la pregunta de fondo sobre liability legal y propone el dashboard de validación humana
- **Relevancia para Irrelevant:** **Champion potencial si se maneja bien la ansiedad legal; blocker si no.** Foco principal de la relación.
- **Nota:** Tiene clases los miércoles (motivo del cambio de horario)

### Nicolás — Indemneasy
- **Rol:** Usuario operativo / tester activo
- **Aporte en la reunión:** Reporta bugs concretos, participa en la prueba en vivo
- **Relevancia para Irrelevant:** **Champion operativo.** Fuente de feedback técnico real. Mantenerlo involucrado en pruebas y darle visibilidad de fixes.

### Simón — Indemneasy
- **Rol:** Stakeholder observador
- **Aporte en la reunión:** Casi ninguno
- **Relevancia para Irrelevant:** Mantener informado vía documento semanal, no foco principal

### Juan — Irrelevant
- **Rol:** Lead técnico del proyecto
- **Aporte:** Presenta migración, arquitectura, fixes; propone cambio de horario
- **Nota:** Tiene clase los miércoles (su clase es lo que motiva el cambio de horario, aunque lo justificó para acomodar a Juanda también)

### Sara — Irrelevant
- **Rol:** Comercial / PM del cliente
- **Aporte:** Traduce lo técnico, maneja expectativas sobre el proceso de iteración, cierra acuerdos de horario

### Ana (mencionada, no presente)
- **Rol probable:** PM interna de Irrelevant — organiza y reagenda reuniones
- **Nota:** Juan asumió que ella ya había hablado con el cliente sobre el cambio de horario

## Preguntas que surgen

1. **¿El CRM Inteligente contratado ya contempla la vista de resumen + validación humana?**
   *Por qué importa:* Si sí, bajarle ansiedad a Juanda la próxima reunión comunicándolo. Si no, decidir si es scope MVP o fase 2 — define el alcance real de las 12 semanas.

2. **¿Hay riesgo regulatorio real en Colombia por firmar poderes con clasificación automatizada sin validación humana previa?**
   *Por qué importa:* Esto define si la vista de validación es "nice to have" o **obligatoria legalmente**. Si es obligatoria, cambia la prioridad del sprint.

3. **¿Cuál es el umbral de confianza aceptable antes de disparar la generación automática de poder/contrato?**
   *Por qué importa:* Puede existir un camino intermedio — auto-firma para casos de alta confianza, cola de revisión humana para borderline. Reduce carga operativa sin eliminar control.

4. **¿Cómo se maneja el caso donde el informe policial contradice lo dicho por el cliente en el intake?**
   *Por qué importa:* Es exactamente el escenario que preocupa a Juanda. Saber si hay un segundo checkpoint antes del poder nos permite responderle con seguridad.

5. **¿Qué es "la clase" de Juanda? ¿Es profesor o estudiante?**
   *Por qué importa:* Define su perfil relacional y señal de mentalidad. Útil para personalización de la relación a largo plazo.
