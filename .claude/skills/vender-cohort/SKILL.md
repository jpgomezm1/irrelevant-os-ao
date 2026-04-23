---
name: vender-cohort
description: >
  Gestiona el flujo comercial de venta / enrollment de Cohorts B2C por lanzamiento
  (Sales AI · Operations AI · Marketing AI). Genera landing, emails, tracking de inscripciones.
  Triggers: "vender cohort", "cohort", "enroll cohort", "sales ai cohort",
  "/vender-cohort". Usa /vender-cohort [cohort-id]
argument-hint: "[cohort-id · ej: sales-ai-2026-06]"
allowed-tools: [Read, Write, Glob, Grep, AskUserQuestion]
---

# Vender Cohort — Enrollment comercial de Cohorts B2C

Skill que gestiona el flujo comercial de **venta e inscripción de cohorts B2C por lanzamiento**. Coordina con CLO (que opera delivery) para que no haya doble contacto o inconsistencias.

**Modelo**: las cohorts funcionan por **lanzamiento** · no siempre disponibles.

---

## STEP 0: Leer referencias

1. `Templates/Comercial/Cohort B2C/README.md` — estructura del template
2. `docs/CASCADE_ALIGNMENT.md` sección Capa 1b — clasificación
3. `docs/HANDOFF_CLO.md` — cómo coordinar con CLO
4. `../Chief Learning Officer/PRODUCTOS/B2C_COHORTS/` — producto
5. `../Chief Learning Officer/PRODUCTOS/B2C_COHORTS/cohorts/[cohort-id].md` — ficha específica

---

## STEP 1: Identificar cohort

Si el usuario pasó argumento ($ARGUMENTS), usarlo como cohort-id. Si no:

> *"¿Para qué cohort? Opciones actuales:*
>   - *sales-ai-2026-06 · Sales AI · arranca 1 jun 2026*
>   - *operations-ai-2026-q3 · Operations AI · tentativo Q3*
>   - *marketing-ai-2026-q4 · Marketing AI · tentativo Q4*"

Leer ficha del cohort correspondiente en `Chief Learning Officer/PRODUCTOS/B2C_COHORTS/cohorts/[cohort-id].md`.

---

## STEP 2: Identificar tipo de acción

Preguntar al usuario:

> *"¿Qué necesitas hacer con este cohort?*
> *(a) Generar landing page*
> *(b) Enrollar un prospecto específico*
> *(c) Email de confirmación post-pago*
> *(d) Email de preparación 3 días antes de arranque*
> *(e) Tracking de inscripciones actuales*
> *(f) Upsell B2B post-cohort (alumno → su empresa)*"

---

## STEP 3A · Generar landing page

Generar HTML de landing page usando estructura estándar de `Templates/Comercial/Cohort B2C/README.md` sección "Landing page".

**Inputs a preguntar**:
- ¿Tier de pricing activo? (early bird / regular / last minute)
- ¿Hay casos de éxito anteriores? (para sección testimoniales · si primera cohort, omitir)
- ¿Hay webinar relacionado? (fecha · para cross-link)

**Output**:
- Archivo HTML en `Chief Learning Officer/PRODUCTOS/B2C_COHORTS/cohorts/[cohort-id]_landing.html`
- Listo para publicar en plataforma (Teachable / Kajabi / propia)

---

## STEP 3B · Enrollar prospecto específico

**Inputs**:
- Nombre del prospecto
- Email
- Empresa donde trabaja (si aplica · importante para flag de upsell futuro)
- Origen del lead (webinar / ads / referido / orgánico)
- Tier de pricing (según fecha de inscripción)

**Proceso**:
1. Registrar en `Chief Learning Officer/PRODUCTOS/B2C_COHORTS/cohorts/[cohort-id]_inscritos.md`:
   ```markdown
   ## [Nombre] · [Empresa] · [Fecha inscripción]
   - Email: [...]
   - Tier pagado: [early bird / regular / last minute]
   - Origen: [...]
   - Flag B2B potencial: [sí / no] · [notas si aplica]
   - Status pago: [confirmado / pendiente]
   ```

2. Generar email de bienvenida (ver STEP 3C).

3. Si hay flag B2B potencial (empresa mid-market encaja con ICP), **notificar al CCO** para seguimiento post-cohort (flujo D de `HANDOFF_CLO.md`).

---

## STEP 3C · Email de confirmación post-pago

**Template**:

```markdown
Asunto: ✅ Estás dentro · [Cohort Name] · [Fecha arranque]

Hola [Nombre]!

Confirmado · estás oficialmente dentro del **[Cohort Name]** que arranca el [fecha].

**Tus próximos pasos**:

1. **Únete a la comunidad** (Slack/Discord): [link]
2. **Agenda en tu calendario** las 4 clases en vivo:
   - Sesión 1: [fecha] · [hora]
   - Sesión 2: [fecha] · [hora]
   - Sesión 3: [fecha] · [hora]
   - Sesión 4: [fecha] · [hora]

3. **Empieza ya con los videos pregrabados**: [link a biblioteca]
   Te recomiendo ver C1.1 y C1.2 antes del arranque · te da contexto para la primera sesión en vivo.

4. **Prepara tu Claude Pro** (si no lo tienes aún): [link Anthropic · claude.ai]

**Qué esperar**:
- 4 semanas · mix de contenido pregrabado + live + retos semanales
- Mentalidad: AI aplicada a TU vertical · no AI general
- Al terminar: vas a operar con AI como palanca real, no como curiosidad

Cualquier pregunta · respóndeme este email.

Nos vemos en la clase 1.

[JP / Instructor]
```

Guardar en `Chief Learning Officer/PRODUCTOS/B2C_COHORTS/cohorts/[cohort-id]_emails/[nombre]_confirmacion.md`.

---

## STEP 3D · Email preparación 3 días antes

**Template**:

```markdown
Asunto: 🚀 [Cohort Name] arranca en 3 días · prepararse

Hola [Nombre]!

El [día de la semana] arranca oficialmente el cohort.

**Antes del lunes**:
- [ ] Activar Claude Pro (si no lo tienes)
- [ ] Consumir videos pregrabados C1.1 + C1.2 (link)
- [ ] Unirte a la comunidad [Slack/Discord] (link)
- [ ] Preparar 1 caso real de tu trabajo que quieras trabajar durante el cohort

**Primera clase**:
- Día/hora: [lunes X jun · 7pm COT]
- Link Zoom: [link]
- Duración: 75 min
- Preparación: nada adicional · solo estar listo con Claude Pro abierto

Nos vemos el lunes.

[JP]
```

---

## STEP 3E · Tracking de inscripciones actuales

Leer `Chief Learning Officer/PRODUCTOS/B2C_COHORTS/cohorts/[cohort-id]_inscritos.md` y generar resumen:

```markdown
# Tracking · [Cohort Name] · [Fecha reporte]

## Estado general
- Inscripciones totales: [X] / meta [Y]
- Revenue acumulado: USD $[...]
- Días al launch: [...]

## Distribución por tier
- Early bird: [X] · USD $[...]
- Regular: [Y] · USD $[...]
- Last minute: [Z] · USD $[...]

## Distribución por origen
- Webinar: [X]
- Content orgánico (Sara): [Y]
- Ads pagas: [Z]
- Referidos: [W]
- Otro: [...]

## Flags B2B potenciales (upsell futuro)
- [Nombre] · [Empresa] · [nota]

## Alertas
- [si va por debajo del target · qué hacer]
```

Guardar en `Chief Learning Officer/PRODUCTOS/B2C_COHORTS/cohorts/[cohort-id]_tracking.md`.

---

## STEP 3F · Upsell B2B post-cohort

Este es el flujo más estratégico — convertir alumno de cohort (B2C) a cliente B2B para su empresa.

**Proceso**:
1. Revisar `[cohort-id]_inscritos.md` por flags B2B potenciales
2. Para cada alumno con flag y completion ≥70% del cohort:
   a. CLO valida la señal (¿se comportó como posible decisor?)
   b. CLO alerta al CCO con contexto completo
3. CCO ejecuta `/evaluar-fit-cascade [empresa del alumno]`
4. Si encaja → contacto específico desde CCO:

**Email CCO al alumno**:
```markdown
Asunto: Felicitaciones completando [Cohort Name] · una pregunta

Hola [Nombre]!

Primero, felicitaciones por completar el cohort.

Te contacto por algo específico: noté durante el programa que [señal específica observada · ej. "preguntas que hacías apuntaban a implementación en tu empresa"]. Y probablemente ya lo estás pensando.

Si tu empresa está considerando traer AI de forma seria (no solo tú individual), tenemos un producto diseñado para eso · es un programa empresarial de 4 semanas donde capacitamos a todo el equipo y dejamos operación AI-first instalada. O si necesitan algo más profundo, Core Layer (embedded operator permanente).

¿Quieres agendar una llamada corta para explorarlo? Sin compromiso · solo para ver si hace sentido.

[Link cal.com]

Un abrazo,
[CCO / JP]
```

---

## Reglas del skill

1. **Siempre coordinar con CLO antes de prometer al cliente**. El CLO es dueño del delivery — no se debe prometer algo que no se puede entregar.
2. **Tier pricing depende de fecha**. Validar antes de cobrar · no dar early bird después de su ventana.
3. **Flag B2B es crítico**. No perder la oportunidad de upsell post-cohort.
4. **Documentar todo** en los archivos respectivos del cohort · para retro post-cohort.

---

## Output esperado

Según la acción elegida:
- Landing page HTML lista para publicar
- Email de bienvenida listo para enviar
- Alumno registrado en tracking
- Flag B2B capturado para CCO
- Dashboard de inscripciones actualizado
