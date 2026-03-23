---
name: disenar-solucion
description: >
  Define la solución técnica y estratégica para un cliente del Core Layer, previo a Fase 0.
  Genera propuesta para el cliente + spec técnico para el equipo.
  Triggers: "diseñar solución", "diseñar core", "qué le construimos", "propuesta técnica", "/disenar-solucion".
  Usa /disenar-solucion [empresa]
argument-hint: "[empresa]"
allowed-tools: [Read, Write, Glob, WebSearch, WebFetch, AskUserQuestion, mcp__fireflies__fireflies_get_transcript, mcp__fireflies__fireflies_get_transcripts, mcp__fireflies__fireflies_search, mcp__fireflies__fireflies_get_summary]
---

# Diseñar Solución — Definir Solución de AI Core Transformation

Para Core Layer: después del discovery, ANTES de la Fase 0. Analizas la operación y propuesta de valor del cliente, identificas el proceso core, y defines cómo AI lo amplifica. Este output es el INPUT para `/fase0`.

---

## STEP 0: Referencias

Lee SIEMPRE antes de empezar:
1. `CLAUDE.md` — datos de Irrelevant
2. `Assets Fijos/PROP_VALUE_IRRELEVANT.md` — portafolio de 32+ soluciones, casos de éxito, metodología
3. `Assets Fijos/Fase 0 Ejemplo/ejemplo_fase0.html` — para entender el nivel de profundidad que necesita la Fase 0 (este skill es el INPUT para ese documento)

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

## STEP 1: Contexto del Cliente

*"Vamos a diseñar la solución de AI Core para este cliente.*

*1. Nombre de la empresa*
*2. Industria / sector*
*3. Dame TODO el contexto que tengas:*
*   📞 Transcripts de llamadas (rutas o texto)*
*   🎙️ Fireflies (nombre de la reunión)*
*   📝 Discovery notes (ruta de /discovery-notes)*
*   🌐 Web del cliente (URL)*
*   💬 Notas: qué hace la empresa, cómo opera, cuál es su propuesta de valor, qué problema quieren resolver*

*Lo más importante que necesito entender:*
*→ ¿Cuál es la propuesta de valor de la empresa? ¿Cómo compiten?*
*→ ¿Qué proceso core sostiene esa propuesta de valor?*
*→ ¿Dónde está el cuello de botella principal?"*

Lee todos los archivos. Investiga la empresa con WebSearch/WebFetch. Jala transcripts de Fireflies si aplica.

---

## STEP 2: Análisis Estratégico (Roger Martin)

Con todo el contexto, analiza usando el framework de Strategy + AI:

### A. Propuesta de Valor del Cliente
- ¿Qué venden?
- ¿A quién?
- ¿Por qué los eligen a ellos y no a la competencia?
- ¿Cuál es su diferencial?

### B. Proceso Core
- ¿Qué proceso sostiene directamente esa propuesta de valor?
- ¿Es el funnel de ventas? ¿La atención al cliente? ¿La producción? ¿La logística?
- ¿Dónde se pierde valor en ese proceso?

### C. Oportunidad de AI
- ¿Cómo puede AI amplificar la propuesta de valor (no solo optimizar operaciones)?
- ¿Qué sería posible con AI que hoy es imposible?
- ¿Cómo cambia la forma en que la empresa compite?

### D. Portafolio de Referencia
Busca en el PROP_VALUE_IRRELEVANT.md si Irrelevant ya ha construido algo similar:
- ¿Hay una solución en el portafolio de la misma industria?
- ¿Hay un patrón técnico reutilizable (agente conversacional, marketplace, plataforma)?

---

## STEP 3: Diseño de la Solución

Define:

1. **Problema central** — 1 frase que captura todo
2. **Proceso core a intervenir** — el proceso específico
3. **Tesis de intervención** — por qué AI es la palanca correcta aquí (no automatización genérica)
4. **Solución propuesta** — qué vamos a construir (en lenguaje de negocio)
5. **Componentes** (3-4):
   - Componente 1: nombre + qué hace + por qué
   - Componente 2: nombre + qué hace + por qué
   - Componente 3: nombre + qué hace + por qué
   - Componente 4 (opcional): nombre + qué hace + por qué
6. **Métricas de éxito** (3): qué medimos para saber que funcionó
7. **Timeline** estimado de implementación (semanas)
8. **Impacto proyectado** — en revenue, eficiencia, o propuesta de valor

---

## STEP 4: Output 1 — Para el Cliente (Input para Fase 0)

```markdown
# Solución Propuesta: [Empresa]

## El Problema
[1 párrafo claro — qué no funciona y por qué importa]

## El Proceso Core
[Qué proceso identificamos como el más crítico y por qué]

## Nuestra Tesis
[Por qué AI es la palanca correcta — no automatización, sino amplificación de la propuesta de valor]

## Qué Vamos a Construir

### 1. [Componente 1]
[Qué hace, qué problema resuelve, cómo funciona — sin jerga]

### 2. [Componente 2]
[Igual]

### 3. [Componente 3]
[Igual]

## Impacto Proyectado
- [Métrica 1]: de [X] a [Y]
- [Métrica 2]: de [X] a [Y]
- [Métrica 3]: de [X] a [Y]

## Timeline Estimado
[X semanas] — [desglose por fase]

## Referencia
[Si hay un caso similar en el portafolio de Irrelevant, mencionarlo con números reales]
```

Guardar como: `Clientes/[empresa]/diseno/solucion.md`

---

## STEP 5: Output 2 — Para el Equipo (Spec Técnico)

```markdown
# Spec Técnico: [Empresa] — Core Layer

## Arquitectura de Alto Nivel
- Tipo de solución: [agente conversacional / plataforma / sistema de analytics / etc.]
- Modelo principal: [Claude / GPT-4 / Gemini — y por qué]
- Infraestructura: [Supabase / PostgreSQL / etc.]
- Canal principal: [WhatsApp / Web / API / etc.]

## Stack Tecnológico Recomendado
→ Sugerir: "Usa /disenar-stack [empresa] para el detalle"

## Integraciones Necesarias
- [API 1]: [para qué]
- [API 2]: [para qué]
- [CRM/ERP]: [cuál y cómo se conecta]

## Componentes de IA
- [Componente 1]: tipo de modelo, flujo conversacional/procesamiento, complejidad
- [Componente 2]: igual
- [Componente 3]: igual

## Modelo de Datos (Alto Nivel)
- Entidades principales: [lista]
- Relaciones clave: [lista]
- Volumen estimado: [registros/mes]

## Riesgos Técnicos
1. [Riesgo]: [mitigación]
2. [Riesgo]: [mitigación]

## Estimación de Esfuerzo
- Diseño: [X semanas]
- Desarrollo: [X semanas]
- Testing: [X semanas]
- Total: [X semanas]

## Pricing Sugerido
- Implementación: [rango estimado basado en complejidad]
- Fee mensual: [rango estimado]
```

Guardar como: `Clientes/[empresa]/diseno/spec-solucion.md`

---

## STEP 6: Siguiente Paso

*"Solución diseñada para [Empresa]:*
*📄 Propuesta para cliente: [ruta] — usa este como INPUT para /fase0*
*🔧 Spec técnico para equipo: [ruta]*

*Siguientes pasos:*
*→ /disenar-stack [empresa] — definir herramientas del stack*
*→ /fase0 [empresa] — generar el documento de Fase 0 (pásale el archivo de solución como contexto)*
*→ /cotizacion [empresa] core — (después de la Fase 0)"*

---

## Reglas

- El análisis debe empezar por la PROPUESTA DE VALOR del cliente, no por la tecnología
- La tesis NO es "automatizar procesos" sino "amplificar cómo la empresa compite"
- Siempre buscar en el portafolio de Irrelevant si hay algo similar ya construido
- El documento del cliente es el INPUT para /fase0 — debe tener la profundidad suficiente
- El spec técnico debe ser accionable para el equipo de desarrollo
- Si no hay suficiente contexto para diseñar la solución, pedir más — no inventar
- Español por defecto
