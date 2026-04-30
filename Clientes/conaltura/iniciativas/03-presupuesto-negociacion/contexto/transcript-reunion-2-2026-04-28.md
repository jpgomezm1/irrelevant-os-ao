# Acta · Reunión 2 — Propuesta Ops Layer · Conaltura (Presupuesto y Negociación)

**Fecha:** 2026-04-28
**Iniciativa:** Conaltura · 03-presupuesto-negociacion
**Tipo:** Follow-up / Presentación de propuesta
**Por Irrelevant:** Sara Garcés Tobón (lead), compañero técnico
**Por Conaltura:** Hernán (jefe del área, lideró la conversación), Kathe (Katherine — aportó contexto del flujo), Mari (presente, intervino poco). Natalia no asistió.

---

## 1. Contexto

Reunión post-Discovery (reunión 1 del 2026-04-21) donde Sara presentó la propuesta del Ops Layer: **8 habilidades de Claude + 1 agente conversacional + 1 matriz central**, organizada en 3 fases, basada en el dolor mapeado en el hackathon previo.

**Datos base de la operación actual:**
- 23 obras activas
- 173 cuadros comparativos / mes
- 400 correos / día (4 personas rotando para clasificarlos)
- ~370 horas/mes (15 días) gastados en cotizaciones, cuadros y coordinación con contratistas

---

## 2. Propuesta Presentada (resumen ejecutivo)

### Fase 1 · Quick wins
| Habilidad | Qué hace |
|---|---|
| **Comparador de cotizaciones** | Lee ZIP/PDF que llega al correo de gestión, normaliza valores, arma cuadro comparativo con condiciones técnicas, ranking y tareas. Reducción ~99% del tiempo manual |
| **Clasificador de correos** | Lee inbox compartido, asigna correos a responsables y los manda a la bandeja de cada uno |

### Fase 2 · Cimiento (matriz central)
| Habilidad | Qué hace |
|---|---|
| **Remapeo de códigos** | Lee guía vieja + guía nueva + ejemplos del equipo (Hernán tiene un remapeo parcial empezado por capítulo de gastos generales) y mapea capítulo por capítulo. Ejecución única |
| **Ingestor de presupuestos** | Carga P1, P2, P3 desde Excel a matriz central, normaliza con códigos remapeados |
| **Motor de tenores** | Aplica tenores de Hernán a actividades para calcular P2 sin depender de experto. Cálculo determinístico en segundos |
| **Simulador de indexación** | Recalcula impacto en contratistas cuando sube un costo (ej: salario +23%), muestra ejecutado vs falta por ejecutar |

### Desbloqueo Fase 2: las **23 obras serán comparables por primera vez** (capítulo X obra A vs B, P1/P2/P3 de cada obra, capítulos en últimos 3 años).

### Fase 3 · Inteligencia sobre la matriz
| Habilidad | Qué hace |
|---|---|
| **Monitor de desviaciones** | Vigila matriz en tiempo real, alertas cuando un valor sale del rango histórico (ej: arenilla pasa de 20.000 → 32.000) |
| **Agente conversacional** | Visión a futuro — recibe preguntas en lenguaje natural sobre la matriz ("¿cómo va este proyecto?", "¿por qué se desvió esto?") |

---

## 3. Reacción de Conaltura

- **Hernán** lo describió como "interesante, ambicioso" — reconoció que la propuesta sí refleja lo conversado en la reunión 1 y destacó como nuevo el concepto de matriz central consolidada + agente conversacional.
- **Hernán (cierre fuerte de reunión):** quedó convencido del impacto, al punto de mencionar que con esto se podría mejorar la compensación del equipo (no como reemplazo de personas, sino como liberación de tareas operativas para enfocarse en estrategia).
- Aceptación general de la visión. El equipo se ve cómodo con que la IA haga "el grueso" y ellos corrijan el 25% restante manualmente.

---

## 4. Tema crítico discutido — Presupuesto base vs proyectado

Hernán levantó un punto que **NO había quedado en la propuesta**:

- **Presupuesto base** = inmodificable, lo que la empresa apunta a ejecutar
- **Presupuesto proyectado** = realidad de obra, varía todo el tiempo (cambios de diseño, errores de presupuesto, indexación)
- **Ejemplo:** presupuesto dice 100 m², realidad es 120 m². Negocia 130. Contra presupuesto = pérdida de 30. Contra proyección = desfase real solo 10.

**Solución que propone Hernán:**
- Él entrega el **detallado** (5.000+ líneas a nivel insumo)
- Cada línea debe estar etiquetada por tipología de negocio
- IA filtra por mampostería/estructura/etc. y construye el **resumido**
- Trae dos columnas: `presupuesto` y `proyección`

**Pregunta técnica abierta:** ¿La IA es capaz de leer fórmulas de Excel (`=C11+...`) y replicarlas en archivos futuros sin que se las dicten manualmente? Sara confirma que sí pero quedó como punto a validar con ingeniería.

---

## 5. Decisiones Clave

1. ✅ **Avanzar a Fase 0** — Sara enviará documento detallado + cuestionario
2. ✅ **Construcción por capítulos** — remapeo se hace capítulo por capítulo, no todo de una
3. ✅ **Detallado → Resumido** — Hernán entrega detallado con etiquetas por tipología; IA arma el resumido
4. ✅ **Agregar al alcance:** comparativo `presupuesto base vs proyectado` (no estaba)
5. ✅ **Lo económico va a gerencia (piso 6)** — Hernán no decide precio final, lo escala a gerencia
6. ✅ **Empezar por lo que esté listo** — el motor de tenores requiere que Conaltura termine la guía; las skills listas se pueden arrancar antes

---

## 6. Action Items

| Responsable | Acción | Plazo |
|---|---|---|
| **Sara (Irrelevant)** | Enviar presentación de la reunión por correo | Inmediato |
| **Sara (Irrelevant)** | Enviar documento Fase 0 + cuestionario detallado | Esta semana |
| **Sara (Irrelevant)** | Agendar 3ra reunión (técnica con ingeniero o comercial con cotización) | Tras respuesta de Conaltura |
| **Sara (Irrelevant)** | Enviar cotización (cuando avancen) a gerencia · piso 6 | Post-Fase 0 |
| **Hernán (Conaltura)** | Responder cuestionario: ejemplos P1, P2, P3 reales | Tras recibir Fase 0 |
| **Hernán (Conaltura)** | Entregar guía vieja + guía nueva + ejemplo de remapeo parcial (que tiene Joan) | Tras recibir Fase 0 |
| **Hernán (Conaltura)** | Definir reglas de clasificación de correos, responsables, alertas | Tras recibir Fase 0 |
| **Conaltura (TI)** | Conversación técnica sobre conexión Claude ↔ correo / Sinco / Siigo | Cuando se confirme alcance |

---

## 7. Notas comerciales / pricing discutido

- Modelo Claude: pago a Anthropic mensual (100-200 USD según uso) + pago único a Irrelevant por implementación
- Costo por **tokens** (no por # usuarios) — no escala linealmente con personas
- **1 mes de soporte incluido** por habilidad post-go-live; soporte adicional = hora cobrada
- Costo de WhatsApp tiene tarifa; Telegram / Drive / correo no
- No se tocó precio explícito en esta reunión — eso va en la 3ra

---

## 8. Riesgos / Watch-outs

- ⚠️ El motor de tenores depende de que Conaltura termine la **guía nueva** y la **matriz de tenores cerrada** — si se atrasan, esa skill se atrasa
- ⚠️ El alcance del comparador presupuesto-base-vs-proyectado quedó **fuera de la propuesta original** — debe entrar en Fase 0 antes de cotizar
- ⚠️ Validación pendiente: alcance real de Claude leyendo fórmulas Excel anidadas (Sara dijo que sí, pero hay que verificar con ingeniería antes de comprometer)
- ⚠️ Decisor económico es gerencia (piso 6), no Hernán. Hernán es el champion técnico — hay que armarle el material para que pueda venderlo arriba sin tener que defender el alcance él solo

---

## 9. Próximo Paso

**Sara envía Fase 0 + cuestionario.** Con las respuestas, agenda 3ra reunión para presentar cotización (al equipo de Hernán + invitar al decisor de gerencia idealmente).
