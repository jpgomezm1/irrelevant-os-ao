# Stack de Herramientas Recomendado para Unified Systems

## Estas son las herramientas que vamos a integrar en tu operacion

### 1. Claude — Motor de Inteligencia Artificial
**Que hace:** Es el cerebro que corre todos los procesos inteligentes: el simulador de llamadas, el onboarding, el analisis de calidad, los scripts y el reporte diario.
**Por que para tu empresa:** Todos los 5 procesos que vamos a implementar corren sobre Claude. Es el motor que permite que tu equipo practique llamadas, que el QA se haga automaticamente y que recibas el reporte diario sin depender de personas.
**Precio:** $20/mes por usuario

### 2. Fireflies.ai — Transcripcion de Llamadas
**Que hace:** Convierte las grabaciones de llamadas del dialer en texto que se puede analizar automaticamente.
**Por que para tu empresa:** Tu dialer graba todas las llamadas pero en audio. Para que el sistema de QA automatico pueda analizar 100+ llamadas al dia, necesita texto. Fireflies convierte ese audio en transcripts listos para evaluar.
**Precio:** Gratis / $10/mes

### 3. Notion — Hub de Documentacion
**Que hace:** Un espacio centralizado donde viven todos los scripts, protocolos de campana, manuales de onboarding y reglas de compliance.
**Por que para tu empresa:** Hoy los scripts y procesos viven en la cabeza de la gente. Con Notion, todo esta documentado y accesible desde cualquier lugar — Pakistan, Utah o Colombia. Cuando un agente nuevo entra, el onboarding jala la informacion directo de aqui.
**Precio:** Gratis / $8/mes

### 4. ClickUp — Gestion de Operaciones y Automatizacion
**Que hace:** Plataforma de gestion de proyectos y tareas con automatizaciones integradas. Centraliza el seguimiento de agentes, tareas de QA, onboarding de nuevos hires y flujos operativos.
**Por que para tu empresa:** Con operaciones en Pakistan, Utah y pronto Colombia, necesitas un lugar donde todo el equipo vea que esta pasando: que agentes estan en onboarding, que llamadas necesitan QA review, que tareas estan pendientes. ClickUp tiene automatizaciones nativas para conectar flujos sin necesidad de otra herramienta.
**Precio:** Gratis / $10+/mes

### 5. Gamma AI — Reportes Visuales
**Que hace:** Genera reportes y presentaciones visuales desde datos en segundos.
**Por que para tu empresa:** El reporte diario y los analisis de QA se ven profesionales y son faciles de leer desde el telefono. En vez de tablas de texto, ves graficas claras con los numeros que importan.
**Precio:** Gratis + premium

---

## Costo Total Estimado del Stack

| Herramienta | Precio mensual |
|-------------|---------------|
| Claude | $20/mo |
| Fireflies.ai | $10/mo |
| Notion | $8/mo |
| ClickUp | $10/mo |
| Gamma AI | Gratis |
| **Total** | **~$48/mes** |

> **Nota:** Los costos de suscripcion de las herramientas son responsabilidad del cliente y no estan incluidos en el precio del Setup de IA.

---

## Como se Conectan

```
VICIdial (Dialer)
    |
    ├── Grabaciones de audio → Fireflies.ai → Transcripts de texto
    |                                              |
    |                                              ├── QA Scorecard (Claude)
    |                                              └── Call Simulator (referencia)
    |
    ├── Data de performance → ClickUp (gestion + automatizacion) → Daily Digest (Claude) → Gamma (reporte visual)
    |
    └── Notion (scripts, SOPs, protocolos)
            |
            ├── Agent Onboarding (Claude) ← lee protocolos
            ├── Campaign Script Generator (Claude) ← lee/escribe scripts
            └── QA Scorecard (Claude) ← lee scorecard de compliance
```
