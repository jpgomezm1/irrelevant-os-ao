---
name: evaluar-fit-cascade
description: >
  Evalúa si un prospect encaja en el Strategy Cascade de irrelevant y lo clasifica
  en la capa económica correcta (0 / 1a / 1b / 2 / 3) antes de cotizar. Si no
  encaja, recomienda rechazo con razón estructurada.
  Triggers: "evaluar fit", "fit cascade", "clasificar prospect", "qué capa",
  "/evaluar-fit-cascade". Usa /evaluar-fit-cascade [empresa]
argument-hint: "[empresa]"
allowed-tools: [Read, Write, Glob, Grep, AskUserQuestion]
---

# Evaluar Fit Cascade — Clasificación estratégica pre-cotización

Skill que evalúa si un prospect encaja en el Where to Play de irrelevant y lo clasifica en la **capa económica correcta** (0 · 1a · 1b · 2 · 3). Si no encaja, recomienda rechazo con razón estructurada.

**Se ejecuta ANTES de `/cotizacion`**. Si el fit no pasa, no se cotiza — se redirige o se rechaza.

---

## STEP 0: Leer referencias obligatorias

Antes de cualquier otra cosa, leer:

1. `docs/ICP.md` — a quién servimos vs. a quién NO
2. `docs/CASCADE_ALIGNMENT.md` — clasificación de productos en capas
3. `docs/PROTOCOLO_REJECT.md` — cómo rechazar si no encaja
4. `Assets Fijos/PROP_VALUE_IRRELEVANT.md` — propuesta de valor vigente

---

## STEP 1: Identificar al prospect

Si el usuario pasó empresa como argumento ($ARGUMENTS), usarlo. Si no:

> *"¿Para qué empresa/prospect quieres evaluar el fit?"*

Buscar si existe carpeta en `Clientes/[empresa-lowercase]/`. Leer contexto si existe:
- `Clientes/[empresa]/contexto/*`
- `Clientes/[empresa]/discovery/*`
- `Clientes/[empresa]/README.md`

---

## STEP 2: Recolectar información crítica

Si no está toda la info en la carpeta del cliente, preguntar 1 por 1:

### Información mínima necesaria

1. **Geografía**: ¿dónde está la empresa/prospect? (Colombia / LATAM / USA / Europa / otro)
2. **Tipo**: ¿es B2B (empresa) o B2C (individuo)?
3. **Si B2B**:
   - ¿Revenue aproximado anual? (<$100k / $100k-$250k / $250k-$3M / $3M-$50M / >$50M)
   - ¿Empleados? (<10 / 10-60 / 60-500 / 500+)
   - ¿Industria?
   - ¿Líder/decisor con awareness AI? (sí / no / medio)
4. **Si B2C**:
   - ¿Vertical específico de interés? (Sales / Operations / Marketing / otro / AI general)
   - ¿Rol actual?
5. **Budget**: ¿hay budget declarado? (rango)
6. **Compromiso**: ¿busca proyecto puntual o relación permanente?
7. **Origen**: ¿cómo llegó? (outbound / referido / inbound / network / otro)

---

## STEP 3: Aplicar filtros de exclusión (NO servimos)

Revisar los 7 triggers de rechazo automático:

### ❌ Enterprise global ($50M+ USD revenue · no Bancolombia)
Si revenue >$50M USD y NO es Bancolombia → **rechazar** (Estilo 1 Redirección)

### ❌ Startup pre-seed (<$100k revenue)
Si revenue <$100k USD → **rechazar** (Estilo 2 NO con puerta · nurture con contenido)

### ❌ Audience "AI general" B2C
Si es B2C pero NO tiene vertical específico activo en roadmap (Sales AI / Operations AI / Marketing AI) → **rechazar** (Estilo 1 Redirección)

### ❌ Consultoría pura sin implementación
Si el cliente explícitamente busca "solo diagnóstico" sin delivery → **rechazar** (Estilo 1)

### ❌ SaaS genérico / integrador commodity
Si el cliente busca solo "integrar Claude" sin componente estratégico → **rechazar** (Estilo 1)

### ❌ Empresa 100% tradicional sin champion interno
Si NO hay líder con awareness AI → **nurture** (Estilo 2 NO con puerta)

### ❌ "Piloto/POC" sin compromiso
Si cliente pide "probemos a ver qué pasa" sin compromiso claro → **rechazar** (Estilo 3 NO duro)

### Geografía
Si NO está en Colombia / LATAM hispano → **rechazar** (Estilo 1 Redirección)

---

## STEP 4: Si PASA filtros · clasificar capa

### Árbol de decisión

```
¿Es B2C (individuo)?
├── SÍ → ¿hay cohort activa abierta para su vertical?
│    ├── SÍ → CAPA 1b · Cohort B2C
│    └── NO → lead capture para próximo lanzamiento (NO cotizar)
└── NO (es B2B empresa)

   ¿Necesita construcción custom específica (software dedicado)?
   ├── SÍ → CAPA 0 · Proyecto Custom
   └── NO

      ¿Quiere capacitar a su equipo?
      ├── SÍ → CAPA 1a · Edu Empresarial
      └── NO

         ¿Quiere automatizar un área específica operación?
         ├── SÍ → CAPA 2 · Ops Layer
         └── NO

            ¿Valora relación permanente + amplificar propuesta de valor?
            ├── SÍ → CAPA 3 · Core Layer
            └── NO → NO encaja · usar PROTOCOLO_REJECT
```

---

## STEP 5: Generar output estructurado

Crear archivo en `Clientes/[empresa]/evaluacion-fit-cascade.md`:

```markdown
# Evaluación Fit Cascade · [Empresa] · [Fecha]

## Clasificación
**Capa recomendada**: [0 / 1a / 1b / 2 / 3 / NO-FIT]
**Pricing estimado**: [rango]
**Modelo comercial**: [one-shot / retainer / por lanzamiento]

## Info del prospect
- Geografía: [...]
- Tipo: [B2B / B2C]
- Revenue (si B2B): [...]
- Vertical (si B2C): [...]
- Budget declarado: [...]
- Compromiso buscado: [puntual / permanente]
- Origen del lead: [push / pull · canal]

## Filtros de exclusión · resultados
- Enterprise global: [✓ pasa / ✗ falla]
- Pre-seed: [✓ pasa / ✗ falla]
- AI general: [✓ pasa / ✗ falla]
- Consultoría pura: [✓ pasa / ✗ falla]
- SaaS genérico: [✓ pasa / ✗ falla]
- Sin champion: [✓ pasa / ✗ falla]
- POC sin compromiso: [✓ pasa / ✗ falla]
- Geografía: [✓ pasa / ✗ falla]

## Recomendación
[Una de las siguientes:]

### Opción A · PROCEDER a cotización
- Ejecutar: `/cotizacion [empresa] [servicio-correspondiente]`
- Consideraciones especiales: [...]

### Opción B · NURTURE (no cotizar aún)
- Acción: nurture con contenido orgánico (Sara · CMO)
- Re-evaluar en: [fecha · ~3-6 meses]
- Señal para retomar: [qué cambio en el prospect lo haría cotizable]

### Opción C · RECHAZAR
- Razón: [trigger específico]
- Estilo de rechazo: [1 Redirección / 2 NO con puerta / 3 NO duro]
- Template sugerido: ver `docs/PROTOCOLO_REJECT.md`

## Contexto adicional para el decisor humano (JP o CCO)
[cualquier matiz que el AI no puede decidir solo]
```

---

## STEP 6: Recomendar siguiente paso al usuario

Después de generar el archivo, decirle al usuario:

**Si Opción A** (proceder):
> "El prospect encaja en Capa [X]. Recomiendo cotizar con `/cotizacion [empresa] [servicio]`. Archivo completo en `Clientes/[empresa]/evaluacion-fit-cascade.md`."

**Si Opción B** (nurture):
> "El prospect está cerca pero no listo. Recomiendo nurture con contenido orgánico por 3-6 meses. No cotizar hoy. Sugerir a Sara (CMO) que lo incluya en nurture list."

**Si Opción C** (rechazar):
> "Este prospect NO encaja. Recomiendo rechazar con Estilo [X]. Ver template en `docs/PROTOCOLO_REJECT.md`. ¿Quieres que genere el email de rechazo?"

---

## Reglas del skill

1. **NO cotizar sin evaluar fit**. Si alguien ejecuta `/cotizacion` directamente, debe ejecutar este skill primero.
2. **NO forzar un fit para cerrar**. Si el prospect no encaja, recomendar rechazo aunque haya urgencia de caja. Ver `CEO/frameworks/STRATEGY_VS_PLANNING.md`.
3. **Documentar la razón**. Cada rechazo alimenta el aprendizaje del ICP.
4. **Revisar mensualmente los rechazos**. Con CEO · para detectar patrones de ajuste al ICP.

---

## Output esperado

Al terminar este skill, hay:
1. Archivo `Clientes/[empresa]/evaluacion-fit-cascade.md` con clasificación completa
2. Recomendación clara al usuario de siguiente paso
3. Documentación trazable para revisar después
