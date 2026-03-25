---
name: legalizador-cajas-menores
description: >
  Procesa recibos de caja menor y viáticos, extrae datos, cruza contra el PUC de Galco
  para asignar cuenta contable, y genera documentos soporte para Ilimitada.
  Use when "legalizar caja menor", "procesar viáticos", "documentos soporte",
  "legalizar recibos", "caja menor", "comprobante de gasto".
  Lee PDFs/imágenes, clasifica con PUC, genera batch listo para subir.
argument-hint: "[ruta a carpeta de recibos o PDF consolidado]"
allowed-tools: ["Read", "Write", "Bash", "Glob"]
---

# Legalizador de Cajas Menores — Procesador de Recibos y Viáticos

Conviertes recibos de caja menor escaneados en documentos contables listos para carga en Ilimitada. Extraes datos, asignas cuentas PUC, calculas retenciones, y generas soporte DIAN.

---

## WORKFLOW

### STEP 1: Leer Referencias Críticas

Antes de procesar:

1. Lee `references/puc-galco.md` — Plan Único de Cuentas de Galco con todas las cuentas disponibles
2. Lee `references/template-doc-soporte.md` — Formato de documento soporte DIAN
3. Lee `references/reglas-retenciones.md` — Cálculo de retenciones por tipo de gasto
4. Lee `references/terceros-frecuentes-caja.md` — Proveedores recurrentes con NIT ya mapeado

Estos archivos son la base para clasificación contable y validación.

---

### STEP 2: Recibir Recibos

Solicita al usuario:

*"¿Cómo proporciono los recibos?*
- *Carpeta con imágenes/PDFs escaneados*
- *Un PDF consolidado con múltiples recibos*
- *Listado manualmente (conceptos + montos)*

*¿Ruta o archivos?"*

Espera entrada del usuario.

---

### STEP 3: Extraer Datos del Recibo

Para **cada recibo**, extrae:

#### Campos Obligatorios

- **Establecimiento/Proveedor:** Taxi, restaurante, papelería, etc.
- **NIT o Identificación:** Si aparece en el recibo
- **Fecha:** Día del gasto
- **Concepto:** Qué se gastó (almuerzo, pasaje, estacionamiento, etc.)
- **Valor Total:** Monto gastado
- **IVA (si aplica):** Separado del valor base

#### Campos Opcionales

- **Detalle Adicional:** Detalles que ayuden a clasificación
- **Persona que gastó:** Quién realizó el gasto (para auditoria)

**Si faltan datos críticos:** marca como "REVISAR MANUALMENTE" y continúa.

---

### STEP 4: Clasificar Concepto contra PUC

Cruza el concepto del gasto contra `references/puc-galco.md`:

#### Mapeo Automático de Conceptos

| Concepto | Cuenta PUC | Código | Descripción |
|----------|-----------|--------|-------------|
| Taxi, Uber, pasaje | 513540 | Gastos de transporte urbano | Transporte local |
| Almuerzo, comida, restaurante | 513525 | Gastos de alimentación | Comidas personales |
| Papelería, útiles, cuadernos | 519530 | Útiles y papelería | Oficina |
| Peaje | 513545 | Gastos de peajes | Vías |
| Parqueadero, estacionamiento | 513595 | Otros gastos de viaje | Parqueo |
| Gasolina, combustible | 513550 | Combustible y lubricantes | Viáticos |
| Hotel, hospedaje | 513520 | Gastos de alojamiento | Viáticos fuera de ciudad |
| Aseo, cafetería | 519525 | Aseo y cafetería | Mantenimiento |
| Otros gastos | 519595 | Otros gastos | Fallback |

**Si es ambiguo:** Pregunta a Carolina:

*"Recibo [nro]: Concepto '[X]' no es claro. ¿Es [opción A] o [opción B]?"*

---

### STEP 5: Buscar NIT del Tercero

Para cada recibo:

1. Si el NIT está **visible en el recibo** → usar ese
2. Si **NO está visible**, buscar en `referencias/terceros-frecuentes-caja.md`:
   - Taxi → NIT 222.222.222 (genérico TAXIS)
   - Restaurante local → marcar como "SIN NIT IDENTIFICADO"
   - Proveedor recurrente → buscar en lista de frecuentes
3. Si **aún no se encuentra** → marcar como "REVISAR, NIT FALTANTE"

---

### STEP 6: Calcular Retenciones

Lee `references/reglas-retenciones.md` y aplica:

#### ReteFuente (por tipo de gasto)

- **Servicios (hospedaje, consultoría):** 11% si valor > base mínima (27 UVT = $1.344.600)
- **Compras (insumos, materiales):** 2.5% si valor > base mínima (4 UVT = $199.200)
- **Transportes locales:** 0% (caja menor típicamente exento)

**Cálculo:**

```
Valor Base = monto sin IVA
Si Valor Base > Base Mínima:
   Retención = Valor Base × Tarifa %
   Valor Neto = Valor Base - Retención
Sino:
   Retención = 0
   Valor Neto = Valor Base
```

#### ReteICA (Impuesto de Industria y Comercio)

Solo aplica si el establecimiento está en **Itagüí** (donde Galco está):

- **Tarifa Itagüí 2026:** 1.2% sobre valor total
- Aplica a: restaurantes, comercios, servicios
- NO aplica a: taxis, peajes, combustible (excepto gasolineras)

#### ReteIVA

Solo si se documenta compra a proveedor responsable de IVA:

- Típicamente 15% del IVA
- Solo aplica si hay factura electrónica

**Comunica retenciones:**

*"Recibo [nro] — [Establecimiento]:*
- *Valor Base: $X*
- *ReteFuente: $Y ([%] por servicios)*
- *ReteICA: $Z (si aplica)*
- *Valor Neto: $[Total]*

*¿Correcto?"*

---

### STEP 7: Generar Documento Soporte DIAN

Para cada recibo, crea una línea en formato `template-doc-soporte.md`:

```
Número Soporte: [autogenerado o del recibo]
Fecha: [fecha del gasto]
Tercero: [nombre, NIT/CC]
Concepto: [qué se gastó]
Valor Base: [monto]
IVA: [si aplica]
Retención: [si aplica]
Valor Total: [neto]
Cuenta Contable Débito: [513540, 513525, etc.]
Centro de Costo: [si aplica]
Observación: [notas adicionales]
```

---

### STEP 8: Generar Plantilla de Carga para Ilimitada

Consolida **todas las líneas** en tabla formato Ilimitada:

```
Cuenta Débito | Cuenta Crédito | Fecha | Concepto | Tercero | NIT/CC | Valor Base | IVA | Retención | Valor Neto | Centro Costo
513540 | 111010 | 2026-03-20 | Pasaje taxi Cra 45 | TAXI-IND | 222222222 | 15000 | 0 | 0 | 15000 |
513525 | 111010 | 2026-03-21 | Almuerzo Restobar XYZ | Restobar XYZ | | 25000 | 4750 | 300 | 29450 |
519530 | 111010 | 2026-03-22 | Papelería Distribuidora | Papelería Galco | 800234567 | 45000 | 8550 | 1125 | 52675 |
513545 | 111010 | 2026-03-22 | Peaje Autopista Norte | Peajes X | 222000000 | 14200 | 0 | 0 | 14200 |
513550 | 111010 | 2026-03-23 | Gasolina Estación Shell | Shell Itagüí | 830111222 | 80000 | 15200 | 0 | 95200 |
513595 | 111010 | 2026-03-23 | Parqueadero Centro | Parqueo Centro | | 8000 | 0 | 0 | 8000 |
513520 | 111010 | 2026-03-24 | Hotel Medellín (1 noche) | Hotel Plaza | 830123456 | 180000 | 34200 | 23496 | 237696 |
519525 | 111010 | 2026-03-24 | Café y snacks para reunión | CafeteríaGalco | | 18000 | 3420 | 0 | 21420 |
```

---

### STEP 9: Mostrar Output en Chat (CRÍTICO)

**REGLA: Chat primero, archivo después.**

Muestra la tabla completa en el chat:

*"Aquí está la legalización de cajas menores:*

*[TABLA COMPLETA]*

**Resumen:**
- *Total recibos procesados: [X]*
- *Valor Total Legalizado: $[X.XXX]*
- *Retenciones Calculadas: $[X.XXX]*
- *Desglose por Cuenta PUC:*
  - *513540 (Transporte): $X (N recibos)*
  - *513525 (Alimentación): $Y (M recibos)*
  - *... [resto de cuentas]*

**Alertas/Revisión Manual:**
- *[Lista de recibos con datos faltantes o ambigüedades]*

*¿Todo correcto o hago ajustes?"*

Espera confirmación.

---

### STEP 10: Guardar Archivos

Una vez confirmado, guarda:

**Archivo 1: Plantilla de carga Ilimitada**

```
/sessions/inspiring-blissful-cerf/mnt/Claude_Code/Clientes/galco/skills/legalizador-cajas-menores/output/
cajas-menores-[mes-año].csv
```

Formato: CSV con delimitador `;`

**Archivo 2: Documentos Soporte (Opcional pero recomendado)**

```
/sessions/inspiring-blissful-cerf/mnt/Claude_Code/Clientes/galco/skills/legalizador-cajas-menores/output/
documentos-soporte-[mes-año].md
```

Contiene todos los documentos soporte generados para archivo de Carolina.

---

### STEP 11: Resumen Final y Próximos Pasos

*"✓ Cajas menores legalizadas*

*Resumen:*
- *Total procesado: [X] recibos*
- *Monto total: $[X.XXX.XXX]*
- *Retenciones: $[X.XXX]*

*Desglose Contable:*
- *Gastos de Transporte (513540): $X (N recibos)*
- *Gastos de Alimentación (513525): $Y (M recibos)*
- *Útiles y Papelería (519530): $Z (K recibos)*
- *[resto]*

*Items que requieren revisión:*
- *[lista]*

*Archivo listo: [ruta]*
- *Formato: CSV (compatible con Ilimitada)*
- *Próximo paso: Sube en Ilimitada > Herramientas > Carga Masiva > Documentos Contables*

*Documentos soporte guardados en: [ruta] para archivo físico de Carolina"*

---

## REGLAS

- **Nunca inventar NIT.** Si no aparece, marcar como "SIN NIT" o buscar en frecuentes
- **Validar retenciones:** Usar bases mínimas vigentes (UVT 2026 = $49.800)
- **Clasificación PUC exacta:** Si hay ambigüedad, preguntar a Carolina
- **Chat primero.** Mostrar tabla y resumen antes de guardar
- **Documentos soporte:** Generar aunque sea demo (es requisito DIAN)
- **Batch processing:** Soportar 10-100+ recibos en una sola ejecución
- **Datos faltantes:** Marcar claramente qué requiere revisión manual

---

## EJEMPLOS DE TRIGGERS

- "Legaliza estos recibos de caja menor"
- "Procesa estos viáticos"
- "Genera documentos soporte para estos gastos"
- "Caja menor de marzo 2026"
- "Comprobantes de gasto para Carolina"

---

## CROSS-REFERENCES

Este skill comparte referencias con `generador-facturas`:

- `references/puc-galco.md` — Plan Único de Cuentas (compartido)
- `references/reglas-retenciones.md` — Retenciones DIAN (compartido)

Ambos skills usan la misma base de cuentas contables y lógica tributaria.
