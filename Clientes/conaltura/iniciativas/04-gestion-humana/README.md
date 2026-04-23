# Iniciativa 04 — Gestión Humana (Conaltura)

## Ficha de la Iniciativa
| Campo | Valor |
|-------|-------|
| **Área** | Gestión Humana |
| **Interlocutores** | Por definir (líder de Gestión Humana de Conaltura) |
| **Servicio propuesto** | Ops Layer con componente de visión por computadora (software puro — Conaltura aporta el hardware) |
| **Estado** | Brief inicial recibido — pendiente discovery |
| **Temperatura** | 🔥🔥 Tibia — hay intención pero falta alcance |
| **Fecha de creación** | 2026-04-22 |

## Alcance

El departamento de Gestión Humana pidió una solución para mejorar la disposición de residuos. La idea: una pantalla sobre las canecas que escanee la basura y le indique al usuario en qué caneca depositarla.

**División de responsabilidades:**
- **Conaltura** aporta el hardware (cámaras, pantallas, dispositivo de cómputo, canecas, instalación, conectividad)
- **Irrelevant** aporta la tecnología (modelo de visión por computadora, software de clasificación, dashboard de métricas, entrenamiento del modelo con datos reales)

Con esta división el proyecto encaja como **Ops Layer con componente de visión por computadora** — software puro del lado de Irrelevant.

## Historial
- 2026-04-22: Sara recibió el brief verbal del departamento de Gestión Humana. Carpeta de iniciativa creada.
- 2026-04-22: Confirmado que Conaltura pone el hardware. Irrelevant sólo aporta capa de IA + software.

## Archivos
- `contexto/brief-inicial.md` — Pedido textual + interpretación técnica + preguntas abiertas

## Próximos pasos
1. Agendar discovery con el líder de Gestión Humana para responder las 8 preguntas abiertas (ver `contexto/brief-inicial.md`)
2. Validar con el equipo técnico de Irrelevant el approach del modelo de visión: custom desde cero vs. API comercial (Google Vision, AWS Rekognition) vs. open-source fine-tuneado (YOLOv8)
3. Definir si el modelo corre on-device o en cloud según la conectividad de las obras
4. Diseñar propuesta de piloto (1–2 puntos de caneca) antes de cotizar rollout completo
5. Cotización: fee único (modelo entrenado + software + dashboard) + fee mensual (mantenimiento, infraestructura, reentrenamiento)
