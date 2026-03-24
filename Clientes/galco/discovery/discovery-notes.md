# Discovery Notes — Galco

**Fecha:** 2026-03-24
**Tipo de call:** C2 — Discovery operativo (shadowing de procesos)
**Participantes:** Jorge (Comprador), Carolina (Contabilidad), Diego Saldarriaga (Dir. Operaciones), Equipo Irrelevant
**Nota:** La C1 no fue grabada. Estos son dos shadowing sessions donde Jorge y Carolina mostraron su día a día en vivo.

---

## 1. Datos Básicos

| Campo | Valor |
|-------|-------|
| **Empresa** | Galco |
| **Industria** | Metalmecánica |
| **Tamaño** | ~150-180 proveedores activos, planta de producción con almacén, múltiples áreas (compras, contabilidad, producción, mantenimiento) |
| **Contacto principal** | Diego Saldarriaga, Director de Operaciones |
| **Personas entrevistadas** | Jorge (Comprador, 14 años en la empresa), Carolina (Contabilidad) |
| **Sistemas actuales** | Excel ("la biblia"), SIGO (ERP local para OC/inventario/CxP), Ilimitada (software contable), Word Manager (gestión documental de facturas), SharePoint, Jenguar (producción) |

---

## 2. Dolores Identificados

### Dolor 1: Registro de compras 100% en Excel — copy/paste masivo

Jorge gestiona TODO el proceso de compras desde un Excel gigante que él llama "la biblia". Recibe requerimientos por correo (a veces en el cuerpo del email, ni siquiera en Excel), los copia a mano, agrupa por tipo de insumo, envía cotizaciones por correo, recibe respuestas, compara precios manualmente, y luego transcribe todo al sistema SIGO para generar órdenes de compra. Todo es copy/paste entre Excel y el sistema.

> **Cita textual:** *"Mi registro de compras, que este es como la biblia de todos los compradores, donde tenemos que registrar todo con el fin de poder hacer trazabilidad años atrás... de una manera, llamémoslo un poquito rudimentaria o arcaica."*

> **Cita textual:** *"Todo lo que yo hago es bajo un Excel."*

**Impacto:** Jorge maneja ~75+ ítems por ciclo de compra, cada uno requiere agrupación manual, envío de cotizaciones, comparación de precios, y transcripción al sistema. Todo esto es trabajo repetitivo que consume la mayor parte de su jornada.

---

### Dolor 2: Legalización de cajas menores y viáticos — completamente manual

Carolina identificó esto como su mayor dolor. Recibe recibitos físicos de caja menor (mensajero, recepción, viáticos de asesores), y tiene que crear un documento soporte para CADA uno en el sistema Ilimitada, uno por uno. No hay forma de carga masiva.

> **Cita textual:** *"Legalización de viáticos y cajas menores. Eso es lo que más me quita... de todo."*

> **Cita textual:** *"Son muchos recibitos pequeños que le dan a la niña de la recepción. El mensajero también tiene caja."*

> **Cita textual:** *"Todo lo que no sea electrónico, necesito documento soporte, todo eso tengo que hacerle documentos... esto es completamente manual."*

**Impacto:** Horas semanales en trabajo repetitivo de data entry. Cada recibo pequeño requiere un documento soporte completo en el sistema contable. No hay automatización posible dentro del sistema actual.

---

### Dolor 3: Calificación de proveedores — manual, cualitativa, y atrasada

Cada 6 meses Jorge debe calificar entre 150 y 180 proveedores. Lo hace de forma completamente cualitativa y manual: baja todas las facturas del período, las agrupa por proveedor, y califica de memoria basándose en cumplimiento, calidad, precio y servicio. Es tan tedioso que ya va atrasado (debía hacerlo en enero, ya está en marzo).

> **Cita textual:** *"Se califican aproximadamente entre 150 a 180 proveedores y todo eso se hace de memoria manual de una calificación cualitativa."*

> **Cita textual:** *"Me demoro haciendo calificación hasta una hora... calificando un proveedor... se duerme, no deja, baja el tinto, se la cara, las orejas."*

> **Cita textual:** *"Qué bueno poder... llegar al software de facturación y decir si la orden de compra fue generada en estos días y la fecha tentativa era para entregar en estos días, que el sistema diga, hombre, ese proveedor entregó con un cumplimiento."*

**Impacto:** ~1 hora por proveedor x 150-180 proveedores = potencialmente semanas de trabajo. Es tan tedioso que se atrasa, lo que significa que las decisiones de compra se toman sin data actualizada de desempeño.

---

### Dolor 4: Diligenciamiento de formularios de proveedores/clientes — repetitivo

Cada proveedor y cliente pide formularios de actualización de datos, solicitudes de crédito, etc. Jorge llena los mismos datos de Galco una y otra vez en formatos distintos (algunos de hasta 5-6 páginas). Lo hace en el computador porque su letra no es legible, pero es puro copy/paste de la misma información.

> **Cita textual:** *"Muy bueno que uno lo pudiera llenar como una base de datos donde sale todo lo de la empresa, si era autorretenedor, dirección, teléfonos, contactos."*

> **Cita textual:** *"Como si uno estuviera enviando fax, mete el formulario, hace sistemita y ya luego lo saca ya diligenciado. Eso sería una maravilla."*

> **Cita textual:** *"Porque cada empresa siempre pide lo mismo."*

**Impacto:** Tiempo perdido en llenar los mismos datos repetidamente. Se interrumpe constantemente mientras lo hace, lo que lo hace aún más ineficiente.

---

## 3. Oportunidad Principal

Galco es una empresa metalmecánica con operaciones complejas (compras, maquila, inventario, contabilidad) que **vive en Excel y procesos manuales**. Tienen sistemas (SIGO, Ilimitada, Word Manager) pero no están integrados entre sí, lo que genera un ecosistema de copy/paste constante entre herramientas.

La oportunidad es enorme porque:
- **Alto volumen de transacciones repetitivas** — 150-180 proveedores, 75+ ítems por ciclo, facturación constante
- **Personas clave con conocimiento tácito** — Jorge lleva 14 años, toda la inteligencia de compras está en su cabeza y en su Excel
- **Ya tienen dolor consciente** — Jorge mismo pidió automatizar la calificación de proveedores y el diligenciamiento de formularios
- **Ya compraron tecnología** — Word Manager es prueba de que están dispuestos a invertir en digitalización
- **Contacto es Director de Operaciones** — Diego Saldarriaga tiene visibilidad y poder de decisión sobre estos procesos

---

## 4. Servicio Recomendado

**AI Ops Layer** — con posibilidad de escalar a Core Layer después.

**Justificación:**
- Los dolores son claros y acotados: compras, contabilidad, calificación de proveedores, formularios
- No requieren un diagnóstico profundo (Fase 0) — el shadowing de hoy YA fue el diagnóstico
- Los procesos son repetitivos, basados en reglas, y con alto volumen — perfecto para Ops Layer
- El nivel de madurez tecnológica es bajo (Excel + sistemas legacy) — necesitan el setup primero antes de pensar en transformación
- Una vez vean resultados con Ops Layer, el Core Layer se vende solo para conectar compras con producción, inventario y toma de decisiones

**No Edu Layer porque:** No es un tema de capacitación. Carolina incluso ya usa ChatGPT para consultas tributarias. El problema es de procesos y herramientas, no de mentalidad.

---

## 5. Métricas de Impacto Potencial

| Métrica | Estimación |
|---------|-----------|
| **Horas semanales en registro de compras (Excel)** | ~15-20 hrs/semana (Jorge) |
| **Horas semanales en legalización de cajas menores** | ~8-10 hrs/semana (Carolina) |
| **Horas semestrales en calificación de proveedores** | ~150-180 hrs (~1 hr/proveedor) |
| **Horas mensuales en formularios de proveedores** | ~5-8 hrs/mes (Jorge) |
| **Procesos automatizables** | Agrupación de cotizaciones, comparación de precios, generación de OC, legalización de cajas menores, documentos soporte DIAN, calificación de proveedores, diligenciamiento de formularios |
| **Ahorro potencial estimado** | ~25-30 hrs/semana entre Jorge y Carolina |

---

## 6. Próximos Pasos Acordados

- Carolina enviará por WhatsApp las plantillas de carga de Ilimitada (facturación, creación de clientes, creación de proveedores)
- Carolina enviará ejemplo de paquete de legalización de viáticos (PDF)
- Carolina enviará ejemplo de caja menor
- El equipo Irrelevant preparará propuesta basándose en el shadowing

---

## 7. Señales

### Señales de compra
- **Ya invirtieron en tecnología:** Compraron Word Manager para gestión documental — hay precedente de inversión
- **Dolor consciente y verbalizado:** Jorge y Carolina expresaron frustración clara con los procesos manuales
- **Jorge pidió soluciones específicas:** La calificación automática de proveedores y el llenado de formularios los pidió él mismo
- **Decision maker presente:** Diego Saldarriaga (Dir. Operaciones) estuvo en la call y organizó el shadowing
- **Acceso a las entrañas:** Nos dejaron ver TODO — Excel, sistemas, procesos, correos. Confianza alta
- **Carolina mencionó que ya exploraron soluciones:** *"Estuvimos mirando un programa que decía que podía digitalizar e inclusive hacer el documento soporte"* — ya buscaron solución antes

### Red flags
- **Gerente general (Don Ignacio) no estuvo en la call** — habría que validar si él aprueba inversiones de este tipo
- **Sistemas legacy en servidor local (SIGO)** — la integración puede ser más compleja técnicamente
- **No se habló de presupuesto ni timeline** — falta abrir esa conversación
- **Servicio de interés aún no 100% definido** — hay que posicionar Ops Layer claramente en la siguiente interacción

---

## Siguiente paso sugerido

Basado en este discovery, recomiendo:
- **Servicio:** AI Ops Layer ($7.000.000 COP + IVA)
- **Acción inmediata:** Esperar las plantillas que Carolina va a enviar, revisar los formatos de Ilimitada y SIGO para entender qué se puede automatizar técnicamente, y preparar propuesta

**Siguiente skill:**
- `/disenar-skills galco` — Para definir los 5 procesos inteligentes específicos del Ops Layer
- `/cotizacion galco ops` — Para generar la cotización
- `/calcular-roi galco` — Para cuantificar el ahorro y presentar números concretos
