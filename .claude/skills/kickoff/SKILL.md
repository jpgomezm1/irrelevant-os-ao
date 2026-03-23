---
name: kickoff
description: >
  Genera materiales para el kickoff meeting post-firma del Core Layer.
  Triggers: "kickoff", "arrancar proyecto", "iniciar core layer", "/kickoff".
  Usa /kickoff [empresa]
argument-hint: "[empresa]"
allowed-tools: [Read, Write, Glob, AskUserQuestion]
---

# Kickoff — Arranque del Proyecto Core Layer

Generas todos los materiales para el kickoff meeting después de la firma del contrato del Core Layer. Tu objetivo es que el cliente y el equipo arranquen alineados, con claridad en timeline, responsabilidades y próximos pasos.

Antes de hacer CUALQUIER COSA:
1. Lee `CLAUDE.md` en la raíz del workspace para entender los servicios de Irrelevant y sus precios
2. Lee `Assets Fijos/PROP_VALUE_IRRELEVANT.md` para entender la propuesta de valor completa, servicios, portafolio, casos de éxito y reglas de comunicación de Irrelevant

---

## STEP 0.5: Verificar Carpeta del Cliente

Busca si existe carpeta del cliente en `Clientes/[empresa-lowercase]/` usando Glob.

**Si EXISTE:**
1. Usar esa carpeta para guardar outputs
2. Leer contexto previo:
   - `Clientes/[empresa]/fase0/*` — Fase 0 (la solución diseñada)
   - `Clientes/[empresa]/contratos/*` — Contrato firmado (timeline, milestones, alcance)
   - `Clientes/[empresa]/diseno/*` — Diseño de solución y stack
   - `Clientes/[empresa]/README.md` — Ficha del cliente
   - `Clientes/[empresa]/discovery/*` — Contexto original

**Si NO EXISTE:**
Preguntar: *"No encontré carpeta para [Empresa]. ¿La creo? (o usa /cliente crear [empresa])"*
Si dice sí, crear la estructura básica de carpetas.

---

## STEP 1: Recopilar Información

Si no hay suficiente en la carpeta, pregunta:

*"Voy a preparar el kickoff del Core Layer. Necesito confirmar:*

*1. Nombre de la empresa (si no lo diste)*
*2. ¿Quiénes asisten al kickoff? (roles del lado del cliente)*
*3. ¿Fecha de inicio del proyecto?*
*4. ¿Duración total acordada? (en semanas/meses)*
*5. ¿Milestones principales? (si no están en el contrato)*
*6. ¿Canal de comunicación preferido? (Slack, WhatsApp, email)*
*7. ¿Algo especial que quieras incluir en el kickoff?"*

Complementa con lo que encuentres en fase0/ y contratos/.

---

## STEP 2: Generar Agenda del Kickoff (Markdown)

```markdown
# Kickoff Meeting — [Empresa]
## Core Layer | [Fecha]

### Participantes
**Irrelevant:**
- [Nombres y roles]

**[Empresa]:**
- [Nombres y roles]

### Agenda (45-60 min)

| Bloque | Tiempo | Responsable | Contenido |
|--------|--------|-------------|-----------|
| Bienvenida + Contexto | 5 min | Irrelevant | Recap del proyecto, objetivos |
| Solución Recap | 10 min | Irrelevant | Qué vamos a construir y por qué |
| Timeline + Milestones | 10 min | Irrelevant | Cronograma detallado |
| Responsabilidades | 10 min | Ambos | Quién hace qué, de ambos lados |
| Qué necesitamos del cliente | 5 min | Irrelevant | Accesos, datos, personas |
| Comunicación | 5 min | Ambos | Canales, frecuencia de updates |
| Próximos pasos | 5 min | Irrelevant | Qué pasa esta semana |
| Q&A | 5 min | Ambos | Preguntas abiertas |

### Objetivos del Kickoff
1. Que el equipo del cliente entienda exactamente qué se va a construir
2. Que todos sepan el timeline y sus responsabilidades
3. Que se establezcan los canales de comunicación
4. Que el cliente sepa qué necesitamos de ellos para arrancar
```

---

## STEP 3: Generar Slides del Kickoff (HTML Dark Mode)

Genera slides HTML con el mismo estilo dark mode del pitch deck de Irrelevant:

```html
<!-- Estilo dark mode -->
<!-- Background: #0a0a0a -->
<!-- Cards/Slides: #1a1a1a -->
<!-- Borders: #333 -->
<!-- Text primary: #ffffff -->
<!-- Text secondary: #888 -->
<!-- Accent: #00ff88 -->
<!-- Font: system-ui -->
```

### Slides:

1. **Cover:** Logo Irrelevant + "Kickoff Meeting" + nombre empresa + fecha
2. **Agenda:** Los bloques de la reunión
3. **¿Por qué estamos aquí?:** Recap del problema (del discovery/Fase 0)
4. **La Solución:** Qué vamos a construir (del Fase 0, simplificado para el equipo)
5. **Timeline:** Visual con milestones, fechas, entregables por milestone
6. **Responsabilidades:** Tabla Irrelevant vs Cliente — quién hace qué
7. **¿Qué necesitamos de ustedes?:** Lista clara de accesos, datos, personas, decisiones
8. **Comunicación:** Canales, frecuencia de updates, quién contactar para qué
9. **Esta semana:** Los próximos pasos inmediatos (primeros 5 días)
10. **Contacto:** Datos del equipo Irrelevant

### Formato:
- Navegación con flechas (←→) entre slides
- Indicador de slide actual (1/10)
- Logo en cada slide
- Estilo consistente con el pitch deck existente
- Sin dependencias externas (todo inline)

---

## STEP 4: Generar Email de Kickoff

Genera email para enviar al equipo del cliente:

```
Asunto: Kickoff — [Empresa] × Irrelevant | [Fecha]

Hola equipo,

Estamos listos para arrancar. Les comparto los detalles del kickoff meeting:

📅 **Fecha:** [fecha y hora]
⏱️ **Duración:** 45-60 minutos
📍 **Formato:** [presencial/virtual — link si aplica]

**Agenda:**
1. Recap de la solución
2. Timeline y milestones
3. Responsabilidades
4. Canales de comunicación
5. Próximos pasos inmediatos

**Para aprovechar al máximo la sesión, les pido:**
- Que asistan [roles necesarios]
- Que tengan listos [accesos/datos si aplica]

Adjunto las slides de referencia.

Nos vemos el [fecha],

[Comercial]
Irrelevant
```

---

## STEP 5: Guardar Outputs

1. Verifica si existe `Clientes/[empresa]/produccion/kickoff/` — si no, crea `produccion/` y `produccion/kickoff/`
2. Guarda:
   - Agenda: `Clientes/[empresa]/produccion/kickoff/kickoff-agenda.md`
   - Slides: `Clientes/[empresa]/produccion/kickoff/kickoff-slides.html`
   - Email: `Clientes/[empresa]/produccion/kickoff/kickoff-email.md`

---

## STEP 6: Confirmar

*"Kickoff preparado para [Empresa]. Archivos en: `Clientes/[empresa]/produccion/kickoff/`"*

*"3 archivos generados:*
- *`kickoff-agenda.md` — Agenda detallada de la reunión*
- *`kickoff-slides.html` — Slides dark mode para presentar*
- *`kickoff-email.md` — Email para enviar al equipo del cliente"*

*"Después del kickoff, usa `/weekly-update [empresa]` para generar el primer reporte semanal."*

---

## Reglas

- **Español** por defecto
- La solución en las slides debe ser SIMPLIFICADA — el equipo del cliente no necesita detalles técnicos
- El timeline debe ser VISUAL y claro — no un párrafo de texto
- Las responsabilidades deben ser CONCRETAS — no "colaborar en el proceso"
- Si no hay Fase 0 en la carpeta, pedir al usuario que describa la solución
- Si no hay contrato, pedir al usuario el timeline acordado
- NUNCA inventar milestones o fechas — usar solo datos reales
- Las slides deben funcionar standalone (sin necesidad de presentador)
- El HTML debe ser AUTOCONTENIDO — sin dependencias externas
- Dark mode SIEMPRE — consistente con el estilo de Irrelevant
