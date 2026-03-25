# Ejemplo de Entrada — Legalizador de Cajas Menores

Batch de 8 recibos de caja menor para procesamiento en el skill.

---

## CONTEXTO

**Mes:** Marzo 2026
**Responsable:** Carolina (Contabilidad Galco)
**Fuente:** Recibos escaneados y desprendibles de gastos de tres viajeros

Estos son recibos típicos de caja menor que Carolina recibe semanalmente y necesita legalizar en Ilimitada.

---

## RECIBOS A PROCESAR

### RECIBO 1: Pasaje Taxi

```
RECIBO SIMPLE (Boleta de Máquina)

Concepto: Pasaje Taxi
Valor:    $15,000
Fecha:    20/03/2026
Lugar:    Cra 45 #12-30, Medellín
Detalle:  Traslado Galco → Parque Arvi (taller de cliente)
NIT:      No visible
Persona:  Javier (Técnico en Soldadura)
```

**Clasificación esperada:**
- Cuenta PUC: 513540 (Gastos de Transporte)
- ReteFuente: NO
- ReteICA: NO
- Tercero: TAXI-IND (genérico)

---

### RECIBO 2: Almuerzo Restaurante

```
RECIBO DE CAJA

Establecimiento: Restaurante El Corral
Concepto: Almuerzo ejecutivo (2 personas)
  - Pechuga grillada x2: $25,000
Fecha: 21/03/2026
Hora:  12:30
Lugar: Medellín, Centro
Valor Total: $25,000 (incluye IVA)
Nota: Reunión con cliente Constructora El Poblado
Persona: Carolina
```

**Clasificación esperada:**
- Cuenta PUC: 513525 (Gastos de Alimentación)
- ReteICA: $165 (0.66% de Medellín)
- ReteFuente: NO (valor bajo)
- Tercero: Restaurante El Corral (NIT 830.234.567-1 si en lista)

---

### RECIBO 3: Papelería y Útiles

```
FACTURA SIMPLIFICADA

Negocio: Papelería Jaramillo
Concepto: Útiles de Oficina
  - Resmas papel (2): $20,000
  - Bolígrafos caja (1): $15,000
  - Grapadora (1): $10,000
  Subtotal: $45,000
  IVA (19%): $8,550
  TOTAL: $53,550

Fecha: 22/03/2026
NIT Vendedor: 800.234.567-5
Dirección: Cra 30 #10-50, Itagüí
Persona: Javier (comprador)
```

**Clasificación esperada:**
- Cuenta PUC: 519530 (Útiles y Papelería)
- Cuenta IVA: 240804 (IVA Descontable)
- ReteFuente: NO (base $45k < $199.2k)
- ReteICA: NO (papelería, venta, no servicio)

---

### RECIBO 4: Peaje Autopista

```
COMPROBANTE DE PEAJE

Concepto: Peaje Autopista Norte
Fecha: 22/03/2026
Hora: 14:50
Ruta: Medellín → Bogotá (taller cliente)
Monto Pagado: $14,200
Concepto: Peaje tarjeta (día completo)
Persona: José (Ingeniero de Proyectos)
Nota: Viaje técnico a cliente en Bogotá
```

**Clasificación esperada:**
- Cuenta PUC: 513545 (Gastos de Peajes)
- ReteFuente: NO (típicamente exento)
- ReteICA: NO (peaje)
- Tercero: Peajes Autopista Norte

---

### RECIBO 5: Gasolina Estación

```
COMPROBANTE DE PAGO

Estación: Shell Itagüí
Concepto: Gasolina Extra
Fecha: 23/03/2026
Cantidad: 45 galones
Precio/galón: $1,777
Subtotal: $80,000
(IVA incluido en precio)
Placa Vehículo: GLC-445
Persona: Jorge (Comprador, viaje a proveedores)
```

**Clasificación esperada:**
- Cuenta PUC: 513550 (Combustible y Lubricantes)
- ReteFuente: NO (monto < base mínima)
- ReteICA: NO (combustible)
- Tercero: Estación Shell Itagüí (NIT 830.111.222-4 si en lista)

---

### RECIBO 6: Estacionamiento Centro

```
TIQUETE DE PARQUEADERO

Concepto: Parqueadero
Fecha: 23/03/2026
Hora Entrada: 08:00
Hora Salida: 17:00
Horas: 9 horas
Tarifa: $900/hora
Total: $8,000 (9 × 889)
Lugar: Centro Comercial La Candelaria, Medellín
Comprobante: Tiquete máquina

Nota: Reunión con proveedor de insumos metálicos
Persona: Javier
```

**Clasificación esperada:**
- Cuenta PUC: 513595 (Otros Gastos de Viaje)
- ReteFuente: NO
- ReteICA: NO (generalmente exento)
- Tercero: Parqueadero Centro Comercial (sin NIT típicamente)

---

### RECIBO 7: Hospedaje Hotel (Mayor Gasto)

```
FACTURA ELECTRÓNICA

Hotel: Hotel Plaza Medellín
Concepto: Hospedaje 1 noche
  - Habitación Doble Estándar: $150,000
  - Impuesto Hotelero 8%: $12,000
  - IVA 19%: $30,800
  TOTAL: $192,800

Fecha: 24/03/2026
Check-in: 14:30
Check-out: 10:30
NIT Hotel: 830.123.456-7
Dirección: Cra 43 #50-100, Medellín
Persona: Carolina (viaje a auditoría en sedes de clientes)
Factura: FE-2026-001234

Nota: Viaje de 1 día para auditoría en clientes. Hospedaje necesario por salida temprana.
```

**Clasificación esperada:**
- Cuenta PUC: 513520 (Gastos de Alojamiento)
- Cuenta IVA: 240804 (IVA Descontable)
- ReteFuente: NO (base $150k < $1,344.6k)
- ReteICA: NO (hospedaje, no sujeto típicamente)
- Base: $150,000

---

### RECIBO 8: Café y Snacks para Reunión

```
RECIBO DE CAJA

Establecimiento: Café & Snacks - Itagüí
Concepto: Café y pasteles para reunión de equipo
  - Café expreso x6: $12,000
  - Arepas y quesos x6: $6,000
  TOTAL: $18,000

Fecha: 24/03/2026
Hora: 09:30
Lugar: Cra 43 #10-50, Itagüí (Galco Oficina Principal)
Detalle: Desayuno reunión interna de alineación
Persona: Carolina (administrativo)
NIT Establecimiento: No visible
```

**Clasificación esperada:**
- Cuenta PUC: 519525 (Aseo y Cafetería)
- ReteICA: $216 (1.2% de Itagüí)
- ReteFuente: NO (monto bajo)
- Tercero: Café & Snacks Itagüí (si está en lista, usar; sino marcar)

---

## RESUMEN DE ENTRADA

| # | Concepto | Valor | Fecha | Cuenta | ReteFuente | ReteICA | Tercero |
|---|----------|-------|-------|--------|---|---|---|
| 1 | Taxi | $15,000 | 20/03 | 513540 | NO | NO | TAXI-IND |
| 2 | Restaurante | $25,000 | 21/03 | 513525 | NO | $165 | Restaurante |
| 3 | Papelería | $53,550 | 22/03 | 519530 | NO | NO | Papelería |
| 4 | Peaje | $14,200 | 22/03 | 513545 | NO | NO | Peaje |
| 5 | Gasolina | $80,000 | 23/03 | 513550 | NO | NO | Shell |
| 6 | Parqueo | $8,000 | 23/03 | 513595 | NO | NO | Parqueadero |
| 7 | Hotel | $192,800 | 24/03 | 513520 | NO | NO | Hotel |
| 8 | Café | $18,000 | 24/03 | 519525 | NO | $216 | Café & Snacks |
| **TOTAL** | | **$406,550** | | | **$0** | **$381** | |

---

## PLANTILLA ESPERADA (OUTPUT)

Cuando el skill procese estos recibos, debe generar:

```
Cuenta Débito;Cuenta Crédito;Fecha;Concepto;Tercero;NIT/CC;Valor Base;IVA;Retención;Valor Neto;Centro Costo
513540;111010;20/03/2026;Pasaje taxi Cra 45 → Parque Arvi;TAXI-IND;222222222;15000;0;0;15000;Técnico Soldadura
513525;111010;21/03/2026;Almuerzo Restaurante El Corral;Restaurante El Corral;830234567;25000;0;165;25165;Comercial
519530;111010;22/03/2026;Papelería y útiles de oficina;Papelería Jaramillo;800234567;45000;8550;0;53550;Administración
513545;111010;22/03/2026;Peaje Autopista Norte;Peajes;999999999;14200;0;0;14200;Viaje
513550;111010;23/03/2026;Gasolina Extra Estación Shell;Shell Itagüí;830111222;80000;0;0;80000;Viaje
513595;111010;23/03/2026;Parqueadero Centro Comercial;Parqueadero Centro;000000000;8000;0;0;8000;Viaje
513520;111010;24/03/2026;Hospedaje Hotel Plaza Medellín;Hotel Plaza;830123456;150000;30800;0;180800;Viaje
519525;111010;24/03/2026;Café y pasteles reunión interna;Café & Snacks;900345678;18000;0;216;18216;Administrativo
```

---

## ALERTAS ESPERADAS

- ⚠️ **Recibo 2:** ReteICA calculada (varía si es Medellín vs Itagüí)
- ⚠️ **Recibo 3:** Si hay factura, incluir IVA Descontable (240804)
- ⚠️ **Recibo 7:** Valor es significativo pero no supera ReteFuente (< $1.3M)
- ⚠️ **Recibo 8:** ReteICA se aplica si es Itagüí (1.2%)

---

## PRÓXIMOS PASOS PARA CAROLINA

1. Revisar plantilla generada en chat
2. Confirmar clasificaciones y retenciones
3. Descargar CSV
4. Cargar en Ilimitada > Herramientas > Carga Masiva > Documentos Contables
5. Guardar documentos soporte en archivo físico
