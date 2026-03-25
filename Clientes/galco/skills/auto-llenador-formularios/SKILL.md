---
name: auto-llenador-formularios
description: >
  Llena automáticamente formularios de proveedores y clientes con datos de Galco.
  Use when "llenar formulario", "formulario de proveedor", "actualización de datos",
  "solicitud de crédito", "registro de proveedor", "diligenciar formulario".
  Lee el formulario en blanco y lo devuelve diligenciado.
argument-hint: "[ruta al formulario en blanco]"
allowed-tools: ["Read", "Write", "Bash", "Glob"]
---

# auto-llenador-formularios — Auto-Complete de Formularios Galco

Lee formularios en blanco (PDF, Word, texto, imagen) y los llena automáticamente con datos maestros de Galco. Detecta campos, mapea a la base de datos, y genera formulario completo. Resalta campos que requieren acción manual (firmas, datos especiales).

---

## STEP 1: Leer Referencias Base

Antes de procesar cualquier formulario:

1. Lee `references/datos-maestros-galco.md` — Toda la información de Galco
2. Lee `references/campos-comunes.md` — Mapeo de sinónimos de campos entre formularios

---

## STEP 2: Recibir Formulario

El usuario puede proporcionar:

- **Ruta a archivo:** PDF, Word, imagen escaneada
- **Descripción del formulario:** "Es una solicitud de crédito de Bancolombia"
- **Texto pegado:** Un formulario copiado en texto plano

Si es ruta, usa Read para leer el archivo.

---

## STEP 3: Identificar Campos

Analiza el formulario e identifica TODOS los campos:

**Campos típicos que encontrarás:**

**Datos Básicos:**
- Razón social / Nombre empresa
- NIT / Número de identificación
- Tipo de sociedad (S.A.S., Ltda., S.A., etc.)
- Representante legal
- Cédula/CC representante

**Dirección y Ubicación:**
- Domicilio principal
- Ciudad / Municipio
- Departamento
- Código postal
- País

**Contacto:**
- Teléfono principal
- Email corporativo
- Persona de contacto
- Cargo contacto

**Datos Fiscales/Tributarios:**
- Régimen tributario (Común, Simplificado, Grande Contribuyente)
- Responsable de IVA (Sí/No)
- Número de resolución DIAN
- Matrícula mercantil
- Cámara de comercio

**Datos Bancarios:**
- Nombre banco
- Tipo cuenta (Ahorros/Corriente)
- Número cuenta
- Nombre titular (si es diferente)

**Información Adicional:**
- Código CIIU
- Fecha constitución
- Representante legal
- ARL (Administradora de Riesgos Laborales)
- EPS
- Pensión
- Actividad económica

**Campos que requieren firma:**
- Firma representante legal
- Fecha de firma
- Lugar de firma
- Autorización/consentimiento

---

## STEP 4: Mapear Campos a Base Maestra

Para cada campo identificado, busca en `datos-maestros-galco.md`:

Ejemplo:
- "Razón Social" → GALCO INGENIERÍA METALMECÁNICA S.A.S.
- "NIT" → 901.234.567-8
- "Representante Legal" → Roberto Jiménez García
- "Teléfono" → +57 310 123 4567
- "Email" → info@galcoing.com.co
- "Dirección" → Cra 50 #30-15, Bodega 4, Itagüí, Antioquia

Usa `referencias/campos-comunes.md` para sinónimos. Ejemplo:
- "Nombre de Empresa" = "Razón Social" = "Company Name" → USA MISMO VALOR

---

## STEP 5: Completar Campos

Para cada campo:

**Si está en datos maestros:**
→ Llenar directamente

**Si NO está (ejemplo: "Línea de crédito solicitada"):**
→ Dejar [____] y notar en lista de "Requiere Manual"

**Si es campo de selección múltiple:**
→ Seleccionar la opción correcta (ej: Régimen → "Común")

**Si es fecha:**
→ Usar formato que requiera el formulario (DD/MM/YYYY, etc.)

**Si es signature/firma:**
→ Notar como [FIRMA REQUERIDA] — no llenar

---

## STEP 6: Generar Resumen de Campos

Crea tabla con:

| Campo | Valor Llenado | Tipo | Nota |
|-------|---------------|------|------|
| Razón Social | GALCO ING. METALMECÁNICA S.A.S. | Texto | ✓ Completado |
| NIT | 901.234.567-8 | Número | ✓ Completado |
| Representante Legal | Roberto Jiménez García | Texto | ✓ Completado |
| Régimen Tributario | Común | Selección | ✓ Completado |
| Línea de crédito solicitada | [____] | Número | ⚠ MANUAL |
| Firma Representante | [FIRMA REQUERIDA] | Firma | 🔴 MANUAL |
| Fecha Firma | [DD/MM/YYYY] | Fecha | 🔴 MANUAL |

---

## STEP 7: Generar Alerta de Campos Manuales

Crea sección clara:

```
CAMPOS QUE REQUIEREN ACCIÓN MANUAL:
====================================

🔴 CRITICO (Firma/Autorización):
- Firma del Representante Legal
- Fecha de Firma
- Lugar de Firma

⚠️ INFORMATIVO (Solo nosotros conocemos):
- Línea de crédito solicitada: [DEFINIR CON CONTADORES]
- Límite de compra a crédito: [DEFINIR CON GERENCIA]
- Propósito del crédito: [DESCRIBA EL USO]

✓ VERIFICAR:
- Número de resolución DIAN: Verificar si aún vigente
- Resolución de facturación: Actualizar si cambió
```

---

## STEP 8: Mostrar Resultado en Chat

Muestra ANTES de guardar:

1. **Formulario completo** (markdown o texto formateado)
2. **Tabla resumen** de campos completados
3. **Alertas claras** de qué requiere manual
4. **Instrucciones** para quién debe firmar/actuar

Pregunta: *"¿Ves bien el formulario? ¿Falta algo o hay algo mal?"*

---

## STEP 9: Guardar Outputs

Una vez aprobado:

1. **Formulario diligenciado:** `formulario-[tipo]-[fecha].txt` o `.pdf`
2. **Checklist manual:** `acciones-manual-[tipo]-[fecha].md`

Ejemplo:
- `formulario-registro-proveedor-20250324.txt`
- `acciones-manual-registro-proveedor.md`

---

## Reglas Críticas

- **Datos exactos:** Usar EXACTAMENTE lo que dice `datos-maestros-galco.md` (tildes, espacios, etc.)
- **Bancos/Cuentas:** NUNCA llenar datos bancarios automáticamente — siempre alertar para verificación
- **Códigos:** Códigos CIIU, ARL, EPS, Pensión — VERIFICAR ANTES DE LLENAR
- **Fechas:** Usar el formato que requiera el formulario (no asumir)
- **Firmas:** NUNCA simular firma — siempre marcar como [FIRMA REQUERIDA]
- **Si falta dato:** Preguntar al usuario antes de dejar blank

---

## Ejemplos de Triggers

- "Llena este formulario de Bancolombia con datos de Galco"
- "Tengo un formulario de registro de proveedor — ayúdame a completarlo"
- "¿Puedes diligenciar esta solicitud de crédito?"
- "Actualizar datos en formulario de EPM"

---

## Flujo Típico

```
Usuario trae formulario (PDF/Word/texto)
         ↓
Leer documento
         ↓
Identificar campos
         ↓
Mapear a datos maestros Galco
         ↓
Llenar campos conocidos
         ↓
Identificar campos manuales
         ↓
Generar resumen + alertas
         ↓
Mostrar en chat
         ↓
Usuario verifica/ajusta
         ↓
Guardar archivo
```

---

## Output Típico (Ejemplo)

```
FORMULARIO DILIGENCIADO — Solicitud de Crédito Bancolombia

[Sección 1: Datos Empresariales]
Razón Social: GALCO INGENIERÍA METALMECÁNICA S.A.S.
NIT: 901.234.567-8
Tipo de Sociedad: Sociedad Anónima Simplificada
Matrícula Mercantil: 12345 de Cámara de Comercio Medellín
CIIU Principal: 2511 — Fabricación de productos metálicos
Fecha Constitución: 15/06/2008

[Sección 2: Ubicación]
Domicilio: Carrera 50 #30-15, Bodega 4
Ciudad: Itagüí
Departamento: Antioquia
País: Colombia
Código Postal: 050000

[Sección 3: Contacto]
Teléfono: +57 310 123 4567
Email Corporativo: info@galcoing.com.co
Contacto Comercial: Carolina López — Contadora

[Sección 4: Datos Tributarios]
Régimen Tributario: Ordinario (Común)
Responsable de IVA: Sí
Resolución Facturación: DIAN-2024-001234
Resolución ARL: Autorizado
EPS: Sura
Pensión: Protección

[Sección 5: Datos Bancarios — ⚠️ VERIFICAR ANTES DE USAR]
Banco: [DEFINIR CON CONTABILIDAD]
Tipo Cuenta: [CORRIENTE / AHORROS]
Número Cuenta: [XXX VERIFICAR EN EXTRACTO]

[Sección 6: Representación Legal]
Nombre: Roberto Jiménez García
Cédula: 1.006.234.567
Cargo: Representante Legal
Poder Notarial: Vigente (Notaría 12 de Medellín)

[Sección 7: Firma y Autorización]
🔴 FIRMA DEL REPRESENTANTE: [FIRMA REQUERIDA — DEBE FIRMAR ROBERTO]
📅 FECHA: [FECHA ACTUAL DD/MM/YYYY]
📍 LUGAR: [Medellín, Antioquia]
📞 TELÉFONO: [+57 310 123 4567]

ACCIONES PENDIENTES:
====================
1. ✓ Verificar datos de ubicación y contacto (parecen correctos)
2. ⚠️ Confirmar datos bancarios con contador Carolina
3. ⚠️ Verificar vigencia de resolución DIAN
4. 🔴 OBLIGATORIO: Roberto debe firmar el formulario
5. 🔴 OBLIGATORIO: Fechar con fecha de hoy

Tiempo estimado: 10 minutos (solo para firma y verificación)
```
