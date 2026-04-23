---
name: contrato
description: >
  Genera paquete completo de contratos para un cliente. Triggers: "contrato",
  "generar contrato", "contratos", "contract", "/contrato".
  Usa /contrato [empresa] [servicio: ops|edu|core]
argument-hint: "[empresa] [ops|edu|core]"
allowed-tools: [Read, Write, Glob, AskUserQuestion]
---

# Contrato — Generador de Paquetes de Contratos

Generas el paquete completo de contratos legales para Irrelevant. Cada paquete incluye contrato principal y anexos, todos personalizados con los datos legales del cliente.

---

## STEP 1: Leer Datos Base

Antes de hacer cualquier cosa:
1. Lee `CLAUDE.md` en la raiz del workspace para datos fijos de Irrelevant
2. Lee `Assets Fijos/PROP_VALUE_IRRELEVANT.md` para entender la propuesta de valor completa, servicios, portafolio, casos de exito y reglas de comunicacion de Irrelevant.
2. Identifica el servicio solicitado

---

## STEP 1.5: Verificar Carpeta del Cliente

Busca si existe carpeta del cliente en `Clientes/[empresa-lowercase]/` usando Glob.

**Si EXISTE:**
1. Usar esa carpeta para guardar outputs
2. Leer contexto previo relevante:
   - `Clientes/[empresa]/contexto/*` — transcripts y notas
   - `Clientes/[empresa]/discovery/*` — discovery notes
   - `Clientes/[empresa]/diseno/*` — propuestas y specs
   Esto enriquece tu output con todo el historial del cliente.
3. Para Core Layer, buscar automáticamente `Clientes/[empresa]/fase0/fase0-documento.html` como input para el Anexo 3.

**Si NO EXISTE:**
Preguntar: *"No encontré carpeta para [Empresa]. ¿La creo? (o usa /cliente crear [empresa])"*
Si dice sí, crear la estructura básica de carpetas.

---

## STEP 2: Recopilar Datos Legales del Cliente

Pregunta al usuario:

*"Vamos a generar el paquete de contratos. Necesito los datos legales completos.*

*Para los datos del cliente, elige una opcion:*
*- **Opcion A:** Pasame la ruta del RUT del cliente (PDF o imagen) y extraigo todo automaticamente*
*- **Opcion B:** Dame los datos manualmente*

*Tambien necesito:*
*1. Servicio: Ops Layer (Capa 2) · Edu Empresarial (Capa 1a) · Core Layer (Capa 3) · Proyecto Custom (Capa 0)?*
*   Nota: Cohort B2C (Capa 1b) no usa contrato formal · se maneja con terminos de servicio en landing.*
*2. Precio acordado (si es diferente al estandar)*
*3. Condiciones de pago (si son diferentes al 50/50)*
*4. Fecha de inicio estimada*
*5. Algun termino o condicion especial?"*

**IMPORTANTE** (nota 2026-04-22 post cascade): si el servicio es Edu Empresarial o Proyecto Custom, avisar al usuario que los templates actuales son base pero requieren revision con abogado para ajustar scope y pricing al nuevo producto. Ver `docs/CASCADE_ALIGNMENT.md`.

Espera la respuesta.

### Si el usuario proporciona un RUT (PDF o imagen):

1. Lee el archivo del RUT usando la ruta proporcionada (Read tool — funciona con PDFs e imagenes)
2. Extrae automaticamente del RUT:
   - **Razon social** completa (tal como aparece en el documento)
   - **NIT** con digito de verificacion (formato: XXX.XXX.XXX-X)
   - **Tipo de sociedad** (S.A.S., S.A., Ltda., etc. — deducir del nombre o del tipo de contribuyente)
   - **Direccion** fiscal completa
   - **Ciudad y departamento** (domicilio)
   - **Representante legal** (nombre completo si aparece)
   - **Numero de cedula** del representante (si aparece)
   - **Actividad economica** (util para contextualizar el contrato)
3. Confirma los datos extraidos con el usuario:
   *"Del RUT extraje estos datos legales. Confirma que estan correctos:*
   - *Razon social: [X]*
   - *NIT: [X]*
   - *Tipo sociedad: [X]*
   - *Direccion: [X]*
   - *Ciudad: [X]*
   - *Rep. Legal: [X]*
   - *CC Rep. Legal: [X]*
   *Algun dato incorrecto?"*
4. Pregunta por los datos que NO estan en el RUT y son necesarios para el contrato:
   - Cedula del representante legal (si no aparecio)
   - Email de contacto
   - Telefono

### Si el usuario da datos manualmente:

Solicita los 9 datos legales:
1. Razon social completa
2. NIT (con digito de verificacion)
3. Tipo de sociedad
4. Domicilio (ciudad, departamento)
5. Direccion fisica
6. Representante legal (nombre completo)
7. Cedula del representante legal
8. Email de contacto
9. Telefono

NO procedas sin los datos legales completos. Los contratos son documentos legales — cada dato debe ser exacto.

---

## STEP 2.5: Validar Fase 0 (SOLO PARA CORE LAYER)

Si el servicio es **Core Layer**, el Anexo 3 (Alcance de la Solución) requiere información detallada que viene del documento de Fase 0. Sin este documento NO se puede generar el paquete de contratos de Core Layer.

Pregunta al usuario:

*"Para el paquete de Core Layer, necesito el documento de Fase 0 que ya generaste para este cliente.*
*Sin este documento no puedo completar el Anexo 3 (Alcance de la Solución).*

*Dame la ruta del documento de Fase 0:*
*(Si aún no lo tienes, primero usa /fase0 [empresa] para generarlo)"*

### Si proporciona la ruta:
1. Lee el documento de Fase 0 completo
2. Extrae automáticamente para el Anexo 3:
   - `{{DESCRIPCION_SOFTWARE}}` → de la sección de Tesis de Intervención / Solución propuesta
   - `{{FUNCIONALIDADES_FASE0}}` → de los componentes de la solución descritos
   - `{{FUNCIONALIDADES_EXCLUIDAS}}` → lo que NO se incluyó en el alcance (invertir lo incluido)
   - `{{HITO_1_DESC}}`, `{{HITO_1_ENTREGABLES}}` → del primer componente/fase de la solución
   - `{{HITO_2_DESC}}`, `{{HITO_2_ENTREGABLES}}` → del segundo componente/fase
   - `{{HITO_3_DESC}}`, `{{HITO_3_ENTREGABLES}}` → del tercer componente/fase
   - Timeline → del timeline propuesto en la Fase 0
3. Confirma los datos extraídos con el usuario antes de usarlos en el contrato
4. Pregunta por los datos que NO están en la Fase 0:
   - Precio de implementación (en letras y número)
   - Fee mensual (en letras y número)
   - Duración exacta de implementación

### Si NO tiene Fase 0:
**NO proceder.** Responder:

*"Para generar contratos de Core Layer necesitas primero el documento de Fase 0.*
*Este documento define el alcance, los entregables y los hitos que van en el Anexo 3 del contrato.*

*Usa /fase0 [empresa] para generarlo y luego vuelve a /contrato.*

*Si necesitas contratos de Ops Layer o Edu Layer, esos no requieren Fase 0."*

---

## STEP 3: Leer Templates del Paquete

Segun el servicio, lee TODOS los archivos del paquete correspondiente:

### AI Ops Layer (Capa 2):
- `Templates/Contratos/AI Ops Layer/contrato-ops-layer.html`
- `Templates/Contratos/AI Ops Layer/anexo-1-acuerdo-pago-ops.html`
- `Templates/Contratos/AI Ops Layer/anexo-2-nda-ops.html`

### AI Edu Empresarial / AI Edu Layer (Capa 1a):
**Nota 2026-04-22**: el producto evolucionó de "Workshop Think AI 3 horas" a "Programa Edu Empresarial 4 sesiones × 3h (Soteco-style)". Los templates de contrato actuales sirven de base, pero **requieren revisión de scope/pricing con abogado** al usarse para el nuevo producto. Ver `Templates/Comercial/Programa Edu Empresarial/README.md`.

- `Templates/Contratos/AI Edu Layer/contrato-edu-layer.html` (base · ajustar scope a 4 sesiones)
- `Templates/Contratos/AI Edu Layer/anexo-1-acuerdo-pago-edu.html` (base · ajustar pricing a ~$10M COP o ~$8M intensiva)
- `Templates/Contratos/AI Edu Layer/anexo-2-nda-edu.html` (sin cambios)

### AI Core Layer (Capa 3 · Embedded AI Operator):
- `Templates/Contratos/AI Core Layer/contrato-prestacion-servicios.html`
- `Templates/Contratos/AI Core Layer/anexo-1-acuerdo-pago.html`
- `Templates/Contratos/AI Core Layer/anexo-2-nda.html`
- `Templates/Contratos/AI Core Layer/anexo-3-alcance-solucion.html`

### Capa 0 · Proyecto Custom (Badge) · NUEVO POST-CASCADE
No tiene template estandarizado · cada proyecto es bespoke. Usar como base el contrato AI Ops Layer o AI Core Layer segun complejidad + retainer. Requerir revision con abogado.

### Capa 1b · Cohort B2C · NUEVO POST-CASCADE
**No usa contrato formal individual**. El enrollment es via pago con terminos de servicio en la landing page del cohort. Ver `Templates/Comercial/Cohort B2C/README.md`.

---

## STEP 4: Reemplazar Placeholders

Reemplaza TODOS los `{{PLACEHOLDER}}` en cada archivo del paquete:

### Datos de Irrelevant (de CLAUDE.md):
2. Lee `Assets Fijos/PROP_VALUE_IRRELEVANT.md` para entender la propuesta de valor completa, servicios, portafolio, casos de exito y reglas de comunicacion de Irrelevant.
- Razon social, NIT, representante legal, cedula, domicilio, email, logo

### Datos del cliente:
- Razon social, NIT, tipo sociedad, domicilio, direccion, representante, cedula, email, telefono

### Datos del servicio:
- Descripcion del servicio, precio, forma de pago, milestones, fechas
- Para Core Layer: completar el alcance en el Anexo 3

### Fechas:
- Fecha de firma (fecha actual o la indicada)
- Plazos segun el servicio

**IMPORTANTE:** No dejes NINGUN placeholder sin reemplazar.

---

## STEP 5: Guardar Output

Crea un directorio de output y guarda todos los archivos:

Directorio: `Clientes/[empresa]/contratos/`

Guarda cada archivo con nombre descriptivo:
- `contrato-[empresa]-[servicio].html`
- `anexo-1-acuerdo-pago-[empresa].html`
- `anexo-2-nda-[empresa].html`
- `anexo-3-alcance-[empresa].html` (solo Core Layer)

---

## STEP 6: Verificacion de Cero Placeholders

Revisa TODOS los archivos generados buscando `{{` para verificar que no quede ningun placeholder sin reemplazar.

Si encuentras placeholders restantes:
1. Lista cuales son
2. Pregunta al usuario por los datos faltantes
3. Reemplazalos

Confirma al usuario:

*"Paquete de contratos generado para [Empresa]:*
- *Contrato principal: [ruta]*
- *Anexo 1 - Acuerdo de Pago: [ruta]*
- *Anexo 2 - NDA: [ruta]*
- *[Anexo 3 - Alcance: [ruta]]* (si aplica)

*Verificacion: [X] placeholders reemplazados, 0 pendientes.*

*Quieres que ajuste algo?"*

---

## Reglas

- SIEMPRE leer CLAUDE.md primero
2. Lee `Assets Fijos/PROP_VALUE_IRRELEVANT.md` para entender la propuesta de valor completa, servicios, portafolio, casos de exito y reglas de comunicacion de Irrelevant.
- SIEMPRE pedir datos legales completos — los contratos son documentos legales
- NUNCA dejar placeholders sin reemplazar
- NUNCA inventar datos legales (NIT, cedulas, razones sociales)
- Verificar cero placeholders es OBLIGATORIO antes de entregar
- Respetar el formato HTML y estructura legal del template
- Fechas en formato: DD de [mes] de YYYY
- Precios COP con formato: $X.XXX.XXX COP + IVA
