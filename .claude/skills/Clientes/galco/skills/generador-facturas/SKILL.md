---
name: generador-facturas
description: >
  Transforma remisiones de producción (Jenguar) en archivos de carga de facturas
  para Ilimitada. Use when "facturar", "generar factura", "remisiones de producción",
  "factura de venta", "subir facturas", "procesar remisión".
  Lee remisiones, cruza con PUC, calcula IVA/retenciones, genera plantilla de carga.
argument-hint: "[ruta a remisiones de Jenguar o pegar datos]"
allowed-tools: ["Read", "Write", "Bash", "Glob"]
---

# Generador de Facturas — Procesador de Remisiones Jenguar

Conviertes remisiones de producción de Jenguar en facturas lista para carga masiva en Ilimitada. Mapeas productos a cuentas de ingreso, calculas impuestos, y generas soporte contable completo.

---

## WORKFLOW

### STEP 1: Leer Referencias Críticas

Antes de procesar:

1. Lee `references/puc-galco.md` — Plan Único de Cuentas (cuentas de ingreso 413xxx)
2. Lee `references/catalogo-productos-galco.md` — Productos/servicios con mapeo a cuentas PUC
3. Lee `references/resolucion-facturacion.md` — Resolución DIAN vigente (prefijo, rango, resolución)
4. Lee `references/clientes-frecuentes.md` — Clientes recurrentes con NIT y régimen tributario
5. Lee `references/reglas-retenciones.md` — Cálculo de retenciones en ventas

Estos archivos son la base para clasificación de ingresos, cálculo de impuestos, y validación.

---

### STEP 2: Recibir Remisiones

Solicita al usuario:

*"¿Cómo proporciono las remisiones?*
- *Ruta a archivo Excel de Jenguar*
- *PDF de remisiones escaneadas*
- *Datos pegados manualmente (cliente + ítems)*

*¿Qué formato tienes?"*

Espera entrada del usuario.

---

### STEP 3: Extraer Datos de la Remisión

Para **cada remisión**, extrae:

#### Información del Cliente

- **Nombre del cliente**
- **NIT del cliente**
- **Régimen tributario** (Responsable IVA / No Responsable)
- **Dirección de entrega**
- **Contacto**

#### Información de la Remisión

- **Número de remisión** (trazabilidad Jenguar → Factura)
- **Fecha de remisión**
- **Condición de pago** (contado, crédito 30 días, etc.)

#### Ítems (Productos/Servicios)

Para cada ítem:
- **Descripción del producto/servicio**
- **Cantidad**
- **Precio unitario**
- **Valor total del ítem**
- **¿Lleva IVA?** (19%, exento, excluido)

**Ejemplo de extracción:**

```
Remisión: 4521
Cliente: Constructora El Poblado S.A.S (NIT 900.567.890-1)
Fecha: 24/03/2026
Ítems:
  1. Fabricación estructura metálica 50m²  Qty: 1  $10,000,000  IVA 19%
  2. Soldadura acero inox 20m lineal      Qty: 20 $100,000 c/u  IVA 19%
  3. Instalación y alineamiento            Qty: 1  $2,000,000   IVA 19%
  --------
  TOTAL BRUTO: $12,100,000
```

---

### STEP 4: Validar Cliente en Base

Para cada cliente:

1. Busca el **NIT en `referencias/clientes-frecuentes.md`**
2. **Si encuentras:** Usa automáticamente NIT, régimen, dirección
3. **Si NO encuentras:**
   - Preguntar: *"¿Existe este cliente ya en Ilimitada o es nuevo?"*
   - Si es **NUEVO:** Recomenda usar skill `creador-terceros` primero
   - Si es **EXISTENTE:** Preguntar NIT y régimen tributario
4. Validar que el **NIT tiene formato correcto** (9 dígitos + DV)

**Si falta NIT o el cliente no existe, MARCAR COMO ALERTA y preguntar antes de continuar.**

---

### STEP 5: Mapear Productos a Cuentas PUC

Consulta `referencias/catalogo-productos-galco.md`:

#### Mapeo Automático

```
Descripción Producto/Servicio → Cuenta de Ingreso PUC

"Fabricación de estructura metálica"
    → 413536 (Fabricación Productos Metálicos)

"Servicio de maquinado"
    → 413540 (Servicios de Maquinado Industrial)

"Soldadura / Soldadura acero"
    → 413545 (Servicios de Soldadura)

"Corte, troquelado"
    → 413550 (Servicios de Corte y Troquelado)

"Servicios varios, instalación, alineamiento"
    → 413595 (Otros Ingresos Operacionales)
```

**Si es ambiguo:** Pregunta a Carolina:

*"Producto '[X]' podría ser [opción A] o [opción B]. ¿Cuál es?"*

---

### STEP 6: Calcular IVA

Cada ítem tiene una **tarifa IVA** (busca en catálogo):

#### Tarifas Vigentes

- **19% (Estándar):** Mayoría de productos/servicios metalmecánicos
- **5% (Reducida):** Algunos servicios técnicos (raro para Galco)
- **Exento (0%):** Servicios de capacitación, asesorías (excepcional)
- **Excluido (0% pero sin crédito):** Algunos servicios especiales

**Cálculo por ítem:**

```
Valor Bruto Ítem = Cantidad × Precio Unitario
IVA Ítem = Valor Bruto × Tarifa IVA
Valor Neto Ítem = Valor Bruto + IVA

Ejemplo:
Estructura: 1 × $10,000,000 = $10,000,000
IVA: $10,000,000 × 19% = $1,900,000
Neto: $10,000,000 + $1,900,000 = $11,900,000
```

---

### STEP 7: Calcular Retenciones en Venta

Consulta `referencias/reglas-retenciones.md`:

Las retenciones en venta dependen del **régimen del cliente** y el **tipo de servicio**.

#### Retención en Venta (ReteFuente)

Aplica cuando:
- Cliente es **No Responsable de IVA** (régimen simple)
- O cliente es persona natural
- Valor > base mínima

**Tarifa:** 11% sobre servicios

**Ejemplo:**

```
Cliente: Persona Natural
Servicio: Maquinado $500,000
ReteFuente: $500,000 × 11% = $55,000
Valor a Cobrar: $500,000 - $55,000 = $445,000 (neto)
```

#### Retención ICA en Venta

**Solo si cliente está en Itagüí** y es sujeto de RetICA.

Tarifa Itagüí: 1.2%

---

### STEP 8: Generar Líneas de Factura Contable

Para cada ítem de cada remisión, generar **asiento contable**:

```
Cuenta Débito (CxC Cliente):   130505 (Clientes Nacionales)
Cuenta Crédito (Ingreso):      [413536, 413540, etc. según producto]
Cuenta Crédito (IVA Causado):  230505 (si hay IVA)
Cuenta Crédito (Retención):    233595 (si hay retención)

Valores:
Débito CxC:   Bruto + IVA - Retención (= lo que cobras)
Crédito Ingreso: Bruto
Crédito IVA:  IVA (si aplica)
Crédito Retención: Retención (si aplica) — va a pasivo
```

---

### STEP 9: Generar Plantilla de Carga para Ilimitada

Consolida **todas las líneas** en tabla formato Ilimitada:

```
Remisión | Número Factura | Fecha | Cliente | NIT | Cuenta Débito | Cuenta Crédito | Valor Base | IVA | Retención | Valor Total
4521 | [AUTO] | 24/03/2026 | Constructora El Poblado | 900567890 | 130505 | 413536 | 10000000 | 1900000 | 0 | 11900000
4521 | [AUTO] | 24/03/2026 | Constructora El Poblado | 900567890 | 130505 | 413545 | 2000000 | 380000 | 0 | 2380000
4521 | [AUTO] | 24/03/2026 | Constructora El Poblado | 900567890 | 130505 | 413595 | 2000000 | 380000 | 0 | 2380000
4522 | [AUTO] | 25/03/2026 | Industrias Metálicas del Valle | 830456789 | 130505 | 413540 | 4500000 | 855000 | 1125000 | 4230000
```

---

### STEP 10: Auto-generar Número de Factura

Lee `referencias/resolucion-facturacion.md` para obtener:

- **Prefijo de factura:** GLC (o el que tenga Galco)
- **Rango vigente:** 1001-5000
- **Resolución:** Número de resolución DIAN
- **Vigencia:** Fechas de válidad

**Lógica:**

```
Número Factura = [PREFIJO] - [NÚMERO SECUENCIAL]
Ejemplo: GLC-1001, GLC-1002, GLC-1003, etc.

Validar:
- ¿Está dentro del rango vigente?
- ¿Es el siguiente número disponible?
- Si no se conoce el siguiente, preguntar a Carolina
```

---

### STEP 11: Mostrar Output en Chat (CRÍTICO)

**REGLA: Chat primero, archivo después.**

Muestra la tabla completa en el chat:

*"Aquí está la conversión de remisiones a facturas:*

*[TABLA COMPLETA]*

**Resumen:**
- *Total remisiones procesadas: [X]*
- *Facturas generadas: [X]*
- *Valor Total Facturado: $[X.XXX.XXX]*
- *Total IVA: $[X.XXX.XXX]*
- *Total Retenciones: $[X.XXX.XXX]*

*Desglose por Cuenta PUC:*
- *413536 (Fabricación Metálica): $X ([Y] ítems)*
- *413540 (Maquinado): $Y ([Z] ítems)*
- *... [resto de cuentas]*

*Desglose por Cliente:*
- *[Cliente A]: $X (N facturas)*
- *[Cliente B]: $Y (M facturas)*

**Alertas/Revisión Manual:**
- *[Lista de clientes nuevos o datos faltantes]*
- *[Ítems con clasificación ambigua]*

*¿Todo correcto o hago ajustes?"*

Espera confirmación.

---

### STEP 12: Guardar Archivos

Una vez confirmado, guarda:

**Archivo 1: Plantilla de carga de facturas**

```
/sessions/inspiring-blissful-cerf/mnt/Claude_Code/Clientes/galco/skills/generador-facturas/output/
facturas-ilimitada-[mes-año].csv
```

Formato: CSV con delimitador `;`

**Archivo 2: Resumen de Facturación (Opcional pero recomendado)**

```
/sessions/inspiring-blissful-cerf/mnt/Claude_Code/Clientes/galco/skills/generador-facturas/output/
resumen-facturas-[mes-año].md
```

Contiene resumen con totales, alertas, y trazabilidad remisión → factura.

---

### STEP 13: Resumen Final y Próximos Pasos

*"✓ Facturas generadas correctamente*

*Resumen de Facturación:*
- *Remisiones procesadas: [X]*
- *Facturas generadas: [X]*
- *Período: [mes/año]*

*Totales:*
- *Valor Bruto: $[X.XXX.XXX]*
- *IVA Causado: $[X.XXX.XXX]*
- *Retenciones: $[X.XXX.XXX]*
- *Valor Neto a Cobrar: $[X.XXX.XXX]*

*Desglose por Producto:*
- *Fabricación Metálica (413536): $X*
- *Maquinado (413540): $Y*
- *Soldadura (413545): $Z*
- *... [resto]*

*Nuevos clientes (requieren creación previa):*
- *[Listado si aplica]*

*Archivos listos:*
- *Plantilla carga: [ruta]*
- *Resumen: [ruta]*

*Próximo paso: Sube la plantilla en Ilimitada > Herramientas > Carga Masiva > Facturas Venta*

*Trazabilidad:*
- *Remisión → Factura mapeadas en resumen*
- *Todos los números documentos generados están en el rango de la Resolución GLC (1001-5000)*"*

---

## REGLAS

- **Nunca inventar datos.** Si faltan NIT, régimen, o precios, preguntar.
- **Validar clientes primero.** Si no existe en Ilimitada, requerir creación vía skill creador-terceros.
- **Mapeo PUC exacto.** Usar catálogo de productos. Si hay duda, preguntar a Carolina.
- **Cálculo de impuestos correcto.** IVA estándar 19%, retenciones según régimen cliente.
- **Chat primero.** Mostrar tabla y resumen antes de guardar.
- **Trazabilidad remisión → factura.** Documentar número remisión original.
- **Numeración secuencial.** Facturas deben estar dentro del rango de la Resolución DIAN.

---

## EJEMPLOS DE TRIGGERS

- "Facturo estas remisiones de Jenguar"
- "Generar facturas de marzo 2026"
- "Procesa estos números de remisión"
- "Convierte remisiones a facturas"
- "Subir facturas a Ilimitada"

---

## CROSS-REFERENCES

Este skill comparte referencias con `legalizador-cajas-menores`:

- `references/puc-galco.md` — Plan Único de Cuentas (compartido — cuentas de ingreso)
- `references/reglas-retenciones.md` — Retenciones DIAN (compartido — lógica tributaria)

Ambos skills usan la misma base de cuentas contables y lógica de retenciones, pero aplicada en contextos diferentes (gastos vs. ingresos).
