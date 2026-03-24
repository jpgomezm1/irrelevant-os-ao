---
name: agregar-contexto
description: >
  Agrega contexto sobre un cliente: URLs de empresa, LinkedIn de decisores, o notas del consultor.
  Triggers: "agregar contexto", "add context", "nota sobre cliente", "agregar info",
  "/agregar-contexto".
  Usa /agregar-contexto [empresa]
argument-hint: "[empresa]"
allowed-tools: [Read, Write, Glob, Grep, WebSearch, WebFetch, AskUserQuestion]
---

# Agregar Contexto — Acumulador de Inteligencia del Cliente

Agregas contexto variado sobre un cliente: URLs de su pagina web, perfiles de LinkedIn de decisores, notas y observaciones del consultor, o documentos relevantes. Todo se acumula en un archivo central `contexto-general.md` que enriquece el trabajo de todos los demas skills.

---

## STEP 1: Leer Datos Base

1. Lee `CLAUDE.md` en la raiz del workspace para datos fijos de Irrelevant.
2. Lee `Assets Fijos/PROP_VALUE_IRRELEVANT.md` para entender la propuesta de valor completa, servicios, portafolio, casos de exito y reglas de comunicacion de Irrelevant.

---

## STEP 1.5: Verificar Carpeta del Cliente

Si el usuario paso empresa como argumento ($ARGUMENTS), usa ese nombre. Si no, pregunta:

*"Para que empresa quieres agregar contexto?"*

Busca si existe carpeta del cliente en `Clientes/[empresa-lowercase]/` usando Glob.

**Si EXISTE:**
1. Usar esa carpeta para guardar outputs
2. Leer contexto previo:
   - `Clientes/[empresa]/contexto/contexto-general.md` — si existe, leerlo completo para hacer append

**Si NO EXISTE:**
Preguntar: *"No encontre carpeta para [Empresa]. La creo? (o usa /cliente crear [empresa])"*
Si dice si, crear la estructura basica de carpetas.

---

## STEP 2: Determinar Tipo de Contexto

Pregunta al usuario:

*"Que tipo de contexto quieres agregar sobre [Empresa]?*

*1. URL del sitio web de la empresa*
*2. LinkedIn de un decisor o contacto clave*
*3. Notas u observaciones propias (texto libre)*
*4. Documento o contenido del cliente (pegame el contenido)*

*Puedes darme directamente la URL, el texto, o el numero de opcion."*

**Deteccion automatica:** Si el usuario ya paso una URL como parte de su mensaje, detecta automaticamente:
- Si contiene `linkedin.com` → tipo LinkedIn
- Si es otra URL → tipo Website
- Si es texto sin URL → tipo Nota

---

## STEP 3: Procesar Segun Tipo

### Tipo 1: URL de Empresa

1. Usa `WebFetch` en la URL proporcionada
2. Extrae informacion estructurada:
   - **Que hacen:** Productos, servicios, propuesta de valor
   - **Mercado:** A quien le venden, B2B/B2C, industria
   - **Tamano estimado:** Empleados, oficinas, presencia
   - **Tech stack signals:** Herramientas visibles, integraciones mencionadas
   - **Cultura y valores:** Lo que comunican sobre su forma de trabajar
   - **Modelo de negocio:** Como generan ingresos
3. Usa `WebSearch` para complementar con:
   - Noticias recientes
   - LinkedIn de la empresa
   - Informacion de funding o inversiones
   - Reviews de empleados (Glassdoor, etc.)

**Si WebFetch falla:**
*"No pude acceder a esa URL directamente. Puedes pegarme el contenido de la pagina, o dame otra URL."*

### Tipo 2: LinkedIn de Decisor

1. Usa `WebFetch` en la URL de LinkedIn
2. Extrae informacion del perfil:
   - **Nombre completo**
   - **Cargo actual** y tiempo en el cargo
   - **Empresa actual** y tiempo en la empresa
   - **Trayectoria:** Ultimos 2-3 roles
   - **Educacion**
   - **Skills destacados**
   - **Actividad reciente:** Posts, articulos, intereses
3. Usa `WebSearch` con el nombre + empresa para encontrar:
   - Menciones en prensa, podcasts, conferencias
   - Otras redes sociales o presencia publica
   - Publicaciones o charlas

**Si WebFetch falla en LinkedIn** (es comun que LinkedIn bloquee):
*"LinkedIn bloqueo el acceso directo. Alternativas:*
*1. Pegame la info del perfil manualmente (nombre, cargo, trayectoria)*
*2. Dame el nombre completo y la empresa, busco info publica con WebSearch"*

Si el usuario da nombre + empresa, usa `WebSearch` para investigar.

### Tipo 3: Notas del Consultor (Texto Libre)

1. Recibe el texto del usuario tal cual
2. Categoriza automaticamente:
   - **Observacion:** Algo que vio o noto (ej: "tienen un equipo de 5 personas haciendo reportes manuales")
   - **Apreciacion:** Impresion o evaluacion (ej: "el CEO es muy receptivo a tecnologia")
   - **Concern:** Preocupacion o riesgo (ej: "el CFO parece resistente al cambio")
   - **Nota estrategica:** Informacion sobre dinamica interna (ej: "el equipo de ventas y marketing no se hablan")
   - **Intel competitivo:** Info sobre competencia o mercado (ej: "estan evaluando tambien a otra consultora")
3. NO modifica el contenido — lo guarda tal cual con la categoria y timestamp

### Tipo 4: Documento o Contenido

1. Recibe el contenido pegado por el usuario
2. Identifica que tipo de documento es (presentacion, reporte, propuesta, email, etc.)
3. Extrae y resume:
   - Informacion clave
   - Datos relevantes para Irrelevant
   - Contexto que aporta

---

## STEP 4: Leer Contexto Existente

**CRITICO:** Antes de escribir, lee `Clientes/[empresa]/contexto/contexto-general.md` si existe.

- Si existe: vas a AGREGAR la nueva entrada al final, preservando TODO el contenido anterior
- Si no existe: vas a crear el archivo desde cero con header + primera entrada

---

## STEP 5: Guardar en contexto-general.md

### Si el archivo NO existe, crearlo con este formato:

```markdown
# Contexto General — [Empresa]

*Ultima actualizacion: [fecha de hoy]*

---

## [fecha de hoy] — [Tipo: Website / LinkedIn / Nota / Documento]

### Fuente
[URL o "Observacion directa del consultor" o "Documento: [tipo]"]

### Informacion Extraida
[Contenido estructurado segun el tipo procesado en STEP 3]

### Relevancia para Irrelevant
[1-3 lineas sobre por que esto importa para nuestro trabajo de consultoria]

---
```

### Si el archivo YA existe:

1. Actualiza la fecha en *Ultima actualizacion* del header
2. Agrega la nueva entrada AL FINAL del archivo (orden cronologico), antes de un `---` final
3. NUNCA borres ni modifiques entradas anteriores

---

## STEP 6: Confirmar

Muestra al usuario un resumen de lo que se agrego:

*"Contexto agregado para [Empresa]:*

*- Tipo: [Website/LinkedIn/Nota/Documento]*
*- Fuente: [URL o descripcion]*
*- Resumen: [1 linea de lo mas relevante]*
*- Total de entradas en contexto-general.md: [N]*

*Quieres agregar mas contexto? Puedes ejecutar /agregar-contexto [empresa] de nuevo."*

*Sugerencias:*
*- /prep-call [empresa] — si tienes una call proxima*
*- /procesar-transcript [empresa] — si tienes un transcript de reunion*
*- /disenar-skills [empresa] — si ya tienes suficiente contexto"*

---

## Reglas

- SIEMPRE verificar si `contexto-general.md` ya existe antes de escribir — APPEND, nunca overwrite
- Cada entrada DEBE tener timestamp con fecha
- Para URLs, SIEMPRE intentar WebFetch primero. Si falla, WebSearch como fallback o pedir contenido manual
- Para LinkedIn, ser respetuoso con la informacion — no inventar datos que no estan en el perfil
- Las notas del consultor se guardan TAL CUAL, solo se agrega formato, categoria y timestamp
- El contexto-general.md es ACUMULATIVO — NUNCA borrar entradas anteriores
- Deteccion automatica de tipo de input (URL vs texto vs LinkedIn)
- Espanol por defecto
