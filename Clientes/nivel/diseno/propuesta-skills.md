# Propuesta de Skills — Nivel

**Fecha:** 2026-04-18
**Framing comercial:** Los 5 skills internos se venden al cliente como **UN solo flujo integrado de compras** — no como 5 skills sueltos. El cliente ve un sistema end-to-end. Internamente son 5 habilidades encadenadas sobre Claude.

**Validación técnica:** Este diseño fue validado con JP (equipo técnico). Ver `contexto/transcript-2026-04-17.md` y la conversación con JP que mapea paso a paso del flujo de compras de Nivel.

---

## Contexto

Nivel opera sobre **Paco** (ERP inmobiliario colombiano) + **World Office** (contabilidad) + **HubSpot** (CRM) + **Sico** (ventas). El ciclo de compras atraviesa 10 etapas desde la requisición hasta la conciliación bancaria. De esas 10, **5 son automatizables** con Claude sin necesidad de API abierta de Paco (que no existe). Las otras 5 se quedan como están (manuales o ya automatizadas por Paco).

---

## Skill 1 — Solicitud automática de cotizaciones

**Categoría:** Compras / Procurement

**Problema:** Pedir cotizaciones a proveedores hoy es manual. Alguien del equipo arma el correo, busca contactos en una tabla, personaliza el mensaje, lo manda a 3+ proveedores, y hace seguimiento.

**Cómo funciona:**
1. Recibe la requisición (qué se necesita comprar, cantidades, plazo).
2. Lee la tabla de proveedores de Nivel y selecciona los relevantes según categoría del ítem.
3. Genera correos personalizados, los manda y organiza las respuestas entrantes en una carpeta dedicada al ciclo de compra.

**Impacto estimado:** 3-5 horas/semana del área de compras.

---

## Skill 2 — Cuadro comparativo con recomendación

**Categoría:** Compras / Procurement

**Problema:** Martin lo describió así: *"te traen tres proponentes, compáralos y escoge. Garantizar que el alcance de las cotizaciones sea lo mismo es difícil. Línea 17, este incluye, este no."*

**Cómo funciona:**
1. Recibe las N cotizaciones en la carpeta del ciclo.
2. Extrae ítems, cantidades, precios, plazos, condiciones de pago. Normaliza los alcances (qué incluye cada uno, qué no, qué es opcional).
3. Genera cuadro comparativo consolidado + recomendación razonada (*"Clemente gana por 30 días de crédito vs. 15 de Pergamino"*) con flagging de discrepancias línea por línea.

**Impacto estimado:** 2-4 horas por ciclo de compra.

---

## Skill 3 — Generador de orden de compra

**Categoría:** Compras / Procurement

**Problema:** Una vez elegido el proveedor, hay que redactar la OC, validar el alcance contra la cotización ganadora, y pasarla por revisión antes de cargarla a Paco.

**Cómo funciona:**
1. Toma la cotización ganadora + plantilla de OC de Nivel.
2. Genera el documento de OC con todos los campos poblados (ítems, precios, plazos, condiciones).
3. El usuario revisa, ajusta si necesario, y carga el documento a Paco manualmente (Paco no tiene API abierta — esta parte sigue siendo humana).

**Impacto estimado:** 15-30 minutos por orden de compra.

---

## Skill 4 — Causación contable con PUC

**Categoría:** Contabilidad

**Problema:** Cuando llega una factura, hay que decidir a qué cuenta contable se asocia. *"Café puede ser viáticos o gastos de representación."* La decisión depende del Plan Único de Cuentas (PUC) que cada empresa configura. Hoy es puramente cerebro del contable.

**Cómo funciona:**
1. Se carga el PUC de Nivel una sola vez como input de referencia.
2. Claude recibe la factura (XML o descripción del gasto) y propone la cuenta contable correcta con justificación.
3. El contable valida (humano en el loop) y lo registra en Paco. Si Paco habilitara API, esto se podría automatizar end-to-end; mientras tanto, el contable confirma.

**Impacto estimado:** 3-5 horas/semana del área contable.

---

## Skill 5 — Cronograma de pagos + archivo plano

**Categoría:** Tesorería / Finanzas

**Problema:** Priorizar qué pagar y cuándo contra el flujo de caja disponible es manual. Luego generar el archivo plano que Paco acepta para procesar pagos en lote también.

**Cómo funciona:**
1. Jala facturas pendientes con fechas de vencimiento + flujo de caja disponible del período.
2. Genera cronograma de pagos priorizado (*"hoy estas, mañana estas"*) respetando vencimientos y caja.
3. Produce el archivo plano en el formato que Paco acepta, listo para cargar (la carga la hace un humano).

**Impacto estimado:** 2-3 horas/semana de tesorería.

---

## Impacto agregado

| Métrica | Valor |
|---|---|
| Horas recuperadas/semana | ~10-17 horas (rango conservador) |
| Procesos automatizados | 5 (vendidos como 1 flujo integrado) |
| Ciclos de compra impactados | 100% |
| Áreas impactadas | Compras, Contabilidad, Tesorería |

---

## Lo que NO entra en el scope (transparencia para Martin)

| Etapa | Por qué no se automatiza |
|---|---|
| Requisición inicial | Input humano obligatorio (alguien detecta la necesidad) |
| Recepción de factura DIAN | Ya lo hace Paco automáticamente |
| Carga de documentos a Paco | Paco no tiene API abierta |
| Ejecución del pago en el banco | Sin conexión directa al banco |
| Conciliación bancaria | No automatizable estructuralmente (extractos no identifican pagador, pagos parciales, pagos desde cuentas personales) — se propone por separado en un segundo paquete |

---

## Decisión comercial

- **Vendido como:** Un solo flujo integrado (no 5 skills sueltos).
- **Precio:** $9.000.000 COP + IVA — incluye instalación, implementación (15 días), soporte, capacitación de uso al equipo.
- **Condiciones:** 50% anticipo + 50% contra entrega, vigencia 15 días.
