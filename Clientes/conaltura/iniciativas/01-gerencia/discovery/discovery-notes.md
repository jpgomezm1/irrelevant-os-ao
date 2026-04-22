# Discovery Notes — Conaltura
**Fecha reunión:** Abril 2026
**Asistentes:** Claudia (Fundadora), Holger (Gerente de Proyectos), Sara (Irrelevant)
**Tipo:** Primera reunión presencial en oficinas de Conaltura, Medellín

---

## 1. Sobre la empresa

- **Empresa:** Conaltura — constructora y desarrolladora de vivienda en Colombia.
- **Tamaño:** Empresa grande del sector, proyectos en Bogotá y Medellín, múltiples proyectos simultáneos.
- **Fundadora:** Claudia Garces — líder técnica y visionaria. Fue pionera en BIM en Colombia hace 10-12 años. Dominó Revit personalmente. Impulsó tablets en obra. Ha construido toda la infraestructura de datos de la empresa.
- **Gerente de Proyectos:** Holger — basado en Bogotá, viaja constantemente. Maneja todos los proyectos. Viene de Colpatria, valida que Conaltura tiene una infraestructura de datos muy superior al promedio del sector.
- **Cultura:** Claudia es la que "hace que las cosas pasen". Ha tenido resistencia interna para adopción tech (ejemplo: intentó impulsar IA con Ana María de transformación digital y con gestión humana pero le ofrecían "cineforos" en vez de soluciones reales).

---

## 2. Infraestructura tecnológica actual (MUY avanzada)

### Lo que ya tienen:
- **BIM completo:** Arquitectura diseña en Revit/BIM. Las cantidades especificadas fluyen automáticamente a Técnica y a Presupuesto.
- **ERP Sincosoft:** Sistema central donde está toda la información financiera, presupuestos, proyectos. Llevan años con Sincosoft (antes usaban Sigo 20+ años).
- **Power BI conectado en tiempo real:** +80 tableros, TODOS conectados a la operación real. No es que alguien suba datos manualmente — cuando algo pasa en cualquier ciudad/obra, se refleja inmediatamente.
- **Sistema de indicadores por colores:** verde/amarillo/rojo para alertar sobre desviaciones en los proyectos.
- **Comités con tableros:** Comité de construcción, comité de proyectos, comité de gerencia — todos alimentados por datos en tiempo real.
- **Presupuestos:** ~140 presupuestos activos, ~2.448 en el histórico (incluyendo cerrados). Cada presupuesto es un árbol gigante con actividades → subactividades → APUs.

### Lo que NO tienen:
- **Agente conversacional sobre su data.** Claudia: "¿Cómo lograr que un gerente pueda hacer preguntas y que la IA le responda en segundos?"
- **Automatización de reuniones.** Todo se toma manual, se olvida el 70%.
- **Alertas inteligentes.** Tienen colores pero no notificaciones proactivas (solo tableros pasivos).
- **Comparación automática entre versiones de presupuesto.**

---

## 3. Dolores principales (priorizados por Claudia)

### DOLOR #1 — Presupuesto y Valoración (PRIORIDAD MÁXIMA)
- Desviaciones de ~2.000 millones COP entre versiones de presupuesto que "no se controlan".
- 50% del flujo BIM→Presupuesto está automatizado, el otro 50% tiene mucha intervención humana.
- No puede comparar versiones fácilmente: "¿Por qué Cúspide subió de 19.000 a 21.000? ¿Qué cambió?"
- 140 presupuestos activos = imposible revisarlos todos manualmente.
- Claudia: "La calidad del presupuesto es MI indicador y todos se miden contra mí."

### DOLOR #2 — Sobrecarga de información para gerentes
- Holger tiene +80 tableros en tiempo real pero no tiene capacidad humana de procesarlos.
- Tiene una asistente en Bogotá (Sofía) que le ayuda a revisar, pero es insuficiente.
- Necesita comparar proyectos entre ciudades, tipos (VIS vs no VIS), etapas.
- Quiere resúmenes ejecutivos automáticos por proyecto.

### DOLOR #3 — Reuniones y comités manuales
- Comités de gerencia sin notas automáticas.
- No hay seguimiento de accionables post-reunión.
- Formato de boletines/reportes se hace manualmente.
- Claudia: "Empecemos por ahí para que se... o sea literalmente esa línea está ahí para eso."

### DOLOR #4 — Estandarización de modelos
- Claudia quiere estandarizar modelos de proyectos: que al crear un proyecto nuevo pueda decir "tráeme el resultado de esta obra exitosa de hace 3 años a valor presente" y usarlo como base.
- Cerrar proyectos históricos con fichas para reutilizar datos.

---

## 4. Lo que propuso Sara / Irrelevant

### Agente conversacional de datos (el grande)
- Conectado a Sincosoft vía API + Power BI.
- El gerente le hace preguntas: "¿Por qué subió este presupuesto?", "Comparáme estos 3 proyectos", "¿Dónde se me está bajando la TIR?".
- Notificaciones inteligentes: solo alertas críticas, no todo (Holger levantó el riesgo de "alert fatigue" por experiencia previa con Workflow).
- Generación automática de reportes/boletines para comités.
- Aprendizaje continuo: el agente aprende de las preguntas que le hacen.

### Agente de reuniones (quick win)
- Graba reuniones, toma notas, genera actas.
- Envía accionables por correo a cada participante.
- Genera formatos/resúmenes ejecutivos.
- Claudia lo quiere para Comité de Gerencia.

### Enfoque por fases
1. **Fase 1:** Agente de reuniones (rápido de implementar, impacto visible).
2. **Fase 2:** Agente de presupuesto (conectado a Sincosoft).
3. **Fase 3:** Agente de proyectos (conectado a todos los tableros Power BI).
4. **Escalamiento:** jurídica, compras, otros procesos.

---

## 5. Preocupaciones / riesgos

### Acceso a Sincosoft (API)
- Históricamente difícil. Claudia dice que les tomó ~6 meses pelear con Sincosoft para acceder a sus propias bases de datos.
- Sara dijo estar 80% segura de que se puede (Conaltura es dueña de sus datos).
- **Acción:** Sara/JP deben consultar si pueden conectarse al API de Sincosoft antes de proponer.

### Confidencialidad (CRÍTICA)
- Claudia pidió NDA desde la primera reunión: "Nada de lo que ustedes trabajan acá lo van a pasar allá".
- Ve esto como **ventaja competitiva** de Conaltura vs otros constructores.
- Sabe que Sara tiene reunión con Acrecer y otros — quiere garantías.
- **Acción:** Firmar NDA antes de empezar cualquier trabajo técnico.

### Continuidad / qué pasa si Irrelevant desaparece
- Claudia preguntó directamente. Le pasó con Sigo (el dueño se enfermó y ella tuvo que migrar a Sincosoft).
- Sara explicó: fee de implementación + fee mensual, la data queda en Conaltura, pero si Irrelevant desaparece el agente deja de actualizarse.
- **Esto hay que aterrizarlo mejor en la propuesta.**

### Alert fatigue
- Holger tiene experiencia negativa con sistema Workflow que mandaba correos diarios hasta volverse "paisaje".
- **Solución propuesta:** notificaciones limitadas solo a eventos críticos, configurables por el usuario.

---

## 6. Personas clave

| Persona | Cargo | Rol en la decisión | Notas |
|---|---|---|---|
| **Claudia Garces** | Fundadora | Champion, decision maker | Visionaria tech, construyó toda la infra de datos. Quiere esto como ventaja competitiva. |
| **Holger** | Gerente de Proyectos | Usuario principal del agente | Basado en Bogotá, maneja todos los proyectos. Viene de Colpatria, valida la calidad de datos de Conaltura. |
| **David Piedrahíta** | Por confirmar | Claudia lo mencionó como clave para la reunión | Pendiente de incluir. |
| **Hernán** | Por confirmar | Claudia lo mencionó como clave | Pendiente de incluir. |
| **Alejo** | Ventas | No prioridad ahora | Ya tiene pensamiento analítico, CRM y bots. Claudia dice que ventas no es la prioridad. |
| **Sofía** | Asistente de Holger | Trabajo manual | Actualmente hace lo que haría el agente (revisar tableros, preparar info). |
| **Ana María** | Transformación digital | Contexto | Claudia le había dado espera para ver si hacía algo con IA. |

---

## 7. Próximos pasos acordados

1. **Claudia y Holger** preparan sus preguntas: ¿qué quieren preguntarle al agente? ¿qué información necesitan de cada comité?
2. **Sara** consulta con JP/ingeniero si pueden conectarse a la API de Sincosoft.
3. **Sara** arma propuesta para el agente de reuniones (quick win).
4. **Próxima reunión:** Sara + JP (o ingeniero) + Claudia + Holger + posiblemente David Piedrahíta y Hernán. Para hacer el discovery profundo y aterrizar la propuesta.
5. **NDA:** debe firmarse antes de cualquier trabajo técnico.
6. **Encuesta Camacol:** Holger compartió encuesta de Camacol sobre hoja de ruta de IA en construcción. Sara se va a meter también.

---

## 8. Frases clave (para propuesta)

- Claudia: *"Yo sé a dónde vamos a llegar."*
- Claudia: *"Una de las ventajas competitivas que quiero de Conaltura es esta."*
- Claudia: *"Si no somos estratégicos no somos gerentes."*
- Claudia: *"El valor es: usted analiza y usted se adelanta. Siete pasos adelante del resto."*
- Holger sobre la data: *"Aquí hay mucha información ya en línea... muchos tableros porque hay mucha información tabulada y en línea y que se está moviendo todo el tiempo."*
- Holger validando el dolor: *"Tú llegas con este proyecto a Colpatria y es imposible. Aquí sí se puede porque hay información en línea."*

---

## 9. Señales de compra

- **MUY alta intención.** Claudia viene construyendo la infraestructura de datos desde 2023 esperando esto.
- Claudia dijo: "Yo ya no veo la hora de tener esa información."
- Claudia quiere que sea **ventaja competitiva exclusiva** (NDA, no compartir con otros constructores).
- Holger validó que Conaltura tiene una base de datos única en el sector.
- Claudia quiere empezar **ya**: "Que sigan dando las vueltas que nosotros vamos para adelante."
- Quick win del agente de reuniones ya está aprobado conceptualmente.

---

## 10. Clasificación

- **Servicio:** Core Layer (transformación completa por fases)
- **Temperatura:** 🔥🔥🔥🔥 (muy caliente — champion identificada, dolor real, infraestructura lista)
- **Complejidad técnica:** Alta (conexión a Sincosoft, Power BI, múltiples tableros, data en tiempo real)
- **Tamaño potencial:** Grande — implementación multi-fase + fee mensual sostenido
