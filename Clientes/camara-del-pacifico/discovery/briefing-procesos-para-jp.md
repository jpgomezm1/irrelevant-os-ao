# Cámara del Pacífico · briefing interno para JP

**Para:** Juan Pablo Gómez Mejía
**De:** Sara Garcés Tobón
**Fecha:** 2026-04-30
**Asunto:** Definición de capa (Ops vs Core) y opciones de propuesta para Cámara del Pacífico
**Discovery procesado:** 2026-04-30 con Carlos Olaya (Director Ejecutivo, 14 años en la Cámara) y Tania de la Rosa (Área comercial). Presidente sobre Carlos: Alberto Zapater.
**Timing crítico:** martes 5-may presentación cotización · jueves 7-may comité directivo aprueba/rechaza.

---

## Contexto en 3 líneas

- Cámara de comercio **multilateral** entre 6 países (México, Panamá, Colombia, Ecuador, Perú, Chile).
- Todo lo que hacen es convocar empresarios a actividades — misiones, eventos, ferias.
- Pidieron explícitamente "un agente que ayude en procesos repetitivos" + "centro de control donde repose la información".

---

## PROCESO 1 · Convocatoria a Misiones Empresariales

### Qué es

El proceso completo de organizar y ejecutar una misión empresarial a uno de los 6 países: desde que sale la convocatoria hasta que se factura a las empresas que finalmente viajan.

### Cómo lo describieron en la call · flujo paso a paso

1. **Definición del evento** — fechas, país destino, agenda.
2. **Publicación del minisitio** — lo anclan a la web institucional, contiene info + form de registro.
3. **Convocatoria masiva por correo** — desde **Mail Turbo**. Cargan listas y lanzan campañas.
4. **Filtrado de respuestas** — manual hoy. Reciben opt-outs, interesados, "envíenme propuesta directa", etc.
5. **Reuniones 1:1 con interesados** — entre **20 y 50 reuniones por convocatoria**, hoy mayoritariamente virtuales.
6. **Bifurcación según el camino que pida cada empresa** — son tres caminos concretos:
   - "Quiero reunión" → agendamiento manual.
   - "No quiero reunión, mándame la propuesta directa" → envío directo de propuesta.
   - "Mándame más información" → envío de material adicional.
7. **Envío de propuesta** — template **ya estandarizado**. Volumen ~50 propuestas por evento.
8. **Recepción de aceptación** — la empresa devuelve formato de inscripción + RUT + documentación.
9. **Generación manual de documentos** — Tania abre Word, edita el template, cambia datos por empresa:
   - Carta de aceptación
   - Carta de compromiso
   - Volumen ~15-20 cartas por misión
10. **Generación y envío de factura** — hoy se hace en **Factura Tech** (facturador) y se contabiliza en **Elisa** (software contable). Se envía a la empresa.

### Volumen y frecuencia

| Métrica | Valor |
|---|---|
| Misiones por semestre | 3 (este semestre: Panamá, Ecuador, una más que Tania no recordó) |
| Misiones por año (estimado) | 6 |
| Inscritos confirmados por misión | ~15-20 |
| Reuniones 1:1 por convocatoria | 20-50 |
| Propuestas enviadas por convocatoria | ~50 |
| Cartas (aceptación + compromiso) por misión | ~30-40 (15-20 × 2) |

### Quién lo opera

- **Tania de la Rosa** + **Jennifer** (jefa de Tania).
- En misiones donde participan otras personas del área comercial, también ellas se suman al envío de documentos.
- Stack que usan hoy: Suite CRM · Mail Turbo · Word · Drive · Dropbox · Factura Tech · Elisa · correo · WhatsApp interno.

### Lo que quieren resolver

- Que las cartas, facturas, propuestas y listados **salgan automáticamente** cuando llegue una inscripción.
- Que **deje de pasar** el olvido humano de un documento (el caso típico que mencionó Tania: se manda la carta y se olvida la factura).
- Que toda la información del flujo viva en **un solo lugar** y no en 5 sistemas distintos.
- Que la base de datos de email marketing **se higienice sola** (opt-outs persistentes, deduplicación entre listas).

### Interrogantes que tenemos que resolver con JP

1. **¿Interfaz custom o sin interfaz?**
   - **Con interfaz:** Carlos pidió textualmente un "centro de control donde repose la información". Eso suena a panel custom → **Core Layer**.
   - **Sin interfaz:** se puede entregar como carpetas estructuradas en Drive + Claude orquestando, con reportes automáticos. → **Ops Layer**.
   - **Pregunta abierta para el cliente:** ¿el "centro de control" significa una UI con login, dashboards y filtros, o se conforman con tener todo organizado en Drive con visibilidad por reportes recurrentes?

2. **¿Conexión vía API o flujo asistido?**
   - Hay 4 sistemas externos: **Suite CRM, Mail Turbo, Factura Tech, Elisa**.
   - Con API pública → integración nativa (más caro, más robusto).
   - Sin API → semi-automatización con Claude generando archivos que un humano sube (más barato, más cuello de botella).
   - **Pregunta abierta:** ¿hasta dónde llega el alcance de la automatización? ¿el agente factura solo o sólo prepara la factura para que alguien la envíe?

3. **¿WhatsApp aparece en este proceso?**
   - En el flujo de Misiones **NO mencionaron WhatsApp** explícitamente — sólo correo institucional.
   - Salvo que quieran que el agente confirme reuniones 1:1 por WhatsApp, esto se mantiene 100% por correo → se puede hacer con **Claude (Ops Layer)** sin necesidad de desarrollo de agente custom.

4. **¿Agendamiento de las 20-50 reuniones 1:1 entra en scope o se queda manual?**
   - Si entra → el agente tiene que conectarse a calendario del equipo y manejar disponibilidades.
   - Si no entra → se reduce 30% el alcance y baja precio.

---

## PROCESO 2 · Convocatoria a Eventos Particulares

### Qué es

Eventos puntuales — no son misiones de viaje sino **eventos temáticos** que la Cámara organiza (ejemplo que dio Carlos: *"un evento de cómo venderle a Perú o cómo hacer negocios con Perú"*). Pueden ser presenciales o virtuales, gratuitos o pagos.

### Cómo lo describieron en la call · flujo paso a paso

1. **Definición del evento** — tema, fecha, formato.
2. **Convocatoria masiva por correo** — desde Mail Turbo, igual que misiones.
3. **Inscripciones** — los interesados se inscriben vía form.
4. **Recordatorios pre-evento** — Carlos lo describió así: *"con esa lista de inscritos hay que enviarles de pronto un WhatsApp de recordatorio, un correo de recordatorio, un correo de confirmación, todo ese cuento."*
5. **Confirmación de asistencia**.
6. **Ejecución del evento** (fuera de scope automatizable).

### Volumen y frecuencia

- Carlos no dio números concretos pero implicó que el volumen de inscritos en eventos es **mayor que en misiones** (eventos online → más asistentes posibles).
- Frecuencia: parecida o superior a misiones, especialmente eventos digitales temáticos.

### Diferencias clave con Proceso 1 (Misiones)

| Característica | Misiones (P1) | Eventos (P2) |
|---|---|---|
| Reuniones 1:1 con prospectos | Sí (20-50) | No |
| Propuestas individuales | Sí (~50) | No |
| Cartas de aceptación/compromiso | Sí (~30-40) | No |
| Facturación | Sí | A veces (si el evento es pago) |
| Recordatorios masivos | No (más reuniones) | **Sí — el dolor central** |
| Canal de recordatorio | Correo solo | **WhatsApp + correo** |
| Volumen de público | Bajo (15-20) | Alto (decenas o cientos) |

### Lo que quieren resolver

- Mandar **recordatorios automáticos** a inscritos antes del evento.
- Mandar **confirmaciones automáticas** post-inscripción.
- Tener visibilidad de quién se inscribió, quién recibió qué recordatorio, quién confirmó asistencia.

### Interrogantes que tenemos que resolver con JP

1. **¿WhatsApp o sólo correo?** — esta es **la decisión de capa más importante de este proceso**.
   - Carlos asumió que se podía mandar por ambos canales. **No saben** que:
     - **WhatsApp tiene costo** por mensaje (WhatsApp Business API).
     - **WhatsApp requiere desarrollo custom** — Claude no se conecta a WhatsApp directamente, hay que construir un agente.
     - **Correo no tiene costo de transacción** y se puede hacer 100% con Claude.
   - **Decisión interna:** ¿le presentamos las dos opciones al cliente y que ellos decidan, o le recomendamos correo de entrada por costo?
   - **Implicación de capa:**
     - Sólo correo → **Ops Layer** posible.
     - WhatsApp involucrado → **Core Layer** obligatorio (al menos para esta pieza).

2. **¿El proceso 2 se construye en el mismo agente que el proceso 1 o son agentes separados?**
   - En la call Sara mencionó que "obviamente aumenta el alcance del agente" — Carlos lo tomó como un solo agente, pero técnicamente puede ser un núcleo común con dos flujos.
   - **Implicación de scope y precio:** si es un solo agente, el costo marginal del proceso 2 es bajo. Si son dos agentes, se duplica.

3. **¿Confirmación de inscripción inmediata?** — ¿el agente debe responder al inscribirse mostrando datos del evento, o sólo mandar recordatorios programados?

4. **¿Hay segmentación de listas por interés?** — en eventos temáticos por país, ¿se manda a toda la base de datos o filtran por país de interés del afiliado? Esto cruza con el Proceso 3 (higiene de bases) que está pendiente de definir.

---

## PROCESO TRANSVERSAL · Higiene de bases de datos

Aplica a Proceso 1 y 2. No es un proceso operativo sino una **capa de administración** que ambos comparten.

Lo que pidieron:
- Que cuando alguien diga "no me interesa, no me vuelvas a escribir", esa señal se persista y se respete en todas las campañas futuras.
- Que la deduplicación entre listas funcione automáticamente.
- Que se filtre por interés (alguien que dice "interesado en Perú" no recibe campañas de México).

**Interrogante para JP:** esto se construye como **una sola fuente de verdad encima de Mail Turbo + Suite CRM**, o se delega a un sistema externo. ¿Lo metemos en el alcance o lo postergamos?

---

## DECISIÓN OPS VS CORE · matriz para JP

La decisión depende de 3 ejes ortogonales:

| Eje | Si la respuesta es ESTO | La capa sugerida es |
|---|---|---|
| **Interfaz** | Panel/dashboard custom con login | Core Layer |
| **Interfaz** | Carpetas en Drive + reportes automáticos | Ops Layer |
| **WhatsApp** | Sí, mandamos por WhatsApp | Core Layer (al menos en P2) |
| **WhatsApp** | Solo correo | Ops Layer alcanza |
| **Centro de control** | Vista en tiempo real con filtros | Core Layer |
| **Centro de control** | Reporte semanal/mensual generado | Ops Layer |

**Mi lectura inicial:** lo que pidieron textualmente apunta a Core Layer (Carlos dijo "centro de control" + WhatsApp + integraciones a 4 sistemas). Pero el volumen no justifica Core si recortamos scope.

---

## PROPUESTA · llevar 2 opciones al cliente (idea inicial de Sara)

### Opción A · Ops Layer · "Operación automatizada sin interfaz custom"

- 5 skills sobre Claude que cubren Proceso 1 y Proceso 2.
- Output a Drive estructurado + reportes automáticos al correo del equipo.
- **Solo correo**, sin WhatsApp.
- One-shot, $7M COP + IVA.
- Listo en ~1 semana.

### Opción B · Core Layer · "Plataforma con interfaz + WhatsApp"

- Núcleo de agente custom con UI propia (centro de control).
- Conexiones nativas a Suite CRM, Mail Turbo, Factura Tech, Elisa.
- WhatsApp para Proceso 2 (recordatorios).
- Implementación inicial + retainer mensual.
- Precio basado en impacto (a definir con JP).

---

## Validaciones técnicas pendientes (independientes de la capa)

- API pública de **Elisa** (software contable).
- API pública de **Factura Tech**.
- Integración con **Suite CRM** (probable, es open source).
- URL exacta de **Mail Turbo** (Tania ya confirmó que el nombre es "Mail Turbo" pero hay 3 productos posibles con ese nombre — pedir URL a Tania).

---

## Preguntas concretas para JP (lo que necesito que decidas)

1. **¿Llevamos 2 opciones (Ops y Core) o cerramos una sola dirección?**
2. **¿WhatsApp lo presentamos como upsell o lo metemos en el scope inicial de la opción Core?**
3. **El "centro de control" que pidió Carlos: ¿lo construimos como UI custom (Core) o lo entregamos como Drive estructurado + reportes automáticos (Ops)?**
4. **¿Quién hace la validación técnica de las 4 APIs antes del lunes?**
