# Transcript — Jorge (Compras) | Galco
**Fecha:** 2026-03-24
**Duración:** ~1 hora
**Tipo:** Shadowing operativo C2
**Participantes:** Jorge (Comprador), Diego Saldarriaga, Equipo Irrelevant

---

## Resumen del Shadowing

Jorge mostró en vivo su jornada completa como comprador en Galco, una empresa metalmecánica. Lleva 14 años en la empresa.

### Flujo de trabajo diario de Jorge:

**1. Apertura del día — Correo + Excel (~7:00-8:00 AM)**
- Abre su "registro de compras" en Excel — lo llama "la biblia de todos los compradores"
- Solo él y su jefe tienen acceso de edición. Otros tienen acceso de consulta vía SharePoint
- Revisa correos desde el más viejo, priorizando pendientes

**2. Recepción de requerimientos**
- Le llegan por correo desde: almacén (PDF + Excel), mantenimiento (en el cuerpo del correo), proyectos (con planos)
- Los copia manualmente a su Excel de registro
- Problema: cada área envía en formato diferente, algunos ni en Excel
- Cita: *"Este muchacho no le gusta manejar en Excel, sino que me pega aquí en el cuerpo del correo, me toca llegar a mi y como no me respetan las celdas, ya aquí llega la carpintería"*
- Nada se compra sin autorización de Diego: *"Hasta que no llegue el correo de Diego yo no compro nada"*

**3. Agrupación y envío de cotizaciones**
- Agrupa los ~75+ ítems por tipo de insumo (tornillería, acero, EPP, etc.)
- Envía correo a proveedores conocidos de cada grupo
- Para maquila (80-100 referencias): ya tiene 2 proveedores fijos (Troima y Servitroqueles)
- Distribuye trabajo equitativamente según capacidad: Troima 80%, Servitroqueles 40%
- Cita: *"Lo que hago es hacer grupos por productos y les envío correo electrónico según esos productos que yo sé que se encuentran"*

**4. Comparación de cotizaciones y selección**
- Recibe cotizaciones, las descarga, compara precios manualmente en Excel
- Escoge la mejor oferta por ítem
- Para maquila ya tiene precios fijos/históricos
- Cita: *"Para mí ya el precio está, porque yo soy precio histórico"*

**5. Generación de órdenes de compra en SIGO**
- Transcribe del Excel al sistema SIGO (aplicativo local/remoto)
- Usa códigos de productos que ya se sabe de memoria
- Copy/paste de códigos para ahorrar tiempo en búsqueda
- Envía OC al proveedor por correo (copy/paste del PDF)
- Cita: *"Generalmente yo aquí no escribo nada, sino que voy acá, me paro en cualquier renglón, control C, control B"*

**6. Recepción e ingreso**
- Cuando llega el material, almacén recibe contra OC
- Se hace ingreso al inventario en SIGO
- Se genera cuenta por pagar al proveedor
- Word Manager captura facturas electrónicas automáticamente (bot lee XMLs del correo)
- Antes: imprimían todas las facturas. Ahora: digital vía Word Manager

**7. Certificados de calidad**
- Proveedores entregan certificados físicos
- Jorge los escanea con el celular, se los manda por WhatsApp, y los sube a la carpeta del proveedor
- Cita: *"Tengo unas tres bolsas así de puros certificados de calidad que los tengo que escanear"*

**8. Calificación de proveedores (cada 6 meses)**
- 150-180 proveedores a calificar
- Baja todas las facturas del período, agrupa por proveedor
- Califica cualitativamente: cumplimiento, calidad, precio, servicio
- ~1 hora por proveedor, completamente manual
- Ya va atrasado (debía ser en enero, estamos en marzo)
- Quiere automatizar usando fechas de OC vs fecha de entrega real
- Cita: *"Qué bueno poder llegar al software de facturación y decir si la orden de compra fue generada en estos días y la fecha tentativa era para entregar en estos días, que el sistema diga, ese proveedor entregó con un cumplimiento"*

**9. Formularios y actualización de datos**
- Llena formularios de proveedores/clientes repetidamente (mismos datos de Galco)
- Algunos de 5-6 páginas
- Lo hace digital porque su letra es difícil de leer
- Sueña con un sistema que auto-llene estos formularios
- Cita: *"Como si uno estuviera enviando fax, mete el formulario, hace sistemita y ya luego lo saca ya diligenciado. Eso sería una maravilla"*

**10. Base de datos de proveedores (Excel)**
- Mantiene un Excel con todos los proveedores, producto/servicio, estado (activo/inactivo), documentación
- Lo construyó él para que si él falta, alguien pueda operar
- Cita: *"La persona que llegue y mire, esta gente maneja hidráulica, esta gente maneja cero lubricantes"*

### Sistemas identificados:
- **Excel** — Para todo: registro de compras, precios, proveedores, calificaciones
- **SIGO** — ERP local para órdenes de compra, inventario, cuentas por pagar
- **Word Manager** — Gestión documental de facturas (tiene bot que lee XMLs)
- **SharePoint** — Almacenamiento de archivos compartidos
- **Correo electrónico** — Canal principal de comunicación con proveedores

### Contexto adicional:
- Don Ignacio es el gerente general
- La empresa tiene almacén, producción (metalmecánica), mantenimiento, compras, contabilidad
- Trabajan con maquila: compran materia prima, la dan a talleres externos, reciben piezas terminadas
- Confidencialidad importante: solo 2 proveedores de maquila tienen los planos
- Jorge viene de Centroaceros (3 años) y Terrorportes (1 año) — siempre en metalmecánica
