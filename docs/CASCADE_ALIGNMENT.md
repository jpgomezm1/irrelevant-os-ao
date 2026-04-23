# Cascade Alignment · CCO

**Propósito**: mapear explícitamente la oferta comercial del CCO con las **4 capas económicas** del Strategy Cascade (emergentes de Sesión 1 del CEO · 2026-04-22).
**Fuente de verdad**: [`PROP_VALUE_IRRELEVANT.md`](../Assets%20Fijos/PROP_VALUE_IRRELEVANT.md) + [`CEO/strategy/STRATEGY_CASCADE.md`](../../CEO/strategy/STRATEGY_CASCADE.md)
**Última actualización**: 2026-04-22

---

## Regla de oro

**Cada deal del pipeline debe poder clasificarse en exactamente una capa económica.**

Si un deal no cabe en ninguna capa → probablemente está fuera del Where to Play. Ver [`ICP.md`](ICP.md) + [`PROTOCOLO_REJECT.md`](PROTOCOLO_REJECT.md).

---

## Las 4 capas + 5 productos

```
┌────────────────────────────────────────────────────┐
│ CAPA 0 · Proyectos Custom (Badge)                  │
│ Rol económico: credibilidad                        │
│ ├─ Proyecto Custom ($5-15M setup)                  │
└────────────────────────────────────────────────────┘
                        ↓ alimenta
┌────────────────────────────────────────────────────┐
│ CAPA 1 · Edu                                       │
│ Rol económico: entrada · mindset shift             │
│ ├─ 1a · Edu Empresarial (Soteco-style) · ~$10M COP │
│ └─ 1b · Edu Cohorts B2C (por lanzamiento)          │
│         USD $300-400/persona                       │
└────────────────────────────────────────────────────┘
                        ↓ alimenta
┌────────────────────────────────────────────────────┐
│ CAPA 2 · Ops Layer                                 │
│ Rol económico: volumen · escalable                 │
│ ├─ AI Ops Setup · $7M COP (one-shot, sin retainer) │
└────────────────────────────────────────────────────┘
                        ↓ maduran a
┌────────────────────────────────────────────────────┐
│ CAPA 3 · Core Layer (Embedded AI Operator)         │
│ Rol económico: MRR premium · margen                │
│ ├─ AI Core · impact-based + retainer mensual       │
│     3-5 cuentas simultáneas MAX                    │
└────────────────────────────────────────────────────┘
```

---

## Clasificación por capa · detalle operativo

### CAPA 0 · Proyectos Custom (Badge)

| Campo | Valor |
|---|---|
| **Rol económico** | Credibilidad · badge · "construimos con AI, por eso enseñamos con autoridad" |
| **Pricing** | $5-15M COP setup · retainer de mantenimiento opcional |
| **Duración** | Variable · típicamente 4-12 semanas |
| **Capacidad** | MÁXIMO 2-3 proyectos/mes (limitado por # ingenieros) |
| **Templates CCO** | No hay template estándar (bespoke por proyecto · basado en `Templates/Contratos/AI Ops Layer/` + `Entregable Ejemplo/`) |
| **Skills relevantes** | `/discovery-ops` · `/disenar-solucion` · `/cotizacion` · `/contrato` |
| **Ejemplos** | Indemneasy · Fynder · Suki · Hotel Aramé · Cluvi · Grasshopper |
| **Target típico** | Empresa mid-market con necesidad técnica específica + budget + ventaja de construir vs. comprar |

**Cuándo clasificar aquí**:
- Cliente pide "constrúyanme [producto/sistema específico]"
- Hay ventaja defensible al construir custom vs. adoptar SaaS
- Proyecto genera propiedad intelectual (caso) que sirve como badge

**Cuándo NO clasificar aquí** (redirigir a Ops o Core):
- Cliente solo necesita "monten AI en mi operación" → Ops Layer
- Cliente quiere relación permanente + amplificación de value prop → Core Layer

---

### CAPA 1a · AI Edu Empresarial (Soteco-style)

| Campo | Valor |
|---|---|
| **Rol económico** | Entrada · mindset shift · capacity builder del cliente |
| **Pricing mensual** | ~$10M COP + IVA |
| **Pricing intensiva** | ~$8M COP + IVA |
| **Duración** | 4 semanas (mensual) · 1 semana (intensiva) |
| **Capacidad** | 4-8 programas/mes (alta) |
| **Templates CCO** | **`Templates/Comercial/Programa Edu Empresarial/`** (nuevo · reemplaza `Cotizacion Edu Layer`) |
| **Skills relevantes** | `/cotizacion` (con servicio: edu-empresarial) · `/discovery-ops` · `/contrato` |
| **Ejemplo de referencia** | Soteco (propuesta enviada 2026-04) |
| **Target típico** | Empresa mid-market que quiere que su equipo "pase de he oído de AI a operar AI-first" |

**Diferenciadores vs. workshop genérico**:
- Discovery previo con gerencia (45-60 min)
- Form a participantes (5-7 días antes del programa)
- Casos reales del cliente en ejercicios (no genéricos)
- Plan 30 días post-programa
- Sello pedagógico del papá de JP
- Máximo 10 personas por grupo

**Cuándo clasificar aquí**:
- Cliente es empresa (no individuo) · quiere capacitar a su equipo
- Budget ~$8-10M COP disponible
- Equipo de 3-10 personas
- Tiene Claude Pro Max (o dispuesto a adquirirlo)

**Cuándo NO clasificar aquí**:
- Cliente quiere "solo una charla de 2h" → no es nuestro producto (o pricing de charla diferente)
- Equipo >10 personas → requerimos negociar múltiples grupos
- Individuo único (no empresa) → redirigir a Cohort B2C

---

### CAPA 1b · AI Edu Cohorts (B2C por lanzamiento)

| Campo | Valor |
|---|---|
| **Rol económico** | Entrada B2C · escalable · genera biblioteca evergreen |
| **Pricing por persona** | Early bird USD $300 · Regular USD $350 · Last minute USD $400 |
| **Descuentos** | Equipos ≥3: 10% off · Referidos: 15% off al que refiere |
| **Duración** | 1 mes · 4 semanas |
| **Formato** | 60% pregrabado + 30% live + 10% comunidad |
| **Modelo comercial** | **Por lanzamiento** · no siempre disponible · fechas fijas anunciadas con 4-6 semanas de antelación |
| **Capacidad** | Escalable (digital) · ideal 15-50 inscritos por cohort |
| **Templates CCO** | **`Templates/Comercial/Cohort B2C/`** (nuevo) |
| **Skills relevantes** | `/vender-cohort` (nuevo) · landing automática |
| **Roadmap de cohorts** | Sales AI (1 jun 2026) · Operations AI (Q3) · Marketing AI (Q4) |

**Target típico**: profesionales individuales del vertical específico.
- Sales AI → vendedores, BDRs, Account Managers
- Operations AI → ops managers, COO de SMBs
- Marketing AI → marketers, content creators, brand managers

**Cuándo clasificar aquí**:
- Lead individual (no representando empresa)
- Pregunta por aprender AI aplicada a su vertical
- Dispuesto a pagar USD $300-400
- Dispuesto a comprometerse 1 mes

**Cuándo NO clasificar aquí**:
- Empresa pidiendo capacitar a 5+ personas → redirigir a Edu Empresarial (descuento equipos aplicable si ≥3)
- "Quiero aprender AI en general" → no es nuestro cohort (decline gentilmente · sugerir recursos externos)
- Pre-lanzamiento (cohort no abierta) → lead capture para cohort siguiente

---

### CAPA 2 · AI Ops Layer

| Campo | Valor |
|---|---|
| **Rol económico** | Volumen escalable · caja recurrente por ventas mensuales |
| **Pricing** | **$7.000.000 COP + IVA / $3.500 USD** |
| **Modelo comercial** | **One-shot · sin retainer** (decisión JP 2026-04-22) |
| **Duración** | 1 semana |
| **Capacidad** | Alta (escalable via Ops Associates cuando se capaciten) |
| **Templates CCO** | `Templates/Comercial/Cotizacion Ops Layer/` (existente) |
| **Skills relevantes** | `/cotizacion` (servicio: ops) · `/discovery-ops` · `/disenar-skills` · `/disenar-stack` · `/contrato` · `/entregable` |
| **Ejemplos** | Nivel · Marymount (prospectos) · muchos más potenciales |
| **Target típico** | Empresa mid-market que quiere automatizar un área específica con AI |

**Entregables**:
- Documento diagnóstico
- Motor de IA configurado
- Stack de herramientas
- 5 procesos inteligentes (skills)
- Sesión de entrenamiento
- Documentación

**Condiciones**: 50% anticipo + 50% entrega · vigencia 15 días.

**Cuándo clasificar aquí**:
- Cliente quiere "monten AI en [área específica]" de su operación
- Scope acotado (5 skills · 1 semana)
- Budget ~$7M COP disponible
- No busca relación permanente (si la busca → Core)

**Cuándo NO clasificar aquí**:
- Proyecto custom complejo con UX propio → Capa 0 Proyecto Custom
- Cliente quiere relación permanente de operación → Capa 3 Core
- Scope >5 skills o >1 semana → recotizar como proyecto ampliado

---

### CAPA 3 · AI Core Layer (Embedded AI Operator)

| Campo | Valor |
|---|---|
| **Rol económico** | **MRR premium · margen · pricing power** · el producto-corazón |
| **Pricing** | Basado en impacto · implementación inicial + **retainer mensual recurrente** |
| **Capacidad** | **MÁXIMO 3-5 cuentas simultáneas** (alto touch) |
| **Duración inicial** | 8-12 semanas de implementación · relación mínima 12 meses |
| **Templates CCO** | `Templates/Comercial/Fase 0 Core Layer/` · `Templates/Contratos/AI Core Layer/` (existentes) |
| **Skills relevantes** | `/disenar-solucion` · `/fase0` · `/kickoff` · `/weekly-update` · `/contrato` (core) |
| **Target típico** | Empresa que ya entiende AI · quiere amplificar su propuesta de valor · valora relación permanente |

**Proceso**: Discovery → Fase 0 (documento diagnóstico) → Implementación → **Embedded operation permanente** (retainer mensual).

**Cuándo clasificar aquí**:
- Cliente ya tiene AI-awareness (no hay que convencer de su valor)
- Busca **amplificar propuesta de valor de su negocio**, no solo optimizar
- Dispuesto a comprometerse mínimo 12 meses
- Valora relación permanente sobre proyecto puntual
- **Típicamente llega en PULL** (no hay que perseguirlo)

**Cuándo NO clasificar aquí**:
- Cliente quiere proyecto puntual → Capa 0 o Capa 2
- No está listo para retainer permanente → madurar primero con Ops o Edu
- Budget inconsistente con premium pricing → no forzar downgrade del producto

---

## Flow de cliente ideal · madura entre capas

```
  Lead entra
    │
    ▼
  ¿Es individuo? ────── SÍ ──── Cohort B2C (Capa 1b)
    │                              │
    NO                             └── Potencial retorno como decisor B2B en ~12 meses
    │
    ▼
  ¿Es empresa quiere capacitar equipo? ─── SÍ ─── Edu Empresarial (Capa 1a)
    │                                              │
    NO                                             └── Post-programa: upsell a Ops Layer
    │
    ▼
  ¿Necesita construcción custom específica? ─── SÍ ─── Proyecto Custom (Capa 0)
    │
    NO
    │
    ▼
  ¿Quiere automatizar operación específica? ─── SÍ ─── Ops Layer (Capa 2)
    │
    NO
    │
    ▼
  ¿Valora relación permanente + amplificar value prop? ─── SÍ ─── Core Layer (Capa 3)
    │
    NO
    │
    ▼
  No encaja en WTP → ver PROTOCOLO_REJECT.md
```

---

## Pricing matrix consolidada

| Capa | Producto | Pricing | Modelo |
|---|---|---|---|
| 0 | Proyecto Custom | $5-15M setup + retainer opc. | One-shot + retainer opcional |
| 1a | Edu Empresarial mensual | ~$10M COP | One-shot (anticipo 50%+50%) |
| 1a | Edu Empresarial intensiva | ~$8M COP | One-shot |
| 1b | Cohort B2C | USD $300-400/persona | Por lanzamiento |
| 2 | Ops Layer | $7M COP | One-shot (50%+50%) · **sin retainer** |
| 3 | Core Layer | Impact-based | Setup + **retainer mensual** |

---

## Métricas del pipeline por capa

**KPIs que el CCO debe trackear por capa**:

| KPI | Capa 0 | Capa 1a | Capa 1b | Capa 2 | Capa 3 |
|---|---|---|---|---|---|
| # Deals en pipeline | 3-5 | 2-4 | ~15 inscritos/cohort | 5-10 | 2-4 |
| Conversion rate | ~20% | ~30% | ~10% (trafico general) | ~25% | ~50% (pull) |
| Ciclo de venta | 60-90 días | 30-45 días | 2 semanas | 30-45 días | 90-120 días |
| Ticket promedio | $10M COP | $10M COP | USD $350 | $7M COP | $30M+ setup + $15M+/mes |
| % del revenue total | 25-30% | 15-20% | 10-15% | 20-25% | 30-40% (target) |

---

## Referencias cruzadas

- [`../Assets Fijos/PROP_VALUE_IRRELEVANT.md`](../Assets%20Fijos/PROP_VALUE_IRRELEVANT.md) — fuente de verdad
- [`ICP.md`](ICP.md) — a quién servimos y a quién NO
- [`PROTOCOLO_REJECT.md`](PROTOCOLO_REJECT.md) — cómo rechazar deals fuera del cascade
- [`../../CEO/strategy/STRATEGY_CASCADE.md`](../../CEO/strategy/STRATEGY_CASCADE.md) — el cascade maestro
- [`../../CEO/visualizations/07_economic_layers.html`](../../CEO/visualizations/07_economic_layers.html) — visualización de las 4 capas
