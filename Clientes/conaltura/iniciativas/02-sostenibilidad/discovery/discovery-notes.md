# Discovery Notes — Conaltura · Iniciativa 02 Sostenibilidad

**Fecha reunión:** Abril 2026 (primera reunión Sostenibilidad)
**Asistentes:** Daniel Perez (Director de Sostenibilidad de Proyectos Inmobiliarios, Conaltura), Sara Garces (Irrelevant)
**Tipo:** Discovery virtual con screen share del sistema BI
**Conexión:** Claudia Garces (Fundadora, tía de Sara) refirió a Daniel.

---

## 1. Sobre el área

- **Dirección:** Sostenibilidad de Proyectos Inmobiliarios (depende de Dirección de Estrategia, Innovación y Sostenibilidad).
- **Distinto a:** Sostenibilidad Corporativa (Empresa B, gobierno corporativo, ESG empresarial).
- **Responsabilidad:** que los proyectos sean sostenibles en TODO el ciclo de vida:
  - **Estructuración y diseño:** criterios BIO + certificaciones de construcción sostenible.
  - **Construcción:** planes de manejo ambiental, planes de gestión de residuos (RCD), permisos ambientales.
  - **Operación:** validación de que los ahorros vinculados en diseño se cumplen (agua, energía, carbono embebido).
- **Equipo:** una persona dedicada a estructuración/diseño, otra a construcción.
- **Obras activas:** 18 obras simultáneas.
- **Regionales:** Área Metropolitana Medellín, Bogotá y la Sabana, Cali, Barranquilla, Cartagena.

---

## 2. Infraestructura tecnológica actual

### Lo que tienen
- **Base de datos SQL propia** — 100% de Conaltura. Alimentada por formularios internos (BIC).
- **Power BI** con tableros por dimensión: agua, energía, huella de carbono, economía circular, trámites ambientales.
- **Formularios internos** para diligenciar data → SQL → Power BI.
- **OneDrive** con toda la documentación de las 18 obras, organizada por obra y por tipo de trámite (RCDs, certificados, aprovechamientos in situ, punto limpio, disposición final, RESPEL posconsumo, licencias de gestores).
- **Sincosoft (CINCO)** importa consumo de materiales → alimenta huella alcance 3 (TI mete la info al SQL).
- **Módulo BI de reportes trimestrales** — ya imprime automáticamente el anexo de la resolución por obra/trimestre.

### Lo que NO tienen
- Lectura automática de certificados, fotos y PDFs que llegan de obra.
- Alertas proactivas sobre vencimientos de trámites ambientales.
- Análisis predictivo / benchmarking entre proyectos terminados y activos.
- Auto-completado de formularios desde data no estructurada.

### Criterios BIO (ya definidos, solo se evalúan)
Energía y confort, salud y confort (emplazamiento contra poniente, ventilación natural), materialidad reflectiva en fachadas, ventanería con control solar, iluminación eficiente, controles de iluminación.

---

## 3. Dolores principales

### DOLOR #1 — Llenado manual de formularios (agua, energía, huella, RCDs)
- Los trabajadores en obra diligencian formatos (papel/Excel) para agua potable, agua lluvia, agua recirculada, consumo de energía.
- El formato sube al equipo de sostenibilidad → un analista tira los números manualmente a los formularios de la plataforma → Power BI pinta.
- Los **certificados de RCDs** (recogida, aprovechamiento, disposición final, RESPEL, punto limpio) llegan en PDF → un analista lee cada certificado y digita cantidades en el formulario.
- **Daniel:** *"Todo lo montamos manual."*
- **Lo que quiere:** foto/PDF al agente → agente llena el formulario solo.

### DOLOR #2 — Sin alertas proactivas sobre trámites ambientales
- **Hoy:** Daniel se reúne cada semana y revisa manualmente. *"Me acuerdo."*
- Trámites críticos y sus plazos:
  - **Plan de gestión RCDs:** radicación 1 mes antes del inicio de obra + reportes trimestrales mes vencido (ej. Q1 hasta el 15 de abril). Plan final al cierre de obra.
  - **Permiso de aprovechamiento forestal:** 1 año antes del inicio de obra (autoridad ambiental Valle de Aburrá).
  - **Permiso de ocupación de cauce:** tiempos similares.
  - **Requerimientos de la autoridad ambiental:** 30 días calendario para responder — *"ni un día más."*
- Flujo de permiso: radicación → auto de inicio → visita técnica → (requerimiento OR resolución).
- **Lo que quiere:**
  - Alertas configurables por urgencia (1 mes antes, 8 días antes, cuando lleva X tiempo sin moverse).
  - Cuando entra requerimiento: leerlo → resumir en observaciones → extraer fecha máxima de respuesta.

### DOLOR #3 — Sin análisis predictivo de consumos entre proyectos
- Daniel tiene data histórica de proyectos **terminados** (Catalana, Foresta, Soley) y **activos** (Livorno, Almendro).
- Cada proyecto genera curva de consumo acumulado (agua, energía, residuos, huella) durante su fase constructiva.
- **Lo que quiere:**
  - Curva promedio de consumos de proyectos terminados, agrupados **por regional** (ciudades diferentes = climas y consumos diferentes).
  - Comparar proyecto activo contra esa curva → *"si está por encima o por debajo."*
  - Recalcular automáticamente cuando termine otro proyecto (la curva aprende).
  - Aplica a las 4 dimensiones: agua, energía, residuos, huella de carbono.
- **Dato clave:** todo ya está en formularios mes a mes por proyecto — extraíble directamente del SQL.

---

## 4. Lo que propuso Sara

### Agente de Sostenibilidad — 3 módulos
1. **Ingestor de documentos** → lee foto/PDF de formatos y certificados, llena formularios automáticamente.
2. **Monitor de trámites** → alertas configurables + lectura automática de requerimientos (resumen + fecha máxima).
3. **Motor predictivo** → curva promedio por regional, comparación automática de proyectos activos vs curva, recálculo al cerrar proyectos.

### Plus (mencionado por Sara, a validar con Daniel)
- Capacidad conversacional: preguntarle al agente estado de un proyecto, por qué un dato se ve así, quién es responsable.

### Enfoque técnico (dos caminos)
- **Opción A:** 100% Claude (más barato, sin recurrencia de agente).
- **Opción B:** Agente custom Irrelevant (si la complejidad lo amerita).
- **Decisión:** Sara la valida con equipo de ingenieros antes de la próxima reunión.

### Comportamiento del agente (3 niveles)
1. Si está 100% seguro, hace solo.
2. Si tiene duda, pregunta y sigue.
3. Si es muy complejo, escala a humano.

---

## 5. Preocupaciones / riesgos

### Riesgo técnico — extracción de certificados heterogéneos
Los certificados de RCDs los generan gestores externos en formatos no estandarizados. El módulo de ingestión tiene que ser robusto a variación de layout.

### Riesgo de mapeo — múltiples datos por formulario
Los formularios tienen varios campos. Hay que mapear exactamente dónde vive cada dato en el SQL. Daniel se ofreció a mostrar el mapeo.

### Estandarización por regional
La curva predictiva debe ser comparable intra-regional (Medellín vs Medellín), no cross-regional (ciudades con climas y consumos muy distintos).

### NDA
Aplica el NDA general de Conaltura (solicitado por Claudia en reunión de Gerencia). No hubo solicitud explícita en esta reunión — confirmar que cubra a Daniel antes del trabajo técnico.

---

## 6. Personas clave

| Persona | Cargo | Rol en la decisión | Notas |
|---|---|---|---|
| **Daniel Perez** | Director de Sostenibilidad de Proyectos Inmobiliarios | Champion, usuario principal, decisor técnico del área | Ordenado, tiene todo mapeado. Responde muy entusiasta. Va a pasar el material a un ingeniero interno. |
| **Claudia Garces** | Fundadora | Sponsor de la relación | Conectó a Daniel con Sara. No estuvo en esta reunión. |
| **Persona de estructuración/diseño** | — | Usuaria | — |
| **Equipo de construcción** | — | Usuarios | Alimentan formularios en obra. |
| **Analistas que digitan certificados** | — | Usuarios liberados | El agente los reemplaza en la digitación. |
| **TI interno** | — | Técnico | Hoy mueve data de CINCO/Sincosoft al SQL — potencial interlocutor técnico. |

---

## 7. Proyectos mencionados

| Proyecto | Estado | Regional |
|---|---|---|
| Catalana | Terminado | — |
| Foresta | Terminado | — |
| Soley | Terminado | — |
| Almendro | Activo | — |
| Livorno | Activo | — (ejemplo usado por Daniel) |

Total: 18 obras activas.

---

## 8. Próximos pasos acordados

1. **Sara** analiza con equipo de ingenieros: Claude puro vs agente custom para cada módulo.
2. **Próxima reunión:** **martes 28 de abril 2026, 3:00 pm** — Sara trae propuesta aterrizada de los 3 procesos, paso a paso y cotización.
3. Durante la semana: Sara puede preguntarle cosas por WhatsApp.
4. Daniel va a pasar material al ingeniero interno.
5. **NDA:** validar que cubra a Daniel antes del trabajo técnico.

---

## 9. Frases clave (para propuesta)

- Daniel: *"Todo lo montamos manual."*
- Daniel: *"Si me llena los formularios me harías un favor... mucho."*
- Daniel: *"Yo me reúno cada semana y reviso... me acuerdo. Pero lo que dices tú pues que alguien te pueda avisar."*
- Daniel: *"Que saque de una vez la fecha máxima del requerimiento."*
- Daniel: *"Yo necesito que eso se vaya puliendo de manera automática... siempre a futuro se ajuste."*
- Sara: *"Ustedes tienen todo muy ordenado... es muy fácil implementar algo donde ya hay orden porque la gente solo tiene que seguir instrucciones."*
- Sara (cierre): *"Me llevo toda esta información y te traigo una propuesta súper aterrizada."*

---

## 10. Señales de compra

- **Alta intención.** Responde "Total", "Súper", "Mucho", "De una" a todas las propuestas.
- **Procesos ordenados:** Daniel ya tiene el flujo mapeado y la data estructurada — implementación más simple de lo habitual.
- **Champion con autonomía** sobre su área.
- **Segunda reunión agendada antes de colgar:** martes 28 abril 3:00 pm con propuesta y cotización.
- **Va a mostrar a un ingeniero interno:** va a presionar por arrancar.

---

## 11. Clasificación

- **Servicio probable:** **Ops Layer** — 3 procesos delimitados (ingestión, alertas, análisis predictivo). Opción de escalar a Core mini si se vuelve conversacional/multi-proceso.
- **Temperatura:** 🔥🔥🔥🔥 muy caliente.
- **Complejidad técnica:** Media-alta (OCR de certificados heterogéneos, integración con SQL propio, motor predictivo por regional con recálculo incremental).
- **Tamaño potencial:** Ops Layer estándar.
