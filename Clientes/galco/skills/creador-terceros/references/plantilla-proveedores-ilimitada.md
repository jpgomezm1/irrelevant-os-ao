# Plantilla de Carga de Proveedores — Ilimitada

Estructura exacta esperada para carga masiva de proveedores en Ilimitada.

---

## Columnas Obligatorias

| Columna | Tipo | Formato | Ejemplo | Notas |
|---------|------|---------|---------|-------|
| **Tipo Documento** | Texto | CC / NIT / CE | NIT | Identificador del tipo |
| **Número Documento** | Número | XXXXXXXXX (sin puntos) | 800123456 | Sin puntos ni dígito verificación |
| **DV** | Número | 0-9 | 7 | Dígito verificación (solo NIT) |
| **Primer Nombre** | Texto | Máx 30 caracteres | María | Obligatorio si persona natural |
| **Segundo Nombre** | Texto | Máx 30 caracteres | Isabel | Opcional |
| **Primer Apellido** | Texto | Máx 30 caracteres | López | Obligatorio si persona natural |
| **Segundo Apellido** | Texto | Máx 30 caracteres | García | Opcional |
| **Razón Social** | Texto | Máx 100 caracteres | FerreMax Ltda. | Obligatorio si persona jurídica |
| **Dirección** | Texto | Máx 100 caracteres | Calle 30 #50-20 | Obligatorio |
| **Ciudad (código DANE)** | Número | 5 dígitos | 05001 | Código DANE de Medellín |
| **Departamento** | Texto | Máx 30 caracteres | Antioquia | Obligatorio |
| **Teléfono** | Número | 10 dígitos | 6042345678 | Recomendado |
| **Email** | Texto | Email válido | ventas@ferremax.com | Recomendado |
| **Tipo Persona** | Texto | Natural / Jurídica | Jurídica | Obligatorio |
| **Régimen** | Texto | Responsable IVA / No Responsable | Responsable IVA | Obligatorio |
| **Tipo Contribuyente** | Texto | Ver lista abajo | Sociedad Limitada | Obligatorio |
| **Actividad Económica CIIU** | Número | 4 dígitos | 4669 | Código CIIU de actividad |
| **Responsabilidades Fiscales** | Texto | Ver códigos abajo | O-13 | Obligatorio |
| **Banco** | Texto | Máx 50 caracteres | Banco de Occidente | Datos de pago |
| **Tipo Cuenta** | Texto | Corriente / Ahorros | Corriente | Tipo de cuenta bancaria |
| **Número Cuenta** | Número | Sin espacios | 12345678901234567 | Número de cuenta bancaria |
| **Forma de Pago** | Texto | Ver lista abajo | Transferencia | Preferencia de pago |
| **Plazo** | Número | Días | 30 | Días de crédito otorgados |

---

## Valores Permitidos — Tipo Contribuyente

Para persona jurídica:
- Sociedad Anónima (S.A.)
- Sociedad por Acciones Simplificada (SAS)
- Sociedad Limitada (Ltda.)
- Sociedad en Comandita
- Empresa Unipersonal (E.U.)
- Cooperativa

Para persona natural:
- Trabajador Independiente
- Comerciante
- Profesional

---

## Valores Permitidos — Responsabilidades Fiscales

| Código | Descripción |
|--------|-------------|
| O-13 | Responsable del Impuesto sobre las Ventas |
| O-15 | Contribuyente Especial ReteIVA |
| O-23 | Gran Contribuyente |
| O-47 | Autorretenedor |
| O-48 | Agente de Retención en el Impuesto sobre la Renta |

---

## Valores Permitidos — Forma de Pago

- Transferencia Bancaria
- Cheque
- Efectivo
- Tarjeta de Crédito
- Tarjeta de Débito

---

## Valores Permitidos — Tipo Cuenta

- Cuenta Corriente
- Cuenta de Ahorros
- Depósito en Efectivo

---

## Códigos CIIU (Clasificación Industrial Internacional Uniforme)

Ejemplos relevantes para proveedores de Galco:

| Código | Descripción |
|--------|-------------|
| 2439 | Fabricación de otros productos de metal |
| 2511 | Fabricación de estructuras metálicas |
| 4120 | Construcción de edificios |
| 4669 | Venta al por mayor de otros productos |
| 4759 | Comercio al por menor de equipos y suministros |
| 4941 | Transporte de carga por carretera |
| 5223 | Manipulación y almacenamiento |
| 6910 | Actividades jurídicas |
| 7020 | Servicios de consultoría de gestión empresarial |
| 7490 | Otras actividades profesionales especializadas |

---

## Ejemplo Completo de Batch (3 proveedores)

```
Tipo Documento;Número Documento;DV;Primer Nombre;Segundo Nombre;Primer Apellido;Segundo Apellido;Razón Social;Dirección;Ciudad (DANE);Departamento;Teléfono;Email;Tipo Persona;Régimen;Tipo Contribuyente;Actividad Económica CIIU;Responsabilidades Fiscales;Banco;Tipo Cuenta;Número Cuenta;Forma de Pago;Plazo
NIT;900456789;1;;;AcerosCOL S.A.S.;Cra 43 #10-50 Bodega 8;05360;Antioquia;6043721456;aceros@aceroscol.com;Jurídica;Responsable IVA;SAS;2439;O-13;Banco de Occidente;Corriente;12345678901234567;Transferencia;30
NIT;800123456;7;;;FerreMax Ltda.;Calle 30 #50-20;05001;Antioquia;6042345678;ventas@ferremax.com;Jurídica;Responsable IVA;Sociedad Limitada;4669;O-13;Bancolombia;Corriente;98765432101234567;Transferencia;15
CC;43567890;;María;;López;García;;Calle 12 #45-67;05266;Antioquia;3217654321;maria@ferreterialocal.com;Natural;Régimen Común;Comerciante;4759;O-47;Banco Caja Social;Ahorros;45678901234567890;Cheque;0
```

**Notas:**
- Delimitador: **semicolon (;)**
- DV vacío para CC, presente para NIT
- Razón Social vacía para natural, presente para jurídica
- Campos bancarios pueden dejarse vacíos si no se conocen (se llenan luego)
- Plazo: 0 si es de contado, >0 si hay crédito
