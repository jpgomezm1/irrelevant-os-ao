# Plantilla de Carga de Clientes — Ilimitada

Estructura exacta esperada para carga masiva de clientes en Ilimitada.

---

## Columnas Obligatorias

| Columna | Tipo | Formato | Ejemplo | Notas |
|---------|------|---------|---------|-------|
| **Tipo Documento** | Texto | CC / NIT / CE / PA | NIT | Identificador del tipo |
| **Número Documento** | Número | XXXXXXXXX (sin puntos) | 900456789 | Sin puntos ni dígito verificación |
| **DV** | Número | 0-9 | 1 | Dígito verificación (solo NIT) |
| **Primer Nombre** | Texto | Máx 30 caracteres | Pedro | Obligatorio si persona natural |
| **Segundo Nombre** | Texto | Máx 30 caracteres | Antonio | Opcional |
| **Primer Apellido** | Texto | Máx 30 caracteres | Martínez | Obligatorio si persona natural |
| **Segundo Apellido** | Texto | Máx 30 caracteres | López | Opcional |
| **Razón Social** | Texto | Máx 100 caracteres | AcerosCOL S.A.S. | Obligatorio si persona jurídica |
| **Dirección** | Texto | Máx 100 caracteres | Cra 43 #10-50 Bodega 8 | Obligatorio |
| **Ciudad (código DANE)** | Número | 5 dígitos | 05360 | Código DANE de Itagüí |
| **Departamento** | Texto | Máx 30 caracteres | Antioquia | Obligatorio |
| **Teléfono** | Número | 10 dígitos | 6043721456 | Opcional pero recomendado |
| **Email** | Texto | Email válido | aceros@aceroscol.com | Opcional |
| **Tipo Persona** | Texto | Natural / Jurídica | Jurídica | Obligatorio |
| **Régimen** | Texto | Responsable IVA / No Responsable | Responsable IVA | Obligatorio |
| **Tipo Contribuyente** | Texto | Ver lista abajo | SAS | Obligatorio |
| **Actividad Económica CIIU** | Número | 4 dígitos | 2439 | Código CIIU de actividad |
| **Responsabilidades Fiscales** | Texto | Ver códigos abajo | O-13 | Obligatorio |

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

Códigos DIAN de responsabilidades:

| Código | Descripción |
|--------|-------------|
| O-13 | Responsable del Impuesto sobre las Ventas |
| O-15 | Contribuyente Especial ReteIVA |
| O-23 | Gran Contribuyente |
| O-47 | Autorretenedor |
| O-48 | Agente de Retención en el Impuesto sobre la Renta |

---

## Códigos CIIU (Clasificación Industrial Internacional Uniforme)

Ejemplos relevantes para Galco:

| Código | Descripción |
|--------|-------------|
| 2439 | Fabricación de otros productos de metal no clasificados |
| 2511 | Fabricación de estructuras metálicas |
| 2512 | Fabricación de tanques, depósitos y recipientes |
| 2599 | Fabricación de otros productos metálicos |
| 3312 | Recuperación y preparación de chatarra |
| 4399 | Otras actividades especializadas de construcción |

---

## Ejemplo Completo de Batch (3 clientes)

```
Tipo Documento;Número Documento;DV;Primer Nombre;Segundo Nombre;Primer Apellido;Segundo Apellido;Razón Social;Dirección;Ciudad (DANE);Departamento;Teléfono;Email;Tipo Persona;Régimen;Tipo Contribuyente;Actividad Económica CIIU;Responsabilidades Fiscales
CC;71234567;;Pedro;;Martínez;López;;Cra 45 #12-30;05088;Antioquia;3104567890;;Natural;Régimen Común;Trabajador Independiente;7229;O-47
NIT;900456789;1;;;AcerosCOL S.A.S.;Cra 43 #10-50 Bodega 8;05360;Antioquia;6043721456;aceros@aceroscol.com;Jurídica;Responsable IVA;SAS;2439;O-13
NIT;820123456;7;;;Constructora El Poblado S.A.S.;Calle 30 #50-20;05001;Antioquia;6042345678;ventas@constructor.com;Jurídica;Responsable IVA;SAS;4399;O-13
```

**Notas:**
- Delimitador: **semicolon (;)**
- Sin espacios innecesarios en celdas
- NIT sin puntos ni guiones
- Nombres con Mayúscula Primera
- DV vacío para CC, presente para NIT
- Razón Social vacía para natural, presente para jurídica
