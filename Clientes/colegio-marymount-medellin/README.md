# Colegio Marymount Medellín

## Ficha del Cliente
| Campo | Valor |
|-------|-------|
| **Empresa** | Colegio Marymount Medellín |
| **Industria** | Educación |
| **Contacto** | María Luisa Muñoz, Gerente Administrativa |
| **Servicio interesado** | Ops Layer (pivot desde Core Layer) |
| **Cómo llegó** | Outbound |
| **Fecha de creación** | 2026-04-14 |
| **Comercial** | Sara Garcés |
| **Estado** | Propuesta Ops Layer final ($12M COP + IVA, flujo Loggro Enterprise + Claude) lista para mandar. Loggro confirmado por audio de María Luisa el 2026-04-20. |

## Historial
- 2026-04-10: Discovery call con María Luisa Muñoz (45 min)
- 2026-04-14: Carpeta creada + procesamiento de discovery call
- 2026-04-16: Pivot a Ops Layer (setup de Claude, no agentes custom) — propuesta inicial
- 2026-04-16: Reunión de propuesta (2:00 PM) — María Luisa recibe bien la propuesta, pide ajustes en el flujo de facturas (ruteo por centro de costo, 2 firmas, causación automática en Loggro). Compromiso: sacar presupuesto ($12M no estaba) + validación técnica pendiente
- 2026-04-18: Investigación técnica API Loggro (100% nube, REST en `developer.loggro.com`, Bearer JWT). Documento + slides actualizados: 5 pasos, firmas precargadas, causación vía API. WhatsApp a María Luisa con 3 preguntas de confirmación
- 2026-04-20: Audio de María Luisa confirma las 3 preguntas — Loggro en la nube, tienen PUC, usan Loggro Enterprise. María Luisa añade lógica: al causar, revisar el histórico de cómo se causó la misma factura antes y replicar la misma cuenta. Documento + slides actualizados a fecha final 20 de abril (vigencia 15 días) y con el refuerzo de causación por histórico.

## Próximos pasos

1. Mandar propuesta final a María Luisa (documento + slides).
2. Si confirma presupuesto: pasar a `/contrato colegio-marymount-medellin ops`.

## Archivos
- `contexto/transcript-2026-04-10.md` — Transcript crudo del discovery
- `contexto/transcript-2026-04-16.md` — Transcript de la reunión de propuesta (con fragmento clave del proceso de facturas + Loggro según María Luisa)
- `discovery/discovery-brief-2026-04-10.md` — Brief estructurado con dolores, oportunidad y próximos pasos
- `diseno/solucion.md` — Propuesta de solución original Core Layer (4 componentes) — referencia
- `diseno/spec-solucion.md` — Spec técnico original Core Layer — referencia
- `diseno/slides-propuesta-marymount.html` — **Slides propuesta Ops Layer** (versión final 2026-04-20)
- `fase0/propuesta-ops-marymount.html` — **Documento propuesta Ops Layer** (versión final 2026-04-20, $12M)
- `comercial/whatsapp-2026-04-18-maria-luisa.md` — WhatsApp enviado con las 3 preguntas técnicas
- `contexto/audio-2026-04-20-maria-luisa-loggro.md` — Audio de María Luisa confirmando Loggro Enterprise + aporte sobre causación por histórico
