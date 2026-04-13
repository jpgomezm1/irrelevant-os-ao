# Ejemplo de Entrada — Generador de Facturas

Batch de 3 remisiones de producción de Jenguar para conversión a facturas.

---

## CONTEXTO

**Mes:** Marzo 2026
**Responsable:** Jorge (Comprador) / Carolina (Contabilidad)
**Fuente:** Sistema Jenguar (software de producción de Galco)
**Objetivo:** Convertir remisiones de producción en facturas para clientes

Estas son remisiones típicas que Galco genera cuando completa un proyecto/trabajo y está listo para facturar al cliente.

---

## REMISIÓN 1: Constructora El Poblado

```
═══════════════════════════════════════════════════════
JENGUAR — REMISIÓN DE PRODUCCIÓN
═══════════════════════════════════════════════════════

Número Remisión:     4521
Fecha Remisión:      24/03/2026
Fecha Entrega:       24/03/2026
Estado:              COMPLETADA

CLIENTE:
  Nombre:            Constructora El Poblado S.A.S
  NIT:               900.567.890-1
  Dirección:         Calle 44 #80-125, Medellín
  Contacto:          Ing. Roberto Vélez
  Teléfono:          604-4445555
  Email:             proyectos@constructorapoblado.com

PROYECTO:
  Nombre:            Estructura Edificio Nueva Oficina
  Descripción:       Fabricación e instalación estructura metálica
  Ubicación:         Medellín, Zona Industrial

ÍTEMS PRODUCIDOS:

1. Fabricación estructura metálica estándar
   Descripción:      Marco estructural acero corriente
   Cantidad:         50
   Unidad:           m²
   Precio Unit:      $200,000/m²
   Subtotal:         $10,000,000
   Concepto:         FAB-ESTR-001

2. Soldadura GMAW acero al carbón (de ítems)
   Descripción:      Soldadura costuras estructurales
   Cantidad:         200
   Unidad:           Metro lineal
   Precio Unit:      $100,000/m
   Subtotal:         $2,000,000
   Concepto:         SOL-EST-002

3. Servicio instalación estructura
   Descripción:      Instalación en sitio, alineamiento
   Cantidad:         1
   Unidad:           Día (3 técnicos)
   Precio Unit:      $1,500,000
   Subtotal:         $1,500,000
   Concepto:         INS-MON-001

TOTAL BRUTO:         $13,500,000
IVA (19%):           $2,565,000
RETENCIÓN:           $0
TOTAL FACTURACIÓN:   $16,065,000

CONDICIONES:
  Plazo de Pago:     30 días
  Forma de Pago:     Transferencia bancaria
  Entrega:           Completada en sitio
  Notas:             Cliente satisfecho con calidad.
                     Proyecto cumplido a tiempo.

═══════════════════════════════════════════════════════
```

---

## REMISIÓN 2: Industrias Metálicas del Valle

```
═══════════════════════════════════════════════════════
JENGUAR — REMISIÓN DE PRODUCCIÓN
═══════════════════════════════════════════════════════

Número Remisión:     4522
Fecha Remisión:      25/03/2026
Fecha Entrega:       25/03/2026
Estado:              COMPLETADA

CLIENTE:
  Nombre:            Industrias Metálicas del Valle S.A.
  NIT:               830.456.789-3
  Dirección:         Cra 50 #10-80, Cali
  Contacto:          Ing. Diana Rodríguez
  Teléfono:          602-2223333
  Email:             ventas@industriasmetvalley.com

PROYECTO:
  Nombre:            Servicio Maquinado Lote Custom
  Descripción:       Maquinado de precisión 50 piezas
  Ubicación:         Taller Galco, Itagüí

ÍTEMS PRODUCIDOS:

1. Servicio maquinado general taller (lote piezas)
   Descripción:      Fresado y torneado 50 piezas acero
   Cantidad:         20
   Unidad:           Hora
   Precio Unit:      $150,000/hora
   Subtotal:         $3,000,000
   Concepto:         MAQ-GRL-001

2. Servicio maquinado CNC (acabado)
   Descripción:      Acabado CNC precisión ±0.05
   Cantidad:         8
   Unidad:           Hora
   Precio Unit:      $250,000/hora
   Subtotal:         $2,000,000
   Concepto:         MAQ-CNC-001

3. Inspección y control de calidad
   Descripción:      Verificación dimensional y tolerancias
   Cantidad:         1
   Unidad:           Servicio
   Precio Unit:      $500,000
   Subtotal:         $500,000
   Concepto:         OTR-SVS-002

TOTAL BRUTO:         $5,500,000
IVA (19%):           $1,045,000
RETENCIÓN:           $0
TOTAL FACTURACIÓN:   $6,545,000

CONDICIONES:
  Plazo de Pago:     15 días (cliente preferente)
  Forma de Pago:     Transferencia bancaria
  Entrega:           Despachado a Cali (cliente retira)
  Notas:             Piezas dentro de especificación.
                     Cliente requiere entrega rápida siguiente mes.

═══════════════════════════════════════════════════════
```

---

## REMISIÓN 3: Oleoducto Central

```
═══════════════════════════════════════════════════════
JENGUAR — REMISIÓN DE PRODUCCIÓN
═══════════════════════════════════════════════════════

Número Remisión:     4523
Fecha Remisión:      24/03/2026
Fecha Entrega:       24/03/2026
Estado:              COMPLETADA

CLIENTE:
  Nombre:            Oleoducto Central S.A.
  NIT:               830.234.567-9
  Dirección:         Cra 7 #123-45, Barrancabermeja
  Contacto:          Ing. Carlos Martínez
  Teléfono:          607-7778888
  Email:             compras@oleductocentral.com.co

PROYECTO:
  Nombre:            Fabricación y Soldadura Tanque Presión
  Descripción:       Tanque de almacenamiento + servicio soldadura
  Ubicación:         Barrancabermeja

ÍTEMS PRODUCIDOS:

1. Fabricación tanque acero inoxidable
   Descripción:      Tanque presión 500L acero inox 304
   Cantidad:         1
   Unidad:           Unidad
   Precio Unit:      $4,000,000
   Subtotal:         $4,000,000
   Concepto:         FAB-TANK-002

2. Soldadura acero inoxidable (costuras tanque)
   Descripción:      Soldadura TIG especializada acero inox
   Cantidad:         15
   Unidad:           Metro lineal
   Precio Unit:      $150,000/m
   Subtotal:         $2,250,000
   Concepto:         SOL-EST-003

3. Servicio alineamiento y nivelación
   Descripción:      Verificación con equipo topográfico
   Cantidad:         4
   Unidad:           Hora
   Precio Unit:      $200,000/hora
   Subtotal:         $800,000
   Concepto:         INS-MON-002

4. Puesta en marcha y pruebas
   Descripción:      Presurización y testing sistema
   Cantidad:         1
   Unidad:           Día
   Precio Unit:      $1,200,000
   Subtotal:         $1,200,000
   Concepto:         INS-MON-003

TOTAL BRUTO:         $8,250,000
IVA (19%):           $1,567,500
RETENCIÓN:           $0
TOTAL FACTURACIÓN:   $9,817,500

CONDICIONES:
  Plazo de Pago:     45 días (acuerdo especial obra)
  Forma de Pago:     Transferencia bancaria
  Entrega:           Instalado en planta cliente
  Notas:             Cliente crítico — proyecto de expansión.
                     Ejecutado bajo estrictos controles de calidad.
                     Certificado de prueba de presión adjunto.

═══════════════════════════════════════════════════════
```

---

## RESUMEN DE REMISIONES

| # | Remisión | Cliente | Valor Bruto | IVA | Total |
|---|----------|---------|----------|-----|-------|
| 1 | 4521 | Constructora El Poblado | $13,500,000 | $2,565,000 | $16,065,000 |
| 2 | 4522 | Industrias Metálicas del Valle | $5,500,000 | $1,045,000 | $6,545,000 |
| 3 | 4523 | Oleoducto Central | $8,250,000 | $1,567,500 | $9,817,500 |
| **TOTAL** | | | **$27,250,000** | **$5,177,500** | **$32,427,500** |

---

## DESGLOSE POR TIPO DE SERVICIO

| Servicio | Cantidad | Valor | Cuenta PUC |
|----------|----------|-------|-----------|
| Fabricación Metálica | 50m² + 1 tanque | $18,000,000 | 413536 |
| Soldadura | 215 m lineales | $4,250,000 | 413545 |
| Maquinado | 28 horas | $5,000,000 | 413540 |
| Servicios Instalación/Alineamiento | 5 horas + 1 día | $3,700,000 | 413570 |
| Control de Calidad | 1 servicio | $500,000 | 413595 |

---

## ASPECTOS ESPECIALES A VALIDAR

### Remisión 4521 (Constructora El Poblado)

- ✓ Cliente está en directorio de frecuentes
- ✓ Todos los productos están en catálogo
- ✓ Régimen: Responsable IVA (aplica IVA 19%)
- ✓ Plazo: 30 días (normal)
- ✓ Instalación incluida en precio

### Remisión 4522 (Industrias Metálicas)

- ✓ Cliente frecuente (pequeño contribuyente posible — verificar)
- ✓ Productos en catálogo (servicios maquinado)
- ✓ Régimen: Responsable IVA
- ✓ Plazo: 15 días (preferente)
- ⚠️ Nota: Cliente requiere otra remisión próximamente

### Remisión 4523 (Oleoducto Central)

- ✓ Cliente crítico — volumen alto anual
- ✓ Todos los productos en catálogo (tanque + soldadura especializada)
- ✓ Régimen: Responsable IVA
- ✓ Plazo: 45 días (especial — obra)
- ✓ Certificados incluidos en entrega

---

## PLANTILLA ESPERADA (OUTPUT)

Cuando el skill procese estas remisiones, debe generar facturas:

```
Remisión;Factura;Fecha;Cliente;NIT;Cuenta Débito;Cuenta Crédito;Valor Base;IVA;Retención;Valor Total
4521;GLC-1001;24/03/2026;Constructora El Poblado;900567890;130505;413536;10000000;1900000;0;11900000
4521;GLC-1001;24/03/2026;Constructora El Poblado;900567890;130505;413545;2000000;380000;0;2380000
4521;GLC-1001;24/03/2026;Constructora El Poblado;900567890;130505;413570;1500000;285000;0;1785000
4522;GLC-1002;25/03/2026;Industrias Metálicas del Valle;830456789;130505;413540;3000000;570000;0;3570000
4522;GLC-1002;25/03/2026;Industrias Metálicas del Valle;830456789;130505;413540;2000000;380000;0;2380000
4522;GLC-1002;25/03/2026;Industrias Metálicas del Valle;830456789;130505;413595;500000;95000;0;595000
4523;GLC-1003;24/03/2026;Oleoducto Central;830234567;130505;413536;4000000;760000;0;4760000
4523;GLC-1003;24/03/2026;Oleoducto Central;830234567;130505;413545;2250000;427500;0;2677500
4523;GLC-1003;24/03/2026;Oleoducto Central;830234567;130505;413570;2000000;380000;0;2380000
```

---

## ALERTAS Y NOTAS

- ✓ Todos los clientes existen en directorio
- ✓ Todos los productos están catalogados
- ✓ Régimen tributario confirmado para cada cliente
- ✓ IVA 19% aplica a todos
- ✓ Sin retenciones en venta (clientes son Responsables IVA)
- ⚠️ Números de factura GLC-1001, GLC-1002, GLC-1003 → verificar con Carolina que sean secuenciales

---

## PRÓXIMOS PASOS PARA CAROLINA

1. Revisar facturas generadas en chat
2. Confirmar números de factura (próximo secuencial)
3. Confirmar mapeo de productos a cuentas
4. Descargar CSV
5. Cargar en Ilimitada > Herramientas > Carga Masiva > Facturas de Venta
6. Generar archivo de remisión → factura para trazabilidad
