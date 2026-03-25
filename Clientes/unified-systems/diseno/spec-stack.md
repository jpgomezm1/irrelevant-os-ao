# Spec Stack Tecnico: Unified Systems

## Herramientas Seleccionadas

### Claude (slug: claude)
- **Categoria:** dairy (AI assistant)
- **URL:** https://claude.ai
- **Pricing:** $20/mo+ (Pro plan)
- **Dificultad:** intermediate
- **Tags:** AI, LLM, coding, analysis
- **Rol en el stack:** Motor de IA principal. Todos los 5 skills corren sobre Claude Code.
- **Integracion con motor IA:** ES el motor de IA
- **MCP disponible:** N/A — es la plataforma base

### Fireflies.ai (slug: fireflies-ai)
- **Categoria:** marketing (meeting/call transcription)
- **URL:** https://fireflies.ai
- **Pricing:** Free / $10/mo (Pro)
- **Dificultad:** beginner
- **Tags:** transcription, meetings, calls, AI notes
- **Rol en el stack:** Transcripcion de llamadas del VICIdial. Convierte grabaciones de audio en texto para que el QA Scorecard pueda analizar.
- **Integracion con motor IA:** Los transcripts se cargan al skill qa-scorecard de Claude Code. Potencial MCP de Fireflies para jalar transcripts automaticamente.
- **MCP disponible:** Si — Fireflies MCP existe para Claude Code
- **Nota:** Para 300-400 agentes, evaluar si el plan Pro es suficiente o necesitan Business ($19/mo). Depende del volumen de llamadas a transcribir (no todas, solo sample para QA).

### Notion (slug: notion)
- **Categoria:** productivity
- **URL:** https://notion.so
- **Pricing:** Free / $8/mo (Plus)
- **Dificultad:** beginner
- **Tags:** docs, wiki, project management, knowledge base
- **Rol en el stack:** Hub centralizado de documentacion. Almacena: scripts por campana/idioma, protocolos de campana, SOPs de onboarding, reglas de compliance, codigos de disposicion, scorecards de QA.
- **Integracion con motor IA:** Los skills de Claude Code leen references/ locales, pero Notion es la fuente de verdad que el equipo humano mantiene. Se sincroniza manualmente o via export.
- **MCP disponible:** Si — Notion MCP existe
- **Nota:** Alternativa evaluada: Coda ($10/mo). Notion elegido por menor curva de adopcion.

### ClickUp (slug: clickup)
- **Categoria:** productivity
- **URL:** https://clickup.com
- **Pricing:** Free / $10+/mo
- **Dificultad:** intermediate
- **Tags:** project management, tasks, automation, collaboration
- **Rol en el stack:** Gestion operativa centralizada + automatizaciones nativas. Funciones principales:
  1. Tracking de onboarding: cada agente nuevo es una tarea con checklist de completado
  2. QA pipeline: tareas automaticas de revision de llamadas asignadas al QA manager
  3. Dashboard operativo: vistas personalizadas por campana, por equipo (Pakistan/Colombia)
  4. Automatizaciones: triggers cuando un agente completa onboarding, cuando un QA review tiene red flags, reportes periodicos
- **Integracion con motor IA:** ClickUp tiene API abierta para conectar con Claude Code y con el VICIdial. Las automatizaciones nativas de ClickUp reemplazan la necesidad de un tool de automatizacion separado para flujos operativos basicos.
- **MCP disponible:** No directamente, pero tiene API REST completa + webhooks
- **Nota:** ClickUp tambien sirve como punto de visibilidad para Abdul — puede ver desde el telefono el estado de la operacion en Pakistan y Colombia sin depender de que alguien le reporte.

### Gamma AI (slug: gamma-ai)
- **Categoria:** productivity
- **URL:** https://gamma.app
- **Pricing:** Free + premium
- **Dificultad:** beginner
- **Tags:** presentations, reports, AI, visual
- **Rol en el stack:** Genera reportes visuales del Daily Digest y QA reviews. Abdul necesita ver datos de forma rapida y visual desde el telefono, no documentos de texto largos.
- **Integracion con motor IA:** El output del Daily Digest (Claude) se pasa a Gamma para generar el reporte visual. Puede automatizarse via ClickUp.
- **MCP disponible:** No

---

## Mapa de Integraciones

```
VICIdial (MySQL/API)
       |
       ├──[ClickUp: API/automations]──→ Tracking de agentes, tareas QA, onboarding
       |                              |
       |                              ├──→ Claude Code: daily-performance-digest
       |                              |         |
       |                              |         └──→ Gamma AI: reporte visual
       |                              |
       |                              └──→ Alertas (ClickUp notifications)
       |
       ├──[Audio recordings]──→ Fireflies.ai ──→ Transcripts
       |                                              |
       |                                              └──→ Claude Code: qa-scorecard
       |
       └──[VICIdial Web UI]── Agentes usan el dialer normalmente
              |
              └── Claude Code skills (en maquina del supervisor):
                    ├── call-simulator-insurance
                    ├── agent-onboarding
                    ├── campaign-script-generator
                    └── (QA + Digest ya conectados arriba)

Notion (knowledge base)
    |
    └── Scripts, SOPs, protocolos ──→ references/ de los skills
```

---

## Orden de Setup Recomendado

1. **Claude** — configurar primero. Instalar Claude Code en maquina del supervisor/operations manager. Los skills dependen de esto.
2. **Notion** — crear workspace con estructura de documentacion: scripts, SOPs, compliance. Llenar CON Abdul los protocolos reales de cada campana.
3. **Fireflies.ai** — configurar transcripcion. Definir con Abdul como subir grabaciones del VICIdial (manual inicialmente, automatizado despues).
4. **Gamma AI** — configurar para reportes visuales. Templates para daily digest y QA report.
5. **n8n** — ultimo porque requiere acceso al MySQL de VICIdial y que los otros componentes ya esten listos. Configurar workflows de automatizacion.

---

## Herramientas del Cliente que Mantenemos

- **VICIdial (VT Dialer):** Se mantiene como sistema core. No se reemplaza — se potencia con la capa de inteligencia.
- **Infraestructura de call center (Pakistan):** Sin cambios.

## Herramientas del Cliente que Reemplazamos

- Ninguna. El stack se monta ENCIMA de lo que ya tienen. No hay disrupcion.

---

## Notas Tecnicas

### Acceso al VICIdial
- Necesitamos credenciales de API o acceso MySQL al VICIdial para que n8n pueda jalar data
- Abdul debe confirmar si el VICIdial es self-hosted o managed
- Si es managed, verificar si el proveedor permite acceso API/DB externo

### Volumen de Transcripcion
- Con 300-400 agentes, NO se transcriben todas las llamadas
- QA tipicamente revisa 5-10% de llamadas (sample)
- Para 400 agentes x ~30 calls/dia = 12,000 calls/dia → sample de 600-1,200 calls/dia para QA
- Evaluar plan de Fireflies que soporte ese volumen, o usar Claude API directamente para transcripcion bulk

### Deployment de Skills
- Los skills se instalan en la maquina del supervisor/QA manager via Claude Code
- No requieren deployment de servidor
- Los references/ (protocolos, scorecards) se mantienen actualizados manualmente o via sync con Notion
