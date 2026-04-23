---
name: cotizacion
description: >
  Genera cotizacion completa para un cliente. Triggers: "cotizacion", "cotizar",
  "generar cotizacion", "quote", "/cotizacion".
  Usa /cotizacion [empresa] [servicio: ops|edu-empresarial|core|proyecto-custom]
argument-hint: "[empresa] [ops|edu-empresarial|core|proyecto-custom]"
allowed-tools: [Read, Write, Glob, AskUserQuestion]
---

# Cotizacion — Generador de Cotizaciones Comerciales

Generas cotizaciones HTML profesionales para Irrelevant a partir de los templates existentes. Cada cotizacion es personalizada con los datos del cliente y del servicio seleccionado.

---

## STEP 1: Leer Datos Base

Antes de hacer cualquier cosa:
1. Lee `CLAUDE.md` en la raiz del workspace para obtener los datos fijos de Irrelevant
2. Lee `Assets Fijos/PROP_VALUE_IRRELEVANT.md` para entender la propuesta de valor completa, servicios, portafolio, casos de exito y reglas de comunicacion de Irrelevant.
2. Identifica el servicio solicitado (ops o edu)

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

**Si NO EXISTE:**
Preguntar: *"No encontré carpeta para [Empresa]. ¿La creo? (o usa /cliente crear [empresa])"*
Si dice sí, crear la estructura básica de carpetas.

---

## STEP 2: Recopilar Datos del Cliente

Pregunta al usuario:

*"Vamos a generar la cotizacion. Necesito estos datos:*

*1. Servicio: Ops Layer o Edu Layer?*
*2. Idioma: espanol o ingles?*
*3. Datos del cliente — elige una opcion:*
*   - **Opcion A:** Pasame la ruta del RUT del cliente (PDF o imagen) y extraigo todo automaticamente*
*   - **Opcion B:** Dame los datos manualmente (nombre empresa, contacto, cargo, email)*
*4. Nombre del comercial de Irrelevant que envia (si no eres JP)*
*5. Algun ajuste de precio o condicion especial?"*

Espera la respuesta.

### Si el usuario proporciona un RUT (PDF o imagen):

1. Lee el archivo del RUT usando la ruta proporcionada (Read tool — funciona con PDFs e imagenes)
2. Extrae automaticamente del RUT:
   - **Razon social** completa
   - **NIT** con digito de verificacion
   - **Tipo de sociedad** (S.A.S., S.A., Ltda., etc.)
   - **Direccion** fiscal
   - **Ciudad/Domicilio**
   - **Representante legal** (si aparece)
   - **Actividad economica** (util para contextualizar la cotizacion)
3. Confirma los datos extraidos con el usuario antes de continuar:
   *"Del RUT extraje estos datos. Confirma que estan bien:*
   - *Razon social: [X]*
   - *NIT: [X]*
   - *Tipo sociedad: [X]*
   - *Direccion: [X]*
   - *Ciudad: [X]*
   - *Rep. Legal: [X]*
   *Algun dato incorrecto o que falte?"*
4. Pregunta por los datos que NO estan en el RUT: nombre del contacto, cargo, email

### Si el usuario da datos manualmente:

Solicita: nombre empresa, contacto, cargo, email. Proceder normal.

NO procedas sin tener al menos: empresa, servicio e idioma.

---

## STEP 3: Leer Template Correcto

**NOTA 2026-04-22 post cascade**: Antes de cotizar, se recomienda ejecutar `/evaluar-fit-cascade [empresa]` para confirmar que el prospect encaja en el WTP y que la capa economica seleccionada es correcta. Ver `docs/ICP.md`.

Segun el servicio e idioma, lee el template correspondiente:

### Ops Layer (Capa 2 · one-shot sin retainer)
- **Ops Layer ES:** `Templates/Comercial/Cotizacion Ops Layer/cotizacion-ops-layer-es.html`
- **Ops Layer EN:** `Templates/Comercial/Cotizacion Ops Layer/cotizacion-ops-layer-en.html`
- Pricing estandar: $7.000.000 COP + IVA / $3.500 USD

### Edu Empresarial (Capa 1a · Soteco-style · reemplaza Edu Layer antiguo)
- **Referencia base**: `Templates/Comercial/Programa Edu Empresarial/README.md`
- **Template vivo de referencia**: `Clientes/soteco/comercial/cotizacion/index.html`
- Pricing estandar: ~$10M COP mensual (4 sesiones × 3h en 4 semanas) o ~$8M COP intensiva (3 sesiones × 3h en 1 semana)
- **IMPORTANTE**: el template antiguo `Templates/Comercial/_deprecated_/Cotizacion Edu Layer/` YA NO SE USA (era Workshop Think AI de 3 horas, deprecado post cascade 2026-04-22). Si el usuario pide "edu", preguntar si se refiere a Edu Empresarial (nuevo) y usar base Soteco como referencia · OR si insiste en el viejo, avisar que es deprecado y requiere decision explicita del CEO para reactivar.

### Core Layer (Capa 3 · embedded operator)
- Template: `Templates/Comercial/Fase 0 Core Layer/` (usar Fase 0 como base · Core no tiene cotizacion simple porque es impact-based)
- Pricing: basado en impacto + retainer mensual · pedir al usuario

### Proyecto Custom (Capa 0 · Badge)
- **No hay template estandar** · cada proyecto es bespoke
- Base: usar referencia de `Clientes/indemneasy/` o similar proyecto badge
- Pricing: $5-15M setup · retainer mantenimiento opcional

### Cohort B2C (Capa 1b)
- **NO usa cotizacion individual** · se maneja con enrollment via Stripe/PayU + landing
- Si el usuario pide cotizar un cohort, redirigir a skill `/vender-cohort [cohort-id]`

Tambien lee el ejemplo como referencia de calidad cuando aplique:
- `Templates/Comercial/Cotizacion Ops Layer/ejemplo-escuela-ingenieria.html`

---

## STEP 4: Reemplazar Placeholders

Reemplaza TODOS los `{{PLACEHOLDER}}` en el template con los datos recopilados:

- Datos de Irrelevant (de CLAUDE.md): razon social, NIT, representante, email, telefono, logos
2. Lee `Assets Fijos/PROP_VALUE_IRRELEVANT.md` para entender la propuesta de valor completa, servicios, portafolio, casos de exito y reglas de comunicacion de Irrelevant.
- Datos del cliente: empresa, contacto, cargo, email
- Datos del servicio: precio, condiciones, fechas
- Fecha de cotizacion: fecha actual
- Vigencia: 15 dias desde la fecha actual
- Cualquier condicion especial mencionada por el usuario

**IMPORTANTE:** No dejes NINGUN placeholder sin reemplazar. Si falta un dato, pregunta al usuario.

---

## STEP 5: Guardar Output

Guarda el archivo HTML generado en:
`Clientes/[empresa]/comercial/cotizacion-[servicio].html`

Usa el nombre de la empresa en lowercase y sin espacios (reemplazar espacios con guiones).

---

## STEP 6: Verificacion

Lista todos los placeholders que fueron reemplazados para que el usuario verifique:

*"Cotizacion generada. Estos son los datos que use:*
- *Empresa: [X]*
- *Servicio: [X]*
- *Precio: [X]*
- *Contacto: [X]*
- *Fecha: [X]*
- *Vigencia: [X]*
- *[...]*

*Archivo guardado en: [ruta]*

*Quieres que ajuste algo?"*

---

## Reglas

- SIEMPRE leer CLAUDE.md primero para datos de Irrelevant
2. Lee `Assets Fijos/PROP_VALUE_IRRELEVANT.md` para entender la propuesta de valor completa, servicios, portafolio, casos de exito y reglas de comunicacion de Irrelevant.
- SIEMPRE preguntar datos faltantes, nunca inventar
- NUNCA dejar placeholders sin reemplazar en el output
- El archivo de ejemplo sirve como referencia de calidad, no como template
- Respetar el formato HTML exacto del template (no modificar estructura ni estilos)
- Fechas en formato: DD de [mes] de YYYY
- Precios COP con formato: $X.XXX.XXX
