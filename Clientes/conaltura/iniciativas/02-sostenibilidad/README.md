# Iniciativa 02 — Sostenibilidad (Conaltura)

## Ficha de la Iniciativa
| Campo | Valor |
|-------|-------|
| **Área** | Sostenibilidad de Proyectos Inmobiliarios |
| **Interlocutor** | Daniel Perez (Director de Sostenibilidad de Proyectos Inmobiliarios) |
| **Referido por** | Claudia Garces (Fundadora — tía de Sara) |
| **Servicio propuesto** | Ops Layer (3 procesos delimitados) — por validar con equipo técnico |
| **Estado** | Discovery realizado — pendiente propuesta y cotización |
| **Temperatura** | 🔥🔥🔥🔥 Muy caliente |
| **Fecha de creación** | 2026-04-21 |
| **Próxima reunión** | **Martes 28 de abril 2026, 3:00 pm** — Sara trae propuesta + cotización |

## Alcance (3 procesos a automatizar)

1. **Ingestor de documentos** — agente lee fotos/PDFs de formatos de obra y certificados de RCDs → llena formularios de la plataforma automáticamente (agua, energía, huella, residuos).
2. **Monitor de trámites ambientales** — alertas configurables sobre vencimientos (reportes trimestrales RCDs, permisos forestal y de cauce, requerimientos de autoridad ambiental). Lectura automática de requerimientos con extracción de resumen + fecha máxima.
3. **Motor predictivo de consumos** — curva promedio por regional de proyectos terminados vs proyectos activos. Auto-recalcula al cerrar proyectos. Aplica a agua, energía, residuos y huella.

## Contexto técnico

- **Base de datos:** SQL propio (100% de Conaltura).
- **Visualización:** Power BI.
- **Documentación:** OneDrive con todas las obras (18 activas).
- **Integraciones existentes:** Sincosoft/CINCO → huella alcance 3.
- **Regionales:** Medellín, Bogotá, Cali, Barranquilla, Cartagena.
- **Proyectos de referencia:** terminados (Catalana, Foresta, Soley); activos (Livorno, Almendro).

## Historial
- 2026-04-21: Carpeta creada. Primera reunión con Daniel procesada. Discovery notes completas.

## Archivos
- `contexto/transcript-reunion-1.md` — Transcript crudo de la primera reunión (partes 1 y 2)
- `discovery/discovery-notes.md` — Brief estructurado (dolores, personas, próximos pasos)

## Próximos pasos
1. **Sara** analiza con equipo de ingenieros: Claude puro vs agente custom para cada módulo.
2. Preparar propuesta de los 3 procesos con paso a paso + cotización para el martes 28 abril 3:00 pm.
3. Validar que el NDA general de Conaltura cubra a Daniel antes del trabajo técnico.

## Decisión técnica pendiente
Dos caminos para la implementación:
- **Opción A:** 100% Claude (más barato, sin recurrencia de agente custom).
- **Opción B:** Agente custom Irrelevant (si la complejidad lo exige — OCR de certificados heterogéneos + motor predictivo podrían empujar hacia acá).
