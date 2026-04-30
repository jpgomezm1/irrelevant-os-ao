# Conaltura · Iniciativa Presupuesto y Negociación
**Para:** JP · **De:** Agustín · **Fecha:** 2026-04-27
**Pregunta a resolver:** ¿Ops Layer grande o Core Layer?

---

## Contexto en 4 líneas
- Área: Dirección de Presupuesto + Negocios nacional (unificada hace 8 meses).
- Champion: Hernán (director, visión completa) + Kate (negociaciones, ya prototipó con Claude en hackathon).
- Origen: Claudia Garcés (sponsor) conectó al equipo con Irrelevant tras hackathon interno.
- Próxima reunión: martes 28-abr 1:30pm — Sara lleva propuesta aterrizada.

## Volumen
- **23 obras activas** · **82-97 procesos de negociación** · **173 negociaciones/mes** generan cuadro comparativo
- Guía presupuestal: **10.756 → 2.315 líneas**, **~2.000 códigos** a remapear
- **2-3 años de histórico** documentado · **200-400 correos/día** en inbox compartido (4 personas)
- Sistemas: Sigo (vieja) · Cinco/Sincosoft (actual) · Excel · Power BI · FDL propio

---

## Los 9 procesos pedidos

### #1 · Comparador guía vieja ↔ nueva
Conaltura llevaba 35 años con una guía presupuestal de **10.756 líneas organizadas por material**. Hace 8 meses la rediseñaron a **2.315 líneas organizadas por actividad** (ej. antes tenían "Cerámica Atlanta 60x60" separada de "Cerámica Atlanta 30x60"; ahora ambas viven dentro de "Enchape de Apartamento", lo que permite por primera vez comparar obras entre sí). El problema: tienen **~2.000 códigos viejos** que necesitan equivalencia con los nuevos para que la data histórica de 2-3 años siga siendo utilizable. Hoy ese mapeo lo hacen manualmente en Excel, capítulo por capítulo. Quieren una matriz que diga "códigos viejos 540, 541, 542 → código nuevo 2749", y poder trabajarla por capítulo y no de un solo golpe.
**Complejidad técnica:** media-alta (no es mapping algorítmico — requiere reglas de negocio caso por caso).
**Crítico:** **bloquea #2 y #3.** Sin esto, ningún histórico es comparable.

### #2 · Ingestor P1/P2/P3 → matriz central + entregables por área
Cada proyecto maneja **3 presupuestos distintos**: P1 cuando se decide comprar el lote, P2 cuando sale a ventas (calculado por indicadores), P3 cuando arranca obra (detallado). Hoy cada uno se copia manualmente a archivos distintos para gerencia de producto, gerencia de proyectos e interno — cada área pide el dato en un formato diferente. Quieren que AI lea cualquier presupuesto nuevo, lo cargue a una matriz central única, y de ahí salgan automáticamente los entregables formateados por destinatario. Hernán lo puso en 3 fases: (V1) Excel alimenta Excel; (V2) entregables específicos por área; (V3) envío automático por correo *("eso no ahora, qué peligro")*.
**Complejidad técnica:** alta (lectura confiable de Excel estructurado + reglas de transformación por destinatario).
**Depende de #1.**

### #3 · Motor de tenores para cálculo de P2
En la guía nueva cada actividad depende de una variable clave llamada **tenor**: sanitarios → # apartamentos, enchape → m² apartamento, ventanería → m² fachada, etc. Hernán está construyendo personalmente la **matriz de tenores** — la arquitectura ya está lista pero el contenido sigue incompleto. La idea es que cuando entre un proyecto nuevo, AI calcule el P2 automáticamente aplicando los tenores correctos a los datos del proyecto. Hoy P2 se calcula manualmente y a ojo experto.
**Complejidad técnica:** alta (motor de cálculo determinístico encima de data histórica + tenores).
**Depende de #1 + matriz de tenores cerrada por Hernán.** Si Hernán tarda en cerrarla, este módulo no arranca.

### #4 · Matriz histórica de precios + indexación automática
Hoy **no existe lista unificada de precios** en el área. Manejan 23 obras activas, cada una con varios contratistas (a veces 2 para la misma actividad). Cuando hay que indexar precios (ej. en diciembre 2025 el salario subió 23%), bajan cada contrato manualmente, miran qué se ha consumido, qué falta por ejecutar, juegan con el porcentaje, contratista por contratista. Naty (Bogotá+Caribe) y Mari (Medellín) hoy le tienen que preguntar a Kate cuando necesitan saber un precio puntual — Naty lo dijo textual: *"no puedo consultar a Kate a las tres de la mañana"*. Quieren una matriz histórica unificada + un simulador de impacto de indexación por contratista/obra + consulta autoservicio para Naty y Mari sin pasar por Kate.
**Complejidad técnica:** media (modelo de datos + UI de consulta + reglas de indexación).
**Se alimenta de #5** (los cuadros comparativos disciplinan la entrada de precios a la matriz).

### #5 · Automatizador de cuadros comparativos *(MVP ya construido)*
Cada licitación les llega con múltiples cotizaciones en formatos heterogéneos (FDL propio o PDFs que arma cada contratista). El equipo tiene que leerlas, comparar condiciones económicas y técnicas, identificar inconsistencias, generar ranking, y asignar tareas (ej. *"pepito no leyó bien la propuesta y le faltó X"*). En el hackathon interno de Conaltura, **Kate + Nico construyeron un MVP con Claude** que toma cotizaciones en zip y genera cuadro comparativo + condiciones técnicas + ranking + tareas para el equipo. Ellos mismos midieron el ahorro: pasan de **370 hrs/mes (11.6 días-persona) a 9.7 hrs/mes — 99% reducción · 60 segundos por cuadro**. La propuesta quedó finalista del hackathon. Lo único que falta es **acceso formal a Claude vía TI Conaltura** para escalarlo del prototipo a producción.
**Complejidad técnica:** baja-media para consolidar lo construido (sube si se quiere extender a partes muy técnicas como bombas RCI, ascensores, calderas, plantas eléctricas que requieren expertise específica).
**Quick win sin bloqueo. Es el primer entregable natural.**

### #6 · Agente conversacional sobre data
Cuando gerencia pregunta cosas como *"¿por qué este presupuesto bajó tanto porcentaje?"* o *"¿por qué en esta obra gastamos más cemento que en esta otra con los mismos m²?"*, hoy es búsqueda manual en Excel y Power BI que les puede tomar horas. Quieren un agente que conversa con la matriz consolidada y responde con la data real, citando la fuente. Tecnología que Irrelevant ya tiene corriendo en otros clientes — pero requiere tener primero la matriz consolidada (#1 + #2 + #4) para que las respuestas sean confiables; si no, alucina.
**Complejidad técnica:** media.
**Depende de matriz consolidada.**

### #7 · Monitor de desviaciones con alertas
Hoy Hernán tiene formuladas reglas en Excel a punta de colores: verde si el promedio se mantiene, rojo si se sale del rango. Busca los rojos manualmente y revisa. Ejemplo que dieron textual: *"el lleno compactado con arenilla siempre valió 20 mil y de pronto se fue en 32 mil — algo se nos está pasando ahí"*. Quieren alertas automáticas cuando una variable se sale de rango, más un informe Excel/PDF con todas las desviaciones del periodo.
**Complejidad técnica:** baja-media (reglas explícitas + reporte — más simple que #6).
**Depende de matriz consolidada.**

### #8 · Clasificador de correos + bandejas personales
El inbox compartido `gest-compras@` recibe **200-400 correos diarios** (mayormente cotizaciones de contratistas). Lo manejan 4 personas con rotación diaria: cada día una persona lee todo y avisa por chat al resto *("hoy te toca, te llegó tal, te llegó tal")*. Quieren que AI clasifique cada correo por profesional responsable (carpintería → Mamen, aseos → Paula, RCI → Camilo) y genere accionables en una bandeja personal de cada uno, descansando del inbox compartido. Los correos sin doliente claro (comunicados de contratista, demandas) se enrutan automáticamente — demandas a Hernán, fin de año a Kate/Mari, etc. Kate ya está armando algo pero no ha podido cerrar.
**Complejidad técnica:** media (clasificación + integración con cliente de correo + interfaz personal).
**Quick win sin bloqueo.**

### #9 · Consistencia adjudicación ↔ Cinco
Negociaciones adjudica con un formato definido (ej. discriminado por metro lineal, codo y compuerta). La obra lo sube a Cinco/Sincosoft pero **puede modificarlo** — por ejemplo, lo sube todo junto por ML. Cuando presupuesto saca el reporte de adjudicaciones del tablero Cinco, el dato no es confiable; el tablero sigue mostrando el error que cargó la obra. Quieren garantizar consistencia entre lo que sale de negociaciones y lo que carga obra en Cinco.
**Punto crítico:** este problema es más **organizacional** (disciplina operativa, definir quién es responsable de cargar correctamente, qué se acepta y qué no) que técnico. Meterle AI sin trabajar primero el proceso no resuelve nada — es un módulo que probablemente NO debe estar en la primera ola.

---

## Riesgos técnicos abiertos
- **Acceso API Sincosoft/Cinco** — afecta #2, #4, #7, #9. No validado con un ingeniero.
- **Acceso formal a Claude** vía TI Conaltura — bloquea escalar #5.
- **Matriz de tenores** de Hernán — incompleta, bloquea #3.
- **NDA general** — pendiente confirmar cobertura de los 4 interlocutores.

## Señales para la decisión

**A favor de Core:**
- 9 módulos, no 5 → no caben en Ops (5 skills máx por paquete).
- Secuencia obligada (#1 → #2/#3, matriz consolidada → #6/#7) → requiere acompañamiento sostenido, no one-shot.
- Hernán construyendo guía + matriz de tenores en paralelo → necesita embedded operator que ajuste a medida que ellos cierran piezas.
- Tesis del cliente: *"somos el primer cliente nosotros mismos, gran matriz comparable"* — esto es palanca estratégica de la nueva guía, no eficiencia operativa puntual.
- Integraciones múltiples (Sincosoft, Excel multi-archivo, PDFs heterogéneos, FDL propio).

**A favor de Ops grande priorizado:**
- Hay 2 quick wins listos (#5 con MVP funcionando y #8 con Kate avanzando) que se entregan sin esperar nada.
- Apetito de retainer mensual recurrente NO ha sido validado con Claudia/Hernán.
- Conaltura ya tiene Iniciativa 01 Gerencia en Fase 0 — capacidad de Core en Irrelevant es 3-5 cuentas máx simultáneas.

**Ruta híbrida posible:** cerrar #5 como entregable rápido (formalizar prototipo de Nico) + vender Fase 0 Core con los 8 restantes.

## Pregunta concreta para JP
1. ¿Vamos Core (los 9 con retainer), Ops grande priorizado (5 de los 9 one-shot), o híbrido (#5 cerrado rápido + Core para el resto)?
2. ¿Validamos antes acceso API Sincosoft/Cinco con un ingeniero? Eso mueve la decisión.
