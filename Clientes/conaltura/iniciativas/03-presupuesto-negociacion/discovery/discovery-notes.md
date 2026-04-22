# Discovery Notes — Conaltura · Iniciativa 03 Presupuesto y Negociación

**Fecha reunión:** Abril 2026 (primera reunión)
**Asistentes:**
- Hernán — Director de Presupuesto y Negocios a nivel nacional
- Kate — Coordinadora de Negociaciones a nivel nacional
- Natalia (Naty) — Coordinadora de Presupuestos regional Bogotá y Caribe (remota)
- Mariana (Mari) — Coordinadora de Presupuestos regional Medellín
- Sara Garces (Irrelevant)

**Tipo:** Discovery presencial con screen share de guía presupuestal y tableros BI
**Contexto previo:** Hackathon interno de Conaltura (~2 semanas antes) donde Kate presentó propuesta de automatización de cuadros comparativos (quedó finalista). Claudia Garces conectó el área con Irrelevant para dar continuidad.

---

## 1. Sobre el área

### Estructura
- **Dirección:** Presupuesto y Negocios (unificada hace ~8 meses por decisión de gerencia).
- **Responsabilidad nacional:** Hernán (director).
- **Presupuestos:** Naty (Bogotá + Caribe), Mari (Medellín).
- **Negociaciones:** Kate (nacional).
- **Próxima expansión:** agregar equipo de **Legalización de contratos** (hoy lo hace jurídica + analistas en obra con mucho teléfono roto entre jurídica → analista → proveedor).

### Por qué se unió presupuesto + negocios
El presupuesto no era real. El cálculo de cantidad está bien (Revit modela bien), pero los precios fallaban: negociaban a 100 pesos y presupuesto seguía montando a 50 porque no había retroalimentación. Hernán: *"El deber ser de nuestra área de negocios es entregar un precio ideal a presupuestos."*

### Volumen
- **23 obras activas** (a confirmar, mencionado por Kate para indexación).
- **82-97 procesos** de negociación dentro del área (Kate).
- **200-400 correos diarios** al inbox `gest-compras@` manejado por 4 personas.

---

## 2. Infraestructura actual

### Sistemas
- **Sigo** (guía presupuestal antigua, todavía consultable) → **Cinco/Sincosoft** (sistema actual).
- **Excel**: herramienta principal de administración. Hernán: *"Para mí Excel defiende más que Power BI. Power BI es la presentación, Excel es la administración."*
- **Power BI**: presentación de tableros de adjudicaciones, etc.
- **Tablero de programación / CPI**: alimenta fechas de ejecución.

### Archivos planos
Después de montar cada presupuesto en Cinco, sacan archivo plano Excel y lo guardan localmente por seguridad (por si pasa algo en Cinco).

---

## 3. Guía presupuestal: cambio estructural (clave para todo lo demás)

### Antes vs ahora
| Métrica | Guía vieja | Guía nueva |
|---|---|---|
| Líneas | 10.756 | 2.315 |
| Subcapítulos | 32 | 10 |
| Códigos | ~2.000 ítems | ~2.000 ítems reorganizados |
| Lógica de agrupación | **Por material** | **Por actividad** |

### Cambios conceptuales clave
1. **Agrupación por actividad, no por material.** Ejemplo: antes "Cerámica Atlanta 60x60" separado de "Cerámica Atlanta 30x60" aunque ambos sean para piso de apartamento. Ahora "Enchape de Apartamento" (agrupa ambos). Resultado: permite comparar obras en línea, antes imposible.
2. **Consolidación de provisionales.** Antes: oficina (X01), almacén (X02), cuarto trabajadores (X03), bodega (X04) con costos separados → la obra cargaba todo el cemento en un solo código porque no iba a dividir sacos. Ahora: "Construcciones provisionales" (Y01) con un solo costo.
3. **Ensayos de mampostería.** Antes: 4 ensayos separados. Ahora: uno solo con todo adentro.

### Historia de Conaltura
- 35 años de operación.
- **2-3 años muy bien documentados** en la anterior guía presupuestal (esto es lo accesible y comparable).
- La nueva guía lleva **8 meses de trabajo** construyéndose.

---

## 4. Dolores / procesos a automatizar

### DOLOR #1 — Comparación guía vieja vs guía nueva (bloqueante para todo lo demás)
- ~2.000 códigos viejos tienen que mapearse a la nueva guía para que la data histórica (2-3 años) sea utilizable.
- Ejemplo: códigos 540, 541, 542 de la vieja → todos equivalen al 2749 de la nueva.
- Los subcapítulos cambiaron de nombre (ej. "punto fijo" desapareció como subcapítulo y quedó dentro del nombre del ítem).
- **Hoy:** Excel de combinación de códigos, comparación manual cuando algo cambia.
- **Lo que quieren:** matriz que agrupe las dos bases y diga el equivalente. Trabajo **capítulo por capítulo**, no toda la guía de una.
- **Viabilidad:** muy alta — Sara lo validó como primera tarea para la IA.

### DOLOR #2 — Falta de alcance estandarizado por actividad
- Misma actividad con precios muy diferentes porque el alcance no está claro.
- Ejemplos concretos:
  - **Red eléctrica baja tensión:** 44 ML a 36 mil, 82 ML a 39 mil, 81 ML a 40 mil, 28 ML a 104 mil. Depende de número de postes y tipo de cable, no expuesto.
  - **Chute de basuras:** negociado por ML global. Pero codo vale mucho, compuertas también. Edificio de 20 pisos → codo dividido entre 20 (costo bajo). Chute de 3 pisos → codo entre 3 (costo alto). Presupuesto alimentaba 12 o 20 pesos según el día.
  - **Ventanería:** negocian por ventana específica (700+ ventanas), pero presupuesto necesita precio por m² para calcular ventanas que aún no existen.
- **Lo que quieren:** que en el cuadro comparativo al final siempre salgan datos discriminados (por m², por componente) aunque el contratista cotice global. Que ese dato se vaya a una matriz gigante.

### DOLOR #3 — Construcción manual de la "gran matriz" de presupuestos
- Manejan 3 presupuestos por proyecto:
  - **P1** — decisión de compra de lote.
  - **P2** — salida a ventas, por indicadores.
  - **P3** — presupuesto de obra, detallado.
- Hoy: cada presupuesto se copia manualmente a distintos archivos para distintas áreas (gerencia de producto, gerencia de proyectos, interno).
- **Lo que quieren:**
  - IA lee cualquier presupuesto nuevo → alimenta automáticamente una matriz central.
  - De la matriz salen los entregables para cada área (formato distinto según destinatario).
  - Versión 1: Excel alimenta Excel. Versión 2: entregables por área. Versión 3: envío automático por correo (no ahora, "qué peligro").

### DOLOR #4 — Cálculo de P2 por indicadores / tenores
- Cada actividad depende de una variable clave: sanitarios → # apartamentos; enchape → m² apartamento; etc.
- Hernán está construyendo una **matriz de tenores** (arquitectura lista, contenido incompleto).
- **Lo que quieren:** IA calcula P2 automáticamente aplicando tenores a los datos del proyecto nuevo.

### DOLOR #5 — Lista de precios histórica con indexación automática
- No existe lista unificada de precios. Cada que indexan manualmente (ej. diciembre 2025: salario +23%).
- Hoy manualmente: bajan contrato, revisan precios, consumido, pendiente por ejecutar, juegan con porcentaje, uno por uno. 23 obras, múltiples contratistas por obra, algunos con 2 contratistas para la misma actividad.
- **Lo que quieren:**
  - Matriz histórica de precios con indexación automática.
  - Simulación de impacto de indexación por contratista/obra.
  - Lista de precios unificada consultable por Naty y Mari sin tener que preguntarle a Kate.
  - Naty: *"No puedo consultar a Kate a las tres de la mañana."*

### DOLOR #6 — Cuadros comparativos manuales (quick win, ya hay prototipo)
- Cada licitación genera múltiples cotizaciones que hay que leer, comparar en condiciones económicas y técnicas, identificar inconsistencias, generar ranking, y asignar tareas al equipo.
- Hoy: horas de trabajo manual por cada comparativo, parte más técnica (bombas RCI, ascensores, calderas, plantas eléctricas) requiere expertise que el equipo no tiene.
- **Prototipo del hackathon:** Kate propuso solución con Claude — sube cotizaciones en zip → genera comparativo, condiciones técnicas, ranking, tareas para el equipo (ej. "pepito no leyó bien la propuesta y le faltó X").
- **Estado:** propuesta validada internamente, Nico (interno) ya armó interfaz. Falta acceso formal a Claude.
- **Lo que quieren:** cerrar este desarrollo + que todo lo comparado alimente la matriz histórica de precios.

### DOLOR #7 — Agente conversacional sobre datos
- Cuando gerencia pregunta "¿por qué este presupuesto bajó tanto porcentaje?" o "¿por qué en esta obra gastamos más cemento que en esta otra con los mismos m²?"
- Hoy: búsqueda manual lenta.
- **Lo que quieren:** agente que conversa con la data. Sara mencionó que es viable y lo están haciendo en otros clientes.

### DOLOR #8 — Alertas de desviación
- Hernán tenía formulado a punta de colores en Excel: verde si el promedio se mantiene, rojo si se va. Buscaba los rojos y revisaba.
- **Lo que quieren:** alertas automáticas cuando una variable se pasa de lo permitido (ej. "el lleno compactado con arenilla siempre valió 20 mil y acá se fue en 32 mil"). Informe automático Excel o PDF con las desviaciones.

### DOLOR #9 — Desconexión entre lo adjudicado y lo subido a Cinco
- Negociaciones adjudica con un formato definido. La obra lo sube a Cinco pero puede cambiarlo.
- Presupuesto saca adjudicaciones del tablero Cinco → **dato no siempre confiable**.
- Ejemplo: si presupuesto discrimina por metro lineal, compuerta y codo, pero la obra sube todo junto por ML, el tablero sigue mostrando el error.
- **Lo que quieren:** garantizar consistencia entre lo adjudicado (salida de negociaciones) y lo cargado en Cinco. Hoy no lo logran.

### DOLOR #10 — Gestión del inbox `gest-compras@`
- 4 personas comparten el mismo inbox. 200-400 correos diarios por cotizaciones.
- Buena práctica de centralización, pero operacionalmente desgastante.
- Hoy: rotación diaria — una persona lee todo y manda chat "te llegó tal, te llegó tal".
- Kate ya está trabajando en algo pero no ha podido terminar.
- **Lo que quieren:**
  - IA clasifica correos por profesional (carpintería → Mamen, aseos → Paula, RCI → Camilo).
  - Genera accionables/tareas en bandeja personal de cada uno (no en el inbox compartido).
  - Correos "sin doliente" (comunicados de contratista, demandas) se enrutan automáticamente (Hernán para demandas, Kate/Mari para fin de año, etc.).
  - Interfaz tipo bandeja personal que descanse del inbox compartido.

---

## 5. Lo que propuso Sara

### Los módulos / agentes que salen del discovery
1. **Comparador de guías presupuestales** — mapeo vieja ↔ nueva, capítulo por capítulo.
2. **Ingestor de presupuestos** — lee P1/P2/P3 y alimenta matriz central + genera entregables por área.
3. **Motor de tenores** — calcula P2 por indicadores desde data histórica.
4. **Matriz de precios con indexación** — histórica + simulación de alza por contratista/obra.
5. **Automatizador de cuadros comparativos** — continuar y consolidar el prototipo del hackathon.
6. **Agente conversacional sobre data** — preguntas tipo "por qué bajó este presupuesto".
7. **Monitor de desviaciones** — alertas + informes Excel/PDF de actividades fuera de rango.
8. **Clasificador de correos + bandejas personales** — para el inbox gest-compras.
9. **(Opcional, versión futura)** — garantía de consistencia adjudicado ↔ Cinco.

### Enfoque técnico (dos caminos)
- **Claude directo** — 15 días, cuando alcanza. Anthropic, tecnología probada.
- **Agente Irrelevant custom** — 2 meses, cuando la complejidad lo amerita.
- **Capa educativa** — capacitación para que el equipo pueda mantener y extender.

### Comportamiento del agente (3 niveles)
1. Match perfecto → hace solo.
2. Match con dudas → pregunta.
3. No sabe → escala a humano (evita alucinaciones).

---

## 6. Preocupaciones / riesgos

### Riesgo técnico — variedad de formatos
- Cotizaciones llegan como FDL propio o como PDF del contratista, heterogéneos.
- Presupuestos tienen estructura Excel que hay que leer con precisión.

### Riesgo de proceso — falta de única fuente de verdad
- Datos en Cinco pueden ser modificados por obra.
- Archivos planos guardados localmente por cada coordinación.
- La matriz central debe resolver esta fragmentación.

### Riesgo de dependencia — construcción escalonada
- La matriz histórica requiere terminar primero la matriz de mapeo guía vieja → nueva.
- El motor de tenores requiere terminar la matriz de arquitectura (incompleta).
- Hay **secuencia obligada**: dolor #1 → dolor #3 → dolor #4.

### Acceso a Claude
- Hoy TI maneja el acceso. Formalizar esto es requisito para arrancar la automatización de cuadros comparativos (dolor #6, hay prototipo listo).

### NDA
- Aplica el NDA general de Conaltura (gestionado por Claudia). Confirmar cobertura de este equipo antes del trabajo técnico.

---

## 7. Personas clave

| Persona | Cargo | Rol en la decisión | Notas |
|---|---|---|---|
| **Hernán** | Director de Presupuesto y Negocios a nivel nacional | **Champion, decisor técnico y comercial del área** | Muy claro técnicamente, tiene la visión de las matrices y tenores. 8 meses trabajando la nueva guía. |
| **Kate** | Coordinadora de Negociaciones nacional | Champion secundaria, impulsora del hackathon | Propuso la solución de cuadros comparativos. Ya probó Claude con mampostería. Está trabajando gestión de correos. |
| **Natalia (Naty)** | Coord. Presupuestos Bogotá + Caribe | Usuaria directa | Remota. Empujó el tema de "poder consultar precios sin levantar la mano". |
| **Mariana (Mari)** | Coord. Presupuestos Medellín | Usuaria directa | Conoce al detalle la guía nueva y los cambios de lógica. |
| **Nico** | Interno (perfil técnico) | Ya construyó interfaz para Claude para cuadros comparativos | — |
| **Claudia Garces** | Fundadora | Sponsor | Hizo preguntas a Hernán que originaron esta reunión ("una IA puede decirte dónde hay posibles errores"). |
| **TI interno** | — | Control de acceso a Claude | Hay que formalizar el acceso. |
| **Mamen, Paula, Camilo** | Profesionales del área | Usuarios | Cada uno maneja actividades específicas (carpintería, aseos, RCI, etc.). |

---

## 8. Próximos pasos acordados

1. **Sara** manda correo con recap de lo hablado.
2. **El equipo de Conaltura** manda:
   - Presentación del hackathon (Kate).
   - Cualquier flujo o paso a paso que tengan de los procesos.
3. **Sara** con equipo de ingenieros valida qué se puede con Claude y qué requiere agente Irrelevant.
4. **Próxima reunión:** la semana siguiente (fecha específica no fijada en la reunión — agendar). Sara trae propuesta aterrizada con **priorización por urgencia/impacto** de los módulos.
5. **NDA:** validar cobertura para Hernán, Kate, Naty, Mari antes del trabajo técnico.
6. **Acceso a Claude:** coordinar con TI para formalizar.

---

## 9. Frases clave

- **Hernán:** *"Somos el primer cliente nosotros mismos. Yo construyo el presupuesto y ¿cómo lo revisamos? Con una gran matriz comparable."*
- **Hernán (sobre el chute de basuras):** *"Error de ellos no, error nuestro no — cortocircuito."*
- **Hernán (sobre P1/P2/P3):** *"Una cosa es cómo lo negocio y otra cosa es cómo lo necesita presupuesto."*
- **Kate:** *"Partimos de que en todas las obras se presupuestan igual pero no se ejecutan igual. Los valores unitarios varían dependiendo de la persona que está en el rol."*
- **Kate:** *"Me imagino un Excel con todas mis actividades, un listado de contratistas, un listado de precios y un listado de alcances."*
- **Naty:** *"No puedo consultar a Kate a las tres de la mañana."*
- **Hernán:** *"Esta reunión resultó por eso. Claudia me preguntaba — una IA puede decirte dónde hay posibles errores."*
- **Sara:** *"La IA hay que pensarla como una persona inteligente que se entrena."*
- **Sara:** *"Si ustedes tienen claro el proceso y lo saben explicar, no hay pierde."*

---

## 10. Señales de compra

- **Muy alta intención.** Hernán y Kate vienen pidiendo esto hace meses — hackathon interno fue el punto de inflexión.
- **Prototipo ya construido** (cuadros comparativos con Claude, Nico hizo interfaz). Solo falta formalizar acceso y consolidar.
- **Dolores cuantificados:** 200-400 correos/día, 23 obras, 82-97 procesos, 10.756 → 2.315 líneas de guía, 2.000 códigos.
- **Champion técnico y visionario:** Hernán tiene la arquitectura mental completa (matrices, tenores, entregables por área).
- **Champion secundaria ejecutora:** Kate está probando Claude por cuenta propia.
- **Buy-in de gerencia:** Claudia originó la reunión.
- **Hay equipo técnico interno:** Nico puede ser contraparte para integraciones.

---

## 11. Clasificación

- **Servicio probable:** **Core Layer** — por volumen (9+ módulos), profundidad (data histórica de 2-3 años, 23 obras, 2.000 códigos) e interdependencias (secuencia obligada #1 → #3 → #4).
  - Alternativa: Ops Layer grande con priorización agresiva — empezar con #1 (comparador) + #6 (cuadros comparativos) + #10 (correos), que son quick wins con prototipo/data lista.
- **Temperatura:** 🔥🔥🔥🔥🔥 máxima.
- **Complejidad técnica:** Alta (integración con Sincosoft/Cinco, múltiples Excel, lectura de PDFs heterogéneos, motor de cálculo con tenores, matriz histórica con indexación, clasificación de correos).
- **Tamaño potencial:** La iniciativa más grande de Conaltura. Core Layer extenso o cluster Ops Layer grande.

---

## 12. Secuencia recomendada (mi lectura para la propuesta)

### Quick wins (primeras 2-4 semanas)
- **#6 Cuadros comparativos** — ya hay prototipo y visibilidad (hackathon). Momentum organizacional inmediato.
- **#10 Gestión de correos** — Kate ya está trabajándolo, impacto diario alto.

### Columna vertebral (semanas 4-12)
- **#1 Comparador de guías** — bloquea a #3 y #4. Prioritario.
- **#5 Matriz de precios + indexación** — alimentada por #6.
- **#3 Ingestor de presupuestos → matriz central + entregables** — una vez #1 listo.

### Escalamiento (mes 3+)
- **#4 Motor de tenores** — necesita matriz arquitectural completa.
- **#7 Agente conversacional** — sobre matriz consolidada.
- **#8 Alertas de desviación** — sobre matriz consolidada.
- **#9 Consistencia Cinco** — requiere intervención organizacional más que técnica.

**Advertencia:** no imponer esta priorización en la propuesta (memoria de Sara: "en propuestas con múltiples procesos ordenar por impacto organizacional y no imponer rankings; cliente decide"). Presentar priorización como recomendación con racional, dejar que Hernán ajuste.
