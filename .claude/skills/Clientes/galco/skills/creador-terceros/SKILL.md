---
name: creador-terceros
description: >
  Genera archivos de carga masiva de terceros (clientes, proveedores, asesores)
  para Ilimitada y SIGO. Use when "crear cliente", "crear proveedor", "nuevo tercero",
  "dar de alta", "registrar cliente", "subir clientes", "crear tercero".
  Recibe datos en cualquier formato y genera plantilla lista para subir.
argument-hint: "[pegar datos del tercero o ruta al archivo]"
allowed-tools: ["Read", "Write", "Bash", "Glob", "Grep"]
---

# Creador de Terceros — Generador de Carga Masiva

Conviertes datos desestructurados de clientes, proveedores o asesores en archivos de carga masiva listos para Ilimitada y SIGO. Validates campos obligatorios, completas datos faltantes con inferencia tributaria, y generas plantillas certificadas.

---

## WORKFLOW

### STEP 1: Leer Referencias

Antes de procesar datos:

1. Lee `references/plantilla-clientes-ilimitada.md` — estructura exacta esperada para clientes
2. Lee `references/plantilla-proveedores-ilimitada.md` — estructura para proveedores
3. Lee `references/campos-tributarios.md` — reglas de inferencia tributaria
4. Lee `references/ciudades-dane.md` — códigos DANE de ciudades

Estos archivos son la "fuente de verdad" para validación.

---

### STEP 2: Recibir Datos

Solicita al usuario:

*"¿Cómo envío los datos del tercero? Puedo recibir:*
- *Texto pegado directamente (WhatsApp, email, lista manual)*
- *Ruta a archivo (Excel, CSV, PDF)*
- *Imagen/screenshot de datos"*

Espera la entrada del usuario.

---

### STEP 3: Parsear e Identificar Datos

Para cada tercero proporcionado, **extrae y normaliza:**

#### Campos Obligatorios por Tipo

**CLIENTE / PROVEEDOR:**
- Nombre o Razón Social
- NIT (Número de Identificación Tributaria) o CC (Cédula de Ciudadanía)
- Dirección
- Ciudad (debe coincidir con DANE)
- Teléfono y/o Email

**ASESOR (aplica si es persona natural):**
- Nombre completo
- CC (Cédula de Ciudadanía)
- Teléfono y/o Email
- Ciudad

Si faltan campos obligatorios, **pregunta al usuario antes de continuar:**

*"Faltan campos obligatorios para [nombre tercero]:*
- *Campo A: [?]*
- *Campo B: [?]*

*Por favor completa estos datos."*

---

### STEP 4: Clasificar Tipo de Tercero

Determina automáticamente:

```
SI tiene NIT → persona jurídica (empresa)
SI tiene CC + nombre individual → persona natural (vendedor, asesor)
SI tiene dirección comercial/industrial → cliente o proveedor
SI es natural sin dirección empresa → asesor
```

Comunica la clasificación al usuario:

*"Clasificación detectada: [tipo]. ¿Es correcto?"*

---

### STEP 5: Inferir Campos Tributarios Faltantes

Lee `references/campos-tributarios.md` y aplica estas reglas:

#### Si es PERSONA JURÍDICA (NIT):

1. **Tipo Persona:** Jurídica (automático)
2. **Régimen Tributario:** Por defecto, Responsable de IVA (si NIT empieza con 8xx ó 9xx)
   - Si es 8xx (pequeño contribuyente): verificar si puede ser No Responsable
   - Si es 9xx (gran contribuyente): siempre Responsable
3. **Tipo Contribuyente:** Según tarifa de NIT:
   - 900-919 → Sociedad Anónima
   - 820-899 → SAS / Sociedad Limitada
4. **Responsabilidades Fiscales:** Revisar si tiene obligaciones especiales (CIIU, actividad)
   - Por defecto: O-13 (Responsable de IVA)

#### Si es PERSONA NATURAL (CC):

1. **Tipo Persona:** Natural (automático)
2. **Régimen Tributario:**
   - Si CC empieza con 1 (primer dígito): verificar si es gran contribuyente
   - Por defecto: Régimen Común / Simple según umbral
3. **Tipo Contribuyente:** Persona Natural
4. **Responsabilidades Fiscales:** O-47 (si es trabajador independiente)

**Comunica los campos inferidos:**

*"Campos inferidos para [nombre]:*
- *Tipo Persona: [X]*
- *Régimen: [X]*
- *Responsabilidades Fiscales: [X]*

*¿Son correctos o quieres corregir?"*

---

### STEP 6: Validar Formato

Valida que los datos cumplan formato esperado:

- **NIT:** Formato XXX.XXX.XXX-X (puede recibir sin puntos y normalizas)
- **CC:** Formato X.XXX.XXX ó X.XXX.XXX (puede variar)
- **Teléfono:** 10 dígitos (puede tener espacios/guiones, normalizas)
- **Email:** Formato correcto de email
- **Ciudad:** Debe existir en `referencias/ciudades-dane.md`, si no, preguntas

Si hay formato incorrecto:

*"Validación: El campo [campo] tiene formato incorrecto para [tercero]. Valor actual: [X]. Por favor corrige."*

---

### STEP 7: Buscar Código DANE de Ciudad

Para cada ciudad mencionada:

1. Busca en `referencias/ciudades-dane.md`
2. Si encuentras → auto-completa el código DANE
3. Si NO encuentras:
   - Pregunta: *"¿Es Medellín, Bogotá, Cali u otra ciudad? (usa un valor de la lista)"*
   - Busca de nuevo
   - Si sigue sin encontrarse, marca como "REVISAR MANUALMENTE"

---

### STEP 8: Generar Plantilla de Carga

Crea una tabla en el formato exacto de `plantilla-clientes-ilimitada.md` o `plantilla-proveedores-ilimitada.md` según tipo.

**Si son múltiples terceros:** genera UN archivo con todas las filas (batch).

**Ejemplo de salida (para un cliente):**

```
Tipo Documento | Número Documento | DV | Primer Nombre | Segundo Nombre | Primer Apellido | Segundo Apellido | Razón Social | Dirección | Ciudad (DANE) | Departamento | Teléfono | Email | Tipo Persona | Régimen | Tipo Contribuyente | Actividad Económica CIIU | Responsabilidades Fiscales
---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
CC | 71234567 | | Pedro | | Martínez | | | Cra 45 #12-30 | Bello (05088) | Antioquia | 3104567890 | | Natural | Régimen Común | Independiente | 7229 | O-47
NIT | 900456789 | 1 | | | | | AcerosCOL S.A.S. | Cra 43 #10-50 Bodega 8 | Itagüí (05360) | Antioquia | 6043721456 | aceros@aceroscol.com | Jurídica | Responsable IVA | SAS | 2439 | O-13
```

---

### STEP 9: Mostrar Output en Chat (CRÍTICO)

**REGLA: Chat primero, archivo después.**

Muestra la tabla completa en el chat ANTES de guardar:

*"Aquí está la plantilla lista para cargar:*

*[TABLA COMPLETA]*

*Puedo ver:*
- *Total de terceros: [X]*
- *Campos inferidos: [lista]*
- *Campos que requieren revisión: [lista]*
- *Archivo a guardar: [ruta]*

*¿Todo correcto o hago ajustes?"*

Espera confirmación del usuario.

---

### STEP 10: Guardar Archivo

Una vez confirmado, guarda en:

```
/sessions/inspiring-blissful-cerf/mnt/Claude_Code/Clientes/galco/skills/creador-terceros/output/
carga-terceros-[tipo]-[fecha].csv
```

Donde:
- `[tipo]` = clientes, proveedores, o mixto
- `[fecha]` = YYYYMMDD (fecha actual)

**Formato:** CSV con delimitador `;` (compatible con Ilimitada/Excel en América Latina).

---

### STEP 11: Resumen y Alertas

Genera resumen final:

*"✓ Plantilla generada correctamente*

*Resumen:*
- *Total terceros: [X]*
- *Clientes creados: [X]*
- *Proveedores creados: [X]*
- *Campos inferidos: [lista de campos]*

*Alertas/Revisión Manual:*
- *[lista de campos con valores incompletos o dudosos]*

*Archivo: [ruta]*
- *Formato: CSV (separador semicolon)*
- *Compatible con: Ilimitada, SIGO, Excel*

*Siguientes pasos: Sube este archivo en Ilimitada > Herramientas > Carga Masiva > Terceros."*

---

## REGLAS

- **Nunca inventar datos.** Si faltan campos obligatorios, preguntar al usuario.
- **Normalizar formatos.** NIT con puntos, teléfonos 10 dígitos, emails lowercase.
- **Validar DANE.** Todas las ciudades deben tener código DANE válido.
- **Inferir tributario con cuidado.** Usar las reglas de `campos-tributarios.md`, pero comunicar al usuario los campos inferidos para revisión.
- **Chat primero.** Mostrar tabla completa en chat antes de guardar archivo.
- **Batch support.** Soportar múltiples terceros en una sola carga.
- **No dejar valores NULL.** Si un campo es vacío, usar valor por defecto o marcar "REVISAR".

---

## EJEMPLOS DE TRIGGERS

- "Necesito crear estos 3 clientes nuevos"
- "Registra este proveedor: [datos]"
- "Agregar a Ilimitada: Carolina me pasó esta lista"
- "Crear tercero desde WhatsApp"
- "Dar de alta a 10 proveedores"

---

## CROSS-REFERENCES

Este skill comparte referencias con `generador-facturas`:
- `referencias/ciudades-dane.md` — Códigos DANE
- `referencias/campos-tributarios.md` — Reglas tributarias

Ambos skills usan la misma base de validación tributaria.
