# Spec Tecnico: Skills para MAAS 3 Ingenieros
## Basado en "The Complete Guide to Building Skills for Claude"

## Resumen de Matching con Showcase
| # | Skill | Fuente | Match |
|---|-------|--------|-------|
| 1 | documentos-obra | Showcase #02 + #08 + #17 combinados | Adaptado (hub multi-documento) |
| 2 | comparar-cotizaciones | Showcase Combo 02 #10 | Exacto |
| 3 | factura | Showcase Combo 04 #22 | Adaptado (construccion) |
| 4 | cronograma-obra | Nuevo | Nuevo |
| 5 | acta-comite | Showcase Combo 07 (Reuniones) | Adaptado (comite de obra) |
| 6 | procesar-factura | Showcase Combo 01 #01 + Combo 04 #23 | Adaptado (facturas de proveedores) |

---

## Skill 1: documentos-obra

### Frontmatter
```yaml
---
name: documentos-obra
description: >
  Hub central de documentos de obra. Genera informes de avance, presupuestos,
  contratos y emails para clientes. Use when user says "documentos", "informe",
  "presupuesto", "contrato de obra", "email al cliente".
argument-hint: "[tipo-documento] [proyecto]"
allowed-tools: ["Read", "Write", "Glob"]
---
```

### Categoria Anthropic
**Document & Asset Creation** — Hub multi-template que genera diferentes documentos segun seleccion.

### Arquitectura
- **Level 1 (YAML):** Frontmatter con triggers amplios para cualquier tipo de documento
- **Level 2 (SKILL.md):** Menu de opciones, workflow por tipo de documento, reglas de formato
- **Level 3 (references/):**
  - `plantilla-informe.md` — Template informe semanal de avance
  - `plantilla-presupuesto.md` — Template presupuesto con partidas estandar
  - `plantilla-contrato.md` — Template contrato por modalidad
  - `plantilla-email.md` — Templates de emails de envio
  - `precios-referencia.md` — APUs y precios de referencia Medellin

### Tools y MCPs
- **Built-in tools:** Read, Write, Glob
- **MCPs necesarios:** Ninguno en v1
- **Hooks:** Ninguno
- **Subagents:** No necesario

### Workflow
1. Mostrar menu: "Que documento necesitas? (1) Informe de avance (2) Presupuesto (3) Contrato (4) Email"
2. Segun seleccion:

**Informe de avance:**
1. Pedir: proyecto + notas de avance + fotos (opcional)
2. Leer plantilla de references/
3. Generar informe: encabezado, datos proyecto, avance por partida, % ejecucion, observaciones, proximos pasos
4. Mostrar en chat → guardar

**Presupuesto:**
1. Pedir: tipo de obra, area, especificaciones, acabados
2. Generar partidas con cantidades y precios de referencia
3. Calcular totales en ambas modalidades (todo costo + admin delegada)
4. Mostrar en chat → guardar

**Contrato:**
1. Pedir: datos cliente, proyecto, modalidad, monto, condiciones
2. Generar contrato con clausulas segun modalidad
3. Mostrar en chat → guardar

**Email:**
1. Pedir: destinatario, documento adjunto, contexto
2. Generar email profesional de envio
3. Mostrar en chat

### Input / Output
- **Input:** Tipo de documento + datos del proyecto
- **Output:** Documento HTML/PDF profesional

### Complejidad
**Media** — Multiples templates y flujos dentro de un solo skill. Requiere plantillas bien definidas con el cliente.

---

## Skill 2: comparar-cotizaciones

### Frontmatter
```yaml
---
name: comparar-cotizaciones
description: >
  Compara cotizaciones de proveedores para un mismo trabajo y genera cuadro
  comparativo con recomendacion. Use when user says "comparar cotizaciones",
  "comparar proveedores", "cual proveedor elijo", or uploads multiple quotes.
argument-hint: "[cotizaciones]"
allowed-tools: ["Read", "Write", "Glob"]
---
```

### Categoria Anthropic
**Workflow Automation** — Extrae datos de multiples documentos, normaliza y compara.

### Arquitectura
- **Level 1 (YAML):** Frontmatter con triggers
- **Level 2 (SKILL.md):** Workflow de comparacion, criterios, formato de cuadro comparativo
- **Level 3 (references/):**
  - `criterios-evaluacion.md` — Variables clave (precio, alcance, tiempo, garantia, experiencia)

### Tools y MCPs
- **Built-in tools:** Read, Write
- **MCPs necesarios:** Ninguno
- **Hooks:** Ninguno
- **Subagents:** No necesario

### Workflow
1. Recibir 2-4 cotizaciones (PDF, texto, o pegadas en chat)
2. Extraer datos clave: proveedor, items, cantidades, precios unitarios, tiempos, condiciones
3. Normalizar unidades (precio/m2, precio/unidad)
4. Generar cuadro comparativo con columnas por proveedor
5. Agregar recomendacion basada en mejor relacion costo-beneficio
6. Mostrar en chat + guardar

### Input / Output
- **Input:** 2-4 cotizaciones de proveedores
- **Output:** Cuadro comparativo HTML + recomendacion

### Complejidad
**Baja** — Extraccion + comparacion. Sin MCPs.

---

## Skill 3: factura

### Frontmatter
```yaml
---
name: factura
description: >
  Genera facturas para proyectos de construccion. Use when user says "factura",
  "facturar", "generar factura", "cobrar", "corte de obra".
argument-hint: "[proyecto] [concepto] [valor]"
allowed-tools: ["Read", "Write", "Glob"]
---
```

### Categoria Anthropic
**Document & Asset Creation** — Genera documento financiero con formato consistente.

### Arquitectura
- **Level 1 (YAML):** Frontmatter con triggers
- **Level 2 (SKILL.md):** Datos fiscales de MAAS 3, estructura de factura, calculo de impuestos
- **Level 3 (references/):**
  - `datos-fiscales-maas3.md` — NIT, razon social, regimen, cuenta bancaria
  - `plantilla-factura.md` — Template de factura

### Tools y MCPs
- **Built-in tools:** Read, Write
- **MCPs necesarios:** Ninguno
- **Hooks:** Ninguno
- **Subagents:** No necesario

### Workflow
1. Pedir: proyecto, concepto (corte de obra, anticipo, entrega final), valor antes de IVA
2. Pedir o buscar datos del cliente (NIT, razon social, direccion)
3. Calcular: subtotal, IVA 19%, retenciones si aplica, total a pagar
4. Generar factura con: datos MAAS 3, datos cliente, concepto detallado, valores, forma de pago
5. Mostrar en chat → guardar

### Input / Output
- **Input:** Proyecto + concepto + valor
- **Output:** Factura HTML profesional

### Complejidad
**Baja** — Template fijo + calculos simples de impuestos. Requiere datos fiscales del cliente.

---

## Skill 4: cronograma-obra

### Frontmatter
```yaml
---
name: cronograma-obra
description: >
  Genera cronogramas de obra con fases, duraciones y dependencias. Puede
  actualizar con avance real. Use when user says "cronograma", "programacion
  de obra", "timeline del proyecto", "actualizar cronograma".
argument-hint: "[tipo-obra] [fecha-inicio]"
allowed-tools: ["Read", "Write", "Glob"]
---
```

### Categoria Anthropic
**Document & Asset Creation** — Genera documento de planificacion con domain expertise en construccion.

### Arquitectura
- **Level 1 (YAML):** Frontmatter con triggers
- **Level 2 (SKILL.md):** Fases tipicas por tipo de obra, duraciones de referencia, dependencias
- **Level 3 (references/):**
  - `fases-construccion.md` — Fases tipicas por tipo de proyecto (remodelacion, casa nueva, locales)
  - `duraciones-referencia.md` — Duraciones tipicas por actividad y tamano de obra

### Tools y MCPs
- **Built-in tools:** Read, Write
- **MCPs necesarios:** Ninguno
- **Hooks:** Ninguno
- **Subagents:** No necesario

### Workflow

**Generar cronograma nuevo:**
1. Pedir: tipo de obra, alcance, area, fecha de inicio
2. Consultar fases tipicas para ese tipo de obra
3. Estimar duraciones segun area y complejidad
4. Definir dependencias entre actividades
5. Calcular fechas de inicio/fin por fase
6. Generar cronograma visual (tabla con barras de Gantt simplificadas en HTML)
7. Identificar ruta critica
8. Mostrar en chat → guardar

**Actualizar cronograma:**
1. Leer cronograma existente del proyecto
2. Pedir: que actividades se completaron, retrasos, cambios
3. Recalcular fechas de actividades pendientes
4. Mostrar desviaciones vs plan original
5. Guardar version actualizada

### Input / Output
- **Input:** Tipo de obra + alcance + fecha inicio (o cronograma existente + avance)
- **Output:** Cronograma HTML con Gantt simplificado + ruta critica

### Complejidad
**Media** — Requiere domain expertise en fases de construccion y duraciones tipicas. El cliente debe validar duraciones de referencia durante el setup.

---

## Skill 5: acta-comite

### Frontmatter
```yaml
---
name: acta-comite
description: >
  Genera actas de comite de obra con decisiones, aprobaciones y compromisos.
  Use when user says "acta de comite", "acta de reunion de obra", "comite de obra",
  "minuta del comite".
argument-hint: "[proyecto]"
allowed-tools: ["Read", "Write", "Glob"]
---
```

### Categoria Anthropic
**Document & Asset Creation** — Convierte notas informales en documento formal estructurado.

### Arquitectura
- **Level 1 (YAML):** Frontmatter con triggers
- **Level 2 (SKILL.md):** Estructura del acta, secciones obligatorias, formato
- **Level 3 (references/):**
  - `plantilla-acta.md` — Template de acta de comite de obra

### Tools y MCPs
- **Built-in tools:** Read, Write, Glob
- **MCPs necesarios:** Ninguno. Futuro: Circleback MCP si graban los comites
- **Hooks:** Ninguno
- **Subagents:** No necesario

### Workflow
1. Pedir: proyecto + notas del comite (texto libre, audio transcrito, o bullet points)
2. Si hay actas anteriores del proyecto, leerlas para mantener numeracion y continuidad
3. Estructurar acta:
   - Numero de acta y fecha
   - Proyecto y ubicacion
   - Asistentes (nombre, rol)
   - Temas tratados
   - Decisiones tomadas (con detalle: que se decidio, quien lo pidio)
   - Aprobaciones (contratistas, materiales, cambios de alcance)
   - Compromisos (que, quien, para cuando)
   - Proxima reunion
4. Mostrar en chat para revision
5. Guardar con numeracion consecutiva: `acta-comite-001.html`, `acta-comite-002.html`

### Input / Output
- **Input:** Proyecto + notas/resumen del comite
- **Output:** Acta formal HTML con numeracion consecutiva

### Complejidad
**Baja** — Document creation con template fijo. La clave es mantener numeracion y leer actas previas para continuidad.

---

## Skill 6: procesar-factura

### Frontmatter
```yaml
---
name: procesar-factura
description: >
  Procesa facturas de proveedores desde foto o PDF. Extrae datos y los organiza
  en Excel acumulado por proyecto. Use when user says "procesar factura",
  "factura de proveedor", "cargar factura", "registrar factura".
argument-hint: "[proyecto]"
allowed-tools: ["Read", "Write", "Glob", "Bash"]
---
```

### Categoria Anthropic
**Workflow Automation** — Extraccion de datos desde imagen/PDF + acumulacion en archivo estructurado.

### Arquitectura
- **Level 1 (YAML):** Frontmatter con triggers
- **Level 2 (SKILL.md):** Campos a extraer, formato del Excel, reglas de clasificacion
- **Level 3 (references/):**
  - `categorias-gastos.md` — Categorias tipicas de gastos en obra (materiales, mano de obra, transporte, etc.)
  - `plantilla-excel-costos.md` — Estructura del Excel acumulado

### Tools y MCPs
- **Built-in tools:** Read (lee imagenes/PDFs), Write, Glob, Bash (para manipular CSV/Excel)
- **MCPs necesarios:** Ninguno
- **Hooks:** Ninguno
- **Subagents:** No necesario

### Workflow
1. Recibir imagen o PDF de la factura del proveedor
2. Extraer datos con vision de Claude:
   - Proveedor (nombre, NIT)
   - Numero de factura
   - Fecha de emision
   - Conceptos / items (descripcion, cantidad, valor unitario)
   - Subtotal, IVA, retenciones, total
   - Forma de pago / vencimiento
3. Mostrar datos extraidos al usuario para validacion rapida
4. Clasificar automaticamente por categoria de gasto (materiales, mano de obra, equipos, transporte, etc.)
5. Buscar Excel acumulado del proyecto (`costos-[proyecto].csv`)
   - Si existe: agregar nueva fila
   - Si no existe: crear con headers
6. Guardar y mostrar resumen: "Factura #X de [proveedor] por $[total] agregada. Total acumulado del proyecto: $[suma]"

### Input / Output
- **Input:** Foto/PDF de factura + nombre del proyecto
- **Output:** Excel/CSV acumulado con todos los costos del proyecto

### Complejidad
**Media** — Requiere vision de Claude para leer facturas (ya es built-in). La complejidad esta en manejar formatos variados de facturas de proveedores colombianos y mantener el Excel consistente.

---

## Dependencias entre Skills
- **Skill 1 (documentos-obra)** es el hub central — genera la mayoria de documentos
- **Skill 2 (comparar-cotizaciones)** → resultado puede alimentar el acta de comite (Skill 5)
- **Skill 3 (factura)** usa datos del presupuesto generado en Skill 1
- **Skill 4 (cronograma-obra)** se actualiza con informacion de actas de comite (Skill 5)
- **Skill 5 (acta-comite)** puede referenciar decisiones sobre cotizaciones (Skill 2)
- **Skill 6 (procesar-factura)** alimenta control de costos que se usa en informes (Skill 1) y para admin delegada

## Stack de Herramientas Necesario
- **Claude Code** con licencia Max/Teams
- **Suscripciones del cliente:** Claude Pro/Max ($20-100 USD/mes)
- No requiere MCPs externos en v1
- Futuro: Circleback MCP (para grabar comites), Google Drive MCP (para guardar docs)

## Setup Requerido (durante la semana de implementacion)
1. Recopilar plantillas actuales de MAAS 3 (informes, presupuestos, contratos)
2. Validar precios de referencia y APUs con el equipo
3. Recopilar datos fiscales de MAAS 3 para facturacion
4. Definir fases y duraciones tipicas por tipo de obra
5. Instalar Claude Code en equipo de David

## Criterios de Exito
- Skill triggers en 90% de queries relevantes
- Informe de obra: < 3 minutos (vs 60 min actual)
- Presupuesto: < 5 minutos con ajustes
- Acta de comite: < 2 minutos post-reunion
- 0 errores de formato en documentos generados
- Usuario no necesita corregir estructura del output (solo datos)
