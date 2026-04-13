# Reglas de Retenciones — DIAN Colombia 2026

Lógica de cálculo de retenciones en la fuente (ReteFuente, ReteICA, ReteIVA) para gastos de caja menor de Galco.

---

## PARÁMETROS VIGENTES 2026

| Parámetro | Valor |
|-----------|-------|
| **UVT 2026** | $49,800 COP |
| **Base Mínima ReteFuente (Servicios)** | 27 UVT = $1,344,600 |
| **Base Mínima ReteFuente (Compras)** | 4 UVT = $199,200 |
| **SMMLV 2026** | $1,300,000 COP |

---

## RETEFTE (RETENCIÓN EN LA FUENTE)

Retención obligatoria en el pago de servicios, calculada sobre la base gravable (sin IVA).

### SERVICIOS (Tarifa 11%)

**Aplica a:** Servicios profesionales, asesorías, consultoría, hospedaje, catering.

**Base Mínima:** 27 UVT = $1,344,600

**Cálculo:**

```
Si Valor Bruto >= $1,344,600:
   ReteFuente = Valor Bruto × 11%
Sino:
   ReteFuente = 0 (exento por monto bajo)

Ejemplo:
Hospedaje $180,000 < Base Mínima
→ ReteFuente = 0 (por ser pequeño)

Pero si es $1,500,000 (sí supera base mínima):
→ ReteFuente = $1,500,000 × 11% = $165,000
```

### COMPRAS NACIONALES (Tarifa 2.5%)

**Aplica a:** Compra de materias primas, insumos, mercancía.

**Base Mínima:** 4 UVT = $199,200

**Cálculo:**

```
Si Valor Bruto >= $199,200:
   ReteFuente = Valor Bruto × 2.5%
Sino:
   ReteFuente = 0 (exento por monto bajo)

Ejemplo:
Papelería $45,000 < Base Mínima
→ ReteFuente = 0

Pero si es $200,000 (sí supera):
→ ReteFuente = $200,000 × 2.5% = $5,000
```

### TRANSPORTE (Tarifa 3%)

**Aplica a:** Servicios de transporte, carga, fletes.

**Base Mínima:** 4 UVT = $199,200

**Nota:** En caja menor, taxis y pasajes típicamente NO aplican (recibos sin factura, montos bajos).

---

## RETEICA (IMPUESTO DE INDUSTRIA Y COMERCIO)

Retención sobre servicios realizados en el municipio. **Solo aplica en Itagüí (donde Galco está).**

### Tarifa Itagüí 2026: 1.2%

**Aplica a:**
- Restaurantes y catering
- Comercios
- Servicios (talleres, reparación, etc.)
- Hoteles y hospedaje

**NO aplica a:**
- Taxis y transporte urbano
- Combustible (gasolineras)
- Peajes

**Cálculo:**

```
ReteICA = Valor Total (incluye IVA) × Tarifa
ReteICA = Valor × 1.2%

Ejemplo:
Restaurante $25,000 (con IVA)
→ ReteICA = $25,000 × 1.2% = $300
```

**Nota especial:** Si el gasto es en **Medellín** u otra ciudad, usar tarifa de ese municipio (típicamente 0.66% en Medellín, variable). Para caja menor, asumir lugar del gasto.

---

## RETEIVA (RETENCIÓN DEL IVA)

Retención del Impuesto a las Ventas. Aplica en compras a proveedores responsables de IVA.

### Tarifa: 15% del IVA

**Aplica a:**
- Compras de materiales/insumos a responsables de IVA
- **NO en caja menor típica** (recibos simples sin factura)
- Sí si hay factura electrónica

**Cálculo:**

```
IVA del Proveedor = Base × 19%
ReteIVA = IVA × 15%

Ejemplo (Factura de Material):
Base: $100,000
IVA: $100,000 × 19% = $19,000
ReteIVA: $19,000 × 15% = $2,850
```

**En caja menor:** Casi nunca aplica (no hay factura). Incluir solo si el usuario proporciona factura explícitamente.

---

## MATRIZ DE DECISIÓN RÁPIDA

```
┌────────────────────┬─────────────┬────────────────┬──────────────────┐
│ CONCEPTO           │ TIPO GASTO  │ APLICA RETE    │ TARIFA / BASE MIN │
├────────────────────┼─────────────┼────────────────┼──────────────────┤
│ Taxi, Uber, Pasaje │ Transporte  │ NO (típico)    │ - |
│ Restaurante        │ Servicios   │ ReteICA 1.2%   │ - |
│ Almuerzo simple    │ Alimentación│ ReteICA (Itagüí)│ Si > 27 UVT |
│ Hotel, hospedaje   │ Servicios   │ ReteFuente 11% │ Base min. 27 UVT |
│ Papelería          │ Compras     │ NO (típico)    │ (recibo simple) |
│ Peaje              │ Transporte  │ NO             │ - |
│ Gasolina           │ Insumo      │ NO (típico)    │ (factura simple) |
│ Aseo/cafetería     │ Servicios   │ ReteICA (muni) │ Depende |
│ Servicios > $1.3M  │ Servicios   │ ReteFuente 11% │ Siempre |
│ Material > $200K   │ Compras+IVA │ ReteFuente 2.5%│ + ReteIVA si fact |
└────────────────────┴─────────────┴────────────────┴──────────────────┘
```

---

## EJEMPLOS DE CÁLCULO

### EJEMPLO 1: Taxi (Sin Retención)

```
Concepto:     Pasaje Taxi
Valor:        $15,000
ReteFuente:   NO (transporte urbano, monto bajo)
ReteICA:      NO (taxis exento)
Valor Neto:   $15,000

Asiento:
Débito:  513540 (Transporte)    $15,000
Crédito: 111010 (Caja Menor)               $15,000
```

### EJEMPLO 2: Restaurante (Con ReteICA)

```
Concepto:     Almuerzo Restaurante
Valor Bruto:  $25,000 (ya con IVA incluido)
ReteICA:      $25,000 × 1.2% = $300 (Itagüí)
Valor Neto:   $25,000 - $300 = $24,700

Asiento:
Débito:  513525 (Alimentación)      $25,000
Débito:  233600 (ReteICA x Pagar)       $300
Crédito: 111010 (Caja Menor)                    $25,300
```

### EJEMPLO 3: Papelería con Factura (Compra + IVA)

```
Concepto:     Papelería y útiles
Base:         $45,000
IVA (19%):    $8,550
Total:        $53,550

ReteFuente:   $45,000 < $199,200 → NO aplica
ReteIVA:      Depende si hay factura. En caja menor → NO

Asiento Simple (sin IVA Descontable):
Débito:  519530 (Papelería)       $53,550
Crédito: 111010 (Caja Menor)                $53,550

Asiento si hay Factura y se Descuenta IVA:
Débito:  519530 (Papelería)       $45,000
Débito:  240804 (IVA Descontable)  $8,550
Crédito: 111010 (Caja Menor)                $53,550
```

### EJEMPLO 4: Hospedaje > Base Mínima (ReteFuente)

```
Concepto:     Hotel Medellín
Base:         $180,000 (sin IVA, si los $180K son base)
IVA (19%):    $34,200
Total:        $214,200

ReteFuente:   $180,000 < $1,344,600 → NO aplica

Pero si fuera $1,500,000:
ReteFuente:   $1,500,000 × 11% = $165,000
Valor Neto:   $1,500,000 - $165,000 = $1,335,000

Asiento:
Débito:  513520 (Alojamiento)          $1,500,000
Débito:  240804 (IVA Descontable)        $285,000
Débito:  233595 (ReteFuente x Pagar)    $165,000
Crédito: 111010 (Caja Menor)                        $1,950,000
```

---

## REGLAS PARA GALCO (METALÚRGICA)

### En Caja Menor Típica

**Retenciones MÁS COMUNES:**
- ReteICA 1.2% (si gasto en Itagüí en comercio/servicios)
- ReteFuente 11% (raro — solo si servicios > $1.3M)

**Retenciones RARAS:**
- ReteFuente 2.5% (compras usualmente menores a $199K)
- ReteIVA (necesita factura, caja menor típicamente NO)

### Criterio Simple

**"Si duda → Preguntar a Carolina"**

No es mejor estar 100% correcto en retención que marcar para revisión manual.

---

## VALIDACIÓN ANTES DE CALCULAR

1. ¿Cuál es el valor exacto? (Base sin IVA si aplica)
2. ¿Supera la base mínima?
3. ¿Hay factura o solo recibo simple?
4. ¿En qué ciudad fue el gasto?
5. ¿Hay IVA o es exento?

Si falta alguno → **no asumir, preguntar.**

---

## NOTAS IMPORTANTES

- **UVT cambia cada año.** Actualizar en enero de cada año.
- **Retenciones se pagan en DIAN.** Galco debe declarar y pagar.
- **ReteICA es municipal.** Diferentes ciudades tienen diferentes tarifas.
- **En duda, no descartar.** Es mejor marcar para revisión que dejar una retención sin registrar.
