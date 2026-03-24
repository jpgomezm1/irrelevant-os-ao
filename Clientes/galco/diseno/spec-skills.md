# Spec Técnico: Skills para Galco
## Basado en "The Complete Guide to Building Skills for Claude"

## Resumen de Matching con Showcase

| # | Skill | Fuente | Match |
|---|-------|--------|-------|
| 1 | registro-compras | Showcase Combo 01 #01 + Combo 09 #57 | Adaptado (nuevo workflow) |
| 2 | creador-terceros | **Nuevo** | Nuevo — se agrega al showcase (Combo 04) |
| 3 | legalizador-cajas-menores | **Nuevo** (mejorado con PUC) | Nuevo — se agrega al showcase (Combo 04) |
| 4 | comparador-cotizaciones | Showcase Combo 02 #10 | Adaptado (especializado metalmecánica) |
| 5 | auto-llenador-formularios | **Nuevo** | Nuevo — se agrega al showcase (Combo 09) |
| 6 | generador-facturas | Showcase Combo 04 #22 | Adaptado (remisiones Jenguar → plantilla Ilimitada con PUC) |

Skills nuevos agregados al showcase: 4 (Combos 04 y 09)

---

## Skill 1: registro-compras

### Frontmatter
```yaml
---
name: registro-compras
description: >
  Estructura requerimientos de compra desde cualquier formato (email, PDF, Excel)
  al formato del registro de compras de Galco. Use when "registrar compra",
  "procesar requerimiento", "nuevo pedido", "agregar al registro".
  Lee inputs en cualquier formato, agrupa por tipo de insumo, sugiere proveedor.
argument-hint: "[pegar requerimiento o ruta al archivo]"
allowed-tools: ["Read", "Write", "Glob", "Grep", "Bash"]
---
```

### Categoría Anthropic
**Workflow Automation** — Proceso multi-paso con validación: recibe input desestructurado → estructura → agrupa → sugiere proveedores → genera output para Excel y SIGO.

### Arquitectura
- **Level 1 (YAML):** Triggers, descripción, tools necesarios
- **Level 2 (SKILL.md):** Instrucciones de parseo multi-formato, reglas de agrupación por tipo de insumo (tornillería, acero, EPP, maquila, etc.), formato del Excel de Jorge, formato de códigos SIGO
- **Level 3 (references/):**
  - `catalogo-proveedores.md` — Base de proveedores de Galco con especialidad
  - `codigos-sigo.md` — Códigos de productos más usados en SIGO
  - `template-registro.md` — Estructura exacta del Excel "biblia" de Jorge

### Tools y MCPs
- **Built-in tools:** Read, Write, Glob, Grep, Bash
- **MCPs necesarios:** Ninguno en fase inicial. Futuro: MCP para leer correo de Outlook
- **Hooks:** No aplica
- **Subagents:** No aplica

### Workflow
1. Recibir input (texto pegado, PDF, o Excel)
2. Parsear e identificar ítems: descripción, cantidad, unidad, urgencia, área solicitante
3. Buscar en catálogo de proveedores de Galco para sugerir proveedor por ítem
4. Agrupar por tipo de insumo (tornillería, acero, EPP, maquila, químicos, etc.)
5. Generar output en formato del Excel de registro de Jorge
6. Generar borrador de correos de cotización por grupo de proveedor

### Input / Output
- **Input:** Requerimientos de compra en cualquier formato (texto, PDF, Excel)
- **Output:** Registro estructurado (formato Excel de Jorge) + Borradores de correo para cotización agrupados por proveedor

### Complejidad
**Media** — El parseo multi-formato es el desafío principal. La agrupación y matching de proveedores requiere una buena base de datos de referencia.

---

## Skill 2: creador-terceros

### Frontmatter
```yaml
---
name: creador-terceros
description: >
  Genera archivos de carga masiva de terceros (clientes, proveedores, asesores)
  para Ilimitada y SIGO. Use when "crear cliente", "crear proveedor", "nuevo tercero",
  "dar de alta", "registrar cliente", "subir clientes".
  Recibe datos en cualquier formato y genera plantilla lista para subir.
argument-hint: "[pegar datos del tercero o ruta al archivo]"
allowed-tools: ["Read", "Write", "Bash", "Glob", "Grep"]
---
```

### Categoría Anthropic
**Workflow Automation** — Proceso multi-paso: recibe datos desestructurados → valida campos obligatorios → completa datos faltantes (régimen tributario, tipo contribuyente por NIT/CC) → genera plantilla de carga para el sistema destino.

### Arquitectura
- **Level 1 (YAML):** Triggers, descripción, tools
- **Level 2 (SKILL.md):** Campos obligatorios por tipo de tercero (cliente vs proveedor vs asesor), reglas de validación (NIT con dígito verificación, formato de CC, teléfonos), lógica de inferencia (si es NIT → persona jurídica, si es CC → persona natural), categorías tributarias
- **Level 3 (references/):**
  - `plantilla-clientes-ilimitada.md` — Estructura exacta de la plantilla de carga de clientes de Ilimitada
  - `plantilla-proveedores-ilimitada.md` — Estructura exacta de la plantilla de carga de proveedores
  - `plantilla-terceros-sigo.md` — Estructura de terceros en SIGO
  - `campos-tributarios.md` — Reglas de régimen tributario, tipo contribuyente, responsabilidades fiscales
  - `ciudades-dane.md` — Códigos DANE de ciudades (requerido por Ilimitada/DIAN)

### Tools y MCPs
- **Built-in tools:** Read, Write, Bash, Glob, Grep
- **MCPs necesarios:** Ninguno en fase inicial. Futuro: WebSearch para validar NIT en RUES/DIAN
- **Hooks:** No aplica
- **Subagents:** No aplica

### Workflow
1. Recibir datos de tercero(s) (texto, correo, Excel, lista de WhatsApp)
2. Parsear e identificar: nombre/razón social, NIT/CC, dirección, teléfono, email, ciudad
3. Clasificar tipo: cliente, proveedor, o asesor
4. Inferir campos faltantes:
   - NIT → persona jurídica, régimen: responsable de IVA (por defecto)
   - CC → persona natural, verificar si es gran contribuyente o autorretenedor
   - Ciudad → código DANE
5. Validar campos obligatorios — si faltan, listar cuáles y preguntar
6. Generar archivo en formato de plantilla de carga del sistema destino (Ilimitada o SIGO)
7. Si son múltiples terceros, generar batch (todas las filas en un solo archivo)
8. Generar resumen: # terceros creados, campos inferidos, campos que requieren verificación

### Input / Output
- **Input:** Datos de terceros en cualquier formato (correo, WhatsApp, Excel, texto)
- **Output:** Plantilla de carga lista para Ilimitada/SIGO (CSV/Excel) + Resumen con alertas de datos faltantes

### Complejidad
**Media** — La inferencia de campos tributarios es el punto más delicado (régimen tributario, responsabilidades fiscales). Requiere las plantillas reales de Ilimitada que Carolina va a enviar para mapear exactamente los campos.

---

## Skill 3: legalizador-cajas-menores

### Frontmatter
```yaml
---
name: legalizador-cajas-menores
description: >
  Procesa recibos de caja menor y viáticos, extrae datos, cruza contra el PUC de Galco
  para asignar cuenta contable, y genera documentos soporte para Ilimitada.
  Use when "legalizar caja menor", "procesar viáticos", "documentos soporte",
  "legalizar recibos", "caja menor".
  Lee PDFs/imágenes, clasifica con PUC, genera batch listo para subir.
argument-hint: "[ruta a carpeta de recibos o PDF consolidado]"
allowed-tools: ["Read", "Write", "Bash", "Glob"]
---
```

### Categoría Anthropic
**Workflow Automation** — Proceso multi-paso con lógica contable: extracción de recibos → clasificación contra PUC → cálculo de retenciones → generación de documentos soporte → batch de carga.

### Arquitectura
- **Level 1 (YAML):** Triggers, descripción, tools
- **Level 2 (SKILL.md):** Formato de documento soporte DIAN, campos requeridos por Ilimitada, lógica de clasificación contable, reglas de retenciones, workflow de validación
- **Level 3 (references/):**
  - `puc-galco.md` — **Plan Único de Cuentas de Galco** con las cuentas que usa Carolina en el día a día. Mapeo de conceptos comunes a cuentas:
    - Transporte urbano → 513540 (Gastos de transporte)
    - Alimentación → 513525 (Gastos de alimentación)
    - Papelería → 519530 (Útiles, papelería)
    - Peajes → 513545 (Gastos de peajes)
    - Parqueaderos → 513595 (Otros gastos de viaje)
    - Combustible → 513550 (Combustible y lubricantes)
    - Hospedaje → 513520 (Gastos de alojamiento)
    - Aseo/cafetería → 519525 (Aseo y cafetería)
    - etc.
  - `template-doc-soporte.md` — Formato exacto del documento soporte de Ilimitada
  - `plantilla-carga-ilimitada.md` — Estructura de la plantilla de carga masiva con columnas contables
  - `reglas-retenciones.md` — Tabla de retenciones por tipo de gasto y monto (ReteFuente, ReteICA, ReteIVA), bases mínimas, tarifas vigentes
  - `terceros-frecuentes-caja.md` — Terceros recurrentes en cajas menores (taxi, restaurante, papelería) con NIT ya mapeado

### Tools y MCPs
- **Built-in tools:** Read, Write, Bash, Glob
- **MCPs necesarios:** Ninguno
- **Hooks:** No aplica
- **Subagents:** No aplica

### Workflow
1. Cargar PUC de Galco (referencia, se lee una vez y se mantiene en contexto)
2. Recibir paquete de recibos (PDF o imágenes escaneadas)
3. Para cada recibo, extraer: proveedor/establecimiento, NIT (si visible), valor, concepto, fecha
4. **Cruce con PUC:** Clasificar concepto del gasto → asignar cuenta contable del PUC de Galco
   - "Taxi" / "Uber" → 513540 Gastos de transporte
   - "Restaurante" / "almuerzo" → 513525 Alimentación
   - "Papelería" → 519530 Útiles y papelería
   - Si el concepto es ambiguo → marcar para revisión de Carolina
5. **Cálculo de retenciones:** Si el monto supera la base mínima, calcular retenciones aplicables
6. Generar documento soporte DIAN para cada recibo (los que no son factura electrónica)
7. Consolidar en plantilla de carga de Ilimitada con:
   - Cuenta débito (gasto según PUC)
   - Cuenta crédito (caja menor: 111005 o banco según caso)
   - Tercero
   - Valor base + retenciones si aplica
   - Concepto
8. Generar resumen: total legalizado, # documentos, desglose por cuenta contable, items que requieren revisión manual

### Input / Output
- **Input:** PDFs/imágenes de recibos de caja menor o paquete de viáticos + PUC de Galco (referencia)
- **Output:** Archivo de carga para Ilimitada con causación contable completa (CSV/Excel) + Resumen con desglose por cuenta PUC + Lista de ítems que requieren revisión

### Complejidad
**Alta** — La extracción de datos de recibos escaneados puede ser imprecisa. El cruce con PUC requiere mapeo preciso (esto se calibra con Carolina las primeras semanas). Las retenciones agregan una capa de lógica tributaria. Requiere validación humana especialmente al inicio. Depende de las plantillas de Ilimitada que Carolina va a enviar.

---

## Skill 4: comparador-cotizaciones

### Frontmatter
```yaml
---
name: comparador-cotizaciones
description: >
  Compara cotizaciones de múltiples proveedores, identifica mejor precio por ítem
  y genera matriz de decisión. Use when "comparar cotizaciones", "cuál proveedor
  es mejor", "comparar precios", "evaluar ofertas".
  Soporta PDF y Excel de proveedores.
argument-hint: "[rutas a cotizaciones de proveedores]"
allowed-tools: ["Read", "Write", "Bash", "Glob"]
---
```

### Categoría Anthropic
**Workflow Automation** — Multi-paso: extracción → normalización → comparación → recomendación.

### Arquitectura
- **Level 1 (YAML):** Triggers, descripción, tools
- **Level 2 (SKILL.md):** Criterios de comparación, reglas de alerta, formato de matriz
- **Level 3 (references/):**
  - `precios-historicos.md` — Precios de referencia por ítem
  - `proveedores-preferidos.md` — Lista de proveedores con prioridad

### Tools y MCPs
- **Built-in tools:** Read, Write, Bash, Glob
- **MCPs necesarios:** Ninguno
- **Hooks:** No aplica
- **Subagents:** No aplica

### Workflow
1. Cargar 2-5 cotizaciones (PDF o Excel)
2. Extraer datos por ítem: descripción, cantidad, precio unitario, precio total, plazo
3. Normalizar ítems entre cotizaciones
4. Comparar precios contra histórico
5. Generar matriz de comparación con mejor precio destacado + alertas
6. Generar recomendación: proveedor ganador por grupo
7. Calcular ahorro estimado vs opción más cara

### Input / Output
- **Input:** PDFs/Excel de cotizaciones + (opcional) precios históricos
- **Output:** Matriz comparativa Excel + Recomendación con ahorro estimado

### Complejidad
**Media** — Extracción de PDFs de proveedores es variable. Normalización de descripciones requiere inteligencia semántica.

---

## Skill 5: auto-llenador-formularios

### Frontmatter
```yaml
---
name: auto-llenador-formularios
description: >
  Llena automáticamente formularios de proveedores y clientes con datos de Galco.
  Use when "llenar formulario", "formulario de proveedor", "actualización de datos",
  "solicitud de crédito", "registro de proveedor".
  Lee el formulario en blanco y lo devuelve diligenciado.
argument-hint: "[ruta al formulario en blanco]"
allowed-tools: ["Read", "Write", "Bash", "Glob"]
---
```

### Categoría Anthropic
**Document & Asset Creation** — Genera documentos completados a partir de template + base maestra.

### Arquitectura
- **Level 1 (YAML):** Triggers, descripción, tools
- **Level 2 (SKILL.md):** Instrucciones de identificación de campos, mapeo de campos comunes, reglas de formato
- **Level 3 (references/):**
  - `datos-maestros-galco.md` — TODA la información de Galco
  - `campos-comunes.md` — Mapeo de sinónimos de campos entre formularios

### Tools y MCPs
- **Built-in tools:** Read, Write, Bash, Glob
- **MCPs necesarios:** Ninguno
- **Hooks:** No aplica
- **Subagents:** No aplica

### Workflow
1. Cargar formulario en blanco (PDF, Word, o imagen)
2. Identificar campos a llenar
3. Buscar datos en base maestra de Galco
4. Llenar cada campo
5. Campos no encontrados → preguntar al usuario
6. Generar formulario diligenciado
7. Resaltar campos que requieren acción manual (firma, etc.)

### Input / Output
- **Input:** Formulario en blanco (PDF/Word/imagen)
- **Output:** Formulario diligenciado + Lista de campos que requieren acción manual

### Complejidad
**Baja-Media** — Matching de campos es simple. Mantener base maestra actualizada es lo importante.

---

## Skill 6: generador-facturas

### Frontmatter
```yaml
---
name: generador-facturas
description: >
  Transforma remisiones de producción (Jenguar) en archivos de carga de facturas
  para Ilimitada. Use when "facturar", "generar factura", "remisiones de producción",
  "factura de venta", "subir facturas".
  Lee remisiones, cruza con PUC, calcula IVA/retenciones, genera plantilla de carga.
argument-hint: "[ruta a remisiones de Jenguar]"
allowed-tools: ["Read", "Write", "Bash", "Glob"]
---
```

### Categoría Anthropic
**Workflow Automation** — Proceso multi-paso con lógica contable: extracción de remisiones → mapeo de productos a cuentas de ingreso (PUC) → cálculo de IVA y retenciones → generación de plantilla de carga de facturas.

### Arquitectura
- **Level 1 (YAML):** Triggers, descripción, tools
- **Level 2 (SKILL.md):** Formato de factura electrónica Colombia, campos requeridos por Ilimitada, lógica de IVA (19%, exento, excluido), retenciones en la fuente por tipo de producto, resolución de facturación vigente de Galco
- **Level 3 (references/):**
  - `puc-galco.md` — PUC con cuentas de ingreso (4135xx ventas, etc.) — **compartido con legalizador-cajas-menores**
  - `plantilla-facturacion-ilimitada.md` — Estructura exacta de la plantilla de carga de facturas (Carolina la va a enviar)
  - `catalogo-productos-galco.md` — Productos/servicios que vende Galco con código, descripción, precio estándar, cuenta contable, tarifa IVA
  - `resolucion-facturacion.md` — Resolución DIAN vigente (rango de numeración, prefijo, fecha de vigencia)
  - `reglas-retenciones.md` — Retenciones aplicables en ventas — **compartido con legalizador**
  - `clientes-frecuentes.md` — Clientes recurrentes con NIT, dirección, régimen tributario ya mapeado

### Tools y MCPs
- **Built-in tools:** Read, Write, Bash, Glob
- **MCPs necesarios:** Ninguno (Ilimitada corre on-premise, la integración es vía plantilla de carga)
- **Hooks:** No aplica
- **Subagents:** No aplica

### Workflow
1. Cargar PUC de Galco y catálogo de productos (referencias, se leen una vez)
2. Recibir remisiones de Jenguar (Excel o PDF — una o varias)
3. Para cada remisión, extraer:
   - Cliente (nombre, NIT)
   - Ítems (descripción, cantidad, precio unitario)
   - Número de remisión (para trazabilidad)
   - Fecha
4. **Validar cliente:** ¿Existe en Ilimitada? Si no → avisar que hay que crearlo primero (enlace con skill creador-terceros)
5. **Cruce con PUC:** Asignar cuenta de ingreso por producto
   - Producto metalmecánico → 413536 (Fabricación productos metálicos) o la cuenta que use Galco
   - Servicio de maquila → 413595 (Otros ingresos operacionales)
6. **Calcular impuestos:**
   - IVA: 19% (o exento/excluido según producto)
   - ReteFuente: según régimen del cliente y tipo de producto
   - ReteICA: según municipio
7. Generar línea(s) de factura con:
   - Cuenta débito (CxC cliente: 130505)
   - Cuenta crédito (ingreso según PUC)
   - IVA (240804)
   - Retenciones si aplica
   - Valor base, IVA, retención, neto
8. Consolidar todas las facturas en formato de plantilla de carga de Ilimitada
9. Generar resumen: # facturas, total facturado, desglose por cliente, alertas (clientes no creados, productos sin cuenta asignada)

### Input / Output
- **Input:** Remisiones de Jenguar (Excel/PDF) + PUC de Galco (referencia)
- **Output:** Archivo de carga de facturas para Ilimitada (CSV/Excel) con causación contable completa + Resumen con totales y alertas

### Complejidad
**Media-Alta** — El mapeo de productos a cuentas PUC requiere catálogo calibrado. El cálculo de impuestos tiene reglas tributarias que dependen del régimen del cliente. La trazabilidad remisión→factura es importante para Galco. Comparte referencias con legalizador-cajas-menores (PUC, retenciones), lo que reduce el esfuerzo de configuración.

---

## Dependencias entre Skills

```
JORGE (Compras):
registro-compras → comparador-cotizaciones
       ↓                    ↓
  (genera grupos      (alimenta decisión
   para cotizar)       de compra)

auto-llenador-formularios  ←→  independiente

CAROLINA (Contabilidad):
creador-terceros → generador-facturas
       ↓                    ↓
  (terceros nuevos    (necesita que el cliente
   en Ilimitada)       exista para facturar)

legalizador-cajas-menores ←→ generador-facturas
       ↓                           ↓
  (comparten PUC,            (comparten PUC,
   retenciones,               retenciones,
   plantillas Ilimitada)       plantillas Ilimitada)
```

**Ecosistema Carolina (3 skills conectados):** creador-terceros + legalizador-cajas-menores + generador-facturas comparten el PUC de Galco, la tabla de retenciones, y el ecosistema Ilimitada. Configurar las referencias una vez sirve para los 3. Es un bloque contable completo.

**Ecosistema Jorge (3 skills conectados):** registro-compras + comparador-cotizaciones + auto-llenador-formularios cubren su flujo completo de compras.

## Stack de Herramientas Necesario
→ Ejecutar `/disenar-stack galco` para el detalle completo.

Mínimo necesario:
- **Claude Pro/Team** — Motor de IA para todos los skills
- **Claude Code** — Entorno de ejecución de skills
- Acceso a exports de **SIGO** (CSV/Excel)
- Acceso a exports y plantillas de carga de **Ilimitada**
- **PUC de Galco** (archivo Excel o PDF) — crítico para skills 3, 6
- Scanner/app de escaneo para recibos de caja menor

## Datos de Referencia Críticos (pedir a Galco)
1. **Plantilla de carga de clientes** de Ilimitada (Carolina la va a enviar)
2. **Plantilla de carga de proveedores** de Ilimitada
3. **Plantilla de facturación** de Ilimitada (Carolina la va a enviar)
4. **PUC de Galco** — las cuentas contables que usa Carolina (ingreso, gasto, CxC, CxP, IVA)
5. **Tabla de retenciones vigente** que usa Galco
6. **Resolución de facturación DIAN** vigente (rango, prefijo)
7. **Catálogo de productos/servicios** que vende Galco (con precios y cuentas)
8. **Excel "biblia" de Jorge** — para replicar su formato exacto
9. **Catálogo de proveedores** de Jorge (su Excel de base de datos de proveedores)

## Criterios de Éxito
- Skill triggers en 90% de queries relevantes
- Registro de compras: procesa requerimiento en <2 minutos (vs ~45 min manual)
- Creador de terceros: 10 clientes en <3 minutos (vs ~1 hora manual)
- Cajas menores: batch de 20 recibos en <10 minutos con cuenta PUC correcta (vs ~3 horas)
- Comparador: matriz de 4 cotizaciones en <2 minutos (vs ~1 hora)
- Formularios: diligenciado en <1 minuto (vs ~30 minutos)
- Facturas: 5 remisiones → 5 facturas en <5 minutos con causación completa (vs ~1.5 horas)
- 0 errores en datos tributarios (NIT, cuentas contables, IVA)
- Clasificación PUC correcta en >90% después de calibración
- Usuario no necesita corregir más del 10% del output
