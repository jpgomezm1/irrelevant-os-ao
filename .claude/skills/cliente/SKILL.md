---
name: cliente
description: >
  Crea y gestiona carpetas de clientes para organizar toda la información comercial.
  Triggers: "nuevo cliente", "crear cliente", "carpeta cliente", "ver cliente", "listar clientes", "/cliente".
  Usa /cliente [crear|ver|listar] [empresa]
argument-hint: "[crear|ver|listar] [empresa]"
allowed-tools: [Read, Write, Glob, Grep, AskUserQuestion]
---

# Cliente — Gestión de Carpetas de Clientes

Cada cliente tiene su propia carpeta en `Clientes/` donde se acumula TODO: transcripts, discovery notes, propuestas, cotizaciones, contratos, entregables. Este skill crea, consulta y gestiona esas carpetas.

---

## FUNCIÓN 1: Crear Cliente

**Trigger:** `/cliente crear [empresa]` o "nuevo cliente" o "crear carpeta para..."

### Proceso:

1. Pregunta al usuario (si no proporcionó todo):

*"Voy a crear la carpeta del cliente. Necesito:*
*1. Nombre completo de la empresa*
*2. Industria / sector*
*3. Contacto principal (nombre, cargo)*
*4. Servicio de interés (Ops Layer, Edu Layer, Core Layer, o aún no definido)*
*5. ¿Cómo llegó? (referido, outbound, inbound, evento)"*

2. Genera el slug: nombre empresa en lowercase, espacios → guiones, sin caracteres especiales
   Ejemplo: "Escuela de Ingeniería" → `escuela-de-ingenieria`

3. Crea la estructura completa. **CRITICO: Para CADA subcarpeta, crea un archivo `.gitkeep` usando el Write tool.** Los directorios vacíos NO existen en el filesystem hasta que tienen al menos un archivo. Debes crear TODOS estos archivos (usa llamadas paralelas al Write tool para eficiencia):

```
Clientes/[slug]/
├── README.md
├── contexto/.gitkeep
├── discovery/.gitkeep
├── diseno/.gitkeep
├── comercial/.gitkeep
├── comercial/emails/.gitkeep
├── contratos/.gitkeep
├── fase0/.gitkeep
├── entregable/.gitkeep
├── produccion/.gitkeep
├── produccion/kickoff/.gitkeep
├── produccion/updates/.gitkeep
└── evaluaciones/.gitkeep
```

Cada `.gitkeep` es un archivo vacío (contenido: cadena vacía `""`). Son 12 archivos `.gitkeep` + el README.md = 13 archivos en total. **NO te saltes ninguno. Crea los 13 archivos.**

4. Genera `README.md` con la ficha:

```markdown
# [Nombre Empresa]

## Ficha del Cliente
| Campo | Valor |
|-------|-------|
| **Empresa** | [nombre] |
| **Industria** | [industria] |
| **Contacto** | [nombre], [cargo] |
| **Servicio interesado** | [servicio] |
| **Cómo llegó** | [canal] |
| **Fecha de creación** | [fecha actual] |
| **Comercial** | [preguntar o default JP] |
| **Estado** | Discovery pendiente |

## Historial
- [fecha]: Carpeta creada

## Archivos
(Se actualiza automáticamente con cada skill ejecutado)
```

5. Confirma:
*"Carpeta creada para [Empresa]: `Clientes/[slug]/`*
*Siguiente paso: /prep-call [empresa] o /discovery-notes"*

---

## FUNCIÓN 2: Ver Cliente

**Trigger:** `/cliente ver [empresa]` o "estado de [empresa]" o "qué tenemos de..."

### Proceso:

1. Busca la carpeta: `Clientes/[slug]/`
2. Si no existe, sugerir crearla
3. Si existe, escanea TODAS las subcarpetas y lista los archivos
4. Determina el estado del pipeline:

```
Pipeline de [Empresa]:

✅ Carpeta creada — [fecha]
[✅|❌] Discovery — [archivos encontrados o "pendiente"]
[✅|❌] Diseño — [propuesta-skills.md, stack.md, etc.]
[✅|❌] Cotización — [cotizacion-ops.html, etc.]
[✅|❌] Contratos — [contrato-ops.html, etc.]
[✅|❌] Fase 0 — [fase0-documento.html, etc.] (solo Core)
[✅|❌] Entregable — [entregable-documento.html, etc.] (solo Ops post-setup)
[✅|❌] Producción — kickoff, weekly updates (solo Core Layer)

Archivos totales: [X]
Último archivo modificado: [nombre] — [fecha]

Siguiente paso sugerido: [basado en qué falta]
```

---

## FUNCIÓN 3: Listar Clientes

**Trigger:** `/cliente listar` o "qué clientes tenemos" o "listar clientes"

### Proceso:

1. Busca todas las carpetas en `Clientes/*/README.md`
2. Lee cada README para extraer: empresa, industria, servicio, estado
3. Presenta tabla:

```
Clientes Activos:

| # | Empresa | Industria | Servicio | Estado | Archivos |
|---|---------|-----------|----------|--------|----------|
| 1 | [X]     | [X]       | [X]      | [X]    | [X]      |
| 2 | [X]     | [X]       | [X]      | [X]    | [X]      |

Total: [X] clientes
```

---

## Reglas

- El slug SIEMPRE es lowercase con guiones: "Mi Empresa S.A.S." → `mi-empresa-sas`
- NUNCA crear carpetas duplicadas — verificar si ya existe antes
- El README.md es la fuente de verdad del cliente
- Todos los demás skills deben guardar en la subcarpeta correcta
- Si un skill pregunta por empresa y no encuentra carpeta, sugerir `/cliente crear`
