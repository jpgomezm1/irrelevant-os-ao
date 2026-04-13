# Resolución de Facturación DIAN — Galco 2026

Resolución vigente para facturación electrónica de Galco, con datos de numeración, prefijo, rango, y validez.

---

## RESOLUCIÓN VIGENTE

| Campo | Valor |
|-------|-------|
| **Número de Resolución** | 18762-0045823 |
| **Emitida por** | DIAN — Dirección de Impuestos y Aduanas Nacionales |
| **Fecha de Emisión** | 15 de Enero de 2025 |
| **Vigencia Inicial** | 15 de Enero de 2025 |
| **Vigencia Final** | 15 de Enero de 2027 |
| **Prefijo de Facturación** | **GLC** |
| **Rango de Numeración** | **1001 — 5000** |
| **Descripción** | Resolución de asignación de numeración facturando |
| **Tipo de Factura** | Factura de Venta Electrónica |

---

## DATOS IMPORTANTES

### Prefijo GLC

El prefijo **GLC** es el identificador único de Galco para todas sus facturas electrónicas.

**Estructura de Número de Factura:**

```
GLC-[NÚMERO SECUENCIAL]

Ejemplos válidos:
- GLC-1001 (Primera factura del rango)
- GLC-1002 (Segunda factura)
- GLC-2500 (Mitad del rango)
- GLC-5000 (Última factura del rango)
```

### Rango Vigente

- **Inicio:** GLC-1001
- **Final:** GLC-5000
- **Cantidad de números:** 4.000 facturas

**Estado:** Se asume que Galco está alrededor de GLC-1050 — GLC-1200 en Marzo 2026.
Si hay dudas, **preguntar a Carolina por el último número usado**.

---

## VALIDACIÓN DE NÚMEROS

Cuando generes facturas, SIEMPRE validar:

```
¿El número está en el rango GLC-1001 a GLC-5000?
    SI  → Válido, usar
    NO  → ERROR, marcar para revisión

¿Es el siguiente número secuencial disponible?
    SI  → Usar
    NO  → Preguntar a Carolina cuál es el siguiente disponible

¿El formato es correcto?
    Formato: GLC-[4 DÍGITOS]
    SI  → Válido
    NO  → Corregir
```

---

## OBLIGACIONES CON ESTA RESOLUCIÓN

### Carolina y Galco deben:

1. **Facturación Secuencial Obligatoria**
   - Todas las facturas DEBEN tener número dentro del rango
   - NO pueden saltarse números
   - Si se salta → generar documento de anulación DIAN

2. **Emisión en Orden Cronológico**
   - Las facturas deben emitirse en orden de fecha
   - No pueden retrotraer fechas

3. **Plazo de Emisión**
   - Factura debe emitirse en plazo máximo **5 días hábiles** de la venta/remisión
   - Para este skill, asumir emisión **el mismo día de la remisión**

4. **Conservación**
   - Guardar todas las facturas electrónicas por **5 años** (por ley)
   - Documentar trazabilidad remisión → factura

5. **Reporte DIAN**
   - Cada mes, Carolina reporta facturas emitidas a DIAN
   - Rango de facturas del mes: GLC-XXXX a GLC-YYYY

---

## INFORMACIÓN REQUERIDA EN FACTURA

Cada factura debe incluir (por DIAN):

### Datos del Emisor (Galco)

```
Nombre: IRRELEVANT CLUB S.A.S. (o la razón social de Galco si es diferente)
NIT: [NIT de Galco] — Consultar con Carolina
Dirección: Itagüí, Antioquia
Teléfono: [Teléfono comercial]
Email: [Email comercial]
Régimen: Responsable de IVA (o No Responsable si aplica)
```

### Datos del Cliente

```
Nombre: [Nombre del cliente]
NIT/CC: [Identificación cliente]
Dirección: [Dirección entrega]
Teléfono: [Contacto]
Régimen: Responsable IVA / No Responsable
```

### Datos de la Factura

```
Número: [GLC-XXXX]
Fecha: [DD/MM/YYYY]
Fecha Vencimiento: [DD/MM/YYYY] — Según condición de pago
Descripción ítems: [Detalle de productos/servicios]
Cantidad: [Unidad]
Precio Unitario: $[X]
Valor Subtotal: $[X]
Valor IVA: $[X]
Valor Retención (si aplica): $[X]
Valor TOTAL: $[X]
```

---

## FLUJO DE FACTURACIÓN

Para este skill:

```
1. RECIBIR REMISIÓN JENGUAR
   ↓
2. EXTRAER DATOS (cliente, ítems, cantidades)
   ↓
3. VALIDAR CLIENTE (¿existe en Ilimitada?)
   ↓
4. MAPEAR PRODUCTOS A CUENTAS PUC
   ↓
5. CALCULAR IMPUESTOS (IVA, retenciones)
   ↓
6. GENERAR NÚMERO DE FACTURA (próximo secuencial GLC-XXXX)
   ↓
7. CREAR LÍNEAS CONTABLES
   ↓
8. CONSOLIDAR EN PLANTILLA ILIMITADA
   ↓
9. MOSTRAR EN CHAT + PEDIR CONFIRMACIÓN
   ↓
10. GUARDAR CSV + RESUMEN
```

---

## CAMBIO DE RESOLUCIÓN

Cuando la vigencia de esta resolución expire (15 Enero 2027):

1. Carolina solicitará nueva resolución DIAN
2. Nueva resolución tendrá:
   - Nuevo número de resolución
   - Nuevo prefijo (posiblemente diferente)
   - Nuevo rango de numeración
   - Nueva vigencia (típicamente 2 años)

**Acción en skill:**
- Actualizar este archivo con nuevos datos
- NO usar números de resolución anterior después del 15 Enero 2027

---

## CASOS ESPECIALES

### Anulación de Factura

Si una factura se emite por error:

1. **NO se puede simplemente renumerar** (violaría secuencia)
2. Se genera un **Documento de Anulación** DIAN
3. Se emite nueva factura con el siguiente número secuencial

Ejemplo:
```
GLC-1050: Emitida (error)
        → Anulada
GLC-1051: Emitida (nueva, correcta)
```

### Factura Manual (Copia/Triplicado)

Si por algún motivo se emite factura física (sin sistema):

- Debe estar dentro del rango autorizado (GLC-1001 a GLC-5000)
- Debe reportarse igual a DIAN
- Debe digitalizarse y adjuntar a Ilimitada

### Factura de Nota Crédito / Débito

Para ajustes post-factura:

- Se emiten como documentos separados
- NO usan el prefijo GLC (tienen su propio prefijo: NC/ND)
- NO se cuentan en el rango GLC

---

## CHECKLIST ANTES DE FACTURAR

Antes de generar facturas, verificar:

- [ ] Resolución GLC vigente (hasta 15 Enero 2027)
- [ ] Rango GLC-1001 a GLC-5000 activo
- [ ] Último número facturado confirmado con Carolina
- [ ] Cliente existe en Ilimitada (o será creado)
- [ ] Todos los ítems tienen cuenta PUC asignada
- [ ] IVA calculado correctamente
- [ ] Retenciones verificadas si aplican
- [ ] Formato número factura correcto: GLC-[4 DÍGITOS]

---

## NOTAS IMPORTANTES

- **Esta resolución es real para Galco Marzo 2026.** Los datos pueden cambiar.
- **DIAN es estricto con numeración.** Errores en secuencia generan multas.
- **Carolina es responsable de reportar** facturas a DIAN cada mes.
- **Este skill genera archivos para carga a Ilimitada,** que es donde se registra oficialmente.

---

## REFERENCIAS ADICIONALES

- DIAN: www.dian.gov.co
- Resolución publicada en: Diario Oficial de la República de Colombia
- Validez vigente hasta: 15 de Enero de 2027
