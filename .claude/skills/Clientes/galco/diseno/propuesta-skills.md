# Procesos Inteligentes Recomendados para Galco

## Esto es lo que vamos a dejar funcionando

### 1. Registro Inteligente de Compras
**El problema:** *"Todo lo que yo hago es bajo un Excel"* — Jorge recibe requerimientos por correo en formatos distintos (PDF, Excel, texto plano en el cuerpo del email), los copia manualmente a su "biblia" de compras, agrupa por tipo de insumo, y luego transcribe todo al sistema SIGO. Es copy/paste puro entre 3 herramientas.

**Cómo funciona:** Jorge le pega los requerimientos que le llegan (en cualquier formato). El sistema los estructura automáticamente en el formato de su Excel de registro de compras: código, descripción, cantidad, unidad, proveedor sugerido, y los agrupa por tipo de insumo listos para enviar cotizaciones.

**Ejemplo:** "Hoy Jorge recibe un correo de mantenimiento con 15 ítems pegados en el cuerpo del email. Copia uno por uno a su Excel, los busca, los agrupa. Le toma ~45 minutos. Después, le pega el correo al sistema y en 30 segundos tiene todo estructurado, agrupado por proveedor, y listo para enviar las cotizaciones."

**Impacto estimado:** ~10-12 horas/semana recuperadas

---

### 2. Creador Masivo de Terceros (Clientes, Proveedores, Asesores)
**El problema:** *"Para yo manejar y para crear un cliente por esta planilla lo hago manual, pues porque es lo mismo, me toca lo mismo"* — Los asesores le pueden mandar 10 clientes nuevos en 10 minutos a Carolina, y ella tiene que crearlos uno por uno en Ilimitada. La plantilla de carga masiva existe pero es igual de manual — tiene que llenar cada campo a mano. Lo mismo pasa con proveedores nuevos que Jorge necesita dar de alta en SIGO.

**Cómo funciona:** Carolina o Jorge le pasan los datos del tercero nuevo (nombre, NIT/cédula, dirección, contacto, tipo) — ya sea en un correo, un mensaje de WhatsApp, o una lista. El sistema estructura todo en el formato exacto de la plantilla de carga de Ilimitada o SIGO, listo para subir. Si faltan datos obligatorios, los pide. Si llegan 10 clientes juntos, genera las 10 filas de una vez.

**Ejemplo:** "Hoy un asesor le manda a Carolina un correo con 8 clientes nuevos: nombre, cédula y teléfono. Carolina tiene que buscar el resto (dirección, tipo de contribuyente, régimen tributario), abrir Ilimitada, y crear cada uno manualmente — le toma fácil 1 hora. Con el sistema, pega el correo, el sistema estructura los 8 en la plantilla de carga, y Carolina solo sube el archivo. De 1 hora a 5 minutos."

**Impacto estimado:** ~5-8 horas/semana recuperadas

---

### 3. Legalizador de Cajas Menores y Viáticos (con PUC)
**El problema:** *"Legalización de viáticos y cajas menores. Eso es lo que más me quita... de todo"* — Carolina recibe recibitos físicos pequeños y tiene que crear un documento soporte individual para cada uno en Ilimitada. Para cada recibo tiene que identificar la cuenta contable correcta según el Plan Único de Cuentas (PUC) de Galco, aplicar retenciones si corresponde, y registrar todo manualmente. Uno por uno.

**Cómo funciona:** Se carga el PUC de Galco como referencia. Carolina le pasa el paquete de recibos (escaneados o en PDF). El sistema extrae los datos de cada recibo (proveedor, valor, concepto, fecha), lo cruza automáticamente contra el PUC para asignar la cuenta contable correcta (gasto de transporte → 513540, alimentación → 513525, etc.), calcula retenciones si aplica, y genera el archivo de carga listo para Ilimitada con toda la causación contable resuelta.

**Ejemplo:** "Hoy Carolina procesa 20 recibitos de caja menor en 3 horas: lee cada uno, decide la cuenta del PUC, calcula retención, crea documento soporte en Ilimitada. Con el sistema, escanea el paquete, el sistema lee cada recibo, lo clasifica contra el PUC de Galco, y genera todo listo para subir. De 3 horas a 15 minutos — y con la certeza de que la cuenta contable es la correcta."

**Impacto estimado:** ~6-8 horas/semana recuperadas

---

### 4. Comparador Inteligente de Cotizaciones
**El problema:** Jorge recibe cotizaciones de múltiples proveedores por email, las descarga, y compara precios manualmente en Excel ítem por ítem. Con 75+ ítems por ciclo de compra y múltiples proveedores por ítem, es un trabajo tedioso y propenso a errores.

**Cómo funciona:** Jorge carga las cotizaciones recibidas (PDF o Excel) y el sistema las lee, extrae precios por ítem, los compara contra precios históricos de la "biblia", identifica la mejor oferta por ítem, y genera una matriz de comparación con recomendación clara.

**Ejemplo:** "Hoy Jorge compara 4 cotizaciones de tornillería con 30 ítems cada una: abre 4 PDFs, copia precios al Excel, compara fila por fila. Le toma 1 hora. Con el sistema, carga los 4 PDFs y en 1 minuto tiene la matriz comparativa con la recomendación."

**Impacto estimado:** ~4-5 horas/semana recuperadas

---

### 5. Auto-llenador de Formularios de Proveedores/Clientes
**El problema:** *"Como si uno estuviera enviando fax, mete el formulario, hace sistemita y ya luego lo saca ya diligenciado. Eso sería una maravilla"* — Jorge llena los mismos datos de Galco repetidamente en formularios distintos de proveedores y clientes, algunos de 5-6 páginas.

**Cómo funciona:** Se carga una base de datos maestra con toda la información de Galco. Cuando llega un formulario nuevo, Jorge lo carga y el sistema identifica los campos, los matchea contra la base maestra, y genera el formulario diligenciado.

**Ejemplo:** "Hoy llega un formulario de actualización de datos de un proveedor de 6 páginas. Jorge lo llena campo por campo en 30 minutos. Con el sistema, carga el PDF y en 1 minuto tiene el formulario listo — solo verifica y firma."

**Impacto estimado:** ~4-6 horas/mes recuperadas

---

### 6. Generador de Facturas para Carga en Ilimitada
**El problema:** Producción genera remisiones en Jenguar (software de producción), pero como Jenguar e Ilimitada no están conectados, Carolina tiene que tomar cada remisión y copiar dato por dato — cliente, productos, cantidades, precios, IVA — para generar la factura en Ilimitada. Es puro copy/paste entre dos sistemas que no se hablan.

**Cómo funciona:** Carolina le pasa las remisiones de Jenguar (Excel o PDF). El sistema extrae los datos de cada remisión (cliente, ítems, cantidades, precios unitarios), los cruza contra el PUC de Galco para asignar las cuentas de ingreso correctas, calcula IVA y retenciones, y genera el archivo en el formato exacto de la plantilla de facturación de Ilimitada — listo para subir.

**Ejemplo:** "Hoy Carolina recibe 5 remisiones de producción en Excel. Abre cada una, copia cliente, productos, cantidades y precios a Ilimitada, calcula IVA, genera 5 facturas. Le toma fácil 1.5 horas. Con el sistema, carga las 5 remisiones, y en 3 minutos tiene el archivo de carga con las 5 facturas listas — solo verifica y sube."

**Impacto estimado:** ~5-8 horas/semana recuperadas

---

## Impacto Total

| Métrica | Valor |
|---------|-------|
| **Horas semanales recuperadas** | ~33-43 hrs/semana (Jorge ~15-18, Carolina ~18-25) |
| **Procesos que dejan de ser manuales** | Registro de compras, creación de terceros, legalización de cajas menores con causación contable, comparación de cotizaciones, diligenciamiento de formularios, facturación desde remisiones |
| **Tu equipo se enfoca en** | Jorge: negociación estratégica con proveedores, relaciones comerciales, decisiones de compra informadas. Carolina: análisis contable, control financiero, mejora de procesos — no data entry |
