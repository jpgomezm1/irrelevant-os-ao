# Stack Sugerido — Nivel (Flujo de Compras)

**Fecha:** 2026-04-18
**Nota:** El stack es **sugerido** — se valida y ajusta en la fase de implementación según lo que Nivel ya tenga desplegado.

---

## Tool 1 — Claude Desktop (Team o superior)

**Rol:** Motor de razonamiento y orquestación del flujo completo. Ejecuta las 5 habilidades encadenadas: redactar correos de cotización, comparar propuestas, generar OCs, clasificar gastos contra PUC, construir cronogramas de pago.

**Justificación:** Es el motor de IA al que Nivel ya está expuesto (Martin ya usa Claude personalmente). Consolidar sobre Claude evita fragmentación y simplifica la capacitación del equipo.

---

## Tool 2 — Claude Code

**Rol:** Infraestructura técnica para construir, desplegar y mantener las habilidades del flujo. Permite que Claude ejecute acciones sobre archivos, correos y documentos estructurados.

**Justificación:** Es la pieza que convierte a Claude de asistente conversacional a ejecutor de procesos reales. Sin Claude Code, no hay flujo automatizado — solo respuestas de chat.

---

## Tool 3 — Correo corporativo de Nivel (Outlook / Gmail)

**Rol:** Canal de salida para las solicitudes de cotización a proveedores y canal de entrada para las respuestas. Integración directa con Claude.

**Justificación:** Martin confirmó que las cotizaciones fluyen por correo. No introducimos un nuevo canal — usamos el que el proveedor ya conoce.

---

## Tool 4 — Google Drive / OneDrive (lo que use Nivel)

**Rol:** Storage de cotizaciones recibidas, órdenes de compra generadas, cronogramas de pagos, archivos planos.

**Justificación:** Los documentos generados por el flujo necesitan vivir en un lugar accesible para el equipo. Usamos lo que Nivel ya tiene — no introducimos una herramienta nueva.

---

## Tool 5 — PUC de Nivel (Plan Único de Cuentas)

**Rol:** Input de referencia para el skill de causación contable. Se carga una sola vez como contexto permanente.

**Justificación:** JP fue explícito: *"Claude necesita input. El input no puede ser el cerebro del operador, sino que nos compartan su PUC."* Sin PUC, Claude no puede clasificar gastos correctamente.

---

## Tool 6 — Paco (integración vía humano + archivo plano)

**Rol:** ERP existente donde se cargan las OCs, facturas y pagos. NO se integra por API (Paco no la tiene abierta). La interacción es:
- Claude genera documentos (OC, archivo plano de pagos)
- Un humano los carga a Paco

**Justificación:** Validado con JP: *"Paco no tiene API abierta, entonces toca hablar con yo no sé quién y decirle que nos habilite tal cosa. Eso no tiene sentido."* El humano-en-el-loop es una elección consciente, no una limitación del flujo.

---

## Costos de suscripciones (no incluidos en el fee de implementación)

- Claude Team / Enterprise — por definir según volumen de uso (Martin ya evalúa cuentas de Claude)
- Google Workspace / Microsoft 365 — Nivel ya lo tiene
- Storage — Nivel ya lo tiene

El fee de implementación de Irrelevant ($9M + IVA) **no incluye** las licencias de terceros. Esas las asume Nivel directamente.
