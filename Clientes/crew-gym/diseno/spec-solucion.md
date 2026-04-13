# Spec Técnico: Crew Wellness Club — Core Layer

## Arquitectura de Alto Nivel
- **Tipo de solución:** Agente conversacional multi-sede + motor de follow-up + CRM operativo
- **Modelo principal:** Claude API (Anthropic) — por calidad conversacional y capacidad de contexto largo
- **Infraestructura:** Supabase (PostgreSQL + Auth + Edge Functions + Realtime)
- **Canal principal:** WhatsApp Business API (2 números: Medellín + Cali)
- **Dashboard:** React + Supabase Realtime

## Stack Tecnológico Recomendado
> Usar `/disenar-stack crew-gym` para el detalle completo

- **Backend:** Python (FastAPI) o TypeScript (Node.js)
- **Base de datos:** Supabase (PostgreSQL)
- **AI/LLM:** Claude API (Anthropic) para conversación + clasificación
- **Mensajería:** WhatsApp Business API (Meta Cloud API o proveedor BSP)
- **Frontend dashboard:** React + Vercel
- **Scheduling:** Cron jobs para follow-up + reactivación (Supabase Edge Functions o Celery)
- **Hosting:** Heroku o Google Cloud Run

## Integraciones Necesarias

- **WhatsApp Business API:** Canal principal de comunicación. 2 números (MDE: +573016818447, CAL: +573016667921). Requiere Business Verification de Meta.
- **Fit Me Wise:** Software de gestión del gym. API NO documentada públicamente. Tiene "integraciones financieras" y "automatización con IA" según su web, pero necesita investigación directa. Posible integración via webhook o API REST si existe. Si no: sincronización manual o CSV periódico.
- **Instagram:** Para captura de leads desde pauta (si tienen formularios de Instagram conectados)
- **Google Calendar / Cal.com:** Para agendamiento de clases de prueba (evaluar si Fit Me Wise maneja esto)

## Componentes de IA

### 1. Agente Conversacional WhatsApp
- **Modelo:** Claude 3.5 Sonnet (balance costo/calidad para volumen alto)
- **Flujo:** Mensaje entrante → Clasificación de intención (nuevo lead / cliente existente / consulta) → Respuesta contextual → Calificación del lead → Agendamiento si aplica
- **Complejidad:** Media-Alta
- **Contexto necesario:** Horarios por sede, precios por plan, modalidades de clase, FAQs, políticas de clase de prueba
- **Herramientas del agente:** Consultar horarios, verificar disponibilidad de clase, agendar clase de prueba, registrar lead en CRM

### 2. Motor de Follow-up
- **Modelo:** Claude Haiku (generación de mensajes personalizados, bajo costo por volumen)
- **Flujo:** Lead no convierte → Entra a secuencia → Timing configurable → Mensaje personalizado según estado del lead → Si responde: handoff al agente principal
- **Complejidad:** Media
- **Secuencias:**
  - Post-clase de prueba sin compra (día 1, día 3, día 7)
  - Mostró interés pero no agendó (día 1, día 4)
  - Lead frío (semana 2, semana 4)

### 3. Sistema de Reactivación
- **Modelo:** Claude Haiku
- **Flujo:** Identificar clientes inactivos (no asisten hace X tiempo) → Segmentar por tipo → Generar mensaje personalizado → Enviar por WhatsApp → Trackear respuesta
- **Complejidad:** Media
- **Segmentos:**
  - Inactivo 2 semanas
  - Inactivo 1 mes
  - Cancelado hace <3 meses
  - Cancelado hace >3 meses

### 4. CRM Operativo
- **Sin modelo AI** — es infraestructura pura
- **Entidades:** Leads, Clientes, Interacciones, Membresías, Clases de Prueba
- **Dashboard:** Métricas en tiempo real por sede

## Modelo de Datos (Alto Nivel)

### Entidades principales:
- `leads` — nombre, teléfono, sede, fuente, estado, score, fecha_creación
- `clients` — nombre, teléfono, sede, membresía_activa, última_visita, estado
- `conversations` — lead_id/client_id, canal, timestamp, tipo_interacción
- `messages` — conversation_id, role (user/assistant), content, timestamp
- `trial_classes` — lead_id, fecha, sede, asistió, convirtió
- `followup_sequences` — lead_id, secuencia, paso_actual, próximo_envío
- `reactivation_campaigns` — client_id, segmento, mensaje, enviado, respondió

### Relaciones clave:
- Lead → Conversations → Messages (1:N:N)
- Lead → Trial Classes (1:N)
- Lead → Followup Sequences (1:1)
- Client → Reactivation Campaigns (1:N)

### Volumen estimado:
- ~600 leads/mes (20/día)
- ~1,800 mensajes/día (estimado con follow-up)
- ~200 clientes para reactivación/mes (estimado inicial)

## Riesgos Técnicos

1. **API de Fit Me Wise inexistente o limitada**
   - Mitigación: Diseñar CRM standalone que funcione independientemente. Si hay API, integrar. Si no, sincronización manual o CSV.
   - Impacto: No bloquea el proyecto — reduce automatización de agendamiento.

2. **WhatsApp Business API approval**
   - Mitigación: Iniciar proceso de verificación ASAP. Tener cuenta fallback con Twilio o proveedor BSP colombiano.
   - Impacto: Puede agregar 1-2 semanas al timeline.

3. **Experiencia previa fallida con IA (enero 2026)**
   - Mitigación: Entender exactamente qué probaron y qué falló. Diferenciarse desde el inicio con demo funcional.
   - Impacto: Riesgo de resistencia al cambio del equipo operativo.

4. **Volumen de mensajes y costos de API**
   - Mitigación: Usar Claude Haiku para follow-up masivo, Sonnet solo para conversaciones principales. Estimar costos de WhatsApp API por volumen.
   - Impacto: Fee mensual debe cubrir costos de infraestructura.

## Estimación de Esfuerzo

| Fase | Semanas | Descripción |
|------|---------|-------------|
| Diagnóstico | 1-2 | Mapeo de flujos, definición de intenciones, diseño conversacional |
| Desarrollo agente | 2 | Agente WhatsApp + integración con base de datos |
| Follow-up + Reactivación | 2 | Motor de secuencias + campañas de win-back |
| CRM + Dashboard | 1-2 | Pipeline, métricas, visualización |
| Testing | 1 | Pruebas con leads reales, ajustes de tono y flujo |
| Lanzamiento | 1 | Go-live, entrenamiento, soporte intensivo |
| **Total** | **8-10** | |

## Pricing

- **Implementación:** $15.000.000 COP + IVA (50% anticipo / 50% entrega)
- **Fee mensual:** $3.500.000 COP + IVA (soporte, mantenimiento, optimización, infraestructura)
- **Vigencia:** 15 días calendario
