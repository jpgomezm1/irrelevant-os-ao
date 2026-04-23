# Spec Tecnico: Skills para Bless Handmade
## Basado en "The Complete Guide to Building Skills for Claude"

## Resumen de Matching con Showcase
| # | Skill | Fuente | Match |
|---|-------|--------|-------|
| 1 | programador-produccion | Showcase Combo 08 #52 + Combo 09 #58 | Adaptado |
| 2 | coordinador-terceros-insumos | Nuevo (ampliado de coordinador-terceros) | Nuevo |
| 3 | tablero-seguimiento | Showcase Combo 01 #06 | Adaptado |
| 4 | alerta-atrasos | Nuevo | Nuevo |
| 5 | procesador-mayoreo | Showcase Combo 09 #60B | Adaptado |

Skills nuevos agregados al showcase: 2 (coordinador-terceros-insumos, alerta-atrasos en Combo 09)

---

## Skill 1: programador-produccion

### Frontmatter
```yaml
---
name: programador-produccion
description: >
  Lee la exportacion diaria de ventas de Google Sheets, clasifica cada pedido
  por tipo de proceso (interno vs tercero), y genera el plan de produccion
  del dia organizado por taller. Usa cuando Juliana diga "programar produccion",
  "que hay para hoy", o "revisar ventas del dia".
argument-hint: "[ruta al archivo de exportacion]"
allowed-tools: [Read, Write, Glob, Grep]
---
```

### Categoria Anthropic
Workflow Automation

### Arquitectura
- **Level 1 (YAML):** Trigger phrases, descripcion de que hace
- **Level 2 (SKILL.md):** Instrucciones para leer el Sheets exportado, reglas de clasificacion por referencia/tipo, formato de output
- **Level 3 (references/):** catalogo-referencias.md (mapeo referencia → tipo de proceso → taller asignado), terceros.md (lista de talleres con especialidad y tiempos promedio)

### Tools y MCPs
- **Built-in tools:** Read (leer exportacion), Write (generar plan), Glob (buscar archivos)
- **MCPs necesarios:** Google Sheets MCP (para leer directamente del Sheet sin exportar manualmente)
- **Hooks:** No
- **Subagents:** No

### Workflow
1. Leer archivo de exportacion (Google Sheets o CSV)
2. Parsear cada venta: ID, referencia, color, fecha, canal
3. Cruzar referencia con catalogo para identificar procesos terceros necesarios
4. Clasificar: internas vs terceros (y que tipo: crochet, recamado, teñido, pedreria)
5. Agrupar por taller tercero
6. Ordenar por fecha de entrega (urgencia)
7. Generar plan de produccion del dia

### Input / Output
- **Input:** Exportacion de ventas del dia (CSV/Sheets)
- **Output:** Plan de produccion organizado por taller con detalle de cada prenda

### Complejidad
Media — requiere catalogo de referencias bien estructurado como prerequisito

---

## Skill 2: coordinador-terceros-insumos

### Frontmatter
```yaml
---
name: coordinador-terceros-insumos
description: >
  Genera mensajes de WhatsApp listos para enviar a talleres terceros Y ordenes
  de pedido para proveedores de telas y flecos. Incluye detalle de prendas,
  imagenes, fechas y alertas de inventario bajo. Usa cuando Juliana diga
  "mandar pedidos", "coordinar talleres", "pedir telas" o "revisar insumos".
argument-hint: "[terceros/insumos/todos]"
allowed-tools: [Read, Write, Glob]
---
```

### Categoria Anthropic
Document & Asset Creation + Workflow Automation

### Arquitectura
- **Level 1 (YAML):** Trigger phrases, descripcion
- **Level 2 (SKILL.md):** Templates de mensajes por taller, formato de ordenes de pedido, reglas de inventario minimo
- **Level 3 (references/):**
  - terceros.md (datos de contacto, especialidad)
  - proveedores.md (datos de proveedores de telas/flecos, tiempos de entrega)
  - inventario-minimos.md (niveles minimos por tipo de tela/insumo)
  - templates-mensaje.md (formato preferido por taller/proveedor)

### Tools y MCPs
- **Built-in tools:** Read (leer plan de produccion + inventario), Write (generar mensajes y ordenes)
- **MCPs necesarios:** Airtable MCP (para leer inventario actual de telas/flecos)
- **Hooks:** No
- **Subagents:** No

### Workflow
**PARTE A - Talleres terceros:**
1. Leer plan de produccion del dia (output del skill 1)
2. Filtrar pedidos por taller tercero
3. Para cada taller, generar mensaje con: lista de prendas, referencia, color, imagen, fecha limite
4. Formatear para WhatsApp

**PARTE B - Insumos:**
1. Leer niveles actuales de inventario (telas y flecos) desde Airtable
2. Comparar contra niveles minimos configurados
3. Para cada insumo bajo minimo, generar orden de pedido con: tipo, cantidad, proveedor, urgencia
4. Formatear orden lista para enviar a proveedor

### Input / Output
- **Input:** Plan de produccion del dia + inventario actual
- **Output:**
  - Mensajes de WhatsApp para talleres (listos para enviar)
  - Ordenes de pedido para proveedores (listas para enviar)
  - Reporte de alertas de inventario

### Complejidad
Media — generacion de texto + logica de inventario minimos

---

## Skill 3: tablero-seguimiento

### Frontmatter
```yaml
---
name: tablero-seguimiento
description: >
  Genera tablero HTML centralizado con el estado de todos los pedidos en proceso:
  que esta con que taller, fecha de envio, fecha esperada, estado actual, y flujos
  secuenciales. Usa cuando digan "ver estado", "tablero", "como van los pedidos",
  o "estado de produccion".
argument-hint: "[filtro opcional: taller, fecha, referencia]"
allowed-tools: [Read, Write, Glob, Grep]
---
```

### Categoria Anthropic
Document & Asset Creation

### Arquitectura
- **Level 1 (YAML):** Trigger phrases
- **Level 2 (SKILL.md):** Estructura del tablero, reglas de estados (en proceso, atrasado, completado), calculo de flujos secuenciales
- **Level 3 (references/):** terceros.md, assets/tablero-template.html

### Tools y MCPs
- **Built-in tools:** Read (leer registros), Write (generar HTML), Glob (buscar archivos de seguimiento)
- **MCPs necesarios:** Google Sheets MCP (para leer/escribir datos de seguimiento directamente)
- **Hooks:** No
- **Subagents:** No

### Workflow
1. Leer todos los registros de pedidos en proceso
2. Para cada pedido: calcular estado (a tiempo, proximo a vencer, atrasado)
3. Identificar flujos secuenciales (prenda que pasa por 2+ terceros)
4. Generar tablero HTML con filtros por taller, estado, fecha
5. Incluir resumen: total en proceso, atrasados, completados hoy

### Input / Output
- **Input:** Registros de seguimiento
- **Output:** Tablero HTML interactivo

### Complejidad
Media — requiere logica de estados y flujos secuenciales

---

## Skill 4: alerta-atrasos

### Frontmatter
```yaml
---
name: alerta-atrasos
description: >
  Revisa todos los pedidos en proceso y genera reporte de alertas: atrasados,
  vencen hoy, vencen mañana. Usa cada mañana o cuando digan "alertas",
  "que esta atrasado", "revisar pendientes", o "atrasos".
allowed-tools: [Read, Write, Glob, Grep]
---
```

### Categoria Anthropic
Workflow Automation

### Arquitectura
- **Level 1 (YAML):** Trigger phrases
- **Level 2 (SKILL.md):** Reglas de calculo de atrasos, umbrales por tipo de taller, formato de reporte
- **Level 3 (references/):** terceros.md (tiempos promedio por taller para calcular si esta atrasado)

### Tools y MCPs
- **Built-in tools:** Read (leer registros), Write (generar reporte)
- **MCPs necesarios:** Ninguno
- **Hooks:** Podria configurarse como cron diario (8:00 AM) para ejecutarse automaticamente
- **Subagents:** No

### Workflow
1. Leer todos los pedidos en proceso con fecha de envio y fecha esperada
2. Calcular: dias en taller vs tiempo esperado
3. Clasificar: atrasado (>limite), vence hoy, vence mañana, en tiempo
4. Generar reporte ordenado por urgencia
5. Incluir accion sugerida por cada alerta

### Input / Output
- **Input:** Registros de seguimiento (automatico)
- **Output:** Reporte de alertas con acciones sugeridas

### Complejidad
Baja — logica de fechas y comparacion contra umbrales

---

## Skill 5: procesador-mayoreo

### Frontmatter
```yaml
---
name: procesador-mayoreo
description: >
  Digitaliza ordenes de compra mayoristas (foto, PDF o texto), extrae prendas,
  cantidades y referencias, y las integra al flujo de produccion. Usa cuando
  digan "orden mayorista", "pedido al por mayor", "procesar orden B2B",
  o "nueva orden de tienda".
argument-hint: "[ruta al archivo de la orden]"
allowed-tools: [Read, Write, Glob]
---
```

### Categoria Anthropic
Workflow Automation

### Arquitectura
- **Level 1 (YAML):** Trigger phrases, formatos aceptados
- **Level 2 (SKILL.md):** Instrucciones de extraccion de datos de ordenes, validacion contra catalogo, integracion con flujo de produccion
- **Level 3 (references/):** catalogo-referencias.md, formato-orden-mayorista.md (ejemplo de orden tipica)

### Tools y MCPs
- **Built-in tools:** Read (leer imagen/PDF de orden), Write (generar registro estructurado)
- **MCPs necesarios:** Ninguno
- **Hooks:** No
- **Subagents:** No

### Workflow
1. Recibir orden (imagen, PDF o texto)
2. Extraer: cliente B2B, prendas, referencias, cantidades, colores, fecha requerida
3. Validar referencias contra catalogo
4. Clasificar por tipo de proceso (interno vs tercero)
5. Integrar al flujo de produccion (alimentar tablero de seguimiento)
6. Generar confirmacion de orden procesada

### Input / Output
- **Input:** Orden de compra mayorista (imagen, PDF, texto)
- **Output:** Registro estructurado integrado al flujo de produccion

### Complejidad
Media — requiere capacidad de leer multiples formatos y extraer datos

---

## Dependencias entre Skills
- **programador-produccion** → **coordinador-terceros**: El plan de produccion alimenta los mensajes para talleres
- **programador-produccion** → **tablero-seguimiento**: Los pedidos clasificados se registran en el tablero
- **procesador-mayoreo** → **programador-produccion**: Las ordenes B2B digitalizadas entran al mismo flujo
- **tablero-seguimiento** → **alerta-atrasos**: Las alertas se calculan sobre los datos del tablero

Flujo: Exportacion/Orden → Programador → Coordinador + Tablero → Alertas

## Stack de Herramientas Necesario
→ Ejecutar /disenar-stack bless-handmade para el detalle

## Criterios de Exito
- Skill triggers en 90% de queries relevantes
- Programador clasifica correctamente 95%+ de las prendas por tipo de proceso
- Coordinador genera mensajes que Juliana puede enviar sin editar
- Tablero refleja estado real de produccion en tiempo real
- Alertas detectan 100% de pedidos atrasados antes de que el comercial reclame
- Procesador B2B extrae correctamente datos de ordenes en papel
