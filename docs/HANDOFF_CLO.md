# Handoff CCO ↔ CLO · Lead Matrix

**Propósito**: definir cómo se asignan leads entre CCO (comercial general) y CLO (Academy · B2B Edu Empresarial + B2C Cohorts).
**Última actualización**: 2026-04-22

---

## El problema que resuelve este documento

Con el refactor post-cascade, algunos productos (Edu Empresarial + Cohorts B2C) tienen **doble ownership**:
- **CCO**: prospecta · califica · cierra ventas
- **CLO**: diseña producto · opera delivery · gestiona cohorts

**Sin matriz clara**, los leads caen en grietas ("¿quién responde este email del prospecto de cohort?") o se duplica esfuerzo.

---

## Matriz de ownership por capa

| Capa | Producto | CCO (comercial) | CLO (producto/delivery) |
|---|---|---|---|
| 0 | Proyecto Custom | ✅ Dueño venta | - (aplica CTO) |
| 1a | Edu Empresarial | ✅ Dueño venta | ✅ Dueño delivery + diseño programa custom |
| 1b | Cohort B2C | ✅ Dueño venta | ✅ Dueño delivery + producto |
| 2 | Ops Layer | ✅ Dueño venta | - |
| 3 | Core Layer | ✅ Dueño venta | - (aplica CTO + Head of Accounts) |

---

## Flujos de lead

### Flujo A · Lead entra como B2B Edu Empresarial

```
1. Lead entra al CCO (outbound, referido, web, etc.)
2. CCO hace discovery inicial (skill /discovery-ops)
3. CCO clasifica capa (skill /evaluar-fit-cascade)
4. Si capa = 1a (Edu Empresarial):
   a. CCO hace cotización (skill /cotizacion servicio:edu-empresarial)
   b. CCO cierra · firma · recibe anticipo
   c. HANDOFF al CLO para ejecución:
      - CLO diseña programa custom basado en Discovery
      - CLO coordina con papá para sello pedagógico
      - CLO ejecuta Form a participantes
      - CLO entrega programa
   d. Head Of Accounts toma cuenta para 30 días post-programa
```

### Flujo B · Lead entra como B2C Cohort (individuo)

```
1. Lead entra (webinar · landing · contenido orgánico · referido)
2. Si hay cohort activa abierta:
   a. CCO/CLO coordina enrollment (skill /vender-cohort)
   b. CLO opera delivery del cohort
3. Si NO hay cohort activa:
   a. Lead capture en email list
   b. Notificar cuando abra siguiente lanzamiento
```

### Flujo C · Lead entra pidiendo "curso de AI" (ambiguo)

```
1. CCO en discovery identifica:
   a. ¿Individuo o empresa?
   b. ¿Vertical específico o "AI general"?
2. Si es empresa con equipo → redirigir a Edu Empresarial (CCO + CLO)
3. Si es individuo con vertical específico + hay cohort abierta → Cohort B2C (CCO + CLO)
4. Si es individuo pero "AI general" → rechazar (ver PROTOCOLO_REJECT.md)
```

### Flujo D · Prospecto entró por cohort, luego quiere algo para su empresa

```
1. Alumno de cohort B2C contacta pidiendo algo para su empresa
2. CLO alerta al CCO con contexto (quién es, qué pide, cuál fue su experiencia en el cohort)
3. CCO hace discovery específico B2B (skill /discovery-ops)
4. CCO clasifica en Edu Empresarial / Ops / Core según fit
5. CCO cierra · flujo normal
```

Este flujo D es **estratégico**: cohort B2C **funciona como funnel B2B** cuando el alumno trae a irrelevant a su empresa.

---

## Comunicación CCO ↔ CLO

### Handoff formal
Cuando cierra un deal Edu Empresarial (Capa 1a), el CCO **comparte al CLO**:

1. **Ficha del cliente** · `CCO/Clientes/[slug]/README.md`
2. **Discovery notes completas** · `CCO/Clientes/[slug]/discovery/`
3. **Cotización firmada** · términos acordados
4. **Contexto especial** · cualquier acuerdo que no quede en la cotización (ej. "aceptamos facilitar grabación porque tienen equipo remoto")

### Canales de comunicación
- **Espacio comercial lunes + miércoles** (ritual del Board): se revisan deals de Edu Empresarial + Cohorts en pipeline conjunto.
- **WhatsApp ad-hoc**: para preguntas puntuales rápidas.
- **Pipeline dashboard** (`pipeline-dashboard`): CLO puede ver estado de deals B2B que eventualmente le tocarán.

---

## Overlaps productivos vs. overlaps tóxicos

### Overlaps productivos (esperados · buenos)
- **Feasibility consult**: CLO revisa pre-cotización si scope de Edu Empresarial tiene complejidad (ej. equipo distribuido, industria única).
- **Material de venta**: CLO produce material (slides pedagógicos, videos de muestra) que CCO usa en pitch.
- **Casos de éxito**: post-cohort o post-programa, CLO produce testimonial que CCO usa.
- **Feedback loop**: CCO comparte objeciones comunes de prospects → CLO ajusta producto.

### Overlaps tóxicos (a evitar)
- **Doble contacto al cliente**: CCO y CLO llegando al mismo cliente por caminos distintos sin coordinar.
- **Pricing inconsistente**: CLO promete algo en demo que CCO contradice en propuesta.
- **Scope creep no gestionado**: cliente pide "un extra" al CLO y el CLO lo acepta sin CCO aprobando re-cotización.

**Regla**: **CCO es dueño único del pricing y scope**. CLO entrega. Si cliente pide más, **CLO redirige a CCO** inmediatamente.

---

## Métricas conjuntas

| Métrica | CCO mide | CLO mide |
|---|---|---|
| # deals Edu Empresarial cerrados/mes | ✅ | - |
| # programas Edu Empresarial ejecutados/mes | - | ✅ |
| NPS post-programa | ✅ (feedback) | ✅ (dueño del programa) |
| # cohort inscripciones | ✅ (ventas) | ✅ (capacidad) |
| Tasa conversión webinar → cohort | - | ✅ |
| % upsell Cohort B2C → B2B empresa | ✅ (ventas upsell) | ✅ (señal de que producto funciona) |

---

## Referencias

- [`CASCADE_ALIGNMENT.md`](CASCADE_ALIGNMENT.md) — clasificación por capa
- [`../../Chief Learning Officer/CLAUDE.md`](../../Chief%20Learning%20Officer/CLAUDE.md) — scope del CLO
- [`../../Chief Learning Officer/PRODUCTOS/B2B_CAPACITACIONES/README.md`](../../Chief%20Learning%20Officer/PRODUCTOS/B2B_CAPACITACIONES/README.md)
- [`../../Chief Learning Officer/PRODUCTOS/B2C_COHORTS/README.md`](../../Chief%20Learning%20Officer/PRODUCTOS/B2C_COHORTS/README.md)
