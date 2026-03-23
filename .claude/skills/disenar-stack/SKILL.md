---
name: disenar-stack
description: >
  Selecciona las herramientas del stack para un cliente consultando la base de datos de Supabase en tiempo real.
  Genera recomendación para el cliente + spec para el equipo.
  Triggers: "diseñar stack", "qué herramientas", "stack de herramientas", "tools", "/disenar-stack".
  Usa /disenar-stack [empresa]
argument-hint: "[empresa]"
allowed-tools: [Read, Write, WebFetch, AskUserQuestion]
---

# Diseñar Stack — Seleccionar Herramientas desde Catálogo

Seleccionas las herramientas del stack tecnológico para un cliente consultando en tiempo real la base de datos de herramientas de Irrelevant en Supabase. Usado para Ops Layer y Core Layer.

---

## STEP 0: Referencias

Lee antes de empezar:
1. `CLAUDE.md` — datos de Irrelevant
2. `Assets Fijos/PROP_VALUE_IRRELEVANT.md` — stack tecnológico de referencia

---

## STEP 0.5: Verificar Carpeta del Cliente

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

## STEP 1: Contexto

*"Vamos a diseñar el stack de herramientas para este cliente.*

*1. Nombre de la empresa*
*2. Servicio: Ops Layer o Core Layer?*
*3. ¿Qué procesos/skills vamos a implementar? (si ya corriste /disenar-skills o /disenar-solucion, dame la ruta del archivo)*
*4. ¿Qué herramientas ya usa el cliente? (CRM, email, calendario, chat interno, almacenamiento, etc.)*
*5. ¿Alguna restricción? (presupuesto, herramientas prohibidas, preferencias)"*

---

## STEP 2: Consultar Catálogo de Herramientas (Supabase)

Consulta la base de datos de herramientas en tiempo real:

**Usar WebFetch con esta URL:**
```
https://ncqdixlsfoskuoyaijwk.supabase.co/rest/v1/tools?select=name,slug,category,description,use_cases,price,difficulty,tags,logo,url
```

**Prompt para WebFetch:** "Extract all tools from this JSON API response. For each tool, get: name, slug, category, description (Spanish), use_cases (Spanish), price (Spanish), difficulty, tags, and url. Return a complete list."

**Headers necesarios (incluir en la URL como query params si WebFetch no soporta headers custom):**

Si WebFetch no puede pasar headers, usar la URL alternativa con el key como query param:
```
https://ncqdixlsfoskuoyaijwk.supabase.co/rest/v1/tools?select=name,slug,category,description,use_cases,price,difficulty,tags,logo,url&apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jcWRpeGxzZm9za3VveWFpandrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyMjkxMzQsImV4cCI6MjA3NjgwNTEzNH0.luZriilQfA63OsU0mVuW_1bAF8G0tZtT6ZH72wIqQ5g
```

Esto retorna TODAS las herramientas del catálogo con: nombre, categoría, descripción, casos de uso, precio, dificultad, tags.

---

## STEP 3: Análisis y Selección

Con el catálogo de herramientas Y el contexto del cliente:

### A. Filtrar por relevancia
- ¿Qué herramientas resuelven los problemas específicos del cliente?
- ¿Qué herramientas soportan los procesos/skills que vamos a implementar?

### B. Verificar compatibilidad
- ¿El cliente ya usa alguna herramienta que cumpla la misma función? (no duplicar)
- ¿Las herramientas seleccionadas se integran entre sí?
- ¿Son compatibles con el motor de IA que vamos a configurar?

### C. Evaluar costo/beneficio
- ¿Cuál es el costo mensual de cada herramienta?
- ¿Hay opciones gratuitas o freemium que sean suficientes?
- ¿El costo total del stack es razonable para el tamaño de la empresa?

### D. Considerar adopción
- ¿Qué tan fácil es para el equipo adoptar cada herramienta? (difficulty del catálogo)
- ¿Requiere capacitación? (→ sugerir /edu-layer si es necesario)

### Seleccionar 5-8 herramientas
Para cada una definir:
- **Rol en el stack** (qué función cumple)
- **Por qué esta y no otra** (justificación específica para este cliente)
- **Alternativa** (si la hubiera en el catálogo)
- **Precio** (del catálogo)
- **Dificultad** (del catálogo)

---

## STEP 4: Output 1 — Para el Cliente

```markdown
# Stack de Herramientas Recomendado para [Empresa]

## Estas son las herramientas que vamos a integrar en tu operación

### 1. [Nombre de la herramienta]
**Qué hace:** [explicación simple, sin jerga]
**Por qué para tu empresa:** [razón específica conectada a su operación]
**Precio:** [del catálogo]

### 2-8. [Repetir]

## Costo Total Estimado del Stack
| Herramienta | Precio mensual |
|-------------|---------------|
| [Nombre 1]  | [precio]      |
| [Nombre 2]  | [precio]      |
| ...         | ...           |
| **Total**   | **[suma]**    |

> **Nota:** Los costos de suscripción de las herramientas son responsabilidad del cliente y no están incluidos en el precio del Setup de IA.

## Cómo se conectan
[Diagrama simple en texto mostrando el flujo: Herramienta A → Motor de IA → Herramienta B]
```

Guardar como: `Clientes/[empresa]/diseno/stack.md`

---

## STEP 5: Output 2 — Para el Equipo

```markdown
# Spec Stack Técnico: [Empresa]

## Herramientas Seleccionadas

### [Nombre] (slug: [slug])
- **Categoría:** [del catálogo]
- **URL:** [del catálogo]
- **Pricing:** [detallado del catálogo]
- **Dificultad:** [beginner/intermediate/advanced]
- **Tags:** [del catálogo]
- **Rol en el stack:** [qué función cumple]
- **Integración con motor IA:** [cómo se conecta — API, MCP, webhook, etc.]
- **MCP disponible:** [sí/no — si existe MCP para esta herramienta]

## Mapa de Integraciones
```
[Herramienta 1] ←→ [Motor IA] ←→ [Herramienta 2]
        ↓                              ↓
[Herramienta 3]              [Herramienta 4]
```

## Orden de Setup Recomendado
1. [Herramienta X] — configurar primero porque [razón]
2. [Herramienta Y] — depende de [X]
3. ...

## Herramientas del Cliente que Mantenemos
- [Herramienta que ya tienen]: [seguir usando para X]

## Herramientas del Cliente que Reemplazamos
- [Herramienta vieja] → [Herramienta nueva]: [por qué]
```

Guardar como: `Clientes/[empresa]/diseno/spec-stack.md`

---

## STEP 6: Siguiente Paso

*"Stack diseñado para [Empresa]:*
*📄 Recomendación para cliente: [ruta]*
*🔧 Spec técnico para equipo: [ruta]*
*💰 Costo mensual estimado del stack: [total]*

*[X] herramientas seleccionadas del catálogo de [total en DB] disponibles.*

*Siguientes pasos:*
*→ /cotizacion [empresa] — generar cotización*
*→ /contrato [empresa] — generar contratos (recordar que el stack NO está incluido en el precio)"*

---

## Reglas

- SIEMPRE consultar Supabase en tiempo real — no usar datos cacheados
- La selección debe ser ESPECÍFICA para este cliente, no genérica
- No recomendar herramientas que el cliente ya tiene (preguntar qué usan)
- El documento del cliente NO debe tener jerga técnica
- Siempre incluir el costo total mensual estimado
- Siempre aclarar que los costos de suscripción NO están incluidos en el servicio
- Si la consulta a Supabase falla, informar al usuario y pedir que verifique la conexión
- Español por defecto
