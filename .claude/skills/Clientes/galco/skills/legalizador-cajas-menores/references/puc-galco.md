# Plan Único de Cuentas (PUC) — Galco 2026

Plan contable simplificado de Galco para industria metalmecánica, con énfasis en cuentas usadas por Carolina en operaciones diarias.

---

## ESTRUCTURA GENERAL

**Categoría 1: ACTIVOS (1xxxxx)**

| Código | Descripción | Tipo | Saldo Normal |
|--------|-------------|------|--------------|
| **111005** | Caja General | Activo Corriente | Deudor |
| **111010** | Caja Menor | Activo Corriente | Deudor |
| **111015** | Banco Occidente CTA 12345 | Activo Corriente | Deudor |
| **111020** | Banco Bancolombia CTA 67890 | Activo Corriente | Deudor |
| **130505** | Clientes Nacionales | Activo Corriente | Deudor |
| **130510** | Clientes Internacionales | Activo Corriente | Deudor |
| **134505** | Deudores Varios | Activo Corriente | Deudor |
| **150505** | Inventario Materia Prima | Activo Corriente | Deudor |
| **150510** | Inventario Productos en Proceso | Activo Corriente | Deudor |
| **150515** | Inventario Productos Terminados | Activo Corriente | Deudor |

---

## CATEGORÍA 2: PASIVOS (2xxxxx)

| Código | Descripción | Tipo | Saldo Normal |
|--------|-------------|------|--------------|
| **220505** | Proveedores Nacionales | Pasivo Corriente | Acreedor |
| **220510** | Proveedores Internacionales | Pasivo Corriente | Acreedor |
| **224505** | Cuentas por Pagar Empleados | Pasivo Corriente | Acreedor |
| **230505** | IVA Causado (por pagar) | Pasivo Corriente | Acreedor |
| **230510** | Retención IVA por Pagar | Pasivo Corriente | Acreedor |
| **233595** | Retenciones por Pagar (Renta) | Pasivo Corriente | Acreedor |
| **233600** | ReteICA por Pagar | Pasivo Corriente | Acreedor |
| **240804** | IVA Descontable (descontable en compras) | Activo Corriente | Deudor |

---

## CATEGORÍA 3: PATRIMONIO (3xxxxx)

| Código | Descripción | Tipo | Saldo Normal |
|--------|-------------|------|--------------|
| **310505** | Capital Aportado | Patrimonio | Acreedor |
| **320505** | Ganancias Acumuladas | Patrimonio | Acreedor |
| **320510** | Pérdidas Acumuladas | Patrimonio | Deudor |

---

## CATEGORÍA 4: INGRESOS (4xxxxx) — VENTAS

| Código | Descripción | Tipo | Saldo Normal |
|--------|-------------|------|--------------|
| **413536** | Fabricación de Productos Metálicos | Ingreso | Acreedor |
| **413540** | Servicios de Maquinado Industrial | Ingreso | Acreedor |
| **413545** | Servicios de Soldadura | Ingreso | Acreedor |
| **413550** | Servicios de Corte y Troquelado | Ingreso | Acreedor |
| **413595** | Otros Ingresos Operacionales | Ingreso | Acreedor |
| **419505** | Ingresos No Operacionales | Ingreso | Acreedor |
| **419510** | Descuentos Concedidos | Ingreso (contra) | Deudor |

---

## CATEGORÍA 5: GASTOS (5xxxxx)

### 5.1 GASTOS DE PRODUCCIÓN (513xxx)

| Código | Descripción | Tipo | Saldo Normal | Usada en Caja Menor |
|--------|-------------|------|--------------|---|
| **513020** | Materia Prima Directa | Gasto | Deudor | No |
| **513520** | Gastos de Alojamiento | Gasto Viático | Deudor | **SÍ** |
| **513525** | Gastos de Alimentación | Gasto Viático | Deudor | **SÍ** |
| **513540** | Gastos de Transporte | Gasto Viático | Deudor | **SÍ** |
| **513545** | Gastos de Peajes | Gasto Viático | Deudor | **SÍ** |
| **513550** | Combustible y Lubricantes | Gasto Viático | Deudor | **SÍ** |
| **513595** | Otros Gastos de Viaje | Gasto Viático | Deudor | **SÍ** |

### 5.2 GASTOS ADMINISTRATIVOS (519xxx)

| Código | Descripción | Tipo | Saldo Normal | Usada en Caja Menor |
|--------|-------------|------|--------------|---|
| **519525** | Aseo y Cafetería | Gasto | Deudor | **SÍ** |
| **519530** | Útiles y Papelería | Gasto | Deudor | **SÍ** |
| **519540** | Servicios Técnicos y Profesionales | Gasto | Deudor | No |
| **519545** | Servicios Públicos | Gasto | Deudor | No |
| **519550** | Arriendos y Mantenimiento | Gasto | Deudor | No |
| **519560** | Seguros | Gasto | Deudor | No |
| **519570** | Publicidad y Promoción | Gasto | Deudor | No |
| **519595** | Otros Gastos | Gasto | Deudor | **SÍ (fallback)** |

### 5.3 GASTOS DE VENTA (521xxx)

| Código | Descripción | Tipo | Saldo Normal |
|--------|-------------|------|--------------|
| **521505** | Comisiones por Ventas | Gasto | Deudor |
| **521510** | Transporte y Logística | Gasto | Deudor |
| **521515** | Empaques y Embalajes | Gasto | Deudor |

### 5.4 GASTOS FINANCIEROS (524xxx)

| Código | Descripción | Tipo | Saldo Normal |
|--------|-------------|------|--------------|
| **524505** | Intereses y Gastos Financieros | Gasto | Deudor |
| **524510** | Comisiones Bancarias | Gasto | Deudor |

### 5.5 IMPUESTOS Y CONTRIB. (529xxx)

| Código | Descripción | Tipo | Saldo Normal |
|--------|-------------|------|--------------|
| **529505** | Impuesto de Renta | Gasto | Deudor |
| **529510** | Impuesto Patrimonio | Gasto | Deudor |
| **529515** | Aportes a Seguridad Social | Gasto | Deudor |

---

## DIAGRAMA RÁPIDO DE CAJA MENOR

```
Recibo llega → Clasificar Concepto → Asignar Cuenta PUC

TRANSPORTE (taxi, pasaje, Uber)
    ↓
   513540 (Gastos de Transporte Urbano)

COMIDA/RESTAURANTE
    ↓
   513525 (Gastos de Alimentación)

PAPELERÍA/ÚTILES
    ↓
   519530 (Útiles y Papelería)

PEAJE
    ↓
   513545 (Gastos de Peajes)

ESTACIONAMIENTO/PARQUEO
    ↓
   513595 (Otros Gastos de Viaje)

GASOLINA/COMBUSTIBLE
    ↓
   513550 (Combustible y Lubricantes)

HOTEL/HOSPEDAJE
    ↓
   513520 (Gastos de Alojamiento)

ASEO/CAFÉ
    ↓
   519525 (Aseo y Cafetería)

NO ENCAJA EN NINGUNO
    ↓
   519595 (Otros Gastos) — REQUIERE REVISIÓN
```

---

## ASIENTOS CONTABLES TÍPICOS (EJEMPLOS)

### Legalizando Gasto de Transporte (Taxi)

```
Débito:  513540 (Gastos de Transporte)  $15,000
Crédito: 111010 (Caja Menor)                      $15,000
Concepto: Pasaje taxi Cra 45 → Parque Arvi
```

### Legalizando Gasto de Alimentación con Retención

```
Débito:  513525 (Gastos Alimentación)  $25,000
Débito:  233595 (Retención por Pagar)    $300  (1.2% ReteICA)
Crédito: 111010 (Caja Menor)                     $25,300
Concepto: Almuerzo en Restaurante XYZ
```

### Legalizando Compra de Papelería con IVA

```
Débito:  519530 (Útiles y Papelería)   $45,000
Débito:  240804 (IVA Descontable)       $8,550
Crédito: 111010 (Caja Menor)                     $53,550
Concepto: Papelería varios útiles de oficina
```

---

## NOTAS IMPORTANTES

- **Caja Menor (111010):** Siempre es la contra de los gastos legalizados
- **Gastos Viáticos (513xxx):** Cuentas especializa para viajes y movilización
- **Otros Gastos (519595):** Fallback cuando no encaja ninguna otra
- **IVA Descontable (240804):** Se usa solo si hay factura (no en caja menor típica)
- **Retenciones:** Se registran en 233595 (Retención por Pagar) o 233600 (ReteICA)

---

## CUENTAS QUE CAROLINA USUAL TOCA

En orden de frecuencia en cajas menores:

1. **111010** (Caja Menor) — Siempre contra
2. **513540** (Transporte) — Muy frecuente
3. **513525** (Alimentación) — Muy frecuente
4. **519530** (Papelería) — Frecuente
5. **513545** (Peajes) — Ocasional
6. **513550** (Combustible) — Ocasional
7. **519525** (Aseo/Café) — Ocasional
8. **513595** (Otros Viajes) — Fallback
9. **519595** (Otros Gastos) — Último recurso

---

## VALIDACIÓN

Antes de generar asiento, verificar:

- ¿La cuenta existe en este PUC?
- ¿El saldo normal es correcto? (Débito para gasto = sí)
- ¿La contra es siempre 111010 (Caja Menor)?
- ¿Si hay IVA/Retención, están en cuentas correctas?

Si algo falla → marcar para revisión de Carolina.
