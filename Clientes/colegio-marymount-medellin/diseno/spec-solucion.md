# Spec Técnico — Colegio Marymount Medellín (Core Layer)

**Fecha:** 2026-04-14
**Tipo de solución:** Sistema integrado de 4 agentes conectados a la operación financiera del colegio
**Preparado por:** Sara Garcés (Irrelevant)
**Audiencia:** Equipo de desarrollo Irrelevant

---

## Arquitectura de Alto Nivel

**Patrón:** Multi-agente orquestado con interfaz central (dashboard unificado). Cada componente es un agente autónomo que puede operar independiente, pero todos reportan a un dashboard común y comparten datos vía una base central (Supabase).

**Canal principal:** Web app autenticada para el equipo administrativo de Marymount. Correo para notificaciones a padres/proveedores. No hay canal WhatsApp por ahora (no se mencionó en discovery como prioridad).

**Modelo principal:** Claude Sonnet 4.6 para todo el procesamiento (clasificación facturas, generación correos, conciliación, Q&A sobre presupuesto). Claude Opus 4.6 solo si una tarea lo amerita (dashboard Q&A complejo).

**Infraestructura:**
- Backend: FastAPI + Python
- Base de datos: Supabase (PostgreSQL + auth + storage)
- Frontend: React + Tailwind + Recharts para el dashboard
- Deploy: Vercel (frontend) + Heroku/Google Cloud (backend)
- Orquestación: Celery + Redis para tareas asíncronas (envío masivo de correos, conciliaciones)

---

## Stack Tecnológico

→ **Ejecutar `/disenar-stack colegio-marymount-medellin`** para tener detalle con catálogo Supabase en tiempo real.

Herramientas candidatas preliminares:
- **Claude API** (Anthropic) — core de IA
- **Loggro API** — sistema contable del cliente (API pública confirmada en developer.loggro.com)
- **Phidias** — sistema académico/cartera (requiere contacto directo con Phidias para habilitar integración)
- **Gmail API / Google Workspace** — para envío de correos desde dominio de Olguita y lectura del correo de facturas
- **Supabase** — storage + DB + auth
- **Resend o SendGrid** — envío transaccional (backup a Gmail API si se necesita)

---

## Integraciones Necesarias

| Integración | Propósito | Estado |
|---|---|---|
| **Loggro API** (`developer.loggro.com`) | Leer movimientos contables, egresos, cuentas para conciliación y dashboard | ✅ API pública, validar plan Marymount |
| **Phidias** | Leer reporte de cartera (deudores + montos + datos contacto padres) | ⚠️ Requiere contacto con Phidias para habilitar; plan B = exportar Excel |
| **Gmail API** (dominio Olguita) | Enviar correos personalizados de cartera | ✅ OAuth Google, requiere autorización Marymount |
| **Gmail API** (correo administrativo) | Leer correos con facturas para el agente de aprobación | ✅ OAuth Google, requiere autorización |
| **Bancolombia** (y otros bancos) | Descargar extractos para conciliación | ⚠️ La mayoría no expone API — plan A: conectar directo si es posible, plan B: drop manual de Excel al sistema |
| **Adobe Acrobat Sign** | Firma digital de facturas aprobadas | Por validar: ver si Marymount tiene API o si se queda como flujo paralelo |

---

## Componentes de IA

### Componente 4: Agente de Cobro Personalizado "Olguita AI"

**Inputs:**
- Reporte de cartera de Phidias (CSV o API, según acceso): nombre padre/madre, hija/alumna, monto adeudado, meses vencidos, email
- Histórico de correos enviados por Olguita (~100+ muestras) para aprender su tono
- Reglas de escalamiento configurables

**Flujo:**
1. Cron mensual (día 15 y 30) → agente lee reporte Phidias
2. Para cada deudor: genera correo con Claude + few-shot learning de correos Olguita
3. Envía vía Gmail API desde `olguita@marymount.edu.co` (dominio de ella)
4. Logea envío en Supabase (historial auditable)
5. Si deudor lleva >60 días sin pagar: cambia a "caso crítico" → notifica a Olguita para llamada personal

**Modelo:** Claude Sonnet 4.6 con system prompt enriquecido con muestras del tono de Olguita. Temperature baja (0.3) para consistencia.

**Complejidad:** Baja-media. Principal riesgo = acceso al reporte de Phidias. Mitigación = Olguita exporta Excel semanal a carpeta compartida y agente lo procesa desde ahí.

---

### Componente 1: Conciliador Automático

**Inputs:**
- Extractos bancarios mensuales (Bancolombia y otros) — inicialmente drop manual de Excel, idealmente vía API bancaria
- Movimientos de Loggro (vía API) por cuenta
- Datos Phidias → Loggro (para cruce ingresos)

**Flujo:**
1. Usuario (Alexander/Dorita) sube extracto bancario o cron lo jala de Loggro
2. Agente normaliza ambos archivos (resuelve tema "no sale con títulos" que mencionó María Luisa)
3. Cruce por fecha + monto + descripción fuzzy-match (usa embeddings de Claude si descripción no es exacta)
4. Identifica 3 categorías:
   - **Match perfecto** → marca como conciliado
   - **Match con ajustes menores** → presenta para validación 1-click
   - **Sin match** → presenta diferencia, pide contexto humano
5. Guarda conciliación histórica + aprende patrones (ej: "vigilancia siempre el día 5 del mes, 4.2M")

**Modelo:** Claude Sonnet 4.6 para descripción semántica + lógica de matching. Embeddings (`text-embedding-3-small`) para descripciones que no coinciden literalmente.

**Complejidad:** Media. Riesgo principal = calidad/formato de archivos bancarios (cada banco exporta distinto). Mitigación = construir parser configurable por banco en Fase 0.

**6 cuentas a conciliar:** bancos principales (2-3), deudores, ingresos (cruce Phidias), retención en la fuente, otros.

---

### Componente 2: Agente de Aprobación de Facturas

**Inputs:**
- Correo administrativo (vía Gmail API)
- Presupuesto anual por centro de costo (ingestado desde el Excel de María Luisa)
- Histórico de facturas aprobadas (aprende valores recurrentes)

**Flujo:**
1. Agente escucha el correo en tiempo real
2. Para cada factura recibida:
   - Extrae datos (OCR + Claude): proveedor, concepto, monto, fecha, NIT
   - Clasifica: ¿es recurrente? ¿valor coincide con histórico? ¿está en presupuesto?
3. Decisión:
   - **Recurrente + mismo valor + dentro presupuesto** → auto-aprueba con firmas pre-autorizadas de Sara y María Luisa → envía a Loggro para causación
   - **Recurrente + valor cambió** → notifica a María Luisa: "La factura de X cambió de $A a $B, ¿apruebas?"
   - **No recurrente o excede presupuesto** → flujo normal (Sara → María Luisa → causación)
4. Logea todo para auditoría

**Modelo:** Claude Sonnet 4.6 + visión (para OCR de PDFs de facturas). Temperature muy baja (0.1) para clasificación determinista.

**Complejidad:** Media. Riesgo principal = integración con Adobe Acrobat Sign para firmas digitales. Mitigación = si Adobe no tiene API viable, generar PDF firmado programáticamente con certificados digitales de Sara y María Luisa almacenados en vault.

---

### Componente 3: Dashboard Financiero Inteligente

**Inputs:**
- Presupuesto anual por área/centro de costo/proyecto (ingestado desde Excel)
- Ejecución real de Loggro (vía API)
- Datos de conciliación del Componente 2

**Flujo:**
1. Ingesta inicial: María Luisa sube el Excel del presupuesto; sistema lo parsea y guarda
2. Sync automático: cada noche jala ejecución de Loggro
3. Dashboard visual:
   - Pie charts por centro de costo
   - Líneas de ejecución vs. presupuesto mensual
   - Comparativo año académico (jun–may) vs. año fiscal (ene–dic) — resuelve el pain point del calendario B
   - Variación año vs. año
4. Q&A en lenguaje natural:
   - María Luisa escribe: "¿Por qué el centro de costo de mantenimiento subió este mes?"
   - Agente consulta la base de datos, encuentra las facturas del mes, compara con mes anterior, explica

**Modelo:** Claude Sonnet 4.6 para Q&A + text-to-SQL para consultar Supabase. Opus 4.6 solo si el análisis requiere razonamiento complejo.

**Complejidad:** Media-alta. Principal reto = garantizar que el dashboard cuadre con los números oficiales de Loggro (fuente de verdad). No puede haber discrepancias.

---

## Modelo de Datos (Alto Nivel)

### Entidades principales
- `facturas` (id, proveedor, monto, fecha, concepto, centro_costo, estado, recurrente, firma_sara, firma_maria_luisa)
- `conciliaciones` (id, cuenta, mes, año, estado, diferencias_json, revisado_por)
- `cartera` (id, padre, alumna, saldo, dias_vencido, ultimo_correo_fecha, estado)
- `correos_enviados` (id, destinatario, tipo, enviado_por_agente, remitente, timestamp)
- `presupuesto` (id, centro_costo, proyecto, mes, año_academico, año_fiscal, monto_presupuestado, monto_ejecutado)
- `usuarios` (id, rol, email, permisos)
- `logs_auditoria` (id, entidad, accion, usuario_o_agente, timestamp, data_json)

### Volumen estimado
- Facturas: ~200–300/mes (estimado, validar en Fase 0)
- Conciliaciones: 6 cuentas × 12 meses = 72/año
- Correos cartera: ~30–50/mes
- Usuarios: ~10 (equipo administrativo + contabilidad)

---

## Riesgos Técnicos

| Riesgo | Probabilidad | Mitigación |
|---|---|---|
| Phidias no habilita integración API | Media | Plan B: export Excel manual desde Phidias, ingestado por sistema. Degrada UX pero funciona. |
| Extractos bancarios no tienen API | Alta | Plan B: drop manual de Excel. Colombia aún no tiene open banking maduro. |
| Loggro API no expone endpoints necesarios | Baja | Validar en Fase 0. Si faltan endpoints: escalar con Loggro (son colombianos, responden) |
| Alucinación del agente Olguita (tono falso) | Media | Few-shot con >100 correos reales + temperature baja + review humano de primeros 20 envíos |
| Discrepancias dashboard vs. Loggro oficial | Media-alta | Loggro es fuente de verdad. Dashboard solo lee, nunca escribe valores contables. |
| Resistencia al cambio del equipo contable (Alexander, Dorita) | Alta (factor humano) | Capacitación incluida + rollout gradual + Olguita/María Luisa como champions internos |

---

## Estimación de Esfuerzo

| Fase | Duración |
|---|---|
| Fase 0 (diagnóstico + validación de APIs + acceso a sistemas) | 2 semanas |
| Componente 1 (Olguita) | 2 semanas |
| Componente 2 (Conciliador) | 3 semanas |
| Componente 3 (Facturas) | 2 semanas |
| Componente 4 (Dashboard) | 3 semanas |
| Integración + testing end-to-end | 1 semana |
| **Total implementación** | **10 semanas** (con paralelización entre componentes 1 y 2) |

---

## Pricing Sugerido

**Ranges preliminares** — validar con Juan Pablo y contra capacidad actual del equipo.

| Concepto | COP (+IVA) | Notas |
|---|---|---|
| Fase 0 | $15.000.000 | 2 semanas, documento entregable |
| Implementación (4 componentes) | $30.000.000 – $40.000.000 | Depende de alcance de integración Phidias |
| Fee mensual recurrente | $2.500.000 – $3.500.000 / mes | Soporte + iteración + evolución |

**Total primer año (conservador):** $45M implementación + $30M fee = $75M COP + IVA

**Consideraciones comerciales:**
- María Luisa mencionó que no tiene línea de presupuesto para esto → probablemente necesita escalar aprobación. Plantear plan de pago gradual si aplica.
- Marymount no ha cotizado con nadie más → tenemos ventaja competitiva pero no tenemos anchor de precio. No subvaluar.
- Señales de deal fuerte: comité financiero pidiendo explícitamente, urgencia pensión Dorita, Irrelevant es única opción en mesa.

---

## Siguientes Pasos Internos

1. **Validación técnica previa a la reunión (urgente):** ingeniero revisa `developer.loggro.com/reference/introduccion-pymes` y `-enterprise` para confirmar endpoints disponibles.
2. **Pedirle a María Luisa que consulte con TI del colegio:** API Key de Loggro + posibilidad de integración con Phidias.
3. **Después de la reunión del jueves:** si hay intención de avanzar, ejecutar `/disenar-stack colegio-marymount-medellin` y luego `/cotizacion` o directamente `/fase0` (según acuerdo comercial).
