# Template · Cohort B2C (por lanzamiento)

**Capa económica**: 1b · Cohort B2C por vertical
**Documento de producto**: `../../../Chief Learning Officer/PRODUCTOS/B2C_COHORTS/README.md`
**Primera cohort**: Sales AI · 1 junio 2026 · `../../../Chief Learning Officer/PRODUCTOS/B2C_COHORTS/cohorts/sales-ai-2026-06.md`

---

## Qué es este template

Template para gestionar **ventas / enrollments de cohorts B2C** por lanzamiento.

**Modelo comercial clave**: las cohorts funcionan por **lanzamiento** — no están disponibles todo el tiempo. Inscripciones abren ~4 semanas antes del arranque. Una vez llena o vencida la ventana, se cierra.

---

## Cohorts en roadmap

| Cohort | Vertical | Fecha arranque | Estado |
|---|---|---|---|
| **Sales AI** | Ventas (vendedores, BDRs, Account Managers) | **1 junio 2026** | En producción |
| Operations AI | Operaciones (ops managers, COOs SMB) | Q3 2026 (tentativo) | Diseño |
| Marketing AI | Marketing (marketers, content, brand) | Q4 2026 (tentativo) | Roadmap |

---

## Pricing · 3 tiers por lanzamiento

| Tier | Precio | Cuándo aplica |
|---|---|---|
| **Early bird** | USD $300 | Primeras 2 semanas de inscripción abierta |
| **Regular** | USD $350 | Desde semana 2 hasta 1 semana antes del launch |
| **Last minute** | USD $400 | Última semana antes del launch |

### Descuentos aplicables
- **Equipos de la misma empresa (≥3 personas)**: 10% off cada una
- **Referidos que convierten**: 15% off al que refiere
- **Alumnos de cohort anterior** que vuelven para otro vertical: 20% off

**No acumulables** (aplica solo el más grande).

---

## Qué incluye

- **4 clases en vivo** (1 por semana · 60-90 min · lunes 7pm COT)
- **≥8-10 horas de contenido pregrabado** evergreen
- **Acceso a comunidad privada** (Slack/Discord/WhatsApp · por determinar)
- **Biblioteca de prompts y skills** específica del vertical
- **Certificado de completación**
- **Acceso evergreen post-cohort** a la biblioteca (12 meses)

## Qué NO incluye

- **Cuenta Claude** (responsabilidad del alumno · se recomienda Claude Pro $20/mes)
- **Consultoría 1-a-1** (no hacemos sesiones individuales)
- **Implementación técnica** para la empresa del alumno (si la empresa quiere eso → Edu Empresarial o Ops Layer)

---

## Landing page · estructura estándar

Cada cohort tiene una landing propia. Estructura base:

### 1. Hero
- Título: "[Vertical] AI · Cohort [Mes Año]"
- Subtítulo: el problema que resuelve
- CTA principal: "Inscríbete antes del [fecha]"

### 2. Para quién
- Perfil específico del vertical (no genérico)
- "Si te identificas con [3-4 situaciones], este cohort es para ti"

### 3. Lo que vas a aprender
- 4 semanas · 4 temas centrales
- Outcomes concretos ("al terminar vas a poder X, Y, Z")

### 4. Formato
- 60% pregrabado + 30% live + 10% comunidad
- Compromiso de tiempo: 4-6 h/semana

### 5. Instructor
- JP (con breve bio + credenciales)
- Credibilidad: 32+ soluciones AI deployed, clientes como Bancolombia, Indemneasy, etc.

### 6. Metodología
- Mención del método `stayirrelevant.com/metodo`
- Sello pedagógico (papá de JP)
- "No es otro curso de AI — es AI aplicada a TU vertical"

### 7. Testimonios (cuando existan)
- Post cohort #1 · testimoniales de alumnos Sales AI
- Antes de cohort #1 · testimoniales de clientes B2B proyectos

### 8. Pricing
- Tier actual según fecha (con timer de early bird)
- FAQ: cancelación, certificado, formato

### 9. CTA final
- Botón de pago (Stripe/PayU)
- O formulario de lead capture si cohort aún no abierta

---

## Proceso de enrollment

```
1. Visitante llega a landing page (desde webinar, content orgánico, ads, referido)
2. Click en "Inscribirme" → flujo de pago
3. Pago confirmado → email automático con:
   a. Confirmación + acceso a comunidad
   b. Calendario de las 4 clases live
   c. Primeros 2 videos pregrabados (para arrancar antes del live)
4. 3 días antes del launch: email de preparación + link de primera clase
5. Durante el mes: CLO opera delivery (ver docs del CLO)
6. Post-cohort: NPS + testimonial request + upsell a cohort siguiente o B2B
```

---

## Skill para venta de cohorts

Para vender/enrollar cohorts usar skill (por crear):

```
/vender-cohort [cohort-id]
```

Ejemplos:
- `/vender-cohort sales-ai-2026-06`
- `/vender-cohort operations-ai-2026-q3`

El skill genera:
- Landing page template
- Email de confirmación post-pago
- Email de preparación 3 días antes
- Secuencia de emails durante el cohort
- Email de cierre + upsell

---

## Marketing de la cohort

### Pre-lanzamiento (4-6 semanas antes)
- **Sara (CMO)**: 10-15 vídeos específicos del vertical en TikTok + IG + LinkedIn
- **Webinar gratis** 2-3 semanas antes · "3 formas de usar AI para [vertical]"
- **Cross-promo** con clientes B2B del vertical (si aplica)
- **Email a lista warm** (ex-asistentes de webinar · alumnos de cohorts anteriores)

### Durante ventana de inscripción
- Content orgánico intensificado
- Early bird pricing urgente (primeras 2 semanas)
- Testimoniales cuando existan
- Cross-promo desde redes del equipo irrelevant (JP, Agustín, Nicolás también promocionan)

### Última semana
- Scarcity: "quedan X cupos" (si aplica)
- Last minute pricing
- Último webinar/live free para conversión final

---

## Upsell · Cohort → B2B

**Oportunidad estratégica clave** (ver [`../../docs/HANDOFF_CLO.md`](../../docs/HANDOFF_CLO.md) flujo D):

Cuando alumno de cohort B2C resulta ser **decisor en una empresa** que podría contratar irrelevant B2B:

1. **CLO detecta la señal** durante el cohort (conversaciones, preguntas)
2. **CLO alerta al CCO** con contexto del alumno
3. **CCO hace discovery B2B** específico
4. **CCO cierra** Edu Empresarial / Ops Layer / Core según fit

**Este flujo convierte cohorts de "producto B2C" a "funnel B2B premium"**. Métrica a trackear: % de alumnos de cohort que convierten a B2B en 90 días post.

---

## Cancelaciones

- **Antes del arranque del cohort**: reembolsable descontando 20% administrativo
- **Primera semana del cohort**: reembolsable al 50%
- **Después de primera semana**: no reembolsable

---

## Métricas a trackear por cohort

| Métrica | Target |
|---|---|
| Inscripciones totales | ≥15 (cohort #1 Sales AI) |
| Early bird ratio | ≥40% (buena señal de pipeline warm) |
| Show-up rate primera clase | ≥80% |
| Completion rate (todas las 4 clases live) | ≥70% |
| NPS final | ≥8/10 |
| Testimoniales en vídeo | ≥3 |
| Referidos generados a cohort siguiente | ≥5 |
| Conversiones a B2B (90 días post) | ≥1 |

---

## Archivos relacionados

- `../../Assets Fijos/PROP_VALUE_IRRELEVANT.md` — Sección 5 Capa 1b
- `../../docs/CASCADE_ALIGNMENT.md` — clasificación de Cohort B2C
- `../../docs/HANDOFF_CLO.md` — flujo CCO ↔ CLO
- `../../../Chief Learning Officer/PRODUCTOS/B2C_COHORTS/` — todo el protocolo del producto
- `../../../Chief Learning Officer/PRODUCTOS/B2C_COHORTS/TEMPLATE_COHORT.md` — template de currículo

---

## Anti-patterns (qué NO hacer)

- ❌ Vender cohort "siempre disponible" (se pierde urgencia · mata early bird)
- ❌ Bajar pricing por debajo de USD $300 (commodity)
- ❌ Aceptar inscripciones después del cierre (rompe dinámica)
- ❌ Ofrecer el cohort "a medida" a una sola persona (no es nuestro producto · pasarlo a Edu Empresarial)
- ❌ Permitir scope creep en comunidad (alumnos pidiendo consultoría 1-a-1 gratis)
