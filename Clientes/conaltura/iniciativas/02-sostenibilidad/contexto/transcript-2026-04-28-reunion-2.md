# Transcript Reunión 2 — Conaltura · Iniciativa 02 Sostenibilidad

**Fecha:** 28 abril 2026
**Asistentes:** Daniel Pérez (Director de Sostenibilidad de Proyectos Inmobiliarios, Conaltura) · Sara Garcés (Irrelevant)
**Tipo:** Validación de propuesta (segunda reunión, post-discovery del 21 abril)
**Duración aproximada:** 25 minutos
**Clasificación:** Follow-up / Propuesta — validación de las 3 habilidades antes de Fase 0 + cotización

---

## Resumen ejecutivo

Sara presentó las 3 habilidades de Claude propuestas para resolver los dolores del área de Sostenibilidad de Proyectos Inmobiliarios de Conaltura. **Daniel validó las tres sin cambios estructurales.** La conversación afinó detalles de integración técnica (preferencia por conexión directa a SQL en lugar de leer el formulario de BIG), canal de alertas (SMS confirmado, no WhatsApp), trigger de recalibración del motor predictivo (100% de avance en BIG) y postergó las alertas de desviación a una versión posterior.

**Resultado:** próximo paso es Sara enviando Fase 0 + cotización el mismo 28 de abril después de su reunión con Julia. Cierre se hará vía revisión asincrónica (no requiere reunión intermedia adicional). Una vez aprobado, reunión con TI + ingeniero para arrancar.

---

## Validaciones de las 3 habilidades

### Habilidad 1 · Ingestor de documentos
- Canal de entrada: **correo + OneDrive (ambos aceptados)**
- Formato real de certificados de gestores: **mayoritariamente PDF** (no fotos)
- Destino: llenar formulario de BIG → escribe a SQL → renderiza Power BI
- Validación humana acordada para casos donde el agente no entienda algo
- Daniel: *"No, está perfecto."*

### Habilidad 2 · Monitor de trámites ambientales
- Canal de alertas: **SMS al celular** (descartó WhatsApp por costo del mensaje)
- Cadencias preliminares: 15 / 7 / 3 / 1 día antes — Daniel definirá con detalle en el doc
- **Decisión técnica clave:** Daniel prefiere que el agente se conecte directo a SQL en lugar de leer el formulario de BIG. *"Si es más eficiente que se conecte de una vez con SQL y que no tenga que leer el formulario, súper bien."*
- Ciclo de cierre: Daniel (o quien defina) marca como respondido → agente archiva con trazabilidad

### Habilidad 3 · Motor predictivo
- Segmentación: **regional + dimensión + tipo de proyecto** (no solo regional)
- Daniel: *"Que compare obras similares de Medellín. Que no se vaya a otra parte."*
- Trigger de recalibración: **cuando el porcentaje de avance en el formulario de BIG llegue a 100%** (ya existe ese campo)
- **Alertas de desviación:** diferidas a v2. Daniel quiere primero ver las curvas funcionando, luego definir thresholds. *"No sé cómo se va a comportar inicialmente. Es un paso posterior."*
- Visualización: filtros por regional / dimensión / obra específica en Power BI

---

## Información nueva vs discovery

| Aspecto | Discovery (21 abril) | Reunión 2 (28 abril) |
|---|---|---|
| Canal de alertas | "configurables" | **SMS confirmado** (descartó WhatsApp) |
| Conexión a BIG | Vía formulario | **Directo a SQL preferible** |
| Trigger cierre proyecto | "Cuando termine" | **% avance = 100% en BIG** |
| Alertas de desviación predictivo | Implícitas | **Diferidas a v2 (post-curvas funcionando)** |
| Canal ingestor de documentos | Por definir | **Correo + OneDrive (ambos)** |

---

## Información pendiente (Daniel debe entregar)

1. Muestras reales de documentos: fotos, PDFs de formatos de obra y certificados de gestores externos con sus distintos layouts (para entrenar el agente)
2. Diccionario de campos por dimensión: mapeo 1:1 nombre del campo en formulario → nombre del campo en SQL, para las 4 dimensiones (agua, energía, residuos, huella)
3. Catálogo de gestores externos (Daniel mencionó que *"pueden variar"*)
4. Cadencias de alerta exactas por tipo de trámite (permiso forestal, RCD, requerimiento autoridad, ocupación de cauce)
5. Definición de quién cierra el ciclo de un trámite (Daniel u otra persona)
6. ID único por obra/proyecto: confirmar convención unificada en OneDrive y SQL

---

## Bloqueador técnico identificado

**TI interno administra BIG y las bases de datos SQL.** Sara necesita reunirse con TI **antes de implementar** para definir API de acceso a BIG, permisos de lectura/escritura en SQL y forma de integración del agente con esas bases.

Daniel: *"Hay que mirar cómo se integran. Cómo va a ser la integración del agente con esas bases de datos."*

---

## Señales comerciales

- Daniel mostró anclaje alto antes de saber el modelo de Claude: *"Si fuera un agente solo de desarrollo no bajamos de $18M de implementación + $5-7M mensual de fee."*
- Reacción *"Wow, eso está muy teso"* al modelo Ops Layer (pago único + $100 USD/mes Claude).
- Entendió y valoró que la licencia Claude sirve para más cosas (Code, Design, UI) y se puede compartir con el equipo.
- Aceptó timeline de ~3 semanas (1 semana por habilidad) + coordinación con TI.
- **Cierre asincrónico aceptado:** ya no requiere reunión para revisar cotización. *"No tendríamos que reunirnos porque todo está súper claro."*
- Temperatura: muy alta. Listo para cierre.

---

## Próximos pasos acordados

1. **28 abril (mismo día, después de reunión con Julia):** Sara envía a Daniel:
   - Documento Fase 0 con paso a paso detallado
   - Cotización incluida en el mismo paquete
   - Lista de preguntas pendientes (las 6 de arriba) para llenar a su ritmo
2. **Decisión asincrónica:** Daniel revisa y dice sí/no al paquete sin reunión intermedia
3. **Si sí:** reunión con TI + ingeniero de Irrelevant para arranque técnico
4. **NDA:** validar que el NDA general de Conaltura cubra el alcance con Daniel antes de trabajo técnico

---

## Frases clave

- Daniel: *"No, está perfecto."* (validación de cada habilidad)
- Daniel: *"O sea ese man lee, lo analiza y dice 've, esto es de aprovechamiento forestal, esto es de RCD'."* (sobre el monitor de trámites)
- Daniel: *"Si es más eficiente que se conecte de una vez con SQL y que no tenga que leer el formulario, súper bien."*
- Daniel: *"No, mejor SMS."* (descarte de WhatsApp)
- Daniel: *"Va puliendo, va puliendo. Ese está muy bacán."* (sobre recalibración del motor predictivo)
- Daniel: *"Wow, eso está muy teso."* (al saber el costo con Claude)
- Daniel: *"Súper cortica la reunión, súper bien, súper claro, muy eficiente."*
- Sara: *"Si tú nos dices que sí, en 15 días lo tienes funcionando."*
- Sara: *"Se valida esto que ya lo acabamos de validar. Sería bueno hablar con TI si es necesario."*

---

## Transcript completo

**Mujer (Sara):** Y yo como no, pues yo no creo que llegue a eso nunca en la vida. Bueno. Entonces. Te voy a mostrar como la presentación de lo que entendimos y ya. La idea de esta reunión es como que quede súper mapeado lo que hablé contigo. Obviamente si tengo como nuevas... ¡Ay, muchas gracias! Mil mil gracias.

**Hombre (Daniel):** Sí, sí, para que la suban...

**Mujer:** ¿Aló?

**Hombre:** Listo, muchas gracias hermano. Todo bien.

**Mujer:** ¿Impresionó qué?

**Hombre:** La cama.

**Mujer:** ¡Qué cool!

**Hombre:** Esto va a remodelar un apartamento.

**Mujer:** Ay, lo máximo. Ah, es el ochenta, sí. Le dan el ochenta. Yo te presto el setenta, el de mayor valor le dan... Ah, que ya están listos.

**Hombre:** Qué nota.

**Mujer:** Ay, Lina me escribió. ¡Hola, Lina!

**Hombre:** Ya llegaron los de la cama entonces para que esté pendiente y la suban hasta donde...

**Mujer:** De una, de una.

**Hombre:** Listo. Bueno. Listo.

**Mujer:** Entonces lo que te decía es eso. Te voy a mostrar nosotros qué entendimos de la reunión pasada. A partir de acá, esta es una presentación solamente, pero te mando después de esta reunión un documento súper detallado de el paso a paso de todo. Y ya si tienes preguntas o cosas lo vamos a pues como a aclarar y ya cuando digas como "listo, así es como yo pues hago las cosas o lo que quiero", ya te damos una cotización como en una tercera fase.

**Hombre:** Qué bien.

**Mujer:** Listo. Entonces bueno esto ya lo voy a pasar porque ya sabes qué somos...

**Hombre:** ¿Y eso lo hiciste con inteligencia artificial?

**Mujer:** Todo. Ahorita te te muestro el organigrama que hicimos nosotros. Tenemos ahí Relevant construido en IA. Entonces súper bacano pero ahorita te lo muestro.

**Hombre:** Qué nota.

**Mujer:** Listo, entonces lo que entendimos es que tienes 18 obras activas con trámites ambientales en paralelo. Tienes cuatro dimensiones que es agua, energía, residuos y huella. Cinco regionales: Medellín, Bogotá, Sabana... que te quería preguntar sobre esa, ¿es Sabana o es qué?

**Hombre:** Sabana es la Sabana, sí.

**Mujer:** Pues, ¿pero cuenta como regional?

**Hombre:** Como regional, sí.

**Mujer:** Okay. Sabana, Barranquilla y Cartagena entonces. Y tienes lo de SQL, Power BI, BIG, OneDrive, Sincosoft funcionando. Entonces lo que vimos es que ustedes ya tienen toda la información que necesitan...

**Hombre:** Aló.

**Mujer:** Aló. ¿Aló?

**Hombre:** Se equivocaron.

**Mujer:** Listo. Entonces ya tienen todo súper ordenado, simplemente hay que conectarlo pues para que sea mucho más eficiente toda la operación. Entonces, lo que pediste mapeado en habilidades de Clod. Entonces lo que vimos fue que la mayoría de estos procesos se pueden hacer con Clod. Entonces lo que te decía, nosotros siempre podemos vender un agente súper robusto y cobrarte un fee de mensual, pero si no es necesario no lo vamos a hacer.

Entonces lo primero que vimos pues fue lo de ingestor de documentos, que es lo de que subes la foto o el PDF de formato de obra y el agente llena el formulario pues solo en la plataforma. Ya vamos a profundizar esta. El monitor de trámites ambientales, el tema de las alertas. Y el motor predictivo, que es la curva que tú quieres tener como ese acceso para comparar los gastos...

**Hombre:** Los consumos.

**Mujer:** ¡Ah, eso! Los consumos. Súper. Entonces bueno, así es como se comunica todo entre sí. Entonces básicamente tenemos las entradas que son los formatos de obra que pueden llegar por papel o por Excel, PDFs, certificados de gestores, los trámites ambientales, el histórico pues que es consumo de mensual por proyecto. Y tienen esto pues como en Sincosoft tienen BIG que es el tema de la huella que lo tienen allá, ¿cierto?

**Hombre:** Ajá.

**Mujer:** Listo. Y eso se comunica con estas tres habilidades que es el de documentos, el de trámites y el motor predictivo. Y esto pues el core de datos ya existe como tal, simplemente es como organizarlo a como ustedes lo quieren ver. Y las salidas que vamos a tener es a partir de estos agentes pues vamos a tener los nuevos tableros de Power BI, las alertas de los plazos, las curvas y las desviaciones de esos consumos y la trazabilidad de la obra.

**Hombre:** Ajá.

**Mujer:** Listo. Entonces el primero es el ingestor de documentos. Entonces lo que ustedes hacen actualmente es esto: o sea los formatos en papel y Excel, una analista los digita, los certificados de gestores con layouts variables... entonces pues hay...

**Hombre:** Más que todo en PDF, ajá.

**Mujer:** Okay, en PDF, listo. Y hay riesgo como de ese error humano pues o de esa operatividad.

**Hombre:** Exacto.

**Mujer:** Entonces lo que nosotros proponemos, este es el flujo, o sea de foto al Power BI, lo que se haría es: el trabajador llena el formato en la obra (me estás diciendo que es como un PDF normal, listo, entonces lo llena), se manda ese PDF, que la idea es que se mande pues por correo... ¿tú lo recibes, cierto? ¿o por dónde lo recibes?

**Hombre:** Por correo. O se puede o se puede tomar una foto y se guarda en OneDrive.

**Mujer:** Ah, okay. Podemos elegir ambos caminos, o sea que él lo mande por correo o se tome la foto y se monte y el agente la puede coger de ahí. Entonces se podría conectar al correo o al OneDrive y ya el agente la coge. Entonces lo que pasa es que el agente coge pues como digamos ese PDF e identifica el tipo de documento. Entonces es capaz de reconocer si es un formato interno de obra, de certificado de gestora, aplica la lógica de extracción para el layout que tenga. Y extrae los campos y los mapea al esquema SQL que ustedes ya tienen. Entonces lee esa cosa, hace una extracción inteligente y llena cada campo de ese formato como ustedes lo requieren, ¿cierto?

**Hombre:** Del formulario en BIG, ajá, sí.

**Mujer:** Sí, ajá, del formulario en BIG. Y ya escribe en BIG SQL, lo vuelve Power BI, entonces ya con esa información pues te sale como todos los diagramas que ustedes están haciendo. Y obviamente puede haber un tema de que no entienda algo de la foto, pase algo, entonces la idea es que también haya una confirmación pues como de validación.

Entonces así funcionaría este flujo. Obviamente para que esto funcione necesitamos el acceso a BIG, pues el tema de las API. No sé si habría que hablar con pues con TI. Y para eso son muy importante como muestras reales de documentos. Entonces que ustedes me puedan mandar como cómo se los han mandado antes: fotos, PDFs, todo, para que el agente lo podamos entrenar. El canal de subida definido: entonces si te lo vamos a mandar por correo, si se los vamos a mandar a OneDrive, eso también hay que definirlo para que siempre llegue por la misma parte y se conecte pues solo a eso.

Lo del diccionario de campos por dimensión: entonces pues correspondencia uno a uno, nombre del campo en el formulario, nombre del campo en SQL para cada cosita, ¿cierto?, pues para que él sepa dónde los va a poner. Y eh... esto también, el catálogo de gestores externos, lista de los gestores que envían los certificados. No sé si eso varíe mucho o es como más estable.

**Hombre:** Pueden variar.

**Mujer:** Okay. Pero igual como un ejercicio inicial para armar el flujo se podría hacer, pero con tal de que ese documento llegue a ese canal (o sea el correo o el otro), simplemente se procesa y ya. Y obviamente necesitamos alguien encargado, no sé si vayas a ser tú también como que nos defina todo. ¿Ese proceso está claro? ¿Pues lo mapeamos bien? ¿Crees que falta algo?

**Hombre:** No, está perfecto.

**Mujer:** Listo. Ahora tenemos el monitor de trámites ambientales. Entonces tenemos que los plazos críticos vienen en la memoria tuya en este momento básicamente, tú semanalmente revisas el tablero que cuánto se pasó, cuánto falta para esto. Los plazos no perdonan, entonces que tienen 30 días calendarios para responder un requerimiento, un año de antelación para permisos forestales... bueno. Y olvidar uno tiene consecuencias.

**Hombre:** Así es.

**Mujer:** Listo. Tienen los PDFs sin extracción automática, entonces cuando llega uno requerimiento lo tienes que abrir, lo tienes que anotar, montar todo manual. Y bueno, ya el sistema de alertas.

**Hombre:** Ajá.

**Mujer:** Entonces lo que proponemos es de PDF alerta sin que nadie tenga que acordarse de nada. Simplemente llega un PDF del trámite (entonces el RCD, un permiso forestal, ocupación de cauce, lo que sea) cae a OneDrive o en el canal del agente (o sea correo lo mismo, donde lo queramos poner). El agente lo lee, clasifica el tiempo el tipo de trámite (entonces identifica de qué documento se trata y aplica ese plazo correspondiente).

**Hombre:** O sea ese man lee lo analiza y dice "ve, esto es de aprovechamiento forestal, esto es de RCD, esto es de...".

**Mujer:** Exacto. Sí, y obviamente si lo entrenamos, entre más se entrene él se va volviendo más teso cada vez.

**Hombre:** Excelente.

**Mujer:** Y ya entonces lo que hace es lee el PDF, calcula el vencimiento según la regla del tipo de trámite y resume los puntos clave en las observaciones. Entonces esto lo hicimos también con la foto que yo le tomé, que es que tú tienes como la fecha, las observaciones, las alertas, todo. Entonces la idea es que llene esos campos manual.

Yo te iba a preguntar si el BIG... tú me dijiste que lo construyeron acá, entonces tienen el código, tienen todo en Conaltura. Entonces nos podríamos conectar sin problema al código para porque digamos ese documento como tal pues para editarlo se tiene que meter uno al código para editarlo. Listo.

Bueno, y ya también calcula la urgencia con reglas configurables, entonces cada tipo de trámite tiene como su propia...

**Hombre:** Pero uno lo hace con un formulario, pero se puede conectar también a la base de datos de donde se almacena la información del formulario.

**Mujer:** Ah, listo. ¿O sea el formulario está fuera de BIG?

**Hombre:** Está en BIG. Pero BIG, eh... ¿cómo es? como está en BIG el formulario lo que hace es como permitir que la información llegue de una manera organizada a la base de datos. Eso es como un...

**Mujer:** Ay, sí. O sea que yo en este formulario... ese formulario pasa como esa plantilla que era como el Excel de ejemplo y lo llena.

**Hombre:** Exacto.

**Mujer:** Listo. Sí, igual el agente leería el formulario y...

**Hombre:** O si es más o si es más eficiente que se conecte de una vez con SQL y que no lea el formulario y que no tenga que leer el formulario, pues súper bien.

**Mujer:** Listo. Sí, igual habría que mirarlo pues como que ya con el ingeniero, pero o sea siempre lo mapeamos así para dar más o menos una cotización estimada. Y ya a partir de eso pues uno coge las las pequeñeces. Listo. Bueno, y ya cada tipo de trámite tiene su lógica: 30 días de pues para requerimientos de autoridad, un año para permiso forestal. Obviamente ya tú nos indicas eso al inicio y la idea es que al inicio el agente lo haga en paralelo a ti. O sea que tú lo hagas, él lo haga y se comparen ambas cosas para ver qué sale bien, qué sale mal y cómo lo podemos organizar.

**Hombre:** De una.

**Mujer:** Y lo del disparo de las alertas se puede notificar 15, 7, 3 o un día antes dependiendo de lo que definamos. Y esto también hay que definir por dónde quieres que te haga las alertas: un SMS a tu celular, un correo, lo que sea. WhatsApp cobra. Te la podríamos mandar a WhatsApp pero vale plata el mensaje.

**Hombre:** No, mejor mejor SMS.

**Mujer:** Listo. Y ya tú marcas como respondido y se cierra el ciclo. Entonces el agente archiva el trámite, deja la trazabilidad todo... y ya. ¿Este proceso también está mapeado correctamente?

**Hombre:** Sí.

**Mujer:** Listo. Entonces obviamente lo que necesitamos para que esto funcione obviamente el acceso a Drive o al correo, las reglas de las alertas (entonces el tema de cuánto urgencia necesitas). De una. Igual lo que yo voy a hacer es para que tengas tiempo de pensar te mando con el documento estas preguntas y tú más o menos me puedes decir como "quiero que esto me lo me lo alerte cada tanto tiempo", tal... que quede súper específico para ya empezar a construirlo. Pero creo que eso, o sea te voy a mandar unas generales, ya el detalle se hace ya cuando tú me digas sí a la cotización o no. Pues para que tampoco te pongas de trabajo ahí.

**Hombre:** De una.

**Mujer:** Eh bueno, y la persona o el rol que confirma el cierre. Entonces cuando un trámite ya se respondió, quién lo marca como cerrado y libera la alerta. O sea si digamos te llegó la alerta, tú dices "ya, ya se respondió" o la otra persona que está encargada. Bueno, entonces no voy a gastar tiempo acá, pero esto te lo envío también.

**Hombre:** Ajá.

**Mujer:** Listo. Y el tercero es que hay datos pero nadie los está comparando, que es el tema de la curva que tú quieres que hagamos. Entonces que tenemos los datos históricos pero pues no tenemos mucho uso porque no se pueden comparar, no hay un punto de referencia, el cierre de proyectos no se no se está aprovechando. Entonces optimizar esa parte.

Entonces lo que nos imaginamos es: primero hay que cargar toda la historia desde SQL a este agente. Que el agente tome la data de los proyectos terminados, las segmente por regional y dimensión. Porque me dices que de pronto en Cartagena gastan más agua que pues en Medellín.

**Hombre:** Por regionales y por dimensión súper bien.

**Mujer:** La dimensión, ¿me recuerdas? Agua, huella...

**Hombre:** Agua, energía, huella, residuos. Ajá. Son cuatro.

**Mujer:** Listo. Y ya él calcula la curva promedio por regional y por dimensión. La idea de esto es que también te hagamos como una interfaz donde tú puedas ver la curva. Entonces pues que sea súper visible todo, cruza la demanda mensual del proyecto uno contra la curva, entonces compara pues como contra el promedio esperado por la regional en esa obra, marca las desviaciones y lo publica también en Power BI. Entonces si hay un sobreconsumo, un subconsumo, te muestra todo de obras en particular.

**Hombre:** Ajá.

**Mujer:** Lo podemos hacer de obras en particular. O sea al detalle que se necesite.

**Hombre:** Ajá. Porque precisamente por eso es que lo vamos a categorizar por regional y por tipo de obra y por dimensión.

**Mujer:** O sea entonces la idea es que en Medellín estás haciendo esta obra, que te muestre la curva de esa obra por dimensión y por lugar. Y que compare todo.

**Hombre:** Que compare obra similar pues sí similares de Medellín. Sí, sí, que no se vaya a ir a a otra parte. Ajá.

**Mujer:** Listo. Sí, sí. Listo. Bueno, y esto importante: cuando un proyecto cierra pues dispara recalibración. Entonces la idea es que cada vez que tú le des un proyecto cerrado se actualice completamente con la historia y pues ya queda actualizada para el nuevo ciclo. Entonces simplemente que se monte se monte y ya que quede para la eternidad.

**Hombre:** Y va puliendo va puliendo. Súper. Ese está muy bacán.

**Mujer:** Sí, como que entre más datos tenga obviamente se hace un promedio mucho más claro. Entonces sí. Y la yo sí quiero saber como la visual que tú quieres ver es la curva completa por Medellín, Bogotá, tatatá. La curva por dimensión y la curva por obra, o sea que tú puedas como filtrar qué es lo que quieres ver. Entonces haríamos ese esos filtros.

Y lo mismo acá es lo que necesitamos: entonces la segmentación clara, eh... acá dice solo por regional o también por tipo por proyecto, área construida, tipología.

**Hombre:** Por tipo de proyecto.

**Mujer:** Listo. Ah bueno, esto es importante: cuándo se da un proyecto como cerrado. O sea ¿hay un botón que tú dices "cerrado el proyecto"? ¿o tú cómo defines que se cerró?

**Hombre:** Sí, hay un hay algo un formulario en BIG que dice porcentaje de avance del proyecto. Cuando ese porcentaje llega al cien por ciento, eso quiere decir que se finalizó el proyecto.

**Mujer:** Listo. Bueno, esto yo creo que no aplica para ustedes pero mínimo de proyectos por segmento: a partir de cuántas obras la curva es válida. Pues ustedes ya tienen muchas más pues o sea no tienen tres proyectos, tienen muchos más entonces creo que no habría problema.

¿Qué más? ¿Cómo vamos? Muy bien. Si dale aprobada el mayor valor le dan... Sí, claro. Sí, sí que quede lista. Ajá. Bueno gracias chao.

Bueno y este también saber como sobre qué porcentaje se reporta esa alerta de desviación. Entonces como que si sube más de un 30 por ciento hay una alerta. Eso también lo puedes definir.

**Hombre:** Sí esos criterios ajá los podría... Sí porque no sé cómo se va a comportar inicialmente. Yo creo que ese es un paso posterior.

**Mujer:** Okay, entonces tú quieres que primero te hagamos simplemente las curvas de hoy, las empecemos a comparar y ya a partir de ahí tú nos dices "alerta cuando suba de esto".

**Hombre:** Ajá.

**Mujer:** Listo, perfecto. Listo entonces lo que aplica a los tres procesos es que hay un punto único de contacto. Pues la idea es que nos conectemos a eso de una vez. Una comisión unificada de IDs, entonces el mismo ID por obra/proyecto en OneDrive en todo pues para que podamos cruzar pues todo súper bien. El ambiente de pruebas con datos reales, entonces por eso súper bueno si nos puedes mandar las cosas para probarlo. Firmamos NDA obviamente porque estos son datos de empresa. Y definición de a quién opera post entrega. Entonces no sé si tú, más un ingeniero que se haga cargo de todo, pues ya nos dices también. Y la documentación pues al final.

Listo, eso es básicamente y ya estas son como las habilidades de Clod. O sea, esto siempre lo decimos es por lo que te digo, lo que te dije al inicio que si se puede hacer con Clod lo vamos a hacer con Clod. Si tú nos dices que sí, en 15 días lo tienes funcionando.

**Hombre:** ¿Qué? ¿En serio? ¿Y cuánto vale?

**Mujer:** No, eso ya me lo... como ya me aclaraste unas cositas ya si te entrego el coso incluso para la cotización yo creo que no tendríamos que reunir porque todo está súper claro. Entonces te la puedo mandar si quieres también y ya tú la revisas me dices si empezamos o no. A partir de esa fecha digamos que cada habilidad se demora más o menos una semana larguita. Entonces estas son tres... empezamos pues con el tema de la implementación. Puede demorarse más es por el hecho de que pues tenemos que venir a hablar que mientras hablamos con TI nos conectamos. Pero en sí construirla nosotros ya tenemos las bases súper bien montadas entonces la podemos construir.

**Hombre:** Wow, eso está muy teso.

**Mujer:** Sí. Entonces ya pues se valida esto que ya lo acabamos de validar. Sería bueno pues hablar con TI si es necesario como para en qué nos tenemos que conectar.

**Hombre:** Seguro, seguro tenemos porque ellos administran esas bases de datos y administran BIG. Entonces hay que mirar cómo se integran. Cómo va a ser la integración del agente con con esas bases de datos. Ajá.

**Mujer:** Sí ya cuando ellos nos den el sí ya la implementamos. Entonces lo que sigue es que yo te mando esto, te mando un Fase Cero que es un documento súper detallado que tiene todo como el paso a paso. Y ahí te voy a mandar pues te voy a incluir la cotización de una vez para que la vayas revisando. Y las preguntas que tengamos pues adicionales si tenemos. Aunque este está demasiado claro el de ellos sí es una locura. Hijo de madre, son nueve procesos distintos y son como temas de Exceles y de presupuestos y que esto sale de acá pero esto no, P1, P2, P3, P4.... Pero este sí está súper claro entonces pues súper fácil de de hacerlo.

**Hombre:** Qué buena noticia.

**Mujer:** Sí, no la verdad súper. Sí Dani no sé si tengas preguntas así rápidas.

**Hombre:** No, la verdad o sea como se hace con Clod baja mucho. Porque si fuera un agente solo de desarrollo nos no bajamos de como dieciocho millones de implementación solamente y mensual puede ser cinco, siete, o sea un fee. Un fee mensual. Pero este este solamente es un pago, se hace un pago que sí tengo que hablar con el ingeniero que me confirme bien como cuánto vale cada una porque cada habilidad pues o sea depende de cuánto esfuerzo se tenga que hacer de que nos tengamos que conectar vale plata. Pero ya lo que te tocaría pagar de aquí en adelante es solamente cien dólares de Clod mensual y ya se te cubre los tres.

**Hombre:** Ah súper, sería como la como la licencia de Clod.

**Mujer:** Exacto. Y lo bueno es que con Clod pues ya pagando Clod puedes usarlo para más cosas que tú quieras. O sea puedes usar Clod Design, Clod Code, Clod UI... lo que quieras.

**Hombre:** ¿Qué? Qué nota, bacanísimo.

**Mujer:** Sí. Entonces sí básicamente te queda sirviendo y lo bueno de esto es que Clod no solamente lo puedes usar tú sino que se puede meter más gente a tu cuenta. No es como que tú quieres entrar y tú quieres entrar entonces cien dólares y cien dólares. La usan igual y ya. Eso sería todo.

**Hombre:** Ah eso está muy chévere.

**Mujer:** Sí. Pero entonces le dimos al punto, eh no hay que corregir nada, todo súper bien. Todo pues obviamente en el desarrollo van a salir cosas, obvio. Pero lo inicial está. Y lo bueno es que yo mi equipo incluso Andrés y todos tenemos esto en la cabeza porque nosotros creamos los formularios, creamos los formatos todo, entonces sabemos de dónde sale la información y por dónde nos tenemos que pegar.

**Mujer:** Y súper bueno sí yo te mando esto ya si tú me dices que sí la idea sería una reunión con el ingeniero que tú muestres el paso a paso de todo y ya construimos. Entonces sería súper fácil.

**Hombre:** Ay listo Dani súper cortica la reunión súper bien súper claro muy eficiente muy eficiente la de la reunión. Eh no de una entonces me compartes eso.

**Mujer:** Sí yo te mando pues ya al final del día que tengo reunión con Julia. Voy a ver si la puedo tener ya como para no no perder más tiempo. Listo.
