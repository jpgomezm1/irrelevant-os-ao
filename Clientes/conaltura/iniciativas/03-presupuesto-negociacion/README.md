# Iniciativa 03 — Presupuesto y Negociación (Conaltura)

## Ficha de la Iniciativa
| Campo | Valor |
|-------|-------|
| **Área** | Dirección de Presupuesto y Negocios a nivel nacional (unificada hace ~8 meses) |
| **Interlocutores principales** | Hernán (Director), Kate (Coord. Negociaciones nacional), Natalia (Presupuestos Bogotá + Caribe), Mariana (Presupuestos Medellín) |
| **Apoyo técnico interno** | Nico (ya construyó interfaz para Claude en prototipo de cuadros comparativos) |
| **Sponsor** | Claudia Garces (Fundadora) |
| **Servicio probable** | Core Layer (por volumen y profundidad) o Ops Layer grande priorizado |
| **Estado** | Discovery realizado — pendiente propuesta y priorización |
| **Temperatura** | 🔥🔥🔥🔥🔥 Máxima |
| **Fecha de creación** | 2026-04-21 |
| **Próxima reunión** | **Martes 28 de abril 2026, 1:30 pm** — Sara trae propuesta aterrizada con priorización |

## Contexto de origen
Hackathon interno de Conaltura (~2 semanas antes) donde Kate presentó propuesta de automatización de cuadros comparativos (finalista). Claudia Garces conectó al área con Irrelevant para dar continuidad.

## Alcance — 9 módulos identificados

1. **Comparador de guías presupuestales** (vieja 10.756 líneas ↔ nueva 2.315 líneas, ~2.000 códigos).
2. **Ingestor de presupuestos P1/P2/P3** → matriz central + entregables por área.
3. **Motor de tenores** para cálculo de P2 por indicadores.
4. **Matriz histórica de precios con indexación automática** (23 obras, múltiples contratistas).
5. **Automatizador de cuadros comparativos** — continuar y formalizar el prototipo del hackathon.
6. **Agente conversacional sobre data** — "¿por qué bajó este presupuesto?"
7. **Monitor de desviaciones** con alertas e informes automáticos.
8. **Clasificador de correos** + bandejas personales (inbox `gest-compras@`: 200-400 correos/día, 4 personas).
9. **Consistencia adjudicación ↔ Cinco** (más organizacional que técnica).

## Contexto técnico

- **Sistemas:** Sigo (guía vieja, consultable) → Cinco/Sincosoft (actual).
- **Herramientas:** Excel (administración), Power BI (presentación), FDL propio para licitaciones.
- **Formatos entrantes:** cotizaciones en FDL y PDF heterogéneos.
- **Historia aprovechable:** 2-3 años bien documentados en la guía anterior (de 35 años de Conaltura).
- **Volumen:** 23 obras activas, 82-97 procesos de negociación, ~2.000 códigos, 200-400 correos diarios.

## Interdependencias (secuencia obligada)
- **#1 (comparador de guías)** bloquea a **#3 (ingestor)** y **#4 (tenores)**.
- **#5 (matriz de precios)** se alimenta de **#6 (cuadros comparativos)**.
- Quick wins sin bloqueo: **#6** (prototipo listo) y **#8** (Kate trabajándolo).

## Historial
- 2026-04-21: Carpeta creada. Primera reunión con Hernán, Kate, Naty (remota) y Mari procesada. Discovery notes completas.

## Archivos
- `contexto/transcript-reunion-1.md` — Transcript completo (3 partes)
- `discovery/discovery-notes.md` — Brief estructurado con los 9 módulos, personas, dolores, señales de compra

## Próximos pasos
1. **Sara** manda correo con recap de lo hablado.
2. **Conaltura** manda: presentación del hackathon (Kate) + cualquier paso a paso de procesos que tengan.
3. **Sara + equipo de ingenieros** validan qué se puede con Claude (rápido, 15 días) vs agente Irrelevant custom (profundo, 2 meses).
4. **Próxima reunión:** semana del 28 abril — Sara trae propuesta aterrizada con priorización recomendada (sin imponer, cliente decide).
5. **NDA:** validar cobertura para el equipo antes del trabajo técnico.
6. **TI:** formalizar acceso a Claude.

## Notas críticas
- **No imponer priorización en la propuesta** — presentar con racional, Hernán decide (conforme a la práctica de Sara: ordenar por impacto organizacional, no por quick-win técnico, y dejar que el cliente escoja).
- **Hay prototipo funcionando** (cuadros comparativos con Claude hecho por Nico) — el primer entregable natural es formalizarlo y escalarlo.
- **Riesgo organizacional** en #9: la inconsistencia adjudicación ↔ Cinco es más un tema de disciplina operativa que de IA.
