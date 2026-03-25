# Ejemplo de Entrada — Creador de Terceros

Mensaje de WhatsApp de Jorge (comprador de Galco) a Carolina (contable), pidiendo que cree 4 terceros nuevos.

---

## MENSAJE ORIGINAL (WhatsApp)

```
Carolina, necesito que crees estos proveedores y clientes nuevos en Ilimitada:

PROVEEDORES:

1) AcerosCOL S.A.S
   NIT: 900.456.789-1
   Dirección: Cra 43 #10-50 Bodega 8 Itagüí
   Teléfono: 604-3721456
   Email: aceros@aceroscol.com

2) Pedro Martínez
   CC: 71.234.567
   Celular: 310-4567890
   Vive en Bello
   Es soldador independiente
   No tiene dirección, lo veo cuando necesito servicios

CLIENTES:

3) FerreMax Ltda
   NIT: 800.123.456-7
   Calle 30 #50-20 Medellín
   Teléfono: 604-2345678
   Email: ventas@ferremax.com
   Dicen que necesitan facturación mensual

4) María López
   CC: 43.567.890
   Celular: 321-7654321
   Vive en Envigado
   Es contadora freelance que hace servicios puntuales

Gracias! Avisos cuando estén cargados
```

---

## ANÁLISIS DEL MENSAJE

### Información Proporcionada

**PROVEEDOR 1 — AcerosCOL S.A.S (Jurídica)**
- ✓ Tipo: Proveedor
- ✓ NIT: 900.456.789-1 (empieza 900 = Gran Contribuyente)
- ✓ Razón Social: AcerosCOL S.A.S
- ✓ Dirección: Cra 43 #10-50 Bodega 8
- ✓ Ciudad: Itagüí
- ✓ Teléfono: 604-3721456
- ✓ Email: aceros@aceroscol.com
- ✗ Banco, tipo cuenta, plazo: NO PROPORCIONADOS
- ✗ Actividad CIIU: NO ESPECIFICADA

**PROVEEDOR 2 — Pedro Martínez (Natural)**
- ✓ Tipo: Proveedor (soldador independiente)
- ✓ CC: 71.234.567
- ✓ Nombre: Pedro Martínez
- ✓ Celular: 310-4567890
- ✓ Ciudad: Bello
- ✗ Dirección: NO TIENE (es independiente)
- ✗ Email: NO PROPORCIONADO
- ✗ Banco: NO PROPORCIONADO

**CLIENTE 3 — FerreMax Ltda (Jurídica)**
- ✓ Tipo: Cliente
- ✓ NIT: 800.123.456-7 (empieza 800 = Pequeño Contrib.)
- ✓ Razón Social: FerreMax Ltda
- ✓ Dirección: Calle 30 #50-20
- ✓ Ciudad: Medellín
- ✓ Teléfono: 604-2345678
- ✓ Email: ventas@ferremax.com
- ✗ Actividad CIIU: NO ESPECIFICADA
- ~ Frecuencia: Facturación mensual (info comercial, no tributaria)

**CLIENTE 4 — María López (Natural)**
- ✓ Tipo: Cliente (contadora freelance)
- ✓ CC: 43.567.890
- ✓ Nombre: María López
- ✓ Celular: 321-7654321
- ✓ Ciudad: Envigado
- ✗ Dirección: NO ESPECIFICADA
- ✗ Email: NO PROPORCIONADO
- ✗ Actividad CIIU: NO ESPECIFICADA

---

## CAMPOS FALTANTES A SOLICITAR

### Para Pedro Martínez (Proveedor Natural)

- **Dirección:** "Dónde te veo usualmente o dirección para facturación?" → Si no tiene, usar ciudad + "Por confirmar"
- **Email:** "¿Tiene email o solo celular?"
- **Actividad CIIU:** "¿Es soldador de estructuras metálicas (2511) o soldadura general?"

### Para FerreMax Ltda (Cliente Jurídica)

- **Actividad CIIU:** "¿Qué tipo de ferretería? (Venta al por mayor = 4669, o específica?)"
- **Régimen Tributario:** "¿Es Responsable de IVA? (NIT 800-823 puede no serlo)"

### Para María López (Cliente Natural)

- **Dirección:** "¿Tiene oficina en Envigado o trabaja remoto?"
- **Email:** "¿Email de contacto?"
- **Actividad CIIU:** "¿Contabilidad general (6910) o asesorías (7020)?"

---

## INFERENCIA TRIBUTARIA (AUTOMÁTICA)

### AcerosCOL S.A.S (NIT 900.456.789-1)

```
NIT empieza con 900 → Gran Contribuyente
↓
Tipo Persona: Jurídica
Régimen: Responsable IVA (siempre)
Tipo Contribuyente: SAS
Responsabilidades: O-23 (Gran Contribuyente)
Actividad CIIU: 2439 (fabricación metal) — asumir por naturaleza del negocio
```

### Pedro Martínez (CC 71.234.567)

```
CC → Persona Natural
Independiente (soldador) → Régimen Común
↓
Tipo Persona: Natural
Régimen: Régimen Común
Tipo Contribuyente: Trabajador Independiente
Responsabilidades: O-47 (Autorretenedor)
Actividad CIIU: 2511 (soldadura estructuras) — asumir
```

### FerreMax Ltda (NIT 800.123.456-7)

```
NIT empieza con 800 → Pequeño Contribuyente
Pero es empresa (Ltda) → Por defecto, Responsable IVA
↓
Tipo Persona: Jurídica
Régimen: Responsable IVA (asumir por ser empresa)
Tipo Contribuyente: Sociedad Limitada
Responsabilidades: O-13
Actividad CIIU: 4669 (comercio mayorista) — asumir por ferretería
```

### María López (CC 43.567.890)

```
CC → Persona Natural
Contadora (servicios) → Régimen Común (a menos que venda > 40 SMMLV)
↓
Tipo Persona: Natural
Régimen: Régimen Común
Tipo Contribuyente: Profesional
Responsabilidades: O-47 (Autorretenedor, pues es independiente)
Actividad CIIU: 6910 (servicios contables)
```

---

## NORMALIZACIÓN DE DATOS

| Campo | Original | Normalizado |
|---|---|---|
| AcerosCOL NIT | 900.456.789-1 | 900456789 |
| AcerosCOL DV | (inferido) | 1 |
| Pedro Teléfono | 310-4567890 | 3104567890 |
| FerreMax NIT | 800.123.456-7 | 800123456 |
| FerreMax DV | (inferido) | 7 |
| FerreMax Teléfono | 604-2345678 | 6042345678 |
| María Teléfono | 321-7654321 | 3217654321 |

---

## CÓDIGOS DANE

| Tercero | Ciudad | Código DANE |
|---|---|---|
| AcerosCOL | Itagüí | 05360 |
| Pedro Martínez | Bello | 05088 |
| FerreMax | Medellín | 05001 |
| María López | Envigado | 05266 |

---

## PLANTILLA FINAL (RESULTADO ESPERADO)

Cuando se ejecute el skill, debe generar esta tabla lista para carga en Ilimitada:

```
Tipo Documento;Número Documento;DV;Primer Nombre;Segundo Nombre;Primer Apellido;Segundo Apellido;Razón Social;Dirección;Ciudad (DANE);Departamento;Teléfono;Email;Tipo Persona;Régimen;Tipo Contribuyente;Actividad Económica CIIU;Responsabilidades Fiscales;Banco;Tipo Cuenta;Número Cuenta;Forma de Pago;Plazo
NIT;900456789;1;;;AcerosCOL S.A.S.;Cra 43 #10-50 Bodega 8;05360;Antioquia;6043721456;aceros@aceroscol.com;Jurídica;Responsable IVA;SAS;2439;O-23;;;;;;;
CC;71234567;;Pedro;;Martínez;;Por confirmar;05088;Antioquia;3104567890;;Natural;Régimen Común;Trabajador Independiente;2511;O-47;;;;;;;
NIT;800123456;7;;;FerreMax Ltda.;Calle 30 #50-20;05001;Antioquia;6042345678;ventas@ferremax.com;Jurídica;Responsable IVA;Sociedad Limitada;4669;O-13;;;;;;;
CC;43567890;;María;;López;;Por confirmar;05266;Antioquia;3217654321;;Natural;Régimen Común;Profesional;6910;O-47;;;;;;;
```

**Alertas para Carolina:**

- ⚠️ Pedro Martínez: Dirección faltante (usa "Por confirmar")
- ⚠️ Pedro Martínez: Email no proporcionado
- ⚠️ María López: Dirección faltante (usa "Por confirmar")
- ⚠️ María López: Email no proporcionado
- ⚠️ AcerosCOL: Datos bancarios no proporcionados
- ⚠️ Todos: Verificar CIIU —se asumieron valores por actividad principal

---

## Notas de Ejecución

1. **Preguntar datos faltantes** a Carolina antes de generar plantilla
2. **Mostrar inferencia tributaria** para confirmación
3. **Normalizar formatos** (NIT sin puntos, teléfonos 10 dígitos)
4. **Mostrar plantilla en chat** antes de guardar archivo
5. **Guardar archivo** como `carga-terceros-mixto-20260324.csv`
