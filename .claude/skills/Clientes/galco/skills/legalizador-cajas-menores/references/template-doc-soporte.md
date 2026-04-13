# Template de Documento Soporte — DIAN

Formato estándar de documento contable soporte para Ilimitada y auditoría DIAN.

---

## ESTRUCTURA

Cada documento soporte tiene estos campos:

```
DOCUMENTO SOPORTE

Número:              [autogenerado o del recibo]
Fecha:               [DD/MM/YYYY]
Tipo de Documento:   [Recibo, Factura, Boleta, Otro]

TERCERO / PROVEEDOR:
Nombre:              [Establecimiento o Proveedor]
NIT/CC:              [Identificación]
Tipo Identificación: [NIT / CC / CE / Otro]
Dirección:           [Si aplica]

CONCEPTO DEL GASTO:
Descripción:         [Qué se gastó - detallado]
Categoría:           [Transporte, Alimentación, Papelería, etc.]
Justificación:       [Por qué fue necesario]

VALORES:
Base Gravable:       $[X.XXX]
IVA (19% si aplica): $[X.XXX]
Retenciones:         $[X.XXX]
  - ReteFuente:      $[X.XXX]
  - ReteICA:         $[X.XXX]
  - ReteIVA:         $[X.XXX]
TOTAL:               $[X.XXX]

CONTABILIZACIÓN:
Cuenta Débito (Gasto): [513540, 513525, etc.]
Cuenta Crédito (Caja): [111010 - Caja Menor]
Centro de Costo:       [Si aplica]

AUTORIZACIÓN:
Recibido por:        [Carolina - Contabilidad]
Fecha Legalización:  [DD/MM/YYYY]
Observaciones:       [Notas adicionales]
```

---

## EJEMPLO COMPLETO

```
DOCUMENTO SOPORTE

Número:              CS-20260324-001
Fecha:               24/03/2026
Tipo de Documento:   Recibo

TERCERO / PROVEEDOR:
Nombre:              Restaurante El Corral
NIT/CC:              Factura de Caja (sin NIT)
Tipo Identificación: Recibo de Pago
Dirección:           Cra 45 #12-50, Medellín

CONCEPTO DEL GASTO:
Descripción:         Almuerzo para equipo de trabajo - 2 personas
Categoría:           Alimentación (Viáticos)
Justificación:       Gasto de alimentación durante jornada de trabajo - viáticos

VALORES:
Base Gravable:       $25,000
IVA (19%):           $4,750
Retenciones:         $300 (ReteICA Medellín 1.2%)
TOTAL:               $29,450

CONTABILIZACIÓN:
Cuenta Débito (Gasto): 513525 - Gastos de Alimentación
Cuenta Crédito (Caja): 111010 - Caja Menor
Centro de Costo:       Área Administración

AUTORIZACIÓN:
Recibido por:        Carolina Gómez - Contabilidad
Fecha Legalización:  25/03/2026
Observaciones:       ReteICA por Medellín. Factura no disponible (recibo de caja).
```

---

## EJEMPLO CON SERVICIOS (MAYOR COMPLEJIDAD)

```
DOCUMENTO SOPORTE

Número:              CS-20260323-002
Fecha:               23/03/2026
Tipo de Documento:   Factura Electrónica

TERCERO / PROVEEDOR:
Nombre:              Hotel Plaza Medellín
NIT/CC:              830.123.456-7
Tipo Identificación: NIT
Dirección:           Calle 10 #45-67, Medellín

CONCEPTO DEL GASTO:
Descripción:         Hospedaje 1 noche - Habitación doble estándar
Categoría:           Alojamiento (Viáticos)
Justificación:       Gasto de hospedaje para jornada de trabajo fuera de ciudad

VALORES:
Base Gravable:       $180,000
IVA (19%):           $34,200
Retenciones:         $23,496 (ReteFuente 11% sobre servicios)
TOTAL FACTURA:       $237,696

Valor Neto a Pagar:  $214,200 (después retención)

CONTABILIZACIÓN:
Cuenta Débito (Gasto):  513520 - Gastos de Alojamiento
Cuenta Débito (IVA):    240804 - IVA Descontable
Cuenta Débito (Reten):  233595 - Retención por Pagar
Cuenta Crédito (Caja):  111010 - Caja Menor
Centro de Costo:        Área Producción

AUTORIZACIÓN:
Recibido por:        Carolina Gómez - Contabilidad
Fecha Legalización:  25/03/2026
Observaciones:       ReteFuente 11% aplicada (servicios de alojamiento).
                     Factura electrónica recibida e incluida en paquete.
```

---

## CAMPOS OBLIGATORIOS POR TIPO

### CAJA MENOR (Sin Factura / Recibo Simple)

- [x] Número
- [x] Fecha
- [x] Nombre Tercero
- [x] Concepto
- [x] Valores (Base)
- [x] Cuenta Contable
- [x] Observaciones

**NIT:** Opcional (muchos recibos no tienen NIT)

### SERVICIOS (Con Factura)

- [x] Número
- [x] Fecha
- [x] Nombre Tercero + NIT
- [x] Concepto
- [x] Valores (Base + IVA + Retenciones)
- [x] Cuenta Contable + IVA Descontable + Retención
- [x] Centro de Costo
- [x] Observaciones

### MATERIALES/INSUMOS (Con Factura)

- [x] Número
- [x] Fecha
- [x] Nombre Tercero + NIT
- [x] Concepto + Detalle de Items
- [x] Valores (Base + IVA)
- [x] Cuenta Contable + IVA Descontable
- [x] Centro de Costo
- [x] Observaciones

---

## REGLAS DE GENERACIÓN

1. **Número único:** Secuencial o basado en fecha (CS-YYYYMMDD-NNN)
2. **Fecha:** Día del gasto original (del recibo)
3. **Tercero:** Si no hay NIT, usar nombre del establecimiento
4. **Valores:** Siempre separar base, IVA, retenciones
5. **Cuenta Contable:** Debe estar en PUC de Galco
6. **Observaciones:** Incluir cualquier nota relevante para auditoría

---

## VALIDACIONES

Antes de generar documento, verificar:

- ¿La fecha es válida?
- ¿La cuenta contable existe en PUC?
- ¿Los valores suman correctamente? (Base + IVA - Retención = Total)
- ¿Las retenciones están justificadas? (Valor > base mínima)
- ¿Hay coherencia entre concepto y cuenta?

Si falla → marcar como "REQUIERE REVISIÓN MANUAL"
